const { response, request } = require("express");
const argon2 = require("argon2");

const User = require("../models/user.model");

const getUsers = (req = request, res = response) => {
  const { q, name = "No name", apiKey } = req.query;

  res.status(403).json({
    msg: "get API - controller",
    q,
    name,
    apiKey,
  });
};

const updateUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  //TODO: validate id on bd
  if (password) {
    //Encript the password
    const hashPassword = await argon2.hash(password);
    rest.password = hashPassword;
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(400).json({
    msg: "The user has been updated succesfully",
    user,
  });
};

const createUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encript the password
  const hashPassword = await argon2.hash(password);
  user.password = hashPassword;

  //Save on db
  await user.save();

  res.status(201).json({
    user,
  });
};

const deleteUsers = (req, res = response) => {
  res.status(403).json({
    msg: "delete API - controller",
  });
};
module.exports = { getUsers, createUsers, updateUsers, deleteUsers };
