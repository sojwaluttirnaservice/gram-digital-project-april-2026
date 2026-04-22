let MasterController = require("../application/controllers/MasterController");
let express = require("express");
let middleware = require("./middleware");
const meetingsController = require("../application/controllers/zoom-meetings/meetingsController");
const qrCodeRouter = require("./qrCode/qrCodeRouter");
const gharkulYojanaRouter = require("./gharkulYojana/gharkulYojanaRouter");
let router = express.Router();

router.get("/", middleware.checkForPoolConnection, MasterController.homeView);

router.use("/qr-codes", qrCodeRouter);

router.use("/gharkul-yojana", gharkulYojanaRouter)

router.post(
  "/masterLoginCheck",
  middleware.checkForPoolConnection,
  MasterController.masterLogin
);

router.get(
  "/masterLogin",
  middleware.checkForPoolConnection,
  MasterController.getMasterLoginView
);
router.get(
  "/gram-adhik-info",
  middleware.checkForPoolConnection,
  MasterController.gramAdhikInfo
);

router.post(
  "/saveGramMahiti",
  middleware.checkForPoolConnection,
  MasterController.saveGramMahiti
);
router.post(
  "/upload/modalGramMahitiTwoList",
  middleware.checkForPoolConnection,
  MasterController.saveModalGramMahitiTwoList
);

router.post(
  "/delete/modalGramMahitiTwoList",
  middleware.checkForPoolConnection,
  MasterController.deleteModalGramMahitiTwoList
);

router.post(
  "/upload/modalGramMahitiThreeList",
  middleware.checkForPoolConnection,
  MasterController.saveModalGramMahitiThreeList
);
router.post(
  "/upload/modalGramMahitiFourList",
  middleware.checkForPoolConnection,
  MasterController.saveModalGramMahitiFourList
);
router.post(
  "/upload/modalGramMahitiFiveList",
  middleware.checkForPoolConnection,
  MasterController.saveModalGramMahitiFiveList
);

router.post(
  "/upload/modalGramMahitiFiveListOne",
  middleware.checkForPoolConnection,
  MasterController.saveModalGramMahitiFiveListOne
);

router.post(
  "/upload/modalGramMahitiSixList",
  middleware.checkForPoolConnection,
  MasterController.saveModalGramMahitiSixList
);

router.get(
  "/set-nine-backup",
  middleware.checkForPoolConnection,
  MasterController.setNineBackup
);
router.post(
  "/update-backup-nine",
  middleware.checkForPoolConnection,
  MasterController.updateBackupNine
);
router.get(
  "/backup-nine",
  middleware.checkForPoolConnection,
  MasterController.backupNine
);
router.get(
  "/user-excel",
  middleware.checkForPoolConnection,
  MasterController.userExcel
);
router.get(
  "/gram-manager",
  middleware.checkForPoolConnection,
  MasterController.gramManager
);

router.post(
  "/save-village-guide",
  middleware.checkForPoolConnection,
  MasterController.saveVillageGuideDetails
);

router.get(
  "/gram-village-update-view",
  middleware.checkForPoolConnection,
  MasterController.getGramVillageUpdateView
);

router.get(
  "/gram-sadasya",
  middleware.checkForPoolConnection,
  MasterController.gramSadasya
);

router.post(
  '/gram-sadasya/add-section',
  middleware.checkForPoolConnection,
  MasterController.addSection
);

router.get(
    '/gram-sadasya/section',
    middleware.checkForPoolConnection,
    MasterController.getSectionList
)


router.delete(
    '/gram-sadasya/delete-section/:sId',
    middleware.checkForPoolConnection,
    MasterController.deleteSection
)

router.get(
  "/karSudharni",
  middleware.checkForPoolConnection,
  MasterController.karSudharni
);

router.get(
  "/gram-rate-setting",
  middleware.checkForPoolConnection,
  MasterController.gramRateSetting
);
router.get(
  "/arogyaDivabattiKarSetting",
  middleware.checkForPoolConnection,
  MasterController.arogyaDivabattiKarSetting
);
router.post(
  "/arogyaDivabattiKarSetting",
  middleware.checkForPoolConnection,
  MasterController.updateArogyaDivaKar
);
router.get(
  "/paniKarSetting",
  middleware.checkForPoolConnection,
  MasterController.getPaniKarSettingView
);
router.post(
  "/updatePaniKar",
  middleware.checkForPoolConnection,
  MasterController.updatePaniKar
);
router.get(
  "/bandkamRedinatorKarSetting",
  middleware.checkForPoolConnection,
  MasterController.getBandkamRedinatorSetting
);
router.post(
  "/bandKamRedinatorSetting",
  middleware.checkForPoolConnection,
  MasterController.postBandkamRedinatorSetting
);

