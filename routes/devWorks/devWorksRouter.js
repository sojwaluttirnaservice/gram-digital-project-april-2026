const devWorksController = require("../../application/controllers/devWorks/devWorksController")

const getRouter = require("../../application/utils/getRouter")

const devWorksRouter = getRouter()



/* =========================================================
    RENDER PAGES
========================================================= */

devWorksRouter.get(
    '/',
    devWorksController.renderDevWorksListPage
)

devWorksRouter.get(
    '/list',
    devWorksController.renderDevWorksOutsideListPage
)

devWorksRouter.get(
    '/add',
    devWorksController.renderAddDevWorksPage
)

devWorksRouter.get(
    '/edit/:id',
    devWorksController.renderEditDevWorksPage
)

devWorksRouter.get(
    '/images/:devWorkId',
    devWorksController.renderDevWorksImagesPage
)

devWorksRouter.get(
    '/images-list/:devWorkId',
    devWorksController.renderDevWorksImagesOutsidePage
)



/* =========================================================
    CRUD
========================================================= */

devWorksRouter.post(
    '/save',
    devWorksController.save
)

devWorksRouter.post(
    '/update',
    devWorksController.update
)

devWorksRouter.delete(
    '/delete/:id',
    devWorksController.delete
)



/* =========================================================
    FETCH
========================================================= */

devWorksRouter.get(
    '/fetch-all',
    devWorksController.fetchAll
)

devWorksRouter.get(
    '/fetch/:id',
    devWorksController.fetchById
)



/* =========================================================
    IMAGES
========================================================= */

devWorksRouter.post(
    '/image/save',
    devWorksController.saveImage
)

devWorksRouter.post(
    '/image/update',
    devWorksController.updateImage
)

devWorksRouter.delete(
    '/image/delete/:id',
    devWorksController.deleteImage
)

devWorksRouter.get(
    '/image/fetch/:devWorkId',
    devWorksController.fetchImagesByDevWorkId
)



module.exports = devWorksRouter