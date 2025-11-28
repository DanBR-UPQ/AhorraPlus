export class Presupuesto {
    constructor(id, nombre, monto, categoria) { 
        this.id = id;
        this.nombre = nombre;
        this.monto = monto;
        this.categoria = categoria;
    }

    static validarNombre(nombre) {
        if (!nombre || String(nombre).trim() === '') throw new Error('El nombre es obligatorio');
    }

    static validarMonto(monto) {
        if (monto === undefined || monto === null) throw new Error('El monto es obligatorio');
        if (isNaN(monto)) throw new Error('El monto debe ser numérico');
        if (Number(monto) <= 0) throw new Error('El monto debe ser mayor que cero');
    }

    static validarCategoria(categoria) {
        if (!categoria || String(categoria).trim() === '') throw new Error('La categoría es obligatoria');
    }

    static validarPresupuesto(obj) {
        this.validarNombre(obj.nombre);
        this.validarMonto(obj.monto);
        this.validarCategoria(obj.categoria);
    }
}
