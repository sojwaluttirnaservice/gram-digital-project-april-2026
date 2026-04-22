var responderSet = require("../config/_responderSet");
const { runQuery } = require("../utils/runQuery");
let myDates = responderSet.myDate;

module.exports = {
  getMarriageList: (pool) => {
    const q = `SELECT * FROM ps_certificate`;
    return runQuery(pool, q);
  },

  getSingleCertificate: (pool, data) => {
    const q = `SELECT * FROM ps_certificate WHERE id = ?`;
    return runQuery(pool, q, [Number(data.i)]);
  },

  saveNewEntryView: (pool, data) => {
    const q = `INSERT INTO ps_certificate(
                      certificateHolderNameE,
                      certificateHolderNameM,
                      certificateAadharE,
                      certificateAadharM,
                      certificateVillageE,
                      certificateVillageM,
                      certificateTalukaE,
                      certificateTalukaM,
                      certificateDistE,
                      certificateDistM,
                      ps_payment_information_id_fk,
                      created_date
                  ) VALUES (?)`;
    const _data = [
      data.certificateHolderNameE,
      data.certificateHolderNameM,
      data.certificateAadharE,
      data.certificateAadharM,
      data.certificateVillageE,
      data.certificateVillageM,
      data.certificateTalukaE,
      data.certificateTalukaM,
      data.certificateDistE,
      data.certificateDistM,
      data.ps_payment_information_id_fk,
      myDates.getDate(),
    ];
    return runQuery(pool, q, [_data]);
  },

  updateCertificateData: (pool, data) => {
    const q = `UPDATE ps_certificate SET 
                      certificateHolderNameE = ?,
                      certificateHolderNameM = ?,
                      certificateAadharE = ?,
                      certificateAadharM = ?,
                      certificateVillageE = ?,
                      certificateVillageM = ?,
                      certificateTalukaE = ?,
                      certificateTalukaM = ?,
                      certificateDistE = ?,
                      certificateDistM = ?,
                      created_date = ?
                   WHERE id = ?`;
    const updateData = [
      data.certificateHolderNameE,
      data.certificateHolderNameM,
      data.certificateAadharE,
      data.certificateAadharM,
      data.certificateVillageE,
      data.certificateVillageM,
      data.certificateTalukaE,
      data.certificateTalukaM,
      data.certificateDistE,
      data.certificateDistM,
      myDates.getDate(),
      Number(data.id),
    ];
    return runQuery(pool, q, updateData);
  },

  removeCertificate: (pool, data) => {
    const q = `DELETE FROM ps_certificate WHERE id = ?`;
    return runQuery(pool, q, [Number(data.id)]);
  },

  // EDIT CERTIFICATE DETAILS
  getCertificateData: (pool, editId) => {
    const q = `SELECT * FROM ps_certificate WHERE id = ?`;
    return runQuery(pool, q, [editId]);
  },
};
