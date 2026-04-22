const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_13 = sequelize.define(
    'ps_namuna_13',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        post_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        order_number: {
            // आदेश क्रमांक
            type: Sequelize.STRING(20),
            allowNull: false,
        },


        employment_type: {
            // Full-time (पूर्णकाळ ) / Part-time (अंशकाळ )
            type: Sequelize.ENUM('Full-time', 'Part-time'),
            allowNull: false,
        },

        salary_grade: {
            // मंजूर वेतनश्रेणी
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        employee_name: {
            // नियुक्त  केलेल्या कर्मचार्याचे नाव
            type: Sequelize.STRING(50),
            allowNull: false,
        },

        appointment_date: {
            // नियुक्तीचा  दिनांक
            type: Sequelize.DATEONLY,
            allowNull: false,
        },

        retirement_date: {
            // नियुक्तीचा  दिनांक
            type: Sequelize.DATEONLY,
            allowNull: true,
        },

        is_retired: {
            type: Sequelize.TINYINT,
            defaultValue: false, 
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        tableName: 'ps_namuna_13',
        timestamps: true,
    }
);

module.exports = ps_namuna_13;
