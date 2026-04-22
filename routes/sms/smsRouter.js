const express = require("express");
const smsController = require("../../application/controllers/sms/smsController");
const getRouter = require("../../application/utils/getRouter");

const smsRouter = getRouter();

smsRouter.get("/", smsController.smsPageView);

smsRouter.get("/report", smsController.renderSmsReportPage);

smsRouter.put("/update-report", smsController.updateSmsTrackRecord);

smsRouter.get("/delivery-status", smsController.renderSmsDeliveryPage);

smsRouter.post("/get-templates", smsController.getSmsTemplates);

smsRouter.get("/templates-page", smsController.smsTemplatesPage);

smsRouter.post("/submit", smsController.newSmsTemplateSubmit);

smsRouter.post("/send-sms", smsController.sendSmsToRegisteredNumbers);

smsRouter.post("/send-gp-sms", smsController.sendGpSMS);

//Gp related
smsRouter.get("/gram-sandesh-seva-view", smsController.getGramSandeshSevaView);

smsRouter.post("/send-gp-sms-to-nagrik", smsController.sendGpSmsToNagrik);

smsRouter.post(
  "/send-gp-sms-to-form-8-users",
  smsController.sendGpSmsToForm8Users
);

smsRouter.post(
  "/send-gp-sms-to-gp-members",
  smsController.sendGpSmsToGpMembers
);

smsRouter.get("/gp-sms-records", smsController.getGpSmsRecordView);

// GET LIST OF REQUIRED MOBILE NUMBERS HERE

smsRouter.get(
  "/nagrik-mobile-numbers",
  smsController.fetchNagrikMobileNumbers
);

smsRouter.get(
  "/form-8-users-mobile-numbers",
  smsController.fetchForm8UsersMobileNumbers
);

smsRouter.get(
  "/gp-members-mobile-numbers",
  smsController.fetchGpMembersMobileNumbers
);

// smsRouter.get("/");

smsRouter.post("/masik-sabha-notice", smsController.sendMasikSabhaNoticeSms);
module.exports = smsRouter;
