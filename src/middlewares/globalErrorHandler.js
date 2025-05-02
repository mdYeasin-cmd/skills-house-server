import config from "../config/index.js";
import ApiError from "../errors/ApiError.js";
import RequestValidationError from "../errors/RequestValidationError.js";
import { UnexpectedFieldError } from "../errors/UnexpectedFieldError.js";

const globalErrorHandler = (err, req, res, next) => {
    console.log(err, "Error in global error handler.");

    let statusCode = 500;
    let message = "Something went wrong.";
    let errors = [];

    if (err instanceof RequestValidationError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    } else if (err instanceof UnexpectedFieldError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err;
    } else if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err;
    } else if (err instanceof Error) {
        message = err.message;
        errors = err;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errors,
        stack: config.node_env === "development" ? err?.stack : null,
    });
};

export default globalErrorHandler;