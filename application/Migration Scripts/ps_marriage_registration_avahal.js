const Sequelize = require('sequelize');
const sequelize = require('../config/db-connect-migration');

const ps_marriage_registration_avahal = sequelize.define(
  'ps_marriage_registration_avahal',
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    date_of_reciept_of_marriage_info: { type: Sequelize.STRING },
    date_of_marriage: { type: Sequelize.STRING },
    place_of_marriage: { type: Sequelize.STRING },

    full_name_of_groom: { type: Sequelize.STRING },
    age_of_groom: { type: Sequelize.STRING },
    place_of_groom: { type: Sequelize.STRING },

    full_name_of_bride: { type: Sequelize.STRING },
    age_of_bride: { type: Sequelize.STRING },
    place_of_bride: { type: Sequelize.STRING },

    religion_of_groom: { type: Sequelize.STRING },
    religion_of_bride: { type: Sequelize.STRING },

    nationality_of_groom: { type: Sequelize.STRING },
    nationality_of_bride: { type: Sequelize.STRING },

    full_name_of_father_or_parent_of_groom: { type: Sequelize.STRING },
    full_name_of_father_or_parent_of_bride: { type: Sequelize.STRING },

    bride_father_address: { type: Sequelize.STRING },

    name_of_informant: { type: Sequelize.STRING },

    shera: { type: Sequelize.STRING },

    month: { type: Sequelize.INTEGER },
    year: { type: Sequelize.INTEGER }
  },
  {
    createdAt: false,
    modifiedAt: false
  }
);

module.exports = ps_marriage_registration_avahal;
