var APIController = require("../application/controllers/APIController");
let homeController = require("../application/controllers/HomeController");
var express = require("express");
var middleware = require("./middleware");
var router = express.Router();

router.get("/", middleware.checkForPoolConnection, (req, response) => {
  response.send({ status: 1 });
});

router.get(
  "/notice",
  middleware.checkForPoolConnection,
  APIController.noticeList,
);

router.post(
  "/login-check",
  middleware.checkForPoolConnection,
  APIController.lCheck,
);

router.post(
  "/get-user-details",
  middleware.checkForPoolConnection,
  APIController.GetUserDetails,
);

router.get("/get-website-list", (request, response) => {
  response.status(200).send({
    status: true,
    list: [
      { title: "Google-1", url: "http://www.google.com" },
      { title: "Google-2", url: "http://www.google.com" },
      { title: "Google-3", url: "http://www.google.com" },
    ],
  });
});

router.post(
  "/verify-user",
  middleware.checkForPoolConnection,
  APIController.verifyUserDetails,
);

router.get("/gp-list", middleware.checkForPoolConnection, APIController.gpList);
router.post(
  "/add-new-member",
  middleware.checkForPoolConnection,
  homeController.addNewMember,
);
router.get(
  "/village",
  middleware.checkForPoolConnection,
  APIController.getVillageList,
);

router.get("/certificate-type-list", (request, response) => {
  let list = [
    {
      name: "जन्म नोंद दाखला",
      id: 1,
    },
    {
      name: "मृत्यू नोंद दाखला",
      id: 2,
    },
    {
      name: "विवाह नोंदणी दाखला",
      id: 3,
    },
    {
      name: "नमुना नं. 8 चा उतारा",
      id: 4,
    },
    {
      name: "ग्रामपंचायत येणे बाकी नसल्याचा दाखला",
      id: 5,
    },
    {
      name: "निराधार असले बाबतचा दाखला",
      id: 6,
    },
    {
      name: "इतर काम लिहावे कोणते असल्यास",
      id: 7,
    },
    {
      name: "गावातील तक्रारी नोद येथे लिहावी ",
      id: 8,
    },
  ];
  response.send({ status: true, result: list });
});

router.post(
  "/save-certificate",
  middleware.checkForPoolConnection,
  APIController.saveMobileCertificate,
);

router.post(
  "/certificate-list",
  middleware.checkForPoolConnection,
  APIController.mobileCertificateList,
);

module.exports = router;
