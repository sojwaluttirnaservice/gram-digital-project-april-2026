let sequelize = require("../application/config/db-connect-migration");

let ps_arogya_diva_kar = require("../application/Migration Scripts/ps_arogya_diva_kar");
let ps_bahandkam_prakar = require("../application/Migration Scripts/ps_bahandkam_prakar");
let ps_certificate = require("../application/Migration Scripts/ps_certificate");
let ps_certificate_mobile = require("../application/Migration Scripts/ps_certificate_mobile");
let ps_document_type = require("../application/Migration Scripts/ps_document_type");
let ps_form_eight_taxation = require("../application/Migration Scripts/ps_form_eight_taxation");
let ps_form_eight_total_taxation = require("../application/Migration Scripts/ps_form_eight_total_taxation");
let ps_form_eight_user = require("../application/Migration Scripts/ps_form_eight_user");
let ps_form_nine_form = require("../application/Migration Scripts/ps_form_nine_form");
let ps_gallary = require("../application/Migration Scripts/ps_gallary");
let ps_gharkul_yojna = require("../application/Migration Scripts/ps_gharkul_yojna");
let ps_ghasara_rate = require("../application/Migration Scripts/ps_ghasara_rate");
let ps_gp_member_list = require("../application/Migration Scripts/ps_gp_member_list");
let ps_gp_sites = require("../application/Migration Scripts/ps_gp_sites");
let ps_gram_panchayet = require("../application/Migration Scripts/ps_gram_panchayet");
let ps_gram_sadasya_post = require("../application/Migration Scripts/ps_gram_sadasya_post");
let ps_gram_sadasya_to = require("../application/Migration Scripts/ps_gram_sadasya_to");
let ps_kar_wasuli_ahawal = require("../application/Migration Scripts/ps_kar_wasuli_ahawal");
let ps_marriage = require("../application/Migration Scripts/ps_marriage");
let ps_masik_notice = require("../application/Migration Scripts/ps_masik_notice");
let ps_meter_bill = require("../application/Migration Scripts/ps_meter_bill");
let ps_meter_bill_list = require("../application/Migration Scripts/ps_meter_bill_list");
let ps_meter_rates = require("../application/Migration Scripts/ps_meter_rates");
let ps_property_desc = require("../application/Migration Scripts/ps_property_desc");
let ps_property_specification = require("../application/Migration Scripts/ps_property_specification");
let ps_sabhasad_notice = require("../application/Migration Scripts/ps_sabhasad_notice");
let ps_self_diclaration = require("../application/Migration Scripts/ps_self_diclaration");
let ps_sms_list = require("../application/Migration Scripts/ps_sms_list");
let ps_sub_village = require("../application/Migration Scripts/ps_sub_village");
let ps_tax_payer_list_pani = require("../application/Migration Scripts/ps_tax_payer_list_pani");
let ps_tax_payer_list_samanya = require("../application/Migration Scripts/ps_tax_payer_list_samanya");
let ps_user_application = require("../application/Migration Scripts/ps_user_application");
let ps_web_notice = require("../application/Migration Scripts/ps_web_notice");
let ps_form_nine_form_old = require("../application/Migration Scripts/ps_form_nine_form_old");
let ps_pani_kar = require("../application/Migration Scripts/ps_pani_kar");
let ps_ferfar = require("../application/Migration Scripts/ps_ferfar");
let ps_kar_vasuli_avahal = require("../application/Migration Scripts/ps_kar_vasuli_avahal");
let ps_bleaching_ahaval = require("../application/Migration Scripts/ps_bleaching_ahaval");
let ps_bd_avahal = require("../application/Migration Scripts/ps_bd_avahal");
let ps_under_18_marriages_avahal = require("../application/Migration Scripts/ps_under_18_marriages_avahal");
let ps_marriage_registration_avahal = require("../application/Migration Scripts/ps_marriage_registration_avahal");
let ps_payments_information = require("../application/Migration Scripts/ps_payments_information");

let sms_templates = require("../application/Migration Scripts/sms_templates");
let sms_track_record = require("../application/Migration Scripts/sms_track_record");
let sms_delivery_status = require("../application/Migration Scripts/sms_delivery_status");

