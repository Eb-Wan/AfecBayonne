exports.errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something failed"
    console.log(err);
    res.status(statusCode).json({ success: false, message });
};