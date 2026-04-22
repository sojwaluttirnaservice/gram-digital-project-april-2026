let networkServiceView = require("../model/NetworkServiceModel");
let HomeModel = require("../model/HomeModel");

let ApplicationController = {
  networkServiceView: function (req, res, next) {
    var gp = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        return networkServiceView.getSMSDetailsStatus(res.pool);
      })
      .then((result) => {
        res.render("user/network_service/mobile_sms", {
          list: result,
          gp: gp,
        });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  removeSMSFromList: function (req, res) {
    var id = Number(req.params.id);
    if (isNaN(id)) {
      res.redirect("/network-service");
      return false;
    }
    networkServiceView
      .removeSMSFromList(res.pool, id)
      .then((result) => {
        res.redirect("/network-service");
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  getClientContactList: function (req, res) {
    HomeModel.getContactList(res.pool)
      .then((result) => {
        if (result.length == 0) res.status(200).send({ call: 2, data: [] });
        else res.status(200).send({ call: 1, data: result });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  sendCommonSMS: function (req, res, next) {
    var data = req.body;
    networkServiceView.sendSMS(data, function (responseData) {
      if (typeof responseData.body == undefined) {
        res.status(200).send({ call: 2, data: responseData });
      } else {
        var resData = responseData.body.split("-");
        if (resData[0] !== "SUCCESS") {
          res.status(200).send({ call: 2, data: responseData });
        } else {
          networkServiceView
            .addSMSDetailsStatus(res.pool, data)
            .then((result) => {
              res.status(200).send({ call: 1 });
            })
            .catch((error) => {
              res.status(200).send({ call: 2, error: error });
            });
        }
      }
    });
  },
};
module.exports = ApplicationController;