let ps_masik_sabha_tharav = require("../application/Migration Scripts/ps_masik_sabha_tharav");
let ps_sabha_attendance = require("../application/Migration Scripts/ps_sabha_attendance");
let ps_gr_file_list = require("../application/Migration Scripts/ps_gr_file_list");
let ps_medical_room = require("../application/Migration Scripts/ps_medical_room");
let ps_divyanga_file_list = require("../application/Migration Scripts/ps_divyanga_file_list");
let ps_empty_plot_list_file_list = require("../application/Migration Scripts/ps_empty_plot_list_file_list");
let ps_arogya_sevak_information = require("../application/Migration Scripts/ps_arogya_sevak_information");
let ps_arogya_camp_files = require("../application/Migration Scripts/ps_arogya_camp_files");
let ps_gov_yojna_file_list = require("../application/Migration Scripts/ps_gov_yojna_file_list");
let ps_krishi_vidnyan_file_list = require("../application/Migration Scripts/ps_krishi_vidnyan_file_list");
let ps_divyanga_registration = require("../application/Migration Scripts/ps_divyanga_registration");
let ps_education_institute_list = require("../application/Migration Scripts/ps_education_institute_list");
let ps_education_institute_staff_list = require("../application/Migration Scripts/ps_education_institute_staff_list");
const ps_arogya_seva_kendra = require("../application/Migration Scripts/ps_arogya_seva_kendra");
const ps_education_institute_gallery = require("../application/Migration Scripts/ps_education_institute_gallery");
const ps_arogya_seva_kendra_gallery = require("../application/Migration Scripts/ps_arogya_seva_kendra_gallery");
const ps_job_related = require("../application/Migration Scripts/ps_job_related");
const ps_zoom_meetings = require("../application/Migration Scripts/ps_zoom_meetings");
const ps_gp_sms_track = require("../application/Migration Scripts/ps_gp_sms_track");
const ps_gp_sms_track_record = require("../application/Migration Scripts/ps_gp_sms_track_record");
const ps_video_gallery = require("../application/Migration Scripts/ps_video_gallery");
const ps_gram_ahaval_documents = require("../application/Migration Scripts/ps_gram_ahaval_documents");
const ps_gram_sandarbha_ahaval = require("../application/Migration Scripts/ps_gram_sandarbha_ahaval");
const ps_tap_connection = require("../application/Migration Scripts/tap_connection");
const ps_watertax = require("../application/Migration Scripts/ps_watertax");
const ps_meter_tax_payment_record = require("../application/Migration Scripts/ps_meter_tax_payment_record");
const ps_atikraman_notice = require("../application/Migration Scripts/ps_atikraman_notice");
const ps_death_certificates = require("../application/Migration Scripts/ps_death_certificates");

const ps_birth_certificates = require("../application/Migration Scripts/ps_birth_certificates");
const ps_qr_codes = require("../application/Migration Scripts/ps_qr_codes");
const ps_birth_death_certificate_unavailability_certificates = require("../application/Migration Scripts/ps_birth_death_certificate_unavailability_certificates");
const ps_bpl_certificates = require("../application/Migration Scripts/ps_bpl_certificates");
const ps_bpl_certificate_family_members = require("../application/Migration Scripts/ps_bpl_certificate_family_members");

// Namuna tables

// namuna 1
// collection tables ((जमा))
const ps_namuna_1_tapshil_1_collection_of_village_funds_headers = require("../application/Migration Scripts/namuna/namuna-1/collection/village-funds/ps_namuna_1_tapshil_1_collection_of_village_funds_headers");
const ps_namuna_1_tapshil_1_collection_of_village_funds = require("../application/Migration Scripts/namuna/namuna-1/collection/village-funds/ps_namuna_1_tapshil_1_collection_of_village_funds");

const ps_namuna_1_tapshil_2_other_income_headers = require("../application/Migration Scripts/namuna/namuna-1/collection/other-income/ps_namuna_1_tapshil_2_other_income_headers");
const ps_namuna_1_tapshil_2_other_income = require("../application/Migration Scripts/namuna/namuna-1/collection/other-income/ps_namuna_1_tapshil_2_other_income");

