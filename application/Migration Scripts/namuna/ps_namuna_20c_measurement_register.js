const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_20c_measurement_register = sequelize.define(
    'ps_namuna_20c_measurement_register',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'Primary key',
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
            comment: 'Month of the record',
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Year of the record',
        },

        measurement: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Description of the work',
        },

        work_description: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Description of the work',
        },

        subhead: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Subhead of the work (if applicable)',
        },

        sector_authority_name: {
            type: Sequelize.STRING,
            allowNull: true,
            comment: 'Name of the sector authority (if applicable)',
        },

        unit: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Quantity measurement unit',
        },

        height: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Height of the work measured',
        },

        length: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Length of the work measured',
        },

        width: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Width of the work measured',
        },

        depth_or_elevation: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Depth or elevation of the work measured',
        },

        total: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Total calculated',
        },

        total_measurement: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Total measurement (calculated)',
        },

        total_quantity: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Total quantity or measurement (based on previous attendance register)',
        },

        grand_total: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Grand total (column 7 + column 9)',
        },

        rate: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Rate for the work done',
        },

        amount: {
            type: Sequelize.FLOAT,
            allowNull: true,
            comment: 'Amount calculated based on rate and measurement',
        },

        remarks: {
            type: Sequelize.TEXT,
            allowNull: true,
            comment: 'Additional remarks or notes',
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
        tableName: 'ps_namuna_20c_measurement_register',
        timestamps: true,
    }
);

module.exports = ps_namuna_20c_measurement_register;
