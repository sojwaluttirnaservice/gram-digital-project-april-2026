
const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_j_patrak_masik_sabha = sequelize.define(
    'ps_n_3_j_patrak_masik_sabha',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            comment: 'वर्ष (Year)',
        },

        // ग्रामपंचायतीचे नाव (Name of the Gram Panchayat)
        gram_panchayat_name: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'ग्रामपंचायतीचे नाव (Name of the Gram Panchayat)',
        },

        // एकूण सदस्य संख्या (Total Number of Members)
        total_members: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'एकूण सदस्य संख्या (Total Number of Members)',
        },

        // वर्षात किमान घ्यावयाच्या एकूण सभा (Minimum Total Meetings to Be Held in the Year)
        minimum_meetings_in_year: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'वर्षात किमान घ्यावयाच्या एकूण सभा (Minimum Total Meetings to Be Held in the Year)',
        },

        // वर्षात प्रत्यक्ष घेतलेल्या मासिक सभा (Actual Monthly Meetings Held in the Year)
        actual_monthly_meetings: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'वर्षात प्रत्यक्ष घेतलेल्या मासिक सभा (Actual Monthly Meetings Held in the Year)',
        },

        // कोरम अभावी तहकूब सभा (Postponed Meetings Due to Lack of Quorum)
        postponed_due_to_quorum: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'कोरम अभावी तहकूब सभा (Postponed Meetings Due to Lack of Quorum)',
        },

        // तहकूब सभा पुन्हा घेतल्या किंवा नाही (Were Postponed Meetings Held Again or Not?)
        postponed_meetings_again: {
            type: Sequelize.STRING(20),
            allowNull: true,
            comment: 'तहकूब सभा पुन्हा घेतल्या किंवा नाही (Were Postponed Meetings Held Again or Not?)',
        },

        // महिन्यात किमान १ सभा झाली नसल्यास कोणत्या महिन्यात नाही? न घेतल्याचे कारण (If No Meeting Held in the Month, Which Month and Reason?)
        no_meeting_month_and_reason: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'महिन्यात किमान १ सभा झाली नसल्यास कोणत्या महिन्यात नाही? न घेतल्याचे कारण (If No Meeting Held in the Month, Which Month and Reason?)',
        },

        // मतदार संख्या (Voter Count)
        voter_count: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'मतदार संख्या (Voter Count)',
        },

        // पहिली ग्रामसभा घेतली असल्यास ता. हजर सदस्य (Attendance in First Gram Sabha)
        first_gram_sabha_attendance: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'पहिली ग्रामसभा घेतली असल्यास ता. हजर सदस्य (Attendance in First Gram Sabha)',
        },

        // दुसरी ग्रामसभा घेतली असल्यास ता. हजर सदस्य (Attendance in Second Gram Sabha)
        second_gram_sabha_attendance: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'दुसरी ग्रामसभा घेतली असल्यास ता. हजर सदस्य (Attendance in Second Gram Sabha)',
        },

        // तिसरी ग्रामसभा घेतली असल्यास ता. हजर सदस्य (Attendance in Third Gram Sabha)
        third_gram_sabha_attendance: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'तिसरी ग्रामसभा घेतली असल्यास ता. हजर सदस्य (Attendance in Third Gram Sabha)',
        },

        // प्रत्येक सभेसकोरम होता ? नसल्यास पुन्हा सभा घेतली काय? ता. (Was Quorum Present in Each Meeting? If Not, Was It Reheld?)
        quorum_check_and_reheld: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'प्रत्येक सभेसकोरम होता ? नसल्यास पुन्हा सभा घेतली काय? ता. (Was Quorum Present in Each Meeting? If Not, Was It Reheld?)',
        },

        // शेरा (Notes or Remarks)
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'शेरा (Notes or Remarks)',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'तयार तारीख (Created At)',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'अद्यतन तारीख (Updated At)',
        },
    },
    {
        timestamps: true,
        comment: 'जे पत्रक',
    }
);

module.exports = ps_n_3_j_patrak_masik_sabha;
