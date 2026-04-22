const lokAdalatNoticesController = require("../../application/controllers/notices/lokAdalatNoticesController");
const { checkForPoolConnection } = require("../middleware");
const getRouter = require("../../application/utils/getRouter");

const lokAdalatNoticesRouter = getRouter();

lokAdalatNoticesRouter.post("/add", lokAdalatNoticesController.add);

lokAdalatNoticesRouter.put("/update", lokAdalatNoticesController.update);

lokAdalatNoticesRouter.delete("/delete", lokAdalatNoticesController.delete);

lokAdalatNoticesRouter.get("/add", lokAdalatNoticesController.renderAddPage);

lokAdalatNoticesRouter.get(
  "/edit/:lokAdalatNoticeId",
  lokAdalatNoticesController.renderEditPage
);

lokAdalatNoticesRouter.get("/list", lokAdalatNoticesController.renderListPage);

lokAdalatNoticesRouter.get(
  "/print",
  lokAdalatNoticesController.renderPrintPage
);

lokAdalatNoticesRouter.get(
    '/print/printFormNineAllSamanya',
    lokAdalatNoticesController.printFormNineAllSamanya
)

lokAdalatNoticesRouter.get(
  "/print/:lokAdalatNoticeId",
  lokAdalatNoticesController.renderSinglePrintPage
);


module.exports = lokAdalatNoticesRouter;
