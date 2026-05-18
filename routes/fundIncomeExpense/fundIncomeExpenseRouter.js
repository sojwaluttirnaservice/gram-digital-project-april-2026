const fundIncomeExpenseController = require("../../application/controllers/fundIncomeExpense/fundIncomeExpenseController");

const getRouter = require("../../application/utils/getRouter");

const fundIncomeExpenseRouter = getRouter();



/* =========================================================
    RENDER PAGES
========================================================= */

fundIncomeExpenseRouter.get(
    '/',
    fundIncomeExpenseController.renderFundIncomeExpenseListPage
)

fundIncomeExpenseRouter.get(
    '/list',
    fundIncomeExpenseController.renderFundIncomeExpenseOutsideListPage
)

fundIncomeExpenseRouter.get(
    '/add',
    fundIncomeExpenseController.renderAddFundIncomeExpensePage
)

fundIncomeExpenseRouter.get(
    '/edit/:id',
    fundIncomeExpenseController.renderEditFundIncomeExpensePage
)

fundIncomeExpenseRouter.get(
    '/images/:fundId',
    fundIncomeExpenseController.renderFundIncomeExpenseImagesPage
)

fundIncomeExpenseRouter.get(
    '/images-list/:fundId',
    fundIncomeExpenseController.renderFundIncomeExpenseImagesOutsidePage
)

/* =========================================================
    CRUD
========================================================= */

fundIncomeExpenseRouter.post(
    '/',
    fundIncomeExpenseController.save
)

fundIncomeExpenseRouter.put(
    '/',
    fundIncomeExpenseController.update
)

fundIncomeExpenseRouter.delete(
    '/delete/:id',
    fundIncomeExpenseController.delete
)



/* =========================================================
    FETCH
========================================================= */

fundIncomeExpenseRouter.get(
    '/fetch-all',
    fundIncomeExpenseController.fetchAll
)

fundIncomeExpenseRouter.get(
    '/fetch/:id',
    fundIncomeExpenseController.fetchById
)



/* =========================================================
    IMAGES
========================================================= */

fundIncomeExpenseRouter.post(
    '/image/save',
    fundIncomeExpenseController.saveImage
)

fundIncomeExpenseRouter.put(
    '/image/update',
    fundIncomeExpenseController.updateImage
)

fundIncomeExpenseRouter.delete(
    '/image/delete/:id',
    fundIncomeExpenseController.deleteImage
)

fundIncomeExpenseRouter.get(
    '/image/fetch/:fundId',
    fundIncomeExpenseController.fetchImagesByFundId
)



module.exports = fundIncomeExpenseRouter