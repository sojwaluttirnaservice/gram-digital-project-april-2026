const pptSlidesController = require("../../application/controllers/ppt/pptSlidesController");
const getRouter = require("../../application/utils/getRouter");
const pptSlidesRouter = getRouter();

pptSlidesRouter.get("/api/list/:pptId", pptSlidesController.getSlides);

pptSlidesRouter.get(
  "/list/page/:pptId",
  pptSlidesController.renderSlideListPage,
);

pptSlidesRouter.get(
  "/create/:pptId",
  pptSlidesController.renderCreateSlidePage,
);

pptSlidesRouter.get("/edit/:id", pptSlidesController.renderEditSlidePage);

// create
pptSlidesRouter.post("/", pptSlidesController.createSlide);

// update
pptSlidesRouter.put("/", pptSlidesController.updateSlide);

// delete
pptSlidesRouter.delete("/", pptSlidesController.deleteSlide);

module.exports = pptSlidesRouter;