router.post(
  "/updatePropertyRateAll",
  middleware.checkForPoolConnection,
  MasterController.updatePropertyRateAll
);
router.get(
  "/gram-list-setting",
  middleware.checkForPoolConnection,
  MasterController.gramListSetting
);
router.get(
  "/set-meter-backup",
  middleware.checkForPoolConnection,
  MasterController.setMeterBackUp
);
router.get(
  "/backup-master",
  middleware.checkForPoolConnection,
  MasterController.createBackupMaster
);
router.post(
  "/save-list",
  middleware.checkForPoolConnection,
  MasterController.saveList
);
router.post(
  "/saveGpSadasyaPost",
  middleware.checkForPoolConnection,
  MasterController.saveGpSadasyaPost
);
router.post(
  "/saveGpDastaveg",
  middleware.checkForPoolConnection,
  MasterController.saveGpDastaveg
);

router.post(
  "/deleteDastavej",
  middleware.checkForPoolConnection,
  MasterController.deleteDastavej
);
router.post(
  "/deletePost",
  middleware.checkForPoolConnection,
  MasterController.deletePost
);
router.post(
  "/manage-gp/save-gp-info-1",
  middleware.checkForPoolConnection,
  MasterController.saveGpInfoOne
);
router.post(
  "/manage-gp/save-gp-info-2",
  middleware.checkForPoolConnection,
  MasterController.saveGpInfoTwo
);
router.post(
  "/manage-gp/save-gp-info-3",
  middleware.checkForPoolConnection,
  MasterController.saveGpInfoThree
);
router.get(
  "/manage-gp/get-village-list",
  middleware.checkForPoolConnection,
  MasterController.getVillageList
);
router.post(
  "/manage-gp/save-update-village",
  middleware.checkForPoolConnection,
  MasterController.saveUpdateVillage
);
router.post(
  "/manage-gp/remove-village",
  middleware.checkForPoolConnection,
  MasterController.removeVillage
);
router.post(
  "/manage-gp/update-member",
  middleware.checkForPoolConnection,
  MasterController.updateMember
);

router.put(
  `/manage-gp/update-single-member`,
  middleware.checkForPoolConnection,
  MasterController.updateSingleMember
);

router.post(
  "/manage-gp/upload-image",
  middleware.checkForPoolConnection,
  MasterController.uploadImage
);
router.post(
  "/manage-gp/delete-image",
  middleware.checkForPoolConnection,
  MasterController.deleteImage
);

//Video Gallery Photos
router.post(
  "/manage-gp/upload-video-gallery-link",
  middleware.checkForPoolConnection,
  MasterController.uploadVideoGalleryLink
);
router.delete(
  "/manage-gp/delete-video-gallery-link",
  middleware.checkForPoolConnection,
  MasterController.deleteVideoGalleryLink
);
router.post(
  "/rate-setting/save-new-gram-prop-specification",
  middleware.checkForPoolConnection,
  MasterController.saveNewPropSpecification
);

router.post(
  "/rate-setting/update-gram-prop-specification",
  middleware.checkForPoolConnection,
  MasterController.updateNewPropSpecification
);

router.post(
  "/rate-setting/remove-gram-prop-specification",
  middleware.checkForPoolConnection,
  MasterController.removeNewPropSpecification
);

router.get(
  "/adarsh-takta",
  middleware.checkForPoolConnection,
  MasterController.adarshTakta
);

router.post(
  "/update-takta",
  middleware.checkForPoolConnection,
  MasterController.updateTakta
);

// divyanga file upload page.
router.get(
  "/upload-divyanga-people-yadi-view",
  middleware.checkForPoolConnection,
  MasterController.get_divyanga_people_yadi_upload_page
);

router.post(
  "/upload-divyanga-people-yadi",
  middleware.checkForPoolConnection,
  MasterController.post_divyanga_people_yadi
);

router.post(
  "/delete-divyanga-file",
  middleware.checkForPoolConnection,
  MasterController.delete_divyanga_file
);

// GR upload
// prettier-ignore
router.get(
  '/upload-gr',
  middleware.checkForPoolConnection,
  MasterController.get_gr_upload_view
)

