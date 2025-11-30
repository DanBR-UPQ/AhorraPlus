import DatabaseService from '../database/DatabaseService';
import { Presupuesto } from '../models/presupuesto';

export class PresupuestoController {
  constructor() {
    this.listeners = [];
  }

  async initialize() {
    await DatabaseService.initialize();
  }

  async crearPresupuesto(nombre, monto, categoria) {
    try {
      Presupuesto.validarPresupuesto({ nombre, monto, categoria });

      const nuevo = await DatabaseService.addPresupuesto(
        nombre,
        Number(monto),
        categoria
      );

      this.notifyListeners();

      return new Presupuesto(
        nuevo.id,
        nuevo.nombre,
        nuevo.monto,
        nuevo.categoria
      );
    } catch (error) {
      console.error('Error al crear presupuesto: ', error);
      throw error;
    }
  }


  async actualizarPresupuesto(id, nombre, monto, categoria) {
    try {
      Presupuesto.validarPresupuesto({ nombre, monto, categoria }); 

      const actualizado = await DatabaseService.updatePresupuesto(
        id,
        nombre,
        Number(monto),
        categoria
      );

      this.notifyListeners(); 

      return new Presupuesto(
        actualizado.id,
        actualizado.nombre,
        actualizado.monto,
        actualizado.categoria
      );
    } catch (error) {
      console.error('Error al actualizar presupuesto: ', error);
      throw error;
    }
  }

  async eliminarPresupuesto(id) {
    try {
      await DatabaseService.deletePresupuesto(id);
      this.notifyListeners(); 
      return true;
    } catch (error) {
      console.error('Error al eliminar presupuesto: ', error);
      throw error;
    }
  }



  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback());
  }

  async obtenerTodosLosPresupuestos() {
    try {
      const resultadosDB = await DatabaseService.getAllPresupuestos();

      return resultadosDB.map(dbItem => new Presupuesto(
        dbItem.id,
        dbItem.nombre,
        dbItem.monto,
        dbItem.categoria
      ));
    } catch (error) {
      console.error('Error al obtener presupuestos:', error);
      return [];
    }
  }

  async obtenerPresupuestos() {
    return this.obtenerTodosLosPresupuestos();
  }
}

export default PresupuestoController;
