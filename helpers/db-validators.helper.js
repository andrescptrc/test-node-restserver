const Role = require("../models/role");
const User = require("../models/user.model");

const isAValidRole = async (role = "") => {
  const rolExists = await Role.findOne({ role });
  if (!rolExists) {
    throw new Error(`The role ${role} is not valid`);
  }
};

const existEmail = async (email = "") => {
  // Verify if the email exists
  const existEmail = await User.findOne({ email });

  if (existEmail) {
    throw new Error(`The email ${email} is already registered`);
  }
};

const existUserById = async (id) => {
  // Verify if the user exists
  const existEmail = await User.findById(id);

  if (!existEmail) {
    throw new Error(`The id: ${id} doesn't exist`);
  }
};

module.exports = { isAValidRole, existEmail, existUserById };
