const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_medical_room = sequelize.define('ps_medical_room', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    authority_person_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        defaultValue:  Sequelize.fn('NOW')
    },
    updatedAt: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        defaultValue:  Sequelize.fn('NOW')
    },
});

module.exports = ps_medical_room;
