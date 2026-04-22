const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_23 = sequelize.define(
    'ps_namuna_23', // तालिकेचे नाव (Table name)
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment:
                'तक्त्यातील प्रत्येक नोंदीसाठी एक अद्वितीय ओळख (Unique identifier for the entry in the register).',
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
            comment: '',
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: '(The year of the road).',
        },

        road_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'रस्त्याचे नाव (The name of the road).',
        },

        // Starting village of the road
        start_village: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'रस्त्याचा प्रारंभ गाव (The starting village of the road).',
        },

        // Ending village of the road
        end_village: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'रस्त्याचा समाप्त गाव (The ending village of the road).',
        },

        length_km: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false,
            comment: 'रस्त्याची लांबी किलोमीटरमध्ये (The length of the road in kilometers).',
        },

        width_km: {
            type: Sequelize.DECIMAL(5, 2),
            allowNull: false,
            comment: 'रस्त्याची रुंदी किलोमीटरमध्ये (The width of the road in kilometers).',
        },

        road_type: {
            type: Sequelize.STRING(100),
            allowNull: false,
            comment:
                'रस्त्याचा प्रकार (उदा., खडीचा, बिनखडीचा, डांबरी, किंवा सिमेंटचा) (Type of the road, e.g., Gravel, Asphalt, Concrete).',
        },

        completion_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            comment: 'रस्त्याचा पूर्ण होण्याची तारीख (The completion date of the road).',
        },

        cost_per_km: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
            comment:
                'प्रति किलोमीटर रस्ता तयार करण्याचा खर्च (Cost per kilometer for constructing the road).',
        },

        // दुरुस्ती

        // चालू दुरुस्ती संबंधित उपखंड (Ongoing Repairs Subcolumns)
        ongoing_repairs_cost: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
            comment: 'चालू दुरुस्तीचा खर्च (Cost of ongoing repairs).',
        },

        ongoing_repairs_form: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'चालू दुरुस्तीचा स्वरूप (Form or type of ongoing repairs, e.g., Asphalt).',
        },

        // विशेष दुरुस्ती संबंधित उपखंड (Special Repairs Subcolumns)
        special_repairs_cost: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
            comment: 'विशेष दुरुस्तीचा खर्च (Cost of special repairs).',
        },

        special_repairs_form: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'विशेष दुरुस्तीचा स्वरूप (Form or type of special repairs, e.g., Concrete).',
        },

        // मूळ बांधकाम संबंधित उपखंड (Original Construction Subcolumns)
        original_construction_cost: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
            comment: 'मूळ बांधकामाचा खर्च (Cost of original construction).',
        },

        original_construction_form: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'मूळ बांधकामाचा स्वरूप (Form or type of original construction, e.g., Cement).',
        },

        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment: 'अतिरिक्त शेरा (Additional remarks about the road).',
        },

        // Additional Fields for Timestamps
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'नोंदीची निर्मिती तारीख व वेळ (Timestamp when the record was created).',
        },

        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment:
                'नोंदीचे शेवटचे अद्यतन तारीख व वेळ (Timestamp when the record was last updated).',
        },
    },
    {
        tableName: 'ps_namuna_23', // तालिकेचे नाव (Table name)
        timestamps: true, // टाइमस्टॅम्प सेट करा (Enable auto timestamps for create and update)
    }
);

module.exports = ps_namuna_23;
