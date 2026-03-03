exports.success = (res, statusCode, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    ...data,
  });
};

exports.error = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};