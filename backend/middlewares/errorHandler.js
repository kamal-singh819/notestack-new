const errorHandler = (err, req, res, next) => {
    console.log('Error handler middleware');
    const errStatus = err.statusCode || 500;
    const errMessage = err.message || "Something went wrong";
    res.status(errStatus).send({success: false, status: errStatus, message: errMessage});
}

export default errorHandler;