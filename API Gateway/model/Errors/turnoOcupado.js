
class TurnoOcupado extends Error {
   
    constructor() {
        super('Turno ocupado');
        this.status=406;
    }
}

module.exports = {
    TurnoOcupado
}