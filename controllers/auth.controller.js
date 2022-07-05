const { response, json } = require("express");

const argon2 = require("argon2");

const User = require("../models/user.model");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, email, image } = await googleVerify(id_token);
    let user = await User.findOne({ email });

    if (!user) {
      //I have to created
      const data = {
        name,
        email,
        password: ":P",
        image,
        role: "USER_ROLE",
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    //If the user is on DB
    if (!user.state) {
      return res.status(401).json({
        msg: "Contact with the admins - User Blocked",
      });
    }

    //Generate token
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Unable to verify token",
    });
  }
};

module.exports = { login, googleSignIn };