const ps_namuna_1_tapshil_3_sanctioned_amount_headers = require("../application/Migration Scripts/namuna/namuna-1/collection/sanctioned-amount/ps_namuna_1_tapshil_3_sanctioned_amount_headers");
const ps_namuna_1_tapshil_3_sanctioned_amount = require("../application/Migration Scripts/namuna/namuna-1/collection/sanctioned-amount/ps_namuna_1_tapshil_3_sanctioned_amount");

const ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers = require("../application/Migration Scripts/namuna/namuna-1/collection/auxiliary_grants/ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers");
const ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants = require("../application/Migration Scripts/namuna/namuna-1/collection/auxiliary_grants/ps_namuna_1_tapshil_4_deposit_of_auxiliary_grants");

const ps_namuna_1_tapshil_5_village_water_priority_fund_headers = require("../application/Migration Scripts/namuna/namuna-1/collection/village-water/ps_namuna_1_tapshil_5_village_water_priority_fund_headers");
const ps_namuna_1_tapshil_5_village_water_priority_fund = require("../application/Migration Scripts/namuna/namuna-1/collection/village-water/ps_namuna_1_tapshil_5_village_water_priority_fund");

// expenditure tables ((खर्च))

const ps_namuna_1_tapshil_1_expenditure_of_village_funds_headers = require("../application/Migration Scripts/namuna/namuna-1/expenditure/village-funds/ps_namuna_1_tapshil_1_expenditure_of_village_funds_headers");
const ps_namuna_1_tapshil_1_expenditure_of_village_funds = require("../application/Migration Scripts/namuna/namuna-1/expenditure/village-funds/ps_namuna_1_tapshil_1_expenditure_of_village_funds");

const ps_namuna_1_tapshil_2_expenditure_water_funds_headers = require("../application/Migration Scripts/namuna/namuna-1/expenditure/water-funds/ps_namuna_1_tapshil_2_expenditure_water_funds_headers");
const ps_namuna_1_tapshil_2_expenditure_water_funds = require("../application/Migration Scripts/namuna/namuna-1/expenditure/water-funds/ps_namuna_1_tapshil_2_expenditure_water_funds");

const ps_namuna_1_other_expenditures = require("../application/Migration Scripts/namuna/namuna-1/expenditure/other-expenditures/ps_namuna_1_other_expenditures");

const ps_n_5_samanya_reasons = require("../application/Migration Scripts/namuna/5/ps_n_5_samanya_reasons");
const ps_n_5_pani_reasons = require("../application/Migration Scripts/namuna/5/ps_n_5_pani_reasons");

const ps_n_5_expenditure_samanya = require("../application/Migration Scripts/namuna/5/ps_n_5_expenditure_samanya");
const ps_n_5_expenditure_pani = require("../application/Migration Scripts/namuna/5/ps_n_5_expenditure_pani");

const ps_namuna_7 = require("../application/Migration Scripts/ps_namuna_7");
const ps_namuna_7_reasons = require("../application/Migration Scripts/ps_namuna_7_reasons");

const ps_namuna_5k_samanya = require("../application/Migration Scripts/namuna/5k/ps_namuna_5k_samanya");
const ps_namuna_5k_pani = require("../application/Migration Scripts/namuna/5k/ps_namuna_5k_pani");

//------------
//  Namuna 1 table list ends
const ps_namuna_11 = require("../application/Migration Scripts/namuna/ps_namuna_11");

const ps_namuna_12_main = require("../application/Migration Scripts/namuna/ps_namuna_12_main");
const ps_namuna_12_spending = require("../application/Migration Scripts/namuna/ps_namuna_12_spending");
const ps_namuna_13_post_list = require("../application/Migration Scripts/namuna/ps_namuna_13_post_list");
const ps_namuna_13 = require("../application/Migration Scripts/namuna/ps_namuna_13");
const ps_namuna_14 = require("../application/Migration Scripts/namuna/ps_namuna_14");
const ps_namuna_15 = require("../application/Migration Scripts/namuna/ps_namuna_15");

