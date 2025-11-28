import { Platform } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { Transaccion } from '../models/Transaccion'

class DatabaseService {
    constructor() {
        this.db = null
        this.storageKey = 'transacciones'
    }

    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Usando LocalStorage para web')
        } else {
            console.log('Usando SQLite para móvil')
            this.db = await SQLite.openDatabaseAsync('miapp.db')
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
        }
    }

    // ===========================================================================================================================
    //                                                  FUNCIONES USUARIO
    // ===========================================================================================================================




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
}

export default new DatabaseService()
