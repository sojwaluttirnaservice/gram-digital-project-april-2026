var responderSet = require("../config/_responderSet");
let myDates = responderSet.myDate;

module.exports = {
  getMainList: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT *  FROM  ps_sabhasad_notice ORDER BY id DESC LIMIT 10 `;
      pool.query(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
};
