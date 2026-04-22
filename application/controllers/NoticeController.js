var HomeModel = require("../model/HomeModel");
let NoticeModal = require("../model/NoticeModal");
var exportController = {
  mainListView: function (req, res, next) {
    var gp = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        return NoticeModal.getMainList(res.pool);
      })
      .then((result) => {
        res.render("user/notices/notices_list", {
          list: result,
          gp: gp,
        });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  manageNotice: function (req, res) {
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        res.render("user/notices/manage_notice", {
          list: result,
          gp: gp,
        });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  addNotice: function (req, res) {
    res.status(500).send({ call: 1 });
  },
  removeNotice: function (req, res) {
    res.status(200).send({ call: 1 });
  },
};
module.exports = exportController;
