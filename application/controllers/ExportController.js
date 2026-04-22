var IndexModel = require("../model/HomeModel");
let FormNine = require("../model/FormNightModel");
var ZPModel = require("../model/ZPModel");
const excel = require("exceljs");
const HomeModel = require("../model/HomeModel");
var exportController = {
  exportFormEight: function (req, res, next) {
    var zpData = {};
    ZPModel.getZpDetails(res.pool)
      .then((result) => {
        zpData = result[0];
        return IndexModel.formEightExportDetails(res.pool);
      })
      .then(function (res_data) {
        res_data = res_data.map(function (user) {
          return {
            taluka: zpData.gp_taluka,
            dist: zpData.gp_dist,
            gp_name: zpData.gp_name,
            gp_name_1: zpData.gp_name,
            anukramank: user.anukramank,
            feu_malmattaNo: user.feu_malmattaNo,
            feu_malmattaNo_1: user.feu_malmattaNo,
            feu_ownerName: user.feu_ownerName,
            feu_secondOwnerName: user.feu_secondOwnerName,
            fet_prop_space_text: user.fet_prop_space_text,
            fet_sq_meter_area: user.fet_sq_meter_area,
            fet_sq_meter_area_1: user.fet_sq_meter_area,
            fet_sq_area: user.fet_sq_area,
            empty: "-",
          };
        });

        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("नमुना ८");
        worksheet.columns = [
          { header: "अनु. क्र.", key: "anukramank", width: 5 },
          { header: "जिल्हा", key: "dist", width: 25 },
          { header: "तालुका", key: "taluka", width: 25 },
          { header: "ग्रामपंचायत", key: "gp_name", width: 10 },
          { header: "GPLGDCODE", key: "empty", width: 10 },
          { header: "गावाचे नाव", key: "gp_name_1", width: 10 },
          { header: "Village Code", key: "empty", width: 10 },
          { header: "गट क्र. भूमापन क्र.", key: "empty", width: 10 },
          { header: "मालमत्ता क्रमांक", key: "feu_malmattaNo", width: 10 },
          { header: "Property Number", key: "feu_malmattaNo_1", width: 10 },
          {
            header: "गावठाणाच्या आतील मालमत्ता / गावठाणाच्या बाहेरील मालमत्ता",
            key: "empty",
            width: 10,
          },
          { header: "मालमत्ता वापराचा प्रकार", key: "empty", width: 10 },
          {
            header: "मालकाचे नाव (धारण करणाऱ्याचे नाव)",
            key: "feu_ownerName",
            width: 25,
          },
          {
            header: "भोगवटा करणाऱ्याचे नाव",
            key: "feu_secondOwnerName",
            width: 25,
          },

          { header: "मालमत्तेचे वर्णन", key: "fet_prop_space_text", width: 25 },
          {
            header: "एकूण क्षेत्रफळ चौ मी",
            key: "fet_sq_meter_area",
            width: 10,
          },
          { header: "Area Sq.Mtr.", key: "fet_sq_meter_area_1", width: 10 },
          {
            header: "एकूण संपूर्ण जागेचे क्षेत्रफळ चौ फुट ",
            key: "fet_sq_area",
            width: 10,
          },
        ];
        /*workbook.mergeCells("C1", "J2");
        workbook.getCell("C1").value = "Client List";*/

        worksheet.addRows(res_data);
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "from-eight-user-tax-list.xlsx"
        );
        return workbook.xlsx.write(res);
      })
      .then(function () {
        res.status(200).end();
      })
      .catch(function (error) {
        res.status(500).send(error);
      });
  },

  exportFormNine: function (req, res, next) {
    FormNine.getSamanyaPrintData(res.pool)
      .then(function (res_data) {
        res_data = res_data.map(function (user, _index) {
          return {
            // anu_kramank: user.anu_kramank
            anu_kramank: _index + 1,
            feu_malmattaNo: user.feu_malmattaNo,
            feu_homeNo: user.feu_homeNo,
            feu_ownerName: user.feu_ownerName,
            feu_secondOwnerName: user.feu_secondOwnerName,
            lastBuildingTax: user.lastBuildingTax,
            currentBuildingTax: user.currentBuildingTax,
            totalBuildingTax: user.totalBuildingTax,
            lastTaxFine: user.lastTaxFine,
            lastYearTaxFine: user.lastYearTaxFine,
            totalTax: user.totalTax,
            lastDivaTax: user.lastDivaTax,
            currentDivaTax: user.currentDivaTax,
            totalDivaTax: user.totalDivaTax,
            lastArogyaTax: user.lastArogyaTax,
            currentArogyaTax: user.currentArogyaTax,
            totalArogyaTax: user.totalArogyaTax,
            totalSampurnaTax: user.totalSampurnaTax,
            lastSpacialWaterTax: user.lastSpacialWaterTax,
            currentSpacialWaterTax: user.currentSpacialWaterTax,
            totalSpacialWaterTax: user.totalSpacialWaterTax,
            lastGenealWaterTax: user.lastGenealWaterTax,
            currentGenealWaterTax: user.currentGenealWaterTax,
            totalGenealWaterTax: user.totalGenealWaterTax,
            totalTax:
              Number(user.totalSampurnaTax) + Number(user.totalWaterTax),
          };
        });
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("नमुना 9");
        worksheet.columns = [
          { header: "अनु क्र Automatic ", key: "anu_kramank", width: 5 },
          { header: "मालमत्ता क्र", key: "feu_malmattaNo", width: 25 },
          { header: "जुना मालमत्ता क्र", key: "feu_homeNo", width: 25 },
          { header: "मालमत्ता धारकाचे नाव", key: "feu_ownerName", width: 10 },
          { header: "भोगवटदाराचे नाव ", key: "feu_secondOwnerName", width: 10 },
          { header: "मागील इमारत एकूण ", key: "lastBuildingTax", width: 10 },
          { header: "चालू  इमारत एकूण", key: "currentBuildingTax", width: 10 },
          { header: "एकूण इमारत कर ", key: "totalBuildingTax", width: 10 },
          { header: "मागील घर पट्टी वर दंड कर", key: "lastTaxFine", width: 10 },
          { header: "चालू सूट कर", key: "lastYearTaxFine", width: 10 },
          { header: "एकूण दंड व सूट कर", key: "totalTax", width: 10 },
          { header: "मागील दिवा कर", key: "lastDivaTax", width: 10 },
          { header: "चालू दिवा कर ", key: "currentDivaTax", width: 10 },
          { header: "एकूण दिवा कर", key: "totalDivaTax", width: 10 },
          { header: "मागील आरोग्य कर", key: "lastArogyaTax", width: 10 },
          { header: "चालू आरोग्य कर", key: "currentArogyaTax", width: 10 },
          { header: "एकूण आरोग्य कर", key: "totalArogyaTax", width: 10 },
          { header: "संपूर्ण एकूण कर", key: "totalSampurnaTax", width: 10 },
          {
            header: "मागील विशेष पाणी कर",
            key: "lastSpacialWaterTax",
            width: 10,
          },
          {
            header: "चालू विशेष पाणी कर",
            key: "currentSpacialWaterTax",
            width: 10,
          },
          { header: "एकूण पाणी कर", key: "totalSpacialWaterTax", width: 10 },
          {
            header: "मागील सामान्य  पाणी कर",
            key: "lastGenealWaterTax",
            width: 10,
          },
          {
            header: "चालू सामान्य  कर",
            key: "currentGenealWaterTax",
            width: 10,
          },
          { header: "एकूण पाणी कर", key: "totalGenealWaterTax", width: 10 },
          { header: "संपूर्ण एकूण कर", key: "totalTax", width: 10 },
        ];

        worksheet.addRows(res_data);
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + "from-nine-user-tax-list.xlsx"
        );
        return workbook.xlsx.write(res);
      })
      .then(function () {
        res.status(200).end();
      })
      .catch(function (error) {
        res.status(500).send(error);
      });
  },

  exportFormEightNewFormat: async (req, res) => {
    try {
      const [gp] = await HomeModel.getGpData(res.pool);

      const f8UsersList = await IndexModel.formEightExportDetails(res.pool);

      let f8UsersListInRowsFormat = f8UsersList.map((f8User) => {
        return {
          taluka: gp.gp_taluka,
          dist: gp.gp_dist,
          gp_name: gp.gp_name,
          gp_name_1: gp.gp_name,
          anukramank: f8User.anukramank,
          // malmatta No.
          feu_malmattaNo: f8User.feu_malmattaNo,
          feu_malmattaNo_1: f8User.feu_malmattaNo,

          // धारक
          feu_ownerName: f8User.feu_ownerName,
          // भोगवटदाराचे नाव
          feu_secondOwnerName: f8User.feu_secondOwnerName,
          // घराचा प्रकार / मालमत्तेचे वर्णन
          fet_prop_space_text: f8User.fet_prop_space_text,

          // total area sq.meter
          fet_sq_meter_area: f8User.fet_sq_meter_area,

          fet_sq_meter_area_1: f8User.fet_sq_meter_area,

          // in sq.feet
          fet_sq_area: f8User.fet_sq_area,

          // घरकुल योजना
          gy_name: f8User.gy_name,

          // शौचालय
          feu_havingToilet: f8User.feu_havingToilet,

          feu_mobileNo: f8User.feu_mobileNo,
          feu_aadharNo: f8User.feu_aadharNo,
          feu_eastLandmark: f8User.feu_eastLandmark,
          feu_westLandmark: f8User.feu_westLandmark,
          feu_southLandmark: f8User.feu_southLandmark,
          feu_northLandmark: f8User.feu_northLandmark,
          empty: "-",
        };
      });

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("नमुना ८ यादी");

      worksheet.columns = [
        { header: "अनु. क्र.", key: "anukramank", width: 20 }, // was 10 → now 20
        { header: "मालमत्ता क्रमांक", key: "feu_malmattaNo", width: 20 },
        { header: "जुना क्र.", key: "feu_homeNo", width: 20 },

        {
          header: "मालमत्ता धारकाचे नाव",
          key: "feu_ownerName",
          width: 50, // was 30 → slightly more
        },

        {
          header: "भोगवटदाराचे नाव",
          key: "feu_secondOwnerName",
          width: 50,
        },

        {
          header: "घराचा प्रकार/मालमत्तेचे वर्णन",
          key: "fet_prop_space_text",
          width: 60, // was 35 → now much wider
        },

        {
          header: "एकूण क्षेत्रफळ चौ मी",
          key: "fet_sq_meter_area",
          width: 25,
        },

        {
          header: "एकूण संपूर्ण जागेचे क्षेत्रफळ चौ फुट",
          key: "fet_sq_area",
          width: 30,
        },

        {
          header: "घरकुल",
          key: "gy_name",
          width: 50,
        },

        {
          header: "शौचालय",
          key: "feu_havingToilet",
          width: 20,
        },

        {
          header: "मोबाईल क्र.",
          key: "feu_mobileNo",
          width: 22,
        },

        {
          header: "आधार क्र.",
          key: "feu_aadharNo",
          width: 25,
        },

        {
          header: "पूर्वेस",
          key: "feu_eastLandmark",
          width: 55, // was 25 → now much wider
        },

        {
          header: "पश्चिमेस",
          key: "feu_westLandmark",
          width: 55,
        },

        {
          header: "उत्तरेस",
          key: "feu_southLandmark",
          width: 55,
        },

        {
          header: "दक्षिणेस",
          key: "feu_northLandmark",
          width: 55,
        },

        {
          header: "फोटो नं.",
          key: "",
          width: 20,
        },

        {
          header: "सही",
          key: "", 
          width: 20,
        },
      ];

      worksheet.addRows(f8UsersListInRowsFormat);
      // 💥 Set font, alignment, and wrap text for header row
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { name: "Arial", size: 12, bold: true }; // Font style
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        }; // Wrap text
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // 💥 Optional: Style all data rows (you can loop or apply basic format)
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header
        row.eachCell((cell) => {
          cell.font = { name: "Arial", size: 11 };
          cell.alignment = {
            vertical: "top",
            horizontal: "left",
            wrapText: true,
          };
        });
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "from-eight-user-list-new-format.xlsx"
      );

      await workbook.xlsx.write(res);
      return res.status(200).end();
    } catch (err) {
      console.error("Error:", err);
    }
  },
};
module.exports = exportController;
