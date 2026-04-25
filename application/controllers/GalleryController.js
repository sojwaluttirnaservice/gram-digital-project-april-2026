let masterModel = require('../model/MasterModel')
let HomeModel = require('../model/HomeModel')
let responderSet = require('../config/_responderSet')
let fs = require('fs')
const { deleteRedisData } = require('../utils/redis')
const { gpDataRedisKey, commonDataRedisKey } = require('../utils/redisKeys')
const generateUniqueFileName = require('../utils/generateFileName')
const { saveFile } = require('../utils/saveFile')
const asyncHandler = require('../utils/asyncHandler')
const { renderPage } = require('../utils/sendResponse')
const { UPLOAD_PATHS } = require('../config/uploadPaths')

let photoLimit = 200;

let GalleryController = {

    homeView: asyncHandler(async (req, res) => {
        const gallery = await masterModel.getGalleryImageList(res.pool)
        let btnOff = gallery.length >= photoLimit;
        renderPage(res, 'user/gallery/gallery_list', {
            gallery,
            link: `/gp/asstes/images/gallery/`,
            btn: btnOff
        })
    }),


    addNewFile: async(req, res) =>{
        try {

            let galleryImageFile =  req.files.imageFile

            let { g_image_title, g_image_desc } = req.body;

            let imageName = generateUniqueFileName(galleryImageFile, 'g-img-')

            let isGalleryImageSaved = await saveFile(galleryImageFile, `${UPLOAD_PATHS.gallery.village}/${imageName}`)

            if(!isGalleryImageSaved){
                return res.status(500).json({ call: 0, data: "Unable to save the gallery image"})
            }

            await masterModel.saveNewGalleryImage(res.pool, {imageName, g_image_title, g_image_desc})

            await deleteRedisData(gpDataRedisKey)
            await deleteRedisData(commonDataRedisKey)

            return res.status(200).json({
                call: 1,
            })


        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ call: 0, data: err })
        }
    },

	removeImageFile: function (req, res, next) {
		masterModel
			.removeImageFromList(res.pool, Number(req.body.id))
			.then(async (result) => {
				await deleteRedisData(gpDataRedisKey)
				await deleteRedisData(commonDataRedisKey)
				fs.unlink(
					'./public/gp/asstes/images/gallery/' + req.body.image,
					function (err) {
						res.status(200).send({ call: 1, data: req.body.image })
					}
				)
			})
			.catch((error) => {
				res.status(500).send({ call: 0, data: error })
			})
	},
}
module.exports = GalleryController
