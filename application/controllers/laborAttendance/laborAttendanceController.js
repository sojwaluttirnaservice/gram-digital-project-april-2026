const laborAttendanceModel = require("../../model/laborAttendance/laborAttendanceModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const laborAttendanceController = {
  renderWorksList: asyncHandler(async (req, res) => {
    const works = await laborAttendanceModel.getAll(res.pool);
    renderPage(res, "user/labor-attendance/labor-works-list.pug", {
      works,
      title: "मजुरी कामांची यादी",
    });
  }),

  renderWorkCreate: asyncHandler(async (req, res) => {
    renderPage(res, "user/labor-attendance/create-labor-work-page.pug", {
      title: "मजुरी कामाची नोंदणी",
    });
  }),

  renderWorkEdit: asyncHandler(async (req, res) => {
    let { workId } = req.params;
    const [work] = await laborAttendanceModel.getWorkById(res.pool, workId);
    renderPage(res, "user/labor-attendance/edit-labor-work-page", {
      work,
      title: "Edit मजुरी कामाची नोंदणी",
    });
  }),

  renderWorkAttendancePrintPage: asyncHandler(async (req, res) => {
    let {workId} = req.params
    let [work] = await laborAttendanceModel.getWorkById(res.pool, workId)
    const workers =await laborAttendanceModel.getWorkersByWorkIdWithAttendance(res.pool, work)
    // console.log(workers)
    renderPage(res, 'user/labor-attendance/work-attendance-print-page', {
        title: "हजेरी पत्रक",
        work,
        workers
    }) 
  }),

  createWork: asyncHandler(async (req, res) => {
    console.log("hi");
    let work = req.body;
    console.log(work);
    await laborAttendanceModel.createWork(res.pool, work);
    return sendApiResponse(res, 201, true, "काम जतन झाले.");
  }),

  updateWork: asyncHandler(async (req, res) => {
    let work = req.body;
    await laborAttendanceModel.updateWork(res.pool, work);
    return sendApiResponse(res, 201, true, "काम अद्यावयात झाले.");
  }),

  deleteWork: asyncHandler(async (req, res) => {
    let { id } = req.body;

    await laborAttendanceModel.deleteWork(res.pool, id);

    return sendApiResponse(res, 200, true, "नोंद काढली गेली.");
  }),

  renderWorkersListForWork: asyncHandler(async (req, res) => {
    const { workId } = req.params;
    const [work] = await laborAttendanceModel.getWorkById(res.pool, workId);

    const workers = await laborAttendanceModel.getWorkersByWorkId(
      res.pool,
      workId
    );

    renderPage(res, "user/labor-attendance/workers-list.pug", {
      title: `कामगारांची यादी-${work?.name}`,
      work,
      workers,
    });
  }),

  renderWorkerCreate: asyncHandler(async (req, res) => {
    let { workId } = req.params;

    // let work;
    // if(!workId || !await laborAttendanceModel.getWorkById(res.pool, workId)) {
    //     return sendApiError(400, )
    // }

    const [work] = await laborAttendanceModel.getWorkById(res.pool, workId);

    renderPage(res, "user/labor-attendance/create-worker-page.pug", {
      title: "कामगार नोंदणी",
      work,
    });
  }),

  renderWorkerEdit: asyncHandler(async (req, res) => {
    const { workerId } = req.params;
    let [worker] = await laborAttendanceModel.getWorkerById(res.pool, workerId);
    let work;
    console.log(worker);
    if (worker) {
      [work] = await laborAttendanceModel.getWorkById(
        res.pool,
        worker.work_id_fk
      );
    }
    renderPage(res, "user/labor-attendance/edit-worker-page.pug", {
      title: "Edit कामगार नोंदणी",
      work: work || {},
      worker,
    });
  }),

  createWorker: asyncHandler(async (req, res) => {
    const worker = req.body;
    await laborAttendanceModel.createWorker(res.pool, worker);

    return sendApiResponse(res, 201, true, "कामगार जतन झाला.");
  }),

  updateWorker: asyncHandler(async (req, res) => {
    const updatedWorker = req.body;
    await laborAttendanceModel.updateWorker(res.pool, updatedWorker);

    return sendApiResponse(res, 200, true, "कामगार अद्ययावत झाला.");
  }),

  deleteWorker: asyncHandler(async (req, res) => {
    let { id } = req.body;
    if (!id) {
      return sendApiError(res, 404, false, "कामगाराची आइडी नाही मिळाली.");
    }
    await laborAttendanceModel.deleteWorker(res.pool, id);

    return sendApiResponse(res, 200, true, "कामगार हटवला गेला.");
  }),

  renderAttendanceSheet: asyncHandler(async (req, res) => {
    let { workId, workerId } = req.params;

    let [work] = await laborAttendanceModel.getWorkById(res.pool, workId);



    let workerAttendanceRecord;
    let worker;
    if (work) {
      workerAttendanceRecord =
        await laborAttendanceModel.getWorkerAttendanceForWork(
          res.pool,
          work,
          workerId
        );

        [worker] = await laborAttendanceModel.getWorkerById(res.pool, workerId)
    }

    renderPage(res, "user/labor-attendance/worker-attendance-sheet-page.pug", {
      work,
      workerId,
      worker,
      workerAttendanceRecord,
    });
  }),

  createAttendance: asyncHandler(async (req, res) => {
    const { work_id_fk, worker_id_fk, date } = req.body;

    await laborAttendanceModel.createAttendance(res.pool, {
      work_id_fk,
      worker_id_fk,
      date,
    });

    return sendApiResponse(res, 201, true, "हजेरी लावली गेली.");
  }),

  updateAttendance: asyncHandler(async (req, res) => {}),

  deleteAttendance: asyncHandler(async (req, res) => {
    let {attendanceId} =req.body
    await laborAttendanceModel.deleteAttendance(res.pool, attendanceId)
    return sendApiResponse(res, 200, true, "हजेरी काढली गेली.")
  }),

  bulkCreateAttendance: asyncHandler(async (req, res) => {}),

  getAttendanceByWork: asyncHandler(async (req, res) => {}),

  getPayrollReport: asyncHandler(async (req, res) => {
    let { workId, workerId } = req.params;
    renderPage(res, "", {});
  }),
};

module.exports = laborAttendanceController;
