const birthCertificateModel = require("../../model/certifcates/birthCertificateModel");

const HomeModel = require("../../model/HomeModel");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { baseDir } = require("../createBaseDir");

const birthCertificateController = {
  renderBirthCertificatesPage: async (req, res) => {
    try {
      const data = req.body;

      const _gp = await HomeModel.getGpData(res.pool);
      const _birthCertificates =
        await birthCertificateModel.fetchAllBirthCertificates(res.pool);

      // console.log(_birthCertificates)

      res.render(
        "user/certificates/birth-certificate/birth-certificate-page.pug",
        {
          gp: _gp[0],
          birthCertificates: _birthCertificates,
        }
      );
    } catch (err) {
      console.log(`Error while showing the birth certificates page : ${err}`);
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
  renderBirthCertificateForm: async (req, res) => {
    try {
      const _gp = await HomeModel.getGpData(res.pool);
      res.render(
        "user/certificates/birth-certificate/birth-certificate-form.pug",
        {
          gp: _gp[0],
        }
      );
    } catch (err) {
      console.log(`Error while showing the birth certificate form : ${err}`);
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

  renderEditBirthCertificateForm: async (req, res) => {
    try {
      const { id } = req.params;
      const _gp = await HomeModel.getGpData(res.pool);
      const _birthCertificate =
        await birthCertificateModel.fetchBirthCertificateById(res.pool, id);

      console.log(_birthCertificate);
      res.render(
        "user/certificates/birth-certificate/edit-birth-certificate-form.pug",
        {
          birthCertificate: _birthCertificate[0],
          gp: _gp[0],
        }
      );
    } catch (err) {
      console.log(`Error while showing the birth certificate form : ${err}`);
      res.send(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },

  renderBirthCertificatePrint: async (req, res) => {
    try {
      const { id } = req.params;
      const _birthCertificate =
        await birthCertificateModel.fetchBirthCertificateById(res.pool, id);
      res.render(
        "user/certificates/birth-certificate/birth-certificate-print.pug",
        {
          birthCertificate: _birthCertificate[0],
        }
      );
    } catch (err) {
      console.log(`Error while showing the birth certificate form : ${err}`);
      res.send(500).json({
        success: false,
        status: 500,
        data: {
          error: err,
          message: "Internal Server Error",
        },
      });
    }
  },
  saveBirthCertificate: async (req, res) => {
    try {
      const data = req.body;


      let gpRegistrationBirthReportFile = req.files.gpRegistrationBirthReportFile

      if(gpRegistrationBirthReportFile){
        let fileName = generateUniqueFileName(gpRegistrationBirthReportFile, 'b-')
        let birthRegistrationDocsDir = `${baseDir}/uploads/docs/certificates/birth/birth-registration`;
        let isSaved = await saveFile(gpRegistrationBirthReportFile, `${birthRegistrationDocsDir}/${fileName}`)
        data.gp_registration_birth_report_file_name = fileName
      }

      const _result = await birthCertificateModel.saveBirthCertificate(
        res.pool,
        data
      );

      if (_result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          status: 200,
          data: {
            message: "Birth certificate saved successfully",
          },
        });
      }
    } catch (err) {
      console.log(`Error while saving the birth certificate: ${err}`);
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

  updateBirthCertificate: async (req, res) => {
    try {
      // const id = req.params.id
      const data = req.body;
    
      let [existingCertificate] = await birthCertificateModel.fetchBirthCertificateById(res.pool, data.id)

      let gpRegistrationBirthReportFile = req.files.gpRegistrationBirthReportFile

      if(gpRegistrationBirthReportFile){
        let fileName = generateUniqueFileName(gpRegistrationBirthReportFile, 'b-')
        let birthRegistrationDocsDir = `${baseDir}/uploads/docs/certificates/birth/birth-registration`;
        let isSaved = await saveFile(gpRegistrationBirthReportFile, `${birthRegistrationDocsDir}/${fileName}`)
        data.gp_registration_birth_report_file_name = fileName

        // Removing old saved file
        if(existingCertificate.gp_registration_death_report_file_name){
            await deleteFile(`${birthRegistrationDocsDir}/${existingCertificate.gp_registration_birth_report_file_name}`)
        }
      }else{
        data.gp_registration_birth_report_file_name = existingCertificate.gp_registration_death_report_file_name
      }

      const _result = await birthCertificateModel.updateBirthCertificate(
        res.pool,
        data
      );

      if (_result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          status: 200,
          data: {
            message: "Birth certificate updated successfully",
          },
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
          data: {
            message: "Birth certificate not found",
          },
        });
      }
    } catch (err) {
      console.log(`Error while updating the birth certificate: ${err}`);
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

  deleteBirthCertificate: async (req, res) => {
    try {
      const { id } = req.body;
      const _result = await birthCertificateModel.deleteBirthCertificate(
        res.pool,
        id
      );

      if (_result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          status: 200,
		  message: "Birth certificate deleted successfully",
          data: {
          },
        });
      } else {
        return res.status(404).json({
          success: false,
          status: 404,
		  message: "Birth certificate not found",
          data: {
          },
        });
      }
    } catch (err) {
      console.log(`Error while deleting the birth certificate: ${err}`);
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

  fetchAllBirthCertificates: async (req, res) => {
    try {
      const _result = await birthCertificateModel.fetchAllBirthCertificates(
        res.pool
      );

      return res.status(200).json({
        success: true,
        status: 200,
        data: _result,
      });
    } catch (err) {
      console.log(`Error while fetching all birth certificates: ${err}`);
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

  fetchBirthCertificatesByMonthYear: async (req, res) => {
    try {
      const { month, year } = req.params;
      const _result =
        await birthCertificateModel.fetchBirthCertificatesByMonthYear(
          res.pool,
          month,
          year
        );

      return res.status(200).json({
        success: true,
        status: 200,
        data: _result,
      });
    } catch (err) {
      console.log(
        `Error while fetching birth certificates by month and year: ${err}`
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

  fetchBirthCertificateById: async (req, res) => {
    try {
      const id = req.params.id;
      const _result = await birthCertificateModel.fetchBirthCertificateById(
        res.pool,
        id
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
            message: "Birth certificate not found",
          },
        });
      }
    } catch (err) {
      console.log(`Error while fetching the birth certificate by ID: ${err}`);
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

  fetchBirthCertificatesByName: async (req, res) => {
    try {
      const name = req.params.name;
      const _result = await birthCertificateModel.fetchBirthCertificatesByName(
        res.pool,
        name
      );

      return res.status(200).json({
        success: true,
        status: 200,
        data: _result,
      });
    } catch (err) {
      console.log(`Error while fetching birth certificates by name: ${err}`);
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

  printBirthCertificate: async (req, res) => {
    try {
      const _gp = await HomeModel.getGpData(res.pool);
      console.log(_gp);
      const _birthCertificate =
        await birthCertificateModel.fetchBirthCertificateById(
          res.pool,
          req.params.id
        );
      res.render(
        "user/certificates/birth-certificate/birth-certificate-print.pug",
        {
          birthCertificate: _birthCertificate[0],
          gp: _gp[0],
        }
      );
    } catch (err) {
      console.log(`Error while rendering the the print page : ${err}`);
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
  
  printBirthCertificateRecords: async (req, res) => {
    try {
      const _gp = await HomeModel.getGpData(res.pool);
      const { year } = req.query;
      // console.log(_gp);
      const _birthCertificates =
        await birthCertificateModel.fetchAllBirthCertificates(res.pool, year);
      res.render(
        "user/certificates/birth-certificate/birth-certificate-records-print.pug"	,
        {
          birthCertificates: _birthCertificates,
          gp: _gp[0],
          year
        }
      );
    } catch (err) {
      console.log(`Error while rendering the the print page : ${err}`);
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
};

module.exports = birthCertificateController;
