const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_tax_payer_list_pani = sequelize.define(
    'ps_tax_payer_list_pani',
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        form_nine_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },

        tpl_lastSpacialWaterTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '0',
        },

        tpl_currentSpacialWaterTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '0',
        },

        tpl_totalSpacialWaterTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '0',
        },

        tpl_lastGenealWaterTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '0',
        },

        tpl_currentGenealWaterTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '0',
        },

        tpl_totalGenealWaterTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '0',
        },

        tpl_totalWaterTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: '0',
        },

        tpl_bharnaDate: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        
        created_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

        checkNo: {
            type: Sequelize.STRING(255),
            defaultValue: null,
        },


        // in case of online payment by the user (outside grampanchayt office, keeping the track)
        ps_payment_information_id_fk: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    },
    {
        createdAt: false,
        modifiedAt: false,
    }
);

module.exports = ps_tax_payer_list_pani;
