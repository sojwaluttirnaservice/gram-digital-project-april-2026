let HomeModel = require("../model/HomeModel");
var responderSet = require("../config/_responderSet");
const asyncHandler = require("../utils/asyncHandler");
const { renderPage } = require("../utils/sendResponse");
let myDates = responderSet.myDate;

let CandidateController = {
  homeView: asyncHandler(async (req, res) => {
     let gharkulYojanaList = await  HomeModel.getGharkulYojanaList(res.pool);
     renderPage(res, 'user/form_8_phase_1', {
        title: "नमुना ८ नोंदणी",
        gharkulYojanaList 
     })
  }),

  homePhaseTwo: function (req, res, next) {
    var data = req.params;
    if (isNaN(data.id)) {
      res.status(200).send({ call: 1, data: `Invalid Details Passe` });
    } else {
      HomeModel.getPreTaxationData(res.pool, data, function (type, sendData) {
        switch (sendData.call) {
          case 1:
            res.render("user/form_8_phase_2", sendData.data);
            break;
          case 2:
            res.status(200).send({ call: 1, data: "Invalid Details" });
            break;

          default:
            res.status(200).send(sendData);
            break;
        }
      });
    }
  },

  phaseTwoTotalCalc: function (req, res, next) {
    var data = req.params;
    var taxData = [];
    var arogyaDivaKar = [];

    var calc = {
      user_id: data.id,
      total_building_work: 0,
      total_open_plot: 0,
      total_area: 0,
      building_tax: 0,
      open_area_tax: 0,
      other_tex: 0,
      dava_kar: 0,
      arogya_kar: 0,
      total_tax: 0,
      created_date: myDates.getDate(),
    };

    var addData = [];

    if (isNaN(data.id)) {
      res.status(200).send({ call: 1, data: `Invalid Details Passe` });
    } else {
      HomeModel.getFromEightTaxSampleData(res.pool, data)
        .then((result) => {
          taxData = result;
          return HomeModel.geAarogyaDivaKarList(res.pool);
        })
        .then((result) => {
          arogyaDivaKar = result;
          return HomeModel.cleanFormEightTotalTaxation(res.pool, data.id);
        })
        .then((result) => {
          if (taxData.length == 0) {
            res.status(200).send({ call: 1, data: result });
            return 999;
          } else {
            taxData.forEach(function (value, index) {
              calc.total_area += value.fet_sq_area;
              if (value.fet_prop_desc_id < 5) {
                if (value.fet_prop_desc_id == 2) {
                  calc.other_tex += value.fet_final_tax;
                } else {
                  calc.building_tax += value.fet_final_tax;
                }
                calc.total_building_work += value.fet_sq_area;
              } else {
                calc.total_open_plot += value.fet_sq_area;
                calc.open_area_tax += value.fet_final_tax;
              }
            });

            arogyaDivaKar.forEach(function (value, index) {
              if (
                calc.total_building_work >= value.adk_min ||
                calc.total_building_work <= value.adk_max
              ) {
                calc.dava_kar = value.adk_arogya;
                calc.arogya_kar = value.adk_diva;
              }
            });

            calc.total_tax =
              calc.arogya_kar +
              calc.building_tax +
              calc.open_area_tax +
              calc.other_tex +
              calc.dava_kar;

            addData = [
              calc.user_id,
              calc.total_building_work,
              calc.total_open_plot,
              calc.total_area,
              calc.building_tax,
              calc.open_area_tax,
              calc.other_tex,
              calc.dava_kar,
              calc.arogya_kar,
              calc.total_tax,
              calc.created_date,
            ];
          }
          return HomeModel.saveNewTotalTaxDetails(res.pool, addData);
        })
        .then((result) => {
          if (result !== 999) res.status(200).send({ call: 1, data: result });
        })
        .catch((error) => {
          res.status(500).send({ call: 0, data: error });
        });
    }
  },
  addNewFormEntry: function (req, res, next) {
    var data = req.body;
    HomeModel.saveNewFormEightDetails(res.pool, data)
      .then((result) => {
        res.status(200).send({ call: 1, data: result.insertId });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  saveTaxSample: function (req, res, next) {
    var data = req.body;
    HomeModel.checkDuplicateTax(res.pool, data)
      .then((result) => {
        if (result.length == 1) {
          res.status(200).send({ call: 2 });
          return 999;
        }
        return HomeModel.saveNewTaxDetails(res.pool, data);
      })
      .then((result) => {
        if (result.result !== 999) {
          res.status(200).send({ call: 1, data: result.insertId });
        }
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  getFromEightTaxSampleData: function (req, res, next) {
    var data = req.body;
    sendData = { call: 1, data: [], data1: [] };
    HomeModel.getFromEightTaxSampleData(res.pool, data)
      .then((result) => {
        sendData["data"] = result;
        return HomeModel.getFromEightTaxTotalData(res.pool, data);
      })
      .then((result) => {
        sendData["data1"] = result;
        res.status(200).send(sendData);
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
};
module.exports = CandidateController;
