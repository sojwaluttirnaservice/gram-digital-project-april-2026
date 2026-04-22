let MarriageModel = require("../model/MarriageModel");
let HomeModel = require("../model/HomeModel");
var responderSet = require("../config/_responderSet");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");
const { sendApiResponse } = require("../utils/apiResponses");
const {
  birthCertificateEvidences,
  identityProofs,
  addressProofs,
} = require("../data/marriageCertificate");
const generateUniqueFileName = require("../utils/generateFileName");
const { saveFile, deleteFile } = require("../utils/saveFile");
const { baseDir } = require("./createBaseDir");
let myDates = responderSet.myDate;

let MarriageController = {
  allList: asyncHandler(async (req, res) => {
    let marriageRegistrationList = await MarriageModel.getMarriageList(
      res.pool,
    );
    renderPage(res, "user/marriage/marriage-registration-list", {
      marriageRegistrationList,
    });
  }),

  addNewEntryView: function (req, res, next) {
    renderPage(res, "user/marriage/add_new_entry");
  },

  renderMarriageFormPage: asyncHandler(async (req, res) => {
    renderPage(res, "user/marriage/marriage-registration-form-page.pug", {
      birthCertificateEvidences,
      identityProofs,
      addressProofs,
    });
  }),

  saveNewEntryView: function (req, res, next) {
    var data = req.body;
    console.log(data, "save marriage details data");
    var fileOne = req.files.file1;
    var fileTwo = req.files.file2;
    console.log(__dirname);
    var currentTime = myDates.getTimeStamp();
    var file1_name = currentTime + "_h.jpeg";
    var file2_name = currentTime + "_w.jpeg";

    data["image_h"] = "";
    data["image_w"] = "";
    MarriageModel.saveNewEntryView(res.pool, data)
      .then((result) => {
        if (result.insertId == 0) {
          res.status(500).send({ call: 0 });
          return 999;
        } else {
          file1_name = result.insertId + "_h.jpeg";
          file2_name = result.insertId + "_w.jpeg";
          fileOne.mv("./public/upload/" + file1_name, function (error) {
            if (error) {
              res.status(500).send({ call: 0, data: error });
              return 999;
            } else {
              fileTwo.mv("./public/upload/" + file2_name, function (error) {
                if (error) {
                  res.status(500).send({ call: 0, data: error });
                  return 999;
                } else {
                  var updateData = {};
                  updateData["image_h"] = file1_name;
                  updateData["image_w"] = file2_name;
                  updateData["id"] = result.insertId;
                  return MarriageModel.updateEntryView(res.pool, updateData);
                }
              });
            }
          });
          //result.insertId
        }
      })
      .then((result) => {
        if (result !== 999) {
          res.status(200).send({ call: 1 });
        }
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },

  editMarriage: asyncHandler(async (req, res) => {
    let { id } = req.params;
    const [marriageData] = await MarriageModel.getMarriageDetail(res.pool, id);
    renderPage(res, "user/marriage/edit_marriage_entry", {
      marriageData,
    });
  }),

  updateEditMarriage: function (req, res, next) {
    let data = req.body;
    console.log(data, "updated data here");
    console.log(req.files != null);
    if (req.files != null) {
      let file1 = req.files.file1;
      if (file1 != undefined) {
        let file1_name = data.id + "_h.jpeg";
        file1.mv("./public/upload/" + file1_name, function (error) {
          if (error) {
            res.status(500).send({ call: 0, data: error });
          } else {
            MarriageModel.updateMarriageEntry(res.pool, data)
              .then((result) => {
                console.log(result);
                if (result.affectedRows == 1) {
                  res.status(201).send({ call: 1 });
                }
              })
              .catch((err) => console.log(err));
          }
        });
      }
      let file2 = req.files.file2;
      if (file2 != undefined) {
        let file1_name = data.id + "_w.jpeg";
        file2.mv("./public/upload/" + file1_name, function (error) {
          if (error) {
            res.status(500).send({ call: 0, data: error });
          } else {
            MarriageModel.updateMarriageEntry(res.pool, data)
              .then((result) => {
                console.log(result);
                if (result.affectedRows == 1) {
                  return res.status(201).send({ call: 1 });
                }
              })
              .catch((err) => console.log(err));
          }
        });
      }
    } else {
      MarriageModel.updateMarriageEntry(res.pool, data)
        .then((result) => {
          console.log(result);
          if (result.affectedRows == 1) {
            res.status(201).send({ call: 1 });
          }
        })
        .catch((err) => console.log(err));
    }
  },

  //   removeMarriage: async (req, res) => {
  //     try {
  //       let data = req.body;
  //       await MarriageModel.removeMarriage(res.pool, data);
  //       return res.status(200).send({ call: 1 });
  //     } catch (err) {
  //       console.error("Error:", err);
  //       return res.status(500).send({ call: 0, data: err });
  //     }
  //   },

  removeMarriage: async (req, res) => {
    try {
      const { id } = req.body;

      if (!id) {
        return res
          .status(400)
          .send({ call: 0, message: "Marriage ID is required" });
      }

      // 1️⃣ Get marriage detail
      const marriageDetail = await MarriageModel.getMarriageDetail(
        res.pool,
        id,
      );

      if (!marriageDetail || marriageDetail.length === 0) {
        return res
          .status(404)
          .send({ call: 0, message: "Marriage record not found" });
      }

      const detail = marriageDetail[0];

      const marriageDocDir = `${baseDir}/uploads/docs/marriage`;
      const marriageImageDir = `${baseDir}/uploads/images/marriage`;
      const uploadDir = `${baseDir}/upload`;

      // ================================
      // 2️⃣ Delete Husband & Wife Photos
      // ================================
      const imageFiles = [detail.image_h, detail.image_w];

      for (const fileName of imageFiles) {
        if (!fileName) continue;

        const fullPath = `${uploadDir}/${fileName}`;

        console.log("==============");
        console.log(fullPath);
        console.log("==============");
        await deleteFile(fullPath);
      }

      // ================================
      // 3️⃣ Delete Wedding Photos (IMAGE FOLDER)
      // ================================
      if (detail.marriageWeddingPhotos) {
        const photosData = detail.marriageWeddingPhotos;

        if (Array.isArray(photosData)) {
          for (const photo of photosData) {
            await deleteFile(`${marriageImageDir}/${photo}`);
          }
        } else if (typeof photosData === "string") {
          if (photosData.trim().startsWith("[")) {
            try {
              const parsed = JSON.parse(photosData);
              if (Array.isArray(parsed)) {
                for (const photo of parsed) {
                  console.log("**********");
                  console.log(`${marriageImageDir}/${photo}`);
                  console.log("***********");
                  await deleteFile(`${marriageImageDir}/${photo}`);
                }
              }
            } catch (e) {
              console.error("Wedding photo parse failed:", e);
            }
          } else {
            await deleteFile(`${marriageImageDir}/${photosData}`);
          }
        }
      }

      // ================================
      // 4️⃣ Delete All Marriage Documents
      // ================================
      const docFiles = [
        detail.marriageWeddingCertificateFile,
        detail.marriageWeddingCardFile,
        detail.marriageHusbandBirthProofFile,
        detail.marriageHusbandIdProofFile,
        detail.marriageHusbandAddressProofFile,
        detail.marriageWifeBirthProofFile,
        detail.marriageWifeIdProofFile,
        detail.marriageWifeAddressProofFile,
      ];

      for (const fileName of docFiles) {
        if (!fileName) continue;
        await deleteFile(`${marriageDocDir}/${fileName}`);
      }

      // ================================
      // 5️⃣ Delete Witness Files
      // ================================
      if (detail.witnesses_details) {
        const witnessData = detail.witnesses_details;

        console.log(witnessData);

        //   if (typeof witnessData === "string" && witnessData.trim().startsWith("[")) {
        try {
          //   const witnesses = JSON.parse(witnessData);

          const witnesses = witnessData;
          if (Array.isArray(witnesses)) {
            for (const w of witnesses) {
              if (w.photo) {
                console.log("witnessing");
                console.log(`${marriageDocDir}/${w.photo}`);
                console.log("witnessing");
                await deleteFile(`${marriageDocDir}/${w.photo}`);
              }
              if (w.idUpload) {
                await deleteFile(`${marriageDocDir}/${w.idUpload}`);
              }
            }
          }
        } catch (e) {
          console.error("Witness parse failed:", e);
        }
      }
      // }

      // ================================
      // 6️⃣ Remove DB Record
      // ================================
      await MarriageModel.removeMarriage(res.pool, { id });

      return res.status(200).send({ call: 1 });
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send({ call: 0, data: err });
    }
  },

  renderMarriageRegisterReport: asyncHandler(async (req, res) => {
    const { month, year } = req.query;

    const marriageList = await MarriageModel.getMarriageListByRegistrationDate(
      res.pool,
      {
        month,
        year,
      },
    );
    renderPage(res, "user/marriage/marriage-register-report-print.pug", {
      marriageList,
      month,
      year,
    });
  }),

  saveMarriageRegistrationApplication: asyncHandler(async (req, res) => {
    const data = req.body;
    const files = req.files || {};

    console.log("FILES RECEIVED =>", files);

    const marriageImageDir = `${baseDir}/uploads/images/marriage`;
    const marriageDocDir = `${baseDir}/uploads/docs/marriage`;

    // ===============================
    // Helpers (EXPRESS-FILEUPLOAD SAFE)
    // ===============================

    const saveSingleFile = async (fileObj, prefix, directory) => {
      if (!fileObj) return "";

      const fileName = generateUniqueFileName(fileObj, prefix);
      const filePath = `${directory}/${fileName}`;

      const isSaved = await saveFile(fileObj, filePath);
      if (!isSaved) throw new Error("File saving failed");

      console.log("filename is ", fileName);
      return fileName;
    };

    const saveMultipleFiles = async (fileInput, prefix, directory) => {
      if (!fileInput) return [];

      // express-fileupload returns object if single file, array if multiple
      const fileArray = Array.isArray(fileInput) ? fileInput : [fileInput];

      const savedFiles = [];

      for (let file of fileArray) {
        const fileName = generateUniqueFileName(file, prefix);
        const filePath = `${directory}/${fileName}`;

        const isSaved = await saveFile(file, filePath);
        if (!isSaved) throw new Error("Multiple file saving failed");

        savedFiles.push(fileName);
      }

      return savedFiles;
    };

    // ===============================
    // 1️⃣ Save Wedding Photos
    // ===============================

    const weddingPhotos = await saveMultipleFiles(
      files.marriageWeddingPhotos,
      "marriage-photo-",
      marriageImageDir,
    );

    console.log("-------")
    console.log(weddingPhotos)
    console.log('------')

    if (weddingPhotos.length < 2 || weddingPhotos.length > 3) {
      return sendApiResponse(
        res,
        400,
        false,
        "२ ते ३ लग्नाचे फोटो आवश्यक आहेत.",
      );
    }

    // ===============================
    // 2️⃣ Save Husband Documents
    // ===============================

    const husbandBirthProofFile = await saveSingleFile(
      files.marriageHusbandBirthProofFile,
      "husband-birth-",
      marriageDocDir,
    );

    const husbandIdProofFile = await saveSingleFile(
      files.marriageHusbandIdProofFile,
      "husband-id-",
      marriageDocDir,
    );

    const husbandAddressProofFile = await saveSingleFile(
      files.marriageHusbandAddressProofFile,
      "husband-address-",
      marriageDocDir,
    );

    // ===============================
    // 3️⃣ Save Wife Documents
    // ===============================

    const wifeBirthProofFile = await saveSingleFile(
      files.marriageWifeBirthProofFile,
      "wife-birth-",
      marriageDocDir,
    );

    const wifeIdProofFile = await saveSingleFile(
      files.marriageWifeIdProofFile,
      "wife-id-",
      marriageDocDir,
    );

    const wifeAddressProofFile = await saveSingleFile(
      files.marriageWifeAddressProofFile,
      "wife-address-",
      marriageDocDir,
    );

    // ===============================
    // 4️⃣ Witness Handling
    // ===============================

    const witnesses = [];

    for (let i = 1; i <= 3; i++) {
      if (data[`witness_name_${i}`]) {
        const witnessPhotoName = await saveSingleFile(
          files[`witness_photo_${i}`],
          "witness-photo",
          marriageDocDir,
        );

        const witnessIdUploadName = await saveSingleFile(
          files[`witness_id_upload_${i}`],
          "witness-id",
          marriageDocDir,
        );

        witnesses.push({
          name: data[`witness_name_${i}`],
          mobile: data[`witness_mobile_${i}`],
          aadhar: data[`witness_aadhar_${i}`],
          address: data[`witness_address_${i}`],
          idType: data[`witness_id_type_${i}`],
          photo: witnessPhotoName, // ✅ already filename
          idUpload: witnessIdUploadName, // ✅ already filename
        });
      }
    }

    if (witnesses.length < 2) {
      return sendApiResponse(res, 400, false, "किमान २ साक्षीदार आवश्यक आहेत.");
    }

    // ===============================
    // 1️⃣.1 Save Optional Marriage Certificate & Card
    // ===============================

    const marriageWeddingCertificateFile = await saveSingleFile(
      files.marriageWeddingCertificateFile,
      "marriage-certificate-",
      marriageDocDir,
    );

    const marriageWeddingCardFile = await saveSingleFile(
      files.marriageWeddingCardFile,
      "marriage-card-",
      marriageDocDir,
    );

    // ===============================
    // 5️⃣ Insert DB (Without Photos)
    // ===============================

    const payload = {
      ...data,

      marriageWeddingCertificateFile,
      marriageWeddingCardFile,
      marriageWeddingPhotos: weddingPhotos,
      marriageHusbandBirthProofFile: husbandBirthProofFile,
      marriageHusbandIdProofFile: husbandIdProofFile,
      marriageHusbandAddressProofFile: husbandAddressProofFile,
      marriageWifeBirthProofFile: wifeBirthProofFile,
      marriageWifeIdProofFile: wifeIdProofFile,
      marriageWifeAddressProofFile: wifeAddressProofFile,

      witnesses_details: witnesses,

      image_h: "",
      image_w: "",

      application_mode: "ONLINE",
      application_status: "PENDING",
    };

    const { insertId } =
      await MarriageModel.saveMarriageRegistrationApplication(
        res.pool,
        payload,
      );

    console.log("INSERT ID =>", insertId);

    // ===============================
    // 6️⃣ Save Husband & Wife Photos (LEGACY PATH)
    // ===============================

    let image_h = "";
    let image_w = "";

    if (files.image_h) {
      image_h = `${insertId}_h.jpeg`;
      await saveFile(files.image_h, `${baseDir}/upload/${image_h}`);
    }

    if (files.image_w) {
      image_w = `${insertId}_w.jpeg`;
      await saveFile(files.image_w, `${baseDir}/upload/${image_w}`);
    }

    // ===============================
    // 7️⃣ Update Entry With Photos
    // ===============================

    await MarriageModel.updateEntryView(res.pool, {
      id: insertId,
      image_h,
      image_w,
    });

    // ===============================
    // 8️⃣ Final Response
    // ===============================

    return sendApiResponse(res, 201, true, "विवाह नोंदणी अर्ज जतन झाला.", {
      applicationId: insertId,
    });
  }),

  renderMarriageListPage: asyncHandler(async (req, res) => {
    const { status = "pending", sort = "asc" } = req.query;

    const marriageList = await MarriageModel.list(res.pool, { status });

    console.log(marriageList);

    renderPage(
      res,
      "user/marriage/marriage-registration-applications-list-page.pug",
      {
        title: "विवाह नोंदणी यादी",
        marriageList,
        status,
        sort,
      },
    );
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const updatedStatusData = req.body;
    await MarriageModel.updateStatus(res.pool, updatedStatusData);

    return sendApiResponse(res, 200, true, "अर्जाचे स्टेटस अपडेट झाले.");
  }),
};
module.exports = MarriageController;
