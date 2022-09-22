const {
  GiveHeart,
  LikePost,
  getAllHearts,
} = require("../Controllers/LikesHeartsController");
const protect = require("../Middlewares/authMiddleware");

const routes = require("express").Router();

// like a post (id will be post id)

routes.post("/like", protect, LikePost);
routes.post("/heart", protect, GiveHeart);
routes.get("/heart", protect, getAllHearts);

module.exports = routes;
