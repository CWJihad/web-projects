// Chatgpt

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};


//Udemy Hitesh

// import mongoose from "mongoose";
// import { ApiError } from "../utils/apiError.js";

// const errorHandler = (err, req, res, next) => {
//   let error = err

//   if (!(error instanceof ApiError)) {
//     const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500
//     const message = error.message || "Something went wrong"
//     error = new ApiError(statusCode, message, error?.errors || [], err.stack)
//   }

//   const response = {
//     ...error,
//     message: error.message,
//     ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {} )
//   }
  
//   return res.status(error.statusCode).json(response)
  
// }

export { errorHandler };
