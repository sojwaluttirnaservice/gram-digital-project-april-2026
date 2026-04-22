const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_27_objection = sequelize.define(
    'ps_namuna_27_objection',
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
            comment: 'Month of the audit report',
        },

        audit_report_year: {
            // लेखापरीक्षण अहवालाचे वर्ष
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Year of the audit report',
        },

        paragraph_number: {
            // लेखापरीक्षण अहवालातील परिच्छेद संख्या
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Paragraph number in the audit report',
        },

        paragraphs_resolved_by_gp: {
            // ग्रामपंचायतीने या महिन्यात पूर्तता केलेल्या परिच्छेदांची संख्या
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Number of paragraphs resolved by the Gram Panchayat this month',
        },

        objections_resolved_by_committee: {
            // पंचायत समितीने आक्षेपाद्वारे मान्य केलेल्या पुर्तातांची संख्या
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Number of objections resolved and approved by the Panchayat Committee',
        },

        objections_resolved_by_auditor: {
            // लेख परीक्षकान्ने ज्या बाबतीत पूर्तता मान्य केलीआहे त्या आक्षेपांची संख्या
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Number of objections resolved as per the auditor',
        },

        pending_objections: {
            // प्रलंबित असलेल्या आक्षेपांची संख्या
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Number of pending objections',
        },

        reasons_for_non_compliance: {
            // पुर्तता न केल्याबद्दलाची कारणे
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Reasons for non-compliance',
        },

        remarks: {
            // शेरा
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Additional remarks',
        },

        // Timestamps
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
        tableName: 'ps_namuna_27_objection',
        timestamps: true,
    }
);

module.exports = ps_namuna_27_objection;
