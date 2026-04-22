var responderSet = require('../config/_responderSet');

module.exports = {
  getUserDetailsByTransactionId: function (pool, token) {
    console.log('mhi');
    return new Promise((resolve, reject) => {
      var query = `SELECT 
      ca.id as form_id,
      ca_reg_id as reg_id,
      ca_post_name,
      CONCAT(ub_first_name,' ',ub_middle_name,' ',ub_last_name) as full_name,
      ub_email_id as email,
      ca_post_name as post,
      ub_password as password ,
      ub_mobile_number mobile,
      DATE_FORMAT(ca_dob,'%d/%m/%Y') as birth_date
      FROM utr_candidate_appications as ca INNER JOIN 
      utr_user_basic as ub ON ca.ca_reg_id = ub.id
      WHERE ca_payment_online_token_id=? LIMIT 1`;
      pool.query(query, [token], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  updateOnlinePaymentStatus: function (pool, data, _date) {
    return new Promise((resolve, reject) => {
      var query = `UPDATE utr_candidate_appications SET 
                      ca_payment_done = ?,
                      ca_payment_order_id = ?,
                      ca_pament_order_signature = ?,
                      ca_pament_payment_id = ?,
                      ca_pament_ammount = ?,
                      ca_payment_time=?,
                      ca_payment_date=?,
                      ca_payment_type=?,
                      ca_transection_no=?,
                      ca_payment_full_details = ?,
                      ca_payment_online_status_message = ?
                  WHERE ca_payment_online_token_id = ? LIMIT 1`;
      console.log(data.fullPayDetails);
      var $data = [
        data.responseCode ? 1 : 0,
        data.token,
        data.fullPayDetails.data.paymentInstrument === undefined
          ? ''
          : data.fullPayDetails.data.paymentInstrument.pgServiceTransactionId,
        data.transactionId,
        Number(data.amount) / 100,
        _date.time,
        _date.date,
        1,
        data.transactionId,
        JSON.stringify(data.fullPayDetails),
        data.state,
        data.token
      ];
      pool.query(query, $data, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getOnlinePaymentToken: function (pool, data) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                    ca_payment_online_token_id as token
                    FROM 
                        utr_candidate_appications as ca
                    WHERE
                      ca_reg_id = ? AND ca.id =?
                    GROUP BY ca.id
                    `;
      pool.query(query, [Number(data.r), Number(data.f)], (err, result) => {
        if (err) {
          (responderSet.sendData._call = -1),
            (responderSet.sendData._error = 'Op Error, Contact To Admin'),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData);
        } else {
          resolve(result);
        }
      });
    });
  }
};