router.post(
  "/upload-gr-file",
  middleware.checkForPoolConnection,
  MasterController.upload_gr_file
);

router.post(
  "/delete-gr-file",
  middleware.checkForPoolConnection,
  MasterController.delete_gr_file
);

// education-institute-details

router.get(
  "/get-add-education-details",
  middleware.checkForPoolConnection,
  MasterController.get_add_education_details_view
);

router.get(
  "/master-institute-details-view",
  middleware.checkForPoolConnection,
  MasterController.get_single_education_institute_details_view
);

router.get(
  "/master-institute-gallery-view",
  middleware.checkForPoolConnection,
  MasterController.getEducationInstituteGalleryView
);

router.post(
  "/master-add-institute-gallery-photo",
  middleware.checkForPoolConnection,
  MasterController.addEducationInstituteGalleryPhoto
);

router.post(
  "/master-delete-institute-gallery-photo",
  middleware.checkForPoolConnection,
  MasterController.deleteEducationInstituteGalleryPhoto
);

router.post(
  "/upload-education-institute-details",
  middleware.checkForPoolConnection,
  MasterController.upload_education_institute_details
);
router.post(
  "/delete-institute-details",
  middleware.checkForPoolConnection,
  MasterController.delete_education_institute_details
);

router.post(
  "/edit-education-institute-details",
  middleware.checkForPoolConnection,
  MasterController.edit_education_institute_details
);

// education-institute-staff-details
router.get(
  "/get-education-institute-add-staff-view",
  middleware.checkForPoolConnection,
  MasterController.get_education_institute_add_staff_view
);

router.post(
  "/update-education-institute-staff-details",
  middleware.checkForPoolConnection,
  MasterController.update_education_institute_staff_details
);

router.post(
  "/upload-education-institute-staff-details",
  middleware.checkForPoolConnection,
  MasterController.upload_education_institute_staff_details
);
router.post(
  "/delete-institute-staff-details",
  middleware.checkForPoolConnection,
  MasterController.delete_education_institute_staff_details
);

router.get(
  "/medical-room",
  middleware.checkForPoolConnection,
  MasterController.getMedicalRoomView
);

//कृषी विज्ञान
router.get(
  "/upload-krishi-vidnyan-view",
  middleware.checkForPoolConnection,
  MasterController.getKrishiVidnyanView
);

router.post(
  "/upload-krishi-vidynan-file",
  middleware.checkForPoolConnection,
  MasterController.uploadKrishiVidnyanFile
);

router.delete(
  "/delete-krishi-vidnyan-file",
  middleware.checkForPoolConnection,
  MasterController.deleteKrishiVidnyanFile
);

// Repeated
// router.post(
//   '/upload-krishi-vidnyan-file',
// 	middleware.checkForPoolConnection,
// 	MasterController.uploadKrishiVidnyanFile
// )

router.post(
  "/save-medical-room-details",
  middleware.checkForPoolConnection,
  MasterController.saveMedicalRoomDetails
);

router.get(
  "/get-medical-room-authority-person",
  middleware.checkForPoolConnection,
  MasterController.getAuthorityPerson
);

// empty plot list upload

router.get(
  "/upload-empty-plot-list",
  middleware.checkForPoolConnection,
  MasterController.get_empty_plot_list_file_name_list
);
router.post(
  "/upload-empty-plot-list-file",
  middleware.checkForPoolConnection,
  MasterController.upload_empty_plot_list_file
);
router.post(
  "/delete-empty-plot-list-file",
  middleware.checkForPoolConnection,
  MasterController.delete_empty_plot_list_file
);

//Arogya Seva Kendra

router.get(
  "/arogya-seva-kendra-list-view",
  middleware.checkForPoolConnection,
  MasterController.getArogyaSevaKendraList
);

router.post(
  "/save-arogya-seva-kendra-details",
  middleware.checkForPoolConnection,
  MasterController.saveArogyaSevaKendraDetails
);

router.get(
  "/arogya-kendra-details-view",
  middleware.checkForPoolConnection,
  MasterController.getArogyaKendrDetailsView
);

router.post(
  "/update-arogya-seva-kendra-details",
  middleware.checkForPoolConnection,
  MasterController.updateArogyaSevaKendraDetails
);

router.delete(
  "/delete-arogya-seva-kendra",
  middleware.checkForPoolConnection,
  MasterController.deleteArogyaSevaKendra
);

