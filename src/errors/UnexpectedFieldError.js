export class UnexpectedFieldError extends Error {
    constructor(fields) {
        super("Unexpected fields detected");
        this.name = "UnexpectedFieldError";
        this.statusCode = 400;
        this.fields = fields;
    }
}
