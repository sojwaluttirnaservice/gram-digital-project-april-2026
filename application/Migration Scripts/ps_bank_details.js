const { INTEGER, STRING, DATE, TEXT, ENUM, literal, TINYINT, BIGINT, Sequelize } = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_bank_details = sequelize.define(
    'ps_bank_details',
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'Primary Key - Bank Details ID',
        },

        reference_id: {
            type: INTEGER,
            allowNull: true,
            comment: 'Reference ID (citizen/vendor/user depending on system)',
        },

        account_holder_name: {
            type: STRING(200),
            allowNull: false,
            comment: 'Name of the bank account holder',
        },

        father_or_husband_name: {
            type: STRING(200),
            allowNull: true,
            comment: 'Father or Husband name of account holder',
        },

        mobile_number: {
            type: STRING(15),
            allowNull: true,
            comment: 'Registered mobile number',
        },

        email: {
            type: STRING(150),
            allowNull: true,
            comment: 'Email ID of account holder',
        },

        address: {
            type: TEXT,
            allowNull: true,
            comment: 'Residential address',
        },

        village: {
            type: STRING(150),
            allowNull: true,
            comment: 'Village name',
        },

        taluka: {
            type: STRING(150),
            allowNull: true,
            comment: 'Taluka name',
        },

        district: {
            type: STRING(150),
            allowNull: true,
            comment: 'District name',
        },

        state: {
            type: STRING(150),
            allowNull: true,
            comment: 'State name',
        },

        pincode: {
            type: STRING(10),
            allowNull: true,
            comment: 'Postal PIN code',
        },

        bank_name: {
            type: STRING(200),
            allowNull: false,
            comment: 'Name of the bank',
        },

        branch_name: {
            type: STRING(200),
            allowNull: true,
            comment: 'Bank branch name',
        },

        account_number: {
            type: STRING(30),
            allowNull: false,
            comment: 'Bank account number',
        },

        account_balance: {
            type: BIGINT,
            allowNull: false,
            defaultValue: 0,
            comment: 'Bank account balance',
        },

        account_offline_amount: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },

        // keep initial as zero
        last_outstanding_amount: {
            type: BIGINT,
            allowNull: true,
            defaultValue: 0,
        },

        fd_amount: {
            type: BIGINT,
            allowNull: true,
            defaultValue: 0,
        },

        ifsc_code: {
            type: STRING(20),
            allowNull: false,
            comment: 'Bank IFSC code',
        },

        account_type: {
            type: ENUM('SAVING', 'CURRENT'),
            allowNull: false,
            defaultValue: 'SAVING',
            comment: 'Type of bank account',
        },

        upi_id: {
            type: STRING(150),
            allowNull: true,
            comment: 'UPI ID linked to bank account',
        },

        aadhar_number: {
            type: STRING(20),
            allowNull: true,
            comment: 'Aadhar card number',
        },

        pan_number: {
            type: STRING(20),
            allowNull: true,
            comment: 'PAN card number',
        },

        voter_id_number: {
            type: STRING(50),
            allowNull: true,
            comment: 'Voter ID number',
        },

        ration_card_number: {
            type: STRING(50),
            allowNull: true,
            comment: 'Ration card number',
        },

        aadhar_card_file: {
            type: STRING(500),
            allowNull: true,
            comment: 'Uploaded Aadhar card document path',
        },

        pan_card_file: {
            type: STRING(500),
            allowNull: true,
            comment: 'Uploaded PAN card document path',
        },

        passbook_image: {
            type: STRING(500),
            allowNull: true,
            comment: 'Bank passbook first page image',
        },

        cancelled_cheque_image: {
            type: STRING(500),
            allowNull: true,
            comment: 'Cancelled cheque image',
        },

        photo: {
            type: STRING(500),
            allowNull: true,
            comment: 'Passport size photo of account holder',
        },

        verification_status: {
            type: ENUM('PENDING', 'VERIFIED', 'REJECTED'),
            allowNull: false,
            defaultValue: 'VERIFIED',
            comment: 'KYC verification status',
        },

        verified_by: {
            type: INTEGER,
            allowNull: true,
            comment: 'User ID who verified the bank details',
        },

        verified_at: {
            type: DATE,
            allowNull: true,
            comment: 'Verification date',
        },

        remarks: {
            type: TEXT,
            allowNull: true,
            comment: 'Additional remarks or rejection reason',
        },

        category: {
            //  oru ohter samanay is 1, and pani is 2
            type: ENUM('SAMANYA', 'PANI', 'POST_OFFICE'),
            allowNull: false,
            comment: 'Category of the bank account holder',
        },

        is_active: {
            type: TINYINT,
            defaultValue: 1,
            comment: 'Indicates whether the bank record is active',
        },

        createdAt: {
            type: DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'Record creation time',
        },

        updatedAt: {
            type: DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'Record last update time',
        },
    },
    {
        timestamps: true,
        tableName: 'ps_bank_details',
        comment: 'Bank Account Holder and KYC Details Table',
    }
)

module.exports = ps_bank_details