import { UnexpectedFieldError } from "../errors/UnexpectedFieldError.js";

const validateAllowedFields = (allowedFields = []) => {
    return (req, res, next) => {
        const sources = ["body", "query", "params"];
        const unexpectedFields = [];

        for (const source of sources) {
            const actualFields = Object.keys(req[source] || {});
            const extras = actualFields.filter(field => !allowedFields.includes(field));
            extras.forEach(field => {
                unexpectedFields.push(`${source}.${field}`);
            });
        }

        if (unexpectedFields.length > 0) {
            throw new UnexpectedFieldError(unexpectedFields);
        }

        next();
    };
};

export default validateAllowedFields;
