const MasikNoticeController = require("../application/controllers/MasikNoticeController");
const getRouter = require("../application/utils/getRouter");
const middleware = require("./middleware");
const masikNoticeRouter = getRouter(); 

masikNoticeRouter.get(
  "/",
  middleware.checkForPoolConnectionWithSession,
  MasikNoticeController.getList
);
masikNoticeRouter.get(
  "/new",
  middleware.checkForPoolConnectionWithSession,
  MasikNoticeController.addNewSelfDeclarationView
);
masikNoticeRouter.post(
  "/save-details",
  middleware.checkForPoolConnection,
  MasikNoticeController.addNewSelfDeclaration
);

masikNoticeRouter.get(
  "/edit-masik-notice-page/:id",
  middleware.checkForPoolConnection,
  MasikNoticeController.editMasikNoticePage
);

// SAVE NEW MASIK NOTICE
masikNoticeRouter.post(
  "/saveNewNotice",
  middleware.checkForPoolConnection,
  MasikNoticeController.saveNewNotice
);

masikNoticeRouter.put(
  "/update-masik-notice",
  middleware.checkForPoolConnection,
  MasikNoticeController.updateMasikNotice
);

// DELETE MASIK NOTICE
masikNoticeRouter.post(
  "/deleteNotice",
  middleware.checkForPoolConnection,
  MasikNoticeController.deleteNotice
);

// PRINT SABHA
masikNoticeRouter.get(
  "/printSabhaNotice",
  middleware.checkForPoolConnection,
  MasikNoticeController.printSabhaNotice
);

masikNoticeRouter.get(
  "/sabha-attendance",
  middleware.checkForPoolConnection,
  MasikNoticeController.getSabhaAttendance
);

masikNoticeRouter.post(
  "/sabha-attendance",
  middleware.checkForPoolConnection,
  MasikNoticeController.postSabhaAttendanceList
);

masikNoticeRouter.post(
  "/check-already-filled",
  middleware.checkForPoolConnection,
  MasikNoticeController.checkAlreadyFilledSabhaAttendance
);

masikNoticeRouter.get(
  "/print-attendance",
  middleware.checkForPoolConnection,
  MasikNoticeController.printAttendance
);

masikNoticeRouter.post(
  "/get-month-wise-sabha-attendance",
  middleware.checkForPoolConnection,
  MasikNoticeController.get_month_wise_sabha_attendance
);

masikNoticeRouter.post(
  "/delete-sabha-attendance",
  middleware.checkForPoolConnection,
  MasikNoticeController.delete_sabha_attendance
);

masikNoticeRouter.post(
  "/get-edit-sabha-attendance-details",
  middleware.checkForPoolConnection,
  MasikNoticeController.get_edit_sabha_attendance
);

masikNoticeRouter.post(
  "/post-edit-sabha-attendance-data",
  middleware.checkForPoolConnection,
  MasikNoticeController.post_edit_sabha_attendance
);
module.exports = masikNoticeRouter;
