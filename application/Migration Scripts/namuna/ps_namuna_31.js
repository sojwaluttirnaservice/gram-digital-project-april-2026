const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_31 = sequelize.define(
    'ps_namuna_31',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        month: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        // **व्यक्तिगत माहिती (Personal Information)**

        name_of_person: {
            type: Sequelize.STRING(255),
            allowNull: false, // व्यक्तीचे नाव (e.g., सरपंच, सदस्य)
        },

        office_location: {
            type: Sequelize.STRING(255),
            allowNull: true, // कार्यालयाचे ठिकाण (Office location)
        },

        // **कार्यालयीन प्रवासाचा तपशील (Office Travel Details)**

        // 1. **निगमन (Departure)**
        departure_place: {
            type: Sequelize.STRING(255),
            allowNull: true, // निगमन ठिकाण (Departure Place)
        },

        departure_date: {
            type: Sequelize.DATEONLY,
            allowNull: true, // निगमन तारीख (Departure Date)
        },

        departure_time: {
            type: Sequelize.TIME,
            allowNull: true, // निगमन वेळ (Departure Time)
        },

        // 2. **आगमन (Arrival)**
        arrival_place: {
            type: Sequelize.STRING(255),
            allowNull: true, // आगमन ठिकाण (Arrival Place)
        },

        arrival_date: {
            type: Sequelize.DATEONLY,
            allowNull: true, // आगमन तारीख (Arrival Date)
        },

        arrival_time: {
            type: Sequelize.TIME,
            allowNull: true, // आगमन वेळ (Arrival Time)
        },

        // **प्रवासाचे साधन (Means of Travel)**
        means_of_travel: {
            type: Sequelize.STRING(255),
            allowNull: true, // प्रवासाचे साधन (e.g., रेल्वे, बोट, रस्त्याने)
        },

        // **रेल्वे/बोटीचे नाव (Rail/Boat Name)**
        rail_boat_name_class: {
            type: Sequelize.STRING(255),
            allowNull: true, // रेल्वे किंवा बोटीचे नाव
        },

        // **तिकिटांची संख्या (Ticket Count)**
        ticket_count: {
            type: Sequelize.INTEGER,
            allowNull: true, // प्रवासाचे तिकीटांची संख्या
        },

        // **तिकिटांची रक्कम (Ticket Amount)**
        ticket_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // तिकीटांची रक्कम
        },

        // **रस्त्याने केलेला प्रवास (Road Travel)**
        road_distance_km: {
            type: Sequelize.INTEGER,
            allowNull: true, // रस्त्याने केलेला प्रवास (किमी)
        },

        road_rate_per_km: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // रस्त्याचे दर (प्रति किलोमीटर)
        },

        road_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // रस्त्याने प्रवासाची रक्कम
        },

        // **दैनिक भत्ता (Daily Allowance)**
        daily_allowance_days: {
            type: Sequelize.INTEGER,
            allowNull: true, // भत्ता मिळालेल्या दिवसांची संख्या
        },

        daily_allowance_rate: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // दैनिक भत्ता दर
        },

        daily_allowance_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // दैनिक भत्त्याची एकूण रक्कम
        },

        // **प्रवासाचे कारण (Reason for Travel)**
        travel_reason: {
            type: Sequelize.STRING(255),
            allowNull: true, // प्रवासाचे कारण
        },

        // **सर्वेक्षणाची एकूण रक्कम (Total Travel Amount)**
        // प्रत्येक स्तंभाची बेरीज
        total_travel_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // प्रवासाची एकूण रक्कम
        },

        // **शेरा (Remarks)**
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true, // अतिरिक्त शेरा किंवा टिप्पणी
        },

        // **Created and Updated Timestamps**
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
    }
);

module.exports = ps_namuna_31;
