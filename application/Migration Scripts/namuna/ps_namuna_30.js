const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_30 = sequelize.define(
    'ps_namuna_30',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary Key - क्रमांक',
        },

        // महिना
        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
            comment: 'Month of the audit - महिना',
        },

        // Audit Report Details (लेखापरीक्षण अहवालाचे तपशील)
        audit_report_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Year of the audit report - लेखापरीक्षण अहवालाचे वर्ष',
        },
        report_received_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            comment:
                'Date the audit report was received - लेखापरीक्षण अहवाल प्राप्त झाल्याचा दिनांक',
        },

        // Objection Details (आक्षेप तपशील)
        objection_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Count of objections in the report - अहवालातील आक्षेपांची संख्या',
        },
        objection_sequence: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Sequence of objections in the report - अहवालातील आक्षेपांची अनुक्रमांक',
        },

        // Information-Only Objections (केवळ माहितीसाठी असणारे आक्षेप)
        info_only_objection_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment:
                'Count of objections meant for information only - केवळ माहितीसाठी असणाऱ्या आक्षेपांची संख्या',
        },
        info_only_objection_sequence: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Sequence of objections meant for information only - केवळ माहितीसाठी असणाऱ्या आक्षेपांची अनुक्रमांक',
        },

        // Objections to Resolve (पूर्तता करावयाचे आक्षेप)
        resolve_objection_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Count of objections to resolve - पूर्तता करावयाच्या आक्षेपांची संख्या',
        },
        resolve_objection_sequence: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Sequence of objections to resolve - पूर्तता करावयाच्या आक्षेपांची अनुक्रमांक',
        },

        // Resolved Objections Sent to Panchayat Samiti (पूर्तता केलेले आक्षेप पंचायत समितीने जि.प. कडे / लेखा परीक्षाकडे पाठविलेल्याचा ठराव क्रमांक)
        resolved_objection_outward_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Outward number of resolved objections sent to Panchayat Samiti - पाठवलेले आक्षेप क्रमांक',
        },

        // / Resolved Objections Sent to Panchayat Samiti (पूर्तता केलेले आक्षेप पंचायत समितीने जि.प. कडे / लेखा परीक्षाकडे पाठविलेल्याचा जावक क्रमांक दिनांक)
        resolved_objection_outward_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment:
                'Date of resolved objections sent to Panchayat Samiti - पाठवलेले आक्षेप दिनांक',
        },

        // Resolution passed and outward number/date of objections forwarded to Zilla Parishad/Auditor
        resolution_forwarded_number: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Resolution number of objections forwarded by Panchayat Samiti to Zilla Parishad/Auditor - पंचायत समितीने जि. प. कडे पाठविलेल्या ठराव क्रमांक',
        },
        resolution_forwarded_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment:
                'Date of objections forwarded by Panchayat Samiti to Zilla Parishad/Auditor - पंचायत समितीने जि. प. कडे पाठविलेल्याचा जावक क्र. दिनांक',
        },

        // Approval Details (मंजुरी तपशील)
        zp_approved_objection_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Count of approved objections by ZP/Auditor - मंजूर आक्षेपांची संख्या',
        },
        zp_approved_objection_sequence: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Sequence of approved objections by ZP/Auditor - मंजूर आक्षेपांची अनुक्रमांक',
        },

        // Objection Resolution Subcategories (आक्षेप निवारण उपश्रेणी)
        book_adjustment_details: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Details of book adjustments - पुस्तकी समायोजन',
        },
        recovery_details: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Details of recovery - वसुली',
        },
        assessment_details: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Details of assessment - मूल्यांकन',
        },
        irregularity_details: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Details of irregularities - नियमबाह्य',
        },

        // Total Remaining Objections (एकूण शिल्लक आक्षेप)
        total_remaining_objection_count: {
            type: Sequelize.INTEGER,
            allowNull: true,
            comment: 'Total count of remaining objections - एकूण शिल्लक आक्षेप संख्या',
        },
        total_remaining_objection_sequence: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Sequence of remaining objections - एकूण शिल्लक आक्षेप अनुक्रमांक',
        },

        // Remarks (शेरा)
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'Additional remarks or comments - शेरा',
        },

        // Metadata
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
        timestamps: true,
        tableName: 'ps_namuna_30',
        comment: 'नमुना ३० ग्रामपंचायत लेखापरीक्षण आक्षेप पूर्तता नोंदवही',
    }
);

module.exports = ps_namuna_30;
