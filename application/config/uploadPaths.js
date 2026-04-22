const baseDir = "./public";

const UPLOAD_PATHS = {
  base: baseDir,

  guides: {
    village: `${baseDir}/new-gp-page/main-page/files/village-guide`,
    zoomMeeting: `${baseDir}/new-gp-page/main-page/files/zoom-meeting-guide`,
  },

  uploads: {
    root: `${baseDir}/upload`,
    meter: `${baseDir}/meter_upload`,
  },

  home: {
    nakasha: `${baseDir}/home_nakasha_image`,
    photo: `${baseDir}/home_map_image/home_photo`,
    map: `${baseDir}/home_map_image/map_photo`,
  },

  gallery: {
    village: `${baseDir}/gp/asstes/images/gallery`,
    team: `${baseDir}/gp/asstes/images/team`,
    video: `${baseDir}/uploads/videos/videoGallery`,
  },

  gpImages: {
    main: `${baseDir}/uploads/images/gp/main`,
    stamps: `${baseDir}/uploads/images/gp/stamps`,
    paymentScreenshots: `${baseDir}/uploads/images/gp/payments/paymentScreenshots`,
  },

  users: {
    profile: `${baseDir}/new-gp-page/main-page/images/user-pic`,
    samiti: `${baseDir}/new-gp-page/main-page/images/smeti`,
    dukan: `${baseDir}/new-gp-page/main-page/images/dukan`,
    news: `${baseDir}/new-gp-page/main-page/images/news`,
    arogya: `${baseDir}/new-gp-page/main-page/images/arogya`,
    yojana: `${baseDir}/new-gp-page/main-page/images/yojana`,
  },

  files: {
    divyangaYadi: `${baseDir}/new-gp-page/main-page/files/divyanga-yadi`,
    grLists: `${baseDir}/new-gp-page/main-page/files/gr-lists`,
    gramAhaval: `${baseDir}/new-gp-page/main-page/files/gram-ahaval-documents`,
    educationGallery: `${baseDir}/new-gp-page/main-page/files/education-institute-gallery`,
    educationFiles: `${baseDir}/new-gp-page/main-page/files/education-institute-files`,
    krishiVidnyan: `${baseDir}/new-gp-page/main-page/files/krishi-vidnyan-lists`,
    emptyPlots: `${baseDir}/new-gp-page/main-page/files/empty-plot-file-lists`,
    jobRelated: `${baseDir}/new-gp-page/main-page/files/job-related-files`,
    qrCodes: `${baseDir}/new-gp-page/main-page/files/qr-codes`,
    govYojana: `${baseDir}/new-gp-page/main-page/files/gov-yojna-lists`,
  },

  arogya: {
    kendraInfo: `${baseDir}/new-gp-page/main-page/files/arogya-seva-kendra-information`,
    kendraGallery: `${baseDir}/new-gp-page/main-page/files/arogya-seva-kendra-gallery`,
    sevakInfo: `${baseDir}/new-gp-page/main-page/files/arogya-sevak-information`,
    camps: `${baseDir}/new-gp-page/main-page/files/arogya-seva-camp-photos`,
  },

  certificates: {
    bplImages: `${baseDir}/uploads/images/certificates/bpl`,
    birthDocs: `${baseDir}/uploads/docs/certificates/birth/birth-registration`,
    deathDocs: `${baseDir}/uploads/docs/certificates/death/death-registration`,
  },

  complaints: {
    images: `${baseDir}/uploads/images/complaints`,
    documents: `${baseDir}/uploads/docs/complaints`,
    resolutionImages: `${baseDir}/uploads/images/complaints/resolution`,
  },

  applications: {
    ferfarDocs: `${baseDir}/uploads/docs/ferfar-applications`,
    constructionDocs: `${baseDir}/uploads/docs/construction/construction-docs`,
    constructionDirections: `${baseDir}/uploads/images/construction/directions`,
    constructionCertificates: `${baseDir}/uploads/images/construction/certificates`,
  },

  committees: {
    members: `${baseDir}/uploads/images/committees/committeeMembers`,
  },

  selfDeclarationCertificates: {
    signatures: `${baseDir}/uploads/images/self-declaration/signatures`,
    documents: `${baseDir}/uploads/docs/self-declaration/documents`,
    applicantPhotos: `${baseDir}/self_declaration`,
  },

  occupationNoc: {
    documents: `${baseDir}/uploads/docs/occupation-noc-docs/documents`,
  },

  ppt: {
    cover: `${baseDir}/uploads/images/ppt/cover-images`,
    pages: `${baseDir}/uploads/images/ppt/pages-images`,
    slideBefore: `${baseDir}/uploads/images/ppt/slides/before`,
    slideAfter: `${baseDir}/uploads/images/ppt/slides/after`,
  },

  namuna: {
    namuna5kSamanya: `${baseDir}/uploads/images/namuna/namuna5k/samanya`,
    namuna5kPani: `${baseDir}/uploads/images/namuna/namuna5k/pani`,
  },
};

module.exports = {
  UPLOAD_PATHS,
};
