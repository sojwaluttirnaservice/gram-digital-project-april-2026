var responderSet = require("../config/_responderSet");
let myDates = responderSet.myDate;

module.exports = {
  getZpDetails: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT *  FROM  ps_gram_panchayet LIMIT 1`;
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
