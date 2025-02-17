const errorHandler = (err, req, res, next) => {
    console.error("Error handler", error);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Server error";
    const errorCode = err.code || "Server error";

    res.statusCode(statusCode).json({ success: false, message, code: errorCode, stack: err.stack });
}

module.exports = errorHandler;