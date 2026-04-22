const Sequelize = require('sequelize');

const sequelize = require('../config/db-connect-migration');

const ps_under_18_marriages_avahal = sequelize.define(
  `ps_under_18_marriages_avahal`,
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //not null remaining for all below
    name_of_under_18_married_girl: { type: Sequelize.STRING, allowNull: false },
    address_of_under_18_married_girl: {
      type: Sequelize.STRING,
      allowNull: false
    },

    name_of_father_or_guardian_of_girl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address_of_father_or_guardian_of_girl: {
      type: Sequelize.STRING,
      allowNull: false
    },

    birthdate_of_girl: { type: Sequelize.STRING, allowNull: false },
    // time_of_marriage_of_girl: { type: Sequelize.STRING, allowNull: false },
    age_of_girl_at_marriage: { type: Sequelize.STRING, allowNull: false },
    education_of_girl: { type: Sequelize.STRING, allowNull: false },

    date_of_marriage: { type: Sequelize.STRING, allowNull: false },
    place_of_marriage: { type: Sequelize.STRING, allowNull: false },

    name_of_groom: { type: Sequelize.STRING, allowNull: false },
    name_of_father_or_guardian_of_groom: {
      type: Sequelize.STRING,
      allowNull: false
    },

    address_of_groom: { type: Sequelize.STRING, allowNull: false },
    address_of_father_or_guardian_of_groom: {
      type: Sequelize.STRING,
      allowNull: false
    },

    birthdate_of_groom: { type: Sequelize.STRING, allowNull: false },
    age_of_groom_at_marriage: { type: Sequelize.STRING, allowNull: false },

    //भटजी
    name_of_bhataji: { type: Sequelize.STRING, allowNull: false },
    address_of_bhataji: { type: Sequelize.STRING, allowNull: false },

    // मंगल कार्यालयाचे व्यवस्थापकाचे नाव
    name_of_office_manager: { type: Sequelize.STRING, allowNull: false },
    address_of_office: { type: Sequelize.STRING, allowNull: false },

    name_of_wedding_card_printing_house: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name_of_owner_of_wedding_card_printing_house: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address_of_wedding_card_printing_house: {
      type: Sequelize.STRING,
      allowNull: false
    },

    // shera
    shera: { type: Sequelize.STRING, allowNull: false },

    // month and year
    month: { type: Sequelize.INTEGER, allowNull: false },
    year: { type: Sequelize.INTEGER, allowNull: false }
  },
  {
    createdAt: false,
    modifiedAt: false
  }
);

module.exports = ps_under_18_marriages_avahal;
