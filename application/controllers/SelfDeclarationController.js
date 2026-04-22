let SelfDeclarationModal = require("../model/SelfDeclarationModal");
let HomeModel = require("../model/HomeModel");
var responderSet = require("../config/_responderSet");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");
const qrCodeModel = require("../model/qrCode/qrCodeModel");
const certificateSubjects = require("../data/certificatesSubjects");
const { sendApiResponse, sendApiError } = require("../utils/apiResponses");
const { saveFile } = require("../utils/saveFile");
const { UPLOAD_PATHS } = require("../config/uploadPaths");
const generateUniqueFileName = require("../utils/generateFileName");
let myDates = responderSet.myDate;

const applicationPageMap = {
  // 1. बेरोजगार प्रमाणपत्र
  बेरोजगार_प्रमाणपत्र: "unemployment-self-declaration",

  // 2. रहिवासी प्रमाणपत्र
  रहिवासी_प्रमाणपत्र: "residential-self-declaration",

  // 3. वर्तवणूक प्रमाणपत्र
  वर्तवणूक_प्रमाणपत्र: "behavior-self-declaration",

  // 4. वीज जोडणी ना हरकत
  वीज_जोडणी_ना_हरकत: "electricity-noc-self-declaration",

  // 5. विभक्त कुटुंब प्रमाणपत्र
  विभक्त_कुटुंब_प्रमाणपत्र: "nuclear-family-self-declaration",

  // 6. व्यवसाय ना हरकत
  व्यवसाय_ना_हरकत: "occupation-noc-self-declaration",

  // 7. शौचालय प्रमाणपत्र
  शौचालय_प्रमाणपत्र: "toilet-self-declaration",

  // 8. हयातीचे प्रमाणपत्र
  हयाती_प्रमाणपत्र: "life-self-declaration",

  // 9. योजना लाभ नसल्याचे प्रमाणपत्र
  योजना_लाभ_नसल्याचे_प्रमाणपत्र: "non-availment-self-declaration",

  // 10. पाणी जोडणी ना हरकत
  पाणी_जोडणी_ना_हरकत: "water-noc-self-declaration",

  // 11. विधवा स्वयंघोषण पत्र
  विधवा_प्रमाणपत्र: "widow-self-declaration",

  // 12. परित्यक्ता असल्याचा स्वयंघोषणा पत्र
  परित्यक्ता_प्रमाणपत्र: "deserted-self-declaration",

  // 13. नाव बदल स्वयंघोषणा पत्र
  नाव_बदल_प्रमाणपत्र: "name-change-self-declaration",

  // 14. घरकुलसाठी स्वयंघोषणा पत्र
  घरकुल_योजना: "housing-self-declaration",

  // 15. नोकरी नसल्याबाबत स्वयंघोषणा पत्र
  //   नोकरी_नसल्याचा_दाखला: "jobless-self-declaration",
};

const handleCommonSelfDeclarationUploads = async ({
  body,
  files,
  uploadPaths,
}) => {
  // -------------------------
  // SIGNATURE
  // -------------------------
  let applicantSignatureFileName = null;

  if (files.applicantSign) {
    applicantSignatureFileName = generateUniqueFileName(
      files.applicantSign,
      "signature-",
    );

    await saveFile(
      files.applicantSign,
      `${uploadPaths.signatures}/${applicantSignatureFileName}`,
    );
  }

  // -------------------------
  // APPLICANT PHOTO
  // -------------------------
  let applicantPhotoFileName = null;

  if (files.applicantPhoto) {
    applicantPhotoFileName = generateUniqueFileName(
      files.applicantPhoto,
      "photo-",
    );

    await saveFile(
      files.applicantPhoto,
      `${uploadPaths.applicantPhotos}/${applicantPhotoFileName}`,
    );
  }

  // -------------------------
  // DOCUMENTS
  // -------------------------
  let documents = [];

  try {
    documents = JSON.parse(body.documents || "[]");
  } catch (err) {
    throw new Error("INVALID_DOCUMENTS");
  }

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    const fileKey = `document_file_${i}`;

    if (files[fileKey]) {
      const file = files[fileKey];

      const fileName = generateUniqueFileName(
        file,
        `self-declaration-doc-${i}-`,
      );

      await saveFile(file, `${uploadPaths.documents}/${fileName}`);

      doc.document_saved_name = fileName;
      doc.document_original_name = file.name;
      doc.document_saved_path = `${uploadPaths.documents}/${fileName}`;
    } else {
      doc.document_saved_name = null;
      doc.document_saved_path = null;
    }
  }

  return {
    applicantSignatureFileName,
    applicantPhotoFileName,
    documents,
  };
};

