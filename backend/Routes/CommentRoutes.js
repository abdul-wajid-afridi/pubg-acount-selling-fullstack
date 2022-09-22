const {
  insertComments,
  getComments,
  DeleteComments,
  UpdateComments,
} = require("../Controllers/Comments");
const protect = require("../Middlewares/authMiddleware");

const routes = require("express").Router();

routes.post("/comments/:id", protect, insertComments);
routes.get("/comments/:id", getComments);
routes.delete("/comments/delete/:id", protect, DeleteComments);
routes.put("/comments/update/:id", protect, UpdateComments);

module.exports = routes;
