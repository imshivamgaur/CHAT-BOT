const errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Internal server error";
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: message,
    error: err.error || "null",
  });
};

export default errorMiddleware;
