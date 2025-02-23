
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

         // Created stack Property
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;