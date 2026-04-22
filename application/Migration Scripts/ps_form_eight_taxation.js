const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");

const ps_form_eight_taxation = sequelize.define(
  "ps_form_eight_taxation",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    fet_year_one: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_year_two: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_year_count: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_bahandkam_prakar: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_height: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_prop_desc: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_prop_spec: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_sq_area: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_sq_meter_area: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_width: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_meter_width: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_meter_height: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_ghasara_max: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_ghasara_min: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_ghasara_type_one: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_ghasara_type_two: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_ghasara_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    fet_ghasara_value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_prop_desc_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    fet_prop_desc_rate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_prop_desc_text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fet_prop_space_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    fet_prop_space_land_rate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_prop_space_pd_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    fet_prop_space_text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fet_bahandkam_prakar_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    fet_bahandkam_prakar_pd_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    fet_bahandkam_prakar_ready_nater_rate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_bahandkam_prakar_tax_rate: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_bahandkam_prakar_text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fet_final_imarati_bhandvali_mullya: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    fet_final_tax: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    created_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    modify_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);

module.exports = ps_form_eight_taxation;
