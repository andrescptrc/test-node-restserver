const Role = require("../models/role");

const isAValidRole = async (role = "") => {
  const rolExists = await Role.findOne({ role });
  if (!rolExists) {
    throw new Error(`The role ${role} is not valid`);
  }
};

module.exports = { isAValidRole };
