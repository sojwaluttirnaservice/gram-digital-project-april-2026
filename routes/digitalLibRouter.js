const dbService = require("../application/services/db.service");
const asyncHandler = require("../application/utils/asyncHandler");
const getRouter = require("../application/utils/getRouter");
const { renderPage } = require("../application/utils/sendResponse");

const digitalLibRouter = getRouter();

digitalLibRouter.get('/list',
	asyncHandler(async (req, res) => {
		let {success, message, data} = await dbService.getLibData();
		renderPage(res, 'user/digital-lib/digital-lib-page.pug', {
			digitalLib: data?.digitalLib || []
		})
	}),
)
module.exports = digitalLibRouter