const ps_namuna_16 = require("../application/Migration Scripts/namuna/ps_namuna_16");
const ps_namuna_17 = require("../application/Migration Scripts/namuna/ps_namuna_17");
const ps_namuna_18 = require("../application/Migration Scripts/namuna/ps_namuna_18");
const ps_namuna_19_employee_list = require("../application/Migration Scripts/namuna/ps_namuna_19_employee_list");
const ps_namuna_19 = require("../application/Migration Scripts/namuna/ps_namuna_19");
const ps_namuna_20 = require("../application/Migration Scripts/namuna/ps_namuna_20");

const ps_namuna_20c_measurement_register = require("../application/Migration Scripts/namuna/ps_namuna_20c_measurement_register");

const ps_namuna_21 = require("../application/Migration Scripts/namuna/ps_namuna_21");
const ps_namuna_22 = require("../application/Migration Scripts/namuna/ps_namuna_22");
const ps_namuna_23 = require("../application/Migration Scripts/namuna/ps_namuna_23");
const ps_namuna_24 = require("../application/Migration Scripts/namuna/ps_namuna_24");

const ps_namuna_25_investment_register = require("../application/Migration Scripts/namuna/ps_namuna_25_investment_register");
const ps_namuna_27_objection = require("../application/Migration Scripts/namuna/ps_namuna_27_objection");
const ps_namuna_28 = require("../application/Migration Scripts/namuna/ps_namuna_28");
const ps_namuna_29 = require("../application/Migration Scripts/namuna/ps_namuna_29");
const ps_namuna_29_installment = require("../application/Migration Scripts/namuna/ps_namuna_29_installment");

const ps_namuna_30 = require("../application/Migration Scripts/namuna/ps_namuna_30");
const ps_namuna_31 = require("../application/Migration Scripts/namuna/ps_namuna_31");

const ps_namuna_33_tree_details = require("../application/Migration Scripts/namuna/ps_namuna_33_tree_details");
const ps_namuna_32 = require("../application/Migration Scripts/namuna/ps_namuna_32");

// Namuna 3
const ps_n_3_prapatra_b = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_prapatra_b");
const ps_n_3_prapatra_f = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_prapatra_f");
const ps_n_3_prapatra_g = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_prapatra_g");

const ps_n_3_women_children_welfare = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_women_children_welfare");
const ps_n_3_backward_class = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_backward_class");

const ps_n_3_patrak_c_a_tax = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_patrak_c_a_tax");
const ps_n_3_one_b_other_income = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_one_b_other_income");
const ps_n_3_transferred_amount = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_transferred_amount");
const ps_n_3_state_auxiliary_grants = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_state_auxiliary_grants");
const ps_n_3_central_government_grants = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_central_government_grants");
const ps_n_3_initial_balance = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_initial_balance");
const ps_n_3_prapatra_e_current_page = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_prapatra_e_current_page");
const ps_n_3_prapatra_ee_current_page = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_prapatra_ee_current_page");

// प्रपत्र जे
const ps_n_3_patrak_j_public_infra_1 = require("../application/Migration Scripts/namuna/namuna-3/prapatra-j/ps_n_3_patrak_j_public_infra_1");
const ps_n_3_patrak_j_public_infra_2 = require("../application/Migration Scripts/namuna/namuna-3/prapatra-j/ps_n_3_patrak_j_public_infra_2");
const ps_n_3_patrak_j_cleanliness = require("../application/Migration Scripts/namuna/namuna-3/prapatra-j/ps_n_3_patrak_j_cleanliness");
const ps_n_3_patrak_j_education_culture = require("../application/Migration Scripts/namuna/namuna-3/prapatra-j/ps_n_3_patrak_j_education_culture");
const ps_n_3_annual_report_addendum = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_annual_report_addendum");
const ps_n_3_annual_collection_report = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_annual_collection_report");
const ps_n_3_annual_expenditure_report = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_annual_expenditure_report");
const ps_n_3_gp_cost_revaluation = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_gp_cost_revaluation");
const ps_n_3_reciept_book_details = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_reciept_book_details");
const ps_n_3_patrak_g_gp_water_supply = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_patrak_g_gp_water_supply");
const ps_n_3_gp_water_supply_fund = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_gp_water_supply_fund");
const ps_n_3_j_patrak = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_j_patrak");
const ps_n_3_j_patrak_masik_sabha = require("../application/Migration Scripts/namuna/namuna-3/ps_n_3_j_patrak_masik_sabha");
const ps_lok_adalat_notices = require("../application/Migration Scripts/ps_lok_adalat_notices");

