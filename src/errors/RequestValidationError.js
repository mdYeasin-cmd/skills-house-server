class RequestValidationError extends Error {
    constructor(errors) {
        super('Validation Error');
        this.name = 'RequestValidationError';
        this.statusCode = 400;
        this.errors = errors;
    }
}

export default RequestValidationError;