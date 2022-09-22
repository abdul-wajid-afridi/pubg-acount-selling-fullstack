const express = require("express");

const {
  postIdDetails,
  getIdDetails,
  deleteIdDetails,
  updateIdDetails,
  getUsersPosts,
} = require("../Controllers/IdDetailsController");
const protect = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/UploadFile");

const routes = express.Router();

// getting id details data
routes.get("/idDetails", getIdDetails);
routes.get("/users-posts", protect, getUsersPosts);
// routes.get("/users-posts2", getUsersPosts2);

// posting id details data
routes.post("/idDetails", protect, upload.array("image"), postIdDetails);

// updating id details data
routes.put(
  "/idDetails/update/:id",
  upload.array("image"),
  protect,
  updateIdDetails
);

// deleting id details data
routes.delete("/idDetails/delete/:id", protect, deleteIdDetails);

module.exports = routes;
