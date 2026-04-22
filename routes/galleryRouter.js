var GalleryController = require("../application/controllers/GalleryController");

const getRouter = require("../application/utils/getRouter");
let galleryRouter = getRouter();

galleryRouter.get("/", GalleryController.homeView);

galleryRouter.post("/", GalleryController.addNewFile);

galleryRouter.post("/remove-image", GalleryController.removeImageFile);

module.exports = galleryRouter;
