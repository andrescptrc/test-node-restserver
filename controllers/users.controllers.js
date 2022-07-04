const { response, request } = require("express");
const argon2 = require("argon2");

const User = require("../models/user.model");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const queryUser = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(queryUser),
    User.find(queryUser).skip(from).limit(limit),
  ]);

  res.json({ total, users });
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

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({ user });
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

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  //Delete total
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  return res.json({
    user,
  });
};

module.exports = { getUsers, createUsers, updateUsers, deleteUsers };
