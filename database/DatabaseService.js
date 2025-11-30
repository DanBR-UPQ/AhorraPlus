import { Platform } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { Transaccion } from '../models/transaccion'

class DatabaseService {
    constructor() {
        this.db = null
        this.storageKey = 'transacciones'
        this.storageKeyPresupuestos = 'presupuestos';
        this.storageKeyUsuarios = 'usuarios';
    }

    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Usando LocalStorage para web');
        } else {
            console.log('Usando SQLite para móvil')
            if (!this.db) {
                /* this.db = await SQLite.openDatabaseAsync('miapp.db') */
                this.db = await SQLite.openDatabaseAsync('miapp.db', { useNewConnection: true });
            }
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS transacciones (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    monto REAL NOT NULL,
                    categoria TEXT NOT NULL,
                    fecha TEXT NOT NULL,
                    descripcion TEXT,
                    tipo TEXT NOT NULL
                )
            `)
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS presupuestos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    monto REAL NOT NULL,
                    categoria TEXT
                )
            `)

            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    correo TEXT UNIQUE,
                    telefono TEXT UNIQUE,
                    clave TEXT,
                    recovery_code TEXT,
                    recovery_expires INTEGER
                )
            `)

            // --- Migration: ensure usuarios table has expected columns ---
            try {
                const cols = await this.db.getAllAsync("PRAGMA table_info('usuarios')")
                const existing = (cols || []).map(c => c.name)
                const expected = {
                    nombre: 'TEXT',
                    correo: 'TEXT',
                    telefono: 'TEXT',
                    clave: 'TEXT',
                    recovery_code: 'TEXT',
                    recovery_expires: 'INTEGER'
                }

                for (const [col, type] of Object.entries(expected)) {
                    if (!existing.includes(col)) {
                        try {
                            await this.db.runAsync(`ALTER TABLE usuarios ADD COLUMN ${col} ${type}`)
                            console.log(`Migration: added column usuarios.${col}`)
                        } catch (e) {
                            console.warn(`No se pudo añadir columna ${col}:`, e.message || e)
                        }
                    }
                }
            } catch (e) {
                console.warn('Error comprobando esquema usuarios:', e.message || e)
            }

        }
    }


    // ===========================================================================================================================
    //                                                  FUNCIONES USUARIO
    // ===========================================================================================================================

    async addUsuario(nombre, correo, telefono, clave) {
        if (Platform.OS === 'web') {
            const usuarios = JSON.parse(localStorage.getItem(this.storageKeyUsuarios) || '[]')
            // evitar duplicados por correo o telefono
            if (correo && usuarios.find(u => u.correo === correo)) {
                throw new Error('Ya existe un usuario con ese correo')
            }
            if (telefono && usuarios.find(u => u.telefono === telefono)) {
                throw new Error('Ya existe un usuario con ese teléfono')
            }

            const nuevo = {
                id: Date.now(),
                nombre,
                correo,
                telefono,
                clave,
                recovery_code: null,
                recovery_expires: null
            }

            usuarios.unshift(nuevo)
            localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
            return nuevo
        } else {
            const result = await this.db.runAsync(
                `INSERT INTO usuarios (nombre, correo, telefono, clave, recovery_code, recovery_expires)
                 VALUES (?, ?, ?, ?, NULL, NULL)`,
                nombre, correo, telefono, clave
            )

            return {
                id: result.lastInsertRowId,
                nombre,
                correo,
                telefono,
                clave,
                recovery_code: null,
                recovery_expires: null
            }
        }
    }

    async getUsuarioByCorreo(correo) {
        if (!correo) return null
        if (Platform.OS === 'web') {
            const usuarios = JSON.parse(localStorage.getItem(this.storageKeyUsuarios) || '[]')
            return usuarios.find(u => u.correo === correo) || null
        } else {
            const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE correo = ? LIMIT 1', correo)
            return (rows && rows.length) ? rows[0] : null
        }
    }

    async getUsuarioByTelefono(telefono) {
        if (!telefono) return null
        if (Platform.OS === 'web') {
            const usuarios = JSON.parse(localStorage.getItem(this.storageKeyUsuarios) || '[]')
            return usuarios.find(u => u.telefono === telefono) || null
        } else {
            const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE telefono = ? LIMIT 1', telefono)
            return (rows && rows.length) ? rows[0] : null
        }
    }

    async getUsuarioById(id) {
        if (!id) return null
        if (Platform.OS === 'web') {
            const usuarios = JSON.parse(localStorage.getItem(this.storageKeyUsuarios) || '[]')
            return usuarios.find(u => u.id === id) || null
        } else {
            const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE id = ? LIMIT 1', id)
            return (rows && rows.length) ? rows[0] : null
        }
    }

    async updateUsuarioClave(id, nuevaClave) {
        if (!id) throw new Error('id requerido')
        if (Platform.OS === 'web') {
            const usuarios = JSON.parse(localStorage.getItem(this.storageKeyUsuarios) || '[]')
            const index = usuarios.findIndex(u => u.id === id)
            if (index === -1) throw new Error('Usuario no encontrado')
            usuarios[index].clave = nuevaClave
            usuarios[index].recovery_code = null
            usuarios[index].recovery_expires = null
            localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
            return usuarios[index]
        } else {
            await this.db.runAsync('UPDATE usuarios SET clave = ?, recovery_code = NULL, recovery_expires = NULL WHERE id = ?', nuevaClave, id)
            return await this.getUsuarioById(id)
        }
    }

    async setRecoveryCode(correoOtelefono, code, expiresAtMillis) {
        if (!correoOtelefono) throw new Error('correo o telefono requerido')
        if (Platform.OS === 'web') {
            const usuarios = JSON.parse(localStorage.getItem(this.storageKeyUsuarios) || '[]')
            const idx = usuarios.findIndex(u => u.correo === correoOtelefono || u.telefono === correoOtelefono)
            if (idx === -1) throw new Error('Usuario no encontrado')
            usuarios[idx].recovery_code = code
            usuarios[idx].recovery_expires = expiresAtMillis
            localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
            return usuarios[idx]
        } else {
            await this.db.runAsync('UPDATE usuarios SET recovery_code = ?, recovery_expires = ? WHERE correo = ? OR telefono = ?', code, expiresAtMillis, correoOtelefono, correoOtelefono)
            const byCorreo = await this.getUsuarioByCorreo(correoOtelefono)
            const byTelefono = await this.getUsuarioByTelefono(correoOtelefono)
            return byCorreo || byTelefono
        }
    }

    async verifyRecoveryCodeAndResetPassword(correoOtelefono, code, nuevaClave) {
        if (!correoOtelefono) throw new Error('correo o telefono requerido')
        if (Platform.OS === 'web') {
            const usuarios = JSON.parse(localStorage.getItem(this.storageKeyUsuarios) || '[]')
            const idx = usuarios.findIndex(u => u.correo === correoOtelefono || u.telefono === correoOtelefono)
            if (idx === -1) throw new Error('Usuario no encontrado')
            const u = usuarios[idx]
            if (!u.recovery_code || u.recovery_code !== code) return false
            if (u.recovery_expires && Date.now() > u.recovery_expires) return false
            usuarios[idx].clave = nuevaClave
            usuarios[idx].recovery_code = null
            usuarios[idx].recovery_expires = null
            localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
            return true
        } else {
            const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE (correo = ? OR telefono = ?) LIMIT 1', correoOtelefono, correoOtelefono)
            const u = (rows && rows.length) ? rows[0] : null
            if (!u) throw new Error('Usuario no encontrado')
            if (!u.recovery_code || u.recovery_code !== code) return false
            if (u.recovery_expires && Date.now() > u.recovery_expires) return false
            await this.db.runAsync('UPDATE usuarios SET clave = ?, recovery_code = NULL, recovery_expires = NULL WHERE id = ?', nuevaClave, u.id)
            return true
        }
    }




    // ===========================================================================================================================
    //                                                  FUNCIONES TRANSACCION
    // ===========================================================================================================================

    async getAllTransaccion() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey)
            return data ? JSON.parse(data) : []
        } else {
            return await this.db.getAllAsync('SELECT * FROM transacciones ORDER BY id DESC')
        }
    }





    async addTransaccion(monto, categoria, fecha, descripcion, tipo) {
        Transaccion.validarMonto(monto)
        Transaccion.validarCategoria(categoria)
        Transaccion.validarDescripcion(descripcion || "")
        Transaccion.validarTipo(tipo)

        if (Platform.OS === 'web') {
            const transacciones = await this.getAll()

            const nueva = {
                id: Date.now(),
                monto,
                categoria,
                fecha,
                descripcion,
                tipo
            }

            transacciones.unshift(nueva)
            localStorage.setItem(this.storageKey, JSON.stringify(transacciones))
            return nueva

        } else {
            const result = await this.db.runAsync(
                `
                INSERT INTO transacciones (monto, categoria, fecha, descripcion, tipo)
                VALUES (?, ?, ?, ?, ?)
                `,
                monto, categoria, fecha, descripcion, tipo
            )

            return {
                id: result.lastInsertRowId,
                monto,
                categoria,
                fecha,
                descripcion,
                tipo
            }
        }
    }

    async updateTransaccion(id, nuevosValores) {
        const { monto, categoria, fecha, descripcion, tipo } = nuevosValores

        if (monto !== undefined) Transaccion.validarMonto(monto)
        if (categoria !== undefined) Transaccion.validarCategoria(categoria)
        if (descripcion !== undefined) Transaccion.validarDescripcion(descripcion)
        if (tipo !== undefined) Transaccion.validarTipo(tipo)

        if (Platform.OS === 'web') {
            const transacciones = await this.getAll()
            const index = transacciones.findIndex(t => t.id === id)

            if (index === -1) return null

            transacciones[index] = {
                ...transacciones[index],
                ...nuevosValores
            }

            localStorage.setItem(this.storageKey, JSON.stringify(transacciones))
            return transacciones[index]

        } else {
            await this.db.runAsync(
                `
                UPDATE transacciones
                SET monto = ?, categoria = ?, fecha = ?, descripcion = ?, tipo = ?
                WHERE id = ?
                `,
                monto,
                categoria,
                fecha,
                descripcion,
                tipo,
                id
            )

            return {
                id,
                ...nuevosValores
            }
        }
    }

    async deleteTransaccion(id) {
        if (Platform.OS === 'web') {
            const transacciones = await this.getAll()
            const nuevas = transacciones.filter(t => t.id !== id)
            localStorage.setItem(this.storageKey, JSON.stringify(nuevas))
            return true

        } else {
            await this.db.runAsync('DELETE FROM transacciones WHERE id = ?', id)
            return true
        }
    }


    // ===========================================================================================================================
    //                                                  FUNCIONES PAGOS
    // ===========================================================================================================================



    // ===========================================================================================================================
    //                                                  FUNCIONES PRESUPUESTOS
    // ===========================================================================================================================

// ===========================================================================================================================
//                                                  FUNCIONES PRESUPUESTOS
// ===========================================================================================================================

async getAllPresupuestos() {
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKeyPresupuestos)
            return data ? JSON.parse(data) : []
        } else {
            return await this.db.getAllAsync('SELECT * FROM presupuestos ORDER BY id DESC')
        }
    }

    // CHANGED: addPresupuesto ahora solo inserta nombre, monto y categoria (sin fechas)
    async addPresupuesto(nombre, monto, categoria) {
      if (Platform.OS === 'web') {
        const existing = JSON.parse(localStorage.getItem(this.storageKeyPresupuestos) || '[]');

        const nueva = {
          id: Date.now(),
          nombre,
          monto,
          categoria
        };

        existing.unshift(nueva);
        localStorage.setItem(this.storageKeyPresupuestos, JSON.stringify(existing));
        return nueva;
      } else {
        const result = await this.db.runAsync(
          `INSERT INTO presupuestos (nombre, monto, categoria)
           VALUES (?, ?, ?)`,
          nombre, monto, categoria
        );

        return {
          id: result.lastInsertRowId,
          nombre,
          monto,
          categoria
        };
      }
    }


}

export default new DatabaseService()
