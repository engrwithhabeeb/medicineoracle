const DB_ERROR_REGISTRY = require("../../db/dbError");

function globalErrorHandler(err, req, res, next) {
    const knowDbError = DB_ERROR_REGISTRY[err.code];

    if(knowDbError) {
        return res.status(knowDbError.status).json({
            error: {
                type: knowDbError.type,
                message: knowDbError.message(err),
            }
        })
    }

    const statusCode = err.status || 500;
    
    const errorType = err.type || (statusCode === 500 ? "InternalServerError" : "ApplicationError");

    res.status(statusCode).json({
        error: {
            type: errorType,
            message: err.message || "An unexpected application error occurred."
        }
    });
}

module.exports = globalErrorHandler;