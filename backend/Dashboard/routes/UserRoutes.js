const {
  getUsers,
  adminLogin,
  deleteUser,
  registerAdmin,
} = require("../../Controllers/UserController");
const adminProtect = require("../../Middlewares/AdminMiddleware");
const router = require("express").Router();

// router.get("/register/", adminProtect, getUsers);
// just for testing
router.get("/register/", getUsers);
router.post("/admin/", adminLogin);
router.post("/register-admin/", adminProtect, registerAdmin);
router.post("/delete-user/", adminProtect, deleteUser);

module.exports = router;
