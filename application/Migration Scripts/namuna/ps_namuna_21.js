const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_21 = sequelize.define(
    'ps_namuna_21', // Table name in snake_case
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // Employee ID Foreign Key (कर्मचारी आयडी)
        // from namuna 19
        employee_id_fk: {
            type: Sequelize.BIGINT, // कर्मचारी आयडी
            allowNull: false,
        },

        // Name (नाव)
        employee_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },

        // Position (पद)
        employee_post: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },

        // Pay Grade or Special Pay (वेतनश्रेणी किंवा विशेष वेतन)
        pay_grade: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },

        // Salary (वेतन)
        salary: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // Leave Salary (रजा वेतन)
        leave_salary: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // Placement Salary (स्थानापत्र वेतन)
        placement_salary: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // Allowances (भत्ते)
        allowances: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // Sum of columns 4 and 7 (स्तंभ ४ व ७ ची बेरीज)
        // sum_column_4_and_7: {
        //     type: Sequelize.DECIMAL(10, 2),
        //     allowNull: true,
        // },

        // Amount Reserved for Future Contribution (पुढील अधिदानासाठी ठेवलेली रक्कम)
        future_contribution_reserved: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // Collections and Penalties (वसुली व दंड)
        collections_and_penalties: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // Remaining Balance after Deducting Column 8 (स्तंभ ८ मधून स्तंभ  ची बेरीज वजा केल्यावर उरलेली शिल्लक)
        // remaining_balance_after_deduction: {
        //     type: Sequelize.DECIMAL(10, 2),
        //     allowNull: true,
        // },

        // Deduction Column (वजती)

        //BELOW THREE SUBCOLUMNS UNDER THE ABOVE
        state_pf_contribution: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        state_other_deductions: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        gp_pf_contribution: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        gp_other_deductions: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

        // total_deductions: {
        //     type: Sequelize.DECIMAL(10, 2),
        //     allowNull: true,
        // },

        // Net Amount to be Paid after Deductions (शुद्ध रक्कम)
        // net_amount_to_be_paid: {
        //     type: Sequelize.DECIMAL(10, 2),
        //     allowNull: true,
        // },

        // Remarks (टीप)
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },

        // Created At
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        // Updated At
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ps_namuna_21;
