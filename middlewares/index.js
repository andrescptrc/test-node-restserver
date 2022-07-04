const valuesValidator = require("../middlewares/values-validator.middlewares");
const validatJWT = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
  ...valuesValidator,
  ...validatJWT,
  ...validateRoles,
};
