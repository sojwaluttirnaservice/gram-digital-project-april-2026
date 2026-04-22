var responderSet = require("../config/_responderSet");
let myDates = responderSet.myDate;
var request = require("request");

module.exports = {
  getQuickUserInfoByAadhar: function (pool, data) {
    return new Promise((resolve, reject) => {
      var query = `SELECT formName,formMobile,formEmail,formAddress,formAadhar  FROM  ps_user_application WHERE formAadhar = ? LIMIT 1`;
      pool.query(query, [data.addhar], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  getNewApplicationList: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                    id,
                    formName,
                    formMobile,
                    formEmail,
                    formAadhar,
                    docName,
                    dakhlaCheckColOne,
                    dakhlaCheckColTwo,
                    documentTypeId,
                    documentVerifyDone,
                    docSms,
                    docRemark,
                    docSmsDate,
                    DATE_FORMAT(docRemarkDate,"%d-%m-%Y") asdocRemarkDate,
                    DATE_FORMAT(create_date,"%d-%m-%Y") create_date
                   FROM  ps_user_application WHERE documentVerifyDone = 0`;
      pool.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  getRejectedApplicationList: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                    id,
                    formName,
                    formMobile,
                    formEmail,
                    formAadhar,
                    docName,
                    dakhlaCheckColOne,
                    dakhlaCheckColTwo,
                    documentTypeId,
                    documentVerifyDone,
                    docSms,
                    docRemark,
                    docSmsDate,
                    DATE_FORMAT(docRemarkDate,"%d-%m-%Y") asdocRemarkDate,
                    DATE_FORMAT(create_date,"%d-%m-%Y") create_date
                  FROM  ps_user_application WHERE docRemark = 0 ORDER BY docRemarkDate DESC,id DESC`;
      pool.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  getAcceptedApplicationList: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                    id,
                    formName,
                    formMobile,
                    formEmail,
                    formAadhar,
                    docName,
                    dakhlaCheckColOne,
                    dakhlaCheckColTwo,
                    documentTypeId,
                    documentVerifyDone,
                    docSms,
                    docRemark,
                    docSmsDate,
                    DATE_FORMAT(docRemarkDate,"%d-%m-%Y") asdocRemarkDate,
                    DATE_FORMAT(create_date,"%d-%m-%Y") create_date
                FROM  ps_user_application WHERE docRemark = 1 ORDER BY docRemarkDate DESC,id DESC`;
      pool.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  getSMSDetailsStatus: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT id,sl_send_count as send_count,sl_message as sms,DATE_FORMAT(sl_date,'%d-%m-%Y') as sms_date FROM ps_sms_list ORDER BY id DESC LIMIT 10`;

      pool.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  removeSMSFromList: function (pool, id) {
    return new Promise((resolve, reject) => {
      var query = `DELETE FROM ps_sms_list WHERE id=?`;
      pool.query(query, [Number(id)], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  addSMSDetailsStatus: function (pool, data) {
    return new Promise((resolve, reject) => {
      var query = `INSERT INTO ps_sms_list(sl_message,sl_contact_number,sl_send_count,sl_date) VALUES (?)`;
      var insert = [
        data.docSMS,
        data.userMobileNo,
        Number(data.count),
        myDates.getDate(),
      ];
      pool.query(query, [insert], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
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
    var url = `http://msg.technolitesolution.com/api/SendMesssgeAPI?mobile="1,2,7,8,4,5&msg="`;
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
