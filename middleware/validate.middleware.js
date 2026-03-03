module.exports = (requiredFields = []) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => {
      // treat only undefined as missing; allow falsy values like 0 or empty string
      return typeof req.body[field] === 'undefined';
    });

    // log and return missing fields when validation fails
    if (missingFields.length > 0) {
      try {
        console.error('[validate.middleware] path=%s missing=%o body=%o', req.path, missingFields, req.body);
      } catch (e) {
        // ignore logging errors
      }
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields,
      });
    }

    next();
  };
};