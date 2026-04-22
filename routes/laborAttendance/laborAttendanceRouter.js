// routes/laborAttendance.js
const laborAttendanceController = require("../../application/controllers/laborAttendance/laborAttendanceController");
const getRouter = require("../../application/utils/getRouter");

const laborAttendanceRouter = getRouter();

// ------------------ WORKS (pages) ------------------
// render list page
laborAttendanceRouter.get(
  "/work/list",
  laborAttendanceController.renderWorksList
);

// render create / edit pages
laborAttendanceRouter.get(
  "/work/create",
  laborAttendanceController.renderWorkCreate
);
laborAttendanceRouter.get(
  "/work/edit/:workId",
  laborAttendanceController.renderWorkEdit
);

laborAttendanceRouter.get(
    '/print/:workId',
    laborAttendanceController.renderWorkAttendancePrintPage
)

// ------------------ WORKS (actions) ------------------
// create
laborAttendanceRouter.post("/work", laborAttendanceController.createWork);
// update (id in path is preferred)
laborAttendanceRouter.put("/work", laborAttendanceController.updateWork);
// delete
laborAttendanceRouter.delete("/work", laborAttendanceController.deleteWork);

// ------------------ WORKERS (pages) ------------------
// workers list for a work (render)
laborAttendanceRouter.get(
  "/workers/list/:workId",
  laborAttendanceController.renderWorkersListForWork
);

// worker create / edit pages
laborAttendanceRouter.get(
  "/workers/:workId/create",
  laborAttendanceController.renderWorkerCreate
);

laborAttendanceRouter.get(
  "/workers/edit/:workerId",
  laborAttendanceController.renderWorkerEdit
);

// ------------------ WORKERS (actions) ------------------
laborAttendanceRouter.post("/workers", laborAttendanceController.createWorker);

laborAttendanceRouter.put(
  "/workers",
  laborAttendanceController.updateWorker
);
laborAttendanceRouter.delete(
  "/workers",
  laborAttendanceController.deleteWorker
);

// ------------------ ATTENDANCE ------------------
// render attendance sheet for a (work, worker) pair
// e.g. GET /labor-attendance/attendance/sheet/12/34
laborAttendanceRouter.get(
  "/attendance/sheet/:workId/:workerId",
  laborAttendanceController.renderAttendanceSheet
);

// create attendance (single) — body should include workId, workerId, attendance_date, type_code, etc.
laborAttendanceRouter.post(
  "/attendance",
  laborAttendanceController.createAttendance
);

// update attendance by attendance id
// laborAttendanceRouter.put(
//   "/attendance",
//   laborAttendanceController.updateAttendance
// );

// delete attendance by id
laborAttendanceRouter.delete(
  "/attendance",
  laborAttendanceController.deleteAttendance
);


// (optional but useful) bulk create attendance for a work (array of rows)
// laborAttendanceRouter.post(
//   "/attendance/bulk/:workId",
//   laborAttendanceController.bulkCreateAttendance
// );

// ------------------ Extras (optional) ------------------
// list attendances for a work (JSON) with optional ?date= or ?from=&to=
laborAttendanceRouter.get(
  "/attendance/list/:workId",
  laborAttendanceController.getAttendanceByWork
);

// payroll/report export for a work
// laborAttendanceRouter.get(
//   "/work/payroll/:workId",
//   laborAttendanceController.getPayrollReport
// );

// ------------------ final
module.exports = laborAttendanceRouter;
