const { INTEGER, STRING, BIGINT, BOOLEAN, DATE, literal, ENUM } = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_aanganwadi_centers = sequelize.define(
    'ps_aanganwadi_centers',
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            comment: 'प्राथमिक की (Primary Key)',
        },

        center_name: {
            type: STRING,
            allowNull: false,
            comment: 'अंगणवाडी केंद्राचे नाव (Aanganwadi Center Name)',
        },

        center_number: {
            type: STRING,
            allowNull: false,
            // unique: true,
            comment: 'अंगणवाडी केंद्र क्रमांक (Aanganwadi Center Number)',
        },

        village_name: {
            type: STRING,
            allowNull: false,
            comment: 'गावाचे नाव (Village Name)',
        },

        has_toilet: {
            type: ENUM('AVAILABLE', 'UNAVAILABLE'),
            allowNull: false,
            defaultValue: 'UNAVAILABLE',
            comment: 'शौचालय उपलब्ध आहे का? (Toilet Available)',
        },

        has_kitchen_shed: {
            type: ENUM('AVAILABLE', 'UNAVAILABLE'),
            allowNull: false,
            defaultValue: 'UNAVAILABLE',
            comment: 'किचन शेड उपलब्ध आहे का? (Kitchen Shed Available)',
        },

        createdAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'निर्मितीची तारीख (Creation Timestamp)',
        },

        updatedAt: {
            type: DATE,
            defaultValue: literal('CURRENT_TIMESTAMP'),
            comment: 'शेवटचा अद्यतन (Last Updated Timestamp)',
        },
    },
    {
        timestamps: true,
        comment: 'अंगणवाडी केंद्र माहिती (Aanganwadi Center Information)',
    }
);

module.exports = ps_aanganwadi_centers;