//Arogya Seva kendra gallery routes
router.get(
  "/arogya-seva-kendra-gallery-view",
  middleware.checkForPoolConnection,
  MasterController.getArogyaSevaKendraGalleryView
);

router.post(
  "/upload-arogya-seva-kendra-gallery-photo",
  middleware.checkForPoolConnection,
  MasterController.addArogyaSevaKendraGalleryPhoto
);

router.delete(
  "/delete-arogya-seva-kendra-gallery-photo",
  middleware.checkForPoolConnection,
  MasterController.deleteArogyaSevaKendraGalleryPhoto
);

// arogya sevak information

router.get(
  "/arogya-seva-information",
  middleware.checkForPoolConnection,
  MasterController.arogya_seva_mahiti_view
);

router.post(
  "/post-arogya-sevak-information",
  middleware.checkForPoolConnection,
  MasterController.post_arogya_sevak_information
);

router.post(
  "/delete-arogya-sevak-information",
  middleware.checkForPoolConnection,
  MasterController.delete_arogya_sevak_information
);

// arogya camp photos

router.post(
  "/upload-arogya-camp-photos",
  middleware.checkForPoolConnection,
  MasterController.upload_arogya_camp_photos
);

router.post(
  "/delete-arogya-camp-photos",
  middleware.checkForPoolConnection,
  MasterController.delete_arogya_camp_photos
);

// gov yojna upload
router.get(
  "/upload-gov-yojna",
  middleware.checkForPoolConnection,
  MasterController.get_gov_yojna_upload_view
);
router.post(
  "/upload-gov-yojna-file",
  middleware.checkForPoolConnection,
  MasterController.upload_gov_yojna_file
);
router.post(
  "/delete-gov-yojna-file",
  middleware.checkForPoolConnection,
  MasterController.delete_gov_yojna_file
);

// nokari vishayak upload
router.get(
  "/get-add-job-related-view",
  middleware.checkForPoolConnection,
  MasterController.get_add_job_related_view
);

router.post(
  "/upload-job-related-file",
  middleware.checkForPoolConnection,
  MasterController.upload_job_related_file
);

router.post(
  "/update-job-related-file",
  middleware.checkForPoolConnection,
  MasterController.update_job_related_details
);

router.post(
  "/update-job-related-file",
  middleware.checkForPoolConnection,
  MasterController.update_job_related_details
);

router.post(
  "/delete-job-related-details",
  middleware.checkForPoolConnection,
  MasterController.delete_job_related_details
);

//Gram Ahaval Documents

router.get(
  `/get-add-gram-ahaval-documents-view`,
  middleware.checkForPoolConnection,
  MasterController.getAddGramAvhavalDocuementsView
);

router.post(
  `/upload-gram-ahaval-document`,
  middleware.checkForPoolConnection,
  MasterController.uploadGramAvhavalDocuement
);

router.delete(
  `/delete-gram-ahaval-document`,
  middleware.checkForPoolConnection,
  MasterController.deleteGramAvhavalDocuement
);

//Divyanga people applications  (दिव्यांग लोकांचे अर्ज )
router.get(
  "/get-divyanga-application-single-user-details-view",
  middleware.checkForPoolConnection,
  MasterController.getDivyangaApplicationSingleUserDetailsView
);

router.get(
  "/get-divyanga-people-applications-view",
  middleware.checkForPoolConnection,
  MasterController.getDivyangaPeopleApplicationsView
);

router.put(
  "/approve-divyanga-user-application-form",
  middleware.checkForPoolConnection,
  MasterController.approveDivyangaUserApplication
);

router.put(
  "/reject-divyanga-user-application-form",
  middleware.checkForPoolConnection,
  MasterController.rejectDivyangaUserApplication
);

// Online zoom meetings

router.get(
  "/zoom-meetings-view",
  middleware.checkForPoolConnection,
  MasterController.getZoomMeetingsView
);

router.post(
  "/create-zoom-meeting-record",
  middleware.checkForPoolConnection,
  meetingsController.createNewMeetingRecord
);

router.delete(
  "/delete-zoom-meeting-record",
  middleware.checkForPoolConnection,
  meetingsController.deleteMeetingRecord
);

router.post(
  "/update-zoom-meeting-record",
  middleware.checkForPoolConnection,
  meetingsController.updateMeetingRecord
);

router.post(
  "/add-recording-link",
  middleware.checkForPoolConnection,
  meetingsController.addRecordingLink
);

module.exports = router;
