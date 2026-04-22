let HomeModel = require("../model/HomeModel");
let KarVasuliAhawalModel = require("../model/KarVasuliAhawalModel");

let KarVasuliAhawalController = {
  allList: (_, res) => {
    let gp = {};
    HomeModel.getGpData(res.pool)
      .then((result) => {
        gp = result[0];
        return KarVasuliAhawalModel.getMonthwiseList(res.pool);
      })
      .then((result) => {
        // Getting the years for which vasuli form is filled
        let years = result.map((el) => {
          return el.year;
        });
        let uniqueYears = [...new Set(years)];

        // rendering the vasuli list page
        res.render("user/kar_wasuli/kar_wasuli_all_list", {
          gp: gp,
          // avahalListMonthwise: result,
          years: uniqueYears.sort((a, b) => a - b),
        });
      })
      .catch((error) => {
        res.status(500).send({ call: 0, data: error });
      });
  },

  yearWiseList: async function (req, res) {
    try {
      let ahavalListYearwise = await KarVasuliAhawalModel.yearWiseList(
        res.pool,
        req.query.year
      );
      res.status(200).json({
        call: 1,
        ahavalListYearwise,
      });
    } catch (error) {
      return res.status(200).json({
        call: 0,
        data: error,
      });
    }
  },

  printKarVasuli: async function (req, res) {
    let { month, year } = req.query;
    let gp = {};

    try {
      // getting gp details
      let gpData = await HomeModel.getGpData(res.pool);
      gp = gpData[0];

      // getting print details
      let printDetails = await KarVasuliAhawalModel.getPrintKarVasuli(
        res.pool,
        month,
        year
      );


      res.render("user/kar_wasuli/gpAhavalKarVasuli(gramsevak).pug", {
        gp,
        printDetails: printDetails[0],
      });

    } catch (error) {
      return res.status(500).json({
        call: 0,
        data: error,
      });
    }
  },

  newView: async (req, res) => {
    let gp = {};

    try {
      let result = await HomeModel.getGpData(res.pool);
      gp = result[0];
      let formNightTotal = await KarVasuliAhawalModel.getFormNinePayment(
        res.pool
      );
      let lastMonthCollection = await KarVasuliAhawalModel.getLastMonth(
        res.pool
      );
      if (
        lastMonthCollection.length === 0 ||
        lastMonthCollection[0].month == 4
      ) {
        lastMonthCollection = [
          {
            lastBuildingTax: 0,
            currentBuildingTax: 0,
            totalBuildingTax: 0,
            lastDivaTax: 0,
            currentDivaTax: 0,
            totalDivaTax: 0,
            lastArogyaTax: 0,
            currentArogyaTax: 0,
            totalArogyaTax: 0,
            lastTaxFine: 0,
            lastYearTaxFine: 0,
            lastTaxRelief: 0,
            totalTax: 0,
            totalSampurnaTax: 0,
            lastSpacialWaterTax: 0,
            currentSpacialWaterTax: 0,
            totalSpacialWaterTax: 0,
            lastGenealWaterTax: 0,
            currentGenealWaterTax: 0,
            totalGenealWaterTax: 0,
            totalWaterTax: 0,
            month: 0,
          },
        ];
      }

      //res.send({ formNightTotal, lastMonthCollection });
      res.render("user/kar_wasuli/add_new_kar_wasuli", {
        gp: gp,
        lastMonthCollection: lastMonthCollection[0],
        formNightTotal: formNightTotal[0],
      });
    } catch (error) {
      res.status(500).send({ call: 0, data: error });
    }
  },

  checkFilledDetails: async function (req, res) {
    let { month, year } = req.body;
    try {
      let response = await KarVasuliAhawalModel.checkFilledDetails(
        res.pool,
        month,
        year
      );

      if (response.length !== 0) {
        return res.status(200).json({
          call: 1,
        });
      } else {
        return res.status(200).json({
          call: 2,
        });
      }
    } catch (error) {
      return res.status(500).json({
        call: 0,
        data: error,
      });
    }
  },

  newKarVasuliAvahalView: async function (req, res) {
    let { month, year } = req.query;

    let gp = {};

    let gpDetails = await HomeModel.getGpData(res.pool);
    gp = gpDetails[0];

    // if (month == "04") {
    //   res.render("user/kar_wasuli/add_new_kar_wasuli", {
    //     gp: gp,
    //   });
    // }

    let previousKardata =
      await KarVasuliAhawalModel.getPreviousKarVasuliAvahalData(
        res.pool,
        Number(month) - 1,
        year
      );

    if (previousKardata.length === 0) {
      return res.render("user/kar_wasuli/add_new_kar_wasuli", {
        gp: gp,
      });
    }

    res.render("user/kar_wasuli/add_new_kar_wasuli", {
      gp: gp,
      previousMonthData: previousKardata[0],
    });
  },

  editKarVasuliAvahalView: async function (req, res) {
    const _gp = await HomeModel.getGpData(res.pool);

    const _karVasuliAhaval = await KarVasuliAhawalModel.getKarVasuliDataVyId(
      res.pool,
      req.params.id
    );

    res.render("user/kar_wasuli/edit_kar_wasuli", {
      gp: _gp[0],
      karVasuliAhaval: _karVasuliAhaval[0],
    });
  },

  postNewKarVasuliAvahal: async function (req, res) {
    try {
      const response = await KarVasuliAhawalModel.postNewKarVasuliAvahal(
        res.pool,
        req.body
      );

      let result = await response;

      if (result.affectedRows === 1) {
        return res.status(200).json({
          call: 1,
        });
      }
    } catch (error) {
      return res.status(500).json({
        call: 0,
        data: error,
      });
    }
  },

  updateKarVasuliAvahal: async function (req, res) {
    try {
      const _existingEntriesExceptCurrentForMonthYear =
        await KarVasuliAhawalModel.existingEntriesExceptCurrentForMonthYear(
          res.pool,
          req.body
        );

      if (_existingEntriesExceptCurrentForMonthYear.length > 0) {
        return res.status(409).json({
          call: 2,
          data: "You can't update this entry as it's already filled for the given month and year.",
        });
      }

      const result = await KarVasuliAhawalModel.updateNewKarVasuliAvahal(
        res.pool,
        req.body
      );

      if (result.affectedRows === 1) {
        return res.status(200).json({
          call: 1,
        });
      }
    } catch (error) {
      console.log(`Error while updating karvasuli ahaval : ${error}`)
      return res.status(500).json({
        call: 0,
        data: error,
      });
    }
  },

  // delete kar vasuli
  deleteKarVasuli: async function (req, res) {
    let { month, year } = req.body;

    try {
      let response = await KarVasuliAhawalModel.deleteKarVasuli(
        res.pool,
        month,
        year
      );
      if (response.affectedRows === 1) {
        return res.status(200).json({
          call: 1,
        });
      }
      return false;
    } catch (error) {
      return res.status(500).json({
        call: 0,
        data: error,
      });
    }
  },
};
module.exports = KarVasuliAhawalController;
