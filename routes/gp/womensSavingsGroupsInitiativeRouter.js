const womensSavingsGroupsInitiativeController = require("../../application/controllers/gp/womensSavingsGroupsInitiativeController");
const getRouter = require("../../application/utils/getRouter");

const womensSavingsGroupsInitiativeRouter = getRouter();

womensSavingsGroupsInitiativeRouter.get(
    '/',
    womensSavingsGroupsInitiativeController.renderListPage
);

womensSavingsGroupsInitiativeRouter.get(
    '/add',
    womensSavingsGroupsInitiativeController.renderAddPage
);

womensSavingsGroupsInitiativeRouter.get(
    '/edit/:pointId',
    womensSavingsGroupsInitiativeController.renderEditPage
);

womensSavingsGroupsInitiativeRouter.post(
    '/',
    womensSavingsGroupsInitiativeController.save
);

womensSavingsGroupsInitiativeRouter.put(
    '/',
    womensSavingsGroupsInitiativeController.update
);

womensSavingsGroupsInitiativeRouter.delete(
    '/',
    womensSavingsGroupsInitiativeController.delete
);

module.exports = womensSavingsGroupsInitiativeRouter;
