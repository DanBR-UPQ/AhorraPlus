import { Platform } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { Transaccion } from '../models/transaccion'


class DatabaseService {
    constructor() {
        this.db = null
        this.storageKey = 'transacciones'
        this.storageKeyPresupuestos = 'presupuestos';
    }

    async initialize() {
        if (Platform.OS === 'web') {
            console.log('Usando LocalStorage para web');
        } else {
            console.log('Usando SQLite para móvil')
            /* this.db = await SQLite.openDatabaseAsync('miapp.db') */
            this.db = await SQLite.openDatabaseAsync('miapp.db', { useNewConnection: true });
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
    Transaccion.validarMonto(monto);
    Transaccion.validarCategoria(categoria);
    Transaccion.validarDescripcion(descripcion || '');
    Transaccion.validarTipo(tipo);
    Transaccion.validarFecha(fecha);

    if (Platform.OS === 'web') {
      const transacciones = await this.getAllTransaccion();
      const nueva = { id: Date.now(), monto, categoria, fecha, descripcion, tipo };
      transacciones.unshift(nueva);
      localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
      return nueva;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO transacciones (monto, categoria, fecha, descripcion, tipo)
         VALUES (?, ?, ?, ?, ?)`,
        monto, categoria, fecha, descripcion, tipo
      );
      return { id: result.lastInsertRowId, monto, categoria, fecha, descripcion, tipo };
    }
  }

  async updateTransaccion(id, nuevosValores) {
    const { monto, categoria, fecha, descripcion, tipo } = nuevosValores;
    if (monto !== undefined) Transaccion.validarMonto(monto);
    if (categoria !== undefined) Transaccion.validarCategoria(categoria);
    if (descripcion !== undefined) Transaccion.validarDescripcion(descripcion);
    if (tipo !== undefined) Transaccion.validarTipo(tipo);
    if (fecha !== undefined) Transaccion.validarFecha(fecha);

    if (Platform.OS === 'web') {
      const transacciones = await this.getAllTransaccion();
      const index = transacciones.findIndex(t => t.id === id);
      if (index === -1) return null;
      transacciones[index] = { ...transacciones[index], ...nuevosValores };
      localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
      return transacciones[index];
    } else {
      await this.db.runAsync(
        `UPDATE transacciones
         SET monto = ?, categoria = ?, fecha = ?, descripcion = ?, tipo = ?
         WHERE id = ?`,
        monto, categoria, fecha, descripcion, tipo, id
      );
      return { id, ...nuevosValores };
    }
  }

  async deleteTransaccion(id) {
    if (Platform.OS === 'web') {
      const transacciones = await this.getAllTransaccion();
      const nuevas = transacciones.filter(t => t.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(nuevas));
      return true;
    } else {
      await this.db.runAsync('DELETE FROM transacciones WHERE id = ?', id);
      return true;
    }
  }

  // ===========================================================================================================================
  // PAGOS
  // ===========================================================================================================================
  async getAllPagos() {
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKeyPagos);
      return data ? JSON.parse(data) : [];
    } else {
      return await this.db.getAllAsync('SELECT * FROM pagos ORDER BY id DESC');
    }
  }

  async addPago(nombre, monto, fecha, metodo) {
    if (Platform.OS === 'web') {
      const existing = JSON.parse(localStorage.getItem(this.storageKeyPagos) || '[]');
      const nuevo = { id: Date.now(), nombre, monto, fecha, metodo };
      existing.unshift(nuevo);
      localStorage.setItem(this.storageKeyPagos, JSON.stringify(existing));
      return nuevo;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO pagos (nombre, monto, fecha, metodo)
         VALUES (?, ?, ?, ?)`,
        nombre, monto, fecha, metodo
      );
      return { id: result.lastInsertRowId, nombre, monto, fecha, metodo };
    }
  }

  async updatePago(id, nuevosValores) {
    const { nombre, monto, fecha, metodo } = nuevosValores;
    if (Platform.OS === 'web') {
      const pagos = await this.getAllPagos();
      const index = pagos.findIndex(p => p.id === id);
      if (index === -1) return null;
      pagos[index] = { ...pagos[index], ...nuevosValores };
      localStorage.setItem(this.storageKeyPagos, JSON.stringify(pagos));
      return pagos[index];
    } else {
      await this.db.runAsync(
        `UPDATE pagos
         SET nombre = ?, monto = ?, fecha = ?, metodo = ?
         WHERE id = ?`,
        nombre, monto, fecha, metodo, id
      );
      return { id, ...nuevosValores };
    }
  }

  async deletePago(id) {
    if (Platform.OS === 'web') {
      const pagos = await this.getAllPagos();
      const nuevas = pagos.filter(p => p.id !== id);
      localStorage.setItem(this.storageKeyPagos, JSON.stringify(nuevas));
      return true;
    } else {
      await this.db.runAsync('DELETE FROM pagos WHERE id = ?', id);
      return true;
    }
  }

  // ===========================================================================================================================
  // PRESUPUESTOS
  // ===========================================================================================================================
  async getAllPresupuestos() {
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKeyPresupuestos);
      return data ? JSON.parse(data) : [];
    } else {
      return await this.db.getAllAsync('SELECT * FROM presupuestos ORDER BY id DESC');
    }
  }

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
        async updatePresupuesto(id, nombre, monto, categoria) {
        if (Platform.OS === 'web') {
            const existing = JSON.parse(localStorage.getItem(this.storageKeyPresupuestos) || '[]');
            const index = existing.findIndex(p => p.id === id);

            if (index === -1) throw new Error('Presupuesto no encontrado para actualizar.');

            const updated = {
                ...existing[index],
                nombre,
                monto,
                categoria,
            };

            existing[index] = updated;
            localStorage.setItem(this.storageKeyPresupuestos, JSON.stringify(existing));
            return updated;

        } else {
            await this.db.runAsync(
                `UPDATE presupuestos SET nombre = ?, monto = ?, categoria = ? WHERE id = ?`,
                nombre, monto, categoria, id
            );
            
            return { id, nombre, monto, categoria };
        }
    }

    async deletePresupuesto(id) {
        if (Platform.OS === 'web') {
            const existing = JSON.parse(localStorage.getItem(this.storageKeyPresupuestos) || '[]');
            const nuevas = existing.filter(p => p.id !== id);
            localStorage.setItem(this.storageKeyPresupuestos, JSON.stringify(nuevas));
            return true;
        } else {
            await this.db.runAsync('DELETE FROM presupuestos WHERE id = ?', id);
            return true;
        }
    }


}

export default new DatabaseService();
