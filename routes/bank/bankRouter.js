const bankController = require("../../application/controllers/bank/bankController");
const getRouter = require("../../application/utils/getRouter");

const bankRouter = getRouter();

bankRouter.get(
    '/form',
    bankController.renderBankFormPage
)
bankRouter.get(
    '/',
    bankController.renderBankListPage
)

bankRouter.post(
    '/',
    bankController.save
)

bankRouter.put(
    '/',
    bankController.update
)

bankRouter.delete(
    '/',
    bankController.delete
)

module.exports = bankRouter