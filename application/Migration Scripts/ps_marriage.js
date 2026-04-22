const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_marriage = sequelize.define(
  "ps_marriage",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // Name
    marriageHusbandNameE: {
      type: Sequelize.STRING(225),
    },

    marriageHusbandNameM: {
      type: Sequelize.STRING(225),
    },

    // mobile
    marriageHusbandMobileE: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },
    marriageHusbandMobileM: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },

    // adhar
    marriageHusbandAadharE: {
      type: Sequelize.STRING(20),
    },

    marriageHusbandAadharM: {
      type: Sequelize.STRING(20),
    },

    // address
    marriageHusbandAddressE: {
      type: Sequelize.STRING(255),
    },

    marriageHusbandAddressM: {
      type: Sequelize.STRING(255),
    },

    // father
    marriageHusbandFatherNameE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandFatherNameM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    // religion

    marriageHusbandReligionE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandReligionM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    // nationality
    marriageHusbandNationalityE: {
      type: Sequelize.STRING(40),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandNationalityM: {
      type: Sequelize.STRING(40),
      allowNull: true,
      defaultValue: "",
    },

    // NEW HUSBAND FIELDS

    // ================= GROOM ADDITIONAL DETAILS =================

    marriageHusbandDobE: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandDobM: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandAge: {
      type: Sequelize.STRING(10),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandOccupationE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandOccupationM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandMaritalStatusE: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandMaritalStatusM: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    // Birth Proof
    marriageHusbandBirthProofType: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandBirthProofFile: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: "",
    },

    // ID Proof
    marriageHusbandIdProofType: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandIdProofFile: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: "",
    },

    // Address Proof
    marriageHusbandAddressProofType: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageHusbandAddressProofFile: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: "",
    },

    // DONE HSUBAND FIELDS

    // ===== WIFE INPUT FIELDS =====

    marriageWifedNameE: {
      type: Sequelize.STRING(225),
    },

    marriageWifeNameM: {
      type: Sequelize.STRING(225),
    },

    // -----------------------------
    // ADDITIONAL WIFE INFO (Mobile)
    // -----------------------------

    marriageWifeMobileE: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeMobileM: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifedAadharE: {
      type: Sequelize.STRING(225),
    },

    marriageWifeAadharM: {
      type: Sequelize.STRING(225),
    },

    marriageWifeAddressE: {
      type: Sequelize.STRING(225),
    },

    marriageWifeAddressM: {
      type: Sequelize.STRING(225),
    },

    marriageWifeFatherNameE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeFatherNameM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeReligionE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeReligionM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeNationalityE: {
      type: Sequelize.STRING(40),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeNationalityM: {
      type: Sequelize.STRING(40),
      allowNull: true,
      defaultValue: "",
    },

    // ================= BRIDE ADDITIONAL DETAILS =================

    marriageWifeDobE: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeDobM: {
      type: Sequelize.STRING(20),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeAge: {
      type: Sequelize.STRING(10),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeOccupationE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeOccupationM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeMaritalStatusE: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeMaritalStatusM: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    // Birth Proof
    marriageWifeBirthProofType: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeBirthProofFile: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: "",
    },

    // ID Proof
    marriageWifeIdProofType: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeIdProofFile: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: "",
    },

    // Address Proof
    marriageWifeAddressProofType: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageWifeAddressProofFile: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: "",
    },

    // // -----------------------------
    // MARRIAGE TYPE
    // -----------------------------

    marriageTypeE: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    marriageTypeM: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: "",
    },

    // -----------------------------
    // MANGAL KARYALAY DETAILS
    // -----------------------------

    marriageHallNameE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHallNameM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHallAddressE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHallAddressM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageHallPhoto: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },
    // wedding photos

    // ================= WEDDING PHOTOS =================

    marriageWeddingPhotos: {
      type: Sequelize.JSON,
      allowNull: true,
    },

    marriageDate: {
      type: Sequelize.STRING(225),
    },

    marriageDateM: {
      type: Sequelize.STRING(255),
    },

    marriageVolume: {
      type: Sequelize.STRING(225),
    },

    marriageVolumeM: {
      type: Sequelize.STRING(255),
    },

    marriageAnuKramank: {
      type: Sequelize.STRING(225),
    },

    marriageAnuKramankM: {
      type: Sequelize.STRING(225),
    },

    marriagePlaceE: {
      type: Sequelize.STRING(225),
    },

    marriagePlaceM: {
      type: Sequelize.STRING(225),
    },

    image_h: {
      type: Sequelize.STRING(512),
    },

    image_w: {
      type: Sequelize.STRING(512),
    },

    marriageInformerNameE: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageInformerNameM: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    registration_date: {
      type: Sequelize.STRING(10),
    },

    registration_date_two: {
      type: Sequelize.STRING(10),
    },

    created_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },

    // -----------------------------
    // WEDDING DOCUMENT FILES
    // -----------------------------

    marriageWeddingCertificateFile: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    marriageWeddingCardFile: {
      type: Sequelize.STRING(225),
      allowNull: true,
      defaultValue: "",
    },

    application_mode: {
      type: Sequelize.ENUM("ONLINE", "OFFLINE"),
      allowNull: false,
      defaultValue: "OFFLINE",
    },

    application_status: {
      type: Sequelize.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      defaultValue: "PENDING", // APPLIES ONLY FOR ONLINE MODE
    },

    acceptance_remark: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    date_of_acceptance: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    rejection_remark: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    date_of_rejection: {
      type: Sequelize.DATE,
      allowNull: true,
    },

    witnesses_details: {
      type: Sequelize.JSON,
      allowNull: true,
    },

    ps_payment_information_id_fk: {
        type: Sequelize.INTEGER,
        allowNull: true
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
  },
);

module.exports = ps_marriage;
