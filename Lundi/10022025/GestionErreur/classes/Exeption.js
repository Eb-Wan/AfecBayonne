class Exeption extends Error {
    constructor(message, statusCode) {
        super(message, statusCode);
        this.statusCode = 404;
    }
}

module.exports = Exeption;