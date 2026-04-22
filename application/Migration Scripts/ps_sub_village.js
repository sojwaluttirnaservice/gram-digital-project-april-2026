const Sequelize = require('sequelize')
const sequelize = require('../config/db-connect-migration')

const ps_sub_village = sequelize.define(
	'ps_sub_village',
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		gp_name: {
			type: Sequelize.STRING(999),
			allowNull: false,
		},
		gp_url: {
			type: Sequelize.TEXT('long'),
			allowNull: false,
		},
		gp_male: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		gp_female: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},



		// ADDED THESE
		sc_count_male: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		sc_count_female: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},

		sc_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		// ADDED THESE
		st_count_male: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		st_count_female: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},

		st_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},


		// ADDED THESE
		nt_count_male: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		nt_count_female: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},

		nt_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		obc_count_male: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		obc_count_female: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0
		},

		obc_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		open_others_count_male: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		open_others_count_female: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},

		open_others_count: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},



		// other details

		ward_numbers: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",
		},

		total_members: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",
		},

		sarpanch_directly_elected_count: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",
		},

		home_count: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",
		},

		area_in_sq_hectare: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",

		},

		area_in_sq_km: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",
		},

		// मतदार संघ क्रमांक
		constituency_number: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",
		},
		// मतदार संघाचे नाव
		constituency_name: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},

		// विधानसभा क्रमांक
		assembly_constituency_number: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "",
		},

		// विधानसभा नाव
		assembly_constituency_name: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},


		// -------------------- स्वच्छ भारत मिशन
		// kutumbanchee snakhya
		number_of_households: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},

		number_of_households_having_toilets: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},
		// हागणदारी मुक्ती वर्ष
		open_defecation_free_year: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},

		odf_plus_remarks: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},

		// ---------------------------------

		//--=-------- सांडपाणी व घनकचरा व्यवस्थापन जोडलेले कुटुंब
		households_connected_to_waste_management: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},

		// शोषखड्डे
		soak_pits: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},

		// व्यवस्थापन
		waste_management: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '',
		},

		// --------------------------------------------

		// ---------- WATER SUPPLY -----------------------------

		tank_location: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: ''
		},

		tank_capacity: {
			type: Sequelize.STRING,  // or Sequelize.INTEGER if whole numbers
			allowNull: false,
			defaultValue: 0
		},

		staff_in_charge: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: ''
		},

		normal_rate: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 0.0
		},

		special_rate: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: 0.0
		},

		// ------------------------------------

		health_sub_centers: {
			type: Sequelize.TEXT, // use TEXT since it'll store a JSON string
			allowNull: false,
			defaultValue: '[]'
		}
	},
	{
		createdAt: false,
		updatedAt: false,
	}
)
module.exports = ps_sub_village
