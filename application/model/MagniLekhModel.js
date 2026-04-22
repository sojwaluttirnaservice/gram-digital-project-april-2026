var responderSet = require('../config/_responderSet');
let myDates = responderSet.myDate;

module.exports = {
    getMagnilekhLsit: function (pool) {
        return new Promise((resolve, reject) => {
            var query = `SELECT
                        feu.id as id,
                        fnf.id as tax_id,
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
                        totalSampurnaTax,
                        totalWaterTax
                    FROM 
                        ps_form_nine_form as fnf 
                    INNER JOIN 
                        ps_form_eight_user as feu 
                    ON 
                        feu.id = fnf.user_id
                    WHERE
                        addToMagniLekh = 1`;

            pool.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getSingleMagniList: function (pool, data) {
        return new Promise((resolve, reject) => {
            var query = `SELECT
                        feu.id as id,
                        fnf.id as tax_id,
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
                        totalSampurnaTax,
                        totalWaterTax,
                        SUM(totalSampurnaTax + totalWaterTax) as totalTax
                    FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                        WHERE 
                          fnf.user_id = ? AND addToMagniLekh = 0
                        `;
            pool.query(query, [Number(data.id)], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    getMagniLekhEntries: (pool, conditions) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT
                        feu.id as id,
                        feu.feu_aadharNo,
                        fnf.id as tax_id,
                        fnf.user_id,
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
                        totalSampurnaTax,
                        totalWaterTax,
                        totalSampurnaTax + totalWaterTax  as totalTax
                    FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                        WHERE 
                           addToMagniLekh = 0 ${conditions ? 'AND (totalSampurnaTax + totalWaterTax) BETWEEN ? AND ?' : ''}`;

            const dataArr = [];
            if (conditions) {
                dataArr.push(conditions.minAmount);
                dataArr.push(conditions.maxAmount);
            }
            pool.query(q, dataArr, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getSingleMagniListAutocomplete: function (pool, data) {
        return new Promise((resolve, reject) => {
            switch (Number(data.sType)) {
                case 1:
                    var query = `SELECT 
                        feu.id as id ,
                        feu_ownerName as label
                        FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                        WHERE 
                        feu_ownerName LIKE ? AND addToMagniLekh = 0  LIMIT 10
                      `;
                    var d = [data.q] + '%';
                    break;
                case 2:
                    var query = `SELECT 
                        feu.id as id ,
                        feu_malmattaNo as label
                        FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                        WHERE 
                        feu_malmattaNo LIKE ? AND addToMagniLekh = 0  LIMIT 10
                      `;
                    var d = [data.q] + '%';
                    break;
                default:
                    var query = `SELECT 
                              feu.id as id ,
                              feu.id as label
                        FROM 
                            ps_form_nine_form as fnf INNER JOIN 
                            ps_form_eight_user as feu ON 
                            feu.id = fnf.user_id
                        WHERE 
                            feu.id = ? AND addToMagniLekh = 0  LIMIT 10
                        `;
                    var d = [Number(data.q)];
                    break;
            }

            pool.query(query, d, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    removeFromMagniLekh: function (pool, id) {
        return new Promise((resolve, reject) => {
            var insert_array = [];
            var query = `UPDATE ps_form_nine_form SET
                    addToMagniLekh = 0
                    WHERE id = ?`;
            pool.query(query, id, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    addMagniLekh: function (pool, data) {
        return new Promise((resolve, reject) => {
            var insert_array = [];
            var query = `UPDATE ps_form_nine_form SET
                    addToMagniLekh = 1,
                    magni_lekh_date = ?
                    WHERE user_id = ?`;

            pool.query(query, [myDates.getDate(), Number(data.user_id)], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    addMagniLekhBulk: function (pool, data) {
        return new Promise((resolve, reject) => {
            let userIds = data.map((item) => item.user_id); // Extract user IDs
            let placeholders = userIds.map(() => '?').join(', '); // Create placeholders for user IDs

            // Dynamic date value to be applied
            const magniLekhDate = new Date(); // Replace with your `myDates.getDate()` if needed

            let q = `
            UPDATE ps_form_nine_form
            SET 
            addToMagniLekh = 1,
            magni_lekh_date = ? 
            WHERE 
            user_id IN (${placeholders})
            `;

            let params = [magniLekhDate, ...userIds];
            pool.query(q, params, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getNalBandList: function (pool) {
        return new Promise((resolve, reject) => {
            var query = `SELECT
                        feu.id as id,
                        fnf.id as tax_id,
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
                        totalSampurnaTax,
                        totalWaterTax
                    FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                    WHERE
                      addNalBandNotice = 1
                        `;

            pool.query(query, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getSingleNalBandList: function (pool, data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            var query = `SELECT
                        feu.id as id,
                        fnf.id as tax_id,
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
                        totalSampurnaTax, 
                        totalWaterTax,
                        totalSampurnaTax + totalWaterTax AS totalTax
                    FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                        WHERE 
                          fnf.user_id = ?
                        `;
            // fnf.user_id = ? AND addNalBandNotice = 0
            pool.query(query, [data.id], (error, result) => {
                if (error) {
                    // console.log('Errrror', error);
                    reject(error);
                } else {
                    // console.log('resolveing', result)
                    resolve(result);
                }
            });
        });
    },
    getSingleNalBandListAutocomplete: function (pool, data) {
        return new Promise((resolve, reject) => {
            switch (Number(data.sType)) {
                case 1:
                    var query = `SELECT 
                        feu.id as id ,
                        feu_ownerName as label
                        FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                        WHERE 
                        feu_ownerName LIKE ? AND addNalBandNotice = 0  LIMIT 10
                      `;
                    var d = [data.q] + '%';
                    break;
                case 2:
                    var query = `SELECT 
                        feu.id as id ,
                        feu_malmattaNo as label
                        FROM 
                        ps_form_nine_form as fnf INNER JOIN 
                        ps_form_eight_user as feu ON 
                        feu.id = fnf.user_id
                        WHERE 
                        feu_malmattaNo LIKE ? AND addNalBandNotice = 0  LIMIT 10
                      `;
                    var d = [data.q] + '%';
                    break;
                default:
                    var query = `SELECT 
                              feu.id as id ,
                              feu.id as label
                        FROM 
                            ps_form_nine_form as fnf INNER JOIN 
                            ps_form_eight_user as feu ON 
                            feu.id = fnf.user_id
                        WHERE 
                            feu.id = ? AND addNalBandNotice = 0  LIMIT 10
                        `;
                    var d = [Number(data.q)];
                    break;
            }

            pool.query(query, d, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    removeFromNalBandList: function (pool, data) {
        return new Promise((resolve, reject) => {
            var insert_array = [];
            var query = `UPDATE ps_form_nine_form SET addNalBandNotice = 0  WHERE id = ?`;
            pool.query(query, [Number(data.id)], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
    addNalBandUser: function (pool, data) {
        return new Promise((resolve, reject) => {
            var insert_array = [];
            var query = `UPDATE ps_form_nine_form SET
                    addNalBandNotice = 1,
                    nal_band_notice_date = ?
                    WHERE user_id = ?`;

            pool.query(query, [myDates.getDate(), Number(data.user_id)], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },
};
