var responderSet = require("../config/_responderSet");
const fmtDateField = require("../utils/fmtDateField");
const { runQuery } = require("../utils/runQuery");
const { fmtDateToTimestamp } = require("../utils/sqlDates");
let myDates = responderSet.myDate;

module.exports = {
  getMarriageList: function (pool) {
    let q = `SELECT 
                    id,
                    IFNULL(marriageHusbandNameE,"") as marriageHusbandNameE,
                    IFNULL(marriageHusbandNameM, "") as marriageHusbandNameM,
                    IFNULL(marriageHusbandAadharE, "") as marriageHusbandAadharE,
                    IFNULL(marriageHusbandAadharM, "") as marriageHusbandAadharM,
                    IFNULL(marriageHusbandAddressE, "") as marriageHusbandAddressE,	
                    IFNULL(marriageHusbandAddressM, "") as marriageHusbandAddressM,	
                    IFNULL(marriageWifedNameE, "") as marriageWifedNameE,
                    IFNULL(marriageWifeNameM, "") as marriageWifeNameM,
                    IFNULL(marriageWifedAadharE, "") as marriageWifedAadharE,
                    IFNULL(marriageWifeAadharM, "") as marriageWifeAadharM,	
                    IFNULL(marriageWifeAddressE, "") as marriageWifeAddressE,
                    IFNULL(marriageWifeAddressM, "") as marriageWifeAddressM,
                    IFNULL(marriageVolume, "") as marriageVolume,	
                    IFNULL(marriagePlaceE, "") as marriagePlaceE,	
                    IFNULL(marriagePlaceM, "") as marriagePlaceM,
                    marriageDate,
                    marriagePlaceE,
                    registration_date,
                    registration_date_two
                FROM  ps_marriage`;

    return runQuery(pool, q);
  },

  //   new list function

  list: (pool, { status = "PENDING", application_mode } = {}) => {
    let q = `SELECT *, 
                ${fmtDateField("created_date")},
                ${fmtDateToTimestamp("date_of_acceptance")},
                ${fmtDateToTimestamp("date_of_rejection")} 
            FROM 
                ps_marriage 
            WHERE 1=1`;
    const values = [];

    if (status) {
      // Special rule: PENDING always means ONLINE
      if (status.toUpperCase() === "PENDING") {
        q += ` AND application_status = ?`;
        q += ` AND application_mode = ?`;
        values.push(status.toUpperCase());
        values.push("ONLINE");
      }
      // Otherwise, use provided application_mode if given
      //   else if (application_mode) {
      //     q += ` AND application_mode = ?`;
      //     values.push(application_mode.toUpperCase());
      //   }

      if (status.toUpperCase() === "ACCEPTED") {
        // if application mode was
        q += ` AND (application_status = ?`;
        q += ` OR application_mode = ?)`;
        values.push(status.toUpperCase());
        values.push("OFFLINE");
      }

      if (status.toUpperCase() === "REJECTED") {
        q += ` AND application_status = ?`;
        values.push(status?.toUpperCase());
      }
    } else if (application_mode) {
      // If status not provided, still filter by application_mode
      q += ` AND application_mode = ?`;
      values.push(application_mode.toUpperCase());
    }

    return runQuery(pool, q, values);
  },

  saveNewEntryView: function (pool, data) {
    let q = `INSERT INTO ps_marriage(
                    marriageHusbandNameE,
                    marriageHusbandNameM,
                    marriageHusbandAadharE,
                    marriageHusbandAadharM,
                    marriageHusbandAddressE,
                    marriageHusbandAddressM,
                    marriageWifedNameE,
                    marriageWifeNameM,
                    marriageWifedAadharE,
                    marriageWifeAadharM,
                    marriageWifeAddressE,
                    marriageWifeAddressM,
                    marriageDate,
                    marriageVolume,
                    marriageAnuKramank,
                    marriagePlaceE,
                    marriagePlaceM,
                    image_h,
                    image_w,
                    created_date,
                    marriageVolumeM,
                    marriageDateM,
                    marriageAnuKramankM,
                    registration_date,
                    registration_date_two,

					marriageHusbandFatherNameE,
					marriageHusbandFatherNameM,
                    marriageHusbandReligionE,
					marriageHusbandReligionM,
					marriageHusbandNationalityE,
					marriageHusbandNationalityM,

					marriageWifeFatherNameE,
					marriageWifeFatherNameM,
                    marriageWifeReligionE,
					marriageWifeReligionM,
					marriageWifeNationalityE,
					marriageWifeNationalityM,

					marriageInformerNameE,
					marriageInformerNameM,
                    ps_payment_information_id_fk
                ) VALUES (?)`;

    var _data = [
      data.marriageHusbandNameE,
      data.marriageHusbandNameM,
      data.marriageHusbandAadharE,
      data.marriageHusbandAadharM,
      data.marriageHusbandAddressE,
      data.marriageHusbandAddressM,
      data.marriageWifedNameE,
      data.marriageWifeNameM,
      data.marriageWifedAadharE,
      data.marriageWifeAadharM,
      data.marriageWifeAddressE,
      data.marriageWifeAddressM,
      data.marriageDateOne,
      data.marriageVolumeOne,
      data.marriagAnuKramankOne,
      data.marriagePlaceE,
      data.marriagePlaceM,
      data.image_h,
      data.image_w,
      myDates.getDate(),
      data.marriageVolumeTwo,
      data.marriageDateTwo,
      data.marriagAnuKramankTwo,
      data.registration_date,
      data.registration_date_two,

      data.marriageHusbandFatherNameE,
      data.marriageHusbandFatherNameM,
      data.marriageHusbandReligionE,
      data.marriageHusbandReligionM,
      data.marriageHusbandNationalityE,
      data.marriageHusbandNationalityM,

      data.marriageWifeFatherNameE,
      data.marriageWifeFatherNameM,
      data.marriageWifeReligionE,
      data.marriageWifeReligionM,
      data.marriageWifeNationalityE,
      data.marriageWifeNationalityM,

      data.marriageInformerNameE,
      data.marriageInformerNameM,

      data.ps_payment_information_id_fk,
    ];

    return runQuery(pool, q, [_data]);
  },

  updateMarriageEntry: function (pool, data) {
    let q = `UPDATE ps_marriage SET
                    marriageHusbandNameE = ?,
                    marriageHusbandNameM = ?,
                    marriageHusbandAadharE = ?,
                    marriageHusbandAadharM = ?,
                    marriageHusbandAddressE = ?,
                    marriageHusbandAddressM = ?,
                    marriageWifedNameE = ?,
                    marriageWifeNameM = ?,
                    marriageWifedAadharE = ?,
                    marriageWifeAadharM = ?,
                    marriageWifeAddressE = ?,
                    marriageWifeAddressM = ?,
                    marriageDate = ?,
                    marriageVolume = ?,
                    marriageAnuKramank = ?,
                    marriagePlaceE = ?,
                    marriagePlaceM = ?,
                    created_date = ?,
                    marriageVolumeM = ?,
                    marriageDateM = ?,
                    marriageAnuKramankM = ?,
                    registration_date = ?,
                    registration_date_two = ?,
					marriageHusbandFatherNameE = ?,
					marriageHusbandFatherNameM = ?,
                    marriageHusbandReligionE = ?,
					marriageHusbandReligionM = ?,
					marriageHusbandNationalityE = ?,
					marriageHusbandNationalityM = ?,

					marriageWifeFatherNameE = ?,
					marriageWifeFatherNameM = ?,
                    marriageWifeReligionE = ?,
					marriageWifeReligionM = ?,
					marriageWifeNationalityE = ?,
					marriageWifeNationalityM = ?,

					marriageInformerNameE = ?,
					marriageInformerNameM = ?
                  WHERE id = ?`;

    const updateArr = [
      data.marriageHusbandNameE,
      data.marriageHusbandNameM,
      data.marriageHusbandAadharE,
      data.marriageHusbandAadharM,
      data.marriageHusbandAddressE,
      data.marriageHusbandAddressM,
      data.marriageWifedNameE,
      data.marriageWifeNameM,
      data.marriageWifedAadharE,
      data.marriageWifeAadharM,
      data.marriageWifeAddressE,
      data.marriageWifeAddressM,
      data.marriageDateOne,
      data.marriageVolumeOne,
      data.marriagAnuKramankOne,
      data.marriagePlaceE,
      data.marriagePlaceM,
      myDates.getDate(),
      data.marriageVolumeTwo,
      data.marriageDateTwo,
      data.marriagAnuKramankTwo,
      data.registration_date,
      data.registration_date_two,
      data.marriageHusbandFatherNameE,
      data.marriageHusbandFatherNameM,
      data.marriageHusbandReligionE,
      data.marriageHusbandReligionM,
      data.marriageHusbandNationalityE,
      data.marriageHusbandNationalityM,

      data.marriageWifeFatherNameE,
      data.marriageWifeFatherNameM,
      data.marriageWifeReligionE,
      data.marriageWifeReligionM,
      data.marriageWifeNationalityE,
      data.marriageWifeNationalityM,

      data.marriageInformerNameE,
      data.marriageInformerNameM,
      Number(data.id),
    ];

    return runQuery(pool, q, updateArr);
  },
  
  getMarriageDetail: function (pool, id) {
    const q = `SELECT * FROM ps_marriage WHERE id = ?`;
    return runQuery(pool, q, id);
  },

  removeMarriage: function (pool, data) {
    let query = `DELETE FROM ps_marriage WHERE id = ?`;
    return runQuery(pool, query, [+data.id]);
  },

  getSingleMarriageData: function (pool, data) {
    let q = `SELECT 
                    id,
                    image_h,
                    image_w,
                    IFNULL(marriageHusbandNameE,"") as marriageHusbandNameE,
                    IFNULL(marriageHusbandNameM, "") as marriageHusbandNameM,
                    IFNULL(marriageHusbandAadharE, "") as marriageHusbandAadharE,
                    IFNULL(marriageHusbandAadharM, "") as marriageHusbandAadharM,
                    IFNULL(marriageHusbandAddressE, "") as marriageHusbandAddressE,	
                    IFNULL(marriageHusbandAddressM, "") as marriageHusbandAddressM,	
                    IFNULL(marriageWifedNameE, "") as marriageWifedNameE,
                    IFNULL(marriageWifeNameM, "") as marriageWifeNameM,
                    IFNULL(marriageWifedAadharE, "") as marriageWifedAadharE,
                    IFNULL(marriageWifeAadharM, "") as marriageWifeAadharM,	
                    IFNULL(marriageWifeAddressE, "") as marriageWifeAddressE,
                    IFNULL(marriageWifeAddressM, "") as marriageWifeAddressM,
                    IFNULL(marriageVolume, "") as marriageVolume,	
                    IFNULL(marriagePlaceE, "") as marriagePlaceE,	
                    IFNULL(marriagePlaceM, "") as marriagePlaceM,
                    IFNULL(marriageAnuKramank, "") as marriageAnuKramank,
                    IFNULL(marriageAnuKramankM, "") as marriageAnuKramankM,
                    marriageDate as marriageDate,
                    DATE_FORMAT(created_date,"%d-%m-%Y") as created_date,
                    IFNULL(marriageVolumeM, "") as marriageVolumeM,
                    IFNULL(marriageDateM, "") as marriageDateM,
                    IFNULL(marriageAnuKramankM, "") as marriageAnuKramankM,
                    registration_date,
                    registration_date_two 
                FROM  ps_marriage WHERE id = ?`;

    
    return runQuery(pool, q, [Number(data.i)]);
  },

  updateEntryView: function (pool, data) {
    let q = `UPDATE ps_marriage
                SET 
                image_h = ?,
                image_w = ?
                WHERE id = ?`;

    return runQuery(pool, q, [data.image_h, data.image_w, Number(data.id)])
  },

  getMarriageListByRegistrationDate: (pool, { month, year }) => {
    let q = `SELECT * FROM ps_marriage
                    WHERE
                        MONTH (STR_TO_DATE(registration_date, '%d/%m/%Y')) = ?
                        AND
                        YEAR (STR_TO_DATE(registration_date, '%d/%m/%Y')) = ?`;

    return runQuery(pool, q, [+month, +year]);
  },

  saveMarriageRegistrationApplication: (pool, payload) => {
    const q = `
    INSERT INTO ps_marriage (

      -- ================= HUSBAND =================
      marriageHusbandNameE,
      marriageHusbandNameM,
      marriageHusbandMobileE,
      marriageHusbandMobileM,
      marriageHusbandAadharE,
      marriageHusbandAadharM,
      marriageHusbandAddressE,
      marriageHusbandAddressM,
      marriageHusbandFatherNameE,
      marriageHusbandFatherNameM,
      marriageHusbandReligionE,
      marriageHusbandReligionM,
      marriageHusbandNationalityE,
      marriageHusbandNationalityM,
      marriageHusbandDobE,
      marriageHusbandDobM,
      marriageHusbandAge,
      marriageHusbandOccupationE,
      marriageHusbandOccupationM,
      marriageHusbandMaritalStatusE,
      marriageHusbandMaritalStatusM,
      marriageHusbandBirthProofType,
      marriageHusbandBirthProofFile,
      marriageHusbandIdProofType,
      marriageHusbandIdProofFile,
      marriageHusbandAddressProofType,
      marriageHusbandAddressProofFile,

      -- ================= WIFE =================
      marriageWifedNameE,
      marriageWifeNameM,
      marriageWifeMobileE,
      marriageWifeMobileM,
      marriageWifedAadharE,
      marriageWifeAadharM,
      marriageWifeAddressE,
      marriageWifeAddressM,
      marriageWifeFatherNameE,
      marriageWifeFatherNameM,
      marriageWifeReligionE,
      marriageWifeReligionM,
      marriageWifeNationalityE,
      marriageWifeNationalityM,
      marriageWifeDobE,
      marriageWifeDobM,
      marriageWifeAge,
      marriageWifeOccupationE,
      marriageWifeOccupationM,
      marriageWifeMaritalStatusE,
      marriageWifeMaritalStatusM,
      marriageWifeBirthProofType,
      marriageWifeBirthProofFile,
      marriageWifeIdProofType,
      marriageWifeIdProofFile,
      marriageWifeAddressProofType,
      marriageWifeAddressProofFile,

      -- ================= MARRIAGE =================
      marriageTypeE,
      marriageTypeM,
      marriageHallNameE,
      marriageHallNameM,
      marriageHallAddressE,
      marriageHallAddressM,
      marriageHallPhoto,
      marriageWeddingPhotos,
      marriageDate,
      marriageDateM,
      marriagePlaceE,
      marriagePlaceM,
      image_h,
      image_w,

      created_date,

      marriageInformerNameE,
      marriageInformerNameM,
      registration_date,
      registration_date_two,
      marriageWeddingCertificateFile,
      marriageWeddingCardFile,

      application_mode,
      application_status,
      witnesses_details

    ) VALUES (
        ? 
    )
  `;

    const values = [
      // ================= HUSBAND =================
      payload.marriageHusbandNameE,
      payload.marriageHusbandNameM,
      payload.marriageHusbandMobileE,
      payload.marriageHusbandMobileM,
      payload.marriageHusbandAadharE,
      payload.marriageHusbandAadharM,
      payload.marriageHusbandAddressE,
      payload.marriageHusbandAddressM,
      payload.marriageHusbandFatherNameE,
      payload.marriageHusbandFatherNameM,
      payload.marriageHusbandReligionE,
      payload.marriageHusbandReligionM,
      payload.marriageHusbandNationalityE,
      payload.marriageHusbandNationalityM,
      payload.marriageHusbandDobE,
      payload.marriageHusbandDobM,
      payload.marriageHusbandAge,
      payload.marriageHusbandOccupationE,
      payload.marriageHusbandOccupationM,
      payload.marriageHusbandMaritalStatusE,
      payload.marriageHusbandMaritalStatusM,
      payload.marriageHusbandBirthProofType,
      payload.marriageHusbandBirthProofFile,
      payload.marriageHusbandIdProofType,
      payload.marriageHusbandIdProofFile,
      payload.marriageHusbandAddressProofType,
      payload.marriageHusbandAddressProofFile,

      // ================= WIFE =================
      payload.marriageWifedNameE,
      payload.marriageWifeNameM,
      payload.marriageWifeMobileE,
      payload.marriageWifeMobileM,
      payload.marriageWifedAadharE,
      payload.marriageWifeAadharM,
      payload.marriageWifeAddressE,
      payload.marriageWifeAddressM,
      payload.marriageWifeFatherNameE,
      payload.marriageWifeFatherNameM,
      payload.marriageWifeReligionE,
      payload.marriageWifeReligionM,
      payload.marriageWifeNationalityE,
      payload.marriageWifeNationalityM,
      payload.marriageWifeDobE,
      payload.marriageWifeDobM,
      payload.marriageWifeAge,
      payload.marriageWifeOccupationE,
      payload.marriageWifeOccupationM,
      payload.marriageWifeMaritalStatusE,
      payload.marriageWifeMaritalStatusM,
      payload.marriageWifeBirthProofType,
      payload.marriageWifeBirthProofFile,
      payload.marriageWifeIdProofType,
      payload.marriageWifeIdProofFile,
      payload.marriageWifeAddressProofType,
      payload.marriageWifeAddressProofFile,

      // ================= MARRIAGE =================
      payload.marriageTypeE,
      payload.marriageTypeM,
      payload.marriageHallNameE,
      payload.marriageHallNameM,
      payload.marriageHallAddressE,
      payload.marriageHallAddressM,
      payload.marriageHallPhoto,
      JSON.stringify(payload.marriageWeddingPhotos),
      payload.marriageDate,
      payload.marriageDateM,
      payload.marriagePlaceE,
      payload.marriagePlaceM,
      payload.image_h,
      payload.image_w,
      myDates.getDate(),
      payload.marriageInformerNameE,
      payload.marriageInformerNameM,
      payload.registration_date,
      payload.registration_date_two,
      payload.marriageWeddingCertificateFile,
      payload.marriageWeddingCardFile,

      "ONLINE",
      "PENDING",
      JSON.stringify(payload.witnesses_details),
    ];

    return runQuery(pool, q, [values]);
  },

  updateStatus: (pool, updateData) => {
    let q = "";
    let values = [];

    if (updateData.status == "ACCEPTED") {
      q = `UPDATE ps_marriage 
            SET 
                marriageVolume = ?,
                marriageVolumeM = ?,
                application_status = ?,
                date_of_acceptance = NOW(),
                acceptance_remark = ?,
                registration_date = ?,
                registration_date_two = ?
            WHERE 
                id = ?`;

      values = [
        updateData.marriageVolume,
        updateData.marriageVolumeM,
        "ACCEPTED",
        //
        updateData.acceptance_remark,

        updateData.registration_date,
        updateData.registration_date_two,

        +updateData.id,
      ];
    }

    if (updateData.status == "REJECTED") {
      q = `UPDATE ps_marriage 
            SET
                application_status = ?,
                date_of_rejection = NOW(),
                rejection_remark = ?
            WHERE 
                id = ?`;

      values = [
        "REJECTED",
        //
        updateData.rejection_remark,
        +updateData.id,
      ];
    }

    return runQuery(pool, q, values);
  },
};
