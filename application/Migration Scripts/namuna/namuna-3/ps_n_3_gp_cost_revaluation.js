const Sequelize = require('sequelize');
const sequelize = require('../../../config/db-connect-migration');

const ps_n_3_gp_cost_revaluation = sequelize.define(
    'ps_n_3_gp_cost_revaluation',
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: 'आइडी (Unique identifier for each record)', // Marathi comment
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true,
            comment: 'वर्ष (Year of the record)',
        },

        data_list: {
            type: Sequelize.TEXT('long'),
            allowNull: true,
            comment: 'Contains data in the format of jsonarray',
        },

        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'निर्मितीची तारीख',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'अद्यतनाची तारीख',
        },
    },
    {
        tableName: 'ps_n_3_gp_cost_revaluation',
        timestamps: true,
        comment: 'ग्रामपंचायत फेर आकारणी बाबत',
    }
);

module.exports = ps_n_3_gp_cost_revaluation;


/*


let data = [
    [

        {
            name: 'previous_reassessment_implementation_date',
            value: '',
        },
        {
            name: 'tax_name_assessed',
            value: '',
        },
        {
            name: 'amount_requested_for_year',
            value: '',
        },
        {
            name: 'reassessment_interval_years',
            value: '',
        },
        {
            name: 'reassessment_year',
            value: '',
        },
        {
            name: 'tax_name_in_reassessment',
            value: '',
        },
        {
            name: 'amount_assessed_for_year',
            value: '',
        },
        {
            name: 'increase_in_income_after_reassessment',
            value: '',
        },
        {
            name: 'total_property_count_buildings',
            value: '',
        },
        {
            name: 'total_property_count_land',
            value: '',
        }
    ],
    [
        ...similar as above
    ]
];

const headers = [
    {
        name: 'previous_reassessment_implementation_date',
        headerName: 'मागील फेर आकारणी अमलात आणण्याची तारीख',
    },
    {
        name: 'tax_name_assessed',
        headerName: 'आकारलेल्या कराचे नाव',
    },
    {
        name: 'amount_requested_for_year',
        headerName: 'वर्षासाठी केलेली रक्कम',
    },
    {
        name: 'reassessment_interval_years',
        headerName: 'फेर कर दर ४ वर्षानी आकारणी करण्याचे वर्ष',
    },
    {
        name: 'reassessment_year',
        headerName: 'फेर कर आकारणी केलेले वर्ष',
    },
    {
        name: 'tax_name_in_reassessment',
        headerName: 'फेर आकारणी मध्ये आकारलेल्या कराचे नाव',
    },
    {
        name: 'amount_assessed_for_year',
        headerName: 'आकारणी केलेली रक्कम (वर्षासाठी)',
    },
    {
        name: 'increase_in_income_after_reassessment',
        headerName: 'फेर कर आकारणी नंतर उत्त्पन्नात वाढ कराची रक्कम',
    },
    {
        name: 'total_property_count_buildings',
        headerName: 'एकूण मालमत्ता संख्या इमारती',
    },
    {
        name: 'total_property_count_land',
        headerName: 'एकूण मालमत्ता संख्या जमिनी',
    }
];


*/