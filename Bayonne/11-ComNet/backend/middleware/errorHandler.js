const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    const status = err.statusCode || 500;
    res.status(status).json({ success: false, message: err.message }).end();
};

module.exports = errorHandler;