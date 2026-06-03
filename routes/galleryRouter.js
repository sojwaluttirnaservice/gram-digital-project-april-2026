var GalleryController = require("../application/controllers/GalleryController");

const getRouter = require("../application/utils/getRouter");
let galleryRouter = getRouter();

galleryRouter.get("/", GalleryController.homeView);

galleryRouter.get("/list", GalleryController.renderGalleryPage)

galleryRouter.post("/", GalleryController.addNewFile);

galleryRouter.put("/edit/:id", GalleryController.editGalleryImage);

galleryRouter.post("/remove-image", GalleryController.removeImageFile);

module.exports = galleryRouter;
