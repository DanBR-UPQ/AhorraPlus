import { Platform } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { Transaccion } from '../models/transaccion'


class DatabaseService {
    constructor() {
        this.db = null
        this.storageKey = 'transacciones'
        this.storageKeyPresupuestos = 'presupuestos';
      this.storageKeyUsuarios = 'usuarios';
      this.storageKeyPagos = 'pagos';
      this.currentUserId = null;
    }

    
    setCurrentUser(userId) {
        this.currentUserId = userId;
    }

    
    getCurrentUserId() {
        if (!this.currentUserId) {
            throw new Error('No hay un usuario activo. Por favor inicia sesión.');
        }
        return this.currentUserId;
    }

    
    logout() {
        this.currentUserId = null;
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
                    usuario_id INTEGER,
                    monto REAL NOT NULL,
                    categoria TEXT NOT NULL,
                    fecha TEXT NOT NULL,
                    descripcion TEXT,
                    tipo TEXT NOT NULL
                )
            `)
            await this.db.execAsync(`
                    CREATE TABLE IF NOT EXISTS pagos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        usuario_id INTEGER,
                        nombre TEXT NOT NULL,
                        monto REAL NOT NULL,
                        fecha TEXT NOT NULL,
                        metodo TEXT
                    )
                `);
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS presupuestos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    usuario_id INTEGER,
                    nombre TEXT NOT NULL,
                    monto REAL NOT NULL,
                    categoria TEXT, 
                    anio INTEGER
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
                recovery_expires INTEGER,
                recovery_answer TEXT
              )
            `)

            // ensure recovery_answer column exists for older DBs
            try {
                await this.db.execAsync('ALTER TABLE usuarios ADD COLUMN recovery_answer TEXT')
            } catch (e) {
                // ignore if column exists or ALTER not supported
            }

            
            try {
                await this.db.execAsync('ALTER TABLE transacciones ADD COLUMN usuario_id INTEGER')
            } catch (e) {
                // ignore if column exists
            }

            try {
                await this.db.execAsync('ALTER TABLE pagos ADD COLUMN usuario_id INTEGER')
            } catch (e) {
                // ignore if column exists
            }

            try {
                await this.db.execAsync('ALTER TABLE presupuestos ADD COLUMN usuario_id INTEGER')
            } catch (e) {
                // ignore if column exists
            }
            
        }
    }


    // ===========================================================================================================================
    //                                                  FUNCIONES USUARIO
    // ===========================================================================================================================

    async getAllUsuarios() {
      if (Platform.OS === 'web') {
        const data = localStorage.getItem(this.storageKeyUsuarios)
        return data ? JSON.parse(data) : []
      } else {
        return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC')
      }
    }

    async addUsuario(nombre, correo, telefono, clave, recoveryAnswer) {
      if (Platform.OS === 'web') {
        const usuarios = await this.getAllUsuarios()
        const nuevo = { id: Date.now(), nombre, correo, telefono, clave, recovery_answer: recoveryAnswer }
        usuarios.unshift(nuevo)
        localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
        return nuevo
      } else {
        try {
          const result = await this.db.runAsync(
            `INSERT INTO usuarios (nombre, correo, telefono, clave, recovery_answer) VALUES (?, ?, ?, ?, ?)`,
            nombre, correo, telefono, clave, recoveryAnswer
          )
          return { id: result.lastInsertRowId, nombre, correo, telefono, clave, recovery_answer: recoveryAnswer }
        } catch (err) {
          // Detect UNIQUE constraint failure and return friendly error
          const msg = (err && err.message) ? err.message : String(err)
          if (msg.includes('UNIQUE') || msg.includes('constraint failed')) {
            throw new Error('El correo o teléfono ya está registrado')
          }
          throw err
        }
      }
    }

    async verifyRecoveryAnswer(identifier, answerUpper) {
      if (Platform.OS === 'web') {
        const usuarios = await this.getAllUsuarios()
        const user = usuarios.find(u => u.correo === identifier || u.telefono === identifier)
        if (!user) return null
        if (!user.recovery_answer) return null
        return String(user.recovery_answer).toUpperCase() === String(answerUpper).toUpperCase() ? user : null
      } else {
        const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE correo = ? OR telefono = ? LIMIT 1', identifier, identifier)
        const user = (rows && rows[0]) ? rows[0] : null
        if (!user) return null
        if (!user.recovery_answer) return null
        return String(user.recovery_answer).toUpperCase() === String(answerUpper).toUpperCase() ? user : null
      }
    }

    async getUsuarioByCorreo(correo) {
      if (Platform.OS === 'web') {
        const usuarios = await this.getAllUsuarios()
        return usuarios.find(u => u.correo === correo) || null
      } else {
        const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE correo = ? LIMIT 1', correo)
        return (rows && rows[0]) ? rows[0] : null
      }
    }

    async getUsuarioByTelefono(telefono) {
      if (Platform.OS === 'web') {
        const usuarios = await this.getAllUsuarios()
        return usuarios.find(u => u.telefono === telefono) || null
      } else {
        const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE telefono = ? LIMIT 1', telefono)
        return (rows && rows[0]) ? rows[0] : null
      }
    }

    async updateUsuarioClave(id, nuevaClave) {
      if (Platform.OS === 'web') {
        const usuarios = await this.getAllUsuarios()
        const idx = usuarios.findIndex(u => u.id === id)
        if (idx === -1) throw new Error('Usuario no encontrado')
        usuarios[idx].clave = nuevaClave
        localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
        return usuarios[idx]
      } else {
        await this.db.runAsync('UPDATE usuarios SET clave = ? WHERE id = ?', nuevaClave, id)
        return { id, clave: nuevaClave }
      }
    }

    async setRecoveryCode(identifier, code, expires) {
      // identifier puede ser correo o teléfono
      if (Platform.OS === 'web') {
        const usuarios = await this.getAllUsuarios()
        const idx = usuarios.findIndex(u => u.correo === identifier || u.telefono === identifier)
        if (idx === -1) return null
        usuarios[idx].recovery_code = code
        usuarios[idx].recovery_expires = expires
        localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
        return usuarios[idx]
      } else {
        const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE correo = ? OR telefono = ? LIMIT 1', identifier, identifier)
        const user = (rows && rows[0]) ? rows[0] : null
        if (!user) return null
        await this.db.runAsync('UPDATE usuarios SET recovery_code = ?, recovery_expires = ? WHERE id = ?', code, expires, user.id)
        user.recovery_code = code
        user.recovery_expires = expires
        return user
      }
    }

    async verifyRecoveryCodeAndResetPassword(identifier, code, hashed) {
      if (Platform.OS === 'web') {
        const usuarios = await this.getAllUsuarios()
        const idx = usuarios.findIndex(u => (u.correo === identifier || u.telefono === identifier) && u.recovery_code === code)
        if (idx === -1) return false
        const user = usuarios[idx]
        if (!user.recovery_expires || Date.now() > user.recovery_expires) return false
        usuarios[idx].clave = hashed
        usuarios[idx].recovery_code = null
        usuarios[idx].recovery_expires = null
        localStorage.setItem(this.storageKeyUsuarios, JSON.stringify(usuarios))
        return true
      } else {
        const rows = await this.db.getAllAsync('SELECT * FROM usuarios WHERE correo = ? OR telefono = ? LIMIT 1', identifier, identifier)
        const user = (rows && rows[0]) ? rows[0] : null
        if (!user) return false
        if (!user.recovery_expires || Date.now() > user.recovery_expires) return false
        if (String(user.recovery_code) !== String(code)) return false
        await this.db.runAsync('UPDATE usuarios SET clave = ?, recovery_code = NULL, recovery_expires = NULL WHERE id = ?', hashed, user.id)
        return true
      }
    }




    // ===========================================================================================================================
    //                                                  FUNCIONES TRANSACCION
    // ===========================================================================================================================

    async getAllTransaccion() {
        const userId = this.getCurrentUserId(); 
        if (Platform.OS === 'web') {
            const data = localStorage.getItem(this.storageKey)
            const todas = data ? JSON.parse(data) : [] 
            return todas.filter(t => t.usuario_id === userId) 
        } else {
            return await this.db.getAllAsync('SELECT * FROM transacciones WHERE usuario_id = ? ORDER BY id DESC', userId) 
        }
    }





  async addTransaccion(monto, categoria, fecha, descripcion, tipo) {
    const userId = this.getCurrentUserId(); 
    Transaccion.validarMonto(monto);
    Transaccion.validarCategoria(categoria);
    Transaccion.validarDescripcion(descripcion || '');
    Transaccion.validarTipo(tipo);
    Transaccion.validarFecha(fecha);

    if (Platform.OS === 'web') {
      const transacciones = JSON.parse(localStorage.getItem(this.storageKey) || '[]'); 
      const nueva = { id: Date.now(), usuario_id: userId, monto, categoria, fecha, descripcion, tipo }; 
      transacciones.unshift(nueva);
      localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
      return nueva;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO transacciones (usuario_id, monto, categoria, fecha, descripcion, tipo)
         VALUES (?, ?, ?, ?, ?, ?)`, 
        userId, monto, categoria, fecha, descripcion, tipo 
      );
      return { id: result.lastInsertRowId, usuario_id: userId, monto, categoria, fecha, descripcion, tipo }; 
    }
  }

  async updateTransaccion(id, nuevosValores) {
    const userId = this.getCurrentUserId(); 
    const { monto, categoria, fecha, descripcion, tipo } = nuevosValores;
    if (monto !== undefined) Transaccion.validarMonto(monto);
    if (categoria !== undefined) Transaccion.validarCategoria(categoria);
    if (descripcion !== undefined) Transaccion.validarDescripcion(descripcion);
    if (tipo !== undefined) Transaccion.validarTipo(tipo);
    if (fecha !== undefined) Transaccion.validarFecha(fecha);

    if (Platform.OS === 'web') {
      const transacciones = JSON.parse(localStorage.getItem(this.storageKey) || '[]'); 
      const index = transacciones.findIndex(t => t.id === id && t.usuario_id === userId); 
      if (index === -1) return null;
      transacciones[index] = { ...transacciones[index], ...nuevosValores };
      localStorage.setItem(this.storageKey, JSON.stringify(transacciones));
      return transacciones[index];
    } else {
      await this.db.runAsync(
        `UPDATE transacciones
         SET monto = ?, categoria = ?, fecha = ?, descripcion = ?, tipo = ?
         WHERE id = ? AND usuario_id = ?`, 
        monto, categoria, fecha, descripcion, tipo, id, userId 
      );
      return { id, ...nuevosValores };
    }
  }

  async deleteTransaccion(id) {
    const userId = this.getCurrentUserId(); 
    if (Platform.OS === 'web') {
      const transacciones = JSON.parse(localStorage.getItem(this.storageKey) || '[]'); 
      const nuevas = transacciones.filter(t => !(t.id === id && t.usuario_id === userId)); 
      localStorage.setItem(this.storageKey, JSON.stringify(nuevas));
      return true;
    } else {
      await this.db.runAsync('DELETE FROM transacciones WHERE id = ? AND usuario_id = ?', id, userId); 
      return true;
    }
  }

  // ===========================================================================================================================
  // PAGOS
  // ===========================================================================================================================
  async getAllPagos() {
    const userId = this.getCurrentUserId(); 
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKeyPagos);
      const todos = data ? JSON.parse(data) : []; 
      return todos.filter(p => p.usuario_id === userId); 
    } else {
      return await this.db.getAllAsync('SELECT * FROM pagos WHERE usuario_id = ? ORDER BY id DESC', userId); 
    }
  }

  async addPago(nombre, monto, fecha, metodo) {
    const userId = this.getCurrentUserId(); 
    if (Platform.OS === 'web') {
      const existing = JSON.parse(localStorage.getItem(this.storageKeyPagos) || '[]');
      const nuevo = { id: Date.now(), usuario_id: userId, nombre, monto, fecha, metodo }; 
      existing.unshift(nuevo);
      localStorage.setItem(this.storageKeyPagos, JSON.stringify(existing));
      return nuevo;
    } else {
      const result = await this.db.runAsync(
        `INSERT INTO pagos (usuario_id, nombre, monto, fecha, metodo)
         VALUES (?, ?, ?, ?, ?)`, 
        userId, nombre, monto, fecha, metodo 
      );
      return { id: result.lastInsertRowId, usuario_id: userId, nombre, monto, fecha, metodo }; 
    }
  }

  async updatePago(id, nuevosValores) {
    const userId = this.getCurrentUserId(); 
    const { nombre, monto, fecha, metodo } = nuevosValores;
    if (Platform.OS === 'web') {
      const pagos = JSON.parse(localStorage.getItem(this.storageKeyPagos) || '[]'); 
      const index = pagos.findIndex(p => p.id === id && p.usuario_id === userId); 
      if (index === -1) return null;
      pagos[index] = { ...pagos[index], ...nuevosValores };
      localStorage.setItem(this.storageKeyPagos, JSON.stringify(pagos));
      return pagos[index];
    } else {
      await this.db.runAsync(
        `UPDATE pagos
         SET nombre = ?, monto = ?, fecha = ?, metodo = ?
         WHERE id = ? AND usuario_id = ?`, 
        nombre, monto, fecha, metodo, id, userId 
      );
      return { id, ...nuevosValores };
    }
  }

  async deletePago(id) {
    const userId = this.getCurrentUserId(); 
    if (Platform.OS === 'web') {
      const pagos = JSON.parse(localStorage.getItem(this.storageKeyPagos) || '[]'); 
      const nuevas = pagos.filter(p => !(p.id === id && p.usuario_id === userId)); 
      localStorage.setItem(this.storageKeyPagos, JSON.stringify(nuevas));
      return true;
    } else {
      await this.db.runAsync('DELETE FROM pagos WHERE id = ? AND usuario_id = ?', id, userId); 
      return true;
    }
  }

  // ===========================================================================================================================
  // PRESUPUESTOS
  // ===========================================================================================================================
  async getAllPresupuestos() {
    const userId = this.getCurrentUserId(); 
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKeyPresupuestos);
      const todos = data ? JSON.parse(data) : []; 
      return todos.filter(p => p.usuario_id === userId); 
    } else {
      return await this.db.getAllAsync('SELECT * FROM presupuestos WHERE usuario_id = ? ORDER BY id DESC', userId); 
    }
  }

    async addPresupuesto(nombre, monto, categoria, anio) {
      const userId = this.getCurrentUserId(); 
      if (Platform.OS === 'web') {
        const existing = JSON.parse(localStorage.getItem(this.storageKeyPresupuestos) || '[]');

        const nueva = {
          id: Date.now(),
          usuario_id: userId, 
          nombre,
          monto,
          categoria,
          anio
        };

        existing.unshift(nueva);
        localStorage.setItem(this.storageKeyPresupuestos, JSON.stringify(existing));
        return nueva;
      } else {
        const result = await this.db.runAsync(
          `INSERT INTO presupuestos (usuario_id, nombre, monto, categoria, anio)
            VALUES (?, ?, ?, ?, ?)`, 
          userId, nombre, monto, categoria, anio 
        );

        return {
          id: result.lastInsertRowId,
          usuario_id: userId, 
          nombre,
          monto,
          categoria,
          anio
        };
      }
    }
        async updatePresupuesto(id, nombre, monto, categoria, anio) {
        const userId = this.getCurrentUserId(); 
        if (Platform.OS === 'web') {
            const existing = JSON.parse(localStorage.getItem(this.storageKeyPresupuestos) || '[]');
            const index = existing.findIndex(p => p.id === id && p.usuario_id === userId); 

            if (index === -1) throw new Error('Presupuesto no encontrado para actualizar.');

            const updated = {
                ...existing[index],
                nombre,
                monto,
                categoria,
                anio
            };

            existing[index] = updated;
            localStorage.setItem(this.storageKeyPresupuestos, JSON.stringify(existing));
            return updated;

        } else {
            await this.db.runAsync(
                `UPDATE presupuestos SET nombre = ?, monto = ?, categoria = ?, anio = ? WHERE id = ? AND usuario_id = ?`, 
                nombre, monto, categoria, anio, id, userId 
            );
            
            return { id, nombre, monto, categoria, anio };
        }
    }

    async deletePresupuesto(id) {
        const userId = this.getCurrentUserId(); 
        if (Platform.OS === 'web') {
            const existing = JSON.parse(localStorage.getItem(this.storageKeyPresupuestos) || '[]');
            const nuevas = existing.filter(p => !(p.id === id && p.usuario_id === userId)); 
            localStorage.setItem(this.storageKeyPresupuestos, JSON.stringify(nuevas));
            return true;
        } else {
            await this.db.runAsync('DELETE FROM presupuestos WHERE id = ? AND usuario_id = ?', id, userId); 
            return true;
        }
    }


}

export default new DatabaseService();