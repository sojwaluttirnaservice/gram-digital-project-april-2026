const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_form_eight_user = sequelize.define(
  "ps_form_eight_user",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    feu_malmattaNo: {
      type: Sequelize.STRING(225),
      allowNull: false,
    },
    feu_oblik_malmatta_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    feu_wardNo: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_homeNo: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },

    feu_aadharNo: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_ownerName: {
      type: Sequelize.STRING(1024),
      allowNull: false,
    },
    feu_secondOwnerName: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_mobileNo: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_gramPanchayet: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },

    feu_villageName: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_gaatNo: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_gharkulYojna: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    feu_havingToilet: {
      type: Sequelize.TEXT("long"),
    },
    feu_areaHeight: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },

    feu_areaWidth: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    // in sq.feet
    feu_totalArea: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    // in sq. meter
    feu_totalAreaSquareMeter: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_eastLandmark: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_westLandmark: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },

    feu_southLandmark: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_northLandmark: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_bojaShera: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_newOldDharak: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_newNewDharak: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },

    feu_newPherfarDate: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_newPherfarTharav: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_newPherfarDocument: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
    feu_image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    feu_created_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    feu_modify_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    feu_image_map: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    feu_water_tax: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },

    home_image_upload_person_user_id: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },

    home_image_upload_person_username: {
      type: Sequelize.STRING(100),
      defaultValue: null,
    },

    home_image_longitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
    },
    home_image_latitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
    },
    home_image_location: {
      type: Sequelize.GEOMETRY("POINT"),
      allowNull: true,
    },

    // 📍 Extra useful fields for better tracking
    home_image_accuracy: {
        type: Sequelize.FLOAT, // in meters
        allowNull: true,
        comment: "GPS accuracy in meters"
    },
    home_image_altitude: {
        type: Sequelize.FLOAT, // in meters
        allowNull: true,
        comment: "Altitude above sea level (meters)"
    },
    home_image_altitude_accuracy: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: "Accuracy of altitude reading (meters)"
    },
    home_image_heading: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: "Device orientation in degrees (0–360)"
    },
    home_image_speed: {
        type: Sequelize.FLOAT,
        allowNull: true,
        comment: "Device movement speed in meters per second"
    },
    home_image_timestamp: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "Timestamp when location was captured"
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },

    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    }
  },
  {
    timestamps: true
  }
);

module.exports = ps_form_eight_user;
