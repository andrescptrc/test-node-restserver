const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users.controllers");
const { isAValidRole, existEmail } = require("../helpers/db-validators.helper");
const {
  validateValues,
} = require("../middlewares/values-validator.middlewares");

const router = Router();

router.get("/", getUsers);

router.put("/:id", updateUsers);

router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password should have more of 6 characters").isLength(
      { min: 6 }
    ),
    check("email", "The email is not valid").isEmail(),
    // check("role", "The rol is not valid").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isAValidRole),
    check("email").custom(existEmail),
    validateValues,
  ],
  createUsers
);

router.delete("/", deleteUsers);

module.exports = router;
