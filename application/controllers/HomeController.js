let HomeModel = require("../model/HomeModel");
let FormNightModel = require("../model/FormNightModel");
var responderSet = require("../config/_responderSet");
var ZPModel = require("../model/ZPModel");
var masterModel = require("../model/MasterModel");
const fs = require("fs");
const { checkDuplicateTax } = require("../model/HomeModel");
const { AgeCalculator } = require("@dipaktelangre/age-calculator");

var responderSet = require("../config/_responderSet");
const MasterModel = require("../model/MasterModel");
const { sendError, renderPage } = require("../utils/sendResponse");
const asyncHandler = require("../utils/asyncHandler");
const { sendApiResponse, sendApiError } = require("../utils/apiResponses");
const { commonDataRedisKey, MY_TIME } = require("../utils/redisKeys");
const { redisClient, getRedisData, setRedisKey } = require("../utils/redis");
const getOrigin = require("../utils/siteUtils.js");
const generateUniqueFileName = require("../utils/generateFileName");
const path = require("path");
const { baseDir } = require("./createBaseDir");
const { saveFile, deleteFile } = require("../utils/saveFile");
const formEightModel2 = require("../model/Form_8/formEightModel");
const { getCurrentDayOfMonth } = require("../utils/dates");
const goodThoughts = require("../data/goodThoughts");
const { getIgUser } = require("../utils/igUtils");
const AppError = require("../utils/AppError.js");
const { UPLOAD_PATHS } = require("../config/uploadPaths.js");
const { addCurrentTimeToDate } = require("../utils/addCurrentTimeToDate.js");
let myDates = responderSet.myDate;

