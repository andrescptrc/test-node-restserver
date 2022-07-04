const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
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

module.exports = router;
