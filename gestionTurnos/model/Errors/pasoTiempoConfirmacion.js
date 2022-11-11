class pasoTiempoConfirmacion extends Error {
    constructor() {
        super('Tiempo de confirmacion agotado');
        this.status=408;
    }
}

module.exports = {
    pasoTiempoConfirmacion
}