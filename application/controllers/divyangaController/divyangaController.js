const { myDate } = require("../../config/_responderSet");
const HomeModel = require("../../model/HomeModel");
const divyangaModel = require("../../model/divyanga/divyangaModel");
const fs = require("fs");
const path = require("path");
const util = require("util");
const CandidateController = require("../HomeController");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");
const { sendApiError, sendApiResponse } = require("../../utils/apiResponses");
const { deleteFile, saveFile } = require("../../utils/saveFile");

const divyangaController = {
  getDivyangRegistrationView: asyncHandler(async (req, res) => {
    let allRequiredData = await CandidateController.getCommonData(req, res);
    renderPage(res, "user/divyanga/divyanga-registration", allRequiredData);
  }),

  renderEditDivyangaApplicationPage: asyncHandler(async (req, res) => {
    let { applicationId: id } = req.params;

    let [divyangaApplication] = await divyangaModel.getById(res.pool, id);
    renderPage(res, "user/divyanga/divyanga-application-edit-page.pug", {
      title: "दिव्यांग अर्ज - Edit",
      divyangaApplication,
    });
  }),

  renderApprovedApplications: asyncHandler(async (req, res) => {
    let approvedApplications = await divyangaModel.getDivyangaApplicationsList(
      res.pool,
      1,
    );

    renderPage(res, "user/divyanga/divyanga-people-page", {
      approvedApplications,
    });
  }),

  getDivyangaApplicationsListView: asyncHandler(async (req, res) => {
    let pendingApplications = await divyangaModel.getDivyangaApplicationsList(
      res.pool,
      0,
    );
    let approvedApplications = await divyangaModel.getDivyangaApplicationsList(
      res.pool,
      1,
    );
    let rejectedApplications = await divyangaModel.getDivyangaApplicationsList(
      res.pool,
      -1,
    );

    renderPage(res, "user/divyanga/divyanga-applications-view.pug", {
      title: "दिव्यांग नोंदणी अर्ज यादी",
      pendingApplications,
      approvedApplications,
      rejectedApplications,
    });
  }),

  approveDivyangaApplication: async (req, res) => {
    const { id } = req.body;

    divyangaModel
      .approveDivyangaUserApplication(res.pool, id)
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

  rejectDivyangaApplication: async (req, res) => {
    const { id } = req.body;

    divyangaModel
      .rejectDivyangaUserApplication(res.pool, id)
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

  checkIfDivyangaUserAlreadyExists: async (req, res) => {
    let data = req.body;

    divyangaModel
      .checkIfDivyangaUserAlreadyExists(res.pool, data)
      .then((result) => {
        return res.status(200).json({
          call: 1,
          existingUserCount: result.length,
        });
      })
      .catch((err) => {
        console.log("Error while chekcing existing uesr", err);
        return res.status(500).json({
          call: 0,
          message: "Error while checking preexisting user",
          error: `Error: ${err}`,
        });
      });
  },

  registerNewDivyangaUser: async (req, res) => {
    let data = req.body;
    let userFile = req.files.user_profile_photo;
    let certificate_file = req.files.certificate_file;

    divyangaModel
      .registerNewDivyangaUser(res.pool, data)
      .then((result) => {
        if (result.affectedRows == 1 && result.insertId !== 0) {
          const uploadDir = path.join(
            "./public",
            "upload",
            "divyanga-user-photos",
          );

          const certificateDir = "./public/upload/divyanga-certificates";

          // Creating the directory if it doesn't exist
          if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
          }
          if (!fs.existsSync(certificateDir)) {
            fs.mkdirSync(certificateDir, { recursive: true });
          }
          let fileName = `divyaga-user-${result.insertId}.jpeg`;
          let imagePath = `./public/upload/divyanga-user-photos/${fileName}`;

          let certificateExtension = certificate_file.name.split(".").pop();
          let certificateName = `certificate-u-${result.insertId}.${certificateExtension}`;

          let certificatePath = `${certificateDir}/${certificateName}`;

          // Use the userFile.mv function to move the file in this folder
          userFile.mv(imagePath, function (err) {
            if (err) {
              console.error(err);
              return res.status(500).json({
                call: 0,
                message: "Internal server error",
              });
            } else {
              // Move the certificate_file
              certificate_file.mv(certificatePath, function (err) {
                if (err) {
                  console.error(err);
                  return res.status(500).json({
                    call: 0,
                    message: "Internal server error",
                  });
                } else {
                  // Call addFileUrl after both files are moved successfully
                  return divyangaModel
                    .addFileUrl(
                      res.pool,
                      imagePath,
                      certificateName,
                      result.insertId,
                    )
                    .then((addFileUrlsResult) => {
                      if (addFileUrlsResult.affectedRows === 1) {
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
                }
              });
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
        console.log(`Error while registering divyanga user : ${err}`);
        return res.status(500).json({
          call: 0,
          message: "Internal server error",
        });
      });
  },

  updateDivyangaUser: asyncHandler(async (req, res) => {
    const { id } = req.body;

    // 1. Get existing application
    const [application] = await divyangaModel.getById(res.pool, id);

    if (!application) {
      return sendApiResponse(res, 404, false, "Application not found");
    }

    // 2. Prepare base update data (NON-FILE)
    const updateData = {
      id,
      full_name: req.body.full_name,
      address: req.body.address,
      education: req.body.education,
      demand: req.body.demand,
      mobile: req.body.mobile,
      type_of_disability: req.body.type_of_disability,
      percentage_of_disability: req.body.percentage_of_disability,
      age: req.body.age,
      shera: req.body.shera,
      aadhar_number: req.body.aadhar_number,
      bank_name: req.body.bank_name,
      bank_ifsc_code: req.body.bank_ifsc_code,
      bank_account_number: req.body.bank_account_number,

      // default → keep old values
      user_image_pathurl: application.user_image_pathurl,
      certificate_file_name: application.certificate_file_name,
    };

    /** ----------------------------
     * PHOTO UPDATE (if sent)
     * -----------------------------*/
    if (req.files?.image) {
      const imageFile = req.files.image;
      const imageName = `divyaga-user-${id}.jpeg`;
      const imagePath = `./public/upload/divyanga-user-photos/${imageName}`;

      // delete old photo
      if (application.user_image_pathurl) {
        await deleteFile(application.user_image_pathurl);
      }

      const imageSaved = await saveFile(imageFile, imagePath);
      if (!imageSaved) {
        return sendApiError(res, 500, false, "Photo upload failed");
      }

      updateData.user_image_pathurl = imagePath;
    }

    /** ----------------------------
     * CERTIFICATE UPDATE (if sent)
     * -----------------------------*/
    if (req.files?.certificate_file) {
      const certificateFile = req.files.certificate_file;
      const ext = certificateFile.name.split(".").pop();
      const certificateName = `certificate-u-${id}.${ext}`;
      const certificatePath = `./public/upload/divyanga-certificates/${certificateName}`;

      // delete old certificate
      if (application.certificate_file_name) {
        await deleteFile(
          `./public/upload/divyanga-certificates/${application.certificate_file_name}`,
        );
      }

      const certSaved = await saveFile(certificateFile, certificatePath);
      if (!certSaved) {
        return sendApiError(res, 500, false, "Certificate upload failed");
      }

      updateData.certificate_file_name = certificateName;
    }

    // 3. Update DB
    const result = await divyangaModel.updateDivyangaUser(res.pool, updateData);

    if (result.affectedRows !== 1) {
      return sendApiError(res, 500, false, "Update failed");
    }

    return sendApiResponse(
      res,
      200,
      true,
      "Divyanga application updated successfully",
    );
  }),
};

module.exports = divyangaController;
