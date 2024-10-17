const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    success: false, // Indicate failure
    message: err.message,
    status: statusCode, // Include status code for clarity
    // Optionally include any additional information relevant to your use case
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    // You can add more fields as necessary, e.g., error type, hospital-related info, etc.
  });
};

module.exports = {
  errorHandler,
};