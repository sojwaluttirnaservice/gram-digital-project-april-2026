let CertificateModel = require("../model/CertificateModel");
let HomeModel = require("../model/HomeModel");
var responderSet = require("../config/_responderSet");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");
const runInTransaction = require("../utils/runInTransaction");
const paymentModel = require("../model/payment-model/paymentModel");
let myDates = responderSet.myDate;

let CertificateController = {
  allList: asyncHandler(async (req, res) => {
    const list = await CertificateModel.getMarriageList(res.pool);
    renderPage(res, "user/certificate/c_list", {
      list,
    });
  }),

  addNewEntryView: asyncHandler(async (req, res) => {
    renderPage(res, "user/certificate/add_new_entry.pug");
  }),

  saveNewThakbakiNiradharEntry: function (req, res, next) {
    var data = req.body;

    console.log("saving this herere")
    // saving new thakbaki certificate
    CertificateModel.saveNewEntryView(res.pool, data)
      .then((result) => {
        if (result.affectedRows === 0) {
          throw new Error("Details not saved.");
        }
        res.status(200).send({ call: 1, certificateId: result.insertId });
      })
      .catch((error) => {
        console.log("erRROR WHIE Saving new detail", error);
        res.status(500).send({ call: 0, data: error });
      });
  },

//   saveNewThakbakiNiradharEntry: asyncHandler(async (req, res) => {
      
//     const {certificateData, paymentData} = req.body;

//     await runInTransaction(req, async(conn) =>{

//         const {insertId: ps_payment_information_id_fk} = await paymentModel.savePaymentDetails(conn, paymentData)

//         await CertificateModel.saveNewEntryView(conn, {
//             ...certificateData,
//             ps_payment_information_id_fk
//         })
//     })
//   }),

  updateCertificateData: async function (req, res) {
    let data = req.body;

    let response = await CertificateModel.updateCertificateData(res.pool, data);
    console.log(response);
    if (response.affectedRows === 1) {
      res.status(201).json({
        call: 1,
      });
    }
  },

  removeCertificate: function (req, res, next) {
    var data = req.body;
    console.log(data, "deleteid ---");
    CertificateModel.removeCertificate(res.pool, data)
      .then((result) => {
        res.status(200).send({ call: 1 });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },

  editCertificate: asyncHandler(async (req, res) => {
    let { certificateId } = req.query;

    // GET FILLED CERTIFICATE DATA
    let [oldData] = await CertificateModel.getCertificateData(
      res.pool,
      certificateId,
    );

    renderPage(res, "user/certificate/add_new_entry", {
      oldData: oldData || {},
      edit: true,
    });
  }),
};
module.exports = CertificateController;
