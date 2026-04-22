const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_19_employee_list = sequelize.define(
    'ps_namuna_19_employee_list',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        // Name (नाव)
        name: {
            type: Sequelize.STRING(100), // नाव
            allowNull: false,
        },

        // Post Name (पदाचे नाव)
        post_name: {
            type: Sequelize.STRING(100), // पदाचे नाव
            allowNull: false,
        },

        // Post ID (पद क्रमांक)
        post_id: {
            type: Sequelize.INTEGER, // पद क्रमांक
            allowNull: true,
        },

        // Mobile Number (मोबाइल क्रमांक)
        mobile: {
            type: Sequelize.STRING(13), // मोबाइल क्रमांक
            allowNull: false,
            validate: {
                is: /^[0-9]{10,13}$/, // Validating mobile number format
            },
        },

        // Address (पत्ता)
        address: {
            type: Sequelize.TEXT, // पत्ता
            allowNull: false,
        },

        // Gender (लिंग)
        gender: {
            type: Sequelize.ENUM('Male', 'Female', 'Other'), // लिंग: पुरुष, महिला, इतर
            allowNull: false,
        },

        // SHARE OF THE SALARY THE STATE PAYS TO THE EMPLOYEE
        state_share: {
            type: Sequelize.DECIMAL(10, 2), //
            allowNull: true,
        },

        // PERCENTAGE OF CUT OF THE SALARY THE STATE TAKES E.G.
        pf_cutting_percentage: {
            type: Sequelize.DECIMAL(10, 2), //
            allowNull: true,
        },

        //SHARE OF THE SALARY THAT THE GRAMPANCHAYAT PAYS
        grampanchayat_share: {
            type: Sequelize.DECIMAL(10, 2), //
            allowNull: true,
        },

        // Monthly Salary (मासिक पगार)
        monthly_salary: {
            type: Sequelize.DECIMAL(10, 2), // मासिक पगार
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

module.exports = ps_namuna_19_employee_list;
