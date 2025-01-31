const errorHandler = (err, req, res, next) => {
    if (err.statusCode >= 500) console.error(err);
    const status = err.statusCode || 500;
    res.status(status).json({ success: false, message: err.message }).end();
};

module.exports = errorHandler;