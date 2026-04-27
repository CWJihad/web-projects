// this is the alternative version of healthcheck.controllers.js code base try-catch formula
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export {asyncHandler}