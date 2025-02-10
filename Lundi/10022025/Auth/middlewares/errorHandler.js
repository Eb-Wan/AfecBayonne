exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something has failed";
    res.status(statusCode).json({ success:false, message });
    console.error(err);
}