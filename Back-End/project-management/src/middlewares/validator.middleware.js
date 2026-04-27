import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";

const validate = (req, res, next) => {
    const errors = validationResult(req) // it's check and get all errors which are came from req then grab them in array

    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map((err) => (
        {
            [err.path]: err.msg
        }
    ))

    throw new ApiError(422, "Received some data errors", extractedErrors);

}

export {
    validate
}