const ps_awards = require("../application/Migration Scripts/ps_awards");
const womens_savings_groups_initiative = require("../application/Migration Scripts/womens_savings_groups_initiative");
const womens_savings_group_names = require("../application/Migration Scripts/womens_savings_group_names");
const ps_women_empowerment = require("../application/Migration Scripts/ps_women_empowerment");
const ps_zp_school_points = require("../application/Migration Scripts/ps_zp_school_points");
const ps_asha_workers = require("../application/Migration Scripts/ps_asha_workers");
const ps_water_conservation = require("../application/Migration Scripts/ps_water_conservation");

const ps_committees = require("../application/Migration Scripts/ps_committees");
const ps_committee_members = require("../application/Migration Scripts/ps_committee_members");
const ps_innovative_initiatives = require("../application/Migration Scripts/ps_innovative_initiatives");

const ps_aanganwadi_centers = require("../application/Migration Scripts/ps_aanganwadi_centers");
const ps_aanganwadi_workers = require("../application/Migration Scripts/ps_aanganwadi_workers");
const ps_aanganwadi_yearly_stats = require("../application/Migration Scripts/ps_aanganwadi_yearly_stats");
const ps_aanganwadi_agewise_children = require("../application/Migration Scripts/ps_aanganwadi_agewise_children");
const ps_labor_works = require("../application/Migration Scripts/laborAttendanceSheet/ps_labor_works");
const ps_labor_workers = require("../application/Migration Scripts/laborAttendanceSheet/ps_labor_workers");
const ps_labor_attendance = require("../application/Migration Scripts/laborAttendanceSheet/ps_labor_attendance");

const cleanDuplicateUniqueIndexes = require("./cleanDuplicateUniqueIndexes");
const ps_namuna_2 = require("../application/Migration Scripts/namuna/remaining/ps_namuna_2");
const ps_citizen_complaints = require("../application/Migration Scripts/ps_citizen_complaints");
const ps_citizen_complaints_resolution_dates = require("../application/Migration Scripts/ps_citizen_complaints_resolution_dates");
const ps_ferfar_applications = require("../application/Migration Scripts/ps_ferfar_applications");
const ps_construction_applications = require("../application/Migration Scripts/ps_construction_applications");
const ps_job_cards = require("../application/Migration Scripts/ps_job_cards");
const ps_individual_group_employment_demand_application = require("../application/Migration Scripts/ps_individual_group_employment_demand_application");
const ps_employment_demand_application_namuna_5 = require("../application/Migration Scripts/ps_employment_demand_application_namuna_5");
const ps_tahsil_office_seva = require("../application/Migration Scripts/ps_tahsil_office_seva");
const ps_occupation_noc = require("../application/Migration Scripts/ps_occupation_noc");

// slides
const ps_ppt = require("../application/Migration Scripts/ps_ppt");
const ps_ppt_slides = require("../application/Migration Scripts/ps_ppt_slides");

const ps_bank_details = require("../application/Migration Scripts/ps_bank_details");
const ps_payment_settlements = require("../application/Migration Scripts/ps_bank_settlements");
const migratePointColumns = require("./migratePointColumns");
const { Sequelize } = require("sequelize");
const ps_payment_information = require("../application/Migration Scripts/ps_payments_information");

const ps_payment_receipt_samanya = require("../application/Migration Scripts/ps_payment_receipt_samanya");
const ps_payment_receipt_pani = require("../application/Migration Scripts/ps_payment_receipt_pani");

const ps_payment_transactions_samanya = require("../application/Migration Scripts/ps_payment_transactions_samanya");



