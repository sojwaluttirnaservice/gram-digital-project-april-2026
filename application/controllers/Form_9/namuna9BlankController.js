const asyncHandler = require("../../utils/asyncHandler");
const { renderPage } = require("../../utils/sendResponse");

const namuna9BlankController = {
  renderNamuna9BlankPage: asyncHandler(async (req, res) => {
    renderPage(res, "user/print/namuna9/blanks/namuna-9-blank", {
        title: "नमुना ९ Blank Print"
    });
  }),

  renderNamuna9BlankSamanyaPrint: asyncHandler(async (req, res) => {
    renderPage(
      res,
      "user/print/namuna9/blanks/namuna-9-blank-print-samanya.pug",
      {
        page1ImgUrl: "/img/form-9-blanks/samanya-print/page-1.jpg",
        page2ImgUrl: "/img/form-9-blanks/samanya-print/page-2.jpg",
      }
    );
  }),

  renderNamuna9BlankPaniPrint: asyncHandler(async (req, res) => {
    renderPage(res, "user/print/namuna9/blanks/namuna-9-blank-print-pani.pug", {
      page1ImgUrl: "/img/form-9-blanks/pani-print/page-1.jpg",
    });
  }),
};

module.exports = namuna9BlankController;
