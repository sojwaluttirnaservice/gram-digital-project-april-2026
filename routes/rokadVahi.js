const getRouter = require("../application/utils/getRouter");
var rokadVahiRouter = getRouter();

let rokadController = require("../application/controllers/rokadController");

rokadVahiRouter.get("/rokad-vahi", rokadController.getRokadVahiPage);

rokadVahiRouter.get("/samanya-rokad-vahi", rokadController.getSamanyaRokadVahi);

rokadVahiRouter.get("/pani-rokad-vahi", rokadController.getPaniRokadVahi);

rokadVahiRouter.get("/namuna5K", rokadController.getNamuma5K);

// rokadVahiRouter.get("/dakhle-pay-list", rokadController.getDakhlaPaylistView);

rokadVahiRouter.get(
  "/all-rokad-vahi-records",
  rokadController.getSamanyaAndPaniRokadVahiRecords,
);

module.exports = rokadVahiRouter;
