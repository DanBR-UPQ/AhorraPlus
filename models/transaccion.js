

export class Transaccion {
    constructor(id, monto, categoria, fecha, descripcion, tipo) {
            this.id = id;
            this.monto = monto;
            this.categoria = categoria;
            this.fecha = fecha;
            this.descripcion = descripcion;
            this.tipo = tipo;
    }
    
    static validarMonto(monto) {
        if (monto === undefined || monto === null) {
            throw new Error("El monto es obligatorio");
        }
        if (isNaN(monto)) {
            throw new Error("El monto debe ser un número");
        }
        if (monto <= 0) {
            throw new Error("El monto debe ser mayor que cero");
        }
    }
    
    static validarCategoria(categoria) {
        const categoriasValidas = [
            "Servicios",
            "Entretenimiento",
            "Despensa",
            "Transporte",
            "Otro",
            "Salario",
            "Inversiones",
            "Regalos"
        ];
        if (!categoriasValidas.includes(categoria)) {
            throw new Error("Categoría inválida");
        }
    }

    static validarDescripcion(descripcion) {
        const palabras = descripcion.trim().split(/\s+/);
        if (palabras.length > 30) {
            throw new Error("La descripción no puede tener más de 30 palabras");
        }
    }
    
    static validarTipo(tipo) {
        if (!["Gasto", "Ingreso"].includes(tipo)) {
            throw new Error("El tipo debe ser 'Gasto' o 'Ingreso'");
        }
    }
}