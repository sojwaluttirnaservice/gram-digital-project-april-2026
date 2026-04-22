const HomeModel = require("../../application/model/HomeModel");

const namuna1Router = require("./namuna1/namuna1Router");
const namuna8Router = require("./namuna8/namuna8Router");

const namuna11Router = require("./namuna11Router");
const namuna12Router = require("./namuna12Router");
const namuna15Router = require("./namuna15Router");
const namuna13Router = require("./namuna13Router");
const namuna14Router = require("./namuna14Router");
const namuna16Router = require("./namuna16Router");
const namuna17Router = require("./namuna17Router");
const namuna18Router = require("./namuna18Router");
const namuna19Router = require("./namuna19Router");
const namuna20Router = require("./namuna20Router");
const namuna20CRouter = require("./namuna20CRouter");
const namuna21Router = require("./namuna21Router");
const namuna22Router = require("./namuna22Router");
const namuna23Router = require("./namuna23Router");
const namuna24Router = require("./namuna24Router");
// const namuna5CRouter = require('./namuna5CRouter');
// const namuna6Router = require('./namuna6Router');
const namuna25Router = require("./namuna25Router");
const namuna26Router = require("./remaining/namuna26Router");
const namuna27Router = require("./namuna27Router");
const namuna28Router = require("./namuna28Router");
const namuna29Router = require("./namuna29Router");
const namuna30Router = require("./namuna30Router");
const namuna31Router = require("./namuna31Router");
const namuna32Router = require("./namuna32Router");
const namuna33Router = require("./namuna33Router");
const namuna3Router = require("./namuna3/namuna3Router");
const namuna2Router = require("./remaining/namuna2Router");
const namuna4Router = require("./remaining/namuna4Router");
const namuna5Router = require("./remaining/namuna5Router");
const getRouter = require("../../application/utils/getRouter");
const asyncHandler = require("../../application/utils/asyncHandler");
const { renderPage } = require("../../application/utils/sendResponse");
const namuna7Router = require("./namuna7Router");
const namuna5kRouter = require("./remaining/5k/namuna5kRouter");
const namuna6Router = require("./namuna6/namuna6Router");

const namunaRouter = getRouter();

namunaRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    renderPage(res, "user/namuna/namuna-page.pug");
  }),
);

namunaRouter.use("/1", namuna1Router);

// latest
namunaRouter.use("/2", namuna2Router);

namunaRouter.use("/3", namuna3Router);

namunaRouter.use("/4", namuna4Router);

namunaRouter.use("/5", namuna5Router);

namunaRouter.use("/5k", namuna5kRouter);

namunaRouter.use('/6', namuna6Router);

namunaRouter.use("/7", namuna7Router);

namunaRouter.use("/8", namuna8Router);

namunaRouter.use("/11", namuna11Router);

namunaRouter.use("/12", namuna12Router);

namunaRouter.use("/13", namuna13Router);

namunaRouter.use("/14", namuna14Router);

namunaRouter.use("/15", namuna15Router);

namunaRouter.use("/16", namuna16Router);

namunaRouter.use("/17", namuna17Router);

namunaRouter.use("/18", namuna18Router);

namunaRouter.use("/19", namuna19Router);

namunaRouter.use("/20", namuna20Router);

namunaRouter.use("/20/c", namuna20CRouter);

namunaRouter.use("/21", namuna21Router);

namunaRouter.use("/22", namuna22Router);

namunaRouter.use("/23", namuna23Router);

namunaRouter.use("/24", namuna24Router);

namunaRouter.use("/25", namuna25Router);

namunaRouter.use("/26", namuna26Router);

namunaRouter.use("/27", namuna27Router);

namunaRouter.use("/28", namuna28Router);

namunaRouter.use("/29", namuna29Router);

namunaRouter.use("/30", namuna30Router);

namunaRouter.use("/31", namuna31Router);

namunaRouter.use("/32", namuna32Router);

namunaRouter.use("/33", namuna33Router);

module.exports = namunaRouter;
