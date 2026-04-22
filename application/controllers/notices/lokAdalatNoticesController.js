let FormNineModel = require("../../model/FormNightModel");
const lokAdalatNoticesModel = require("../../model/notices/lokAdalatNoticesModel");
const { sendApiResponse } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const lokAdalatNoticesController = {
  // Save a new notice
  add: asyncHandler(async (req, res) => {
    const lokAdalatNoticeData = req.body;
    await lokAdalatNoticesModel.add(res.pool, lokAdalatNoticeData);
    return sendApiResponse(res, 201, true, "लोक अदालत नोटीस जतन झाली");
  }),

  // Update an existing notice
  update: asyncHandler(async (req, res) => {
    const lokAdalatNoticeData = req.body;
    await lokAdalatNoticesModel.update(res.pool, lokAdalatNoticeData);
    return sendApiResponse(res, 200, true, "लोक अदालत नोटीस अद्यतनित झाली");
  }),

  // Delete a notice by ID
  delete: asyncHandler(async (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    await lokAdalatNoticesModel.delete(res.pool, id);
    return sendApiResponse(res, 200, true, "लोक अदालत नोटीस हटवण्यात आली");
  }),

  // Render Add Notice page
  renderAddPage: asyncHandler(async (req, res) => {
    renderPage(res, "user/lok-adalat-notice/add-lok-adalat-notice-page.pug");
  }),

  // Render Edit Notice page
  renderEditPage: asyncHandler(async (req, res) => {
    const { lokAdalatNoticeId } = req.params;
    const result = await lokAdalatNoticesModel.lokAdalatNoticeId(
      res.pool,
      lokAdalatNoticeId
    );
    renderPage(res, "user/lok-adalat-notice/edit-lok-adalat-notice-page.pug", {
      lokAdalatNotice: result[0],
    });
  }),

  // Render List page
  renderListPage: asyncHandler(async (req, res) => {
    const lokAdalatNotices = await lokAdalatNoticesModel.list(res.pool);

    renderPage(res, "user/lok-adalat-notice/lok-adalat-notice-list-page.pug", {
      lokAdalatNotices,
    });
  }),

  // Render Print page with optional filtering
  renderPrintPage: asyncHandler(async (req, res) => {
    const { month, year, fromYear, toYear, printDate } = req.query;
    let lokAdalatNotices = [];

    if (month && year) {
      lokAdalatNotices = await lokAdalatNoticesModel.lokAdalatNoticeByMonthYear(
        res.pool,
        month,
        year
      );
    } else if (fromYear && toYear) {
      lokAdalatNotices = await lokAdalatNoticesModel.lokAdalatNoticeByYearRange(
        res.pool,
        fromYear,
        toYear
      );
    } else {
      lokAdalatNotices = await lokAdalatNoticesModel.list(res.pool);
    }

    renderPage(res, "user/lok-adalat-notice/lok-adalat-notice-print-page.pug", {
      lokAdalatNotices,
      month,
      year,
      fromYear,
      toYear,
      printDate,
    });
  }),

  renderSinglePrintPage: asyncHandler(async (req, res) => {
    let { lokAdalatNoticeId } = req.params;
    const lokAdalatNotices = await lokAdalatNoticesModel.lokAdalatNoticeId(
      res.pool,
      lokAdalatNoticeId
    );

    renderPage(
      res,
      "user/lok-adalat-notice/lok-adalat-notice-print-single-page.pug",
      {
        lokAdalatNotice: lokAdalatNotices[0],
      }
    );
  }),

  // API: Get all notices
  getAll: asyncHandler(async (req, res) => {
    const result = await lokAdalatNoticesModel.list(res.pool);
    return sendApiResponse(res, 200, true, "सर्व नोटीसेस मिळाल्या", result);
  }),

  // API: Get by ID
  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await lokAdalatNoticesModel.lokAdalatNoticeId(res.pool, id);
    return sendApiResponse(res, 200, true, "नोटीस मिळाली", result[0]);
  }),

  // API: Get by year
  getByYear: asyncHandler(async (req, res) => {
    const { year } = req.params;
    const result = await lokAdalatNoticesModel.lokAdalatNoticeByYear(
      res.pool,
      year
    );
    return sendApiResponse(res, 200, true, "नोटीसेस मिळाल्या", result);
  }),

  // API: Get by month and year
  getByMonthYear: asyncHandler(async (req, res) => {
    const { month, year } = req.params;
    const result = await lokAdalatNoticesModel.lokAdalatNoticeByMonthYear(
      res.pool,
      month,
      year
    );
    return sendApiResponse(res, 200, true, "नोटीसेस मिळाल्या", result);
  }),

  printFormNineAllSamanya: asyncHandler(async (req, res) => {
    let { fromYear: year1, toYear: year2 } = req.params;
    let y1 = year1?.split("-")[0];
    let y2 = year2?.split("-")[0];
    let data = await FormNineModel.printFormNineAllSamanya(res.pool, y1, y2);

    if (data) {
      // data.sort(()) sort in desc order by total sum of entry._totalSamanyaTax + entry.totalWaterTax

      data.sort((a, b) => {
        let sumA = (a._totalSamanyaTax || 0) + (a.totalWaterTax || 0);
        let sumB = (b._totalSamanyaTax || 0) + (b.totalWaterTax || 0);
        return sumB - sumA;
      });
    }
    renderPage(res, "user/lok-adalat-notice/print-all-samanya.pug", {
      data,
      year: { year1, year2 },
    });
  }),
};

module.exports = lokAdalatNoticesController;
