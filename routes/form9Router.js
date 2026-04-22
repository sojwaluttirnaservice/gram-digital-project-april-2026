var fromNightController = require("../application/controllers/FromNightController");
const getRouterWithSession = require("../application/utils/getRouterWithSession");
const namuna9BlankRouter = require("./namuna/namuna9/namuna9BlankRouter");

let form9Router = getRouterWithSession();

form9Router.get("/", fromNightController.homeView);
form9Router.get("/yadi", fromNightController.getYadi);
form9Router.get("/:id", fromNightController.getFormNightView);

form9Router.post(
  "/addNewFormNineEntry",
  fromNightController.addNewFormNineEntry
);

form9Router.use("/blanks", namuna9BlankRouter);

module.exports = form9Router;
