var responderSet = require('../config/_responderSet');
const { runQuery } = require('../utils/runQuery');
let myDates = responderSet.myDate;

function safeNumber(value) {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
}

module.exports = {
    getMainList: (pool) => {
        let q = `SELECT *  FROM  ps_tax_payer_list_samanya ORDER BY id DESC LIMIT 10 `;
        return runQuery(pool, q);
    },

    // Writing two functions for getting the list of tax paymens

    // First function for samanya list
    getSamanyaKarBharanaList: (pool) => {
        let q = `SELECT *, tax_samanya.id AS samanya_tax_list_id,
            IF(
                tpl_bharnaDate = '0000-00-00', 
                'Invalid Date', 
                IFNULL(DATE_FORMAT(tpl_bharnaDate, '%d-%m-%Y'), '-')
            ) AS _tpl_bharnaDate
            FROM 
        
            ps_tax_payer_list_samanya AS  tax_samanya
            
            INNER JOIN
            
            ps_form_eight_user AS f8User
            
            ON tax_samanya.user_id = f8User.id
    
                order by tax_samanya.id DESC`;
        
        return runQuery(pool, q);
    },

    // second function for getting the water list

    getPaniKarBharanaList: (pool) => {
        let q = `SELECT *, tax_pani.id AS pani_tax_list_id,
            IF(
                tpl_bharnaDate = '0000-00-00', 
                'Invalid Date', 
                IFNULL(DATE_FORMAT(tpl_bharnaDate, '%d-%m-%Y'), '-')
            ) AS _tpl_bharnaDate
            FROM 
        
            ps_tax_payer_list_pani AS  tax_pani
            
            INNER JOIN
            
            ps_form_eight_user AS f8User
            
            ON tax_pani.user_id = f8User.id
    
                order by tax_pani.id DESC`;
            
        return runQuery(pool, q);
    },

    saveNewTaxVasuliDetails: (pool, newSamanyaVasuliData) => {
        const q = `INSERT INTO 
                ps_tax_payer_list_samanya
                    (
                        form_nine_id,
                        user_id,

                        tpl_lastBuildingTax,
                        tpl_currentBuildingTax,
                        tpl_lastDivaTax,
                        tpl_currentDivaTax,	
                        tpl_lastArogyaTax,	
                        tpl_currentArogyaTax,

                        tpl_lastCleaningTax,
                        tpl_currentCleaningTax,
                        tpl_lastFireblegateTax,   
                        tpl_currentFireblegateTax,
                        tpl_lastTreeTax,          
                        tpl_currentTreeTax,       
                        tpl_lastEducationTax,     
                        tpl_currentEducationTax,  

                        tpl_lastTaxFine,	
                        tpl_lastTaxRelief,
                        tpl_totalSampurnaTax,
                        tpl_bharnaDate,
                        tpl_amountInWords,
                        payment_id,
                        order_id,
                        mobile,
                        checkNo, 
                        created_date,
                        ps_payment_information_id_fk,
                        ps_payment_receipt_samanya_id_fk
                    )
                        VALUES 
                    (?)`;

        let insertArr = [
            newSamanyaVasuliData.formNineId,
            newSamanyaVasuliData.userId,

            newSamanyaVasuliData.lastBuildingTax,
            newSamanyaVasuliData.currentBuildingTax,
            newSamanyaVasuliData.lastDivaTax,
            newSamanyaVasuliData.currentDivaTax,
            newSamanyaVasuliData.lastArogyaTax,
            newSamanyaVasuliData.currentArogyaTax,

            newSamanyaVasuliData.lastCleaningTax, // New tax field
            newSamanyaVasuliData.currentCleaningTax, // New tax field
            newSamanyaVasuliData.lastFireblegateTax, // New tax field
            newSamanyaVasuliData.currentFireblegateTax, // New tax field
            newSamanyaVasuliData.lastTreeTax, // New tax field
            newSamanyaVasuliData.currentTreeTax, // New tax field
            newSamanyaVasuliData.lastEducationTax, // New tax field
            newSamanyaVasuliData.currentEducationTax, // new tax field

            newSamanyaVasuliData.lastTaxFine,
            newSamanyaVasuliData.lastTaxRelief,
            newSamanyaVasuliData.finalTax,
            newSamanyaVasuliData.bharnaDate,
            newSamanyaVasuliData.amountInWords,
            newSamanyaVasuliData.payment_id,
            newSamanyaVasuliData.order_id,
            newSamanyaVasuliData.mobile,
            newSamanyaVasuliData.checkNo,
            myDates.getDate(),
            // new field  below
            newSamanyaVasuliData.ps_payment_information_id_fk || null,
            newSamanyaVasuliData.ps_payment_receipt_samanya_id_fk
        ];

        return runQuery(pool, q, [insertArr]);
    },


    getSamanyaTaxEntryByPaymentId: (pool, paymentId) =>{
        let q = `SELECT * FROM 
                    ps_tax_payer_list_samanya 
                        WHERE 
                    ps_payment_information_id_fk = ?`
        return runQuery(pool, q, [paymentId])
    },


    getPaniTaxEntryByPaymentId: (pool, paymentId) =>{
        let q = `SELECT * FROM 
                    ps_tax_payer_list_pani 
                        WHERE 
                    ps_payment_information_id_fk = ?`
        return runQuery(pool, q, [paymentId])
    },

    updateFromNineAgentTaxVasuli: (pool, data) => {

        const q = `UPDATE   
                ps_form_nine_form SET 
                    currentArogyaTax = ?,
                    currentBuildingTax = ?,
                    currentDivaTax = ?,

                    currentCleaningTax = ?,
                    currentEducationTax = ?,
                    currentFireblegateTax = ?,
                    currentTreeTax = ?,

                    lastArogyaTax  = ?,
                    lastBuildingTax = ?,
                    lastDivaTax = ?,

                    lastCleaningTax = ?,
                    lastEducationTax = ?,
                    lastFireblegateTax = ?,
                    lastTreeTax = ?,

                    lastTaxFine = ?,
                    lastTaxRelief = ?,

                    totalArogyaTax = ?,
                    totalBuildingTax = ?,
                    totalDivaTax = ?,

                    totalCleaningTax = ?,
                    totalEducationTax = ?,
                    totalFireblegateTax = ?,
                    totalTreeTax = ?,

                    totalSampurnaTax = ?,
                    totalTax = ?,
                    modify_date = ?,
                    checkNo = ?
                WHERE 
                    id = ? 
                        AND 
                    user_id = ?`;

                /** in the above query, 
                 *  id = primary key of ps_form_nine_form
                 * user_id = primary key of ps_form_eight_user
                 * */

        let sampurnaTax =
            safeNumber(data.currentArogyaTax) +
            safeNumber(data.lastArogyaTax) +

            safeNumber(data.currentBuildingTax) +
            safeNumber(data.lastBuildingTax) +

            safeNumber(data.currentDivaTax) +
            safeNumber(data.lastDivaTax) +

            // cleaning
            safeNumber(data.currentCleaningTax) +
            safeNumber(data.lastCleaningTax) +

            // education
            safeNumber(data.currentEducationTax) +
            safeNumber(data.lastEducationTax) +

            // fireblegate
            safeNumber(data.currentFireblegateTax) +
            safeNumber(data.lastFireblegateTax) +

            // tree
            safeNumber(data.currentTreeTax) +
            safeNumber(data.lastTreeTax) +

            // tax fine or relief
            safeNumber(data.lastTaxFine) -
            safeNumber(data.lastTaxRelief);


        let insertArr = [
                data.currentArogyaTax,
                data.currentBuildingTax,
                data.currentDivaTax,

                // new tax means: (the four taxes cleaning, education, fireblegate, trees)
                
                // new tax updation
                data.currentCleaningTax,
                data.currentEducationTax,
                data.currentFireblegateTax,
                data.currentTreeTax,
                
                data.lastArogyaTax,
                data.lastBuildingTax,
                data.lastDivaTax,

                // new tax updation done
                data.lastCleaningTax,
                data.lastEducationTax,
                data.lastFireblegateTax,
                data.lastTreeTax,

                data.lastTaxFine,
                data.lastTaxRelief,


                // new tax updation
                safeNumber(data.currentCleaningTax) + safeNumber(data.lastCleaningTax),
                safeNumber(data.currentEducationTax) + safeNumber(data.lastEducationTax),
                safeNumber(data.currentFireblegateTax) + safeNumber(data.lastFireblegateTax),
                safeNumber(data.currentTreeTax) + safeNumber(data.lastTreeTax),

                safeNumber(data.currentArogyaTax) + safeNumber(data.lastArogyaTax),
                safeNumber(data.currentBuildingTax) + safeNumber(data.lastBuildingTax),
                safeNumber(data.currentDivaTax) + safeNumber(data.lastDivaTax),

                sampurnaTax,
                safeNumber(data.lastTaxFine) + safeNumber(data.lastTaxRelief),
                myDates.getDate(),
                data.checkNo,
                safeNumber(data.formNineId),
                safeNumber(data.userId),
            ];

        return runQuery(pool, q, insertArr)
    },
    saveNewTaxVasuliPaniDetails: function (pool, newWaterVasuliDetails) {
        // console.log('-------------------')
        // console.log(newWaterVasuliDetails)
        // console.log('-------------------')
        let q = `INSERT INTO ps_tax_payer_list_pani(
                        form_nine_id,
                        user_id,

                        tpl_lastSpacialWaterTax,
                        tpl_currentSpacialWaterTax,
                        tpl_totalSpacialWaterTax,

                        tpl_lastGenealWaterTax,
                        tpl_currentGenealWaterTax,
                        tpl_totalGenealWaterTax,

                        tpl_totalWaterTax,
                        checkNo, 

                        tpl_bharnaDate,
                        created_date,

                        ps_payment_information_id_fk
            ) VALUES (?)`;
        
            let insertArr = [
                newWaterVasuliDetails.formNineId,
                newWaterVasuliDetails.userId,

                newWaterVasuliDetails.lastSpacialWaterTax,
                newWaterVasuliDetails.currentSpacialWaterTax,
                Number(newWaterVasuliDetails.lastSpacialWaterTax) + Number(newWaterVasuliDetails.currentSpacialWaterTax),

                newWaterVasuliDetails.lastGenealWaterTax,
                newWaterVasuliDetails.currentGenealWaterTax,
                Number(newWaterVasuliDetails.lastGenealWaterTax) + Number(newWaterVasuliDetails.currentGenealWaterTax),

                Number(newWaterVasuliDetails.finalWaterTax),
                newWaterVasuliDetails.checkNo,

                newWaterVasuliDetails.bharnaDate,
                myDates.getDate(),

                newWaterVasuliDetails.ps_payment_information_id_fk || null
            ]

            console.log(insertArr)
        return runQuery(pool, q, [insertArr]);
    },

    updatePaniFromNineAgentTaxVasuli: function (pool, updatedWaterTaxData) {

        let q = `UPDATE 
                    ps_form_nine_form 
                        SET 
                            currentGenealWaterTax = ?,
                            currentSpacialWaterTax = ?,

                            lastGenealWaterTax = ?,
                            lastSpacialWaterTax  = ?,

                            totalGenealWaterTax = ?,
                            totalSpacialWaterTax = ?,

                            totalWaterTax = ?,

                            checkNo = ?,
                            modify_date = ?
                        WHERE 
                            id = ? 
                                AND 
                            user_id =?`;

        let totalGeneralWaterTax = +updatedWaterTaxData.lastGenealWaterTax + +updatedWaterTaxData.currentGenealWaterTax;
        let totalSpecialWaterTax = +updatedWaterTaxData.lastSpacialWaterTax + +updatedWaterTaxData.currentSpacialWaterTax;

        let updateArr = [
            updatedWaterTaxData.currentGenealWaterTax,
            updatedWaterTaxData.currentSpacialWaterTax, 

            updatedWaterTaxData.lastGenealWaterTax, 
            updatedWaterTaxData.lastSpacialWaterTax, 

            // total general water tax
            totalGeneralWaterTax, 
            // total special water tax
            totalSpecialWaterTax, 

            // total water tax
            totalGeneralWaterTax +  totalSpecialWaterTax,

            updatedWaterTaxData.checkNo, 
            myDates.getDate(), 

            Number(updatedWaterTaxData.formNineId),
            Number(updatedWaterTaxData.userId)
        ]

        console.log(updateArr)


        return runQuery(pool, q, updateArr)
    },
    getSingleTaxUserListAutocomplete: function (pool, data) {
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
                        feu_ownerName LIKE ? LIMIT 10
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
                        feu_malmattaNo LIKE ? LIMIT 10
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
                            feu.id = ?  LIMIT 10
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
    getValusliKarDetailsSamanya: function (pool, month, year) {
        return new Promise((resolve, reject) => {
            var query = `SELECT 
                        IFNULL(SUM(tpl_lastBuildingTax),0) as tpl_lastBuildingTax,
                        IFNULL(SUM(tpl_currentBuildingTax),0) as tpl_currentBuildingTax,
                        IFNULL(SUM(tpl_currentBuildingTax + tpl_lastBuildingTax),0) as tpl_totalBuildingTax,
                        IFNULL(SUM(tpl_lastDivaTax),0) as tpl_lastDivaTax,
                        IFNULL(SUM(tpl_currentDivaTax),0) as tpl_currentDivaTax,
                        IFNULL(SUM(tpl_lastDivaTax + tpl_currentDivaTax),0) as tpl_totalDivaTax,
                        IFNULL(SUM(tpl_lastArogyaTax),0) as tpl_lastArogyaTax,
                        IFNULL(SUM(tpl_currentArogyaTax),0) as tpl_currentArogyaTax,
                        IFNULL(SUM(tpl_currentArogyaTax + tpl_lastArogyaTax),0) as tpl_totalArogyaTax,
                        IFNULL(SUM(tpl_lastTaxFine),0) as tpl_lastTaxFine,
                        IFNULL(SUM(tpl_lastTaxRelief),0) as tpl_lastTaxRelief,
                        IFNULL(SUM(tpl_lastTaxFine + tpl_lastTaxRelief),0) as tpl_totalTax,
                        IFNULL(SUM(tpl_totalSampurnaTax),0) as tpl_totalSampurnaTax,
                        IFNULL(DATE_FORMAT(created_date,'%m'),0) as month
                  FROM  ps_tax_payer_list_samanya  WHERE MONTH(created_date) = ? AND  YEAR(created_date) = ?`;
            pool.query(query, [Number(month), year], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getTotalValusliKarDetailsSamanya: function (pool, y1, y2) {
        console.log(y1, y2);
        return new Promise((resolve, reject) => {
            var query = `SELECT 
                        IFNULL(SUM(tpl_lastBuildingTax),0) as tpl_lastBuildingTax,
                        IFNULL(SUM(tpl_currentBuildingTax),0) as tpl_currentBuildingTax,
                        IFNULL(SUM(tpl_currentBuildingTax + tpl_lastBuildingTax),0) as tpl_totalBuildingTax,
                        IFNULL(SUM(tpl_lastDivaTax),0) as tpl_lastDivaTax,
                        IFNULL(SUM(tpl_currentDivaTax),0) as tpl_currentDivaTax,
                        IFNULL(SUM(tpl_lastDivaTax + tpl_currentDivaTax),0) as tpl_totalDivaTax,
                        IFNULL(SUM(tpl_lastArogyaTax),0) as tpl_lastArogyaTax,
                        IFNULL(SUM(tpl_currentArogyaTax),0) as tpl_currentArogyaTax,
                        IFNULL(SUM(tpl_currentArogyaTax + tpl_lastArogyaTax),0) as tpl_totalArogyaTax,
                        IFNULL(SUM(tpl_lastTaxFine),0) as tpl_lastTaxFine,
                        IFNULL(SUM(tpl_lastTaxRelief),0) as tpl_lastTaxRelief,
                        IFNULL(SUM(tpl_lastTaxFine + tpl_lastTaxRelief),0) as tpl_totalTax,
                        IFNULL(SUM(tpl_totalSampurnaTax),0) as tpl_totalSampurnaTax,
                        IFNULL(DATE_FORMAT(created_date,'%m'),0) as month
                  FROM  ps_tax_payer_list_samanya  WHERE created_date >= ? AND  created_date <= ?`;
            pool.query(query, [y1, y2], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result, y1, y2);
                }
            });
        });
    },
    getTotalValusliKarDetailsPani: function (pool, y1, y2) {
        return new Promise((resolve, reject) => {
            var query = `SELECT 
                        IFNULL(SUM(tpl_lastSpacialWaterTax),0) as tpl_lastSpacialWaterTax,
                        IFNULL(SUM(tpl_currentSpacialWaterTax),0) as tpl_currentSpacialWaterTax,
                        IFNULL(SUM(tpl_lastSpacialWaterTax + tpl_currentSpacialWaterTax),0) as tpl_totalSpacialWaterTax,
                        IFNULL(SUM(tpl_lastGenealWaterTax	),0) as tpl_lastGenealWaterTax,
                        IFNULL(SUM(tpl_currentGenealWaterTax),0) as tpl_currentGenealWaterTax,
                        IFNULL(SUM(tpl_lastGenealWaterTax + tpl_currentGenealWaterTax),0) as tpl_totalGenealWaterTax,
                        IFNULL(SUM(tpl_totalWaterTax),0) as tpl_totalWaterTax
                        FROM  ps_tax_payer_list_pani  WHERE created_date >= ? AND  created_date <= ?`;
            pool.query(query, [y1, y2], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result, y1, y2);
                }
            });
        });
    },
    getValusliKarDetailsPani: function (pool, month, year) {
        return new Promise((resolve, reject) => {
            var query = `SELECT 
                        IFNULL(SUM(tpl_lastSpacialWaterTax),0) as tpl_lastSpacialWaterTax,
                        IFNULL(SUM(tpl_currentSpacialWaterTax),0) as tpl_currentSpacialWaterTax,
                        IFNULL(SUM(tpl_lastSpacialWaterTax + tpl_currentSpacialWaterTax),0) as tpl_totalSpacialWaterTax,
                        IFNULL(SUM(tpl_lastGenealWaterTax	),0) as tpl_lastGenealWaterTax,
                        IFNULL(SUM(tpl_currentGenealWaterTax),0) as tpl_currentGenealWaterTax,
                        IFNULL(SUM(tpl_lastGenealWaterTax + tpl_currentGenealWaterTax),0) as tpl_totalGenealWaterTax,
                        IFNULL(SUM(tpl_totalWaterTax),0) as tpl_totalWaterTax
                  FROM  ps_tax_payer_list_pani  WHERE MONTH(created_date) = ? AND  YEAR(created_date) = ?`;
            pool.query(query, [Number(month), year], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
};
