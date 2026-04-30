const { Router } = require("express");
const dbController = require("../../application/controllers/db/dbController");
const getRouter = require("../../application/utils/getRouter");

const dbRouter = getRouter();


dbRouter.get(
    '/list',
    dbController.renderDbListPage
)


dbRouter.post(
    '/clone',
    dbController.dbClone
)

module.exports = dbRouter