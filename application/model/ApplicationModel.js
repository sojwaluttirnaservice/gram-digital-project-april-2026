var responderSet = require("../config/_responderSet");
let myDates = responderSet.myDate;
var request = require("request");
const { runQuery } = require("../utils/runQuery");
const fmtDateField = require("../utils/fmtDateField");

//NOTE :

// docRemark: 1 => Accepted, 0 => Rejected, 2 => No action taken yet, i.e. pending as per old logic

module.exports = {
  getQuickUserInfoByAadhar: function (pool, data) {
    let q = `SELECT 
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar  
            FROM 
                ps_user_application 
            WHERE 
                formAadhar = ? 
                LIMIT 1`;
    return runQuery(pool, q, [data.addhar]);
  },

  getById: (pool, id) => {
    let q = `SELECT *, ${fmtDateField("create_date")} FROM ps_user_application WHERE id = ?`;
    return runQuery(pool, q, [+id]);
  },

  getNewApplicationList: (pool) => {
    // docName removed from query
    let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") asdocRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") create_date
            FROM  
                ps_user_application 
                    WHERE documentVerifyDone = 0 AND docRemark IN ('PENDING', '2')`;

    // -- 'PENDING' is the new docRemark enum value after code refactoring,
    // -- and '2' is the legacy value representing the same "pending" status.
    // -- Both are included here to support old and new data until legacy data is cleaned up.

    return runQuery(pool, q);
  },

  //  returning applications irrespective of accepted or rejected
  getAllApplications: (pool, { sort = "ASC" } = {}) => {
    let q = `SELECT *, 
                    DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as _docRemarkDate, 
                    DATE_FORMAT(create_date, '%d-%m-%Y') AS _create_date 
                FROM 
                    ps_user_application
                ORDER BY 
                    create_date ${sort}`;
    return runQuery(pool, q);
  },

  getRejectedApplicationList: (pool, { sort = "ASC" } = {}) => {
    // removing the docName from the query
    let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAadhar,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as _docRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") create_date
            FROM  
                ps_user_application 
            WHERE 
                docRemark IN ('REJECTED', '0')
            ORDER BY 
                create_date ${sort}`;
    //  docRemarkDate DESC, id DESC;

    return runQuery(pool, q);
  },

  getAcceptedApplicationList: (pool, { sort = "ASC" } = {}) => {
    // removing the docName from the query
    let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAadhar,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as docRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") AS _create_date
            FROM  
                ps_user_application 
            WHERE 
                docRemark IN ('ACCEPTED', '0')
            ORDER BY 
                create_date ${sort}`;

    // docRemarkDate DESC, id DESC

    return runQuery(pool, q);
  },

  getAcceptedApplicationListSortByCreateDate: (pool, { sort = "ASC" } = {}) => {
    // removing the docName from the query
    let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAadhar,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as docRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") _create_date
            FROM  
                ps_user_application 
            WHERE 
                docRemark IN ('ACCEPTED', '0')
            ORDER BY 
                create_date ${sort}`;

    return runQuery(pool, q);
  },

  updateApplication: (pool, updateData) => {
    let q = `
    UPDATE ps_user_application
    SET
      formName = ?,
      formMobile = ?,
      formEmail = ?,
      formAddress = ?,
      formAadhar = ?,
      docDetails = ?,
      create_date = ?
    WHERE id = ?
  `;

    let updateDataArr = [
      updateData.formName,
      updateData.formMobile,
      updateData.formEmail,
      updateData.formAddress,
      updateData.formAadhar,
      JSON.stringify(updateData.docDetails),
      updateData.create_date,
      updateData.id,
    ];

    return runQuery(pool, q, updateDataArr);
  },

  updateApplicationStatus: (pool, data) => {
    let q = `UPDATE 
                ps_user_application
            SET
                documentVerifyDone = ?,
                docRemark = ?,
                docSms = ?,
                docSmsDate = ?,
                docRemarkDate = ?
            WHERE 
                id = ?`;

    let updateArr = [
      1,
      Number(data.docResponse),
      data.docSMS,
      myDates.getDate(),
      myDates.getDate(),
      Number(data.appId),
    ];

    return runQuery(pool, q, updateArr);
  },

  updateDocRemark: (pool, applicationStatusData) => {
    console.log(applicationStatusData);
    let q = `UPDATE
                ps_user_application
            SET 
                docRemark = ?,
                docRemarkDate = ?
            WHERE 
                id = ?`;

    return runQuery(pool, q, [
      applicationStatusData.changeApplicationStatusTo,
      myDates.getDate(),
      applicationStatusData.applicationId,
    ]);
  },

  serialize: function (obj) {
    let str =
      "?" +
      Object.keys(obj)
        .reduce(function (a, k) {
          a.push(k + "=" + encodeURIComponent(obj[k]));
          return a;
        }, [])
        .join("&");
    return str;
  },
  /*sendSMS: function (data, callback) {
    var url = `http://msg.technolitesolution.com/api/SendMesssgeAPI`;
    var sendData = {
      username: "utirna",
      password: "Omsai@800",
      SenderId: "UTIRNA",
      DataCoding: "0",
      Gwid: "2",
      MobileMessage: [
        {
          MobileNumber: data.userMobileNo,
          message: data.docSMS,
        },
      ],
    };

    request(
      {
        url: url,
        json: sendData,
        method: "post",
      },
      function (error, response, body) {
        data = {
          error: error,
          response: response,
          body: body,
        };
        callback(data);
      }
    );
  },*/
  sendSMS: function (data, callback) {
    var url = `http://msg.technolitesolution.com/vendorsms/pushsms.aspx`;

    var sendData = {
      user: "utirna",
      password: "Omsai@800",
      sid: "UTIRNA",
      fl: "0",
      gwid: "2",
      msisdn: data.userMobileNo,
      msg: data.docSMS,
    };
    var str = this.serialize(sendData);
    url += str;
    request.get(
      {
        url: url,
      },
      function (error, response, body) {
        data = {
          error: error,
          response: response,
          body: body,
        };
        callback(data);
      },
    );
  },
};
