const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_tax_payer_list_samanya = sequelize.define(
    'ps_tax_payer_list_samanya',
    {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        // from below copied to ps_payment_receipt_samanya
        form_nine_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
        },
        tpl_lastBuildingTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_currentBuildingTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalBuildingTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastDivaTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_currentDivaTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalDivaTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastArogyaTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_currentArogyaTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalArogyaTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastCleaningTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_currentCleaningTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalCleaningTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastFireblegateTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_currentFireblegateTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalFireblegateTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastTreeTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_currentTreeTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalTreeTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastEducationTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_currentEducationTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalEducationTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastTaxFine: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_lastTaxRelief: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        tpl_totalSampurnaTax: {
            type: Sequelize.DOUBLE,
            allowNull: false,
            defaultValue: 0,
        },
        created_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        tpl_bharnaDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        tpl_amountInWords: {
            type: Sequelize.TEXT('long'),
            allowNull: false,
        },
        payment_id: {
            type: Sequelize.STRING(255),
            defaultValue: '-',
        },
        order_id: {
            type: Sequelize.STRING(255),
            defaultValue: '-',
        },
        mobile: {
            type: Sequelize.STRING(100),
            defaultValue: '-',
        },
        checkNo: {
            type: Sequelize.STRING(255),
            defaultValue: null,
        },
        ps_tax_payer_list_samanyacol: {
            type: Sequelize.STRING(45),
            defaultValue: null,
        },

        // in case of online payment by the user (outside grampanchayt office, keeping the track)
        ps_payment_information_id_fk: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

        ps_payment_receipt_samanya_id_fk: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }

    },
    {
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = ps_tax_payer_list_samanya;
