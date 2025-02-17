class Exeption extends Error {
    constructor(message, statusCode, code) {
        super(message, statusCode);
        this.code = code;
    }
}

module.exports = Exeption;