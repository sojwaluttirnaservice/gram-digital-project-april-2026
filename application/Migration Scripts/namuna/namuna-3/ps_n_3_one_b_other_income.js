const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_one_b_other_income = sequelize.define(
    'ps_n_3_one_b_other_income',
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
            unique: true
        },

        // Converting each heading to a column name in snake_case
        market_fee: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Market Fee (बाजार फी)'
        },

        tanga_stand_fee: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Tanga Stand Fee (टांगा स्टँड फी)'
        },

        car_stand_fee: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Car Stand Fee (कार स्टँड फी)'
        },

        water_tax: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Water Tax (पाणी पट्टी)'
        },

        cleanliness_fee: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Cleanliness Fee (स्वच्छता फी)'
        },

        cow_grazing_fee: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Cow Grazing Fee (गाय चरण फी)'
        },

        dvdf_interest_2_5_percent: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'DVDF Interest 2.5% (डी.व्ही.डी. एफ व्याज २.५ टक्के)'
        },

        land_rent: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Land Rent (जमीन भाडे पट्टी)'
        },

        interest_deposit: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Interest Deposit (व्याज जमा)'
        },

        land_rent_deposit: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Land Rent Deposit (जागा भाडे)'
        },

        kondwada_deposit: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Kondwada Deposit (कोंडवाडा जमा)'
        },

        donation: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Donation (देणगी)'
        },

        other_deposits: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Other Deposits (इतर जमा)'
        },

        total_other_income: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Total Other Income (एकूण (एक) (ब) करेत्तर उत्त्पन्न १ ते १३ = १४)'
        },

        total_income_1_2: {
            type: Sequelize.DECIMAL,
            allowNull: true,
            comment: 'Total Income (1 + 2) (१) (अ + ब ) एकूण'
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
        timestamps: true,
        comment: 'एक (ब) करेत्तर उत्त्पन्न'
    }
);

module.exports = ps_n_3_one_b_other_income;
