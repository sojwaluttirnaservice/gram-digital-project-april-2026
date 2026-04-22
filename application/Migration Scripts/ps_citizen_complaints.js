const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_citizen_complaints = sequelize.define(
  "ps_citizen_complaints",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    formName: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: "",
    },

    formMobile: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    formEmail: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    formAddress: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    formAadhar: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    complaintSubject: {
      type: Sequelize.STRING(400),
      allowNull: false,
    },

    // REQUIRED IMAGE
    // this is actually a saved name not a path
    complaintImageUrl: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    // REQUIRED PDF
    // this is actually a saved name not a path
    complaintDocUrl: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    // NOT REQUIRED, BUT JUST KEEPING FOR THIS SAKE
    garbageVanPicksUpGarbage: {
      // does the van it come or not
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: true,
    },

    // NOT REQUIRED, BUT JUST KEEPING FOR THIS SAKE
    garbageCollectionVanFrequencyByWeek: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },

    // NOT REQUIRED, BUT JUST KEEPING FOR THIS SAKE
    isGarbageProperlyDisposed: {
      type: Sequelize.ENUM("YES", "NO"),
      allowNull: true,
    },

    // REQUIRED LONGITUDE
    imageLongitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: false,
    },

    // REQUIRED LATITUDE
    imageLatitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: false,
    },

    // REQUIRED POINT
    imageLocation: {
      type: Sequelize.GEOMETRY("POINT"),
      allowNull: false,
    },

    complaintResolutionDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    complaintStatus: {
      type: Sequelize.ENUM("PENDING", "ACCEPTED", "RESOLVED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
    },

    //  compulsorey , but intitlaly needs to set null only after resolution)
    // lets say we save the image for the complaitn resolutino then
    complaintResolutionImageUrl: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    complaintResolutionImageLongitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
    },

    // REQUIRED LATITUDE
    complaintResolutionImageLatitude: {
      type: Sequelize.DECIMAL(10, 7),
      allowNull: true,
    },

    // REQUIRED POINT
    complaintResolutionImageLocation: {
      type: Sequelize.GEOMETRY("POINT"),
      allowNull: true,
    },

    complaintResolutionRemark: {
      type: Sequelize.STRING(300),
      allowNull: true,
    },

    // mention rejection date
    complaintRejectionDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    //  (only after rejection)
    rejectionReason: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    // this is teh date when we set the status RESOLVED
    complaintFinalResolutionDate: {
        type: Sequelize.DATE,
      allowNull: true,
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = ps_citizen_complaints;
