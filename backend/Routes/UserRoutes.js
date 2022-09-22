const {
  registerUser,
  getUsers,
  loginUser,
} = require("../Controllers/UserController");
// const protect = require("../Middlewares/authMiddleware");

const router = require("express").Router();

router.get("/register/", getUsers);
router.post("/register/", registerUser);
router.post("/login/", loginUser);

module.exports = router;
