import RequestValidationError from "../errors/RequestValidationError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";

const validateRequest = (validatorSchema) => {
    return asyncHandler(async (req, res, next) => {
        await Promise.all(validatorSchema.map(validation => validation.run(req)));

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        next();
    });
};

export default validateRequest;