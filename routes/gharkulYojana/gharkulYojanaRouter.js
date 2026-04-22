const express = require("express");
const gharkulYojanaRouter = express.Router();

const middleware = require("../middleware");

const gharkulYojanaController = require("../../application/controllers/gharkulYojana/gharkulYojanaController");

gharkulYojanaRouter.get(
  "/",
  middleware.checkForPoolConnection,
  gharkulYojanaController.renderGharkulYojanaPage
);
gharkulYojanaRouter.post(
  "/create",
  middleware.checkForPoolConnection,
  gharkulYojanaController.createGharkulYojana
);
gharkulYojanaRouter.put(
  "/update",
  middleware.checkForPoolConnection,
  gharkulYojanaController.updateGharkulYojana
);
gharkulYojanaRouter.delete(
  "/delete",
  middleware.checkForPoolConnection,
  gharkulYojanaController.deleteGharkulYojana
);

module.exports = gharkulYojanaRouter;
