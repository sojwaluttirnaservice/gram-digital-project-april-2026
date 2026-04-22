var masterModel = require("../model/MasterModel");
let HomeModel = require("../model/HomeModel");
var fs = require("fs");
// var fsPromise = require('node:fs/promises')
var responderSet = require("../config/_responderSet");
const MasterModel = require("../model/MasterModel");
const path = require("path");
const CandidateController = require("./HomeController");
const meetingsModel = require("../model/zoom-meetings/meetingsModel");
const { deleteRedisData } = require("../utils/redis");
const { gpDataRedisKey, commonDataRedisKey } = require("../utils/redisKeys");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");
const generateUniqueFileName = require("../utils/generateFileName");
const { baseDir } = require("./createBaseDir");
const { saveFile, deleteFile } = require("../utils/saveFile");
const { sendApiError, sendApiResponse } = require("../utils/apiResponses");
let myDates = responderSet.myDate;

let MasterController = {
  getMasterLoginView: function (req, res) {
    HomeModel.getGpData(res.pool)
      .then((result) => {
        res.render("master/Login/masterLogin", {
          gp: result[0],
        });
      })
      .catch((err) => {
        return res.status(500).json({ call: 0 });
      });
  },
  masterLogin: function (req, res) {
    let { userName, password } = req.body;
    masterModel
      .masterLogin(res.pool, userName, password)
      .then((result) => {
        if (result[0] !== undefined) {
          req.session.masterUser = result[0];
          res.redirect("/master");
        } else {
          res.redirect("/master/masterLogin");
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  homeView: function (req, res, next) {
    if (typeof req.session.masterUser == "undefined") {
      res.redirect("/master/masterLogin");
    } else {
      res.render("master/index");
    }
  },
  gramAdhikInfo: async function (req, res) {
    try {
      renderPage(res, "master/gram-adhik-mahiti", {
        isMasterPanel: true,
      });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },
  userExcel: function (req, res, next) {
    res.render("master/user_excel.pug");
  },
  saveList: function (req, res, next) {
    var data = req.body;
    data = JSON.parse(data.data);

    masterModel
      .removeUserFromList(res.pool)
      .then((result) => {
        return masterModel.saveNewFormEightDetails(res.pool, data);
      })
      .then((result) => {
        res.send({ call: 1, data: result });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  saveGpSadasyaPost: function (req, res, next) {
    let { post, list } = req.body;
    masterModel
      .addSadasyaPost(res.pool, post)
      .then((result) => {
        res.send({ call: 1 });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  
  saveGpDastaveg: async (req, res) => {
    try {
      var { doc, list } = req.body;
      list = JSON.parse(list);
      if (doc !== "") list.push(doc);
      let result = await masterModel.updateGpDastaveg(res.pool, list);
      res.send({ call: 1 });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  deleteDastavej: function (req, res, next) {
    masterModel
      .updateDastaVej(res.pool, req.body)
      .then((result) => {
        return res.status(200).json({
          call: 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  deletePost: function (req, res, next) {
    let _id = req.body.data;
    let id = Number(_id);
    masterModel
      .deletePost(res.pool, id)
      .then((result) => {
        return res.status(200).json({
          call: 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  gramManager: async (req, res) => {
    try {
      const video_gallery = await MasterModel.getVideoGalleryData(res.pool);

      renderPage(res, "master/gram_panchayet.pug", {
        video_gallery,
      });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  saveVillageGuideDetails: async (req, res) => {
    try {
      const data = req.body;
      let village_guide_photo;
      let fileExtension;

      if (req.files) {
        village_guide_photo = req.files.village_guide_photo;
        // fileExtension = village_guide_photo.name.split('.').pop()
        fileExtension = data.fileExtension;
      }

      const destDir = `./public/new-gp-page/main-page/files/village-guide`;
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      console.log("fileExtnsion ", fileExtension);
      console.log("village guiode 1 ", village_guide_photo);
      console.log("village guiode 2 ", village_guide_photo);
      let fileName = `village-guide-${data.id}.${fileExtension}`;

      let filePath = `${destDir}/${fileName}`;
      let oldFilePath = `${destDir}/${data.oldFileName}`;

      console.log(data.oldFileName, "Old file name");

      if (!!village_guide_photo) {
        if (
          data.oldFileName &&
          !!data.oldFileName.trim() &&
          fs.existsSync(oldFilePath)
        ) {
          fs.unlinkSync(oldFilePath);
        }
        village_guide_photo.mv(filePath, async (err) => {
          if (!err) {
            const response = await MasterModel.saveVillageGuide(
              res.pool,
              data,
              fileName
            );

            if (response.affectedRows >= 1) {
              return res.status(200).json({
                call: 1,
                message: "Village guide added successfully",
              });
            }
          }
        });
      } else {
        const response = await MasterModel.saveVillageGuide(
          res.pool,
          data,
          data.oldFileName
        );

        if (response.affectedRows >= 1) {
          return res.status(200).json({
            call: 1,
            message: "Village guide added successfully",
          });
        }
      }
    } catch (err) {
      console.log(`Error while saving village guide : ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  getGramVillageUpdateView: async (req, res) => {
    try {
      let { id } = req.query;
      console.log("id = ", id);
      let _details = await MasterModel.getVillage(res.pool, id);
      res.render("master/tabs/gram_village_update_view.pug", {
        sub_village: _details[0],
      });
    } catch (err) {
      console.log(`Error while rendering View : ${err}`);
    }
  },
  karSudharni: function (req, res) {
    res.render("master/tabs/karSudharni");
  },
  arogyaDivabattiKarSetting: function (req, res) {
    masterModel
      .getADKValues(res.pool)
      .then((result) => {
        console.log(result);
        res.render("master/arogyaDivaKarSetting.pug", {
          akdDetails: result,
        });
      })
      .catch((err) => {
        return res.status(500).send({ call: 0 });
      });
  },
  updateArogyaDivaKar: function (req, res, next) {
    let { adk1, adk2, adk3 } = req.body;
    console.log(adk1, adk2, adk2);
    masterModel
      .updateADK(res.pool, adk1, "1")
      .then((result) => {
        return masterModel.updateADK(res.pool, adk2, "2");
      })
      .then(() => {
        return masterModel.updateADK(res.pool, adk3, "3");
      })
      .then(() => {
        return res.status(201).send({ call: 1 });
      })
      .catch((err) => {
        console.log(err, "--- कर सुधारणा-");
        return res.status(500).send({ call: 0, data: err });
      });
  },

  getPaniKarSettingView: function (req, res) {
    masterModel
      .getPaniKar(res.pool)
      .then((result) => {
        res.render("master/paniKarSetting", {
          paniKar: result[0],
        });
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  },

  updatePaniKar: function (req, res) {
    masterModel
      .updatePaniKar(res.pool, req.body)
      .then((result) => {
        console.log(result);
        return res.status(201).json({
          call: 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  getBandkamRedinatorSetting: function (req, res, next) {
    masterModel
      .getBandkamRedinatorSetting(res.pool)
      .then((result) => {
        console.log(result);
        res.render("master/bandkamRedinatorSetting", {
          bandKamDetails: result,
        });
      })
      .catch((err) => {
        return res.status(500).send({ call: 0, data: err });
      });
  },
  postBandkamRedinatorSetting: function (req, res) {
    let postDetails = req.body.details;
    console.log(postDetails);
    masterModel
      .postBandkamRedinatorSetting(res.pool, postDetails[0])
      .then(() => {
        return masterModel.postBandkamRedinatorSetting(
          res.pool,
          postDetails[1]
        );
      })
      .then(() => {
        return masterModel.postBandkamRedinatorSetting(
          res.pool,
          postDetails[2]
        );
      })
      .then(() => {
        return masterModel.postBandkamRedinatorSetting(
          res.pool,
          postDetails[3]
        );
      })
      .then(() => {
        return masterModel.postBandkamRedinatorSetting(
          res.pool,
          postDetails[4]
        );
      })
      .then(() => {
        return masterModel.postBandkamRedinatorSetting(
          res.pool,
          postDetails[5]
        );
      })
      .then(() => {
        return masterModel.postBandkamRedinatorSetting(
          res.pool,
          postDetails[6]
        );
      })
      .then(() => {
        return res.status(201).send({ call: 1 });
      })
      .catch((err) => {
        return res.status(500).send({ call: 0, data: err });
      });
    return false;
  },
  gramRateSetting: function (req, res, next) {
    var propDesc = [];
    var propSpace = [];
    masterModel
      .getPropDesc(res.pool)
      .then((result) => {
        propDesc = result;
        return masterModel.getPropSpace(res.pool);
      })
      .then((result) => {
        propSpace = result;
        res.render("master/gram_rate_setting.pug", {
          propDescA: propDesc,
          propDesc: JSON.stringify(propDesc),
          propSpace: JSON.stringify(propSpace),
        });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  updatePropertyRateAll: function (req, res) {
    let { updatedPropertyRateAmount } = req.body;
    console.log(typeof updatedPropertyRateAmount);
    masterModel
      .updatePropertyRateAll(res.pool, updatedPropertyRateAmount)
      .then((result) => {
        console.log(result);
        return res.status(200).send({ call: 1 });
      })
      .catch((err) => {
        return res.status(500).send({ call: 0 });
      });
  },
  gramListSetting: async function (req, res, next) {
    try {
      const _gp = await masterModel.getGpDetails(res.pool);
      const _postList = await masterModel.getSadasyaPostList(res.pool);
      // console.log('PostList = ', _postList)
      res.render("master/gram_list-setting.pug", {
        _dastavegList: JSON.parse(_gp[0].gp_dastavegList),
        _postList,
        dastavegList: _gp[0].gp_dastavegList,
        isMasterPanel: true,
      });
    } catch (err) {
      console.log(`Error : ${err}`);
    }

    //Old code
    /*
		masterModel
			.getGpDetails(res.pool)
			.then((result) => {
				res.render('master/gram_list-setting.pug', {
					_postList: JSON.parse(result[0].gp_postList),
					_dastavegList: JSON.parse(result[0].gp_dastavegList),
					postList: result[0].gp_postList,
					dastavegList: result[0].gp_dastavegList,
				})
			})
			.catch((error) => {
				res.send({ call: 0, data: error })
			})
			*/
  },

  gramSadasya: asyncHandler(async (req, res) => {
      let _gp = await HomeModel.getGpData(res.pool);
      let sList = _gp[0].gp_member;

      let sTo = await masterModel.getSadasyaToList(res.pool);
      let sPost = await masterModel.getSadasyaPostList(res.pool);

      renderPage(res, "master/gram-sadasya/gram_sadasya.pug", {
        sList: sList,
        sPost: JSON.stringify(sPost),
        sTo: JSON.stringify(sTo),
        isMasterPanel: true,
      });
  }),

  addSection: asyncHandler(async (req, res) => {
    let { sectionName } = req.body;
    if (!sectionName?.trim()) {
      return sendApiError(res, 400, false, "Invalid section name");
    }
    let result = await masterModel.addSection(res.pool, sectionName);

    return sendApiResponse(res, 201, true, "Added successfully", {
      id: result.insertId,
    });
  }),

  getSectionList: asyncHandler(async (req, res) => {
      const sectionList = await MasterModel.getSadasyaToList(res.pool);
      return sendApiResponse(res, 200, true, "Fetched section list.", { sectionList })
  }),

  deleteSection: asyncHandler(async (req, res) => {
      let {sId} = req.params;
      await MasterModel.deleteSection(res.pool, sId)
      return sendApiResponse(res, 200, true, "Section Deletion done.")
  }),

  saveGpInfoOne: async function (req, res) {
    try {
      let [originalGpData] = await HomeModel.getGpData(res.pool);

      var data = req.body;

      const gavMapImage =
        req.files?.gavMap === undefined ? undefined : req.files?.gavMap;

      const sarpanchSign =
        req.files?.sarpanchSign === undefined
          ? undefined
          : req.files?.sarpanchSign;

      const gramsevakSign =
        req.files?.gramsevakSign === undefined
          ? undefined
          : req.files?.gramsevakSign;

      let gramsevakStamp = req.files?.gramsevakStamp;
      let sarpanchStamp = req.files?.sarpanchStamp;
      let gpOfficeStamp = req.files?.gpOfficeStamp;

      if (gavMapImage !== undefined) {
        const _gavMapImgDir = "./public/home_nakasha_image";
        const _gavMapImageName = "nakasha.jpeg";
        let _isDirExsists = fs.existsSync(_gavMapImgDir);
        if (!_isDirExsists) {
          fs.mkdirSync(_gavMapImgDir, { recursive: true });
        }
        gavMapImage.mv(`${_gavMapImgDir}/${_gavMapImageName}`, function (err) {
          console.log(err, "gav map uplaod image");
        });
      }

      // console.log(req.files)

      if (sarpanchSign !== undefined) {
        const _sarpanchSignDir = "./public/print";
        const _srapanchSignName = "sp.jpeg";
        let _isDirExsists = fs.existsSync(_sarpanchSignDir);

        if (!_isDirExsists) {
          fs.mkdirSync(_sarpanchSignDir, { resursive: true });
        }

        sarpanchSign.mv(
          `${_sarpanchSignDir}/${_srapanchSignName}`,
          function (err) {
            console.log(err, "sarpanch sign upload err");
          }
        );
      }

      if (gramsevakSign !== undefined) {
        const _gramsevakSignDir = "./public/print";
        const _gramsevakSignName = "gs.jpeg";
        let _isDirExsists = fs.existsSync(_gramsevakSignDir);

        if (!_isDirExsists) {
          fs.mkdirSync(_gramsevakSignDir, { resursive: true });
        }

        gramsevakSign.mv(
          `${_gramsevakSignDir}/${_gramsevakSignName}`,
          function (err) {
            console.log(err, "gramsevaksign uplaod err");
          }
        );
      }

      if (gramsevakStamp) {
        let gpStampsDir = `${baseDir}/uploads/images/gp/stamps`;
        let stampImageName = generateUniqueFileName(gramsevakStamp, "gsStamp");
        data.gramsevak_stamp_image_name = stampImageName;
        let savePath = `${gpStampsDir}/${stampImageName}`;
        await saveFile(gramsevakStamp, savePath);
        await deleteFile(
          `${gpStampsDir}/${originalGpData.gramsevak_stamp_image_name}`
        );
      } else {
        data.gramsevak_stamp_image_name =
          originalGpData.gramsevak_stamp_image_name;
      }

      if (sarpanchStamp) {
        let gpStampsDir = `${baseDir}/uploads/images/gp/stamps`;
        let stampImageName = generateUniqueFileName(sarpanchStamp, "spStamp");
        data.sarpanch_stamp_image_name = stampImageName;
        let savePath = `${gpStampsDir}/${stampImageName}`;
        await saveFile(sarpanchStamp, savePath);
        await deleteFile(
          `${gpStampsDir}/${originalGpData.sarpanch_stamp_image_name}`
        );
      } else {
        data.sarpanch_stamp_image_name =
          originalGpData.sarpanch_stamp_image_name;
      }

      if (gpOfficeStamp) {
        let gpStampsDir = `${baseDir}/uploads/images/gp/stamps`;
        let stampImageName = generateUniqueFileName(gpOfficeStamp, "gpStamp");
        data.gp_office_stamp_image_name = stampImageName;
        let savePath = `${gpStampsDir}/${stampImageName}`;
        await saveFile(gpOfficeStamp, savePath);

        await deleteFile(
          `${gpStampsDir}/${originalGpData.gp_office_stamp_image_name}`
        );
      } else {
        data.gp_office_stamp_image_name =
          originalGpData.gp_office_stamp_image_name;
      }

      const result = await masterModel.updateGpInfoOne(res.pool, data);

      await deleteRedisData(gpDataRedisKey);
      await deleteRedisData(commonDataRedisKey);

      res.send({ call: 1 });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  saveGpInfoTwo: async function (req, res) {
    try {
      var data = req.body;
      await masterModel.updateGpInfoTwo(res.pool, data);

      await deleteRedisData(gpDataRedisKey);
      res.send({ call: 1 });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },
  saveGpInfoThree: async function (req, res) {
    try {
      var data = req.body;
      await masterModel.updateGpInfoThree(res.pool, data);

      await deleteRedisData(gpDataRedisKey);

      res.send({ call: 1 });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },
  getVillageList: async function (req, res) {
    try {
      const result = await masterModel.getVillageList(res.pool);
      await deleteRedisData(gpDataRedisKey);
      res.send({ call: 1, data: result });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },
  saveUpdateVillage: async function (req, res) {
    try {
      var data = req.body;

      const result = await masterModel.saveUpdateVillage(res.pool, data);
      await deleteRedisData(gpDataRedisKey);
      res.send({ call: 1, data: result });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },
  removeVillage: async function (req, res) {
    try {
      var data = req.body;

      const result = await masterModel.removeVillage(res.pool, data);
      await deleteRedisData(gpDataRedisKey);
      res.send({ call: 1, data: result });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },
  updateMember: async function (req, res) {
    try {
      var data = req.body;

      const result = await masterModel.updateMember(res.pool, data);
      await deleteRedisData(gpDataRedisKey);
      res.send({ call: 1, data: result });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  updateSingleMember: async (req, res) => {
    try {
      const data = req.body;
      let index = data.index;
      const gp_members = JSON.parse(data.gp_members);
      let newImageName;
      let oldImageName = data.oldImageName;
      // console.log('DATA', data)
      // console.log('index = ', index)
      // console.log('Gp members = ', gp_members)
      console.log("old image name : ", oldImageName);

      const previousDataOfMember = gp_members[index];

      console.log(previousDataOfMember);

      let newPhotoFile;

      let destDir = `./public/gp/asstes/images/team`;

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      if (req.files && req.files.photoFile) {
        newPhotoFile = req.files.photoFile;
        let currentTime = myDates.getTimeStamp();
        let extension = newPhotoFile.name.split(".").pop();
        newImageName = `${currentTime}.${extension}`;

        let oldImagePath = `${destDir}/${oldImageName}`;
        if (
          oldImageName &&
          oldImageName.trim() !== "" &&
          fs.existsSync(oldImagePath)
        ) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const newDataOfMember = {
        ...previousDataOfMember,
        name: data.name,
        post: +data.post,
        p_name: data.p_name,
        section: +data.section,
        s_name: data.s_name,
        sadasyaAadhar: data.sadasyaAadhar,
        sadasyaMobile: data.sadasyaMobile,
        image: newPhotoFile ? newImageName : oldImageName,
        sadasyaInfo: data.sadasyaInfo,
      };
      gp_members[index] = newDataOfMember;
      // console.log('New Details of sadasya = ', newDataOfMember)

      // return;
      if (newPhotoFile) {
        return newPhotoFile.mv(`${destDir}/${newImageName}`, async (err) => {
          if (!err) {
            const _updateResponse = await masterModel.updateMember(res.pool, {
              member: JSON.stringify(gp_members),
            });

            if (_updateResponse.affectedRows) {
              await deleteRedisData(gpDataRedisKey);
              await deleteRedisData(commonDataRedisKey);

              return res.status(200).json({
                call: 1,
                message: "Gp member updated successfully",
              });
            }
          }
        });
      } else {
        const _updateResponse = await masterModel.updateMember(res.pool, {
          member: JSON.stringify(gp_members),
        });

        if (_updateResponse.affectedRows) {
          await deleteRedisData(gpDataRedisKey);
          await deleteRedisData(commonDataRedisKey);

          return res.status(200).json({
            call: 1,
            message: "Gp member updated successfully",
          });
        }
      }
    } catch (err) {
      console.log(`Error while updating single member : ${err}`);
    }
  },

  uploadImage: function (req, res, next) {
    var fileOne = req.files.memberImage;
    var currentTime = myDates.getTimeStamp();
    var old_name = fileOne.name;
    var extension = old_name.substring(old_name.lastIndexOf(".") + 1);
    var newName = `${currentTime}.${extension}`;
    console.log("got called");

    fileOne.mv("./public/gp/asstes/images/team/" + newName, function (error) {
      if (error) {
        res.status(500).send({ call: 0, data: error });
      } else {
        res.status(200).send({ call: 1, data: newName });
      }
    });
  },
  deleteImage: async function (req, res, next) {
    fs.unlink(
      "./public/gp/asstes/images/team/" + req.body.image,
      function (err) {
        res.status(200).send({ call: 1 });
      }
    );

    await deleteRedisData(gpDataRedisKey);
    await deleteRedisData(commonDataRedisKey);
  },

  // This controller either adds vidoe link or video file itself

  uploadVideoGalleryLink: async (req, res) => {
    try {
      const videoData = req.body;

      const video_file = req.files ? req.files.video_file : null;

      let videoFileName = "";

      if (video_file) {
        videoFileName = generateUniqueFileName(video_file, "galleryVideo");

        let videoGallerySavePath = `${baseDir}/uploads/videos/videoGallery/${videoFileName}`;

        let isSaved = await saveFile(video_file, videoGallerySavePath);
        videoData.video_name = videoFileName;
      }

      const response = await masterModel.uploadVideoGalleryLink(
        res.pool,
        videoData
      );

      return res.status(200).json({
        call: 1,
        message: "Video Link uploaded Sucessfully.",
      });
    } catch (err) {
      console.log(`Error while uploading the video gallery link : ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  deleteVideoGalleryLink: async function (req, res) {
    try {
      const { id } = req.query;

      let [videoFile] = await masterModel.getVideoGalleryData(res.pool, id);

      if (videoFile?.video_name) {
        let videoGallerySavePath = `${baseDir}/uploads/videos/videoGallery/${videoFile.video_name}`;
        await deleteFile(videoGallerySavePath);
      }
      const response = await masterModel.deleteVideoGalleryLink(res.pool, id);

      return res.status(200).json({
        call: 1,
        message: "Video Link deleted Sucessfully.",
      });
    } catch (err) {
      console.log(`Error while deleting the video gallery link : ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  saveNewPropSpecification: function (req, res, next) {
    var data = req.body;
    masterModel
      .saveNewPropSpecification(res.pool, data)
      .then((result) => {
        res.send({ call: 1, data: data });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  updateNewPropSpecification: function (req, res, next) {
    var data = req.body;
    masterModel
      .updateNewPropSpecification(res.pool, data)
      .then((result) => {
        res.send({ call: 1, data: data });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  removeNewPropSpecification: function (req, res, next) {
    var data = req.body;
    masterModel
      .removeNewPropSpecification(res.pool, data)
      .then((result) => {
        res.send({ call: 1, data: data });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },

  setNineBackup: function (req, res, next) {
    HomeModel.getGpData(res.pool)
      .then((result) => {
        res.render("master/backup-nine", {
          gp_working_from: result[0].gp_working_from,
          gp_working_to: result[0].gp_working_to,
          gp_backup_done: result[0].gp_backup_done,
        });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  saveGramMahiti: async function (req, res) {
    var data = req.body;
    masterModel
      .saveGramMahiti(res.pool, data)
      .then(async () => {
        await deleteRedisData(gpDataRedisKey);
        await deleteRedisData(commonDataRedisKey);
        res.send({ call: 1 });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  saveModalGramMahitiTwoList: (req, res) => {
    var fileOne = req.files.image;
    var { list, text } = req.body;
    list = JSON.parse(list);
    var currentTime = myDates.getTimeStamp();
    var old_name = fileOne.name;
    var extension = old_name.substring(old_name.lastIndexOf(".") + 1);
    var newName = `${currentTime}.${extension}`;

    fileOne.mv(
      "./public/new-gp-page/main-page/images/smeti/" + newName,
      function (error) {
        if (error) {
          res.status(500).send({ call: 0, data: error });
        } else {
          list.push({ name: text, file: newName });
          masterModel
            .saveModalGramMahitiTwoList(res.pool, list)
            .then(async () => {
              await deleteRedisData(gpDataRedisKey);
              await deleteRedisData(commonDataRedisKey);
              res.send({ call: 1, newName });
            })
            .catch((error) => {
              res.status(500).send({ call: 0, data: error });
            });
        }
      }
    );
  },

  deleteModalGramMahitiTwoList: function (req, res) {
    var { list } = req.body;
    list = JSON.parse(list);
    masterModel
      .saveModalGramMahitiTwoList(res.pool, list)
      .then(async () => {
        await deleteRedisData(gpDataRedisKey);
        await deleteRedisData(commonDataRedisKey);
        res.send({ call: 1 });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  saveModalGramMahitiThreeList: (req, res) => {
    var fileOne = req.files.image;
    var { inputTextBrand, inputTextName, inputTextNumber, list } = req.body;
    list = JSON.parse(list);
    var currentTime = myDates.getTimeStamp();
    var old_name = fileOne.name;
    var extension = old_name.substring(old_name.lastIndexOf(".") + 1);
    var newName = `${currentTime}.${extension}`;

    fileOne.mv(
      "./public/new-gp-page/main-page/images/dukan/" + newName,
      function (error) {
        if (error) {
          res.status(500).send({ call: 0, data: error });
        } else {
          list.push({
            inputTextBrand,
            inputTextName,
            inputTextNumber,
            image: newName,
          });
          masterModel
            .saveModalGramMahitiThreeList(res.pool, list)
            .then(async () => {
              await deleteRedisData(gpDataRedisKey);
              await deleteRedisData(commonDataRedisKey);
              res.send({ call: 1, newName });
            })
            .catch((error) => {
              console.log(`Error : ${error}`);
              res.status(500).send({ call: 0, data: error });
            });
        }
      }
    );
  },
  saveModalGramMahitiFourList: (req, res) => {
    var fileOne = req.files.image;
    var { list } = req.body;
    list = JSON.parse(list);
    var currentTime = myDates.getTimeStamp();
    var old_name = fileOne.name;
    var extension = old_name.substring(old_name.lastIndexOf(".") + 1);
    var newName = `${currentTime}.${extension}`;

    fileOne.mv(
      "./public/new-gp-page/main-page/images/news/" + newName,
      function (error) {
        if (error) {
          res.status(500).send({ call: 0, data: error });
        } else {
          list.push({
            image: newName,
          });
          masterModel
            .saveModalGramMahitiFourList(res.pool, list)
            .then(async () => {
              await deleteRedisData(gpDataRedisKey);
              await deleteRedisData(commonDataRedisKey);
              res.send({ call: 1, newName });
            })
            .catch((error) => {
              res.status(500).send({ call: 0, data: error });
            });
        }
      }
    );
  },

  saveModalGramMahitiFiveList: (req, res) => {
    var fileOne = req.files.image;
    var { list, adhikariName, adhikariPost } = req.body;
    list = JSON.parse(list);
    var currentTime = myDates.getTimeStamp();
    var old_name = fileOne.name;
    var extension = old_name.substring(old_name.lastIndexOf(".") + 1);
    var newName = `${currentTime}.${extension}`;

    fileOne.mv(
      "./public/new-gp-page/main-page/images/arogya/" + newName,
      function (error) {
        if (error) {
          res.status(500).send({ call: 0, data: error });
        } else {
          list.push({
            adhikariName,
            adhikariPost,
            image: newName,
          });
          masterModel
            .saveModalGramMahitiFiveList(res.pool, list)
            .then(async () => {
              await deleteRedisData(gpDataRedisKey);
              await deleteRedisData(commonDataRedisKey);
              res.send({ call: 1, newName });
            })
            .catch((error) => {
              res.status(500).send({ call: 0, data: error });
            });
        }
      }
    );
  },
  saveModalGramMahitiSixList: (req, res) => {
    var fileOne = req.files.image;
    var { list, inputName, inputDesc } = req.body;
    list = JSON.parse(list);
    var currentTime = myDates.getTimeStamp();
    var old_name = fileOne.name;
    var extension = old_name.substring(old_name.lastIndexOf(".") + 1);
    var newName = `${currentTime}.${extension}`;

    fileOne.mv(
      "./public/new-gp-page/main-page/images/yojana/" + newName,
      function (error) {
        if (error) {
          res.status(500).send({ call: 0, data: error });
        } else {
          list.push({
            inputName,
            inputDesc,
            image: newName,
          });
          masterModel
            .saveModalGramMahitiSixList(res.pool, list)
            .then(async () => {
              await deleteRedisData(gpDataRedisKey);
              await deleteRedisData(commonDataRedisKey);
              res.send({ call: 1, newName });
            })
            .catch((error) => {
              res.status(500).send({ call: 0, data: error });
            });
        }
      }
    );
  },
  saveModalGramMahitiFiveListOne: (req, res) => {
    var fileOne = req.files.image;
    var currentTime = myDates.getTimeStamp();
    var old_name = fileOne.name;
    var extension = old_name.substring(old_name.lastIndexOf(".") + 1);
    var newName = `kendra-${currentTime}.${extension}`;

    fileOne.mv(
      "./public/new-gp-page/main-page/images/arogya/" + newName,
      function (error) {
        if (error) {
          res.status(500).send({ call: 0, data: error });
        } else {
          masterModel
            .saveModalGramMahitiFiveListOne(res.pool, newName)
            .then(async () => {
              await deleteRedisData(gpDataRedisKey);
              await deleteRedisData(commonDataRedisKey);
              res.send({ call: 1, newName });
            })
            .catch((error) => {
              res.status(500).send({ call: 0, data: error });
            });
        }
      }
    );
  },
  updateBackupNine: async (req, res) => {
    try {
      let { id } = req.body;
      await masterModel.updateBackupNine(res.pool);

      await deleteRedisData(gpDataRedisKey);
      await deleteRedisData(commonDataRedisKey);
      res.send({ call: 1 });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  backupNine: function (req, res, next) {
    let data = req.query;
    let gpData = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        if (result[0]?.gp_backup_done == 1) {
          return -999;
        } else {
          gpData = result[0];
          return masterModel.getFormNineData(res.pool);
        }
      })
      .then((result) => {
        if (result == -999) {
          return result;
        } else {
          let backupData = result.map(function (user) {
            return [
              user.user_id,
              user.lastBuildingTax,
              user.currentBuildingTax,
              user.totalBuildingTax,
              user.lastDivaTax,
              user.currentDivaTax,
              user.totalDivaTax,
              user.lastArogyaTax,
              user.currentArogyaTax,
              user.totalArogyaTax,
              user.lastTaxFine,
              user.lastYearTaxFine,
              user.lastTaxRelief,
              user.totalTax,
              user.totalSampurnaTax,
              user.lastSpacialWaterTax,
              user.currentSpacialWaterTax,
              user.totalSpacialWaterTax,
              user.lastGenealWaterTax,
              user.currentGenealWaterTax,
              user.totalGenealWaterTax,
              user.totalWaterTax,
              user.addToMagniLekh,
              user.addNalBandNotice,
              user.created_date,
              user.modify_date,
              user.magni_lekh_date,
              user.nal_band_notice_date,
              gpData.gp_working_from,
              gpData.gp_working_to,
            ];
          });
          return masterModel.addNineOldYearData(res.pool, backupData);
        }
      })
      .then((result) => {
        if (result == -999) {
          return result;
        } else {
          return masterModel.removeFormNineData(res.pool);
        }
      })
      .then((result) => {
        if (result == -999) {
          return result;
        } else {
          return masterModel.getFormNineDataOld(
            res.pool,
            gpData.gp_working_from,
            gpData.gp_working_to
          );
        }
      })
      .then((result) => {
        if (result == -999) {
          return result;
        } else {
          var newData = result.map(function (user) {
            var lastFine = Math.round(user.totalBuildingTax * (5 / 100));
            var newLastYearFine = user.lastTaxFine + user.lastYearTaxFine;
            var totalBuildingTax = Math.round(
              user.totalBuildingTax + user.currentBuildingTax
            );
            var totalDivaTax = Math.round(
              user.totalDivaTax + user.currentDivaTax
            );
            var totalArogyaTax = Math.round(
              user.totalArogyaTax + user.currentArogyaTax
            );
            var totalTax = Math.round(
              user.lastTaxFine + lastFine + user.lastYearTaxFine
            );
            var totalSampurnaTax = Math.round(
              totalBuildingTax + totalDivaTax + totalArogyaTax + totalTax
            );
            var totalSpacialWaterTax = Math.round(
              user.totalSpacialWaterTax + user.currentSpacialWaterTax
            );
            var totalGenealWaterTax = Math.round(
              user.totalGenealWaterTax + user.currentGenealWaterTax
            );
            var totalWaterTax = Math.round(
              totalSpacialWaterTax + totalGenealWaterTax
            );

            return [
              user.user_id,
              user.totalBuildingTax,
              user.currentBuildingTax,
              totalBuildingTax,
              user.totalDivaTax,
              user.currentDivaTax,
              totalDivaTax,
              user.totalArogyaTax,
              user.currentArogyaTax,
              totalArogyaTax,
              Math.round(lastFine),
              Math.round(newLastYearFine),
              0,
              Math.round(lastFine + newLastYearFine),
              totalSampurnaTax,
              user.totalSpacialWaterTax,
              user.currentSpacialWaterTax,
              totalSpacialWaterTax,
              user.totalGenealWaterTax,
              user.currentGenealWaterTax,
              totalGenealWaterTax,
              totalWaterTax,
              0,
              0,
              myDates.getDate(),
              myDates.getDate(),
            ];
          });
          return masterModel.updateNineYearData(res.pool, newData);
        }
      })
      .then((result) => {
        if (result == -999) {
          return result;
        } else {
          return masterModel.updateGPYear(
            res.pool,
            gpData.gp_working_from + 1,
            gpData.gp_working_to + 1
          );
        }
      })
      .then((result) => {
        if (result == -999) {
          res.send({ call: 1, data: "Year And Accounting Already Reset" });
        } else {
          res.render("master/backup-nine-done.pug");
        }
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },

  adarshTakta: async function (req, res) {
    try {
      const _gp = await HomeModel.getGpData(res.pool);

      res.render("master/gram_takta.pug", {
        takta: _gp[0] ? _gp[0].ps_gram_adarsh_takta : {},
        isMasterPanel: true,
      });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  updateTakta: async function (req, res) {
    try {
      var data = req.body.data;
      await masterModel.updateTakta(res.pool, data);
      await deleteRedisData(gpDataRedisKey);
      await deleteRedisData(commonDataRedisKey);
      res.send({ call: 1 });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },
  setMeterBackUp: function (req, res) {
    let gpData = {};

    HomeModel.getGpData(res.pool)
      .then((result) => {
        gpData = result[0].ps_gram_adarsh_takta;
        gpData = gpData == null ? {} : gpData;
        res.render("master/backup-meter.pug", {
          takta: gpData,
        });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },
  createBackupMaster: function (req, res) {
    let { next_month_range } = req.query;
    HomeModel.getMeterDetails(res.pool)
      .then((result) => {
        res.status(200).send({ status: true, result });
      })
      .catch((error) => {
        res.send({ call: 0, data: error });
      });
  },

  get_divyanga_people_yadi_upload_page: function (req, res) {
    MasterModel.get_divyanga_file_name_list(res.pool)
      .then((result) => {
        let filesList = [...result] || [];
        res.render("master/divyanga-people-yadi-upload-page.pug", {
          filesList,
        });
      })
      .catch((err) => {
        console.log(`Error while showing the page : ${err}`);
      });
  },

  post_divyanga_people_yadi: function (req, res) {
    let file = req.files.file;
    let fileName = req.body.fileName;
    let fileExtension = file.name.split(".").pop();

    let fullFileName = `${fileName}.${fileExtension}`;

    const destDir = `./public/new-gp-page/main-page/files/divyanga-yadi`;

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    file.mv(`${destDir}/${fullFileName}`, (err) => {
      if (err) {
        return res.status(400).json({
          call: 0,
          data: err,
        });
      } else {
        MasterModel.upload_divyanga_file(res.pool, fullFileName)
          .then((result) => {
            if (result.affectedRows === 1) {
              return res.status(201).json({
                call: 1,
              });
            }
          })
          .catch((err) => {
            return res.status(500).json({
              call: 0,
              data: err,
            });
          });
      }
    });
  },

  delete_divyanga_file: function (req, res) {
    let fileName = req.body.fileName;
    let fileId = req.body.fileId;

    MasterModel.delete_divyanga_file(res.pool, fileId)
      .then((result) => {
        if (result.affectedRows === 1) {
          fs.unlinkSync(
            `./public/new-gp-page/main-page/files/divyanga-yadi/${fileName}`
          );
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  get_gr_upload_view: asyncHandler(async (req, res) => {
    const filesList = await MasterModel.get_gr_file_name_list(res.pool);

    res.render("master/gr-upload-view.pug", {
      filesList,
      isMasterPanel: true,
    });
  }),

  upload_gr_file: function (req, res) {
    let file = req.files.file;
    let fileName = req.body.fileName;
    let fileExtension = file.name.split(".").pop();

    let fullFileName = `${fileName}.${fileExtension}`;

    let destDir = `./public/new-gp-page/main-page/files/gr-lists`;

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    file.mv(`${destDir}/${fullFileName}`, (err) => {
      if (err) {
        return res.status(400).json({
          call: 0,
          data: err,
        });
      } else {
        MasterModel.upload_gr_file(res.pool, fullFileName)
          .then((result) => {
            if (result.affectedRows === 1) {
              return res.status(201).json({
                call: 1,
              });
            }
          })
          .catch((err) => {
            return res.status(500).json({
              call: 0,
              data: err,
            });
          });
      }
    });
  },

  // education details --------------------

  get_add_education_details_view: async (req, res) => {
    const educationInstituteList =
      await MasterModel.get_education_institute_list(res.pool);
    res.render("master/add-education-details-view.pug", {
      educationInstituteList,
    });
  },

  getEducationInstituteGalleryView: async (req, res) => {
    try {
      const { id, instituteName } = req.query;

      const _instituteDetails = await MasterModel.getInstituteDetails(
        res.pool,
        id
      );

      const galleryPhotos =
        await MasterModel.getEducationInstituteGalleryPhotos(res.pool, id);

      return res.render("master/master-institute-gallery-view.pug", {
        instituteDetails: _instituteDetails[0],
        galleryPhotos,
      });
    } catch (err) {
      console.error("Error:", err);

      return res.status(500).json({
        call: 0,
        error: `Error : ${err}`,
        message: "Internal server error",
      });
    }
  },

  addEducationInstituteGalleryPhoto: function (req, res) {
    let { instituteId } = req.query;
    let instituteGalleryPhoto = req.files.institute_gallery_photo;
    let imageExtension = instituteGalleryPhoto?.name.split(".").pop();

    let instituteImageName;

    MasterModel.addEducationInstituteGalleryPhoto(res.pool, instituteId)
      .then((addedImage) => {
        if (addedImage.affectedRows === 1) {
          const directoryPath =
            "./public/new-gp-page/main-page/files/education-institute-gallery";

          // Check if the directory exists
          if (!fs.existsSync(directoryPath)) {
            // If not, create the directory
            fs.mkdirSync(directoryPath, { recursive: true });
            // console.log(`Directory created: ${directoryPath}`);
          }
          let insertId = addedImage.insertId;
          instituteImageName = `${instituteId}_${insertId}.${imageExtension}`;
          instituteGalleryPhoto.mv(
            `${directoryPath}/${instituteImageName}`,
            (err) => {
              if (err) {
                return res.status(400).json({
                  call: 0,
                  data: err,
                });
              } else {
                MasterModel.updateEducationInstituteGalleryPhotoName(
                  res.pool,
                  instituteImageName,
                  insertId
                )
                  .then((result) => {
                    return res.status(201).json({
                      call: 1,
                    });
                  })
                  .catch((err) => {
                    console.log("Eror in updaing", err);
                  });
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log("Error while uploadig gallery : ", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  deleteEducationInstituteGalleryPhoto: function (req, res) {
    let { imageId, imageName } = req.body;
    MasterModel.deleteEducationInstituteGalleryPhoto(res.pool, imageId)
      .then((result) => {
        if (result.affectedRows === 1) {
          const directoryPath =
            "./public/new-gp-page/main-page/files/education-institute-gallery";

          let imagePath = `${directoryPath}/${imageName}`;
          fs.unlinkSync(imagePath, (err) => {
            // if(!err){
            // }else{
            // 	console.log("Error while deletnig htis image : ", err)
            // 	return res.status(500).json({
            // 		call: 0,
            // 	})
            // }
          });
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        console.log("Error while deleteing , =", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  get_single_education_institute_details_view: async (req, res) => {
    try {
      const { id, instituteName } = req.query;

      const _instituteDetails = await MasterModel.getInstituteDetails(
        res.pool,
        id
      );

      const instituteStaff = await MasterModel.getInstituteStaffDetails(
        res.pool,
        id
      );

      return res.render("master/master-institute-details-view.pug", {
        instituteDetails: _instituteDetails[0],
        instituteStaff,
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({
        call: 0,
        error: `Error : ${err}`,
        message: "Internal server error",
      });
    }
  },

  upload_education_institute_details: function (req, res) {
    let institutePhoto = req.files.institutePhoto;
    let instituteName = req.body.instituteName;
    let instituteType = req.body.instituteType;
    let fileExtension = institutePhoto.name.split(".").pop();

    // let fullFileName = `${instituteName}.${fileExtension}`
    let instituteImageName;

    MasterModel.upload_education_institute_details(
      res.pool,
      instituteName,
      instituteType
    )
      .then((result) => {
        let insertId = result.insertId;
        instituteImageName = `${insertId}.${fileExtension}`;

        if (result.affectedRows === 1) {
          const directoryPath =
            "./public/new-gp-page/main-page/files/education-institute-files";

          // Check if the directory exists
          if (!fs.existsSync(directoryPath)) {
            // If not, create the directory
            fs.mkdirSync(directoryPath, { recursive: true });
            // console.log(`Directory created: ${directoryPath}`);
          }

          institutePhoto.mv(
            `./public/new-gp-page/main-page/files/education-institute-files/${instituteImageName}`,
            (err) => {
              if (err) {
                return res.status(400).json({
                  call: 0,
                  data: err,
                });
              } else {
                MasterModel.update_education_institute_photo_details(
                  res.pool,
                  insertId,
                  instituteImageName
                ).then((result) => {
                  return res.status(201).json({
                    call: 1,
                  });
                });
              }
            }
          );
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  delete_education_institute_details: function (req, res) {
    const { instituteImage, instituteId } = req.body;

    MasterModel.delete_education_institute_details(res.pool, instituteId)
      .then((result) => {
        if (result.affectedRows === 1) {
          fs.unlinkSync(
            `./public/new-gp-page/main-page/files/education-institute-files/${instituteImage}`
          );
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  edit_education_institute_details: function (req, res) {
    console.log("edit --");
    console.log(req.body, "rbody--");
    console.log(req.files, "rfiles--");
    const { instituteName, instituteType, instituteId } = req.body;

    let institutePhoto = null;
    if (req.files !== null) {
      institutePhoto = req.files.institutePhoto;
      console.log("getting photo");
      console.log(req.files);
    }
    console.log("2");
    if (institutePhoto === null) {
      MasterModel.update_education_institute_details(
        res.pool,
        instituteName,
        instituteType,
        instituteId
      )
        .then((result) => {
          console.log(result, "after updation 1");
          if (result.affectedRows === 1) {
            return res.status(200).json({
              call: 1,
            });
          }
        })
        .catch((err) => {
          console.log(err, "1");
          return res.status(500).json({
            call: 0,
            data: err,
          });
        });
    }
    if (institutePhoto !== null) {
      console.log("with phot updation");
      let fileExtension = institutePhoto.name.split(".").pop();
      let instituteImageName = `${instituteId}.${fileExtension}`;
      MasterModel.update_education_institute_details(
        res.pool,
        instituteName,
        instituteType,
        instituteId
      )
        .then((result) => {
          console.log(result, "after updation 2");
          if (result.affectedRows === 1) {
            institutePhoto.mv(
              `./public/new-gp-page/main-page/files/education-institute-files/${instituteImageName}`,
              (err) => {
                if (err) {
                  return res.status(400).json({
                    call: 0,
                    data: err,
                  });
                } else {
                  return res.status(200).json({
                    call: 1,
                  });
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(err, "2");
          return res.status(500).json({
            call: 0,
            data: err,
          });
        });
    }
  },

  // education staff details --------------------

  get_education_institute_add_staff_view: async function (req, res) {
    const instituteId = req.query.instituteId;

    const instituteName = await MasterModel.getInstituteName(
      res.pool,
      instituteId
    );
    const educationInstituteStaffList =
      await MasterModel.get_education_institute_staff_list(
        res.pool,
        instituteId
      );

    console.log(instituteName, "-iid");
    res.render("master/add-education-institute-staff-details-view.pug", {
      educationInstituteStaffList: educationInstituteStaffList || [],
      instituteName: [instituteName[0].institute_name],
    });
  },

  update_education_institute_staff_details: function (req, res) {
    let staffPhoto;
    let {
      instituteId,
      staffName,
      editStaffId,
      staffMobno,
      staffDesignation,
      oldImageName,
    } = req.body;
    let fileExtension = "unknown";

    if (req.files && req.files.staffPhoto) {
      staffPhoto = req.files.staffPhoto;
      fileExtension = staffPhoto.name.split(".").pop();
    }
    let staffPhotoName;
    MasterModel.update_education_institute_staff_details(
      res.pool,
      instituteId,
      staffName,
      staffMobno,
      editStaffId,
      staffDesignation
    )
      .then((result) => {
        if (result.affectedRows === 1) {
          // Check if the previous file exists and delete it

          if (fileExtension !== "unknown") {
            let oldFilePath = `./public/new-gp-page/main-page/files/education-institute-files/${oldImageName}`;
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
            staffPhotoName = `${instituteId}_${editStaffId}.${fileExtension}`;
            staffPhoto.mv(
              `./public/new-gp-page/main-page/files/education-institute-files/${staffPhotoName}`,
              (err) => {
                if (err) {
                  return res.status(400).json({
                    call: 0,
                    data: err,
                  });
                } else {
                  MasterModel.update_education_institute_staff_photo_details(
                    res.pool,
                    editStaffId,
                    staffPhotoName
                  ).then((result) => {
                    return res.status(201).json({
                      call: 1,
                    });
                  });
                }
              }
            );
          } else {
            // Handle the case when fileExtension is 'unknown'
            return res.status(200).json({
              call: 1,
              data: "Successfully updated",
            });
          }
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  upload_education_institute_staff_details: function (req, res) {
    let staffPhoto = req.files.staffPhoto;
    let { instituteId, staffName, staffMobno, staffDesignation } = req.body;
    let fileExtension = staffPhoto.name.split(".").pop();
    let staffPhotoName;

    // console.log('000000', staffDesignation)
    MasterModel.upload_education_institute_staff_details(
      res.pool,
      instituteId,
      staffName,
      staffMobno,
      staffDesignation
    )
      .then((result) => {
        let insertId = result.insertId;
        staffPhotoName = `${instituteId}_${insertId}.${fileExtension}`;

        if (result.affectedRows === 1) {
          let uploadDir = path.join(
            "./public",
            "new-gp-page",
            "main-page",
            "files",
            "education-institute-files"
          );
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          staffPhoto.mv(
            `./public/new-gp-page/main-page/files/education-institute-files/${staffPhotoName}`,
            (err) => {
              if (err) {
                return res.status(400).json({
                  call: 0,
                  data: err,
                });
              } else {
                MasterModel.update_education_institute_staff_photo_details(
                  res.pool,
                  insertId,
                  staffPhotoName
                ).then((result) => {
                  return res.status(201).json({
                    call: 1,
                  });
                });
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log("Error ,");
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  delete_education_institute_staff_details: function (req, res) {
    const { staffPhoto, staffId } = req.body;

    // console.log('Stafff detaisl delete = ', staffPhoto)
    MasterModel.delete_education_institute_staff_details(res.pool, staffId)
      .then((result) => {
        if (result.affectedRows === 1) {
          fs.unlinkSync(
            `./public/new-gp-page/main-page/files/education-institute-files/${staffPhoto}`
          );
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  //Medical rooom ------------------------वैद्यकीय

  getMedicalRoomView: function (req, res) {
    return res.render("master/medical-room-view.pug");
  },

  getKrishiVidnyanView: asyncHandler(async (req, res) => {
    const filesList = await MasterModel.getKrishiVidnyanFileNameList(res.pool);
    return res.render("master/upload-krishi-vidnyan-view", {
      filesList,
    });
  }),

  uploadKrishiVidnyanFile: function (req, res) {
    // console.log('in controller')
    let file = req.files?.informationData;
    let informationTitle = req.body.informationTitle;
    // console.log(file, informationTitle)

    let informationData = null;
    let fileExtension = null;

    // 1 = file, 2 = link
    let type = null;

    if (file !== undefined) {
      informationData = file;
      type = 1;
      fileExtension = informationData.name.split(".").pop();

      let fullFileName = `${informationTitle}.${fileExtension}`;

      informationData = fullFileName;

      let destDir = `./public/new-gp-page/main-page/files/krishi-vidnyan-lists`;
      const path = `${destDir}/${fullFileName}`;

      if (fs.existsSync(path)) {
        return res.status(400).json({
          call: 3,
          data: "File with the same name already exists.",
        });
      }

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      file.mv(path, (err) => {
        if (err) {
          return res.status(400).json({
            call: 0,
            data: err.message,
          });
        } else {
          MasterModel.uploadKrishiVidnyanFile(
            res.pool,
            informationTitle,
            informationData,
            type
          )
            .then((result) => {
              if (result.affectedRows === 1) {
                return res.status(201).json({
                  call: 1,
                });
              }
            })
            .catch((err) => {
              return res.status(500).json({
                call: 0,
                data: err,
              });
            });
        }
      });
    } else {
      informationData = req.body.informationData;
      type = 2;
      MasterModel.uploadKrishiVidnyanFile(
        res.pool,
        informationTitle,
        informationData,
        type
      )
        .then((result) => {
          if (result.affectedRows === 1) {
            return res.status(201).json({
              call: 1,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            call: 0,
            data: err,
          });
        });
    }
  },

  deleteKrishiVidnyanFile: function (req, res) {
    let fileName = req.body.fileName;
    let fileId = req.body.fileId;
    let type = +req.body.type;

    MasterModel.deleteKrishiVidnyanFile(res.pool, fileId)
      .then((result) => {
        if (result.affectedRows === 1) {
          if (type === 1) {
            fs.unlinkSync(
              `./public/new-gp-page/main-page/files/krishi-vidnyan-lists/${fileName}`
            );
          }
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err.message,
        });
      });
  },

  saveMedicalRoomDetails: async function (req, res) {
    const data = req.body;

    MasterModel.saveMedicalRoomDetails(res.pool, data)
      .then((result) => {
        if (result.affectedRows === 1) {
          return res.status(200).json({
            call: 1,
            message: "Data enterd successfully",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  getAuthorityPerson: async function (req, res) {
    const data = req.body;

    MasterModel.getAuthorityPerson(res.pool)
      .then((result) => {
        // console.log("person ============ ", result)

        return res.status(200).json({
          call: 1,
          message: "Data enterd successfully",
          authorityPerson: result[0],
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  saveMedicalRoomDetails: async function (req, res) {
    const data = req.body;

    MasterModel.saveMedicalRoomDetails(res.pool, data)
      .then((result) => {
        if (result.affectedRows === 1) {
          return res.status(200).json({
            call: 1,
            message: "Data enterd successfully",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  getAuthorityPerson: async function (req, res) {
    const data = req.body;

    MasterModel.getAuthorityPerson(res.pool)
      .then((result) => {
        // console.log("person ============ ", result)

        return res.status(200).json({
          call: 1,
          message: "Data enterd successfully",
          authorityPerson: result[0],
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  //Medical rooom ends------------------------

  delete_gr_file: function (req, res) {
    let fileName = req.body.fileName;
    let fileId = req.body.fileId;

    MasterModel.delete_gr_file(res.pool, fileId)
      .then((result) => {
        if (result.affectedRows === 1) {
          fs.unlinkSync(
            `./public/new-gp-page/main-page/files/gr-lists/${fileName}`
          );
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  // empty plot list upload
  get_empty_plot_list_file_name_list: function (req, res) {
    MasterModel.get_empty_plot_list_file_name_list(res.pool).then((result) => {
      let filesList = [...result] || [];
      res.render("master/empty-plot-list-upload-view.pug", {
        filesList,
      });
    });
  },

  upload_empty_plot_list_file: function (req, res) {
    let file = req.files.file;
    let fileName = req.body.fileName;
    let fileExtension = file.name.split(".").pop();

    let fullFileName = `${fileName}.${fileExtension}`;

    const destDir = `./public/new-gp-page/main-page/files/empty-plot-file-lists`;

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    file.mv(`${destDir}/${fullFileName}`, (err) => {
      if (err) {
        return res.status(400).json({
          call: 0,
          data: err,
        });
      } else {
        MasterModel.upload_empty_plot_list_file(res.pool, fullFileName)
          .then((result) => {
            if (result.affectedRows === 1) {
              return res.status(201).json({
                call: 1,
              });
            }
          })
          .catch((err) => {
            return res.status(500).json({
              call: 0,
              data: err,
            });
          });
      }
    });
  },
  delete_empty_plot_list_file: function (req, res) {
    let fileName = req.body.fileName;
    let fileId = req.body.fileId;

    MasterModel.delete_empty_plot_list_file(res.pool, fileId)
      .then((result) => {
        if (result.affectedRows === 1) {
          fs.unlinkSync(
            `./public/new-gp-page/main-page/files/empty-plot-file-lists/${fileName}`
          );
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  //Arogaya Seva Kendra

  getArogyaSevaKendraList: async (req, res) => {
    try {
      const arogyaSevaKendraList = await MasterModel.getArogyaSevaKendraList(
        res.pool
      );

      return res.render(
        "master/arogya-seva-kendra/arogya-seva-kendra-list-view",
        {
          arogyaSevaKendraList,
        }
      );
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({
        call: 0,
        error: `Error : ${err}`,
      });
    }
  },

  getArogyaKendrDetailsView: async (req, res) => {
    let { id, arogyaSevaKendra } = req.query;
    let arogyaSevaKendraDetails = {};
    MasterModel.getArogyaSevaKendraDetails(res.pool, id)
      .then((_arogyaSevaKendraDetails) => {
        arogyaSevaKendraDetails = _arogyaSevaKendraDetails[0];
        return MasterModel.getArogyaSevakListForKendra(res.pool, id);
      })
      .then((arogyaSevakList) => {
        return res.render(
          "master/arogya-seva-kendra/arogya-seva-kendra-detail",
          {
            arogyaSevaKendraDetails,
            arogyaSevakList,
          }
        );
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          error: `Error : ${err}`,
        });
      });
  },

  saveArogyaSevaKendraDetails: async (req, res) => {
    let imageFile = req.files.arogya_seva_kendra_photo;
    let data = req.body;
    // console.log(data, '---')
    let fileExtension = imageFile.name.split(".").pop();

    MasterModel.saveArogyaSevaKendraDetails(res.pool, data)
      .then((result) => {
        if (result.affectedRows === 1 && result.insertId !== 0) {
          const uploadDir = path.join(
            "./public",
            "new-gp-page",
            "main-page",
            "files",
            "arogya-seva-kendra-information"
          );

          // Creating the directory if it doesn't exist
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          let imageName = `arogya-seva-kendra-${result.insertId}.${fileExtension}`;
          let imagePath = `./public/new-gp-page/main-page/files/arogya-seva-kendra-information/${imageName}`;

          imageFile.mv(imagePath, (err) => {
            if (!err) {
              // console.log('In moving')
              return MasterModel.addArogyaSevaKendraImageName(
                res.pool,
                imageName,
                result.insertId
              ).then((addImageResult) => {
                if (addImageResult.affectedRows === 1) {
                  return res.status(200).json({
                    call: 1,
                    message: "Arogya Seva Kendra registered successfully",
                  });
                } else {
                  return res.status(500).json({
                    call: 2,
                    message: "Arogya Seva Kendra could not be registered",
                  });
                }
              });
            } else {
              console.log("Error while making file : ", err);
              return Promise.reject({ affectedRows: 0 });
            }
          });
        } else {
          return res.status(500).json({
            call: 2,
            message: "Arogya Seva Kendra could not be registered ",
          });
        }
      })
      .catch((err) => {
        console.log("Error while uploading arogya seva kendra: ", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  updateArogyaSevaKendraDetails: async (req, res) => {
    let data = req.body;
    let editId = data.id;
    let arogyaSevaKendraPhoto;
    let fileExtension = "unknown";

    if (req.files && req.files.arogya_seva_kendra_photo) {
      arogyaSevaKendraPhoto = req.files.arogya_seva_kendra_photo;
      fileExtension = arogyaSevaKendraPhoto.name.split(".").pop();
    }

    let arogyaSevaKendraPhotoName;

    try {
      const updateResult = await MasterModel.updateArogyaSevaKendraDetails(
        res.pool,
        data,
        editId
      );
      if (updateResult.affectedRows === 1) {
        if (fileExtension !== "unknown") {
          let oldFilePath = `./public/new-gp-page/main-page/files/arogya-seva-kendra-information/${data.oldImageName}`;
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }

          arogyaSevaKendraPhotoName = `arogya-seva-kendra-${editId}.${fileExtension}`;

          await arogyaSevaKendraPhoto.mv(
            `./public/new-gp-page/main-page/files/arogya-seva-kendra-information/${arogyaSevaKendraPhotoName}`
          );

          await MasterModel.addArogyaSevaKendraImageName(
            res.pool,
            arogyaSevaKendraPhotoName,
            editId
          );
        }

        return res.status(200).json({
          call: 1,
          data: "Successfully updated",
        });
      }
    } catch (err) {
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  deleteArogyaSevaKendra: function (req, res) {
    const { id, oldImageName } = req.body;

    MasterModel.deleteArogyaSevaKendra(res.pool, id)
      .then((result) => {
        if (result.affectedRows === 1) {
          let directoryPath = `./public/new-gp-page/main-page/files/arogya-seva-kendra-information/${oldImageName}`;

          if (fs.existsSync(directoryPath)) {
            fs.unlinkSync(directoryPath);
          }

          return res.status(200).json({
            call: 1,
            message: "Deleted Successfully",
          });
        } else {
          return res.status(500).json({
            call: 0,
          });
        }
      })
      .catch((err) => {
        console.log("Error whlie deletign arougay seva kendra : ", err);
        return res.status(500).json({
          call: 0,
          error: err,
          message: "Error while deleting ",
        });
      });
  },

  //Arogya Seva Kendra Gallery

  getArogyaSevaKendraGalleryView: async (req, res) => {
    try {
      const { id, arogyaSevaKendraName } = req.query;

      const _arogyaSevaKendraDetails =
        await MasterModel.getArogyaSevaKendraDetails(res.pool, id);

      const galleryPhotos = await MasterModel.getArogyaSevaKendraGalleryPhotos(
        res.pool,
        id
      );

      return res.render(
        "master/arogya-seva-kendra/arogya-seva-kendra-gallery-view.pug",
        {
          arogyaSevaKendraDetails: _arogyaSevaKendraDetails[0],
          galleryPhotos,
        }
      );
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({
        call: 0,
        error: `Error : ${err}`,
        message: "Internal server error",
      });
    }
  },

  addArogyaSevaKendraGalleryPhoto: function (req, res) {
    let { arogyaSevaKendraId } = req.query;
    let arogyaSevaKendraGalleryPhoto =
      req.files.arogya_seva_kendra_gallery_photo;
    let imageExtension = arogyaSevaKendraGalleryPhoto.name.split(".").pop();

    let arogyaSevaKendraImageName;

    MasterModel.addArogyaSevaKendraGalleryPhoto(res.pool, arogyaSevaKendraId)
      .then((addedImage) => {
        if (addedImage.affectedRows === 1) {
          const directoryPath =
            "./public/new-gp-page/main-page/files/arogya-seva-kendra-gallery";

          if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
          }
          let insertId = addedImage.insertId;
          arogyaSevaKendraImageName = `${arogyaSevaKendraId}_${insertId}.${imageExtension}`;
          arogyaSevaKendraGalleryPhoto.mv(
            `${directoryPath}/${arogyaSevaKendraImageName}`,
            (err) => {
              if (err) {
                return res.status(400).json({
                  call: 0,
                  data: err,
                });
              } else {
                MasterModel.updateArogyaSevaKendraGalleryPhotoName(
                  res.pool,
                  arogyaSevaKendraImageName,
                  insertId
                )
                  .then((result) => {
                    return res.status(201).json({
                      call: 1,
                    });
                  })
                  .catch((err) => {
                    console.log("Eror in updaing", err);
                  });
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log("Error while uploadig gallery : ", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  deleteArogyaSevaKendraGalleryPhoto: function (req, res) {
    let { imageId, imageName } = req.body;
    MasterModel.deleteArogyaSevaKendraGalleryPhoto(res.pool, imageId)
      .then((result) => {
        if (result.affectedRows === 1) {
          const directoryPath =
            "./public/new-gp-page/main-page/files/arogya-seva-kendra-gallery";

          let imagePath = `${directoryPath}/${imageName}`;

          if (fs.existsSync) {
            fs.unlinkSync(imagePath);
          }
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        console.log("Error while deleteing , =", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  // arogya seva information
  arogya_seva_mahiti_view: async (req, res) => {
    try {
      let arogya_seva_kendra_id = req.query.id;
      const arogya_camp_photos = await MasterModel.get_arogya_camp_files(
        res.pool,
        arogya_seva_kendra_id
      );
      const arogya_sevak_information =
        await MasterModel.get_arogya_sevak_information(res.pool);
      res.render("master/arogya-seva-information-view", {
        arogya_sevak_information,
        arogya_camp_photos,
        arogya_seva_kendra_id,
      });
    } catch (err) {
      console.error("Error:", err);

      return res.status(500).json({
        call: 0,
        data: err,
      });
    }
  },

  post_arogya_sevak_information: function (req, res) {
    let arogya_sevak_photo = req.files.person_photo;
    let arogya_sevak_information = req.body;
    console.log(arogya_sevak_information, "---");
    let photo_file_extension = arogya_sevak_photo.name.split(".").pop();

    MasterModel.post_arogya_sevak_information(
      res.pool,
      arogya_sevak_information
    )
      .then((result) => {
        if (result.affectedRows === 1 && result.insertId !== 0) {
          const uploadDir = path.join(
            "./public",
            "new-gp-page",
            "main-page",
            "files",
            "arogya-sevak-information"
          );

          // Creating the directory if it doesn't exist
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }

          let arogya_sevak_photo_name = `arogya-sevak-${result.insertId}.${photo_file_extension}`;
          let imagePath = `./public/new-gp-page/main-page/files/arogya-sevak-information/${arogya_sevak_photo_name}`;

          arogya_sevak_photo.mv(imagePath, (err) => {
            if (!err) {
              // console.log('In moving')
              return MasterModel.add_arogya_sevak_image_name(
                res.pool,
                arogya_sevak_photo_name,
                result.insertId
              ).then((addImageResult) => {
                if (addImageResult.affectedRows === 1) {
                  return res.status(200).json({
                    call: 1,
                    message: "User registered successfully",
                  });
                } else {
                  return res.status(500).json({
                    call: 2,
                    message: "User could not be registered",
                  });
                }
              });
            } else {
              console.log("Error while making file : ", err);
              return Promise.reject({ affectedRows: 0 });
            }
          });
        } else {
          return res.status(500).json({
            call: 2,
            message: "User could not be registered ",
          });
        }
      })
      .catch((err) => {
        console.log("Error while uploading arogya sevak: ", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  delete_arogya_sevak_information: function (req, res) {
    let delete_id = req.body.delete_id;
    let arogya_sevak_photo_file_name = req.body.fileName;
    MasterModel.delete_arogya_sevak_information(res.pool, delete_id)
      .then((result) => {
        console.log(result, "after deletion");
        if (result.affectedRows === 1) {
          fs.unlinkSync(
            `./public/new-gp-page/main-page/files/arogya-sevak-information/${arogya_sevak_photo_file_name}`
          );
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        console.log("ERror in deleteing in aroygya seva ", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  upload_arogya_camp_photos: (req, res) => {
    let file = req.files.file;
    let fileName = req.body.fileName;
    let fileExtension = file.name.split(".").pop();

    let fullFileName = `${fileName}.${fileExtension}`;

    let { arogya_seva_kendra_id } = req.body;

    const destDir = `./public/new-gp-page/main-page/files/arogya-seva-camp-photos`;

    MasterModel.upload_arogya_camp_file(
      res.pool,
      fullFileName,
      arogya_seva_kendra_id
    )
      .then((result) => {
        if (result.affectedRows === 1 && result.insertId !== 0) {
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          let file_name_for_storage = `${arogya_seva_kendra_id}_${result.insertId}.${fileExtension}`;

          let filePath = `${destDir}/${file_name_for_storage}`;
          file.mv(filePath, (err) => {
            if (!err) {
              return MasterModel.add_arogya_camp_file_name_for_storage(
                res.pool,
                file_name_for_storage,
                result.insertId
              ).then((addFileResult) => {
                if (addFileResult.affectedRows === 1) {
                  return res.status(200).json({
                    call: 1,
                    message: "Camp Photo uploaded successfully",
                  });
                } else {
                  return res.status(500).json({
                    call: 2,
                    message: "Could not upload camp photo",
                  });
                }
              });
            } else {
              console.log("Error while making file : ", err);
              return Promise.reject({ affectedRows: 0 });
            }
          });
        } else {
          return res.status(500).json({
            call: 2,
            message: "Camp Photo could not be uploaded ",
          });
        }
      })
      .catch((err) => {
        console.log("ERror while uploadinfg aroyga camp photo = ", err);
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  delete_arogya_camp_photos: function (req, res) {
    let fileName = req.body.fileName;
    let fileId = req.body.delete_id;

    console.log(fileName, fileId, "--");

    const destDir = `./public/new-gp-page/main-page/files/arogya-seva-camp-photos`;

    MasterModel.delete_arogya_camp_photos(res.pool, fileId)
      .then((result) => {
        if (result.affectedRows === 1) {
          let filePath = `${destDir}/${fileName}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  // gov yojna

  get_gov_yojna_upload_view: asyncHandler(async (req, res) => {
    const filesList = await MasterModel.get_gov_yojna_file_name_list(res.pool);
    res.render("master/gov-yojna-upload-view.pug", {
      filesList,
    });
  }),

  upload_gov_yojna_file: function (req, res) {
    let file = req.files.file;
    let fileName = req.body.fileName;
    let fileExtension = file.name.split(".").pop();
    let fullFileName = `${fileName}.${fileExtension}`;

    let destDir = `./public/new-gp-page/main-page/files/gov-yojna-lists`;

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    file.mv(`${destDir}/${fullFileName}`, (err) => {
      if (err) {
        return res.status(400).json({
          call: 0,
          data: err,
        });
      } else {
        MasterModel.upload_gov_yojna_file(res.pool, fullFileName)
          .then((result) => {
            if (result.affectedRows === 1) {
              return res.status(201).json({
                call: 1,
              });
            }
          })
          .catch((err) => {
            return res.status(500).json({
              call: 0,
              data: err,
            });
          });
      }
    });
  },
  delete_gov_yojna_file: function (req, res) {
    let fileName = req.body.fileName;
    let fileId = req.body.fileId;
    MasterModel.delete_gov_yojna_file(res.pool, fileId)
      .then((result) => {
        if (result.affectedRows === 1) {
          fs.unlinkSync(
            `./public/new-gp-page/main-page/files/gov-yojna-lists/${fileName}`
          );
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  // job related

  get_add_job_related_view: asyncHandler(async (req, res) => {
    const jobDetails = await MasterModel.get_job_related_details(res.pool);
    res.render("master/job-related-upload-view.pug", {
      jobDetails,
    });
  }),

  upload_job_related_file: async function (req, res) {
    // console.log()
    let file;
    let link;
    let fileExtension;
    // let fileName = req.body.fileName

    let _data = req.body;
    console.log("job related files = ", req.body);

    if (req.files && req.files.jobRelatedData) {
      file = req.files.jobRelatedData;
      fileExtension = file.name.split(".").pop();
      console.log("fileNmae ", file.name);
    } else {
      link = req.body.jobRelatedData;
    }

    console.log(" file = ", file);
    console.log("link ", link);

    console.log(" extnsion = ", fileExtension);

    let sendData = {
      job_title: _data.jobRelatedTitle,
      job_description: _data.jobRelatedDescription,
      expiry_date: _data.jobRelatedExpiryDate,
      link: link || "",
      file_name: "",
    };

    MasterModel.upload_job_related_details(res.pool, sendData)
      .then((result) => {
        if (result.affectedRows == 1) {
          if (!file) {
            //if file was not sen
            return res.status(200).json({
              call: 1,
              message: "Successfully inserted ",
            });
          } else {
            const destDir = `./public/new-gp-page/main-page/files/job-related-files`;
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true });
            }

            let fileName = `job-related-${result.insertId}.${fileExtension}`;

            let filePath = `${destDir}/${fileName}`;
            file.mv(filePath, async (err) => {
              if (!err) {
                return await MasterModel.update_job_related_file_name(
                  res.pool,
                  fileName,
                  result.insertId
                ).then((_result) => {
                  if (_result.affectedRows === 1) {
                    return res.status(200).json({
                      call: 1,
                      message: "Insertion succesful",
                    });
                  }
                });
              } else {
                console.log("errrrro =======", err);
              }
            });
          }
        }
      })
      .catch((err) => {
        console.log("Main errr o = ", err);
        return res.status(500).json({
          call: 0,
          error: err,
          message: "Internal Server error",
        });
      });
  },

  update_job_related_details: function (req, res) {
    let data = req.body;

    let { oldFileName } = req.body;

    let file;
    let link;
    let fileExtension;

    let _data = req.body;
    // console.log('job related files = ', req.body)

    if (req.files && req.files.jobRelatedData) {
      file = req.files.jobRelatedData;
      fileExtension = file.name.split(".").pop();
      console.log("fileNmae ", file.name);
    } else {
      link = req.body.jobRelatedData;
    }

    // console.log(' file = ', file)
    // console.log('link ', link)

    // console.log(' extnsion = ', fileExtension)

    let sendData = {
      id: _data.id,
      job_title: _data.jobRelatedTitle,
      job_description: _data.jobRelatedDescription,
      expiry_date: _data.jobRelatedExpiryDate,
      link: link || "",
      file_name: "",
    };

    const destDir = `./public/new-gp-page/main-page/files/job-related-files`;
    let oldFilePath = `${destDir}/${oldFileName}`;

    if (oldFileName && fs.existsSync(oldFilePath)) {
      console.log("in removing");
      fs.unlinkSync(oldFilePath);
    }
    //Case 1
    if (link) {
      console.log("CASE 1 true");
      //which means the file does not exist && link was uplodaed
      MasterModel.update_job_related_details(res.pool, sendData)
        .then((result) => {
          if (result.affectedRows == 1) {
            console.log("CASE 1 final true");
            return res.status(200).json({
              call: 1,
              message: "Updated succesfully",
            });
          }
        })
        .catch((err) => {
          console.log("case 1 errr:", err);
          return res.status(500).json({
            call: 0,
            error: err,
            message: "Internal sever err",
          });
        });
    } else {
      // console.log('IN else')
      let newFileName = `job-related-${data.id}.${fileExtension}`;
      let newFilePath = `${destDir}/${newFileName}`;
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      sendData = { ...sendData, file_name: newFileName };

      return file.mv(newFilePath, async (err) => {
        if (!err) {
          return await MasterModel.update_job_related_details(
            res.pool,
            sendData
          )
            .then((_result) => {
              if (_result.affectedRows === 1) {
                console.log("case 2 fuak");
                return res.status(200).json({
                  call: 1,
                  message: "Updated Successully",
                });
              }
            })
            .catch((err) => {
              console.log("case 2 : ", err);
              return res.status(500).json({
                call: 0,
                error: err,
              });
            });
        } else {
          console.log("Error while updating file : ", err);
        }
      });
    }
  },

  delete_job_related_details: function (req, res) {
    let { id, fileName } = req.body;

    console.log(fileName);

    try {
      if (fileName && fileName.trim() != "") {
        const destDir = `./public/new-gp-page/main-page/files/job-related-files`;
        let filePath = `${destDir}/${fileName}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (err) {
      return res.status(500).json({
        call: 0,
        error: err,
        message: "An error has occured whiel deleting the file",
      });
    }

    MasterModel.delete_job_related_details(res.pool, id)
      .then((result) => {
        if (result.affectedRows === 1) {
          return res.status(200).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  // Gram Ahaval documents
  getAddGramAvhavalDocuementsView: async (req, res) => {
    try {
      const gram_ahaval_documents = await MasterModel.getGramAvhavalDocuements(
        res.pool
      );
      res.render(
        "master/gram-ahaval-documents/gram-ahaval-document-upload-view.pug",
        {
          gram_ahaval_documents,
        }
      );
    } catch (err) {
      console.log(`Error : ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  uploadGramAvhavalDocuement: async (req, res) => {
    try {
      let data = req.body;

      let documentFile = req.files.document_file;
      let documentFileExtension = documentFile.name.split(".").pop();

      console.log("uplaoding here = ", req.body, req.files);
      // return
      const result = await MasterModel.addGramAvhavalDocuement(res.pool, data);

      let insertId = result.insertId;

      const destDir = `./public/new-gp-page/main-page/files/gram-ahaval-documents`;

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      let fileName = `gram-ahaval-doc-${insertId}.${documentFileExtension}`;
      let filePath = `${destDir}/${fileName}`;

      return documentFile.mv(filePath, async (err) => {
        if (!err) {
          const result = await MasterModel.updateGramAvhavalDocumenPathName(
            res.pool,
            fileName,
            insertId
          );

          if (result.affectedRows >= 1) {
            return res.status(200).json({
              call: 1,
              message: "Gram Ahaval Document added successfully",
            });
          }
        } else {
          console.log("Error in file : ", err);
        }
      });
    } catch (err) {
      console.log(` ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  deleteGramAvhavalDocuement: async (req, res) => {
    try {
      let data = req.body;

      const destDir = `./public/new-gp-page/main-page/files/gram-ahaval-documents`;
      let filePath = `${destDir}/${data.fileName}`;

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      const result = await MasterModel.deleteGramAvhavalDocuement(
        res.pool,
        data.id
      );

      if (result.affectedRows >= 1) {
        return res.status(200).json({
          call: 1,
          message: "Gram ahaval document deleted successfully",
        });
      }
    } catch (err) {
      console.log(`Error : ${err}`);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },
  //Divyanga people applications  (दिव्यांग लोकांचे अर्ज )

  getDivyangaApplicationSingleUserDetailsView: async function (req, res) {
    const id = req.body;

    MasterModel.getDivyangaApplicationSingleUserDetails(res.pool, id)
      .then((userDetails) => {
        return res.render("master/divyanga/divyanga-people-applications-view", {
          userDetails,
        });
      })
      .catch((err) => {
        console.log("Error while rendering divang apllication view : ", err);
        res.send({
          call: 0,
          error: `Error : ${err}`,
        });
      });
  },

  getDivyangaPeopleApplicationsView: async function (req, res) {
    const application_status = req.query.applicationStatus;

    MasterModel.getDivyangaPeopleApplicationsList(res.pool, application_status)
      .then((applicationsList) => {
        if (application_status != 1) {
          return res.status(404).send({
            Error: "Page Not found",
          });
        }
        return res.render("master/divyanga/divyanga-people-applications-view", {
          applicationsList,
          applicationStatus: 1,
        });
      })
      .catch((err) => {
        console.log("Error while rendering divang apllication view : ", err);
        res.send({
          call: 0,
          error: `Error : ${err}`,
        });
      });
  },

  approveDivyangaUserApplication: async function (req, res) {
    const { id } = req.body;

    console.log("Aprroving application L ", id);

    MasterModel.approveDivyangaUserApplication(res.pool, id)
      .then((result) => {
        if (result.affectedRows === 1) {
          return res.status(200).json({
            call: 1,
            message: "Application approved successfully",
          });
        }
      })
      .catch((err) => {
        console.log("Error while approving the application");
        return res.status(500).json({
          call: 0,
          error: `Error : ${err}`,
          message: "Internal server error",
        });
      });
  },

  rejectDivyangaUserApplication: async function (req, res) {
    const { id } = req.body;

    MasterModel.rejectDivyangaUserApplication(res.pool, id)
      .then((result) => {
        if (result.affectedRows === 1) {
          return res.status(200).json({
            call: 1,
            message: "Application rejected successfully",
          });
        }
      })
      .catch((err) => {
        console.log("Error while rejecting the application");
        return res.status(500).json({
          call: 0,
          error: `Error : ${err}`,
          message: "Internal server error",
        });
      });
  },

  //online zoom meetings

  getZoomMeetingsView: async (req, res) => {
    try {
      const meetings = await meetingsModel.getAllZoomMeetings(res.pool);
      res.render("master/zoom-meetings/zoom-meetings-view.pug", {
        meetings,
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({
        call: 0,
        error: err,
        message: "Error while fetching all zoom meetings",
      });
    }
  },
};
module.exports = MasterController;
