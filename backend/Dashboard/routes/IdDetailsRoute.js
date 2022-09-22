const express = require("express");
const {
  getIdDetails,
  deleteIdDetails,
} = require("../../Controllers/IdDetailsController");
const adminProtect = require("../../Middlewares/AdminMiddleware");

const routes = express.Router();

// getting id details data
routes.get("/idDetails", adminProtect, getIdDetails);

// deleting id details data
routes.delete("/idDetails/delete/:id", adminProtect, deleteIdDetails);

module.exports = routes;
