const qrCodeModel = {
  qrCodeList: function (pool) {
    return new Promise(function (resolve, reject) {
      const query = "SELECT * FROM ps_qr_codes";
      pool.query(query, function (error, results) {
        if (error) reject(error);
        else resolve(results);
      });
    });
  },

  createEntry: function (pool) {
    return new Promise(function (resolve, reject) {
      const query = "INSERT INTO ps_qr_codes (id) VALUES (DEFAULT)";
      pool.query(query, function (error, result) {
        if (error) reject(error);
        else resolve(result);
      });
    });
  },

  updateBankQRCodeImageName: function (pool, imageName) {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ps_qr_codes SET bank_qr_code_image_name = ?  WHERE id =?`;
      pool.query(query, [imageName, 1], function (error, result) {
        if (error) reject(error);
        else resolve(result);
      });
    });
  },

  toggleQrBankCodeVisbility: function (pool, visibilityToSet) {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ps_qr_codes SET show_bank_qr_code_image = ?  WHERE id =?`;
      pool.query(query, [visibilityToSet, 1], function (error, result) {
        if (error) reject(error);
        else resolve(result);
      });
    });
  },

  updateBankQRCodeWaterImageName: function (pool, imageName) {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ps_qr_codes SET bank_qr_code_water_image_name = ?  WHERE id = ?`;
      pool.query(query, [imageName, 1], function (error, result) {
        if (error) reject(error);
        else resolve(result);
      });
    });
  },

  toggleQrBankCodeWaterVisbility: function (pool, visibilityToSet) {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ps_qr_codes SET show_bank_qr_code_water_image = ?  WHERE id = ?`;
      pool.query(query, [visibilityToSet, 1], function (error, result) {
        if (error) reject(error);
        else resolve(result);
      });
    });
  },
};

module.exports = qrCodeModel;
