export class Presupuesto {
    constructor(id, nombre, monto, categoria, anio) { 
        this.id = id;
        this.nombre = nombre;
        this.monto = monto;
        this.categoria = categoria;
        this.anio = anio;
    }

    static validarNombre(nombre) {
        if (!nombre) throw new Error('El mes es obligatorio');
    }

    static validarMonto(monto) {
        if (monto === undefined || monto === null) throw new Error('El monto es obligatorio');
        if (isNaN(monto)) throw new Error('El monto debe ser numérico');
        if (Number(monto) <= 0) throw new Error('El monto debe ser mayor que cero');
    }

    static validarCategoria(categoria) {
        if (!categoria || String(categoria).trim() === '') throw new Error('La categoría es obligatoria');
    }

    static validarAnio(anio) {
        if (anio === undefined || anio === null) throw new Error('El año es obligatorio');
        const anioNum = Number(anio);
        if (isNaN(anioNum) || anioNum < 2000 || anioNum > 2100) throw new Error('El año debe ser un valor válido de 4 dígitos (ej. 2024)');
    }

    static validarPresupuesto(obj) {
        this.validarNombre(obj.nombre);
        this.validarMonto(obj.monto);
        this.validarCategoria(obj.categoria);
        this.validarAnio(obj.anio);
    }
}
