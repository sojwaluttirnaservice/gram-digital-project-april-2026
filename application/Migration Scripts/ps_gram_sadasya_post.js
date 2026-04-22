const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_gram_sadasya_post = sequelize.define(
	"ps_gram_sadasya_post",
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

		post_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},

		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		},

		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		}
	},
	{
		timestamps: true,
	},
);

module.exports = ps_gram_sadasya_post;
