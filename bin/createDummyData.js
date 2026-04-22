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

const createDummyData = async () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      ps_pani_kar.bulkCreate([{ generalWaterTax: 150, specialWaterTax: 1200 }]);
    })
    .then(() => {
      ps_arogya_diva_kar.bulkCreate([
        { adk_min: 0, adk_max: 300, adk_arogya: 20, adk_diva: 20 },
        { adk_min: 301, adk_max: 700, adk_arogya: 40, adk_diva: 40 },
        {
          adk_min: 701,
          adk_max: 10000000,
          adk_arogya: 50,
          adk_diva: 50,
        },
      ]);
    })
    .then(() => {
      ps_bahandkam_prakar.bulkCreate([
        {
          bp_type: "आर सी सी पध्दतिची इमारत",
          bp_ready_nakar_rate: 21296,
          bp_tax_rate: 1.2,
          bp_pd_id: 0,
        },
        {
          bp_type:
            "इतर पक्के (दगड,विटा व चुना किंवा सीमेंट वापरून उभारलेली इमारत )",
          bp_ready_nakar_rate: 15706,
          bp_tax_rate: 0.75,
          bp_pd_id: 0,
        },
        {
          bp_type: "अर्ध पक्के (दगड,विटा वापरेलेली मातीची इमारत )",
          bp_ready_nakar_rate: 11068,
          bp_tax_rate: 0.6,
          bp_pd_id: 0,
        },
        {
          bp_type: "कच्चे (झोपडी किंवा मातीची इमारत)",
          bp_ready_nakar_rate: 7115,
          bp_tax_rate: 0.3,
          bp_pd_id: 0,
        },
        {
          bp_type: "खुली जागा",
          bp_ready_nakar_rate: 790,
          bp_tax_rate: 1.5,
          bp_pd_id: 5,
        },
        {
          bp_type: "खुला प्लॉट",
          bp_ready_nakar_rate: 790,
          bp_tax_rate: 1.5,
          bp_pd_id: 6,
        },
        {
          bp_type: "मनोरे व इतर प्रयोजना (आर सी सी पध्दतिची इमारत)",
          bp_ready_nakar_rate: 0,
          bp_tax_rate: 8,
          bp_pd_id: 4,
        },
      ]);
    })
    .then(() => {
      ps_document_type.bulkCreate([
        { dt_doc_name: "जन्म नोंद दाखला" },
        { dt_doc_name: "मृत्यू नोंद दाखला" },
        { dt_doc_name: "विवाह नोंदणी दाखला" },
        { dt_doc_name: "नमुना नं. 8 चा उतारा" },
        { dt_doc_name: "निराधार असले बाबतचा दाखला" },
        { dt_doc_name: "इतर काम लिहावे कोणते असल्यास" },
        { dt_doc_name: "गावातील तक्रारी नोद येथे लिहावी " },
        { dt_doc_name: "ग्रामपंचायत येणे बाकी नसल्याचा दाखला" },
        { dt_doc_name : "दारिद्र्यरेषेखालचा दाखला"}
      ]);
    })
    .then(() => {
      ps_gallary.bulkCreate([
        { g_image_name: "20221125010157.jpg" },
        { g_image_name: "20221125010204.jpeg" },
        { g_image_name: "20221125010211.jpg" },
      ]);
    })
    .then(() => {
      ps_property_desc.bulkCreate([
        { pd_name: "निवासी", pd_rate: 1 },
        { pd_name: "वाणिज्य", pd_rate: 1.25 },
        { pd_name: "औद्योगिक", pd_rate: 1.2 },
        { pd_name: "मनोरा", pd_rate: 0 },
        { pd_name: "खुली जागा", pd_rate: 0 },
        { pd_name: "खुला प्लॉट", pd_rate: 0 },
      ]);
    })
    .then(() => {
      ps_property_specification.bulkCreate([
        {
          ps_name: "राहते घर",
          ps_land_rate: "670",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "गुरांचा गोठा",
          ps_land_rate: "670",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "दाभ्याचे घर",
          ps_land_rate: "670",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पडके घर पत्राचे",
          ps_land_rate: "670",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "टीनाचे पत्रे",
          ps_land_rate: "670",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पहिलामाळा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "दूसरा माळा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "तिसरा माळा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "चौथा माळा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पाचवा माळा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "मंदिर",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "मस्जिद",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "समाज मंदीर",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "शासकीय सभागृह",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "कोंडवाडा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "जि.प.शाळा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "सरकारी कॉटर्स",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "शासकीय शाळा व कॉलेज",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "अंगणवाडी",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "ग्रा.प.कार्यालय",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "पाण्याची टाकी",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "सरकारी बगीचा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "सरकारी दवाखाना",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "सरकारी विहीर",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "वाणिज्य",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "दुकान",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "मेझेनाईन माळा",
          ps_land_rate: "0",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पहिला माळा",
          ps_land_rate: "0",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "दूसरा माळा",
          ps_land_rate: "0",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "तिसरा माळा",
          ps_land_rate: "0",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "चौथा माळा",
          ps_land_rate: "0",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पाचवा माळा",
          ps_land_rate: "0",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "W/C @ BATH",
          ps_land_rate: "0",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "मेडिकल",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "हॉटेल",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "चक्की",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "चालू गोदाम",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "चित्रपट गृह",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "खाजगी शाळा",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "खाजगी कॉलेज",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "मंगल कार्यालय",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पोट्री फॉर्म",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "खाजगी बँक",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "क्रेशर व खदान",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पेट्रोल पंप",
          ps_land_rate: "670",
          ps_pd_id: "2",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "औद्योगिक",
          ps_land_rate: "670",
          ps_pd_id: "3",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पहिला माळा",
          ps_land_rate: "0",
          ps_pd_id: "3",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "दूसरा माळा",
          ps_land_rate: "0",
          ps_pd_id: "3",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "तिसरा माळा",
          ps_land_rate: "0",
          ps_pd_id: "3",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "पवन चक्की",
          ps_land_rate: "670",
          ps_pd_id: "3",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "ऊर्जा कंपनी",
          ps_land_rate: "670",
          ps_pd_id: "3",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "मनोऱ्याचे-मोबाईल टावर",
          ps_land_rate: "8",
          ps_pd_id: "4",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "मनोऱ्याचे पवन चक्की",
          ps_land_rate: "8",
          ps_pd_id: "4",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "खुली जागा",
          ps_land_rate: "670",
          ps_pd_id: "5",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "खुला प्लॉट",
          ps_land_rate: "670",
          ps_pd_id: "6",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "खुली जागाचा कोच",
          ps_land_rate: "670",
          ps_pd_id: "5",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "खुली जागा बोळ",
          ps_land_rate: "670",
          ps_pd_id: "5",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "शासकीय व इतर  खुली जागा",
          ps_land_rate: "0",
          ps_pd_id: "5",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
        {
          ps_name: "राहते घर (नियमाकुल जागा )",
          ps_land_rate: "670",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "अतिक्रमण जागा ",
          ps_land_rate: "670",
          ps_pd_id: "1",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "अतिक्रमण जागा ",
          ps_land_rate: "670",
          ps_pd_id: "5",
          ps_skeep_tax: "0",
          ps_skip_diwa_arogya: "0",
          ps_skip_cleaning_tax: "0",
          ps_skip_tree_tax: "0",
          ps_skip_fireblegate_tax: "0",
          ps_skip_education_tax: "0",
        },
        {
          ps_name: "सरकारी धर्माळा",
          ps_land_rate: "0",
          ps_pd_id: "1",
          ps_skeep_tax: "1",
          ps_skip_diwa_arogya: "1",
          ps_skip_cleaning_tax: "1",
          ps_skip_tree_tax: "1",
          ps_skip_fireblegate_tax: "1",
          ps_skip_education_tax: "1",
        },
      ]);
    })
    .then(() => {
      ps_ghasara_rate.bulkCreate([
        { gr_min: 0, gr_max: 2, gr_type_one: 1, gr_type_two: 1 },
        { gr_min: 3, gr_max: 5, gr_type_one: 0.95, gr_type_two: 0.95 },
        { gr_min: 6, gr_max: 10, gr_type_one: 0.85, gr_type_two: 0.9 },
        { gr_min: 11, gr_max: 20, gr_type_one: 0.75, gr_type_two: 0.8 },
        { gr_min: 21, gr_max: 30, gr_type_one: 0.6, gr_type_two: 0.7 },
        { gr_min: 31, gr_max: 40, gr_type_one: 0.45, gr_type_two: 0.6 },
        { gr_min: 41, gr_max: 50, gr_type_one: 0.3, gr_type_two: 0.5 },
        { gr_min: 51, gr_max: 60, gr_type_one: 0.2, gr_type_two: 0.4 },
        {
          gr_min: 61,
          gr_max: 10000,
          gr_type_one: 0.15,
          gr_type_two: 0.3,
        },
      ]);
    })
    .then(() => {
      ps_gp_sites.bulkCreate([
        {
          gps_name: "जन्म मृत्यू नोंदणी",
          gps_site: "http://crsorgi.gov.in/",
        },
        { gps_name: "CSC Digital सेवा", gps_site: "" },
        {
          gps_name: "आपलं सरकार सेवा",
          gps_site: "https://aaplesarkar.mahaonline.gov.in/en",
        },
        {
          gps_name: "Area Profiler",
          gps_site: "http://areaprofiler.gov.in/",
        },
        {
          gps_name: "Service Plus",
          gps_site: "https://serviceonline.gov.in/",
        },
        {
          gps_name: "LG Directory",
          gps_site: "https://www.lgdirectory.gov.in/",
        },
        {
          gps_name: "E-Panchayet",
          gps_site: "https://panchayatonline.gov.in/",
        },
        {
          gps_name: "Accounting",
          gps_site: "https://accountingonline.gov.in",
        },
        {
          gps_name: "Planing Online",
          gps_site: "https://planningonline.gov.in",
        },
        {
          gps_name: "PM Arogya Yojana/Card",
          gps_site: "https://pmjay.gov.in/",
        },
        {
          gps_name: "सर्व सेवा करिता आपलं सरकार सेवा",
          gps_site: "https://cscservices.mahaonline.gov.in/",
        },
      ]);
    })
    .then(() => {
      ps_meter_rates.bulkCreate([
        { unit_form: 0, unit_to: 126, rate: 900 },
        { unit_form: 127, unit_to: 1000000, rate: 7.64 },
      ]);
    })
    .then(() => {
      ps_gharkul_yojna.bulkCreate([
        { gy_name: "नाही" },
        { gy_name: "इंदिरा आवास  घरकुल योजना" },
        { gy_name: "रमाई आवास  घरकुल योजना" },
        { gy_name: "प्रधानमंत्री आवास घरकुल योजना" },
        { gy_name: "शबरी आवास  घरकुल योजना" },
        { gy_name: "यशवंतराव चव्हाण  मुक्त वसाहत घरकुल  योजना" },
        { gy_name: "पारधी पॅकेज घरकुल योजना" },
        { gy_name: "इतर घरकुल योजना" },
      ]);
    })
    .then(() => {
      ps_gram_sadasya_post.bulkCreate([
        { post_name: "सरपंच" },
        { post_name: "उपसरपंच" },
        { post_name: "ग्रामपंचायत अधिकारी" },
        { post_name: "सदस्य/सदस्या" },
        { post_name: "तलाठी" },
        { post_name: "पोलीस पाटील" },

        { post_name: "गावातील मार्गदर्शक" },
        { post_name: "कृषी सहाय्यक" },
        { post_name: "ग्रामपंचायत कर्मचारी" },
        { post_name: "पाणीपुरवठा कर्मचारी" },

        { post_name: "संगणक परिचालक" },
        { post_name: "रोजगार सेवक" },
        { post_name: "विद्युत सहाय्यक" },
        { post_name: "तंटामुक्त अध्यक्ष" },
      ]);
    })
    .then(() => {
      ps_gram_sadasya_to.bulkCreate([
        { to_name: "मुख्य सदस्य" },
        { to_name: "उपसदस्य" }, // Combined into one word
        { to_name: "कर्मचारी/लिपिक" }, // Correct as is; no space needed
        { to_name: "गावातील प्रतिष्ठित नागरिक" }, // Corrected spelling
        { to_name: "गावातील मार्गदर्शक" }, // This is correct as is

        // New ones added later, told later
        { to_name: "पदाधिकारी" },
        { to_name: "अधिकारी" },
        { to_name: "कर्मचारी वर्ग" },
        { to_name: "गावातील रोजगार" },
      ]);
    })
    .then(() => {
      ps_gram_panchayet.create({
        gp_name: "मासोद",
        user_name: "a",
        password: "a",
        masterUserName: "m",
        masterPassword: "m",
        gp_post: null,
        gp_pincode: "444602",
        gp_taluka: "अमरावती",
        gp_dist: "अमरावती",
        gp_state: "महाराष्ट्र",
        gp_email: "chandreshgawali90@gmail.com",
        gp_contact: "42.303",
        gp_map:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.9067060616396!2d77.8322554176922!3d20.960006985342712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a3e18508d0e1%3A0x461d0c7c7a99efef!2sMasod%2C%20Maharashtra%20444901!5e0!3m2!1sen!2sin!4v1679130640892!5m2!1sen!2sin",
        gp_info_one:
          '[{"info":"ग्रामपंचायत मासोद गाव विद्यापीठ रोड ते मार्डी रोड  पश्चिमेस ८ कि.मी.अंतरावर वसलेले गाव आहे.हे एक आदर्श सुंदर गाव आहे."},{"info":"ग्रामपंचायत मासोद  ग्रामपंचायत ची स्थापना १९६६ या साली झाली."}]',
        gp_info_three:
          '[{"info":"ग्रामपंचायत मासोद अंतर्गत वृक्ष लागवड करण्यात आली."},{"info":"ग्रामपंचायत मासोद ने स्वच्छ भारत मिशन अर्तागत प्रमाणपत्र मिळालेले आहे  "},{"info":"ग्रामपंचायत मासोद मार्फत  नवयुवक मुलांकरिता व्यायाम शाळा करण्यात आली  आहे "},{"info":"ग्रामपंचायत मासोद  अंतर्गत गावातील रस्ते, नाली व रस्त्याच्या कडेला चेकर्स बसविण्यात आलेले आहे"},{"info":"ग्रामपंचायत मासोद  सन २०१७-२०१८, मध्ये ग्रामपंचायत कार्यालय इमारत सुंदर स्वरूपात उभारण्यात आली"},{"info":"ग्रामपंचायत मासोद  iso प्रमाणित केलेली आहे"}]',
        gp_is_live: 1,
        gp_ward: 3,
        gp_sadasya: 9,
        gp_member:
          '[{"name":"ABC","post":1,"section":1,"p_name":"सरपंच","s_name":"मुख्य सदस्य","image":"20230816145450.jpg","priority":0},{"name":"SDF","post":6,"section":2,"p_name":"संगणक परिचालक","s_name":"उप सदस्य","image":"20230828101926.jpeg","priority":1},{"name":"xyz","post":3,"section":3,"p_name":"ग्रामपंचायत अधिकारी","s_name":"कर्मचारी / लिपिक","image":"20230828101308.jpeg","priority":2},{"name":"QWE","post":5,"section":3,"p_name":"सदस्य","s_name":"कर्मचारी / लिपिक","image":"20230816145802.jpg","priority":3},{"name":"POIU","post":8,"section":4,"p_name":"पाणी पुरवठा कर्मचारी","s_name":"गावातील प्रतिष्टीत नागरीक","image":"20230816145841.jpg","priority":4},{"name":"MNM","post":12,"section":3,"p_name":"तलाठी","s_name":"कर्मचारी / लिपिक","image":"20230816145908.jpg","priority":5},{"name":"HFHD","post":6,"section":2,"p_name":"संगणक परिचालक","s_name":"उप सदस्य","image":"20230816150119.jpg","priority":6},{"name":"YUIP","post":6,"section":4,"p_name":"संगणक परिचालक","s_name":"गावातील प्रतिष्टीत नागरीक","image":"20230816150200.jpg","priority":7},{"name":"chandresh gawali ","post":13,"section":5,"p_name":"गावातील मार्गदर्शक","s_name":"गावातील मार्गदर्शक","image":"20230828134053.jpg"}]',
        pg_registration_no: 43,
        gp_working_from: 2021,
        gp_working_to: 2022,
        gp_backup_done: 0,
        ps_gram_adarsh_takta:
          '{"ग्रामपंचायत स्थापना":"0","एकूण लोकसंख्या":"0","एकूण पुरुष":"0","एकूण महिला":"0","गावाचे भौगेलिक क्षेत्र":"0","एकून खातेदार संख्या":"","एकून कुटुंब संख्या":"","एकून घर संख्या":"","एकून  शौच्छालय संख्या ":"","गृह कर":"","पाणी कर ":"","एकून खाजगी नळ सख्या ":"","एकून सार्वजनिक नळ सख्या ":"","एकून हातपंप":"","विहीर":"","टयुबवेल":"","इंदिरा आवास घरकुल / इतर घरकुल योजना संख्या ":"","सुवर्ण जयंती ग्राम स्वच्छता योजना लाभार्थी":"","एकून शेतकरी संख्या":"","एकून सिचंन विहिरीची संख्या":"","एकून गुरांची संख्या":"","एकून गोठयांची संख्या":"","बचत गट संख्या":"","अंगणवाडी ":"","खाजगी शाळा संख्या ":"","जिल्हा परिषद शाळा  संख्या ":"","एकून गोबर गॅस संख्या ":"","एकून गॅस जोडणी संख्या":"","एकून विद्युत  पोल संख्या":"","प्राथमिक आरोग्य केंद्र किवा उपकेंद्र ":"","प्रवासी निवारा":"","ग्राम पंचायत कर्मचारी":"","संगणक परिचालक":"","ग्राम रोजगार सेवक":"","महिला बचत गट संस्था":"","समाज मंदिर ":"","हनुमान मंदिर":"","पशुवैधाकिय दवाखाना":"","पोस्ट आफिस":""}',
        gp_site_count: 745,
        gp_mahiti_title: "यशोगाथा गावाची….....!",
        gp_mahiti_details:
          '<p class="fw - bold mt - 5 text - indent"><span style="font - size: 1rem; "> – मा. शशिकांत  मंगळे ,सरपंच ,कसबेगव्हाण -भ्रम.क्र.८४११०७०१०१</span><br></p><p class="fw - bold mt - 3 text - indent"> <strong class="text - orange">"गाव हा विश्वाचा नकाशा, गावावरून देशाची परीक्षा, गावाची भंगता अवदसा येईल देशा"  </strong>असा संदेश वंदनीय राष्ट्रसंत तुकडोजी महाराजांनी ग्रामगीतेतून दिला आहे. राष्ट्रसंताचा हा संदेश प्रत्यक्ष कृतीत आणून अमरावती जिल्हातील  अंजनगाव सुर्जी तालुक्यांतील कसबेगव्हाण या गावाने डोंगराएवढ्या उंचीची कामे करीत विधवा कुप्रथा बंदीचा ठराव घेऊन राज्य पातळीवर गौरव प्राप्त केला आहे.</p><p class="fw - bold mt - 3 text - indent">कसबेगव्हाण चे सरपंच मा.शशिकांत मंगळे यांनी गाव विकासाचे ध्येय स्वीकारले. त्यांचा विश्वास कृतीत आणण्यासाठी ग्रामविकास अधिकारी मा.नरेश भारसाकळे, उपसरपंच, ग्रा.प.सदस्य व ग्रामस्थांनी पुढाकार घेतल्याने गावाची प्रगतीकडे वाटचाल सुरू आहे.गावातील नागरिकांना उच्चदर्जाच्या  सुविधा उपलब्ध करून दिल्या जात असून  विविध पुरस्कार मिळविलेल्या  महात्मा गांधी तंटामुक्ती अभियान , संत गाडगेबाबा ग्राम स्वच्छता अभियान व आर. आर. आबा पाटील स्मार्टग्राम पुरस्काराने गावाची राज्य स्तरावर ओळख निर्माण  केली आहे.अंजनगाव  सुर्जी तालुक्यातील कसबेगव्हाण ग्रामपंचायतीने गावपातळीवरील वैयक्तिक  विकासाच्या  योजना प्रभावीपणे राबणवल्या आहेत. ग्रामविकासाच्या योजनांची योग्य अंमलबजावणी, पारदर्शक  कामकाज यामुळे ग्रामपंचायतीने प्रत्येक कामात यश संपादन केले आहे.</p><p class="fw - bold mt - 3 text - indent">ग्रामपंचायतच्या जुन्या इमारतीची दुरुस्ती करून नव्याने इमारत उभारण्यात आली आहे. ग्राम पंचायत कार्यालय अग्निशमन यंत्र,प्रथमोपचारपेटी,आपत्कालीन संपर्क क्रमांकाचे सूचना फलक, पीण्यासाठी आरओचे शुद्ध पाणी, भूमीगत गटारे, जादुई शोष खड्डे, कचऱ्याचे ओला व सुका वर्गीकरण , सांडपाणी व्यवस्थापण,सुसज्ज अंगणवाडी, डिजीटल प्राथमिक शाळा या सर्व  सुविधामुळे ग्राम पंचायत, प्राथमिक  शाळा, अंगणवाडी, वाचनालय मध्ये उच्च दर्जाच्या  सोयी सुविधा  उपलब्ध असून व गावातील रस्त्यांच्या दुतर्फा  वृक्षरोपण करून वृक्षवल्ली गावात येणाऱ्या पाहुण्यांचे स्वागत करीत असल्याचे जाणवते . </p><p class="fw - bold mt - 3 text - indent">सन १९८९ पासून सतत २० वर्ष  सरपंच पदी आरूढ असणारे दृढ निश्चीयी  सरपंच शशिकांत  मंगळे यांच्या कार्यकाळात गावाने कात टाकली. हळूहळू  परिवर्तनाची  कास धरीत विविध  स्पर्धामध्ये सहभाग घेण्यास सुरुवात केली. १९८९ साली प्रथमवेळी सरपंचपदाची धुरा हाती घेणारे मा.शशिकांत  मंगळे यांनी गाव विकास  करण्याचे ध्येय स्पष्ट केले. २०१५ पासून ग्राम पंचायत ने  १ ते ३३ नमुने ऑनलाइन करून संगणकीकृत दाखले व प्रमाणपत्र देणे सुरू केले आणि  आर आर आबा पाटील  स्मार्ट  ग्राम पुरस्काराने गौरणवण्यात आले, ही फक्त सुरुवात होती. मग गावाने मागे वळून बघितलेच नाही. पुढे संत गाडगेबाबा ग्राम स्वछता अभियानात तालुका,जिल्हा  व विभागीय स्तरावरील पुरस्काराने सन्मानित करण्यात आले. गावात पिण्याच्या पाण्याची समस्या कधीही उद्भवू नये म्हणून जीवन प्राधिकरणची ७९ गाव पाणीपुरवठा योजना गावात कार्यान्वयित करण्यात आली.सरपंच मा.शशिकांत मंगळे यांनी या योजनेकरिता थेट मंत्रालय स्तरावर पाठपुरावा करून ही योजना गावात खेचून आणली .आज गाव पाणी टंचाई मुक्त आहे.घरोघरी नळ बसवून त्याद्वारे पाणीपुरवठा होत आहे. गावात लोकसहभागातून श्रमदानाने नदीवर बंधारे बांधले आहेत. त्याचा फायदा असा झाला की आज विहीरीचे पाणी फक्त २० फुटावर आहे. त्यामुळे भविष्यातील पाणीटंचाईची समस्या दूर झाली. रोजगार हमीवर असणारे कामगार व ग्रामस्थांनी घरोघरी शोषखड्डे करून दिले. त्यामुळे गावातील पाणी गावातच मुरू लागले व नाल्यांचे प्रमाणकमी झाल्यामुळे गावातील रोगराई कमी झाली. गावात अनेक लोकांना घरकुल योजनेतून घरे देण्यात आली. येणा-या काळात कोणाचेही मातीचे घर दिसणार नाही असा निरधार सरपंच मा.शशिकांत मंगळे यांनी व्यक्त केला आहे . गावात घरोघरी ग्रामपंचायतद्वारे ओला कचरा व सुखा कच-यासाठी वेगवेगळे डबे देण्यात आले. चौकाचौकात कच-यासाठी ड्रम ठेवण्यात आले. कचरा गाडी घरोघरी जाऊन कचरा गोळा करुन त्यासाठी बनविलेल्या टाक्यात टाकुन कंपोस्ट खत तयार केले जाते. उज्ज्वल गॅस योजने अंतर्गत अनेकांना गॅसची सुविधा करून देण्यात आली आहे. गावात अनेक ठिकाणी  सौर दिवे  सुद्धा लावण्यात आले आहेत. लोकसहभागातून गावातील रस्त्यांच्या दुतर्फा  वृक्षलागवड करून पाणी अडणवण्यासाठी नदीमध्ये बंधारे बांधून गावातील शेती सिंचन समस्येवर मात करण्यात आली आहे . सामाजिक  उपक्रमातून राज्यस्तरावर आदर्श  पुरस्काराच्या निधीतून सार्वजनिक  ठिकाणी शौचालय व स्वछतागृह तयार करण्यात आले. गावातील रुग्णांना गावातच आरोग्य शीबिरे घेऊन आरोग्याच्या सुविधा दिल्या जात आहेत.मोठ्यात मोठी शस्त्रक्रिया  करण्यासाठी सरपंच मा.शशिकांत मंगळे यांचा नेहमीच पुढाकार असतो.अपंग दिनापासून सर्वच महापुरुषांच्या जयंती दिनी  प्रबोधनात्मक कार्यक्रमाचे  आयोजन ग्राम पंचायत मध्ये केले जाते.महिलांच्या  सन्मान म्हणून महिला  दीन व विधवा महिला  दीन प्रबोधनातून साजरा करणारी कसबेगव्हाण ग्राम पंचायत या अर्थाने  वेगळी ओळख निर्माण करते .तर विधवा कुप्रथा बंदीचा ठराव घेऊन कसबेगव्हाण ग्राम पंचायत ने विधवा महिलाचा सन्मान राखून राज्यस्तरावर आपला आदर्श निर्माण  केला आहे.  </p><p class="fw - bold mt - 3 mb - 0"> <strong class="text - orange"> शासकीय दाखले , शासकीय योजनांचा मोफत लाभ</strong></p><p class="fw - bold mt - 0 text - indent">गावातील नागरिकांचे  कर वसुलीत सहकार्य मिळावे म्हणून आर्थिक वर्षाच्या सुरुवातीला एप्रिल व मे महिन्यात शंभर टक्के कर भरणाऱ्या कुटुंबाना वर्षभर विविध  शासकीय योजनांचा मोफत लाभ देण्यात येतो.शासकीय दाखले गावातच उपलब्ध करून देण्यासाठी शिबिरे  आयोणजत केली जातात .ग्रामस्थांना मोबाईलवर मेसेज द्वारे दवंडीची सूचना दिली जाते.विविध  धाडसी उपक्रम राबवून ग्रामपंचायतीने नवलौकिक मिळविला  आहे.</p><p class="fw - bold mt - 3 mb - 0"> <strong class="text - orange">लोकसहभागातून विकास </strong></p><p class="fw - bold text - indent">गावाने लोक सहभागातून कात टाकली असून इतरांसाठी विकासाची  प्रेरणा देणारे मॉडेल ठरले आहे. येथे भेट देणारे लोक येथील कामे पाहून भारावून जातात. रोजगार हमी योजनेतून कुटुंबाना शंभर दिवस  काम उपलब्ध करून देणारी ही तालुक्यातील एकमेव ग्राम पंचायत आहे. गावात प्रत्येक घरी शौचालये असून गाव १०० टक्के हागणदारीमुक्त आहे.</p>',
        gp_gramMahitiSamitiList: "[]",
        gp_gramMahitiUdyogiList: "[]",
        gp_gramNewsList: "[]",
        gp_gramKendraPhoto: "kendra - 20221125003809.jpg",
        gp_gramKendraList: "[]",
        gp_gramYojanaList: "[]",
        gp_postList: '["तलाठी कार्यालय व सभागृह"]',
        gp_dastavegList: '[""]',
      });
    })
    .then(() => {
      console.log(
        '\x1b[47m", \x1b[30m%s\x1b[0m',
        "Dummy DB has been successfully created, you can start the server now."
      );
      console.log(
        '\x1b[47m", \x1b[30m%s\x1b[0m',
        "Use command: npm start (to start the server)"
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = createDummyData;

/** for later to implement for this
const readline = require('readline');

const createDummyData = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\x1b[31m%s\x1b[0m', 'WARNING: This will DELETE ALL YOUR PREVIOUS DATA!'); // Red text

  rl.question('Are you sure you want to run this? If yes, type: CONFIRM RUN. Otherwise, press any other key to cancel.\n> ', (answer) => {
    if (answer.trim() === 'CONFIRM RUN') {
      console.log('Proceeding with dummy data creation...');

      // 🔽 Your actual logic goes here:
      resetDatabase(); // <-- replace with your real function

    } else {
      console.log('Operation cancelled.');
    }

    rl.close();
  });
};
 */
