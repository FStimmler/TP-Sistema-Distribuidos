
class Sinturno extends Error {
    constructor() {
        super('Sin turno');
        this.status=404;
    }
}

module.exports = {
    Sinturno
}