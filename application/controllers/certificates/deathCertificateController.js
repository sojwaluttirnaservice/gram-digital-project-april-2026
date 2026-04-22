const HomeModel = require("../../model/HomeModel");
const deathCertificateModel = require("../../model/certifcates/deathCertificateModel");
const { addCurrentTimeToDate } = require("../../utils/addCurrentTimeToDate");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");

const deathCertificateController = {
  renderDeathCertificatesPage: asyncHandler(async (req, res) => {
    const deathCertificates =
      await deathCertificateModel.fetchAllDeathCertificates(res.pool);
    renderPage(
      res,
      "user/certificates/death-certificate/death-certificate-page.pug",
      {
        deathCertificates,
      },
    );
  }),

  renderDeathCertificateForm: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/certificates/death-certificate/death-certificate-form.pug",
    );
  }),

  renderEditDeathCertificateForm: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [deathCertificate] =
      await deathCertificateModel.fetchDeathCertificateById(res.pool, id);

    renderPage(
      res,
      "user/certificates/death-certificate/edit-death-certificate-form.pug",
      {
        deathCertificate,
      },
    );
  }),

  renderDeathCertificatePrint: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [deathCertificate] =
      await deathCertificateModel.fetchDeathCertificateById(res.pool, id);
    renderPage(
      res,
      "user/certificates/death-certificate/death-certificate-print.pug",
      {
        deathCertificate,
      },
    );
  }),

  saveDeathCertificate: async (req, res) => {
    try {
      const data = req.body;

      let gpRegistrationDeathReportFile =
        req.files.gpRegistrationDeathReportFile;

      if (gpRegistrationDeathReportFile) {
        let fileName = generateUniqueFileName(
          gpRegistrationDeathReportFile,
          "d-",
        );
        let deathRegistrationDocsDir = `${baseDir}/uploads/docs/certificates/death/death-registration`;
        let isSaved = await saveFile(
          gpRegistrationDeathReportFile,
          `${deathRegistrationDocsDir}/${fileName}`,
        );
        data.gp_registration_death_report_file_name = fileName;
      }

      const deathCertificates =
        await deathCertificateModel.fetchDeathCertificateByAdhar(
          res.pool,
          data?.aadhar_of_deceased,
        );

      if (deathCertificates?.length) {
        return res.status(400).json({
          success: false,
          status: 400,
          data: {
            message: "Adhar Number already used",
          },
        });
      }


    //   const created_on = addCurrentTimeToDate(data.created_on)

      const _result = await deathCertificateModel.saveDeathCertificate(
        res.pool,
        data 
      );

      if (_result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          status: 200,
          data: {
            message: "Death certificate saved successfully",
          },
        });
      }
    } catch (err) {
      console.log(`Error while saving the death certificate: ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  updateDeathCertificate: async (req, res) => {
    try {
      // const id = req.params.id
      const data = req.body;

      let [existingCertificate] =
        await deathCertificateModel.fetchDeathCertificateById(
          res.pool,
          data.id,
        );

      let gpRegistrationDeathReportFile =
        req.files.gpRegistrationDeathReportFile;

      if (gpRegistrationDeathReportFile) {
        let fileName = generateUniqueFileName(
          gpRegistrationDeathReportFile,
          "d-",
        );
        let deathRegistrationDocsDir = `${baseDir}/uploads/docs/certificates/death/death-registration`;
        let isSaved = await saveFile(
          gpRegistrationDeathReportFile,
          `${deathRegistrationDocsDir}/${fileName}`,
        );
        data.gp_registration_death_report_file_name = fileName;

        // Removing old saved file
        if (existingCertificate.gp_registration_death_report_file_name) {
          await deleteFile(
            `${deathRegistrationDocsDir}/${existingCertificate.gp_registration_death_report_file_name}`,
          );
        }
      } else {
        data.gp_registration_death_report_file_name =
          existingCertificate.gp_registration_death_report_file_name;
      }

      const _result = await deathCertificateModel.updateDeathCertificate(
        res.pool,
        data,
      );

      if (_result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          status: 200,
          data: {
            message: "Death certificate updated successfully",
          },
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          data: {
            message: "Death certificate not found",
          },
        });
      }
    } catch (err) {
      console.log(`Error while updating the death certificate: ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  deleteDeathCertificate: async (req, res) => {
    try {
      const id = req.body.id;
      const _result = await deathCertificateModel.deleteDeathCertificate(
        res.pool,
        id,
      );

      if (_result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          status: 200,
          message: "Death certificate deleted successfully",
          data: {},
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "Death certificate not found",
          data: {},
        });
      }
    } catch (err) {
      console.log(`Error while deleting the death certificate: ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  fetchAllDeathCertificates: async (req, res) => {
    try {
      const _result = await deathCertificateModel.fetchAllDeathCertificates(
        res.pool,
      );

      return res.status(200).json({
        success: true,
        status: 200,
        data: _result,
      });
    } catch (err) {
      console.log(`Error while fetching all death certificates: ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  fetchDeathCertificatesByMonthYear: async (req, res) => {
    try {
      const { month, year } = req.params;
      const _result =
        await deathCertificateModel.fetchDeathCertificatesByMonthYear(
          res.pool,
          month,
          year,
        );

      return res.status(200).json({
        success: true,
        status: 200,
        data: _result,
      });
    } catch (err) {
      console.log(
        `Error while fetching death certificates by month and year: ${err}`,
      );
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  fetchDeathCertificateById: async (req, res) => {
    try {
      const id = req.params.id;
      const _result = await deathCertificateModel.fetchDeathCertificateById(
        res.pool,
        id,
      );

      if (_result.length > 0) {
        return res.status(200).json({
          success: true,
          status: 200,
          data: _result[0],
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          data: {
            message: "Death certificate not found",
          },
        });
      }
    } catch (err) {
      console.log(`Error while fetching the death certificate by ID: ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  fetchDeathCertificatesByName: async (req, res) => {
    try {
      const name = req.params.name;
      const _result = await deathCertificateModel.fetchDeathCertificatesByName(
        res.pool,
        name,
      );

      return res.status(200).json({
        success: true,
        status: 200,
        data: _result,
      });
    } catch (err) {
      console.log(`Error while fetching death certificates by name: ${err}`);
      return res.status(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  printDeathCertificate: asyncHandler(async (req, res) => {
    const [deathCertificate] =
      await deathCertificateModel.fetchDeathCertificateById(
        res.pool,
        req.params.id,
      );

    renderPage(
      res,
      "user/certificates/death-certificate/death-certificate-print.pug",
      {
        deathCertificate,
      },
    );
  }),

  printDeathCertificateRecords: asyncHandler(async (req, res) => {
     const { year } = req.query;
      // console.log(_gp);
      const deathCertificates =
        await deathCertificateModel.fetchAllDeathCertificates(res.pool, year); 

    renderPage(res,  "user/certificates/death-certificate/death-certificate-records-print.pug", {
       deathCertificates 
    })
  }),
};

module.exports = deathCertificateController;
