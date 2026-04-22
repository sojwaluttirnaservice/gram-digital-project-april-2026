const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_patrak_c_a_tax = sequelize.define(
    'ps_n_3_patrak_c_a_tax',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'आइडी (Unique identifier for each record)', // Marathi comment
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            comment: 'वर्ष (Year of the record)',
        },

        property_tax_land_buildings: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'मालमत्ता कर जमिनी व इमारती यावरील कर',
        },

        street_light_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'दिवाबत्ती कर',
        },

        cleanliness_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'स्वच्छता कर',
        },

        shop_industry_hotel_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'दुकाने, लघुउद्योग ग हॉटेल चालविणे यावरील कर',
        },

        travel_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'यात्राकर',
        },

        fair_festival_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'जत्रा, उत्सव, व इतर मनोरंजन कर',
        },

        cycle_vehicle_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'सायकल व इतर वाहनावरील कर',
        },

        toll_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'टोलटॅक्स',
        },

        goods_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'उतारू व मालावरील कर',
        },

        forest_development_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'वनविकास कर',
        },

        service_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'सेवाकर',
        },

        trade_or_occupation_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'व्यापारी किंवा आजीविका यावरील कर (शेतीव्यतिरिक्त)',
        },

        cattle_market_commission_tax: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'गुरांच्या बाजारातील दलालीच्या व्यवसाय व आजीविकेवरील कर',
        },

        other_taxes: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'इतर कर',
        },

        total_tax_1_to_14: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'एकूण (एक) (अ) कर १ ते १४',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'निर्मितीची तारीख',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'अद्यतनाची तारीख',
        },
    },
    {
        tableName: 'ps_n_3_patrak_c_a_tax',
        timestamps: true,
        comment: 'प्रपत्र क (एक)(अ) कर ',
    }
);

module.exports = ps_n_3_patrak_c_a_tax;
