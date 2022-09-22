const { getComments, DeleteComments } = require("../../Controllers/Comments");
const adminProtect = require("../../Middlewares/AdminMiddleware");

const routes = require("express").Router();

routes.get("/comments/:id", adminProtect, getComments);
routes.delete("/comments/delete/:id", adminProtect, DeleteComments);

module.exports = routes;
