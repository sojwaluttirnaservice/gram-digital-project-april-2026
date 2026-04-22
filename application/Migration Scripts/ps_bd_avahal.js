const Sequelize = require("sequelize");

const sequelize = require("../config/db-connect-migration");

const ps_bd_avahal = sequelize.define(
  "ps_bd_avahal",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    month: { type: Sequelize.STRING, allowNull: false },
    year: { type: Sequelize.STRING, allowNull: false },
    district_name: { type: Sequelize.STRING, allowNull: false },
    village_name: { type: Sequelize.STRING, allowNull: false },
    registration_center_name: { type: Sequelize.STRING, allowNull: false },
    census_code_number: { type: Sequelize.STRING, allowNull: false },

    birth_live_birth_recorded_in_a_year_male: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_live_birth_recorded_in_a_year_female: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_live_birth_recorded_in_a_year_total: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    birth_live_birth_recorded_after_a_year_male: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_live_birth_recorded_after_a_year_female: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_live_birth_recorded_after_a_year_total: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    birth_live_birth_recorded_total_male: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_live_birth_recorded_total_female: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birth_live_birth_recorded_total_total: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    death_recorded_in_a_year_male: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    death_recorded_in_a_year_female: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    death_recorded_in_a_year_other: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    death_recorded_in_a_year_total: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    death_recorded_after_a_year_male: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    death_recorded_after_a_year_female: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    death_recorded_after_a_year_other: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    death_recorded_after_a_year_total: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    death_recorded_total_male: { type: Sequelize.STRING, allowNull: false },
    death_recorded_total_female: { type: Sequelize.STRING, allowNull: false },
    death_recorded_total_other: { type: Sequelize.STRING, allowNull: false },
    death_recorded_total_total: { type: Sequelize.STRING, allowNull: false },

    //Infant mortality- (deaths before one year of age)
    infant_mortality_count_out_of_total_deaths_male: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    infant_mortality_count_out_of_total_deaths_female: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    infant_mortality_count_out_of_total_deaths_other: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    infant_mortality_count_out_of_total_deaths_total: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    mother_death_count: { type: Sequelize.STRING, allowNull: false },

    // Stillbirth (Fetal Death) : मृत जन्म (उपजत मृत्यू)
    fetal_death_count_male: { type: Sequelize.STRING, allowNull: false },
    fetal_death_count_female: { type: Sequelize.STRING, allowNull: false },
    fetal_death_count_total: { type: Sequelize.STRING, allowNull: false },

    date: { type: Sequelize.DATEONLY, allowNull: false },

    // जिल्हा निबंधक/गट विकास अधिकारी/ पंचायत समिती --remained to add in table
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = ps_bd_avahal;
