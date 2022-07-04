const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const JWT_KEY = process.env.SECRETORPRIVATEKEY;

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "The token is required",
    });
  }

  try {
    const { uid } = jwt.verify(token, JWT_KEY);

    const authenticatedUser = await User.findById(uid);

    if (!authenticatedUser) {
      return res.status(401).json({
        msg: "The token is not valid - the user doesn't exist",
      });
    }

    //Verify if the uid is state = true
    if (!authenticatedUser.state) {
      return res.status(401).json({
        msg: "The token is not valid - state false",
      });
    }

    req.authenticatedUser = authenticatedUser;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "The token is not valid",
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
