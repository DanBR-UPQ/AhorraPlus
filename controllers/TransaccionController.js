import { Transaccion } from '../models/Transaccion'
import DatabaseService from '../database/DatabaseService'

export class TransaccionController {
    constructor() {
        this.listeners = []
    }

    async initialize() {
        await DatabaseService.initialize()
    }

    async obtenerTransacciones() {
        try {
            const data = await DatabaseService.getAll()
            return data.map(t => new Transaccion(
                t.id,
                t.monto,
                t.categoria,
                t.fecha,
                t.descripcion,
                t.tipo
            ))
        } catch (error) {
            console.error('Error al obtener transacciones: ', error)
            throw new Error('No se pudieron cargar las transacciones')
        }
    }


    async crearTransaccion(monto, categoria, fecha, descripcion, tipo) {
        try {

            Transaccion.validarMonto(monto)
            Transaccion.validarCategoria(categoria)
            Transaccion.validarDescripcion(descripcion || "")
            Transaccion.validarTipo(tipo)

            const nueva = await DatabaseService.add(
                monto,
                categoria,
                fecha,
                descripcion,
                tipo
            )

            this.notifyListeners()

            return new Transaccion(
                nueva.id,
                nueva.monto,
                nueva.categoria,
                nueva.fecha,
                nueva.descripcion,
                nueva.tipo
            )

        } catch (error) {
            console.error('Error al crear transacción: ', error)
            throw error
        }
    }


    async actualizarTransaccion(id, nuevosValores) {
        try {
            const { monto, categoria, fecha, descripcion, tipo } = nuevosValores

            if (monto !== undefined) Transaccion.validarMonto(monto)
            if (categoria !== undefined) Transaccion.validarCategoria(categoria)
            if (descripcion !== undefined) Transaccion.validarDescripcion(descripcion)
            if (tipo !== undefined) Transaccion.validarTipo(tipo)

            const actualizado = await DatabaseService.update(id, nuevosValores)

            this.notifyListeners()

            return new Transaccion(
                actualizado.id,
                actualizado.monto,
                actualizado.categoria,
                actualizado.fecha,
                actualizado.descripcion,
                actualizado.tipo
            )

        } catch (error) {
            console.error('Error al actualizar transacción: ', error)
            throw error
        }
    }


    async eliminarTransaccion(id) {
        try {
            await DatabaseService.delete(id)

            this.notifyListeners()

            return true
        } catch (error) {
            console.error('Error al eliminar transacción: ', error)
            throw new Error('No se pudo eliminar la transacción')
        }
    }



    addListener(callback) {
        this.listeners.push(callback)
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback)
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback())
    }
}
