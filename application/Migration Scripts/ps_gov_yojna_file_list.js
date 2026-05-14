const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_gov_yojna_file_list = sequelize.define(
	'ps_gov_yojna_file_list',
	{
		id: {
			type: Sequelize.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},

        yojana_name: {
            type: Sequelize.STRING(200),
            allowNull: false,
            defaultValue: ''
        },

        website_link: {
            type: Sequelize.STRING(300),
            allowNull: true,
        },

        yojana_description: {
            type: Sequelize.STRING(400),
            allowNull: true,
        },

        required_documents_list: {
            type: Sequelize.JSON,
            allowNull: true
        },

        yojana_status: {
            type: Sequelize.ENUM("ONGOING", "COMPLETE", "UPCOMING"),
            allowNull: false,
            defaultValue: "ONGOING"
        },

        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },

        // image name for this
        image_banner: {
            type: Sequelize.STRING(200),
            allowNull: true
        },

        is_visible: {
            // 1 => visible, 0 => not visible
            type: Sequelize.TINYINT,
            defaultValue: 1
        },

        // this is the original field from the start
		file_name: {
			type: Sequelize.STRING(255),
			allowNull: false,
            defaultValue: ''
		},

        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },

        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        }
	},
	{
		timestamps: true
	}
)

module.exports = ps_gov_yojna_file_list