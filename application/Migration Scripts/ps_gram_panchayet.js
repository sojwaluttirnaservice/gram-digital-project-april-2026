const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_gram_panchayet = sequelize.define(
  "ps_gram_panchayet",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    gp_name: {
      type: Sequelize.STRING(1024),
      allowNull: false,
    },

    user_name: {
      type: Sequelize.STRING(1024),
      allowNull: false,
    },

    password: {
      type: Sequelize.STRING(1024),
      allowNull: false,
    },

    masterUserName: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    masterPassword: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    gp_post: {
      type: Sequelize.TEXT("long"),
    },

    gp_pincode: {
      type: Sequelize.TEXT("long"),
    },

    gp_taluka: {
      type: Sequelize.TEXT("long"),
    },

    gp_dist: {
      type: Sequelize.TEXT("long"),
    },

    gp_state: {
      type: Sequelize.TEXT("long"),
    },

    gp_email: {
      type: Sequelize.STRING(255),
      defaultValue: "-",
    },

    gp_contact: {
      type: Sequelize.STRING(255),
      defaultValue: "-",
    },
    gp_map: {
      type: Sequelize.TEXT("long"),
    },
    gp_info_one: {
      type: Sequelize.TEXT("long"),
    },
    gp_info_three: {
      type: Sequelize.TEXT("long"),
    },
    gp_is_live: {
      type: Sequelize.INTEGER,
      defaultValue: "0",
    },
    gp_ward: {
      type: Sequelize.INTEGER,
      defaultValue: "0",
    },
    gp_sadasya: {
      type: Sequelize.INTEGER,
      defaultValue: "0",
    },
    gp_member: {
      type: Sequelize.TEXT("long"),
    },
    pg_registration_no: {
      type: Sequelize.TEXT("long"),
    },
    gp_working_from: {
      type: Sequelize.TEXT("long"),
    },
    gp_working_to: {
      type: Sequelize.TEXT("long"),
    },
    gp_backup_done: {
      type: Sequelize.INTEGER,
      defaultValue: "0",
    },
    ps_gram_adarsh_takta: {
      type: Sequelize.TEXT("long"),
    },
    gp_site_count: {
      type: Sequelize.INTEGER,
    },
    gp_mahiti_title: {
      type: Sequelize.TEXT("long"),
    },
    gp_mahiti_details: {
      type: Sequelize.TEXT("long"),
    },
    gp_gramMahitiSamitiList: {
      type: Sequelize.TEXT("long"),
    },
    gp_gramMahitiUdyogiList: {
      type: Sequelize.TEXT("long"),
    },
    gp_gramNewsList: {
      type: Sequelize.TEXT("long"),
    },
    gp_gramKendraPhoto: {
      type: Sequelize.TEXT("long"),
    },
    gp_gramKendraList: {
      type: Sequelize.TEXT("long"),
    },
    gp_gramYojanaList: {
      type: Sequelize.TEXT("long"),
    },
    gp_postList: {
      type: Sequelize.TEXT("long"),
    },
    gp_dastavegList: {
      type: Sequelize.TEXT("long"),
    },
    gramsevak_sign_display: {
      type: Sequelize.INTEGER,
    },
    srapanch_sign_display: {
      type: Sequelize.INTEGER,
    },
    village_guide_title: {
      type: Sequelize.STRING,
    },
    village_guide_name: {
      type: Sequelize.STRING,
    },
    village_guide_image_name: {
      type: Sequelize.STRING,
    },
    birth_death_gp_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    charge_taken_date: {
      type: Sequelize.STRING,
      allowNull: true,
      // ग्रामपंचायतीचा चार्ज घेतल्याचा दिनांक
    },

    sarpanch_election_date: {
      type: Sequelize.STRING,
      allowNull: true,
      // सरपंच निवडणूक दिनांक
    },

    term_end_date: {
      type: Sequelize.STRING,
      allowNull: true,
      // मुदत संपण्याची दिनांक
    },

    annual_report_date: {
      type: Sequelize.STRING,
      allowNull: true,
      // वार्षिक अहवाल दिनांक
    },

    budget_year: {
      type: Sequelize.STRING,
      allowNull: true,
      // अंदाजपत्रक सन : e.g २०२४-२५
    },

    audit_year: {
      type: Sequelize.STRING,
      allowNull: true,
      // हिशेच तपासणी वर्ष : e.g. २०२३-२०२४
    },


    gp_image_name: {
      type: Sequelize.STRING,
      allowNull: true
    },

    sarpanch_stamp_image_name: {
      type: Sequelize.STRING,
      allowNull: true
    },

    sarpanch_stamp_display: {
      // 1 : show, 0 : hide
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1
    },

    gramsevak_stamp_image_name: {
      type: Sequelize.STRING,
      allowNull: true
    },

    gramsevak_stamp_display: {
      // 1 : show, 0 : hide
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1
    },

    gp_office_stamp_image_name: {
      type: Sequelize.STRING,
      allowNull: true
    },

    gp_office_stamp_display: {
      // 1 : show, 0 : hide
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1
    }

  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = ps_gram_panchayet;