let CandidateController = {
  getCommonData: async function (req, res) {
    const cacheKey = commonDataRedisKey;
    // /*

    try {
      const cachedData = await getRedisData(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      // fetch all data from db then

      // 2. Fetch from DB
      let _gp = {};
      let allRequiredData = {};
      _gp = await HomeModel.getGpData(res.pool);
      allRequiredData.gp = _gp[0] || {};

      const sub_village = (await HomeModel.getGpCount(res.pool)) || [];

      const origin = getOrigin(req);
      // console.log(sub_village)
      let mainSiteData = sub_village.find((gpData) => gpData.gp_url === origin);

      allRequiredData.sub_village = sub_village;
      allRequiredData.sub_count = sub_village?.length || 0;

      allRequiredData.mainSiteData = mainSiteData;

      allRequiredData.krishiVidnyanFileNameList =
        (await MasterModel.getKrishiVidnyanFileNameList(res.pool)) || [];
      allRequiredData.govYojnaFileList =
        (await MasterModel.get_gov_yojna_file_name_list(res.pool)) || [];

      let queriedRes = await MasterModel.getAllRequiredData();

      let day = getCurrentDayOfMonth();

      allRequiredData = {
        ...allRequiredData,
        ...queriedRes,
        goodThought: goodThoughts[day],
      };

      const gpMemberList = JSON.parse(_gp[0]?.gp_member || "[]");
      const currentMargadarshakData =
        gpMemberList.find((member) => member.post == 13) || "";
      allRequiredData.currentMargadarshakData = currentMargadarshakData;
      allRequiredData.link = `/gp/asstes/images/gallery/`;

      await setRedisKey(cacheKey, allRequiredData, MY_TIME.FIVE_HOURS);

      return allRequiredData;
    } catch (err) {
      console.error("Error:", err);
      return {};
    }

    // */

    /*

		let sub_village = []
		let notice = []
		let sub_count = 0
		let gallery = []
		let birthday
		let grFileList = []
		let divyangaFileList = []
		let emptyPlotListFileList = []
		let arogyaSevakInformationList = []
		let arogyaCampPhotos = []
		let govYojnaFileList = []
		let krishiVidnyanFileNameList = []
		let gp = {}

		let allRequiredData = {}
		return HomeModel.getGpData(res.pool)
			.then((result) => {
				gp = result[0]
				allRequiredData = { ...allRequiredData, gp }
				return HomeModel.getGpCount(res.pool)
			})
			.then((result) => {
				sub_village = result
				console.log('Sub village  = ', sub_village)
				sub_count = result.length
				allRequiredData = { ...allRequiredData, sub_village, sub_count }
				return HomeModel.getWebNoticeListOnHomePage(res.pool)
			})
			.then((result) => {
				notice = result
				allRequiredData = { ...allRequiredData, notice }
				return masterModel.getGalleryImageList(res.pool)
			})
			.then((result) => {
				gallery = result
				allRequiredData = { ...allRequiredData, gallery }
				return HomeModel.getTodaysBirthday(res.pool)
			})
			.then((result) => {
				birthday = result
				allRequiredData = { ...allRequiredData, birthday }
				return MasterModel.get_gr_file_name_list(res.pool)
			})
			.then((result) => {
				grFileList = [...result] || []
				allRequiredData = { ...allRequiredData, grFileList }
				return MasterModel.get_divyanga_file_name_list(res.pool)
			})
			.then((result) => {
				divyangaFileList = [...result] || []
				allRequiredData = { ...allRequiredData, divyangaFileList }
				return MasterModel.get_empty_plot_list_file_name_list(res.pool)
			})
			.then((result) => {
				emptyPlotListFileList = [...result] || []
				allRequiredData = { ...allRequiredData, emptyPlotListFileList }
				return MasterModel.get_arogya_sevak_information(res.pool)
			})
			.then((result) => {
				arogyaSevakInformationList = [...result] || []
				allRequiredData = { ...allRequiredData, arogyaSevakInformationList }
				return MasterModel.get_arogya_camp_files(res.pool)
			})
			.then((result) => {
				arogyaCampPhotos = [...result] || []
				allRequiredData = { ...allRequiredData, arogyaCampPhotos }
				return MasterModel.getKrishiVidnyanFileNameList(res.pool)
			})
			.then((result) => {
				krishiVidnyanFileNameList = [...result] || []
				allRequiredData = { ...allRequiredData, krishiVidnyanFileNameList }
				return MasterModel.get_gov_yojna_file_name_list(res.pool)
			})
			.then((result) => {
				govYojnaFileList = [...result] || []
				allRequiredData = { ...allRequiredData, govYojnaFileList }

				let currentMargadarshakData
				let gpMemberList = JSON.parse(gp.gp_member)
				gpMemberList.forEach((el, i) => {
					if (el.post == 13) {
						currentMargadarshakData = el
					}
				})

				allRequiredData = {
					...allRequiredData,
					currentMargadarshakData: currentMargadarshakData
						? currentMargadarshakData
						: '',
					link: `/gp/asstes/images/gallery/`,
				}
				// console.log('Getting commmoon data in view : =======================', allRequiredData)
				return allRequiredData
			})
			.catch((err) => {
				console.log('Error : ', err)
				return allRequiredData
			})

		*/
  },

  indexView: asyncHandler(async (req, res) => {
    // if user is undefined, means if no user is logged

    if (!req.session?.User) {
      let allRequiredData = await CandidateController.getCommonData(req, res);

      let gp = allRequiredData.gp;

      if (gp?.gp_is_live == 0) {
        return renderPage(res, "new_gp/index-banner");
      }

      // else render outer home page

      // console.log("this is sgeting executed")
      // let currentMargadarshakData
      // let gpMemberList = JSON.parse(gp.gp_member)
      // gpMemberList.forEach((el, i) => {
      // 	if (el.post == 13) {
      // 		currentMargadarshakData = el
      // 	}
      // })
      // res.render('new_gp/index', {
      // 	...allRequiredData,
      // 	currentMargadarshakData: currentMargadarshakData
      // 		? currentMargadarshakData
      // 		: '',
      // 	link: `/gp/asstes/images/gallery/`,
      // })

      const videos = await HomeModel.getVideoGalleryData(res.pool);

      const gram_ahaval_documents = await HomeModel.getGramAhavalDocuments(
        res.pool,
      );

      let { p, tp } = req.query;
      // these are hard coded values as of now but later will be dynamic
      let y1 = 2022;
      let y2 = 2023;

      let userData = await HomeModel.printFormEightUserLimitOne(res.pool);

      let hasIgExpired = new Date() > new Date("2026-11-26");

      let igUser;
      if (!hasIgExpired) {
        igUser = await getIgUser(req);
      }

      return renderPage(res, "new_gp/index", {
        ...allRequiredData,
        videos,
        gram_ahaval_documents,
        userData,
        userDataString: JSON.stringify(userData),
        igUser,
        hasIgExpired,
      });
    }

    // else do the something else

    let gpSite = await HomeModel.getGpSiteData(res.pool);

    let gharkulYojanaList = await HomeModel.getGharkulYojanaList(res.pool);

    let [gp] = await HomeModel.getGpData(res.pool);

    return renderPage(res, "user/homepage", {
      title: "होम",
      gharkulYojanaList,
      gpSite,
      dastaveg: JSON.parse(gp.gp_dastavegList || "[]"),
    });
  }),

  setSiteSeen: function (req, res) {
    let data = req.body;
    HomeModel.updateSiteSeen(res.pool, data)
      .then((result) => {
        res.status(200).send({ call: 1 });
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },

  gramAdhikInfo: async function (req, res, next) {
    try {
      renderPage(res, "master/gram-adhik-mahiti", {
        isMasterPanel: false,
      });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  adarshTakta: async function (req, res) {
    try {
      const _gp = await HomeModel.getGpData(res.pool);

      res.render("master/gram_takta.pug", {
        takta: _gp[0] ? _gp[0].ps_gram_adarsh_takta : {},
        isMasterPanel: false,
        gp: _gp[0],
      });
    } catch (err) {
      console.error("Error:", err);
      res.send({ call: 0, data: err });
    }
  },

  get_gr_upload_view: asyncHandler(async (req, res) => {
    const filesList = await MasterModel.get_gr_file_name_list(res.pool);

    return renderPage(res, "master/gr-upload-view.pug", {
      filesList: filesList || [],
      isMasterPanel: false,
    });
  }),

  gramSadasya: async (req, res) => {
    try {
      let _gp = await HomeModel.getGpData(res.pool);

      let sList = _gp[0].gp_member;

      let sTo = await masterModel.getSadasyaToList(res.pool);

      let sPost = await masterModel.getSadasyaPostList(res.pool);

      renderPage(res, "master/gram-sadasya/gram_sadasya.pug", {
        sList: sList,
        sPost: JSON.stringify(sPost),
        sTo: JSON.stringify(sTo),
        isMaster: false,
      });
    } catch (err) {
      return sendError(res, 500, 0, "Internal Server Error" + err, err);
    }
  },

  //Medical rooom ------------------------वैद्यकीय पक्ष

  getMedicalRoomView: function (req, res) {
    return renderPage(res, "master/medical-room-view.pug", {
      isMasterPanel: false,
    });
  },

  getKrishiVidnyanView: asyncHandler(async (req, res) => {
    const filesList = await MasterModel.getKrishiVidnyanFileNameList(res.pool);
    return renderPage(res, "master/upload-krishi-vidnyan-view", {
      filesList,
      isMasterPanel: false,
    });
  }),

  gramListSetting: async (req, res) => {
    try {
      const _gp = await masterModel.getGpDetails(res.pool);
      const _postList = await masterModel.getSadasyaPostList(res.pool);

      renderPage(res, "master/gram_list-setting.pug", {
        _dastavegList: JSON.parse(_gp[0].gp_dastavegList),
        _postList,
        dastavegList: _gp[0].gp_dastavegList,
        isMasterPanel: false,
      });
    } catch (err) {
      return sendError(
        res,
        500,
        0,
        `Error while showing gram list setting : ${err}`,
        err,
      );
    }
  },

  makeStart: function (req, res) {
    HomeModel.startWebSite(res.pool)
      .then((result) => {
        res.redirect("/");
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },

  homeView: asyncHandler(async (req, res) => {
    const sub_village = (await HomeModel.getGpCount(res.pool)) || [];
    let { continue: continueOn } = req.query || {};
    if (typeof req.session?.User == "undefined") {
      return renderPage(res, "user/loginPage", {
        gpCount: sub_village?.length || 0,
        continueOn: continueOn,
        withoutLogin: continueOn?.length > 0,
      });
    }

    let gharkulYojanaList = await HomeModel.getGharkulYojanaList(res.pool);
    renderPage(res, "user/homepage", {
      title: "होम ",
      gharkulYojanaList,
      sessionUser: req.session.User,
      gpCount: sub_village?.length || 0,
    });
  }),

  formEightHomeView: asyncHandler(async (req, res) => {
    let f8Users = await HomeModel.getLastUserId(res.pool);

    let lastId = f8Users.length > 0 ? f8Users[0].id : 1;
    let malmattaNo = f8Users.length > 0 ? f8Users[0].malmattaNo : 0;

    let gharkulYojanaList = await HomeModel.getGharkulYojanaList(res.pool);

    renderPage(res, "user/form_8_phase_1", {
      title: "नमुना ८ नोंदणी",
      gharkulYojanaList,
      lastId,
      sessionUser: req.session.User,
      malmattaNo,
    });
  }),

  updateFormEightUser: asyncHandler(async (req, res) => {
    let formEightUserData = req.body;

    let { affectedRows } = await HomeModel.updateFormEightUser(
      res.pool,
      formEightUserData,
    );

    if (affectedRows) {
      return sendApiResponse(res, 200, true, "मालमत्ता धारक अपडेट झाला.");
    }

    return sendApiResponse(
      res,
      400,
      false,
      "नमुना ८ मालमत्ता धारक अपडेट नाही झाला.",
    );
  }),

  formEightUpdateView: (req, res, next) => {
    let lastId = 0;
    let gp = {};
    let malmattaNo = 0;
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        return HomeModel.getLastUserId(res.pool);
      })
      .then((result) => {
        if (result.length == 0) {
          lastId = 1;
        } else {
          lastId = result[0].id + 1;
          malmattaNo = result[0].malmattaNo;
        }
        return HomeModel.getGharkulYojanaList(res.pool);
      })
      .then((result) => {
        renderPage(res, "user/form_8_phase_1_update_view", {
          title: "नमुना ८ कर दुरुस्ती",
          gharkulYojanaList: result,
          lastId: lastId,
          sessionUser: req.session.User,
          gp: gp,
          malmattaNo: malmattaNo,
          dastaveg: JSON.parse(gp.gp_dastavegList),
        });
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },

  userPreview: function (req, res, next) {
    var data = req.params;
    if (isNaN(data.id)) {
      res.status(200).send({ call: 1, data: `Invalid Details Passe` });
    } else {
      var gp = {};
      HomeModel.getGpData(res.pool)
        .then((result) => {
          gp = result[0];
          return HomeModel.formEightUser(res.pool, data);
        })
        .then((result) => {
          if (result.length == 0) {
            res.status(200).send({
              call: 1,
              data: "Invalid Details",
            });
          } else {
            res.render("user/form_8_phase_1_preview", {
              result: result[0],
              sessionUser: req.session.User,
              gp: gp,
            });
          }
        })
        .catch((error) => {
          res.status(500).send({ call: error });
        });
    }
  },

  homePhaseTwo: function (req, res, next) {
    var data = req.params;
    if (isNaN(data.id)) {
      res.status(200).send({ call: 1, data: `Invalid Details Passe` });
    } else {
      HomeModel.getPreTaxationData(res.pool, data, function (type, sendData) {
        switch (sendData.call) {
          case 1:
            sendData.data["sessionUser"] = req.session.User;
            console.log(sendData.data);
            res.render("user/form_8_phase_2", sendData.data);
            break;
          case 2:
            res.status(200).send({
              call: 1,
              data: "Invalid Details",
            });
            break;

          default:
            res.status(200).send(sendData);
            break;
        }
      });
    }
  },

  deleteUserDetails: function (req, res, next) {
    let data = req.body;
    if (isNaN(data.id)) {
      res.status(500).send({ call: 0, data: `Invalid Details Passed` });
    } else {
      HomeModel.deleteFromEight(res.pool, data.id)
        .then((result) => {
          return HomeModel.deleteFromEightTax(res.pool, data.id);
        })
        .then((result) => {
          return HomeModel.deleteFromNine(res.pool, data.id);
        })
        .then(() => {
          // DELETE HOME AND MAP IMAGE

          let file1Exsists = fs.existsSync(
            `./public/home_map_image/home_photo/${data.feu_malmattaNo}.jpeg`,
          );
          console.log(file1Exsists);
          if (file1Exsists) {
            fs.unlink(
              `./public/home_map_image/home_photo/${data.feu_malmattaNo}.jpeg`,
              function (err) {
                console.log("File has been removed successfully");
              },
            );
          }

          let file2Exsists = fs.existsSync(
            `./public/home_map_image/map_photo/${data.feu_malmattaNo}_map.jpeg`,
          );

          if (file2Exsists) {
            fs.unlink(
              `./public/home_map_image/map_photo/${data.feu_malmattaNo}_map.jpeg`,
              function (err) {
                console.log("map image deleted successfully");
              },
            );
          }
        })
        .then((result) => {
          res.status(200).send({
            call: 1,
            message: "Deleted Successfully",
          });
        })
        .catch((error) => {
          res.status(500).send({ call: 0, data: error });
        });
    }
  },

  newApplicationForm: asyncHandler(async (req, res) => {
    const allRequiredData = await CandidateController.getCommonData(req, res);
    const doc_list = await HomeModel.getDocList(res.pool);
    renderPage(res, "user/new_application", {
      ...allRequiredData,
      doc_list,
      json_doc_list: JSON.stringify(doc_list),
    });
  }),

  phaseTwoTotalCalc: function (req, res, next) {
    var data = req.params;
    var taxData = [];

    if (isNaN(data.id)) {
      res.status(200).send({ call: 1, data: `Invalid Details Passe` });
    } else {
    }
  },
  lCheck: async function (req, res, next) {
    try {
      let loginData = req.body;

      if (!loginData?.userName || !loginData?.password) {
        return sendError(res, 400, 0, "Invalid Request", "Invalid Request");
      }

      const _userDetails = await HomeModel.checkAuth(res.pool, loginData);

      if (
        !_userDetails?.length ||
        _userDetails[0]?.password != loginData.password
      ) {
        return sendError(
          res,
          401,
          0,
          "Invalid Username or password",
          "Invalid Credentials",
        );
      }

      // req.session.User = _userDetails[0]

      return res.status(200).json({
        call: 1,
        message: "Login Successful.",
        // user: _userDetails[0]
      });

      // OLD code
      // HomeModel.checkAuth(res.pool, loginData)
      // 	.then((result) => {
      // 		if (result.length !== 0) {
      // 			req.session.User = result[0]
      // 		}

      // 		res.redirect('/')
      // 	})
      // 	.catch((error) => {
      // 		res.status(500).send({ call: 0, data: error })
      // 	})
    } catch (err) {
      return sendError(res, 500, 0, "Internal Server Error", err);
    }
  },

  // logout: function (req, res, next) {
  // req.session.destroy(function (err) {
  // 	// cannot access session here
  // 	res.redirect('/')
  // })
  // },

  checkOtp: asyncHandler(async (req, res) => {
    let { otp } = req.body;

    let loginData = req.body;

    if (!loginData?.userName || !loginData?.password) {
      return sendError(res, 400, 0, "Invalid Request", "Invalid Request");
    }

    const d = new Date();
    const otpOfTheDay = `${String(d.getDate()).padStart(2, "0")}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getFullYear()).slice(-2)}`;

    if (!otp || otp != otpOfTheDay) {
      return sendApiError(res, 401, false, "Invalid otp");
    }

    const _userDetails = await HomeModel.checkAuth(res.pool, loginData);

    req.session.User = _userDetails[0];

    return sendApiResponse(res, 200, true, "Successful login");
  }),

  logout: asyncHandler(async (req, res) => {
    req.session.destroy(function (err) {
      // cannot access session here
    });

    return sendApiResponse(res, 200, true);
  }),

  addNewFormEntry: async (req, res, next) => {
    // UNCOMMENTED CODE IS THE REFACTORED ONE, KEEPING THIS FOR FALLBACK, UNTIL CONFIRMED
    /** 
		var data = req.body
		if (req.files == null || req.files == undefined) {
			var fileOne = undefined
			var fileTwo = undefined
		} else {
			var fileOne = req.files.file1 == undefined ? undefined : req.files.file1
			var fileTwo = req.files.file2 == undefined ? undefined : req.files.file2
		}
		var insertID = 0
		HomeModel.saveNewFormEightDetails(res.pool, data)
			.then((result) => {
				insertID = result.insertId
				if (fileOne !== undefined) {
					var file1_name = data.newMalmattaNo.split('/').join('-') + '.jpeg'

					console.log(file1_name, 'oblique, ===')
					fileOne.mv(
						'./public/home_map_image/home_photo/' + file1_name,
						function (error) {
							if (error) {
								res.status(500).send({ call: 0, data: error })
								return false
							} else {
								var updateData = {}
								updateData['feu_image'] = file1_name
								updateData['id'] = insertID
								return HomeModel.updateNewFormEightHomeImage(
									res.pool,
									updateData
								)
							}
						}
					)
				}
				if (fileTwo !== undefined) {
					var file2_name = data.newMalmattaNo.split('/').join('-') + '_map.jpeg'
					console.log(file2_name, 'oblique, ===')

					fileTwo.mv(
						'./public/home_map_image/map_photo/' + file2_name,
						function (error) {
							if (error) {
								res.status(500).send({ call: 0, data: error })
								return false
							} else {
								var updateData = {}
								updateData['feu_image_map'] = file2_name
								updateData['id'] = insertID
								return HomeModel.updateNewFormEightMapImage(
									res.pool,
									updateData
								)
							}
						}
					)
				}
			})
			.then((result) => {
				res.status(200).send({ call: 1, data: insertID })
			})
			.catch((error) => {
				res.status(500).send({ call: 0, data: error })
			})
            */

    try {
      let f8UserData = req.body;

      let homeImageFile = req.files?.file1;
      let mapImageFile = req.files?.file2;

      let saveF8UserResult = await HomeModel.saveNewFormEightDetails(
        res.pool,
        f8UserData,
      );

      if (!saveF8UserResult.affectedRows) {
        return res.status(400).json({
          call: 0,
          message: "धारकाची माहिती पाठवा.",
        });
      }

      let f8UserInsertId = saveF8UserResult.insertId;

      let homeImageSavePath = null;
      let mapImageSavePath = null;

      // Saving the home image file
      if (homeImageFile) {
        let homeImageFileName = generateUniqueFileName(
          homeImageFile,
          "home-img-",
        );

        let homePhotoDir = `${baseDir}/home_map_image/home_photo`;

        homeImageSavePath = `${homePhotoDir}/${homeImageFileName}`;
        let isHomeImageSaved = await saveFile(homeImageFile, homeImageSavePath);

        if (!isHomeImageSaved) {
          return res.json(500).json({
            call: 0,
            message: "नमुना धारक जतन झाला पण घराचे छायाचित्र जतन नाही झाले. ",
          });
        }

        await HomeModel.updateNewFormEightHomeImage(res.pool, {
          id: f8UserInsertId,
          feu_image: homeImageFileName,
        });
      }

      // Saving the map image file
      if (mapImageFile) {
        let mapImageFileName = generateUniqueFileName(mapImageFile, "map-img-");

        let mapPhotoDir = `${baseDir}/home_map_image/map_photo`;

        mapImageSavePath = `${mapPhotoDir}/${mapImageFileName}`;
        let isMapImageSaved = await saveFile(mapImageFile, mapImageSavePath);

        if (!isMapImageSaved) {
          return res.json(500).json({
            call: 0,
            message: "नमुना धारक जतन झाला पण नकाशाचे छायाचित्र जतन नाही झाले. ",
          });
        }

        await HomeModel.updateNewFormEightMapImage(res.pool, {
          id: f8UserInsertId,
          feu_image_map: mapImageFileName,
        });
      }

      // New part, adding the new entry as well in the ferfar table ------------ (1sept2025)

      await HomeModel.updateFerfarDetails(res.pool, {
        userId: f8UserInsertId,
        newMalmattaNo: f8UserData.newMalmattaNo,
        newNewDharak: f8UserData.newNewDharak,
        newOldDharak: f8UserData.newOldDharak,
        newPherfarTharav: f8UserData.newPherfarTharav,
        newPherfarDocument: f8UserData.newPherfarDocument,
        newPherfarDate: f8UserData.newPherfarDate,
        registry_no: "",
      });

      return res.status(201).send({
        call: 1,
        data: f8UserInsertId,
      });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send({ call: 0, data: err });
    }
  },

  updateFormEntry: function (req, res, next) {
    var data = req.body;

    if (req.files == null || req.files == undefined) {
      var fileOne = undefined;
      var fileTwo = undefined;
    } else {
      var fileOne = req.files.file1 == undefined ? undefined : req.files.file1;
      var fileTwo = req.files.file2 == undefined ? undefined : req.files.file2;
    }

    var insertID = 0;
    HomeModel.updateFormEightDetails(res.pool, data)
      .then((result) => {
        if (fileOne !== undefined) {
          var file1_name = data.newMalmattaNo.split("/").join("-") + ".jpeg";

          if (!fs.existsSync("./public")) {
            // Create the ./public directory if it doesn't exist
            fs.mkdirSync("./public", { recursive: true });
          }

          let destDir = `./public/home_map_image/home_photo`;
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          fileOne.mv(
            "./public/home_map_image/home_photo/" + file1_name,
            function (error) {
              if (error) {
                res.status(500).send({ call: 0, data: error });
                return false;
              } else {
                var updateData = {};
                updateData["feu_image"] = file1_name;
                updateData["id"] = data.id;
                return HomeModel.updateNewFormEightHomeImage(
                  res.pool,
                  updateData,
                );
              }
            },
          );
        }
        if (fileTwo !== undefined) {
          var file2_name =
            data.newMalmattaNo.split("/").join("-") + "_map.jpeg";
          console.log(file2_name, "oblique, ===");

          let destDir = `./public/home_map_image/map_photo`;
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          fileTwo.mv(
            "./public/home_map_image/map_photo/" + file2_name,
            function (error) {
              if (error) {
                res.status(500).send({ call: 0, data: error });
                return false;
              } else {
                var updateData = {};
                updateData["feu_image_map"] = file2_name;
                updateData["id"] = data.id;
                return HomeModel.updateNewFormEightMapImage(
                  res.pool,
                  updateData,
                );
              }
            },
          );
        }
      })
      .then(() => {
        res.status(200).send({ call: 1, data: insertID });
      })
      .catch((error) => {
        console.log("Error while updating the form 8 : ", error);
        res.status(500).send({ call: 0, data: error });
      });
  },

  updateHomeImage: asyncHandler(async (req, res) => {
    const homeImage = req.files?.homeImage;
    let {
      id: f8UserId,
      home_image_upload_person_user_id,
      home_image_upload_person_username,
      malmatta_number,

      home_image_longitude,
      home_image_latitude,
      home_image_accuracy,
      home_image_altitude,
      home_image_altitude_accuracy,
      home_image_heading,
      home_image_speed,
      home_image_timestamp,
      home_iamge_location,
    } = req.body;

    if (!homeImage) {
      return sendApiError(res, 400, false, "कृपया घराचे छायाचित्र अपलोड करा.");
    }

    const homeImageName = generateUniqueFileName(
      homeImage,
      `home-img-m-${malmatta_number ? `${malmatta_number}-` : ""}`,
    );
    let homePhotoDir = `${baseDir}/home_map_image/home_photo`;

    const savePath = path.join(homePhotoDir, homeImageName);
    const isSaved = await saveFile(homeImage, savePath);

    if (!isSaved) {
      return sendApiError(
        res,
        500,
        false,
        "घराचे छायाचित्र जतन करता आले नाही.",
      );
    }

    let [f8UserData] = await formEightModel2.getFormEightUserData(
      res.pool,
      f8UserId,
    );

    let result = await formEightModel2.updateFormEightUserHomeImage(res.pool, {
      feu_image: homeImageName,
      id: f8UserId,
      home_image_upload_person_user_id,
      home_image_upload_person_username,
      home_image_longitude,
      home_image_latitude,
      home_image_accuracy,
      home_image_altitude,
      home_image_altitude_accuracy,
      home_image_heading,
      home_image_speed,
      home_image_timestamp,
      home_iamge_location,
    });

    // if not saved
    if (!result.affectedRows) {
      await deleteFile(savePath);
      return sendApiError(
        res,
        500,
        false,
        "घराचे छायाचित्र जतन करता आले नाही.",
      );
    }

    // if saved, remove the previous
    if (f8UserData?.feu_image)
      await deleteFile(path.join(homePhotoDir, f8UserData.feu_image));

    return sendApiResponse(res, 200, true, "घराचे छायाचित्र जतन झाले.");
  }),

  getFerfarDetails: function (req, res) {
    let { malmattaNumber } = req.body;
    console.log(malmattaNumber, "---");
    HomeModel.getFerfarDetails(res.pool, malmattaNumber)
      .then((result) => {
        if (result[0] == undefined) {
          console.log("not found");
        }
        return res.status(200).json({ call: 1, data: result[0] });
      })
      .catch((err) => {
        return res.status(500).json({ call: 0, data: err });
      });
  },
  form8FerFar: function (req, res, next) {
    let dastavejList;
    let ferfarYears;
    let gp;
    let years;
    HomeModel.getDastavejDetails(res.pool)
      .then((result) => {
        dastavejList = JSON.parse(result[0].gp_dastavegList);

        return HomeModel.getFerfarYears(res.pool);
      })
      .then((result) => {
        // console.log('Years : ', result);
        let years = new Set([]);
        result.forEach((el) => {
          let yr = el?.ferfar_date?.toString().split("/")[2];
          years.add(yr);
        });
        return years;
      })
      .then((result) => {
        years = result;
        return ZPModel.getZpDetails(res.pool);
      })
      .then((result) => {
        // console.log([...yer], 'yer here');
        res.render("user/form_8_fer_far", {
          title: "नमुना ८ फेरफार",
          gp: result[0],
          dastavejList,
          ferfarYears: [...years].sort(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  form8FerfarAvahalPrintView: function (req, res) {
    let { month, year } = req.query;

    // console.log('In controller :', month, year);

    if (month !== undefined && month !== null) {
      month = ("0" + month).slice(-2);
    }

    let gp = {};

    ZPModel.getZpDetails(res.pool)
      .then((result) => {
        gp = result[0];
        return HomeModel.form8FerfarAvahalPrintDetails(res.pool, year, month);
      })
      .then((ferfarAvahalList) => {
        // console.log('When month is undefined :', ferfarAvahalList);
        res.render("user/gp-ahaval/ferfar-avahal/ferfar-avahal-print", {
          gp: gp,
          ferfarAvahalList: ferfarAvahalList,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          error: err,
        });
      });
  },

  form8FerfarAvahalDateToDatePrintView: function (req, res) {
    let { date_from, date_to } = req.query;
    let gp = {};
    // in DD/MM/YYYY format
    // console.log(date_from, date_to, '-------------------------------')

    let _d1 = date_from.split("/");
    let _d2 = date_to.split("/");

    let requiredFormat1 = [_d1[1], _d1[0], _d1[2]].join("/");
    let requiredFormat2 = [_d2[1], _d2[0], _d2[2]].join("/");

    //MM/DD/YYYY format was used for query
    date_from = requiredFormat1;
    date_to = requiredFormat2;

    console.log(date_from, date_to, "-------------------------------");
    ZPModel.getZpDetails(res.pool)
      .then((result) => {
        gp = result[0];
        return HomeModel.form8FerfarAvahalPrintDateToDateDetails(
          res.pool,
          date_from,
          date_to,
        );
      })
      .then((ferfarAvahalList) => {
        console.log("When month is undefine/d :", ferfarAvahalList);
        res.render("user/gp-ahaval/ferfar-avahal/ferfar-avahal-print", {
          gp: gp,
          ferfarAvahalList: ferfarAvahalList,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          error: err,
        });
      });
  },

  deleteFerfarAvahal: function (req, res) {
    let { month, year } = req.body;
    console.log("In controller Month: ", month, "Year: ", year);
    if (month !== undefined && month !== null) {
      month = ("0" + month).slice(-2);
    }

    HomeModel.deleteFerfarAvahal(res.pool, month, year)
      .then((result) => {
        return res.status(200).json({
          call: 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          err,
        });
      });
  },

  deleteFerfarAvahalDateToDate: function (req, res) {
    const { date_from, date_to } = req.body;

    HomeModel.deleteFerfarAvahalDateToDate(res.pool, date_from, date_to)
      .then((result) => {
        return res.status(200).json({
          call: 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          err,
        });
      });
  },
  updateFerfarDetails: function (req, res) {
    // console.log(req.body);
    let data = req.body;
    HomeModel.updateFerfarDetails(res.pool, data)
      .then((result) => {
        if (result.affectedRows == 1) {
          return HomeModel.updateFormEight(res.pool, data);
        }
      })
      .then((result) => {
        return res.status(201).json({ call: 1 });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ call: 0 });
      });
  },

  fetchDataToEdit: function (req, res) {
    const { malmattaNumber } = req.body;
    // console.log('fethDATA tot edit', req.body);

    HomeModel.fetchDataToEdit(res.pool, malmattaNumber)
      .then((result) => {
        // console.log('MY result,', result)
        return res.status(200).json({
          call: 1,
          details: result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          call: 0,
          error: err,
        });
      });
  },
  //working
  saveEditedFerfarData: function (req, res) {
    const { newMalmattaNo } = req.body;
    const data = req.body;
    console.log(data);
    console.log("in save edit", data);

    HomeModel.saveEditedFerfar(res.pool, data)
      .then((result) => {
        console.log("Printing data in result 11", result);
        if (result.affectedRows == 1) {
          return HomeModel.updateFormEight(res.pool, data);
        }
        return false;
      })
      .then((result) => {
        if (result === false) {
          return res.status(500).json({ call: 2 });
        }
        // console.log("Printing data in result 22", result)
        return res.status(201).json({ call: 1 });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ call: 0 });
      });
  },
  getFerfarAvahalMonths: (req, res) => {
    const { year } = req.query;
    HomeModel.getFerfarAvahalMonths(res.pool, year)
      .then((result) =>
        res.status(200).json({
          call: 1,
          months: result
            .map((row) => parseInt(row.distinct_month))
            .sort((a, b) => a - b),
        }),
      )
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          error: err,
        });
      });
  },

  checkMalmattaDetails: function (req, res, next) {
    var data = req.body;

    HomeModel.getCheckMalmattaDetailsDuplicateOrOblique(res.pool, data)
      .then((result) => {
        if (result.length == 0) {
          res.status(200).send({
            call: 1,
            id: 0,
            subCheck: Number(data.checkSub),
          });
        } else {
          res.status(200).send({
            call: 1,
            id: result[0].id,
            subCheck: Number(data.checkSub),
          });
        }
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  saveTaxSample: (req, res, next) => {
    let _this = this;
    var data = req.body;
    console.log(data, "data-----data");

    var arogyaDivaKar = [];

    var calc = {
      user_id: data.id,
      total_building_work: 0,
      total_open_plot: 0,
      total_area: 0,
      building_tax: 0,
      open_area_tax: 0,
      other_tex: 0,
      water_tax: 0,
      dava_kar: 0,
      arogya_kar: 0,
      cleaning_tax: 0,
      tree_tax: 0,
      firebligate_tax: 0,
      education_tax: 0,
      total_tax: 0,
      created_date: myDates.getDate(),
    };

    var addData = [];

    let taxData;

    console.log("saving tax sample");

    HomeModel.saveNewTaxDetails(res.pool, data)
      .then((result) => {
        console.log("RESult afeter saving data = ", result);
        if (result.result !== 999) {
          return HomeModel.getFromEightTaxSampleData(res.pool, data);
        }
      })
      .then((result) => {
        if (result.result !== 999) {
          taxData = result;
          return HomeModel.getAarogyaDivaKarList(res.pool);
        }
      })
      .then((result) => {
        if (result.result !== 999) {
          arogyaDivaKar = result;
          // console.log(arogyaDivaKar, 'arogyaDivaKar')
          return HomeModel.cleanFormEightTotalTaxation(res.pool, data.id);
        }
      })
      .then(() => {
        return HomeModel.getPropertySpecification(res.pool);
      })
      .then((propSpecfication) => {
        var buldingWorkForDivaAndArogya = 0;
        taxData.forEach(function (value, index) {
          calc.total_area += value.fet_sq_area;
          if (value.fet_prop_desc_id < 5) {
            if (value.fet_prop_desc_id == 2) {
              calc.other_tex += value.fet_final_tax;
            } else {
              calc.building_tax += value.fet_final_tax;
            }

            // SETTING AROGYA ANI DIVA KAR ZERO FOR GOV PROPERTY AND TEMPLES(MANDIR)
            propSpecfication.forEach((el, i) => {
              if (value.fet_prop_space_id === el.id) {
                if (el.ps_skip_diwa_arogya === 1) {
                  buldingWorkForDivaAndArogya += 0;
                } else {
                  buldingWorkForDivaAndArogya += value.fet_sq_area;
                }
              }
            });

            calc.total_building_work += value.fet_sq_area;
          } else {
            calc.total_open_plot += value.fet_sq_area;
            calc.open_area_tax += value.fet_final_tax;
          }
        });
        if (buldingWorkForDivaAndArogya !== 0) {
          arogyaDivaKar.forEach(function (value, index) {
            var min = value.adk_min - 1;
            var max = value.adk_max + 1;
            if (
              buldingWorkForDivaAndArogya > min &&
              buldingWorkForDivaAndArogya < max
            ) {
              calc.dava_kar = value.adk_diva;
              calc.arogya_kar = value.adk_arogya;
              calc.education_tax = value.education_tax;
              calc.cleaning_tax = value.cleaning_tax;
              calc.tree_tax = value.tree_tax;
              calc.firebligate_tax = value.firebligate_tax;
            }
          });
        } else {
          calc.dava_kar = 0;
          calc.arogya_kar = 0;
          calc.cleaning_tax = 0;
          calc.education_tax = 0;
          calc.tree_tax = 0;
          calc.firebligate_tax = 0;
        }

        calc.total_tax =
          calc.arogya_kar +
          calc.building_tax +
          calc.open_area_tax +
          calc.other_tex +
          calc.dava_kar +
          calc.cleaning_tax +
          calc.education_tax +
          calc.tree_tax +
          calc.firebligate_tax;

        addData = [
          calc.user_id, //0
          calc.total_building_work, //1
          calc.total_open_plot, //2
          calc.total_area, //3
          calc.building_tax, //4
          calc.open_area_tax, //5
          calc.other_tex, // 6
          calc.dava_kar, // 7
          calc.water_tax, // 8
          calc.arogya_kar, // 9
          calc.cleaning_tax, //10
          calc.tree_tax, //11
          calc.firebligate_tax, //12
          calc.education_tax, //13
          calc.total_tax, //14
          calc.created_date, //15
        ];
        return HomeModel.saveNewTotalTaxDetails(res.pool, calc);
      })
      .then((result) => {
        console.log(result, "result after updating form eight total taxation");
        if (result !== 999) {
          return FormNightModel.getFormNineSavedDetails(res.pool, {
            id: addData[0],
          });
        } else return 999;
      })
      .then((result) => {
        console.log(result, "total result of all, ----");

        let currentSubmitedData = addData;
        console.log("Current data = ", currentSubmitedData);
        let oldFormNineSaveData = result[0];

        let currentBuildingTax =
          Number(currentSubmitedData[4]) +
          Number(currentSubmitedData[5]) +
          Number(currentSubmitedData[6]);

        let currentDivaKar = Number(currentSubmitedData[7]);

        let currentArogyaTax = Number(currentSubmitedData[9]);

        let currentEducationTax = Number(currentSubmitedData[13]);

        let currentFireblegateTax = Number(currentSubmitedData[12]);

        let currentCleaningTax = Number(currentSubmitedData[10]);

        let currentTreeTax = Number(currentSubmitedData[11]);

        console.log("Current Building Tax: " + currentBuildingTax);
        console.log(
          "Last Building Tax (Old): " + oldFormNineSaveData?.lastBuildingTax,
        );

        console.log("Current Diva Tax: " + currentDivaKar);
        console.log("Last Diva Tax (Old): " + oldFormNineSaveData?.lastDivaTax);

        console.log("Current Arogya Tax: " + currentArogyaTax);
        console.log(
          "Last Arogya Tax (Old): " + oldFormNineSaveData?.lastArogyaTax,
        );

        console.log("Current Education Tax: " + currentEducationTax);
        console.log(
          "Last Education Tax (Old): " + oldFormNineSaveData?.lastEducationTax,
        );

        console.log("Current Fireblegate Tax: " + currentFireblegateTax);
        console.log(
          "Last Fireblegate Tax (Old): " +
            oldFormNineSaveData?.lastFireblegateTax,
        );

        console.log("Current Cleaning Tax: " + currentCleaningTax);
        console.log(
          "Last Cleaning Tax (Old): " + oldFormNineSaveData?.lastCleaningTax,
        );

        console.log("Current Tree Tax: " + currentTreeTax);
        console.log("Last Tree Tax (Old): " + oldFormNineSaveData?.lastTreeTax);

        let totalSampurnaTax =
          currentBuildingTax +
          (oldFormNineSaveData?.lastBuildingTax || 0) +
          currentDivaKar +
          (oldFormNineSaveData?.lastDivaTax || 0) +
          currentArogyaTax +
          (oldFormNineSaveData?.lastArogyaTax || 0) +
          currentEducationTax +
          (oldFormNineSaveData?.lastEducationTax || 0) +
          currentFireblegateTax +
          (oldFormNineSaveData?.lastFireblegateTax || 0) +
          currentCleaningTax +
          (oldFormNineSaveData?.lastCleaningTax || 0) +
          currentTreeTax +
          (oldFormNineSaveData?.lastTreeTax || 0);

        let updateId = oldFormNineSaveData?.id;

        // console.log('Old lstt building tax = ', 3)
        let totalBuildingTax =
          currentBuildingTax + oldFormNineSaveData?.lastBuildingTax;
        if (result.length === 0) {
          // This means there was no such entry existsed
          const insertData = {
            currentArogyaTax,
            currentBuildingTax,
            currentDivaTax: currentDivaKar,
            currentGenealWaterTax: 0,
            currentSpacialWaterTax: 0,

            currentEducationTax,
            currentFireblegateTax,
            currentCleaningTax,
            currentTreeTax,

            user_id: data.id, // data.id is malmattaNumber
            lastArogyaTax: 0,
            lastBuildingTax: 0,
            lastDivaTax: 0,
            lastGenealWaterTax: 0,
            lastSpacialWaterTax: 0,

            lastEducationTax: 0,
            lastFireblegateTax: 0,
            lastCleaningTax: 0,
            lastTreeTax: 0,

            lastTaxFine: 0,
            lastYearTaxFine: 0,
            lastTaxRelief: 0,

            totalArogyaTax: currentArogyaTax + 0,
            totalBuildingTax: currentBuildingTax + 0,
            totalDivaTax: currentDivaKar + 0,

            totalGenealWaterTax: 0 + 0,
            totalSampurnaTax,
            totalSpacialWaterTax: 0 + 0,

            totalEducationTax: currentEducationTax + 0,
            totalFireblegateTax: currentFireblegateTax + 0,
            totalCleaningTax: currentCleaningTax + 0,
            totalTreeTax: currentTreeTax + 0,

            totalTax: totalSampurnaTax + 0,
            totalWaterTax: 0,
          };
          return FormNightModel.saveNewFormNineDetails(res.pool, insertData);
        } else {
          const updateData = {
            currentBuildingTax,
            currentDivaKar,
            currentArogyaTax,
            currentEducationTax,
            currentFireblegateTax,
            currentCleaningTax,
            currentTreeTax,
            totalSampurnaTax,
            totalBuildingTax,

            updateId,
          };
          // console.log(updateData, 'updateData update formnine from form eight')

          return FormNightModel.updateFormNineFromFormEight(
            res.pool,
            updateData,
          );
        }
        // if (result !== 999) {
        // 	if (result.length === 0) {
        // 		return res.status(200).send({ call: 1, data: 1 })
        // 	} else {
        // 	}
        // } else return 999
      })
      .then((result) => {
        console.log(result, "result after updation");
        if (result !== 999) {
          return res.status(200).send({ call: 1, data: 1 });
        }
      })
      .catch((error) => {
        console.log(error, "error-----------------------------");
        //  res.status(500).send({ call: 0, data: error });
        //  console.log(error)
      });
  },

  getFromEightTaxSampleData: function (req, res, next) {
    var data = req.body;
    let sendData = { call: 1, data: [], data1: [] };

    HomeModel.getFromEightTaxSampleData(res.pool, data)
      .then((formEightTaxationRows) => {
        // this might return the multiple rows
        sendData["data"] = formEightTaxationRows;
        return HomeModel.getFromEightTaxTotalData(res.pool, data);
      })
      .then((formEightTotalTaxationRows) => {
        // this must return the single row
        sendData["data1"] = formEightTotalTaxationRows;
        res.status(200).send(sendData);
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },

  removeSingleTaxSample: function (req, res, next) {
    var data = req.body;
    var arogyaDivaKar = [];
    var calc = {
      user_id: data.id,
      total_building_work: 0,
      total_open_plot: 0,
      total_area: 0,
      building_tax: 0,
      open_area_tax: 0,
      other_tex: 0,
      water_tax: 0,
      dava_kar: 0,
      arogya_kar: 0,
      cleaning_tax: 0,
      tree_tax: 0,
      firebligate_tax: 0,
      education_tax: 0,
      total_tax: 0,
      created_date: myDates.getDate(),
    };

    var addData = [];
    let taxData;

    HomeModel.removeSingleTaxSample(res.pool, data)
      .then((result) => {
        if (result.result !== 999) {
          return HomeModel.getFromEightTaxSampleData(res.pool, data);
        }
      })
      .then((result) => {
        if (result.result !== 999) {
          taxData = result;
          return HomeModel.getAarogyaDivaKarList(res.pool);
        }
      })
      .then((result) => {
        if (result.result !== 999) {
          arogyaDivaKar = result;
          return HomeModel.cleanFormEightTotalTaxation(res.pool, data.id);
        }
      })
      .then(() => {
        return HomeModel.getPropertySpecification(res.pool);
      })
      .then((propSpecfication) => {
        var buldingWorkForDivaAndArogya = 0;
        taxData.forEach(function (value, index) {
          calc.total_area += value.fet_sq_area;
          if (value.fet_prop_desc_id < 5) {
            if (value.fet_prop_desc_id == 2) {
              calc.other_tex += value.fet_final_tax;
            } else {
              calc.building_tax += value.fet_final_tax;
            }

            // SETTING AROGYA ANI DIVA KAR ZERO FOR GOV PROPERTY AND TEMPLES(MANDIR)
            propSpecfication.forEach((el, i) => {
              if (value.fet_prop_space_id === el.id) {
                if (el.ps_skip_diwa_arogya === 1) {
                  buldingWorkForDivaAndArogya += 0;
                } else {
                  buldingWorkForDivaAndArogya += value.fet_sq_area;
                }
              }
            });

            calc.total_building_work += value.fet_sq_area;
          } else {
            calc.total_open_plot += value.fet_sq_area;
            calc.open_area_tax += value.fet_final_tax;
          }
        });
        if (buldingWorkForDivaAndArogya !== 0) {
          arogyaDivaKar.forEach(function (value, index) {
            var min = value.adk_min - 1;
            var max = value.adk_max + 1;
            if (
              buldingWorkForDivaAndArogya > min &&
              buldingWorkForDivaAndArogya < max
            ) {
              calc.dava_kar = value.adk_diva;
              calc.arogya_kar = value.adk_arogya;
              calc.cleaning_tax = value.cleaning_tax;
              calc.education_tax = value.education_tax;
              calc.tree_tax = value.tree_tax;
              calc.firebligate_tax = value.firebligate_tax;
            }
          });
        } else {
          calc.dava_kar = 0;
          calc.arogya_kar = 0;
          calc.cleaning_tax = 0;
          calc.education_tax = 0;
          calc.tree_tax = 0;
          calc.firebligate_tax = 0;
        }

        calc.total_tax =
          calc.arogya_kar +
          calc.building_tax +
          calc.open_area_tax +
          calc.other_tex +
          calc.dava_kar +
          calc.cleaning_tax +
          calc.education_tax +
          calc.tree_tax +
          calc.firebligate_tax;

        addData = [
          calc.user_id,
          calc.total_building_work,
          calc.total_open_plot,
          calc.total_area,
          calc.building_tax,
          calc.open_area_tax,
          calc.other_tex,
          calc.dava_kar,
          calc.water_tax,
          calc.arogya_kar,
          calc.cleaning_tax,
          calc.tree_tax,
          calc.firebligate_tax,
          calc.education_tax,
          calc.total_tax,
          calc.created_date,
        ];

        return HomeModel.saveNewTotalTaxDetails(res.pool, calc);
      })
      .then((result) => {
        if (result !== 999) {
          if (result === 888) {
            res.status(200).send({ call: 1, data: result });
            return 999;
          } else {
            return FormNightModel.getFormNineSavedDetails(res.pool, {
              id: addData[0],
            });
          }
        } else return 999;
      })
      .then((result) => {
        if (result !== 999) {
          if (result.length === 0) {
            res.status(200).send({ call: 1, data: 1 });
          } else {
            currentSubmitedData = addData;
            oldFormNineSaveData = result[0];

            let currentBuildingTax =
              Number(currentSubmitedData[4]) +
              Number(currentSubmitedData[5]) +
              Number(currentSubmitedData[6]);

            let currentDivaKar = Number(currentSubmitedData[7]);

            let currentArogyaTax = Number(currentSubmitedData[9]);

            let currentEducationTax = Number(currentSubmitedData[13]);

            let currentFireblegateTax = Number(currentSubmitedData[12]);

            let currentCleaningTax = Number(currentSubmitedData[10]);

            let currentTreeTax = Number(currentSubmitedData[11]);

            let totalSampurnaTax =
              currentBuildingTax +
              oldFormNineSaveData.lastBuildingTax +
              currentDivaKar +
              oldFormNineSaveData.lastDivaTax +
              currentArogyaTax +
              oldFormNineSaveData.lastArogyaTax +
              currentEducationTax +
              oldFormNineSaveData.lastEducationTax +
              currentFireblegateTax +
              oldFormNineSaveData.lastFireblegateTax +
              currentCleaningTax +
              oldFormNineSaveData.lastCleaningTax +
              currentTreeTax +
              oldFormNineSaveData.lastTreeTax;

            let updateId = oldFormNineSaveData.id;

            let totalBuildingTax =
              currentBuildingTax + oldFormNineSaveData.lastBuildingTax;

            const updateData = {
              currentBuildingTax,
              currentDivaKar,
              currentArogyaTax,
              currentEducationTax,
              currentFireblegateTax,
              currentCleaningTax,
              currentTreeTax,
              totalSampurnaTax,
              totalBuildingTax,

              updateId,
            };
            // console.log(
            // 	updateData,
            // 	'updateData update formnine from form eight'
            // )

            return FormNightModel.updateFormNineFromFormEight(
              res.pool,
              updateData,
            );
            // var c_building =
            // 	Number(addData[4]) + Number(addData[5]) + Number(addData[6])
            // var updateData = {
            // 	current_building_tax: c_building,
            // 	lastBuildingTax: result[0].lastBuildingTax,
            // 	totalBuildingTax: c_building + Number(result[0].lastBuildingTax),
            // 	totalSampurnaTax:
            // 		c_building +
            // 		Number(result[0].lastBuildingTax) +
            // 		Number(result[0].totalDivaTax) +
            // 		Number(result[0].totalArogyaTax) +
            // 		Number(result[0].totalTax),
            // 	id: result[0].id,
            // }
            // return FormNightModel.updateFormNineFromFormEight(
            // 	res.pool,
            // 	updateData
            // )
          }
        } else return 999;
      })
      .then((result) => {
        if (result !== 999) {
          res.status(200).send({ call: 1, data: 1 });
        }
      })
      .catch((error) => {
        // res.status(500).send({ call: 0, data: error });
      });
  },
  checkNextUser: function (req, res, next) {
    var data = req.body;
    HomeModel.getNextUserId(res.pool, data)
      .then((result) => {
        if (result.length !== 0)
          res.status(200).send({ call: 1, data: result[0].id });
        else res.status(200).send({ call: 0 });
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },

  checkNextUserByMalmatta: asyncHandler(async (req, res) => {
    let data = req.body;

    let [nextUser] = await HomeModel.getNextUserByMalmatta(res.pool, data);

    if (!nextUser) {
      return sendApiError(res, 404, false, "हा शेवटचा मालमत्ता धारक होता.");
    }
    return sendApiResponse(res, 200, true, "पुढील मालमत्ता धारक सापडला", {
      nextUser,
    });
  }),

  getSingleUserDetails: function (req, res, next) {
    var data = req.body;
    console.log(data, "search data");
    let allOldOwnerList = [];
    HomeModel.getOldOwnerList(res.pool, data.id)
      .then((result) => {
        console.log("owner list data =", result);
        let allList = [];
        result.map((el) => {
          return allList.push(el.feu_old_owner);
        });
        return allList;
      })
      .then((allList) => {
        allOldOwnerList = allList;
        console.log("alloldowner rtlist  = ", allOldOwnerList);
        return HomeModel.formEightUser(res.pool, data);
      })
      .then((result) => {
        // console.log(result, 'single user data')
        if (result.length == 0) {
          res.status(200).send({ call: 0 });
        } else {
          console.log(result);
          return res.status(200).send({
            call: 1,
            data: result[0],
            allOldOwnerList,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ call: error });
      });
  },
  /**
	addNewApplication2: function (req, res, next) {
		let data = req.body
		HomeModel.getPreviousApplicationDate(res.pool, data)
			.then((previousAppliedDate) => {
				console.log(previousAppliedDate)
				if (previousAppliedDate.length === 0) {
					return HomeModel.addNewApplication(res.pool, data)
				}
				const [pDay, pMonth, pYear] =
					previousAppliedDate[0].create_date.split('-')
				// previous date as per format
				let pDate = `${pYear}-${pMonth}-${pDay}`

				// current date
				let cDate = myDates.getDate()
				let difference = AgeCalculator.getAge(new Date(pDate), new Date(cDate))
				// console.log(difference.days, 'difference between previous application')

				return difference.days
			})
			.then((result) => {
				if (result <= 15) {
					return res.status(200).send({
						call: 2,
					})
				}

				if (result.insertId == 0) {
					res.status(200).send({ call: 0 })
				} else {
					res.status(200).send({ call: 1, id: result.insertId })
				}
			})
			.catch((error) => {
				// console.log('error occured------------------------------------')
				res.status(500).send({ call: error })
			})
	},
     */

    // not workign, but still kept, might need for reference
  addNewApplicationOld: async (req, res) => {
    const reasonList = [
      "जन्म नोंद दाखला",
      "मृत्यू नोंद दाखला",
      "विवाह नोंदणी दाखला",
      "नमुना नं. 8 चा उतारा",
      "निराधार असले बाबतचा दाखला",
      "ग्रामपंचायत येणे बाकी नसल्याचा दाखला",
    ];

    try {
      let newApplicationData = req.body;

      // 1. Check if the user has applied before
      let previousAppliedDate = await HomeModel.getPreviousApplicationDate(
        res.pool,
        newApplicationData,
      );

      // No previous application — insert new one directly
      if (previousAppliedDate.length === 0) {
        let result = await HomeModel.addNewApplication(
          res.pool,
          newApplicationData,
        );
        if (result.insertId === 0) {
          return res
            .status(200)
            .json({ call: 0, message: "अर्ज जतन नाही झाला." });
        }
        return res.status(200).json({
          call: 1,
          id: result.insertId,
          message: "अर्ज यशस्वीरित्या जतन झाला.",
        });
      }

      // 2. Calculate days difference from previous application
      const [day, month, year] = previousAppliedDate[0].create_date.split("-");
      let previousDate = `${year}-${month}-${day}`;
      let currentDate = myDates.getDate();

      let { days } = AgeCalculator.getAge(
        new Date(previousDate),
        new Date(currentDate),
      );

      // If applied within 15 days, block
      if (days <= 15) {
        return res.status(200).json({ call: 2 });
      }

      // 3. Check for specific doc titles in docDetails
      let { docDetails } = newApplicationData;

      const otherWorkDocTitle = "इतर काम लिहावे कोणते असल्यास";
      const complaintDocTitle = "गावातील तक्रारी नोद येथे लिहावी ";

      let hasOtherWorkDoc = false;
      let hasComplaintDoc = false;

      if (Array.isArray(docDetails) && docDetails.length > 0) {
        for (let doc of docDetails) {
          if (doc.docTitle === otherWorkDocTitle) {
            hasOtherWorkDoc = true;
          } else if (doc.docTitle === complaintDocTitle) {
            hasComplaintDoc = true;
          }

          // Stop early if both are found
          if (hasOtherWorkDoc && hasComplaintDoc) break;
        }
      }

      const existsForOtherReasons = hasOtherWorkDoc || hasComplaintDoc;
      const isWithin180Days = days <= 180;

      // 4. If same reason re-applied within 180 days, block with message
      if (existsForOtherReasons && isWithin180Days) {
        let reasonTitles = [];

        if (hasOtherWorkDoc) reasonTitles.push(otherWorkDocTitle);
        if (hasComplaintDoc) reasonTitles.push(complaintDocTitle);

        const joinedReasons = reasonTitles.join(" आणि ");

        return res.status(409).json({
          call: 0,
          message: `आपण '${joinedReasons}' या कारणासाठी मागील ६ महिन्यांच्या आत अर्ज केलेला आहे. कृपया काही कालावधीनंतर पुन्हा अर्ज करा.`,
        });
      }

      // 5. All checks passed — insert new application
      let result = await HomeModel.addNewApplication(
        res.pool,
        newApplicationData,
      );

      if (result.insertId === 0) {
        return res
          .status(200)
          .json({ call: 0, message: "अर्ज जतन नाही झाला." });
      }
      return res.status(200).json({
        call: 1,
        id: result.insertId,
        message: "अर्ज यशस्वीरित्या जतन झाला.",
      });
    } catch (err) {
      console.error("Error in addNewApplication:", err);
      return res.status(500).json({
        call: 0,
        message: err?.message,
        error: err.message || err,
      });
    }
  },
  
  addNewApplication: async (req, res) => {
    const reasonList = [
      "जन्म नोंद दाखला",
      "मृत्यू नोंद दाखला",
      "विवाह नोंदणी दाखला",
      "नमुना नं. 8 चा उतारा",
      "निराधार असले बाबतचा दाखला",
      "ग्रामपंचायत येणे बाकी नसल्याचा दाखला",
      "दारिद्र्यरेषेखालचा दाखला"
    ];

    try {
      const newApplicationData = req.body;
      console.log(newApplicationData);
      console.log(newApplicationData.docDetails);
      const newDocs = Array.isArray(newApplicationData.docDetails)
        ? newApplicationData.docDetails.map((d) => d.docTitle)
        : [];

      console.log(newApplicationData);
      // 1️⃣ Get previous applications
      const previousApplications = await HomeModel.getPreviousApplicationDate(
        res.pool,
        newApplicationData,
      );

      // 2️⃣ Flatten previous docDetails with create_date
      const prevDocs = [];
      previousApplications?.forEach((app) => {
        let prevAppDoc = JSON.parse(app.docDetails);
        if (Array.isArray(prevAppDoc)) {
          prevAppDoc.forEach((doc) => {
            prevDocs.push({
              docTitle: doc.docTitle,
              createDate: app.create_date,
            });
          });
        }
      });

      // 3️⃣ Check for duplicates within 7 days
      const duplicates = [];
      const allowed = [];

      const currentDate = new Date(myDates.getDate());

      newDocs.forEach((docTitle) => {
        // Find previous application for this doc

        const prev = prevDocs.find((pd) => {
          return pd.docTitle === docTitle;
        });
        if (prev) {
          const prevDate = new Date(
            prev.createDate.split("-").reverse().join("-"),
          );
          const diffTime = currentDate - prevDate;
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays < 7) {
            duplicates.push(docTitle);
          } else {
            allowed.push(docTitle);
          }
        } else {
          allowed.push(docTitle);
        }
      });

      console.log(duplicates);

      // 4️⃣ If duplicates exist, send message
      if (duplicates.length > 0) {
        const blockedStr = duplicates.join(" आणि ");
        const allowedStr = allowed.length > 0 ? allowed.join(" आणि ") : null;

        let message = `आपण '${blockedStr}' या सेवांसाठी मागील ७ दिवसांत अर्ज केला आहे.`;

        if (allowedStr) {
          message += ` आपण फक्त '${allowedStr}' साठी अर्ज करू शकता. इतर सेवा मागील अर्जाची ७ दिवसांची मुदत पूर्ण झाल्यानंतर पुन्हा अर्ज करा.`;
        } else {
          message += ` कृपया ७ दिवसानंतर पुन्हा अर्ज करा.`;
        }

        return res.status(409).json({
          call: 0,
          message,
        });
      }

      // 5️⃣ No duplicates — insert new application
      const result = await HomeModel.addNewApplication(
        res.pool,
        newApplicationData,
      );

      if (result.insertId === 0) {
        return res
          .status(200)
          .json({ call: 0, message: "अर्ज जतन नाही झाला." });
      }

      return res.status(200).json({
        call: 1,
        id: result.insertId,
        message: "अर्ज यशस्वीरित्या जतन झाला.",
      });
    } catch (err) {
      console.error("Error in addNewApplication:", err);
      return res.status(500).json({
        call: 0,
        message: err?.message,
        error: err.message || err,
      });
    }
  },

  addNewMember: asyncHandler(async (req, res) => {
    const nagrikData = req.body;

    const userImage = req.files?.userImage;

    if (!userImage) {
      throw new AppError("नागरिकाचे छायाचित्र पाठवा.", 400);
    }

    //   check for duplicate members first based on aadhar only

    const existingRecordsByAadhar =
      await HomeModel.checkDuplicateMemberByAadharOnly(
        res.pool,
        nagrikData.fAadhar,
      );
    if (existingRecordsByAadhar.length > 0) {
      throw new AppError("हा आधार  क्रमांक तुम्ही आधीच वापरला आहे.", 400);
    }

    const existingRecordsByMobile =
      await HomeModel.checkDuplicateMemberByMobileOnly(
        res.pool,
        nagrikData.fMobile,
      );
    if (existingRecordsByMobile.length >= 2) {
      throw new AppError(
        "हा मोबाईल क्रमांक तुम्ही २ वेळा आधीच वापरला आहे.",
        400,
      );
    }

    const imageName = generateUniqueFileName(userImage, "nagrik-");

    const destPath = `${UPLOAD_PATHS.users.profile}/${imageName}`;

    await saveFile(userImage, destPath);
    req.filesToCleanup.push(destPath);

    nagrikData.image = imageName;

    nagrikData.createdAt = addCurrentTimeToDate(nagrikData.createdAt)

    await HomeModel.addNewMember(res.pool, nagrikData);

    //

    return sendApiResponse(res, 200, true, "नागरिक नोंदणी झाली.");
  }),

  getPeopleList: function (req, res) {
    var zpData = {};
    ZPModel.getZpDetails(res.pool)
      .then((result) => {
        zpData = result[0];
        return HomeModel.getGpPopleList(res.pool);
      })
      .then((result) => {
        res.render("user/kar_wasuli/gp_people_list.pug", {
          list: result,
          gp: zpData,
        });
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },
  gramPanchayeAhaval: function (req, res, next) {
    var zpData = {};
    ZPModel.getZpDetails(res.pool)
      .then((result) => {
        zpData = result[0];
        if (result.length == 0) {
          res.status(200).send({
            call: 0,
            message: "Invalid Application Details",
          });
        } else {
          res.render("user/gp-ahaval/ahaval.pug", {
            gp: zpData,
          });
        }
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },
  printApplication: function (req, res, next) {
    var data = Number(req.params.id);
    if (isNaN(data)) {
      res.status(200).send({
        call: 0,
        message: "Invalid Application Details",
      });
      return false;
    }
    var zpData = {};
    ZPModel.getZpDetails(res.pool)
      .then((result) => {
        zpData = result[0];
        return HomeModel.getNewApplicationPrint(res.pool, data);
      })
      .then((result) => {
        if (result.length == 0) {
          res.status(200).send({
            call: 0,
            message: "Invalid Application Details",
          });
          return;
        }
        console.log(result);
        let doc = JSON.parse(result[0].docDetails || "[]");
        let doc1 = doc[0];
        let doc2 = doc[1] ? doc[1] : null;
        res.render("user/print/pageNewApplicationPrint", {
          title: "अर्ज प्रत",
          data: result[0],
          doc1,
          doc2,
          doc,
          docs: doc,
          zp: zpData,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ call: error });
      });
  },
  getUserInfo: function (req, res, next) {
    const data = req.body;
    HomeModel.getUserInfo(res.pool, data)
      .then((result) => {
        res.status(200).send({ call: result });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ call: error });
      });
  },
  webNoticeView: function (req, res) {
    var gp = {};
    ZPModel.getZpDetails(res.pool)
      .then((result) => {
        gp = result[0];
        return HomeModel.getWebNoticeList(res.pool);
      })
      .then((result) => {
        res.render("user/notices/web_notices_list", {
          gp: gp,
          list: result,
        });
      })
      .catch((error) => {
        res.status(500).send({ call: error });
      });
  },
  webNoticeViewSaveMessage: function (req, res) {
    var data = req.body;
    HomeModel.saveNewWebNotice(res.pool, data)
      .then((result) => {
        res.status(200).send({ call: 1, data: result });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  webNoticeVisibility: function (req, res) {
    var v = Number(req.query.v);
    var id = Number(req.query.id);
    if (isNaN(v)) {
      res.redirect("/web-notice");
      return false;
    }
    if (isNaN(id)) {
      res.redirect("/web-notice");
      return false;
    }
    if (typeof v == "undefined") {
      res.redirect("/web-notice");
      return false;
    }
    if (typeof id == "undefined") {
      res.redirect("/web-notice");
      return false;
    }
    HomeModel.updateVisibilityWebNotice(res.pool, { v: v, id: id })
      .then((result) => {
        res.redirect("/web-notice");
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  removeWebNotice: function (req, res) {
    var id = Number(req.query.id);
    if (isNaN(id)) {
      res.redirect("/web-notice");
      return false;
    }
    if (isNaN(id)) {
      res.redirect("/web-notice");
      return false;
    }
    HomeModel.deleteWebNotice(res.pool, { id: id })
      .then((result) => {
        res.redirect("/web-notice");
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
};
module.exports = CandidateController;
