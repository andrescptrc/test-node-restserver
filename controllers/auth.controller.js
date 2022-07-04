const { response } = require("express");
const { existEmail } = require("../helpers/db-validators.helper");
const argon2 = require("argon2");

const User = require("../models/user.model");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //Verify if the user exist
    if (!user) {
      return res.status(400).json({
        msg: "No user found for this email/password",
      });
    }

    //Verify if the user is deleted
    if (!user.state) {
      return res.status(400).json({
        msg: "This user is deleted",
      });
    }

    //Verify password
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "The credentials are not correct",
      });
    }

    //Generate token
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong...",
    });
  }
};

module.exports = { login };