const paymentTypesArray = [
  {
    payment_for: 1,
    payment_type: "TAX",
    tax_category: "SAMANYA",
    payment_for_desc: "सामान्य कर भरणा",
  },
  {
    payment_for: 2,
    payment_type: "TAX",
    tax_category: "PANI",
    payment_for_desc: "पाणी कर भरणा",
  },
  {
    payment_for: 3,
    payment_type: "CERTIFICATE",
    tax_category: "SAMANYA",
    payment_for_desc: "विवाह नोंदणी प्रमाणपत्र",
  },
  {
    payment_for: 4,
    payment_type: "CERTIFICATE",
    tax_category: "SAMANYA",
    payment_for_desc: "रहिवासी स्वयंघोषितपत्र",
  },
  {
    payment_for: 5,
    payment_type: "CERTIFICATE",
    tax_category: "SAMANYA",
    payment_for_desc: "नमुना ८ प्रिंट",
  },
  {
    payment_for: 6,
    payment_type: "CERTIFICATE",
    tax_category: "SAMANYA",
    payment_for_desc: "थकबाकी/निराधार प्रमाणपत्र",
  },
];

const backfillPaymentInformation = async () => {
  const transaction = await ps_payment_information.sequelize.transaction();

  try {
    console.log("🔄 Backfilling payment fields for payment_for 1-6...");

    for (const {
      payment_for,
      payment_type,
      tax_category,
      payment_for_desc,
    } of paymentTypesArray) {
      await ps_payment_information.update(
        {
          payment_type,
          tax_category,
          payment_for_desc,
        },
        {
          where: {
            payment_for,
            [Sequelize.Op.or]: [
              { payment_for_desc: null },
              { payment_for_desc: "" },
              { tax_category: null },
              { tax_category: "" },
            ],
          },
          transaction, // ✅ important
        },
      );
    }

    await transaction.commit(); // ✅ commit if all succeed
    console.log("✅ Backfill complete");
  } catch (error) {
    await transaction.rollback(); // ❌ rollback if any fails
    console.error("❌ Backfill failed:", error);
  }
};

const backfillNamuna7Reasons = async () => {
  // ✅ Start transaction
  const transaction = await ps_namuna_7_reasons.sequelize.transaction();

  try {
    console.log("🔄 Backfilling नमुना ७ reasons...");

    // ✅ Raw SQL insert (safe - no overwrite)
    const query = `
INSERT INTO ps_namuna_7_reasons 
(simple_id, reason_in_words, tax_category)

SELECT * FROM (

    SELECT 10 AS simple_id, 'फेरफार फी' AS reason_in_words, 'SAMANYA' AS tax_category
    UNION ALL
    SELECT 11, 'निविदा फी', 'SAMANYA'
    UNION ALL
    SELECT 12, 'बायाना रक्कम (अनामत)', 'SAMANYA'
    UNION ALL
    SELECT 13, 'अनुदान रक्कम', 'SAMANYA'
    UNION ALL
    SELECT 14, 'कोंडवाडा व इतर फी', 'SAMANYA'
    UNION ALL
    SELECT 15, 'इतर फी', 'SAMANYA'

    UNION ALL
    SELECT 11, 'निविदा फी', 'PANI'
    UNION ALL
    SELECT 12, 'बायाना रक्कम (अनामत)', 'PANI'
    UNION ALL
    SELECT 13, 'अनुदान रक्कम', 'PANI'
    UNION ALL
    SELECT 15, 'इतर फी', 'PANI'
    UNION ALL
    SELECT 16, 'नळ कनेक्शन फी', 'PANI'

) AS tmp

WHERE NOT EXISTS (
    SELECT 1 
    FROM ps_namuna_7_reasons t
    WHERE 
        t.simple_id = tmp.simple_id
        AND t.tax_category = tmp.tax_category
);
    `;

    // ✅ Execute query inside transaction
    await ps_namuna_7_reasons.sequelize.query(query, { transaction });

    // ✅ Commit if everything succeeds
    await transaction.commit();

    console.log("✅ नमुना ७ reasons backfill complete (no duplicates)");
  } catch (error) {
    // ❌ Rollback if any error occurs
    await transaction.rollback();

    console.error("❌ Backfill failed:", error);
  }
};

