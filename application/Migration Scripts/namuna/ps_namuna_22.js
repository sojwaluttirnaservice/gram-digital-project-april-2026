const Sequelize = require('sequelize');
const sequelize = require('../../config/db-connect-migration');

const ps_namuna_22 = sequelize.define(
    'ps_namuna_22', // तालिकेचे नाव (Table name)
    {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment:
                'Primary key for the property register table. / स्थावर मालमत्ता नोंदणीसाठी प्राथमिक की',
        },

        month: {
            type: Sequelize.TINYINT,
            allowNull: false,
            comment: 'Month',
        },

        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: 'Year',
        },

        // संपादनाची किंवा उभारणीची तारीख (Acquisition or Construction Date)
        acquisition_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            comment:
                'Date when the property was acquired. / मालमत्ता संपादन केलेली किंवा उभारणी केलेली तारीख',
        },

        // MIHGHT NE UNNECESSSARY RIGHT NOW
        // आदेश क्रमांक (Order Number)
        order_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment: 'Unique number of the acquisition order. / संपादन आदेशाचा क्रमांक',
        },

        // MIHGHT NE UNNECESSSARY RIGHT NOW
        // आदेशाची तारीख (Order Date)
        order_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date of the acquisition order. / संपादन आदेशाची तारीख',
        },

        // पंचायत ठरावाचा क्रमांक (Resolution Number)
        resolution_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment:
                'Number of the Panchayat resolution for the property. / पंचायत ठरावाचा क्रमांक',
        },

        // पंचायत ठरावाची तारीख (Resolution Date)
        resolution_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date of the Panchayat resolution for the property. / पंचायत ठरावाची तारीख',
        },

        // भूमापन क्रमांक (Land Survey Number)
        survey_number: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Survey number associated with the property. / मालमत्तेचा भूमापन क्रमांक',
        },

        // मालमत्तेचे वर्णन (Property Description)
        property_description: {
            type: Sequelize.TEXT,
            allowNull: false,
            comment: 'Description of the property. / मालमत्तेचे वर्णन',
        },

        // वापर करण्याचे कारण (Reason for Usage)
        usage_reason: {
            type: Sequelize.STRING(255),
            allowNull: false,
            comment: 'Reason for using the property. / मालमत्तेचा वापर करण्याचे कारण',
        },

        // उभारणीचा किंवा संपादनाचा खर्च
        construction_or_editing_expense: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true, // Allow null if this expense is not mandatory
            comment: 'उभारणीचा किंवा संपादनाचा खर्च (The construction or editing expense).',
        },

        // दुरुस्त्यांवर खर्च (Expenditure on Repairs)

        // तारीख (Date of Expenditure)
        repairs_expenditure_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date when repairs expenditure occurred. / दुरुस्ती खर्च झाल्याची तारीख',
        },

        // चालू दुरुस्त्या (Ongoing Repairs)
        ongoing_repairs: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Expenses for ongoing repairs. / चालू दुरुस्त्यांवर खर्च',
        },

        // विशेष दुरुस्त्या (Special Repairs)
        special_repairs: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Expenses for special repairs. / विशेष दुरुस्त्यांवर खर्च',
        },

        // मूळ बांधकाम (Original Construction)
        original_construction: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Expenses related to original construction. / मूळ बांधकामावर खर्च',
        },

        // मूळ बांधकामाचे स्वरूप (Type of Original Construction)
        original_construction_type: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Type of original construction (e.g., concrete, brick). / मूळ बांधकामाचे स्वरूप (उदाहरणार्थ, काँक्रीट, विटा)',
        },

        // वर्ष अखेरीस घटलेली किंमत (Depreciation Value)
        year_end_depreciation: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
            comment:
                'Depreciation value at the end of the year. / वर्षअखेर मालमत्तेची घटलेली किंमत',
        },

        // मालमत्तेची विल्हेवाट लावण्यासाठी आदेश (Disposal Orders) bellow
        disposal_resolution_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment:
                'Resolution number for property disposal. / मालमत्ता विल्हेवाट लावण्याचा ठराव क्रमांक',
        },
        disposal_order_number: {
            type: Sequelize.STRING(100),
            allowNull: true,
            comment:
                'Order number for property disposal. / मालमत्ता विल्हेवाट लावण्याचा आदेश क्रमांक',
        },
        disposal_order_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
            comment: 'Date of the disposal order. / मालमत्ता विल्हेवाट लावण्याची तारीख',
        },

        // शेरा (Remarks)
        remarks: {
            type: Sequelize.STRING(255),
            allowNull: true,
            comment:
                'Additional remarks related to the property. / मालमत्तेसंदर्भातील अतिरिक्त शेरा',
        },

        // Created At timestamp (निर्मिती तारीख)
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: 'Timestamp when the record was created. / नोंदीची निर्मिती तारीख व वेळ',
        },

        // Updated At timestamp (अद्यतन तारीख)
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            comment:
                'Timestamp when the record was last updated. / नोंदीचे शेवटचे अद्यतन तारीख व वेळ',
        },
    },
    {
        // अन्य मापदंड आणि सेटिंग्ज
        tableName: 'ps_namuna_22', // तुम्ही नमूद केलेली टेबल नाव (Table name)
        timestamps: true, // टाइमस्टॅम्प सेट करा (Create and update timestamps)
    }
);

module.exports = ps_namuna_22;
