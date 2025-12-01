import DatabaseService from '../database/DatabaseService'
import { Alert } from 'react-native'
import PasswordUtils from '../utils/passwordUtils'

export class UsuarioController {
    constructor() {
        this.listeners = []
    }

    async initialize() {
        await DatabaseService.initialize()
    }

    async login(identifier, clave) {
        await this.initialize()
        let user = await DatabaseService.getUsuarioByCorreo(identifier)
        if (!user) user = await DatabaseService.getUsuarioByTelefono(identifier)
        if (!user) throw new Error('Usuario no encontrado')
        let match = false
        try {
            match = await PasswordUtils.comparePassword(clave, user.clave)
        } catch (e) {
            match = false
        }

        // migration path: if stored clave is plaintext and equals the provided clave, upgrade to hashed
        if (!match && user.clave === clave) {
            try {
                const hashed = await PasswordUtils.hashPassword(clave)
                await DatabaseService.updateUsuarioClave(user.id, hashed)
                match = true
            } catch (e) {
                console.warn('No se pudo migrar contraseña a hash:', e.message || e)
            }
        }

        if (!match) throw new Error('Contraseña incorrecta')
        return user
    }

    async register(nombre, correo, telefono, clave, recoveryAnswer) {
        await this.initialize()
        // validar existencia para evitar constraint UNIQUE de la BD
        const existingCorreo = correo ? await DatabaseService.getUsuarioByCorreo(correo) : null
        const existingTelefono = telefono ? await DatabaseService.getUsuarioByTelefono(telefono) : null
        if (existingCorreo) throw new Error('El correo ya está registrado')
        if (existingTelefono) throw new Error('El teléfono ya está registrado')

        const hashed = await PasswordUtils.hashPassword(clave)
        // NOTE: recoveryAnswer may be provided by caller (should be stored uppercase)
        return await DatabaseService.addUsuario(nombre, correo, telefono, hashed, recoveryAnswer)
    }

    async verifyRecoveryAnswer(identifier, answer) {
        await this.initialize()
        if (!identifier || !answer) return null
        const user = await DatabaseService.verifyRecoveryAnswer(identifier, answer)
        return user
    }

    async requestRecovery(identifier) {
        await this.initialize()
        // generar código temporal simple (6 dígitos)
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const expires = Date.now() + 1000 * 60 * 15 // 15 minutos
        const user = await DatabaseService.setRecoveryCode(identifier, code, expires)
        // retornamos el usuario y el código para que la UI pueda usar mailto o mostrar (for testing)
        return { user, code, expires }
    }

    async resetPassword(identifier, nuevaClave) {
        await this.initialize()
        const hashed = await PasswordUtils.hashPassword(nuevaClave)
        // find user by identifier and update
        const user = await DatabaseService.getUsuarioByCorreo(identifier) || await DatabaseService.getUsuarioByTelefono(identifier)
        if (!user) return false
        await DatabaseService.updateUsuarioClave(user.id, hashed)
        return true
    }

    addListener(callback) { this.listeners.push(callback) }
    removeListener(callback) { this.listeners = this.listeners.filter(l => l !== callback) }
    notifyListeners() { this.listeners.forEach(cb => cb()) }
}

export default new UsuarioController()
