const { runQuery } = require('../../utils/runQuery');

const qrCodeModel = {
	qrCodeList: function (pool) {
		const q = 'SELECT * FROM ps_qr_codes';
		return runQuery(pool, q);
	},

	createEntry: function (pool) {
		const q = 'INSERT INTO ps_qr_codes (id) VALUES (DEFAULT)';
		return runQuery(pool, q)
	},

	updateBankQRCodeImageName: function (pool, imageName) {
		const q = `UPDATE ps_qr_codes SET bank_qr_code_image_name = ?  WHERE id =?`;
		return runQuery(pool, q, [imageName, 1])
	},

	toggleQrBankCodeVisbility: function (pool, visibilityToSet) {
		const q = `UPDATE ps_qr_codes SET show_bank_qr_code_image = ?  WHERE id =?`;
		return runQuery(pool, q, [visibilityToSet, 1]);
	},

	updateBankQRCodeWaterImageName: function (pool, imageName) {
		const q = `UPDATE ps_qr_codes SET bank_qr_code_water_image_name = ?  WHERE id = ?`;
		return runQuery(pool, q, [imageName, 1]);
	},

	toggleQrBankCodeWaterVisbility: function (pool, visibilityToSet) {
		const q = `UPDATE ps_qr_codes SET show_bank_qr_code_water_image = ?  WHERE id = ?`;
		return runQuery(pool, q, [visibilityToSet, 1])
	}
};

module.exports = qrCodeModel;
