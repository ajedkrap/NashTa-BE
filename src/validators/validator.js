module.exports = {
  throw: (status, message = "", passed = {}) => ({
    status,
    message,
    passed,
  }),
  safeString: (string) => string || "",
};
