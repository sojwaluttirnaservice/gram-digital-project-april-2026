const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_28 = sequelize.define(
    'ps_namuna_28', // Table name
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: "Each record's unique identifier. / प्रत्येक रेकॉर्डसाठीचा अद्वितीय ओळखकर्ता.", // Unique identifier for each record.
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
            comment: 'Month of the record. / रेकॉर्डचा महिना.', // The month of the record.
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Year of the record. / रेकॉर्डचा वर्ष.', // The year of the record.
        },

        // Provision for Backward Classes 15%
        bc_15_provision: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Provision made for Backward Classes 15%. / मागासवर्गीयांसाठी १५% साठी केलेली तरतूद.', // Provision made for Backward Classes 15%.
        },

        bc_15_income: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'Income from Backward Classes 15%. / मागासवर्गीयांसाठी १५% मधील उत्पन्न.', // Income from Backward Classes 15%.
        },

        bc_15_exp_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Amount to be spent for Backward Classes 15%. / मागासवर्गीयांसाठी १५% खर्च करावयाची रक्कम.', // Amount to be spent for Backward Classes 15%.
        },

        // bc_15_expenditure: {
        //     type: Sequelize.DECIMAL(15, 2),
        //     allowNull: true,
        //     comment:
        //         'Total expenditure for Backward Classes 15%. / मागासवर्गीयांसाठी १५% साठी एकूण खर्च.', // Total expenditure for Backward Classes 15%.
        // },

        bc_15_expenditure_scheme: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure on schemes for Backward Classes 15%. / मागासवर्गीयांसाठी १५% योजनांवरील खर्च.', // Expenditure on schemes for Backward Classes 15%.
        },

        bc_15_expenditure_prev_month: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure for Backward Classes 15% in the previous month. / मागासवर्गीयांसाठी १५% मध्ये मागील महिन्यात केलेला खर्च.', // Expenditure for Backward Classes 15% in the previous month.
        },

        bc_15_expenditure_current_month: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure for Backward Classes 15% in the current month. / मागासवर्गीयांसाठी १५% मध्ये चालू महिन्यात केलेला खर्च.', // Expenditure for Backward Classes 15% in the current month.
        },

        bc_15_total_expenditure: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Total expenditure for Backward Classes 15%. / मागासवर्गीयांसाठी १५% मध्ये एकूण खर्च.', // Total expenditure for Backward Classes 15%.
        },

        bc_15_expenditure_percentage: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: true,
            comment:
                'Expenditure percentage for Backward Classes 15%. / मागासवर्गीयांसाठी १५% खर्चाची टक्केवारी.', // Expenditure percentage for Backward Classes 15%.
        },

        bc_15_remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Additional remarks for Backward Classes 15%. / मागासवर्गीयांसाठी १५% साठी अतिरिक्त शेरा.', // Additional remarks for Backward Classes 15%.
        },

        // Provision for Women and Child Welfare 10%
        wc_10_provision: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Provision made for Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% साठी केलेली तरतूद.', // Provision made for Women and Child Welfare 10%.
        },

        wc_10_income: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Income from Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% उत्पन्न.', // Income from Women and Child Welfare 10%.
        },

        wc_10_exp_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Amount to be spent for Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% खर्च करावयाची रक्कम.', // Amount to be spent for Women and Child Welfare 10%.
        },

        // wc_10_expenditure: {
        //     type: Sequelize.DECIMAL(15, 2),
        //     allowNull: true,
        //     comment:
        //         'Total expenditure for Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% एकूण खर्च.', // Total expenditure for Women and Child Welfare 10%.
        // },

        wc_10_expenditure_scheme: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure on schemes for Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% योजनांवरील खर्च.', // Expenditure on schemes for Women and Child Welfare 10%.
        },

        wc_10_expenditure_prev_month: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure for Women and Child Welfare 10% in the previous month. / महिला आणि बालकल्याणासाठी १०% मागील महिन्यात खर्च.', // Expenditure for Women and Child Welfare 10% in the previous month.
        },

        wc_10_expenditure_current_month: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure for Women and Child Welfare 10% in the current month. / महिला आणि बालकल्याणासाठी १०% चालू महिन्यात खर्च.', // Expenditure for Women and Child Welfare 10% in the current month.
        },

        wc_10_total_expenditure: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Total expenditure for Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% एकूण खर्च.', // Total expenditure for Women and Child Welfare 10%.
        },

        wc_10_expenditure_percentage: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: true,
            comment:
                'Expenditure percentage for Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% खर्चाची टक्केवारी.', // Expenditure percentage for Women and Child Welfare 10%.
        },

        wc_10_remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Additional remarks for Women and Child Welfare 10%. / महिला आणि बालकल्याणासाठी १०% साठी अतिरिक्त शेरा.', // Additional remarks for Women and Child Welfare 10%.
        },

        // Provision for Disability Welfare 3%
        dw_5_provision: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Provision made for Disability Welfare 3%. / अपंग कल्याणासाठी ३% साठी केलेली तरतूद.', // Provision made for Disability Welfare 3%.
        },

        dw_5_income: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment: 'Income from Disability Welfare 3%. / अपंग कल्याणासाठी ३% उत्पन्न.', // Income from Disability Welfare 3%.
        },

        dw_5_exp_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Amount to be spent for Disability Welfare 3%. / अपंग कल्याणासाठी ३% खर्च करावयाची रक्कम.', // Amount to be spent for Disability Welfare 3%.
        },

        // dw_5_expenditure: {
        //     type: Sequelize.DECIMAL(15, 2),
        //     allowNull: true,
        //     comment:
        //         'Total expenditure for Disability Welfare 3%. / अपंग कल्याणासाठी ३% एकूण खर्च.', // Total expenditure for Disability Welfare 3%.
        // },

        dw_5_expenditure_scheme: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure on schemes for Disability Welfare 3%. / अपंग कल्याणासाठी ३% योजनांवरील खर्च.', // Expenditure on schemes for Disability Welfare 3%.
        },

        dw_5_expenditure_prev_month: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure for Disability Welfare 3% in the previous month. / अपंग कल्याणासाठी ३% मागील महिन्यात खर्च.', // Expenditure for Disability Welfare 3% in the previous month.
        },

        dw_5_expenditure_current_month: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Expenditure for Disability Welfare 3% in the current month. / अपंग कल्याणासाठी ३% चालू महिन्यात खर्च.', // Expenditure for Disability Welfare 3% in the current month.
        },

        dw_5_total_expenditure: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: true,
            comment:
                'Total expenditure for Disability Welfare 3%. / अपंग कल्याणासाठी ३% एकूण खर्च.', // Total expenditure for Disability Welfare 3%.
        },

        dw_5_expenditure_percentage: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: true,
            comment:
                'Expenditure percentage for Disability Welfare 3%. / अपंग कल्याणासाठी ३% खर्चाची टक्केवारी.', // Expenditure percentage for Disability Welfare 3%.
        },

        dw_5_remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Additional remarks for Disability Welfare 3%. / अपंग कल्याणासाठी ३% साठी अतिरिक्त शेरा.', // Additional remarks for Disability Welfare 3%.
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Creation timestamp of the record. / रेकॉर्ड निर्माण करण्याचा वेळ.', // Creation timestamp of the record.
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Last update timestamp of the record. / रेकॉर्डमधील शेवटचा बदल वेळ.', // Last update timestamp of the record.
        },
    },
    {
        tableName: 'ps_namuna_28', // The name of the table in the database.
        timestamps: true, // Enable automatic tracking of createdAt and updatedAt.
    }
);

module.exports = ps_namuna_28;
