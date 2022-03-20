const { response, request } = require("express");

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

const createUsers = (req, res = response) => {
  const body = req.body;

  res.status(201).json({
    msg: "post API - controller",
    body,
  });
};

const deleteUsers = (req, res = response) => {
  res.status(403).json({
    msg: "delete API - controller",
  });
};
module.exports = { getUsers, createUsers, updateUsers, deleteUsers };
