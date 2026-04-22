const FromPrintController = require("../application/controllers/FromPrintController");
var SelfDeclarationController = require("../application/controllers/SelfDeclarationController");
const asyncHandler = require("../application/utils/asyncHandler");
const getRouter = require("../application/utils/getRouter");

const selfDeclarationRouter = getRouter();

selfDeclarationRouter.get("/", SelfDeclarationController.getList);

// newly added
selfDeclarationRouter.get(
  "/form",
  SelfDeclarationController.renderSelfDeclarationFormPage,
);

selfDeclarationRouter.get(
  "/print/:id",
  SelfDeclarationController.renderSelfDeclarationPrintPage,
);

selfDeclarationRouter.get(
  "/new",
  SelfDeclarationController.addNewSelfDeclarationView,
);

selfDeclarationRouter.post(
  "/save-details",
  SelfDeclarationController.addNewSelfDeclaration,
);

selfDeclarationRouter.post(
  "/",
  //   asyncHandler(async (req, res, next) => {
  //     // will do someting later if needed
  //     let { certificateType } = req.body;
  //     switch (certificateType) {
  //       case "बेरोजगार_प्रमाणपत्र":
  //         SelfDeclarationController.saveUnemploymentSelfDeclaration(req, res);
  //         break;

  //       case "रहिवासी_प्रमाणपत्र":
  //         SelfDeclarationController.saveResidentialSelfDeclaration(req, res)
  //         break;
  //     }
  //   }),
  SelfDeclarationController.saveSelfDeclaration,
);

selfDeclarationRouter.post(
  "/delete/:id",
  SelfDeclarationController.deleteSelfDeclaration,
);

selfDeclarationRouter.get(
  "/s/:id",
  async (req, res, next) => {
    let { id } = req.params;
    req.query.i = id;
    req.query.appType = "रहिवासी घोषणापत्र";

    next();
  },
  FromPrintController.printSelfDeclaration,
);

selfDeclarationRouter.get(
  "/e/:id",
  async (req, res, next) => {
    let { id } = req.params;
    req.query.i = id;
    req.query.appType = "हयातीचे घोषणापत्र";

    next();
  },
  FromPrintController.printSelfDeclaration,
);

selfDeclarationRouter.get(
  "/noc/:id",
  async (req, res, next) => {
    let { id } = req.params;
    req.query.i = id;
    req.query.appType = "ना हरकत घोषणापत्र";

    next();
  },
  FromPrintController.printSelfDeclaration,
);

selfDeclarationRouter.get(
  "/t/:id",
  async (req, res, next) => {
    let { id } = req.params;
    req.query.i = id;
    req.query.appType = "शौचालय घोषणापत्र";

    next();
  },
  FromPrintController.printSelfDeclaration,
);


selfDeclarationRouter.get(
    "/report-cert",
    SelfDeclarationController.getListByCertificates
)

module.exports = selfDeclarationRouter;
