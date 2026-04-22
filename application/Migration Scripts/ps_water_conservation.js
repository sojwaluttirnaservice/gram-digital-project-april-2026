const { INTEGER, STRING, BIGINT, TEXT, FLOAT, DATE, literal, DOUBLE } = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_water_conservation = sequelize.define(
    'ps_water_conservation',
    {
        id: {
            type: BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        structure_name: {
            type: STRING,
            allowNull: false,
            comment: 'Name of the water conservation structure (e.g., bund)',
        },

        village_name: {
            type: STRING,
            allowNull: true,
            comment: 'Name of the village where the structure is located',
        },

        //Optional 
        taluka_name: {
            type: STRING,
            allowNull: true,
            comment: 'Name of the taluka/block (optional)',
        },

        structure_length_m: {
            type: STRING,
            allowNull: false,
            comment: 'Length of the structure in meters',
        },

        storage_capacity_cubic_m: {
            type: STRING,
            allowNull: true,
            comment: 'Water storage capacity in cubic meters',
        },

        //Optional 
        description: {
            type: TEXT,
            allowNull: true,
            comment: 'Additional details or remarks about the structure',
        },
        //Optional 
        contact_mobile: {
            type: STRING,
            allowNull: true,
            comment: 'Mobile number of the contact person',
        },

        //Optional 
        geo_latitude: {
            type: DOUBLE,
            allowNull: true,
            comment: 'Latitude for geolocation',
        },
        //Optional 
        geo_longitude: {
            type: DOUBLE,
            allowNull: true,
            comment: 'Longitude for geolocation',
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        timestamps: true,
        tableName: 'ps_water_conservation',
        comment: 'जल संधारण - Water conservation structure information',
    }
);

module.exports = ps_water_conservation;