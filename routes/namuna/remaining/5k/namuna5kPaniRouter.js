const namuna5kPaniController = require("../../../../application/controllers/namuna/namuna5k/namuna5kPaniController");
const getRouter = require("../../../../application/utils/getRouter");

const namuna5kPaniRouter = getRouter();

namuna5kPaniRouter.post("/pay", namuna5kPaniController.savePayment);

namuna5kPaniRouter.get("/date", namuna5kPaniController.getNamuna5kPaymentDate);

module.exports = namuna5kPaniRouter;
