var responderSet = require("../config/_responderSet");
const { runQuery } = require("../utils/runQuery");
let HomeModel = require("./HomeModel");
let myDates = responderSet.myDate;

module.exports = {
  printFormNineAll: (pool, y1, y2) => {
    let query = `SELECT 
                      f8_user.feu_malmattaNo,
                      f8_user.feu_homeNo,
                      f8.feu_mobileNo,
                      f8_user.feu_ownerName,
                      f8_user.feu_secondOwnerName,

                      f9.lastTaxFine,
                      f9.lastTaxRelief,

                      f9.lastBuildingTax,
                      f9.currentBuildingTax,
                      (f9.lastBuildingTax + f9.currentBuildingTax) 
                        AS _totalBuildingTax,

                      f9.lastDivaTax,
                      f9.currentDivaTax,
                      (f9.lastDivaTax + f9.currentDivaTax)
                        AS _totalDivaTax,

                      f9.lastArogyaTax,
                      f9.currentArogyaTax,
                      (f9.lastArogyaTax + f9.currentArogyaTax) 
                        AS _totalArogyaTax,

                      f9.lastEducationTax,
                      f9.currentEducationTax,
                      (f9.lastEducationTax + f9.currentEducationTax)
                        AS _totalEducationTax,

                      f9.lastFireblegateTax,
                      f9.currentFireblegateTax,
                      (f9.lastFireblegateTax + f9.currentFireblegateTax)
                        AS _totalFireblegateTax,

                      f9.lastCleaningTax,
                      f9.currentCleaningTax,
                      (f9.lastCleaningTax + f9.currentCleaningTax)
                        AS _totalCleaningTax,

                      f9.lastTreeTax,
                      f9.currentTreeTax,
                      (f9.lastTreeTax + f9.currentTreeTax)
                        AS _totalTreeTax,


                      (
                        f9.lastTaxFine +
                        (f9.lastBuildingTax + f9.currentBuildingTax) +
                        (f9.lastDivaTax + f9.currentDivaTax) +
                        (f9.lastArogyaTax + f9.currentArogyaTax) +
                        (f9.lastEducationTax + f9.currentEducationTax) +
                        (f9.lastFireblegateTax + f9.currentFireblegateTax) +
                        (f9.lastCleaningTax + f9.currentCleaningTax) +
                        (f9.lastTreeTax + f9.currentTreeTax)
                      )
                         AS 
                         _totalSamanyaTax,

                      f9.lastSpacialWaterTax,
                      f9.currentSpacialWaterTax,

                      (f9.lastSpacialWaterTax + f9.currentSpacialWaterTax)
                      AS _totalSpacialWaterTax,
                      
                      f9.lastGenealWaterTax,
                      f9.currentGenealWaterTax,
                      
                      (f9.lastGenealWaterTax + f9.currentGenealWaterTax )
                      AS _totalGenealWaterTax,

                      f9.totalWaterTax
                  FROM  (
                            SELECT * 
                            FROM ps_form_nine_form 
                            WHERE 
                              YEAR(created_date) >= ? 
                                AND 
                              YEAR(created_date) <= ?
                        ) AS f9
                  INNER JOIN 
                    ps_form_eight_user AS f8_user
                  ON 
                    f8_user.id = f9.user_id
                    
                    ORDER BY 
  CAST(SUBSTRING_INDEX(f8_user.feu_malmattaNo, '/', 1) AS DECIMAL),
  IF(LOCATE('/', f8_user.feu_malmattaNo) > 0, 
    CAST(SUBSTRING_INDEX(f8_user.feu_malmattaNo, '/', -1) AS DECIMAL), 
    0);`;

    //REmoving the year ciriteria
    let query2 = `SELECT 
            f8_user.feu_malmattaNo,
            f8_user.feu_homeNo,
            f8_user.feu_ownerName,
            f8_user.feu_secondOwnerName,
            f8_user.feu_mobileNo,

            f9.lastTaxFine,
            f9.lastTaxRelief,

            f9.lastBuildingTax,
            f9.currentBuildingTax,
            (f9.lastBuildingTax + f9.currentBuildingTax) 
              AS _totalBuildingTax,

            f9.lastDivaTax,
            f9.currentDivaTax,
            (f9.lastDivaTax + f9.currentDivaTax)
              AS _totalDivaTax,

            f9.lastArogyaTax,
            f9.currentArogyaTax,
            (f9.lastArogyaTax + f9.currentArogyaTax) 
              AS _totalArogyaTax,

            f9.lastEducationTax,
            f9.currentEducationTax,
            (f9.lastEducationTax + f9.currentEducationTax)
              AS _totalEducationTax,

            f9.lastFireblegateTax,
            f9.currentFireblegateTax,
            (f9.lastFireblegateTax + f9.currentFireblegateTax)
              AS _totalFireblegateTax,

            f9.lastCleaningTax,
            f9.currentCleaningTax,
            (f9.lastCleaningTax + f9.currentCleaningTax)
              AS _totalCleaningTax,

            f9.lastTreeTax,
            f9.currentTreeTax,
            (f9.lastTreeTax + f9.currentTreeTax)
              AS _totalTreeTax,


            (
              f9.lastTaxFine +
              (f9.lastBuildingTax + f9.currentBuildingTax) +
              (f9.lastDivaTax + f9.currentDivaTax) +
              (f9.lastArogyaTax + f9.currentArogyaTax) +
              (f9.lastEducationTax + f9.currentEducationTax) +
              (f9.lastFireblegateTax + f9.currentFireblegateTax) +
              (f9.lastCleaningTax + f9.currentCleaningTax) +
              (f9.lastTreeTax + f9.currentTreeTax)
            )
              AS 
              _totalSamanyaTax,

            f9.lastSpacialWaterTax,
            f9.currentSpacialWaterTax,

            (f9.lastSpacialWaterTax + f9.currentSpacialWaterTax)
            AS _totalSpacialWaterTax,
            
            f9.lastGenealWaterTax,
            f9.currentGenealWaterTax,
            
            (f9.lastGenealWaterTax + f9.currentGenealWaterTax )
            AS _totalGenealWaterTax,

            f9.totalWaterTax
        FROM  
          ps_form_nine_form AS f9
        INNER JOIN 
          ps_form_eight_user AS f8_user
        ON 
          f8_user.id = f9.user_id
          
          ORDER BY 
        CAST(SUBSTRING_INDEX(f8_user.feu_malmattaNo, '/', 1) AS DECIMAL),
        IF(LOCATE('/', f8_user.feu_malmattaNo) > 0, 
        CAST(SUBSTRING_INDEX(f8_user.feu_malmattaNo, '/', -1) AS DECIMAL), 
        0);`;

    return runQuery(pool, query2, [y1, y2]);
  },

  printFormNineAllSamanya: function (pool, y1 = "", y2 = "") {
    const startDate = `${y1}-04-01`;
    const endDate = `${y2}-03-31`;
    //REmoving the year ciriteria
    let query = `SELECT 
                f8_user.feu_malmattaNo,
                f8_user.feu_homeNo,
                f8_user.feu_ownerName,
                f8_user.feu_secondOwnerName,
                f8_user.feu_mobileNo,
                f9.lastTaxFine,
                f9.lastTaxRelief,

                f9.lastBuildingTax,
                f9.currentBuildingTax,
                (f9.lastBuildingTax + f9.currentBuildingTax) 
                AS _totalBuildingTax,

                f9.lastDivaTax,
                f9.currentDivaTax,
                (f9.lastDivaTax + f9.currentDivaTax)
                AS _totalDivaTax,

                f9.lastArogyaTax,
                f9.currentArogyaTax,
                (f9.lastArogyaTax + f9.currentArogyaTax) 
                AS _totalArogyaTax,

        

                f9.lastCleaningTax,
                f9.currentCleaningTax,
                (f9.lastCleaningTax + f9.currentCleaningTax)
                AS _totalCleaningTax,




                (
                f9.lastTaxFine +
                (f9.lastBuildingTax + f9.currentBuildingTax) +
                (f9.lastDivaTax + f9.currentDivaTax) +
                (f9.lastArogyaTax + f9.currentArogyaTax) +

                (f9.lastCleaningTax + f9.currentCleaningTax) 
                
                )
                AS 
                _totalSamanyaTax,

                f9.lastSpacialWaterTax,
                f9.currentSpacialWaterTax,

                (f9.lastSpacialWaterTax + f9.currentSpacialWaterTax)
                AS _totalSpacialWaterTax,
                
                f9.lastGenealWaterTax,
                f9.currentGenealWaterTax,
                
                (f9.lastGenealWaterTax + f9.currentGenealWaterTax )
                AS _totalGenealWaterTax,

                f9.totalWaterTax
            FROM  
            ps_form_eight_user AS f8_user
            INNER JOIN 
            ps_form_nine_form AS f9
            ON 
            f8_user.id = f9.user_id

            
           

            GROUP BY f9.user_id

            ORDER BY 
            CAST(SUBSTRING_INDEX(f8_user.feu_malmattaNo, '/', 1) AS DECIMAL),
            IF(LOCATE('/', f8_user.feu_malmattaNo) > 0, 
            CAST(SUBSTRING_INDEX(f8_user.feu_malmattaNo, '/', -1) AS DECIMAL), 
            0)
            ;`;
    return runQuery(pool, query, [startDate, endDate]);
  },

  formEightUser: function (pool, data) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                      id,
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_image,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_mobileNo,
                      feu_gramPanchayet,
                      feu_villageName,
                      feu_gaatNo,
                      feu_gharkulYojna,
                      feu_havingToilet,
                      feu_areaHeight,
                      feu_areaWidth,
                      feu_totalArea,
                      feu_totalAreaSquareMeter,
                      feu_eastLandmark,
                      feu_westLandmark,
                      feu_southLandmark,
                      feu_northLandmark,
                      home_image_longitude,
                      home_image_latitude,
                      home_image_accuracy
                    FROM ps_form_eight_user WHERE id = ?`;
      pool.query(query, [Number(data.id)], (err, result) => {
        if (err) {
          ((responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData));
        } else {
          resolve(result);
        }
      });
    });
  },

  getTotalTaxData: (pool, data) => {
    let q = `SELECT * FROM ps_form_eight_total_taxation WHERE user_id = ?`;
    return runQuery(pool, q, [data.id]);
  },

  updateFormNineFromFormEight: function (pool, data) {
    const q = `UPDATE 
                      ps_form_nine_form 
                    SET 
                      currentBuildingTax = ?,
                      currentDivaTax = ?,
                      currentArogyaTax = ?,

                      currentEducationTax = ?,
                      currentFireblegateTax = ?,
                      currentCleaningTax = ?,

                      currentTreeTax = ?,
                      totalBuildingTax = ?,
                      totalSampurnaTax = ?
                    WHERE id = ? `;

    let insertArr = [
      +data.currentBuildingTax,
      +data.currentDivaKar,
      +data.currentArogyaTax,

      +data.currentEducationTax,
      +data.currentFireblegateTax,
      +data.currentCleaningTax,

      +data.currentTreeTax,
      +data.totalBuildingTax,
      +data.totalSampurnaTax,
      +data.updateId,
    ];

    return runQuery(pool, q, insertArr);
  },

  cleanFormNineTaxation: function (pool, user_id) {
    let q = "DELETE FROM ps_form_nine_form WHERE user_id = ? ";
    return runQuery(pool, q, [Number(user_id)]);
  },

  getFormNineSavedDetails: function (pool, data) {
    let q = `SELECT * FROM ps_form_nine_form  WHERE user_id = ? LIMIT 1`;
    return runQuery(pool, q, [Number(data.id)]);
  },

  getNightPreTaxationData: function (pool, data, callback) {
    // console.log(data, "data----");
    var sendData = {
      user: {},
      jsUser: [],
      totalTaxData: [],
      totalTaxData_1: {},
      formNineSavedDetails: {},
      update: false,
      gp: {},
    };

    var _this = this;

    HomeModel.getGpData(pool)
      .then((result) => {
        sendData.gp = result[0];
        return _this.formEightUser(pool, data);
      })
      .then(async (result) => {
        if (result.length == 0) {
          callback(true, { call: 2 });
          return 999;
        } else {
          sendData.user = result[0];
          let oldOwnerList = await HomeModel.getOldOwnerList(
            pool,
            result[0].id,
          );
          sendData.jsUser = JSON.stringify(result);
          sendData.oldOwnerList = oldOwnerList
            ? oldOwnerList.map((ownerData) => ownerData.feu_old_owner)
            : [];
          return _this.getTotalTaxData(pool, data);
        }
      })
      .then((result) => {
        if (result !== 999) {
          if (result.length == 0) {
            callback(true, { call: 3 });
            return 999;
          } else {
            sendData.totalTaxData_1 = result[0];
            sendData.totalTaxData = JSON.stringify(result);
            return _this.getFormNineSavedDetails(pool, data);
          }
        }
      })
      .then((result) => {
        if (result !== 999) {
          if (result.length !== 0) {
            sendData.formNineSavedDetails = result[0];
            sendData.update = true;
          }
          callback(true, { call: 1, data: sendData });
        }
      })
      .catch((error) => {
        console.log("Error while calling this model function" + error);
        callback(false, { call: 0, data: error });
      });
  },

  //   Was trying to write down the readable version of the above, INCOMPLETE REFACTORING
  //   getNightPreTaxationData2: async(pool, data, callback) =>{
  //         try {

  //             let _this = this;
  //             const [gp] = await HomeModel.getGpData(pool)

  //             let [f8User] = await _this.formEightUser(pool, data)

  //             if(!f8User) {
  //                 return callback(true, {call: 2})
  //             }

  //             let jsUser = JSON.stringify(f8User)

  //         } catch (err) {
  //             console.error('Error:', err);
  //             callback(false, { call: 0, data: err });
  //         }

  //     },

  preCheckFormNineDetails: function (pool, data) {
    let q = `SELECT id FROM ps_form_nine_form  WHERE user_id = ?`;
    return runQuery(pool, q, [Number(data.user_id)]);
  },
  saveNewFormNineDetails: function (pool, data) {
    let q = `INSERT INTO ps_form_nine_form(

                            currentArogyaTax,
                            currentBuildingTax,
                            currentDivaTax,
                            currentGenealWaterTax,
                            currentSpacialWaterTax,

                            currentEducationTax,
                            currentFireblegateTax,
                            currentCleaningTax,
                            currentTreeTax,

                            user_id,
                            lastArogyaTax,
                            lastBuildingTax,
                            lastDivaTax,
                            lastGenealWaterTax,
                            lastSpacialWaterTax,

                            lastEducationTax,
                            lastFireblegateTax,
                            lastCleaningTax,
                            lastTreeTax,

                            lastTaxFine,
                            lastYearTaxFine,
                            lastTaxRelief,
                            totalArogyaTax,
                            totalBuildingTax,
                            totalDivaTax,
                            totalGenealWaterTax,
                            totalSampurnaTax,
                            totalSpacialWaterTax,

                            totalEducationTax,
                            totalFireblegateTax,
                            totalCleaningTax,
                            totalTreeTax,

                            totalTax,
                            totalWaterTax,
                            created_date,
                            modify_date
                ) VALUES (?)`;

    let insertArr = [
      data.currentArogyaTax,
      data.currentBuildingTax,
      data.currentDivaTax,
      data.currentGenealWaterTax,
      data.currentSpacialWaterTax,

      data.currentEducationTax,
      data.currentFireblegateTax,
      data.currentCleaningTax,
      data.currentTreeTax,

      data.user_id,
      data.lastArogyaTax,
      data.lastBuildingTax,
      data.lastDivaTax,
      data.lastGenealWaterTax,
      data.lastSpacialWaterTax,

      data.lastEducationTax,
      data.lastFireblegateTax,
      data.lastCleaningTax,
      data.lastTreeTax,

      data.lastTaxFine,
      data.lastYearTaxFine,
      data.lastTaxRelief,

      data.totalArogyaTax,
      data.totalBuildingTax,
      data.totalDivaTax,

      data.totalGenealWaterTax,
      data.totalSampurnaTax,
      data.totalSpacialWaterTax,

      data.totalEducationTax,
      data.totalFireblegateTax,
      data.totalCleaningTax,
      data.totalTreeTax,

      data.totalTax,
      data.totalWaterTax,
      myDates.getDate(),
      myDates.getDate(),
    ];
    return runQuery(pool, q, [insertArr]);
  },

  updateFormNineDetails: function (pool, data) {
    let q = `UPDATE ps_form_nine_form SET 
                            currentArogyaTax = ?,
                            currentBuildingTax = ?,
                            currentDivaTax = ?,
                            currentGenealWaterTax = ?,
                            currentSpacialWaterTax = ?,

                            currentEducationTax = ?,
                            currentFireblegateTax = ?,
                            currentCleaningTax = ?,
                            currentTreeTax = ?,

                            lastArogyaTax  = ?,
                            lastBuildingTax = ?,
                            lastDivaTax = ?,
                            lastGenealWaterTax = ?,
                            lastSpacialWaterTax = ?,

                            lastEducationTax = ?,
                            lastFireblegateTax = ?,
                            lastCleaningTax = ?,
                            lastTreeTax = ?,
                            
                            lastTaxFine = ?,
                            lastYearTaxFine = ?,
                            lastTaxRelief = ?,
                            totalArogyaTax = ?,
                            totalBuildingTax = ?,
                            totalDivaTax = ?,
                            totalGenealWaterTax = ?,
                            totalSampurnaTax = ?,
                            totalSpacialWaterTax = ?,

                            totalEducationTax = ?,
                            totalFireblegateTax = ?,
                            totalCleaningTax = ?,
                            totalTreeTax = ?,

                            totalTax = ?,
                            totalWaterTax = ?,
                            modify_date = ?
                WHERE id = ? `;

    let updateArr = [
      data.currentArogyaTax,
      data.currentBuildingTax,
      data.currentDivaTax,
      data.currentGenealWaterTax,
      data.currentSpacialWaterTax,

      data.currentEducationTax,
      data.currentFireblegateTax,
      data.currentCleaningTax,
      data.currentTreeTax,

      data.lastArogyaTax,
      data.lastBuildingTax,
      data.lastDivaTax,
      data.lastGenealWaterTax,
      data.lastSpacialWaterTax,

      data.lastEducationTax,
      data.lastFireblegateTax,
      data.lastCleaningTax,
      data.lastTreeTax,

      data.lastTaxFine,
      data.lastYearTaxFine,
      data.lastTaxRelief,
      data.totalArogyaTax,
      data.totalBuildingTax,
      data.totalDivaTax,
      data.totalGenealWaterTax,
      data.totalSampurnaTax,
      data.totalSpacialWaterTax,

      data.totalEducationTax,
      data.totalFireblegateTax,
      data.totalCleaningTax,
      data.totalTreeTax,

      data.totalTax,
      data.totalWaterTax,
      myDates.getDate(),
      Number(data.lastUpdateId),
    ];

    return runQuery(pool, q, updateArr);
  },

  updateFormEightFromFormNine: function (pool, data) {
    let totalTax =
      +data.currentDivaTax +
      +data.currentArogyaTax +
      +data.currentEducationTax +
      +data.currentFireblegateTax +
      +data.currentCleaningTax +
      +data.currentTreeTax +
      +data.currentBuildingTax;

    let query = `
      UPDATE 
        ps_form_eight_total_taxation 
      SET
        dava_kar = ?,
        arogya_kar = ?,
        education_tax = ?,
        fireblegate_tax = ?,
        cleaning_tax = ?,
        tree_tax = ?,
        total_tax = ?
      WHERE
        user_id = ?`;

    let insertArray = [
      +data.currentDivaTax,
      +data.currentArogyaTax,
      +data.currentEducationTax,
      +data.currentFireblegateTax,
      +data.currentCleaningTax,
      +data.currentTreeTax,
      +totalTax,
      Number(data.user_id),
    ];

    return runQuery(pool, query, insertArray);
  },

  getSamanyaKarMagniDemand: function (pool, y1, y2) {
    return new Promise((resolve, reject) => {
      //Previous query which includes year
      // /*
      var query = `SELECT 
                    ps_form_eight_user.id as anu_kramank, 
                    feu_malmattaNo,
                    feu_wardNo,
                    feu_homeNo,

                    feu_aadharNo,
                    feu_ownerName,
                    feu_secondOwnerName,
                    feu_bojaShera,

                    currentArogyaTax,
                    lastArogyaTax,
                    totalArogyaTax,

                    currentBuildingTax,
                    lastBuildingTax,
                    totalBuildingTax,
                    
                    currentDivaTax,
                    lastDivaTax,
                    totalDivaTax,

                    currentGenealWaterTax,
                    lastGenealWaterTax,
                    totalGenealWaterTax,

                    currentSpacialWaterTax,
                    lastSpacialWaterTax,
                    totalSpacialWaterTax,

                    currentEducationTax,
                    lastEducationTax,
                    totalEducationTax,

                    currentTreeTax,
                    lastTreeTax,
                    totalTreeTax,

                    currentFireblegateTax,
                    lastFireblegateTax,
                    totalFireblegateTax,

                    currentCleaningTax,
                    lastCleaningTax,
                    totalCleaningTax,

                    user_id,


                    lastTaxFine,
                    lastYearTaxFine,
                    lastTaxRelief,


                    totalSampurnaTax,
                    totalTax,
                    totalWaterTax,
                    year(ps_form_eight_user.feu_created_date) as temp_year,

                    DATE_FORMAT(fnf.created_date,"%d-%m-%Y") as c_date 
                    FROM 
                    (
                      SELECT * FROM ps_form_eight_user 
                        WHERE 
                            year(feu_created_date) >= ? 
                          AND 
                            year(feu_created_date) <= ?
                    ) 
                    ps_form_eight_user 
                    INNER JOIN 
                      ps_form_nine_form as fnf 
                    ON 
                      ps_form_eight_user.id = fnf.user_id   
                    GROUP BY fnf.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo `;

      // */

      //REmoved yearin thisquery
      var query2 = `SELECT 
                    ps_form_eight_user.id as anu_kramank, 
                    feu_malmattaNo,
                    feu_wardNo,
                    feu_homeNo,
                    feu_aadharNo,
                    feu_ownerName,
                    feu_secondOwnerName,
                    feu_bojaShera,
                    currentArogyaTax,
                    currentBuildingTax,
                    currentDivaTax,
                    currentGenealWaterTax,
                    currentSpacialWaterTax,
                    user_id,
                    lastArogyaTax,
                    lastBuildingTax,
                    lastDivaTax,
                    lastGenealWaterTax,
                    lastSpacialWaterTax,
                    lastTaxFine,
                    lastYearTaxFine,
                    lastTaxRelief,
                    totalArogyaTax,
                    totalBuildingTax,
                    totalDivaTax,
                    totalGenealWaterTax,
                    totalSampurnaTax,f
                    totalSpacialWaterTax,
                    totalTax,
                    totalWaterTax,
                    DATE_FORMAT(fnf.created_date,"%d-%m-%Y") as c_date 
                    FROM  
                    ps_form_eight_user 
                    INNER JOIN ps_form_nine_form as fnf 
                    ON ps_form_eight_user.id = fnf.user_id   
                    GROUP BY fnf.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo `;

      //With no year range
      var query3 = `SELECT 
                    ps_form_eight_user.id as anu_kramank, 
                    feu_malmattaNo,
                    feu_wardNo,
                    feu_homeNo,

                    feu_aadharNo,
                    feu_ownerName,
                    feu_secondOwnerName,
                    feu_bojaShera,

                    currentArogyaTax,
                    lastArogyaTax,
                    totalArogyaTax,

                    currentBuildingTax,
                    lastBuildingTax,
                    totalBuildingTax,
                    
                    currentDivaTax,
                    lastDivaTax,
                    totalDivaTax,

                    currentGenealWaterTax,
                    lastGenealWaterTax,
                    totalGenealWaterTax,

                    currentSpacialWaterTax,
                    lastSpacialWaterTax,
                    totalSpacialWaterTax,

                    currentEducationTax,
                    lastEducationTax,
                    totalEducationTax,

                    currentTreeTax,
                    lastTreeTax,
                    totalTreeTax,

                    currentFireblegateTax,
                    lastFireblegateTax,
                    totalFireblegateTax,

                    currentCleaningTax,
                    lastCleaningTax,
                    totalCleaningTax,

                    user_id,


                    lastTaxFine,
                    lastYearTaxFine,
                    lastTaxRelief,


                    totalSampurnaTax,
                    totalTax,
                    totalWaterTax,
                    year(ps_form_eight_user.feu_created_date) as temp_year,

                    DATE_FORMAT(fnf.created_date,"%d-%m-%Y") as c_date 
                    FROM 
                    (
                      SELECT * FROM ps_form_eight_user 
                    ) 
                    ps_form_eight_user 
                    INNER JOIN 
                      ps_form_nine_form as fnf 
                    ON 
                      ps_form_eight_user.id = fnf.user_id   
                    GROUP BY fnf.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo `;
      pool.query(query3, [y1, y2], (err, result) => {
        if (err) {
          ((responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData));
        } else {
          resolve(result);
        }
      });
    });
  },
  getForm9PagenusarPani: function (pool, y1, y2) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
              ps_form_eight_user.id as anu_kramank, 
              feu_malmattaNo,
              feu_wardNo,
              feu_homeNo,
              feu_aadharNo,
              feu_ownerName,
              feu_secondOwnerName,
              feu_bojaShera,
              currentArogyaTax,
              currentBuildingTax,
              currentDivaTax,
              currentGenealWaterTax,
              currentSpacialWaterTax,
              user_id,
              lastArogyaTax,
              lastBuildingTax,
              lastDivaTax,
              lastGenealWaterTax,
              lastSpacialWaterTax,
              lastTaxFine,
              lastYearTaxFine,
              lastTaxRelief,
              totalArogyaTax,
              totalBuildingTax,
              totalDivaTax,
              totalGenealWaterTax,
              totalSampurnaTax,
              totalSpacialWaterTax,
              totalTax,
              totalWaterTax,
              DATE_FORMAT(fnf.created_date,"%d-%m-%Y") as c_date 
              FROM ps_form_eight_user 
              INNER JOIN ps_form_nine_form as fnf 
              ON ps_form_eight_user.id = fnf.user_id   
              GROUP BY fnf.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo `;
      pool.query(query, (err, result) => {
        if (err) {
          ((responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData));
        } else {
          resolve(result);
        }
      });
    });
  },
  getForm9PagenusarSamanya: function (pool, y1, y2) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
              ps_form_eight_user.id as anu_kramank, 
              feu_malmattaNo,
              feu_wardNo,
              feu_homeNo,
              feu_aadharNo,
              feu_ownerName,
              feu_secondOwnerName,
              feu_bojaShera,
              currentArogyaTax,
              currentBuildingTax,
              currentDivaTax,
              currentGenealWaterTax,
              currentSpacialWaterTax,
              user_id,
              lastArogyaTax,
              lastBuildingTax,
              lastDivaTax,
              lastGenealWaterTax,
              lastSpacialWaterTax,
              lastTaxFine,
              lastYearTaxFine,
              lastTaxRelief,
              totalArogyaTax,
              totalBuildingTax,
              totalDivaTax,
              totalGenealWaterTax,
              totalSampurnaTax,
              totalSpacialWaterTax,
              totalTax,
              totalWaterTax,
              DATE_FORMAT(fnf.created_date,"%d-%m-%Y") as c_date 
              FROM ps_form_eight_user 
              INNER JOIN ps_form_nine_form as fnf 
              ON ps_form_eight_user.id = fnf.user_id   
              GROUP BY fnf.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo `;
      pool.query(query, (err, result) => {
        if (err) {
          ((responderSet.sendData._call = -1),
            (responderSet.sendData._error = "Op Error, Contact To Admin"),
            (responderSet.sendData._sys_erorr = err),
            reject(responderSet.sendData));
        } else {
          resolve(result);
        }
      });
    });
  },

  getMagniBillTotalPage: function (pool, y1, y2) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                      COUNT(ps_form_eight_user.id) as total_user
                    FROM (select * from ps_form_eight_user where year(feu_created_date) >= (${y1}) and year(feu_created_date) <= (${y2}) 
                    ps_form_eight_user as feu 
                    INNER JOIN 
                    ps_form_nine_form as fnf 
                    ON 
                    feu.id = fnf.user_id`;

      pool.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getTotalPrintCount: function (pool, y1, y2) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                    ps_form_eight_user.id as anu_kramank, 
                    feu_malmattaNo,
                    feu_wardNo,
                    feu_homeNo,
                    feu_aadharNo,
                    feu_ownerName,
                    feu_secondOwnerName,
                    feu_bojaShera,
                    feu_image,
                    feu_mobileNo,
                    feu_totalArea,
                    feu_totalAreaSquareMeter,      
                    currentArogyaTax,
                    currentBuildingTax,
                    currentDivaTax,
                    currentGenealWaterTax,
                    currentSpacialWaterTax,
                    user_id,
                    lastArogyaTax,
                    lastBuildingTax,
                    lastDivaTax,
                    lastGenealWaterTax,
                    lastSpacialWaterTax,
                    lastTaxFine,
                    lastYearTaxFine,
                    lastTaxRelief,
                    totalArogyaTax,
                    totalBuildingTax,
                    totalDivaTax,
                    totalGenealWaterTax,
                    totalSampurnaTax,
                    totalSpacialWaterTax,
                    totalTax,
                    totalWaterTax,
                    DATE_FORMAT(ps_form_nine_form.created_date,'%d-%m-%Y') as c_date 
                  FROM ps_form_eight_user 
                    INNER JOIN 
                  ps_form_nine_form 
                    ON 
                  ps_form_eight_user.id = ps_form_nine_form.user_id   
                GROUP BY ps_form_nine_form.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo`;

      pool.query(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getSamanyaPrintData2: function (pool, y1, y2, p, tp) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                      ps_form_eight_user.id as anu_kramank, 
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_image,
                      feu_mobileNo,
                      feu_totalArea,
                      feu_totalAreaSquareMeter,      
                      currentArogyaTax,
                      currentBuildingTax,
                      currentDivaTax,
                      currentGenealWaterTax,
                      currentSpacialWaterTax,
                      user_id,
                      lastArogyaTax,
                      lastBuildingTax,
                      lastDivaTax,
                      lastGenealWaterTax,
                      lastSpacialWaterTax,
                      lastTaxFine,
                      lastYearTaxFine,
                      lastTaxRelief,
                      totalArogyaTax,
                      totalBuildingTax,
                      totalDivaTax,
                      totalGenealWaterTax,
                      totalSampurnaTax,
                      totalSpacialWaterTax,
                      totalTax,
                      totalWaterTax,
                      DATE_FORMAT(ps_form_nine_form.created_date,"%d-%m-%Y") as c_date 
                    FROM (select * from ps_form_eight_user where year(feu_created_date) >= (${y1}) and year(feu_created_date) <= (${y2})) ps_form_eight_user 
                      INNER JOIN 
                    ps_form_nine_form 
                      ON 
                    ps_form_eight_user.id = ps_form_nine_form.user_id   
              GROUP BY ps_form_nine_form.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo`;

      pool.query(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getSamanyaPrintData: (pool, y1, y2, p, tp) => {
    let q;
    if (!p) {
      q = `SELECT 
                      ps_form_eight_user.id as anu_kramank, 
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_image,
                      feu_mobileNo,
                      feu_totalArea,
                      feu_totalAreaSquareMeter,      
                      currentArogyaTax,
                      currentBuildingTax,
                      currentDivaTax,
                      currentGenealWaterTax,
                      currentSpacialWaterTax,
                      user_id,
                      lastArogyaTax,
                      lastBuildingTax,
                      lastDivaTax,
                      lastGenealWaterTax,
                      lastSpacialWaterTax,
                      lastTaxFine,
                      lastYearTaxFine,
                      lastTaxRelief,
                      totalArogyaTax,
                      totalBuildingTax,
                      totalDivaTax,
                      totalGenealWaterTax,
                      totalSampurnaTax,
                      totalSpacialWaterTax,
                      totalTax,
                      lastCleaningTax,
                      currentCleaningTax,
                      totalCleaningTax,

                      lastFireblegateTax,
                      currentFireblegateTax,
                      totalFireblegateTax,

                      lastTreeTax,
                      currentTreeTax,
                      totalTreeTax,

                      lastEducationTax,
                      currentEducationTax,
                      totalEducationTax,
                      
                      totalWaterTax,
                      DATE_FORMAT(ps_form_nine_form.created_date,'%d-%m-%Y') as c_date 
                    FROM ps_form_eight_user 
                      INNER JOIN 
                    ps_form_nine_form 
                      ON 
                    ps_form_eight_user.id = ps_form_nine_form.user_id   
              GROUP BY ps_form_nine_form.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo `;
    } else {
      q = `SELECT 
                      ps_form_eight_user.id as anu_kramank, 
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_image,
                      feu_mobileNo,
                      feu_totalArea,
                      feu_totalAreaSquareMeter,      
                      currentArogyaTax,
                      currentBuildingTax,
                      currentDivaTax,
                      currentGenealWaterTax,
                      currentSpacialWaterTax,
                      user_id,
                      lastArogyaTax,
                      lastBuildingTax,
                      lastDivaTax,
                      lastGenealWaterTax,
                      lastSpacialWaterTax,
                      lastTaxFine,
                      lastYearTaxFine,
                      lastTaxRelief,
                      totalArogyaTax,
                      totalBuildingTax,
                      totalDivaTax,
                      totalGenealWaterTax,
                      totalSampurnaTax,
                      totalSpacialWaterTax,
                      lastCleaningTax,
                      currentCleaningTax,
                      totalCleaningTax,

                      lastFireblegateTax,
                      currentFireblegateTax,
                      totalFireblegateTax,

                      lastTreeTax,
                      currentTreeTax,
                      totalTreeTax,

                        lastEducationTax,
                      currentEducationTax,
                      totalEducationTax,

                      totalTax,
                      totalWaterTax,
           
                      DATE_FORMAT(ps_form_nine_form.created_date,'%d-%m-%Y') as c_date 
                    FROM ps_form_eight_user 
                      INNER JOIN 
                    ps_form_nine_form 
                      ON 
                    ps_form_eight_user.id = ps_form_nine_form.user_id   
              GROUP BY ps_form_nine_form.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo LIMIT ${
                p ? p * tp : 0
              }, ${tp ? tp : 1000}`;
    }

    return runQuery(pool, q);
  },

  getSamanyaPrintDataNew: function (pool, y1, y2, p, tp) {
    return new Promise((resolve, reject) => {
      let query;
      if (!p) {
        query = `SELECT 
                      ps_form_eight_user.id as anu_kramank, 
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_image,
                      feu_mobileNo,
                      feu_totalArea,
                      feu_totalAreaSquareMeter,      
                      currentArogyaTax,
                      currentBuildingTax,
                      currentDivaTax,
                      currentGenealWaterTax,
                      currentSpacialWaterTax,
                      user_id,
                      lastArogyaTax,
                      lastBuildingTax,
                      lastDivaTax,
                      lastGenealWaterTax,
                      lastSpacialWaterTax,
                      lastTaxFine,
                      lastYearTaxFine,
                      lastTaxRelief,
                      totalArogyaTax,
                      totalBuildingTax,
                      totalDivaTax,
                      totalGenealWaterTax,
                      totalSampurnaTax,
                      totalSpacialWaterTax,
                      totalTax,
                      totalWaterTax,

                      lastEducationTax,
                      currentEducationTax,
                      totalEducationTax,

                      lastFireblegateTax,
                      currentFireblegateTax,
                      totalFireblegateTax,

                      lastCleaningTax,
                      currentCleaningTax,
                      totalCleaningTax,

                      lastTreeTax,
                      currentTreeTax,
                      totalTreeTax,

                      DATE_FORMAT(ps_form_nine_form.created_date,"%d-%m-%Y") as c_date 
                    FROM ps_form_eight_user 
                      INNER JOIN 
                    ps_form_nine_form 
                      ON 
                    ps_form_eight_user.id = ps_form_nine_form.user_id   
              GROUP BY ps_form_nine_form.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo `;
      } else {
        query = `SELECT 
                      ps_form_eight_user.id as anu_kramank, 
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_image,
                      feu_mobileNo,
                      feu_totalArea,
                      feu_totalAreaSquareMeter,      
                      currentArogyaTax,
                      currentBuildingTax,
                      currentDivaTax,
                      currentGenealWaterTax,
                      currentSpacialWaterTax,
                      user_id,
                      lastArogyaTax,
                      lastBuildingTax,
                      lastDivaTax,
                      lastGenealWaterTax,
                      lastSpacialWaterTax,
                      lastTaxFine,
                      lastYearTaxFine,
                      lastTaxRelief,
                      totalArogyaTax,
                      totalBuildingTax,
                      totalDivaTax,
                      totalGenealWaterTax,
                      totalSampurnaTax,
                      totalSpacialWaterTax,
                      totalTax,
                      totalWaterTax,

                      lastEducationTax,
                      currentEducationTax,
                      totalEducationTax,

                      lastFireblegateTax,
                      currentFireblegateTax,
                      totalFireblegateTax,

                      lastCleaningTax,
                      currentCleaningTax,
                      totalCleaningTax,

                      lastTreeTax,
                      currentTreeTax,
                      totalTreeTax,

                      DATE_FORMAT(ps_form_nine_form.created_date,"%d-%m-%Y") as c_date 
                    FROM ps_form_eight_user 
                      INNER JOIN 
                    ps_form_nine_form 
                      ON 
                    ps_form_eight_user.id = ps_form_nine_form.user_id   
              GROUP BY ps_form_nine_form.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo LIMIT ${
                p ? p * tp : 0
              }, ${tp ? tp : 1000}`;
      }

      pool.query(query, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getMahniLekhPrintData: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                      feu.id as anu_kramank, 
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_gramPanchayet,
                      feu_villageName,
                      SUM(totalSampurnaTax + totalWaterTax) as total_tax,
                      DATE_FORMAT(fnf.created_date,"%d-%m-%Y") as c_date 
                    FROM ps_form_eight_user as feu INNER JOIN 
                    ps_form_nine_form as fnf ON 
                    feu.id = fnf.user_id 
                  WHERE addToMagniLekh = 1 GROUP BY fnf.user_id ORDER BY CAST(feu_malmattaNo as UNSIGNED) ASC, feu_malmattaNo`;
      pool.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getNalBandNoticePrintData: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                      feu.id as anu_kramank, 
                      feu_malmattaNo,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
                      feu_bojaShera,
                      feu_gramPanchayet,
                      feu_villageName,
                      SUM(totalSampurnaTax + totalWaterTax) as total_tax,
                      totalWaterTax,
                      DATE_FORMAT(fnf.created_date,"%d-%m-%Y") as c_date 
                    FROM ps_form_eight_user as feu INNER JOIN 
                    ps_form_nine_form as fnf 
                    ON feu.id = fnf.user_id 
                  WHERE addNalBandNotice = 1 GROUP BY fnf.user_id`;
      pool.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  getFormNineYearSummery: function (pool, y1, y2) {
    return new Promise((resolve, reject) => {
      var query = `SELECT 
                      IFNULL(SUM(lastBuildingTax),0) as lastBuildingTax,
                      IFNULL(SUM(currentBuildingTax),0) as currentBuildingTax,
                      IFNULL(SUM(totalBuildingTax),0) as totalBuildingTax,
                      IFNULL(SUM(lastDivaTax),0) as lastDivaTax,
                      IFNULL(SUM(currentDivaTax),0) as currentDivaTax,
                      IFNULL(SUM(totalDivaTax),0) as totalDivaTax,
                      IFNULL(SUM(lastArogyaTax),0) as lastArogyaTax,
                      IFNULL(SUM(currentArogyaTax),0) as currentArogyaTax,
                      IFNULL(SUM(totalArogyaTax),0) as totalArogyaTax,
                      IFNULL(SUM(lastTaxFine),0) as lastTaxFine,
                      IFNULL(SUM(lastTaxRelief),0) as lastTaxRelief,
                      IFNULL(SUM(lastYearTaxFine),0) as lastYearTaxFine,
                      IFNULL(SUM(totalTax),0) as totalTax,
                      IFNULL(SUM(totalSampurnaTax),0) as totalSampurnaTax,
                      IFNULL(SUM(lastSpacialWaterTax),0) as lastSpacialWaterTax,
                      IFNULL(SUM(currentSpacialWaterTax),0) as currentSpacialWaterTax,
                      IFNULL(SUM(totalSpacialWaterTax),0) as totalSpacialWaterTax,
                      IFNULL(SUM(lastGenealWaterTax),0) as lastGenealWaterTax,
                      IFNULL(SUM(currentGenealWaterTax),0) as currentGenealWaterTax,
                      IFNULL(SUM(totalGenealWaterTax),0) as totalGenealWaterTax,
                      IFNULL(SUM(totalWaterTax),0) as totalWaterTax
                      FROM  ps_form_nine_form  WHERE created_date >= ? AND  created_date <= ?`;
      pool.query(query, [y1, y2], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
  selectGramPanchayet: function (pool) {
    return new Promise((resolve, reject) => {
      var query = `SELECT * FROM ps_gram_panchayet`;
      pool.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
};
