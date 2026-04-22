var responderSet = require('../config/_responderSet');
const { runQuery } = require('../utils/runQuery');
let myDates = responderSet.myDate;

module.exports = {


    getDistinctMalmattaCountExcludingOblique: (pool) => {

        let q = `SELECT COUNT(DISTINCT SUBSTRING_INDEX(ps_form_eight_user.feu_malmattaNo, '/', 1)) AS distinct_malmatta_count
                FROM 
                    ps_form_eight_user
                            INNER JOIN ps_gharkul_yojna 
                        ON ps_form_eight_user.feu_gharkulYojna = ps_gharkul_yojna.id
                            INNER JOIN ps_form_eight_total_taxation 
                        ON ps_form_eight_user.id = ps_form_eight_total_taxation.user_id;`

        return runQuery(pool, q);
    },

    printForm8All: function (pool, y1, y2) {
        return new Promise((resolve, reject) => {
            let query = `SELECT 
                  ps_form_eight_user.feu_malmattaNo,
                  ps_form_eight_user.feu_homeNo,
                  ps_form_eight_user.feu_ownerName,
                  ps_form_eight_user.feu_secondOwnerName,
                  ps_form_eight_user.feu_mobileNo,
                  ps_form_eight_user.feu_aadharNo,
                  ps_form_eight_user.feu_havingToilet,
                  ps_form_eight_user.feu_water_tax,
                  ps_form_eight_user.feu_totalArea,
                  ps_form_eight_user.feu_totalAreaSquareMeter,

                  ps_gharkul_yojna.gy_name,
                  ps_form_eight_total_taxation.total_building_work,
                  ps_form_eight_total_taxation.other_tex,
                  ps_form_eight_total_taxation.total_open_plot,
                  ps_form_eight_total_taxation.building_tax,
                  ps_form_eight_total_taxation.open_area_tax,
                  ps_form_eight_total_taxation.dava_kar,
                  ps_form_eight_total_taxation.arogya_kar,
                  ps_form_eight_total_taxation.total_tax,
                  ps_form_eight_total_taxation.total_building_work,
                  ps_form_eight_total_taxation.cleaning_tax,
                  ps_form_eight_total_taxation.tree_tax,
                  ps_form_eight_total_taxation.fireblegate_tax,
                  ps_form_eight_total_taxation.education_tax,
                  ps_gharkul_yojna.gy_name as graha_yojana
                FROM 
                  ps_form_eight_user 
                INNER JOIN ps_gharkul_yojna 
                ON 
                  ps_form_eight_user.feu_gharkulYojna 
                  = ps_gharkul_yojna.id
                INNER JOIN 
                  ps_form_eight_total_taxation 
                ON 
                  ps_form_eight_user.id 
                  = ps_form_eight_total_taxation.user_id
               
                ORDER BY 
                    CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL),
                    IF(LOCATE('/', feu_malmattaNo), 
                      CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL), 
                      NULL) ASC`;

            //    ORDER BY CAST(feu_malmattaNo AS DECIMAL)`;

            pool.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    allForm8Users: (pool, sortBy) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT * 
                    FROM ps_form_eight_user 
                    ORDER BY
                    ${sortBy == 'malmatta' ? `CAST(feu_malmattaNo AS DECIMAL)` : 'feu_ownerName'}`;

            pool.query(q, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    formEightUser: function (pool, data) {
        return new Promise((resolve, reject) => {
            var query = `SELECT 
                      id,
                      feu_malmattaNo,
                      feu_oblik_malmatta_id,
                      feu_wardNo,
                      feu_homeNo,
                      feu_aadharNo,
                      feu_ownerName,
                      feu_secondOwnerName,
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
                      feu_northLandmark
                    FROM ps_form_eight_user WHERE id = ?`;

            console.log('data id = ', data.id)
            pool.query(query, [Number(data.id)], (err, result) => {
                if (err) {
                    (responderSet.sendData._call = -1),
                        (responderSet.sendData._error = 'Op Error, Contact To Admin'),
                        (responderSet.sendData._sys_erorr = err),
                        reject(responderSet.sendData);
                } else {
                    resolve(result);
                }
            });
        });
    },

    // सामान्य -------------------------------

    getSingleTaxPayerSamanya: function (pool, id) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * , DATE_FORMAT(tpl_bharnaDate,'%d-%m-%Y') as myDate FROM ps_tax_payer_list_samanya WHERE id = ? LIMIT 1`;
            pool.query(query, [Number(id)], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    // get monthwise
    getMonthwiseTaxPayerSamanya: (pool, { month, year }) => {
        // console.log('Fetching month-wise data...');
        return new Promise((resolve, reject) => {
            const q = `
                SELECT u8f.feu_ownerName, u8f.feu_malmattaNo, u8f.feu_secondOwnerName, ps_tpls.*, 
                DATE_FORMAT(tpl_bharnaDate, '%d-%m-%Y') as myDate
                FROM ps_tax_payer_list_samanya AS ps_tpls
                LEFT JOIN ps_form_eight_user AS u8f
                ON ps_tpls.user_id = u8f.id
                WHERE MONTH(tpl_bharnaDate) = ? AND YEAR(tpl_bharnaDate) = ?
                ORDER BY tpl_bharnaDate ASC
            `;

            pool.query(q, [month, year], (err, result) => {
                if (err) {
                    reject(err);  // Reject on error
                } else {
                    resolve(result);  // Resolve on success
                }
            });
        });
    },


    // all records
    // start year means starting finalncial year and end year aslo means like that

    // i.e. 1 April 2023 to 31 March 2024, where startYear = 2023 & endYear = 2024
    getAllTaxPayerSamanya: (pool, { startYear, endYear }) => {

        return new Promise((resolve, reject) => {
            const query = `
                            SELECT u8f.feu_ownerName,  
                                   u8f.feu_malmattaNo, 
                                   u8f.feu_secondOwnerName, 
                                   ps_tpls.*,  
                                   DATE_FORMAT(tpl_bharnaDate, '%d-%m-%Y') AS myDate
                            FROM ps_tax_payer_list_samanya AS ps_tpls
                            LEFT JOIN ps_form_eight_user AS u8f
                                ON ps_tpls.user_id = u8f.id
                            WHERE (MONTH(tpl_bharnaDate) >= 4 AND YEAR(tpl_bharnaDate) = ?)
                                OR
                                    (MONTH(tpl_bharnaDate) <= 3 AND YEAR(tpl_bharnaDate) = ?)
                            ORDER BY STR_TO_DATE(tpl_bharnaDate, '%Y-%m-%d') ASC;
                        `;


            pool.query(query, [startYear, endYear], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },


    // -------------------------------



    // here starts for water------------------------

    getSingleTaxPayerPani: function (pool, id) {
        return new Promise((resolve, reject) => {
            var query = `SELECT *, IFNULL(DATE_FORMAT(tpl_bharnaDate, "%d-%m-%Y"), '') as _tpl_bharnaDate FROM ps_tax_payer_list_pani WHERE id = ? LIMIT 1`;
            pool.query(query, [Number(id)], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },



    // get monthwise
    getMonthwiseTaxPayerPani: (pool, { month, year }) => {
        // console.log('Fetching month-wise data...');
        return new Promise((resolve, reject) => {
            const q = `
                SELECT u8f.feu_ownerName, u8f.feu_malmattaNo, u8f.feu_secondOwnerName, ps_tplp.*, 
                DATE_FORMAT(tpl_bharnaDate, '%d-%m-%Y') as myDate
                FROM ps_tax_payer_list_pani AS ps_tplp
                LEFT JOIN ps_form_eight_user AS u8f
                ON ps_tplp.user_id = u8f.id
                WHERE MONTH(tpl_bharnaDate) = ? AND YEAR(tpl_bharnaDate) = ?
                ORDER BY tpl_bharnaDate ASC
            `;

            pool.query(q, [month, year], (err, result) => {
                if (err) {
                    reject(err);  // Reject on error
                } else {
                    resolve(result);  // Resolve on success
                }
            });
        });
    },


    // all records
    // start year means starting finalncial year and end year aslo means like that

    // i.e. 1 April 2023 to 31 March 2024, where startYear = 2023 & endYear = 2024
    getAllTaxPayerPani: (pool, { startYear, endYear }) => {

        return new Promise((resolve, reject) => {
            const query = `
                            SELECT u8f.feu_ownerName,  
                                   u8f.feu_malmattaNo, 
                                   u8f.feu_secondOwnerName, 
                                   ps_tplp.*,  
                                   DATE_FORMAT(tpl_bharnaDate, '%d-%m-%Y') AS myDate
                            FROM ps_tax_payer_list_pani AS ps_tplp
                            LEFT JOIN ps_form_eight_user AS u8f
                                ON ps_tplp.user_id = u8f.id
                            WHERE (MONTH(tpl_bharnaDate) >= 4 AND YEAR(tpl_bharnaDate) = ?)
                                OR
                                    (MONTH(tpl_bharnaDate) <= 3 AND YEAR(tpl_bharnaDate) = ?)
                            ORDER BY STR_TO_DATE(tpl_bharnaDate, '%Y-%m-%d') ASC;`;


            pool.query(query, [startYear, endYear], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },


    // --------------------------------------------------------

    getMeterPrintDetails: function (pool, valveNumber, fromDate, toDate) {
        return new Promise((resolve, reject) => {
            const qWithValveNumber = `
            SELECT 
                id as id,
                user_id,
                mbl_nal_number, 
                mbl_deyak_number as mbl_deyak_number, 
                DATE_FORMAT(mbl_deyak_date,'%d-%m-%Y') as _mbl_deyak_date, 
                mbl_amt_before_mudat as mbl_amt_before_mudat, 
                DATE_FORMAT(mbl_deyak_amt_fill_last_date,'%d-%m-%Y') as mbl_deyak_amt_fill_last_date, 
                mbl_ward_number as mbl_ward_number, 
                mbl_user_meter_number as mbl_user_meter_number, 
                mbl_user_number as mbl_user_number, 
                mbl_nal_usage_type as mbl_nal_usage_type, 
                mbl_user_name as mbl_user_name, 
                mbl_user_mobile_no as mbl_user_mobile_no, 
                mbl_water_unit as mbl_water_unit, 

                mbl_water_usage_from as mbl_water_usage_from, 
                mbl_total_water_usage as mbl_total_water_usage, 
                mbl_meter_reading_start as mbl_meter_reading_start, 
                mbl_meter_reading_end as mbl_meter_reading_end, 
                mbl_total_unit as mbl_total_unit, 
                mbl_rate as mbl_rate, 
                mbl_water_amt as mbl_water_amt, 
                mbl_last_backlock as mbl_last_backlock, 
                mbl_final_total_amt as mbl_final_total_amt, 
                mbl_before_date_amt_to_fill as mbl_before_date_amt_to_fill, 
                mbl_after_date_amt_to_fill as mbl_after_date_amt_to_fill, 
                DATE_FORMAT(mbl_amt_diposite_till_date,'%d-%m-%Y') as mbl_amt_diposite_till_date, 
                mbl_valve_number as mbl_valve_number,

                DATE_FORMAT(mbl_water_usage_from, '%Y-%m-%d') AS _mbl_water_usage_from_full,
                DATE_FORMAT(mbl_water_usage_to, '%Y-%m-%d') AS _mbl_water_usage_to_full,

                mbl_meter_image  

            FROM 
                ps_meter_bill_list 
            WHERE 
            MONTH(mbl_water_usage_from) = ?
            AND 
            YEAR(mbl_water_usage_from) = ?
            AND 
            MONTH(mbl_water_usage_to) = ?
            AND 
            YEAR(mbl_water_usage_to) = ?
            AND 
            mbl_valve_number = ?
            ORDER BY 
                
                CAST(SUBSTRING_INDEX(mbl_nal_number, '/', 1) AS DECIMAL),
                IF(LOCATE('/', mbl_nal_number), 
                  CAST(SUBSTRING_INDEX(mbl_nal_number, '/', -1) AS DECIMAL), 
                  NULL) ,
                mbl_water_usage_from ASC, 
                mbl_water_usage_to ASC;
        `;

            const qWithoutValveNumber = `
            SELECT 
                id as id,
                user_id,
                mbl_nal_number, 
                mbl_deyak_number as mbl_deyak_number, 
                DATE_FORMAT(mbl_deyak_date,'%d-%m-%Y') as _mbl_deyak_date, 
                mbl_amt_before_mudat as mbl_amt_before_mudat, 
                DATE_FORMAT(mbl_deyak_amt_fill_last_date,'%d-%m-%Y') as mbl_deyak_amt_fill_last_date, 
                mbl_ward_number as mbl_ward_number, 
                mbl_user_meter_number as mbl_user_meter_number, 
                mbl_user_number as mbl_user_number, 
                mbl_nal_usage_type as mbl_nal_usage_type, 
                mbl_user_name as mbl_user_name, 
                mbl_user_mobile_no as mbl_user_mobile_no, 
                mbl_water_unit as mbl_water_unit, 

                mbl_water_usage_from as mbl_water_usage_from, 
                mbl_total_water_usage as mbl_total_water_usage, 
                mbl_meter_reading_start as mbl_meter_reading_start, 
                mbl_meter_reading_end as mbl_meter_reading_end, 
                mbl_total_unit as mbl_total_unit, 
                mbl_rate as mbl_rate, 
                mbl_water_amt as mbl_water_amt, 
                mbl_last_backlock as mbl_last_backlock, 
                mbl_final_total_amt as mbl_final_total_amt, 
                mbl_before_date_amt_to_fill as mbl_before_date_amt_to_fill, 
                mbl_after_date_amt_to_fill as mbl_after_date_amt_to_fill, 
                DATE_FORMAT(mbl_amt_diposite_till_date,'%d-%m-%Y') as mbl_amt_diposite_till_date, 
                mbl_valve_number as mbl_valve_number,

                DATE_FORMAT(mbl_water_usage_from, '%Y-%m-%d') AS _mbl_water_usage_from_full,
                DATE_FORMAT(mbl_water_usage_to, '%Y-%m-%d') AS _mbl_water_usage_to_full,

                mbl_meter_image  

            FROM 
                ps_meter_bill_list 
            WHERE 
                MONTH(mbl_water_usage_from) = ?
                AND 
                YEAR(mbl_water_usage_from) = ?
                AND 
                MONTH(mbl_water_usage_to) = ?
                AND 
                YEAR(mbl_water_usage_to) = ?
            ORDER BY 
              
                CAST(SUBSTRING_INDEX(mbl_nal_number, '/', 1) AS DECIMAL),
                IF(LOCATE('/', mbl_nal_number), 
                  CAST(SUBSTRING_INDEX(mbl_nal_number, '/', -1) AS DECIMAL), 
                  NULL) ,
                mbl_water_usage_from ASC, 
                mbl_water_usage_to ASC;
        `;

            const query = valveNumber ? qWithValveNumber : qWithoutValveNumber;

            const _from = fromDate.split('/');
            const _to = toDate.split('/');
            console.log(_from);
            pool.query(
                query,
                [+_from[0], +_from[1], +_to[0], _to[1], valveNumber],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    },

    getMeterRate: function (pool) {
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM ps_meter_rates`;
            pool.query(query, function (error, result) {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },
    getAllUserMeterPrintDetails: function (pool, usageFrom, usageTo) {
        return new Promise((resolve, reject) => {
            var query = `SELECT 
                    id as id,
                    user_id,
                    mbl_valve_number,
                    mbl_nal_number,
                    mbl_user_name,
                    mbl_nal_usage_type,
                    mbl_meter_reading_end,
                    mbl_last_backlock,
                    mbl_water_amt,
                    mbl_final_total_amt,
                    mbl_after_date_amt_to_fill,
                    mbl_rate,
                    mbl_meter_reading_start,
                    mbl_total_unit,

                  DATE_FORMAT(mbl_water_usage_from, '%Y-%m-%d') AS _mbl_water_usage_from_full,
                  DATE_FORMAT(mbl_water_usage_to, '%Y-%m-%d') AS _mbl_water_usage_to_full
                  FROM 
                    ps_meter_bill_list 
                  WHERE
                    DATE_FORMAT(mbl_water_usage_from, '%m/%Y') LIKE ? AND
                    DATE_FORMAT(mbl_water_usage_to, '%m/%Y') LIKE ?
                  ORDER BY 
                    CAST(SUBSTRING_INDEX(mbl_nal_number, '/', 1) AS DECIMAL),
                    IF(LOCATE('/', mbl_nal_number), 
                      CAST(SUBSTRING_INDEX(mbl_nal_number, '/', -1) AS DECIMAL), 
                      NULL) ASC`;
            pool.query(query, [usageFrom, usageTo], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getPaymentDetails: function (pool, reciptNo) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM ps_payment_information WHERE id=?`;
            pool.query(query, reciptNo, function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },
};
