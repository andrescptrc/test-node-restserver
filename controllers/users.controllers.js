const { response, request } = require("express");

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

const updateUsers = (req, res = response) => {
  const { id } = req.params;

  res.status(400).json({
    msg: "put API - controller",
    id: Number(id),
  });
};

const createUsers = async (req, res = response) => {
  const body = req.body;
  const user = new User(body);

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
