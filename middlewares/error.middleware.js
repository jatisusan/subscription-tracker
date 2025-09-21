const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Default error object
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server Error";

  // Handle specific Mongoose errors
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Prevent sending headers twice
  if (res.headersSent) {
    return next(err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;
