const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controller");
const {
  validateValues,
} = require("../middlewares/values-validator.middlewares");

const router = Router();

router.post(
  "/login",
  [
    check("email", "The email is required").isEmail(),
    check("password", "The password is required").not().isEmpty(),
    validateValues,
  ],
  login
);

router.post(
  "/google",
  [
    check("id_token", "The id_token is required").not().isEmpty(),
    validateValues,
  ],
  googleSignIn
);

module.exports = router;