const backfillNamuna5SamanyaReasons = async () => {

  const transaction = await ps_n_5_samanya_reasons.sequelize.transaction();

  try {

    console.log("🔄 Backfilling नमुना 5 SAMANYA reasons...");

    const query = `
INSERT IGNORE INTO ps_n_5_samanya_reasons 
(tax_category, certificate_category, main_reason, reason_in_words)

SELECT * FROM (

    -- =========================
    -- सामान्य कारभार
    -- =========================
    SELECT 'SAMANYA', 'CERTIFICATE', 'सामान्य कारभार', 'नोकरांचा पगार'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'सामान्य कारभार', 'नोकरांचा प्रवास भत्ता'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'सामान्य कारभार', 'ग्रामपंचायत सभासदाचा प्रवासभत्ता'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'सामान्य कारभार', 'कार्यालयीन आकस्मित देय'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'सामान्य कारभार', 'स्टेशनरी वगैरे'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'सामान्य कारभार', 'सरपंच बैठक मानधन'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'सामान्य कारभार', 'सदस्य बैठक मानधन'
 

    -- =========================
    -- दळण वळण
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'दळण वळण', 'रस्ते पुलांची कामे'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'दळण वळण', 'रस्ते पूल दुरुस्त्या'

    -- =========================
    -- आरोग्य रक्षन (नाली सफाई)
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'आरोग्य रक्षन (नाली सफाई)', 'स्थापना पगार'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'आरोग्य रक्षन (नाली सफाई)', 'आकस्मित'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'आरोग्य रक्षन (नाली सफाई)', 'नाली बांधकामे'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'आरोग्य रक्षन (नाली सफाई)', 'दुरुस्त्या नाले, गटारे'

    -- =========================
    -- दिवाबत्ती
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'दिवाबत्ती', 'स्थापना खर्च'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'दिवाबत्ती', 'साहित्य दुरुस्ती'

    -- =========================
    -- बांधकाम
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'बांधकाम', 'कोंडवाणा आवश्यक खर्च'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'बांधकाम', 'को.मो.पगार'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'बांधकाम', 'बांधकाम / दुरुस्त्या'

    -- =========================
    -- ग्रामपंचायत विलीन
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'ग्रामपंचायतविलीन झालेल्या', 'इमारतीची व्यवस्था'

    -- =========================
    -- ग्रामरक्षण
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'ग्रामरक्षण / हत्यारे', 'ग्रामरक्षण / हत्यारे १'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'ग्रामरक्षण / हत्यारे', 'ग्रामरक्षण / हत्यारे २'

    -- =========================
    -- कर्ज व्यवहार
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'कर्ज व्यवहार', 'कर्ज परतफेड'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'कर्ज व्यवहार', 'अग्रीम परतफेड'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'कर्ज व्यवहार', 'कोडवाडा अनामत रकम'

    -- =========================
    -- इतर कामे
    -- =========================
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'इतर कामे', 'कोडवाड्यातील जनावर हर्रास'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'इतर कामे', 'रक्कम परत'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'इतर कामे', 'खर्च रक्कम'
    UNION ALL
    SELECT 'SAMANYA', 'CERTIFICATE', 'इतर कामे', 'अखेर शिल्लक'

) AS tmp;
    `;

    await ps_n_5_samanya_reasons.sequelize.query(query, { transaction });

    await transaction.commit();

    console.log("✅ नमुना 5 SAMANYA backfill completed successfully");

  } catch (error) {

    await transaction.rollback();

    console.error("❌ Backfill failed:", error);

  }
};

const getSync = async () => {
  try {
    // await migratePointColumns()
    console.log("runnning getSync");



    await cleanDuplicateUniqueIndexes();
    const { models } = await sequelize.sync({ alter: true });
    await cleanDuplicateUniqueIndexes();
    
    console.log(Object.keys(models));
    
    console.log(`✅ Total tables created: ${Object.keys(models)?.length}`);
    
    // --- NEW: Backfill payment info ---
    await backfillPaymentInformation();
    
    await backfillNamuna7Reasons();
    
    await backfillNamuna5SamanyaReasons();
    
    console.log(
      "\x1b[47m\x1b[30m%s\x1b[0m",
      "Database has been migrated successfully, you can now start the server.",
    );


    console.log(
      "\x1b[47m\x1b[30m%s\x1b[0m",
      "Use command: npm start (to start the server)",
    );

    process.exit(0);
  } catch (err) {
    // console.log(err);
    console.error("❌ FULL ERROR:");
    console.error(err);
    console.error("❌ SQL ERROR:", err?.parent?.sqlMessage);
    console.error("❌ SQL:", err?.parent?.sql);
  }
};

module.exports = getSync;
