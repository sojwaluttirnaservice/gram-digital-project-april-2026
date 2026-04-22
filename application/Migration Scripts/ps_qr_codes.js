const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_qr_codes = sequelize.define(
	"ps_qr_codes", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},


	// for samanya
	bank_qr_code_image_name: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: "",
	},
	show_bank_qr_code_image: {
		type: Sequelize.TINYINT,
		defaultValue: 1,
	},

	// for water
	bank_qr_code_water_image_name: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: "",
	},

	show_bank_qr_code_water_image: {
		type: Sequelize.TINYINT,
		defaultValue: 1,
	},
});

module.exports = ps_qr_codes;