let SelfDeclarationController = {
  getList: asyncHandler(async (req, res) => {
    let { cert } = req.query;
    // cert = "बेरोजगार_प्रमाणपत्र"
    let list = await SelfDeclarationModal.getMainList(res.pool, cert);

    renderPage(res, "user/self_declaration/sd_list", {
      title: "स्वयं घोषणापत्र",
      list,
      json_list: JSON.stringify(list),
      certificateSubjects: certificateSubjects,
      cert: cert ? cert : "",
    });
  }),

  getListByCertificates: asyncHandler(async (req, res) => {
    let { type } = req.query;

    let selfDeclarations = [];
    if (type === "yearToYear") {
      let { fromYear, toYear } = req.query;
      selfDeclarations = await SelfDeclarationModal.getMainListByCertificates(
        res.pool,
        fromYear,
        toYear,
      );
    } else if (type === "monthToMonth") {
      let { month, year } = req.query;
      selfDeclarations =
        await SelfDeclarationModal.getMainListByCertificatesByMonthYear(
          res.pool,
          month,
          year,
        );
    }
    renderPage(res, "user/self_declaration/sd-list-report-page.pug", {
      title: "स्वयंघोषणा पत्र अहवाल",
      selfDeclarations,
    });
  }),

  addNewSelfDeclarationView: asyncHandler(async (req, res) => {
    const [qrCodes] = await qrCodeModel.qrCodeList(res.pool);

    renderPage(res, "user/self_declaration/add_new_self_declaration", {
      qrCodes: qrCodes || {},
      certificateSubjects: certificateSubjects,
    });
  }),

  renderSelfDeclarationFormPage: asyncHandler(async (req, res) => {
    let { cert } = req.query;

    console.log(cert);
    const page = applicationPageMap[cert];
    if (!page) {
      return res.status(404).render("errors/404", {
        message: "Invalid certificate type",
      });
    }

    let certificateSubject = certificateSubjects.find(
      (c) => c.subject_code == cert,
    );

    renderPage(
      res,
      `user/self_declaration/form/${applicationPageMap[cert]}.pug`,
      {
        title: cert?.split("_").join(" "),
        certificateSubject,
        cert,
      },
    );
  }),

  renderSelfDeclarationPrintPage: asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [selfDeclaration] = await SelfDeclarationModal.getById(res.pool, id);

    if (!selfDeclaration) {
      return sendApiError(res, 404, false, "No certificate Found");
    }

    const page = applicationPageMap[selfDeclaration.certificateType];
    renderPage(res, `user/self_declaration/print/${page}-print-page.pug`, {
      title: selfDeclaration.certificateType?.split("_").join(" "),
      selfDeclaration,
      certificate: selfDeclaration?.certificateType?.split("_").join(" "),
    });
  }),

  addNewSelfDeclaration: function (req, res, next) {
    var data = req.body;
    var fileOne = req.files.file1;
    var currentTime = myDates.getTimeStamp();
    var file1_name =
      currentTime + "_" + Math.floor(Math.random() * 1000) + ".jpeg";
    data["file_name"] = file1_name;
    fileOne.mv("./public/self_declaration/" + file1_name, function (error) {
      if (error) {
        // console.log("Error in svayam ghoshanparatra = ", error)
        res.status(500).send({ call: 0, data: error });
        return 999;
      } else {
        SelfDeclarationModal.addNewSelfDeclaration(res.pool, data)
          .then((result) => {
            res.status(200).send({ call: 1, data: result });
          })
          .catch((error) => {
            // console.log("Errror is that ", error)
            res.status(500).send({ call: 0, data: error });
          });
      }
    });
  },

  //   new one being used by me
  /*
  saveUnemploymentSelfDeclaration: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    if (!body.certificateType) {
      return sendApiError(res, 400, false, "प्रमाणपत्र प्रकार आवश्यक आहे.");
    }

    let common;

    try {
      common = await handleCommonSelfDeclarationUploads({
        body,
        files,
        uploadPaths: UPLOAD_PATHS.selfDeclarationCertificates,
      });
    } catch (err) {
      if (err.message === "INVALID_DOCUMENTS") {
        return sendApiError(res, 400, false, "कागदपत्रांची माहिती अयोग्य आहे.");
      }
      throw err;
    }

    const data = {
      ...body,
      applicantSignature: common.applicantSignatureFileName,
      file_name: common.applicantPhotoFileName,
      documents: common.documents,
      create_date: myDates.getDate(),
      create_time: myDates.getTime(),
    };

    const { insertId } =
      await SelfDeclarationModal.saveUnemploymentSelfDeclaration(
        res.pool,
        data,
      );

    return sendApiResponse(
      res,
      201,
      true,
      "स्वयं घोषणापत्र यशस्वीरीत्या जतन झाले.",
      { applicationId: insertId },
    );
  }),

  saveResidentialSelfDeclaration: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    if (!body.certificateType) {
      return sendApiError(res, 400, false, "प्रमाणपत्र प्रकार आवश्यक आहे.");
    }

    let common;

    try {
      common = await handleCommonSelfDeclarationUploads({
        body,
        files,
        uploadPaths: UPLOAD_PATHS.selfDeclarationCertificates,
      });
    } catch (err) {
      if (err.message === "INVALID_DOCUMENTS") {
        return sendApiError(res, 400, false, "कागदपत्रांची माहिती अयोग्य आहे.");
      }
      throw err;
    }

    const data = {
      ...body,
      applicantSignature: common.applicantSignatureFileName,
      file_name: common.applicantPhotoFileName,
      documents: common.documents,
      create_date: myDates.getDate(),
      create_time: myDates.getTime(),
    };

    const { insertId } =
      await SelfDeclarationModal.saveResidentialSelfDeclaration(res.pool, data);

    return sendApiResponse(
      res,
      201,
      true,
      "स्वयं घोषणापत्र यशस्वीरीत्या जतन झाले.",
      { applicationId: insertId },
    );
  }),
  */

  //  The new function i am using
  saveSelfDeclaration: asyncHandler(async (req, res) => {
    const body = req.body;
    const files = req.files || {};

    if (!body.certificateType) {
      return sendApiError(res, 400, false, "प्रमाणपत्र प्रकार आवश्यक आहे.");
    }

    let common;
    try {
      common = await handleCommonSelfDeclarationUploads({
        body,
        files,
        uploadPaths: UPLOAD_PATHS.selfDeclarationCertificates,
      });
    } catch (err) {
      if (err.message === "INVALID_DOCUMENTS") {
        return sendApiError(res, 400, false, "कागदपत्रांची माहिती अयोग्य आहे.");
      }
      throw err;
    }

    const data = {
      ...body,
      applicantSignature: common.applicantSignatureFileName,
      file_name: common.applicantPhotoFileName,
      documents: common.documents,
      create_date: myDates.getDate(),
      create_time: myDates.getTime(),
    };

    const { insertId } = await SelfDeclarationModal.insertSelfDeclaration(
      res.pool,
      data,
    );

    return sendApiResponse(
      res,
      201,
      true,
      "स्वयं घोषणापत्र यशस्वीरीत्या जतन झाले.",
      { applicationId: insertId },
    );
  }),

  deleteSelfDeclaration: function (req, res) {
    let id = req.params;

    SelfDeclarationModal.deleteSelfDeclaration(res.pool, id)
      .then((result) => {
        console.log(result, "delete result-----------");
        return res.status(200).json({
          call: 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
        });
      });
  },
};
module.exports = SelfDeclarationController;
