let masterModel = require('../model/MasterModel')
let HomeModel = require('../model/HomeModel')
let responderSet = require('../config/_responderSet')
let fs = require('fs')
const createBaseDir = require('./createBaseDir')
const { deleteRedisData } = require('../utils/redis')
const { gpDataRedisKey, commonDataRedisKey } = require('../utils/redisKeys')
const generateUniqueFileName = require('../utils/generateFileName')
const { saveFile } = require('../utils/saveFile')
let myDates = responderSet.myDate
let GalleryController = {

	homeView: function (req, res, next) {
		let gp = []
		let photoLimit = 200;
		HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				return masterModel.getGalleryImageList(res.pool)
			})
			.then((result) => {
				let btnOff = result.length >= photoLimit
				console.log('Images lenght = ', result.length)
				res.render('user/gallery/gallery_list', {
					gp: gp,
					gallery: result,
					link: `/gp/asstes/images/gallery/`,
					btn: btnOff,
				})
			})
			.catch((error) => {
				res.status(500).send({ call: error })
			})
	},

    addNewFile: async(req, res) =>{
        try {

            let galleryImageFile =  req.files.imageFile

            let { g_image_title, g_image_desc } = req.body;

            let imageName = generateUniqueFileName(galleryImageFile, 'g-img-')

            let destDir = `${createBaseDir.baseDir}/gp/asstes/images/gallery`

            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true })
            }

            let isGalleryImageSaved = await saveFile(galleryImageFile, `${destDir}/${imageName}`)

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
