const { Router } = require("express");
const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users.controllers");

const router = Router();

router.get("/", getUsers);

router.put("/:id", updateUsers);

router.post("/", createUsers);

router.delete("/", deleteUsers);

module.exports = router;
