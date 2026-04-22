const namuna5kSamanyaController = require("../../../../application/controllers/namuna/namuna5k/namuna5kSamanyaController");
const getRouter = require("../../../../application/utils/getRouter");

const namuna5kSamanyaRouter = getRouter();

namuna5kSamanyaRouter.post("/pay", namuna5kSamanyaController.savePayment);

namuna5kSamanyaRouter.get(
  "/date",
  namuna5kSamanyaController.getNamuna5kPaymentDate,
);

module.exports = namuna5kSamanyaRouter;
