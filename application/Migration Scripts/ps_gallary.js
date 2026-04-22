const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_gallary = sequelize.define(
  "ps_gallary",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    g_image_name: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },

    g_image_title: {
       type: Sequelize.STRING(250),
       allowNull: true,
    },

    g_image_desc: {
        type: Sequelize.STRING, 
        allowNull: true,
    },

    g_image_for: {
        type: Sequelize.ENUM( "गॅलरी","विकासकामे", "नाविन्यपूर्ण उपक्रम"),
        defaultValue: "गॅलरी"
    }
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_gallary;
