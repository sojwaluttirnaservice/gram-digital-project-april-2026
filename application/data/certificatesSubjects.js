const certificateSubjects = [
  // unemployment
  {
    id: 1,
    subject_code: "बेरोजगार_प्रमाणपत्र",
    subject_code_en: "UNEMPLOYED_CERTIFICATE",
    subject_name: "बेरोजगार प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Unemployed Certificate",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "ration_card", label: "रेशन कार्ड", is_required: true },
      { key: "income_certificate", label: "उत्पन्न दाखला", is_required: false },
      {
        key: "education_proof",
        label: "शैक्षणिक कागदपत्रे",
        is_required: false,
      },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साइज फोटो", is_required: true },
    ],
  },

  //   residential
  {
    id: 2,
    subject_code: "रहिवासी_प्रमाणपत्र",
    subject_code_en: "RESIDENTIAL_CERTIFICATE",
    subject_name: "रहिवासी प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Residence Certificate",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "ration_card", label: "रेशन कार्ड", is_required: false },
      { key: "voter_id", label: "मतदार ओळखपत्र", is_required: true },
      { key: "electricity_bill", label: "वीज / पाणी बिल", is_required: false },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साइज फोटो", is_required: true },
    ],
  },

  //   behavior
  {
    id: 3,
    subject_code: "वर्तवणूक_प्रमाणपत्र",
    subject_code_en: "BEHAVIOR_CERTIFICATE",
    subject_name: "वर्तवणुकीचे प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Behavior Certificate",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      {
        key: "residence_certificate",
        label: "रहिवासी प्रमाणपत्र",
        is_required: true,
      },
      {
        key: "school_leaving",
        label: "शाळा सोडल्याचा दाखला / बोनाफाईड",
        is_required: false,
      },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: false },
    //   { key: "photo", label: "पासपोर्ट साइज फोटो", is_required: true },
    ],
  },

  //   electricity connection
  {
    id: 4,
    subject_code: "वीज_जोडणी_ना_हरकत",
    subject_code_en: "ELECTRICITY_NOC",
    subject_name: "वीज जोडणीसाठी ना हरकत प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Electricity Connection NOC",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      {
        key: "residence_certificate",
        label: "रहिवासी प्रमाणपत्र",
        is_required: true,
      },
      {
        key: "property_tax_receipt",
        label: "घरपट्टी पावती",
        is_required: false,
      },
      { key: "7_12_extract", label: "7/12 उतारा", is_required: false },
      { key: "rent_agreement", label: "भाडेकरार", is_required: false },
      { key: "owner_consent", label: "घरमालक संमतीपत्र", is_required: false },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    ],
  },

  //   nuclear family
  {
    id: 5,
    subject_code: "विभक्त_कुटुंब_प्रमाणपत्र",
    subject_code_en: "NUCLEAR_FAMILY_CERTIFICATE",
    subject_name: "विभक्त कुटुंब प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Nuclear Family Certificate",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "ration_card", label: "रेशन कार्ड", is_required: true },
      { key: "family_register", label: "कुटुंब नोंद वही", is_required: false },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साइज फोटो", is_required: true },
    ],
  },

  //   occupation noc
  {
    id: 6,
    subject_code: "व्यवसाय_ना_हरकत",
    subject_code_en: "OCCUPATION_NOC",
    subject_name: "व्यवसायासाठी ना हरकत प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Occupation NOC",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "shop_photo", label: "दुकान / जागेचा फोटो", is_required: false },
      { key: "rent_agreement", label: "भाडेकरार", is_required: false },
      { key: "owner_noc", label: "घरमालक संमतीपत्र", is_required: false },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    ],
  },

  //   toilet
  {
    id: 7,
    subject_code: "शौचालय_प्रमाणपत्र",
    subject_code_en: "TOILET_CERTIFICATE",
    subject_name: "घरगुती शौचालय असल्याबाबत प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Certificate of Having a Household Toilet",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "toilet_photo", label: "शौचालयाचा फोटो", is_required: true },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    ],
  },

  //   existence
  {
    id: 8,
    subject_code: "हयाती_प्रमाणपत्र",
    subject_code_en: "LIFE_CERTIFICATE",
    subject_name: "हयातीचे प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Life Certificate",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "pension_passbook", label: "पेन्शन पासबुक", is_required: false },
      { key: "ppo_document", label: "PPO कागदपत्र", is_required: false },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साइज फोटो", is_required: true },
    ],
  },

  //   no benefit scheme
  {
    id: 9,
    subject_code: "योजना_लाभ_नसल्याचे_प्रमाणपत्र",
    subject_code_en: "NON_AVAILMENT_CERTIFICATE",
    subject_name:
      "कोणत्याही शासकीय योजनेचा लाभ न घेतल्याबाबत प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Non-Availment Certificate",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "ration_card", label: "रेशन कार्ड", is_required: false },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    ],
  },

  //   water connection
  {
    id: 10,
    subject_code: "पाणी_जोडणी_ना_हरकत",
    subject_code_en: "WATER_CONNECTION_NOC",
    subject_name: "पाणी जोडणीसाठी ना हरकत प्रमाणपत्र मिळणेबाबत अर्ज",
    subject_name_en: "Application for Water Connection NOC",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      {
        key: "residence_certificate",
        label: "रहिवासी प्रमाणपत्र",
        is_required: true,
      },
      {
        key: "property_tax_receipt",
        label: "घरपट्टी पावती",
        is_required: false,
      },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    ],
  },

  //   widow
  {
    id: 11,
    subject_code: "विधवा_प्रमाणपत्र",
    subject_code_en: "WIDOW_CERTIFICATE",
    subject_name: "विधवा असल्याचा दाखला मिळणेबाबत अर्ज",
    subject_name_en: "Application for Widow Certificate",
    documents: [
      {
        key: "husband_death_certificate",
        label: "पतीचा मृत्यू दाखला",
        is_required: true,
      },
      {
        key: "marriage_certificate",
        label: "विवाहाचा दाखला",
        is_required: true,
      },
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "ration_card", label: "रेशन कार्ड", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साईज फोटो", is_required: true },
    //   { key: "self_affidavit", label: "स्वयंघोषणापत्र", is_required: true },
    ],
  },

  //   husband abandons wife

  {
    id: 12,
    subject_code: "परित्यक्ता_प्रमाणपत्र",
    subject_code_en: "DESERTED_WOMAN_CERTIFICATE",
    subject_name: "परित्यक्ता असल्याचा दाखला देणेबाबत अर्ज",
    subject_name_en: "Application for Deserted Woman Certificate",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      {
        key: "marriage_certificate",
        label: "विवाहाचा दाखला",
        is_required: true,
      },
      { key: "ration_card", label: "रेशन कार्ड", is_required: true },
      {
        key: "residence_certificate",
        label: "रहिवासी दाखला",
        is_required: true,
      },
    //   { key: "self_affidavit", label: "स्वयंघोषण पत्र", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साईज फोटो", is_required: true },
      {
        key: "police_complaint",
        label: "पोलिस तक्रार / न्यायालयीन कागदपत्र",
        is_required: false,
      },
      {
        key: "gp_inquiry_report",
        label: "ग्रामपंचायत चौकशी अहवाल",
        is_required: false,
      },
    ],
  },

  // changed names

  {
    id: 13,
    subject_code: "नाव_बदल_प्रमाणपत्र",
    subject_code_en: "NAME_CHANGE_CERTIFICATE",
    subject_name: "नाव बदल / नावातील चूक दुरुस्ती करणेबाबत अर्ज",
    subject_name_en: "Application for Name Change / Correction",
    documents: [
      {
        key: "aadhaar_card",
        label: "आधार कार्ड (योग्य नावासह)",
        is_required: true,
      },
      { key: "ration_card", label: "रेशन कार्ड", is_required: true },
      {
        key: "voter_id_or_school_certificate",
        label: "मतदार ओळखपत्र / शाळेचा दाखला",
        is_required: false,
      },
    //   { key: "self_affidavit", label: "स्वयंघोषण पत्र", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साईज फोटो", is_required: true },
      { key: "other_proof", label: "इतर पुरावे", is_required: false },
    ],
  },

  // housing scheme
  {
    id: 14,
    subject_code: "घरकुल_योजना",
    subject_code_en: "HOUSING_SCHEME_APPLICATION",
    subject_name: "घरकुल योजनेचा लाभ मिळणेबाबत अर्ज",
    subject_name_en: "Application for Housing Scheme",
    documents: [
      { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
      { key: "ration_card", label: "रेशन कार्ड", is_required: true },
      {
        key: "residence_certificate",
        label: "रहिवासी दाखला",
        is_required: true,
      },
      { key: "income_certificate", label: "उत्पन्न दाखला", is_required: true },
      {
        key: "7_12_extract_or_land_proof",
        label: "7/12 उतारा / जागेचा पुरावा",
        is_required: false,
      },
      { key: "bank_passbook", label: "बँक पासबुक झेरॉक्स", is_required: true },
    //   { key: "self_affidavit", label: "स्वयंघोषण पत्र", is_required: true },
    //   { key: "photo", label: "पासपोर्ट साईज फोटो", is_required: true },
    ],
  },

  // no job
//   {
//     id: 15,
//     subject_code: "नोकरी_नसल्याचा_दाखला",
//     subject_code_en: "NO_JOB_CERTIFICATE",
//     subject_name: "नोकरी नसल्याचा दाखला देणेबाबत अर्ज",
//     subject_name_en: "Application for No Job Certificate",
//     documents: [
//       { key: "aadhaar_card", label: "आधार कार्ड", is_required: true },
//       { key: "ration_card", label: "रेशन कार्ड", is_required: true },
//       {
//         key: "residence_certificate",
//         label: "रहिवासी दाखला",
//         is_required: true,
//       },
//     //   { key: "self_affidavit", label: "स्वयंघोषण पत्र", is_required: true },
//     //   { key: "photo", label: "पासपोर्ट साईज फोटो", is_required: true },
//       {
//         key: "other_documents",
//         label: "इतर (ग्रामपंचायत सांगेल ते)",
//         is_required: false,
//       },
//     ],
//   },
];

module.exports = certificateSubjects;
