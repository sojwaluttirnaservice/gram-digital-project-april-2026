const womensSavingsGroupNamesController = require("../../application/controllers/gp/womensSavingsGroupNamesController");
const getRouter = require("../../application/utils/getRouter");

const womensSavingsGroupNamesRouter = getRouter();

womensSavingsGroupNamesRouter.get(
    '/',
    womensSavingsGroupNamesController.renderListPage
);

womensSavingsGroupNamesRouter.get(
    '/add',
    womensSavingsGroupNamesController.renderAddPage
);

womensSavingsGroupNamesRouter.get(
    '/edit/:groupId',
    womensSavingsGroupNamesController.renderEditPage
);

womensSavingsGroupNamesRouter.post(
    '/',
    womensSavingsGroupNamesController.save
);

womensSavingsGroupNamesRouter.put(
    '/',
    womensSavingsGroupNamesController.update
);

womensSavingsGroupNamesRouter.delete(
    '/',
    womensSavingsGroupNamesController.delete
);

module.exports = womensSavingsGroupNamesRouter;
