const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_19 = sequelize.define(
    'ps_namuna_19',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        // Employee ID Foreign Key (कर्मचारी आयडी)
        employee_id_fk: {
            type: Sequelize.BIGINT, // कर्मचारी आयडी
            allowNull: false,
        },

        // Month (महिना)
        month: {
            type: Sequelize.TINYINT, // महिना
            allowNull: false,
        },

        // Year (वर्ष)
        year: {
            type: Sequelize.INTEGER, // वर्ष
            allowNull: false,
        },

        // Date (दिनांक)
        payment_date: {
            type: Sequelize.DATEONLY, // दिनांक
            allowNull: true,
        },

        // Working Days (कामाचे दिवस)
        working_days: {
            type: Sequelize.TINYINT, // कामाचे दिवस
            allowNull: false,
        },

        // Present Days (उपस्थितीचे दिवस)
        present_days: {
            type: Sequelize.TINYINT, // उपस्थितीचे दिवस
            allowNull: false,
        },

        // Monthly Salary (मासिक वेतन)
        monthly_salary: {
            type: Sequelize.DECIMAL(10, 2), // मासिक वेतन
            allowNull: true,
        },

        // SHARE OF THE SALARY THE STATE PAYS TO THE EMPLOYEE
        state_share: {
            type: Sequelize.DECIMAL(10, 2), //
            allowNull: false,
        },

        // PERCENTAGE OF CUT OF THE SALARY THE STATE TAKES E.G.
        pf_cutting_percentage: {
            type: Sequelize.DECIMAL(10, 2), //
            allowNull: false,
        },

        //SHARE OF THE SALARY THAT THE GRAMPANCHAYAT PAYS
        grampanchayat_share: {
            type: Sequelize.DECIMAL(10, 2), //
            allowNull: false, 
        },

        calculated_state_salary: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
        },

        // Calculated Salary (गणना केलेले वेतन)
        calculated_grampanchayat_salary: {
            type: Sequelize.DECIMAL(10, 2), // गणना केलेले वेतन
            allowNull: false,
        },

        // Remarks (टीप)
        remarks: {
            type: Sequelize.STRING(255), // टीप
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

module.exports = ps_namuna_19;
