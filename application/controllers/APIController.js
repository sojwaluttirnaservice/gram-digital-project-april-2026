var HomeModel = require("../model/HomeModel");
var APIController = {
  noticeList: function (req, res, next) {
    HomeModel.getWebNoticeListOnHomePage(res.pool)
      .then((result) => {
        let status = result.length === 0 ? false : true;
        res.status(200).send({ status, result });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  gpList: function (req, res, next) {
    HomeModel.getGpData(res.pool)
      .then((result) => {
        let status = result.length === 0 ? false : true;

        let list = JSON.parse(result[0].gp_member);
        list = list.map((value) => {
          value["mobile"] = "";
          value["image"] = "/gp/asstes/images/team/" + value.image;
          return { ...value };
        });
        res.status(200).send({ status, result: list });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },
  lCheck: function (req, res, next) {
    var data = req.body;
    console.log(data);
    HomeModel.userCheckAuth(res.pool, data)
      .then((result) => {
        if (result.length == 0) {
          res
            .status(200)
            .send({ call: 0, message: "Incorrect Username or Password" });
        } else {
          res
            .status(200)
            .send({ call: 1, message: "Login Successfully", user: result[0] });
        }
      })
      .catch((error) => {
        res.status(500).send({ call: 0, message: "Server Error", data: error });
      });
  },
  GetUserDetails: function (req, res, next) {
    var data = req.body;
    HomeModel.getUserDetails(res.pool, data)
      .then((result) => {
        if (result.length == 0) {
          res.status(200).send({ call: 0, message: "Details Not Found" });
        } else {
          res
            .status(200)
            .send({ call: 1, message: "Details Found", user: result[0] });
        }
      })
      .catch((error) => {
        res.status(500).send({ call: 0, message: "Server Error", data: error });
      });
  },
  verifyUserDetails: function (req, res, next) {
    var data = req.body;
    console.log(data);
    HomeModel.verifyUserDetails(res.pool, data)
      .then((result) => {
        if (result.length == 0) {
          res.status(200).send({ call: 0, message: "User Not Found" });
        } else {
          res.status(200).send({
            call: 1,
            message: "User Found",
            user:
              "http://dummy.g-seva.com/tax-payer/new/pay-list/" + result[0].id,
          });
        }
      })
      .catch((error) => {
        res.status(500).send({ call: 0, message: "Server Error", data: error });
      });
  },
  getVillageList: function (req, res, next) {
    HomeModel.getVillageName(res.pool)
      .then((result) => {
        res.status(200).send({ status: true, result });
      })
      .catch((error) => {
        res.status(500).send({ status: false, data: error });
      });
  },
  saveMobileCertificate: async function (req, res) {
    try {
      await HomeModel.addMobileCertificate(res.pool, req.body);
      res.status(200).send({ status: true });
    } catch (error) {
      res.status(500).send({ status: false, data: error });
    }
  },
  mobileCertificateList: async function (req, res) {
    try {
      let result = await HomeModel.getMobileCertificate(
        res.pool,
        Number(req.body.id),
      );
      res.status(200).send({ status: true, certificates: result });
    } catch (error) {
      res.status(500).send({ status: false, data: error });
    }
  },
};
module.exports = APIController;
