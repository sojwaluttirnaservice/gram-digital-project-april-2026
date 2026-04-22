let MasikNoticeModel = require("../model/MasikNoticeModel");
let HomeModel = require("../model/HomeModel");
var responderSet = require("../config/_responderSet");
const ZPModel = require("../model/ZPModel");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");
let myDates = responderSet.myDate;

let MasikNoticeController = {
  getList: asyncHandler(async (req, res) => {
    let masikSabhaNotices = await MasikNoticeModel.getMainList(res.pool);
    renderPage(res, "user/masik_notice/mn_list", {
      masikSabhaNotices,
      json_list: JSON.stringify(masikSabhaNotices),
    });
  }),

  addNewSelfDeclarationView: function (req, res, next) {
    var gp = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        res.render("user/masik_notice/add_new_masik_notice", {
          gp: gp,
        });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },

  editMasikNoticePage: async function (req, res) {
    try {
      const id = req.params.id;

      const _gp = await HomeModel.getGpData(res.pool);

      const _masikNotice = await MasikNoticeModel.getNoticeDetails(
        res.pool,
        id
      );

      // console.log(_masikNotice[0])

      res.render(`user/masik_notice/edit_masik_notice_page`, {
        masikNotice: _masikNotice[0],
        gp: _gp[0],
      });
    } catch (err) {
      console.log(`Error while showing the edit masik notice page : ${err}`);
      return res.status(500).json({ call: 0, error: err });
    }
  },
  addNewSelfDeclaration: function (req, res, next) {
    var data = req.body;
    var fileOne = req.files.file1;
    var currentTime = myDates.getTimeStamp();
    var file1_name =
      currentTime + "_" + Math.floor(Math.random() * 1000) + ".jpeg";
    data["file_name"] = file1_name;
    fileOne.mv("./public/self_declaration/" + file1_name, function (error) {
      if (error) {
        res.status(500).send({ call: 0, data: error });
        return 999;
      } else {
        MasikNoticeModel.addNewSelfDeclaration(res.pool, data)
          .then((result) => {
            res.status(200).send({ call: 1, data: result });
          })
          .catch((error) => {
            res.status(500).send({ call: 0, data: error });
          });
      }
    });
  },

  saveNewNotice: async function (req, res, next) {
    try {
      let data = req.body;

      let response = await MasikNoticeModel.saveNewNotice(res.pool, data);
      let result = await response;
      if (result.affectedRows === 1) {
        return res.status(201).json({ call: 1 });
      }
    } catch (error) {
      // console.log("error while saving notice = ", error)
      return res.status(500).json({
        call: 0,
        data: error,
      });
    }
  },

  updateMasikNotice: async function (req, res) {
    try {
      const data = req.body;

      console.log("in herer in contorlller");
      console.log(data);
      const _res = await MasikNoticeModel.updateSabhaNotice(res.pool, data);

      if (_res.affectedRows >= 1) {
        return res
          .status(200)
          .json({ call: 1, message: `Masik notice updated successfully` });
      }
    } catch (err) {
      console.log(`Error while updating the masik notice`);
      return res.status(500).json({
        call: 0,
        error: err,
      });
    }
  },

  deleteNotice: function (req, res) {
    let { id } = req.body;
    MasikNoticeModel.deleteNotice(res.pool, id)
      .then((result) => {
        console.log(result);
        return res.status(200).json({ call: 1, data: result });
      })
      .catch((err) => {
        return res.status(500).json({ call: 0, data: err });
      });
  },

  /** 
  printSabhaNotice111: async function (req, res) {
    let { sabhaType, noticeId, watermark } = req.query;
    let memberList = [];
    let sabhaDetails = [{ sabhaType, noticeId }];
    let notice = [];
    let gpDetails;
    MasikNoticeModel.getSadasyaList(res.pool)
      .then((result) => {
        memberList.push(JSON.parse(result[0].gp_member));
        console.log(memberList);
        return MasikNoticeModel.getNoticeDetails(res.pool, noticeId);
      })
      .then((noticeDetails) => {
        if (noticeDetails.length === 0) {
          return 999;
        } else {
          notice.push(noticeDetails[0]);
          return ZPModel.getZpDetails(res.pool);
        }
      })
      .then((_result) => {
        if (_result === 999) {
          return res.status(200).json({
            message: "Notice Not found",
          });
        }
        gpDetails = _result;
        // console.log('Notice = ', notice)
        let noticeSubject = JSON.parse(notice[0].notice_subject);
        // console.log('Notice subject  = ', noticeSubject)
        res.render("user/masik_notice/gpMasikNoticePrint.pug", {
          memberList: memberList[0],
          sabhaDetails: sabhaDetails[0],
          notice: notice[0],
          noticeSubject,
          gp: gpDetails[0],
          showWatermark: watermark,
        });
      })
      .catch((err) => {
        console.log(err, "err ");
        return res.status(500).json({ call: 0, data: err });
      });
  },
  */

  printSabhaNotice: asyncHandler(async (req, res) => {
    let { sabhaType, noticeId, watermark } = req.query;

    console.log(sabhaType)

    let [_memberList] = await MasikNoticeModel.getSadasyaList(res.pool);

    let [notice] = await MasikNoticeModel.getNoticeDetails(res.pool, noticeId);

    let sabhaDetails = [{ sabhaType, noticeId }];

    console.log(notice);

    renderPage(res, "user/masik_notice/gpMasikNoticePrint.pug", {
      notice,
      memberList: JSON.parse(_memberList?.gp_member || "[]"),
      noticeSubject: JSON.parse(notice?.notice_subject || "[]"),
      showWatermark: watermark,
      sabhaDetails,
      sabhaType
    });
  }),

  getSabhaAttendance: function (req, res) {
    let gp = {};
    let sadasyaList = [];
    let attendanceYears = [];
    MasikNoticeModel.getSabhaAttendancYears(res.pool)
      .then((result) => {
        attendanceYears = [...result];
        console.log(attendanceYears);
        return MasikNoticeModel.getSadasyaList(res.pool);
      })
      .then((result) => {
        sadasyaList.push(JSON.parse(result[0].gp_member));
        return ZPModel.getZpDetails(res.pool);
      })
      .then((gp_data) => {
        gp = gp_data[0];
        res.render("user/masik_notice/sabha-attendance.pug", {
          title: "हजेरी पत्रक",
          gp,
          sadasyaList: sadasyaList[0],
          attendanceYears,
        });
      });
  },
  postSabhaAttendanceList: function (req, res) {
    let data = req.body;
    console.log(data);
    MasikNoticeModel.postSabhaAttendanceList(res.pool, data)
      .then((result) => {
        if (result.affectedRows >= 1) {
          res.status(201).json({
            call: 1,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },

  checkAlreadyFilledSabhaAttendance: function (req, res) {
    let data = req.body;
    MasikNoticeModel.checkAlreadyFilledSabhaAttendance(res.pool, data)
      .then((result) => {
        console.log(typeof result.length);
        console.log(result.length === 1);
        if (result.length === 1) {
          res.status(200).json({
            call: 1,
          });
        } else {
          res.status(200).json({
            call: 2, // this is for not found
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
  printAttendance: function (req, res) {
    let year = +req.query.year;
    let gp = {};
    console.log(year);
    ZPModel.getZpDetails(res.pool)
      .then((gp_data) => {
        gp = gp_data[0];
        return MasikNoticeModel.getPrintAttendanceDetails(res.pool, year);
      })
      .then((result) => {
        console.log(result, "attendacen print data---");

        let months_marathi = [
          "जानेवारी",
          "फेब्रुवारी",
          "मार्च",
          "एप्रिल",
          "मे",
          "जून",
          "जुलै",
          "ऑगस्ट",
          "सप्टेंबर",
          "ऑक्टोबर",
          "नोव्हेंबर",
          "डिसेंबर",
        ];
        res.render("user/masik_notice/print-sabha-attendance", {
          title: "सभा नोटिसा प्रिंट",
          gp,
          data: result,
          months_marathi,
        });
        console.log(result);
      });
  },

  get_month_wise_sabha_attendance: function (req, res) {
    let selected_year = req.body.selected_year;
    console.log(selected_year, "---");

    MasikNoticeModel.get_month_wise_sabha_attendance(res.pool, selected_year)
      .then((result) => {
        console.log(result, "-- reult");
        res.status(200).json({
          call: 1,
          data: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          message: "Something went wrong.",
        });
      });
  },

  delete_sabha_attendance: function (req, res) {
    let delete_month_id = req.body.delete_month_id;
    let delete_sabha_year = req.body.delete_sabha_year;
    MasikNoticeModel.delete_sabha_attendance(
      res.pool,
      delete_month_id,
      delete_sabha_year
    )
      .then((result) => {
        res.status(200).json({
          call: 1,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          message: "Something went wrong.",
          data: err,
        });
      });
  },

  get_edit_sabha_attendance: (req, res) => {
    let edit_month = req.body.edit_month;
    let edit_sabha_year = req.body.edit_sabha_year;

    MasikNoticeModel.get_edit_sabha_attendance(
      res.pool,
      edit_month,
      edit_sabha_year
    )
      .then((result) => {
        return res.status(200).json({
          call: 1,
          data: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          message: "Something went wrong.",
          data: err,
        });
      });
  },
  post_edit_sabha_attendance: function (req, res) {
    let data = req.body;
    let promises = [];
    let insertData = [];
    data._data.forEach((el) => {
      insertData.push([
        data.sabhaMonth,
        data.sabhaYear,
        el.name,
        el.payAmount,
        el.isPresent,
      ]);
    });
    insertData.forEach((el) => {
      promises.push(MasikNoticeModel.postEditSabhaAttendanceList(res.pool, el));
    });
    Promise.all(promises)
      .then((result) => {
        res.status(201).json({
          call: 1,
        });
      })
      .catch((err) => {
        res.status(500).json({
          call: 0,
          data: err,
        });
      });
  },
};
module.exports = MasikNoticeController;
