class errorClass extends Error {
    constructor(statusCode, message, detailedMessage = "") {
        super(message);
        this.statusCode = statusCode;
        this.detailedMessage = detailedMessage;
    }
}
module.exports = errorClass;