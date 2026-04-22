var responderSet = require('../config/_responderSet')
const db = require('../config/db.connect.promisify')
const { getRedisData, setRedisKey } = require('../utils/redis')
const { gpDataRedisKey } = require('../utils/redisKeys')
const { runQuery } = require('../utils/runQuery')
const { updateNewMeterCatalogImage } = require('./MeterModel')
let myDates = responderSet.myDate

let HomeModel = {
	deleteFromEight: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM ps_form_eight_user WHERE id=? LIMIT 1`
			pool.query(query, [id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	deleteFromEightTax: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM ps_form_eight_total_taxation WHERE user_id=? LIMIT 1`
			pool.query(query, [id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	deleteFromNine: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM ps_form_nine_form WHERE user_id=? LIMIT 1`
			pool.query(query, [id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getDocList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_document_type`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	startWebSite: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_is_live=1`
			pool.query(query, (err, result) => {
				if (err) {
					; (responderSet.sendData._call = -1),
						(responderSet.sendData._error = 'Op Error, Contact To Admin'),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData)
				} else {
					resolve(result)
				}
			})
		})
	},
	getGharkulYojanaList: function (pool, aouth_data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT id, gy_name as text FROM ps_gharkul_yojna`
			pool.query(query, (err, result) => {
				if (err) {
					; (responderSet.sendData._call = -1),
						(responderSet.sendData._error = 'Op Error, Contact To Admin'),
						(responderSet.sendData._sys_erorr = err),
						reject(responderSet.sendData)
				} else {
					resolve(result)
				}
			})
		})
	},
	checkDuplicateTax: function (pool, data) {
		return new Promise((resolve, reject) => {
			var insert_array = []
			var query = `SELECT * FROM ps_form_eight_taxation
                      WHERE
                        user_id = ? AND
                        fet_ghasara_id = ? AND
                        fet_prop_desc_id = ? AND
                        fet_prop_space_id = ? AND
                        fet_prop_space_pd_id = ? AND
                        fet_bahandkam_prakar_id = ? AND
                        fet_bahandkam_prakar_pd_id = ?
                    LIMIT 1`

			insert_array = [
				data.id,
				data.ghasara_id,
				data.prop_desc_id,
				data.prop_space_id,
				data.prop_space_pd_id,
				data.bahandkam_prakar_id,
				data.bahandkam_prakar_pd_id,
			]
			pool.query(query, insert_array, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getFromEightTaxSampleData: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_form_eight_taxation WHERE user_id = ?`
			pool.query(query, Number(data.id), function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getContactList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT feu_mobileNo as mobile FROM ps_form_eight_user WHERE feu_mobileNo <> '-'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getFromEightTaxTotalData: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_form_eight_total_taxation WHERE user_id = ?`
			pool.query(query, data.id, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	removeSingleTaxSample: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query =
				'DELETE FROM ps_form_eight_taxation WHERE user_id = ? AND id =?'
			pool.query(
				query,
				[Number(data.id), Number(data.remove_tax_id)],
				(err, result) => {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},
	cleanFormEightTotalTaxation: function (pool, user_id) {
		return new Promise((resolve, reject) => {
			var query = 'DELETE FROM ps_form_eight_total_taxation WHERE user_id = ? '
			pool.query(query, [user_id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getNextUserId: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT id FROM ps_form_eight_user WHERE id > ? ORDER BY id ASC LIMIT 1 `
			pool.query(query, [Number(data.id)], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getNextUserByMalmatta: (pool, data) => {
		const malmattaInput = String(data.malmattaNumber || "");
		const [mainStr, subStr] = malmattaInput.split('/');
		const mainPart = parseInt(mainStr, 10);
		const subPart = subStr ? parseInt(subStr, 10) : 0;
		let q = `
		SELECT id, feu_malmattaNo
		FROM (
			SELECT
			id,
			feu_malmattaNo,
			CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL) AS main_part,
			IF(LOCATE('/', feu_malmattaNo) > 0,
				CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL),
				0) AS sub_part
			FROM ps_form_eight_user
		) AS split
		WHERE
			(main_part > ?)
			OR (main_part = ? AND sub_part > ?)
		ORDER BY main_part, sub_part
		LIMIT 1
		`;


		return runQuery(pool, q, [mainPart, mainPart, subPart])
	},

	getCheckMalmattaDetailsDuplicateOrOblique: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT id FROM ps_form_eight_user WHERE feu_malmattaNo = ? LIMIT 1`
			pool.query(query, [data.mNumber], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getLastUserId: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT id,feu_malmattaNo as malmattaNo  FROM ps_form_eight_user ORDER BY id DESC LIMIT 1`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getAarogyaDivaKarList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_arogya_diva_kar`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	saveNewTotalTaxDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_form_eight_total_taxation(
                    user_id,
                    total_building_work,
                    total_open_plot,
                    total_area,
                    building_tax,
                    open_area_tax,
                    other_tex,
                    water_tax,
                    dava_kar,
                    arogya_kar,

                    cleaning_tax,
                    tree_tax,
                    fireblegate_tax,
                    education_tax,

                    total_tax,
                    created_date
                ) VALUES (?)`

			let insertData = [
				Number(data.user_id),
				data.total_building_work,
				data.total_open_plot,
				data.total_area,
				data.building_tax,
				data.open_area_tax,
				data.other_tex,
				data.water_tax,
				data.dava_kar,
				data.arogya_kar,
				data.cleaning_tax,
				data.tree_tax,
				data.firebligate_tax,
				data.education_tax,
				data.total_tax,
				data.created_date,
			]
			console.log(insertData, '262 line model')
			pool.query(query, [insertData], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result, data)
				}
			})
		})
	},

	saveNewFormEightDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			var insert_array = []
			var query = `INSERT INTO ps_form_eight_user(
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
                    feu_northLandmark,
                    feu_southLandmark,
                    feu_bojaShera,
                    feu_newOldDharak,
                    feu_newNewDharak,
                    feu_newPherfarDate,
                    feu_newPherfarTharav,
                    feu_newPherfarDocument,
                    feu_image,
                    feu_image_map,
                    feu_created_date,
                    feu_modify_date,
                    feu_water_tax
                ) VALUES (?)`

			insert_array = [
				data.newMalmattaNo,
				Number(data.newMalmattaNoOblique),
				data.newWardNo,
				data.oldHomeNo,
				data.newAadharNo,
				data.newOwnerName,
				data.newSecondOwnerName,
				data.newMobileNo,
				data.newGramPanchayet,
				data.newVillageName,
				data.newGaatNo,
				data.gharkulYojna,
				data.havingToilet,
				data.newAreaHeightFoot,
				data.newAreaWidthFoot,
				data.newTotalAreaSquareFoot,
				data.newTotalAreaSquareMeter,
				data.newEastLandmark,
				data.newWestLandmark,
				data.newNorthLandmark,
				data.newSouthLandmark,
				data.newBojaShera,
				data.newOldDharak,
				data.newNewDharak,
				data.newPherfarDate,
				data.newPherfarTharav,
				data.newPherfarDocument,
				'',
				'',
				myDates.getDate(),
				myDates.getDate(),
				data.waterTax,
			]
			pool.query(query, [insert_array], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateNewFormEightHomeImage: function (pool, data) {
		return new Promise((resolve, reject) => {
			var insert_array = []
			var query = `UPDATE ps_form_eight_user SET feu_image = ? WHERE id=?`
			pool.query(
				query,
				[data.feu_image, Number(data.id)],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	updateNewFormEightMapImage: function (pool, data) {
		console.log(data, 'here image map---')
		return new Promise((resolve, reject) => {
			var insert_array = []
			var query = `UPDATE ps_form_eight_user SET feu_image_map=? WHERE id=?`
			pool.query(
				query,
				[data.feu_image_map, Number(data.id)],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	updateNewFormEightCatalogImage: function (pool, data) {
		// console.log(data, 'here---')
		return new Promise((resolve, reject) => {
			var insert_array = []
			var query = `UPDATE ps_form_eight_user SET feu_image = ?,feu_image_map=? WHERE id=?`
			pool.query(
				query,
				[data.feu_image, data.feu_image_map, Number(data.id)],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	// getOldFerfarData: function (pool, id) {
	//   return new Promise((resolve, reject) => {
	//     let query = `SELECT
	//                   feu_newOldDharak,
	//                   feu_newNewDharak
	//                   FROM
	//                   ps_form_eight_user
	//                   WHERE
	//                   id= ?`;
	//     pool.query(query, Number(id), function (err, result) {
	//       err ? reject(err) : resolve(result);
	//     });
	//   });
	// },
	getDastavejDetails: function (pool) {
		// console.log('IN dasta')
		return new Promise((resolve, reject) => {
			let query = `SELECT 
                    gp_dastavegList
                  FROM 
                    ps_gram_panchayet`
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	getFerfarDetails: function (pool, malmattaNumber) {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
								* 
							FROM
								ps_form_eight_user
							WHERE 
								feu_malmattaNo = ? 
							LIMIT 1`
			pool.query(query, malmattaNumber, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	getOldOwnerList: function (pool, id) {
		// console.log(id)
		return new Promise((resolve, reject) => {
			let query = `SELECT 
                    *
                  FROM 
                    ps_ferfar
                  WHERE 
                    user_id = ?`
			pool.query(query, Number(id), function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	updateFerfarDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO
                    ps_ferfar (user_id,
                                feu_malmatta_no,
                                feu_new_owner,
                                feu_old_owner,
                                tharav_no,
                                dastavej,
                                ferfar_date, 
                                registry_no)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
			let insertData = [
				data.userId,
				data.newMalmattaNo,
				data.newNewDharak,
				data.newOldDharak,
				data.newPherfarTharav,
				data.newPherfarDocument,
				data.newPherfarDate,
				data.registry_no,
			]
			pool.query(query, insertData, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	saveEditedFerfar: function (pool, data) {
		return new Promise((resolve, reject) => {
			const query = `
      UPDATE ps_ferfar
      SET
        user_id = ?,
        feu_new_owner = ?,
        feu_old_owner = ?,
        tharav_no = ?,
        dastavej = ?,
        ferfar_date = ?,
        registry_no = ?
      WHERE
        feu_malmatta_no = ?;
      `

			pool.query(
				query,
				[
					data.userId,
					data.newNewDharak,
					data.newOldDharak,
					data.newPherfarTharav,
					data.newPherfarDocument,
					data.newPherfarDate,
					data.registry_no,
					data.newMalmattaNo,
				],
				(err, result) => {
					err ? reject(err) : resolve(result)
				}
			)
		})
	},
	getFerfarAvahalMonths: function (pool, year) {
		return new Promise((resolve, reject) => {
			const query = `SELECT DISTINCT SUBSTRING(ferfar_date, 1, 2) AS distinct_month
      FROM ps_ferfar
      WHERE ferfar_date LIKE CONCAT('%/', ?)`

			pool.query(query, [year], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	form8FerfarAvahalPrintDetails: function (pool, year, month) {
		return new Promise((resolve, reject) => {
			let query

			if (month === undefined || month == null || !month) {
				query = `
						SELECT 
							t1.*,
							t2.*,
                            t1.ferfar_date AS _ferfar_date,
							DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%m/%d/%Y'), '%d/%m/%Y') as ferfar_date
						FROM 
							ps_ferfar as t1 
						INNER JOIN 
							ps_form_eight_user as t2 
						ON 
							t1.feu_malmatta_no = t2.feu_malmattaNo 
						WHERE 
							t1.ferfar_date LIKE ?`
				// params = ;
                const likePattern = `%/${year}`; // matches any day/month in that year
				pool.query(query, [likePattern], (err, result) => {
					err ? reject(err) : resolve(result)
				})
			} else {
				query = `
        			SELECT 
						t1.*,
						t2.*,
                        t1.ferfar_date AS _ferfar_date,
						DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%m/%d/%Y'), '%d/%m/%Y') as ferfar_date
						 FROM 
						ps_ferfar as t1 
        			INNER JOIN 
						ps_form_eight_user as t2 
         			ON 
						t1.feu_malmatta_no = t2.feu_malmattaNo 
         			WHERE 
						t1.ferfar_date LIKE ?`
                const monthStr = month.toString().padStart(2, '0'); // ensure 2 digits
                const likePattern = `%/${monthStr}/${year}`; // matches any day in that month/year
				// params = ;
				pool.query(query, [likePattern], (err, result) => {
					err ? reject(err) : resolve(result)
				})
			}
		})
	},

	form8FerfarAvahalPrintDateToDateDetails: function (pool, date_from, date_to) {
		return new Promise((resolve, reject) => {
			const query = `SELECT 
								t1.*,
								t2.*,
								DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%m/%d/%Y'), '%d/%m/%Y') as ferfar_date
							FROM ps_ferfar AS t1 
							INNER JOIN 
								ps_form_eight_user AS t2 
							ON 
								t1.feu_malmatta_no = t2.feu_malmattaNo 
							WHERE 
								STR_TO_DATE(t1.ferfar_date, '%m/%d/%Y') 
								BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y')
							ORDER BY 
								STR_TO_DATE(t1.ferfar_date, '%m/%d/%Y') ASC;`

			pool.query(query, [date_from, date_to], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
	fetchDataToEdit: function (pool, malmattaNumber) {
		return new Promise((resolve, reject) => {
			const query = `
					SELECT 
						t1.*,
						DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%m/%d/%Y'), '%d/%m/%Y') AS ferfar_date,
						t2.* 
					FROM 
						ps_ferfar AS t1 
					INNER JOIN 
						ps_form_eight_user AS t2 
					ON 
						t1.feu_malmatta_no = t2.feu_malmattaNo 
					AND 
						t1.feu_malmatta_no = ?`

			pool.query(query, [malmattaNumber], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	//BASIS OF MONTH AND YEAR
	deleteFerfarAvahal: function (pool, month, year) {
		return new Promise((resolve, reject) => {
			const query =
				month !== undefined && month !== null
					? `DELETE  FROM ps_ferfar 
          WHERE 
          ferfar_date LIKE CONCAT(? ,'/%', '/', ?)`
					: `DELETE  FROM ps_ferfar 
          WHERE 
          ferfar_date LIKE CONCAT('%', '/', ?)`

			if (month !== undefined && month !== null) {
				pool.query(query, [month, year], (err, result) => {
					err ? reject(err) : resolve(result)
				})
			} else {
				pool.query(query, [year], (err, result) => {
					err ? reject(err) : resolve(result)
				})
			}
		})
	},

	//DATE TO DATE
	deleteFerfarAvahalDateToDate: function (pool, date_from, date_to) {
		return new Promise((resolve, reject) => {
			const query = `
      DELETE FROM ps_ferfar
      WHERE STR_TO_DATE(ferfar_date, '%m/%d/%Y') 
      BETWEEN STR_TO_DATE(?, '%m/%d/%Y') AND STR_TO_DATE(?, '%m/%d/%Y');
      `

			pool.query(query, [date_from, date_to], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateFormEight: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE 
                    ps_form_eight_user
                  SET 
                    feu_aadharNo = ?,
                    feu_ownerName = ?,
                    feu_mobileNo = ?,
                    feu_newOldDharak = ?, 
                    feu_newNewDharak = ?,
                    feu_newPherfarDate = ?,
                    feu_newPherfarTharav = ?,
                    feu_newPherfarDocument = ?
                  WHERE 
                    id = ?`
			let insertData = [
				data.newDharakAadhar,
				data.newNewDharak,
				data.newMobileNo,
				data.newOldDharak,
				data.newNewDharak,
				data.newPherfarDate,
				data.newPherfarTharav,
				data.newPherfarDocument,
				Number(data.userId),
			]
			pool.query(query, insertData, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	updateFormEightDforetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			console.log(data, 'updatedata')
			console.log(data.id)
			console.log(Number(data.id))
			var update_array = []
			var query = `UPDATE ps_form_eight_user SET
                    feu_malmattaNo = ?,
                    feu_wardNo = ?,
                    feu_homeNo = ?,
                    feu_aadharNo = ?,
                    feu_ownerName = ?,
                    feu_secondOwnerName = ?,
                    feu_mobileNo = ?,
                    feu_gramPanchayet = ?,
                    feu_villageName = ?,
                    feu_gaatNo = ?,
                    feu_gharkulYojna = ?,
                    feu_havingToilet = ?,
                    feu_areaHeight = ?,
                    feu_areaWidth = ?,
                    feu_totalArea = ?,
                    feu_totalAreaSquareMeter = ?,
                    feu_eastLandmark = ?,
                    feu_westLandmark = ?,
                    feu_northLandmark = ?,
                    feu_southLandmark = ?,
                    feu_bojaShera = ?,
                    feu_modify_date = ?,
                    feu_water_tax=?
                    WHERE id = ?`

			update_array = [
				data.newMalmattaNo,
				data.newWardNo,
				data.oldHomeNo,
				data.newAadharNo,
				data.newOwnerName,
				data.newSecondOwnerName,
				data.newMobileNo,
				data.newGramPanchayet,
				data.newVillageName,
				data.newGaatNo,
				data.gharkulYojna,
				data.havingToilet,
				data.newAreaHeightFoot,
				data.newAreaWidthFoot,
				data.newTotalAreaSquareFoot,
				data.newTotalAreaSquareMeter,
				data.newEastLandmark,
				data.newWestLandmark,
				data.newNorthLandmark,
				data.newSouthLandmark,
				data.newBojaShera,
				myDates.getDate(),
				data.waterTax,
				Number(data.id),
			]
			pool.query(query, update_array, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getFerfarYears: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `SELECT DISTINCT ferfar_date FROM ps_ferfar`
			pool.query(query, [], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateFormEightDetails: function (pool, data) {
		console.log('fer far not done from model')

		return new Promise((resolve, reject) => {
			var update_array = []
			var query = `UPDATE ps_form_eight_user SET
                    feu_malmattaNo = ?,
                    feu_wardNo = ?,
                    feu_homeNo = ?,
                    feu_aadharNo = ?,
                    feu_ownerName = ?,
                    feu_secondOwnerName = ?,
                    feu_mobileNo = ?,
                    feu_gramPanchayet = ?,
                    feu_villageName = ?,
                    feu_gaatNo = ?,
                    feu_gharkulYojna = ?,
                    feu_havingToilet = ?,
                    feu_areaHeight = ?,
                    feu_areaWidth = ?,
                    feu_totalArea = ?,
                    feu_totalAreaSquareMeter = ?,
                    feu_eastLandmark = ?,
                    feu_westLandmark = ?,
                    feu_northLandmark = ?,
                    feu_southLandmark = ?,
                    feu_bojaShera = ?,
                    feu_newOldDharak = ?,
                    feu_newNewDharak = ?,
                    feu_newPherfarDate = ?,
                    feu_newPherfarTharav = ?,
                    feu_newPherfarDocument = ?,
                    feu_modify_date = ?,
                    feu_water_tax=?
                    WHERE id = ?`

			update_array = [
				data.newMalmattaNo,
				data.newWardNo,
				data.oldHomeNo,
				data.newAadharNo,
				data.newOwnerName,
				data.newSecondOwnerName,
				data.newMobileNo,
				data.newGramPanchayet,
				data.newVillageName,
				data.newGaatNo,
				data.gharkulYojna,
				data.havingToilet,
				data.newAreaHeightFoot,
				data.newAreaWidthFoot,
				data.newTotalAreaSquareFoot,
				data.newTotalAreaSquareMeter,
				data.newEastLandmark,
				data.newWestLandmark,
				data.newNorthLandmark,
				data.newSouthLandmark,
				data.newBojaShera,
				data.newOldDharak,
				data.newNewDharak,
				data.newPherfarDate,
				data.newPherfarTharav,
				data.newPherfarDocument,
				myDates.getDate(),
				data.waterTax,
				Number(data.id),
			]
			pool.query(query, update_array, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},


	updateFormEightUser: (pool, formEightUser) => {

		let q = `UPDATE ps_form_eight_user
			
				SET 
					feu_malmattaNo = ?,
					feu_wardNo = ?,
					feu_homeNo = ?,

					feu_mobileNo = ?,
					feu_aadharNo = ?,
					feu_ownerName = ?,

					feu_secondOwnerName = ?,
					feu_gaatNo = ?

				WHERE id = ?	`
		return runQuery(pool, q, [
			formEightUser.feu_malmattaNo,
			formEightUser.feu_wardNo,
			formEightUser.feu_homeNo,

			formEightUser.feu_mobileNo,
			formEightUser.feu_aadharNo,
			formEightUser.feu_ownerName,

			formEightUser.feu_secondOwnerName,
			formEightUser.feu_gaatNo,

			formEightUser.id
		])
	},

	saveNewTaxDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			var insert_array = []
			var query = `INSERT INTO ps_form_eight_taxation(
                      user_id,
                      fet_year_one,
                      fet_year_two,
                      fet_year_count,
                      fet_bahandkam_prakar,
                      fet_height,
                      fet_prop_desc,
                      fet_prop_spec,
                      fet_sq_area,
                      fet_sq_meter_area,
                      fet_width,
                      fet_meter_width,
                      fet_meter_height,
                      fet_ghasara_max,
                      fet_ghasara_min,
                      fet_ghasara_type_one,
                      fet_ghasara_type_two,
                      fet_ghasara_id,
                      fet_ghasara_value,
                      fet_prop_desc_id,
                      fet_prop_desc_rate,
                      fet_prop_desc_text,
                      fet_prop_space_id,
                      fet_prop_space_land_rate,
                      fet_prop_space_pd_id,
                      fet_prop_space_text,
                      fet_bahandkam_prakar_id,
                      fet_bahandkam_prakar_pd_id,
                      fet_bahandkam_prakar_ready_nater_rate,
                      fet_bahandkam_prakar_tax_rate,
                      fet_bahandkam_prakar_text,
                      fet_final_imarati_bhandvali_mullya,
                      fet_final_tax,
                      created_date,
                      modify_date
                ) VALUES (?)`

			insert_array = [
				data.id,
				data.year_one,
				data.year_two,
				data.year_count,
				data.bahandkamPrakar,
				data.height,
				data.propDesc,
				data.propSpec,
				data.sqArea,
				data.sqMeterArea,
				data.width,
				data.meter_width,
				data.meter_height,
				data.ghasara_max,
				data.ghasara_min,
				data.ghasara_type_one,
				data.ghasara_type_two,
				data.ghasara_id,
				data.ghasara_value,
				data.prop_desc_id,
				data.prop_desc_rate,
				data.prop_desc_text,
				data.prop_space_id,
				data.prop_space_land_rate,
				data.prop_space_pd_id,
				data.prop_space_text,
				data.bahandkam_prakar_id,
				data.bahandkam_prakar_pd_id,
				data.bahandkam_prakar_ready_nater_rate,
				data.bahandkam_prakar_tax_rate,
				data.bahandkam_prakar_text,
				data.final_imarati_bhandvali_mullya,
				data.final_tax,
				myDates.getDate(),
				myDates.getDate(),
			]
			pool.query(query, [insert_array], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	checkAuth: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_gram_panchayet 
                    WHERE  user_name = ? LIMIT 1`
			pool.query(query, [data.userName], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getNagrikCount: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT  COUNT(*) as member_count FROM ps_gp_member_list`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	userCheckAuth: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT id,fName,fAadhar,fMobile,fEmail,fImage,fVillage,DATE_FORMAT(fDob,'%d-%m-%Y') as fDob  FROM ps_gp_member_list 
                    WHERE  fMobile = ? AND fPassword =? LIMIT 1`
			pool.query(query, [data.username, data.password], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	verifyUserDetails: function (pool, data) {
		console.log(data)
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_form_eight_user WHERE TRIM(feu_malmattaNo)=? AND TRIM(feu_aadharNo)=? LIMIT 1`
			pool.query(query, [data.malmatta_no, data.aadhar_no], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getUserDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
                    id,
                    fName as name,
                    fAadhar as aadhar,
                    fMobile as mobile,
                    fEmail as email_id,
                    CONCAT('new-gp-page/main-page/images/user-pic/',fImage)  as profile,
                    fVillage as malamatta_kramank,
                    DATE_FORMAT(fDob,'%d-%m-%Y') as dob
                      FROM ps_gp_member_list 
                    WHERE  id=? LIMIT 1`
			pool.query(query, [data.id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getGpCount: function (pool) {
		let query = `SELECT * FROM ps_sub_village`
		return runQuery(pool, query)
	},

	getVideoGalleryData: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_video_gallery`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getGramAhavalDocuments: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_gram_ahaval_documents`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getGpData: async function (pool) {
		var query = `SELECT * FROM ps_gram_panchayet LIMIT 1`

		const cacheKey = gpDataRedisKey

		const cachedGpData = await getRedisData(cacheKey)
		if (cachedGpData) {
			return cachedGpData
		}

		let [_gp] = await db.query(query)

		return _gp
	},

	getMeterDetails: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
							user_id,
							mbl_nal_number,
							mbl_deyak_number,
							mbl_deyak_date,
							mbl_amt_before_mudat,
							mbl_valve_number,
							mbl_deyak_amt_fill_last_date,
							mbl_ward_number,
							mbl_user_meter_number,
							mbl_user_number,
							mbl_nal_usage_type,
							mbl_user_name,
							mbl_user_mobile_no,
							mbl_water_unit,
							mbl_water_usage_from,
							mbl_total_water_usage,
							mbl_meter_reading_start,
							mbl_meter_reading_end,
							mbl_total_unit,
							mbl_rate,
							mbl_water_amt,
							mbl_last_backlock,
							mbl_final_total_amt,
							mbl_before_date_amt_to_fill,
							mbl_after_date_amt_to_fill,
							mbl_amt_diposite_till_date,
							inserted_on,
							mbl_meter_image
							FROM ps_meter_bill_list`

			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getGpSiteData: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT gps_name as site_name,gps_site as site_url FROM ps_gp_sites`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	formEightUser: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
                        feu.id as id,
                        feu_malmattaNo,
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
                        feu_northLandmark,
                        feu_bojaShera,
                        feu_newOldDharak,
                        feu_newNewDharak,
                        feu_newPherfarDate,
                        feu_newPherfarTharav,
                        feu_newPherfarDocument,
                        gy_name as graha_yojana,
                        feu_newOldDharak,	
                        feu_newNewDharak,	
                        feu_newPherfarDate,	
                        feu_newPherfarTharav,	
                        feu_newPherfarDocument,	
                        feu_image,
                        feu_image_map,
                        feu_water_tax,
                        home_image_longitude,
                        home_image_latitude,
                        home_image_location
                    FROM ps_form_eight_user as feu
                        INNER JOIN 
                        ps_gharkul_yojna as gy 
                        ON gy.id  = feu.feu_gharkulYojna 
                    WHERE  feu.id = ?`
			pool.query(query, Number(data.id), (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getBahandkamPrakarList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
                      id,
                      bp_type as text,
                      bp_ready_nakar_rate as ready_nakar_rate,
                      bp_tax_rate as tax_rate,
                      bp_pd_id as pd_id
                    FROM ps_bahandkam_prakar`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getGhasaraRateList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT  * FROM ps_ghasara_rate`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getPropertyDesc: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
                      id,
                      pd_name as text,
                      pd_rate as rate
                    FROM ps_property_desc`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getPropertySpecification: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
                      id,
                      ps_name as text,
                      ps_land_rate as lnd_rate,
                      ps_pd_id as pd_id,
                      ps_skeep_tax as skeep_tax,
                      ps_skip_diwa_arogya
                    FROM ps_property_specification 	`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getPreTaxationData: function (pool, data, callback) {
		var sendData = {
			user: {},
			jsUser: [],
			bahandkamPrakar: [],
			propertyDesc: [],
			propertySpecification: [],
			ghasaraRate: [],
			arogyaDivaKar: [],
			gp: {},
		}
		var _this = this

		_this
			.getGpData(pool)
			.then((result) => {
				sendData.gp = result[0]
				return _this.formEightUser(pool, data)
			})
			.then((result) => {
				if (result.length == 0) {
					callback(true, { call: 2 })
					return 999
				} else {
					sendData.user = result[0]
					sendData.jsUser = JSON.stringify(result)
					return _this.getBahandkamPrakarList(pool)
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.bahandkamPrakar = JSON.stringify(result)
					return _this.getPropertyDesc(pool)
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.propertyDesc = JSON.stringify(result)
					return _this.getPropertySpecification(pool)
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.propertySpecification = JSON.stringify(result)
					return _this.getGhasaraRateList(pool)
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.ghasaraRate = JSON.stringify(result)
					return _this.getAarogyaDivaKarList(pool)
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.arogyaDivaKar = JSON.stringify(result)
					callback(true, { call: 1, data: sendData })
				}
			})
			.catch((error) => {
				callback(false, { call: 0, data: error })
			})
	},
	getUserInfo: function (pool, data) {
		return new Promise((resolve, reject) => {
			switch (Number(data.sType)) {
				case 1:
					var query = `SELECT 
                        feu.id as id ,
                        feu_ownerName as label,
                        feu_malmattaNo,
                        feu_ownerName
                        FROM ps_form_eight_user as feu 
                      WHERE 
                        feu_ownerName LIKE ? LIMIT 10
                      `
					var d = [`${data.q}%`]
					break
				case 2:
					var query = `SELECT 
                          feu.id as id ,
                          feu_malmattaNo as label,
                          feu_malmattaNo,
                          feu_ownerName
                          FROM ps_form_eight_user as feu 
                        WHERE 
                        feu_malmattaNo LIKE ? LIMIT 10
                        `
					var d = [`${data.q}%`]
					break
				case 4:
					var query = `SELECT 
                        feu.id as id ,
                        feu_ownerName as label,
                        feu_malmattaNo,
                        feu_ownerName
                        FROM ps_form_eight_user as feu 
                      WHERE 
                        feu_secondOwnerName LIKE ? LIMIT 10`
					var d = [`${data.q}%`]

					break
				default:
					var query = `SELECT 
                            feu.id as id ,
                            feu.id as label,
                            feu_malmattaNo,
                            feu_ownerName
                            FROM ps_form_eight_user as feu 
                          WHERE 
                            id = ? LIMIT 10
                          `
					var d = [Number(data.q)]
					break
			}

			pool.query(query, d, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getTotalPrintFormEightUser: (pool, y1, y2) => {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
                      COUNT(ps_form_eight_user.id) as total_user
                      
                      FROM  
                      ps_form_eight_user inner join ps_gharkul_yojna 
                      on ps_form_eight_user.feu_gharkulYojna = ps_gharkul_yojna.id`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	printFormEightUser: function (pool, y1, y2, tp, p) {
		return new Promise((resolve, reject) => {
			let page = p * tp
			let tcount = tp
			let query1 = `SELECT 
                      ps_form_eight_user.id, 
                      feu_malmattaNo,
                      feu_wardNo,
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
                      feu_newOldDharak,
                      feu_newNewDharak,
                      feu_newPherfarDate,
                      feu_newPherfarTharav,
                      feu_newPherfarDocument,
                      feu_newOldDharak,	
                      feu_newNewDharak,	
                      feu_newPherfarDate,	
                      feu_newPherfarTharav,	
                      feu_newPherfarDocument,
                      feu_image,
                      feu_water_tax,
                      ps_gharkul_yojna.gy_name as graha_yojana
                      FROM
                      ps_form_eight_user inner join ps_gharkul_yojna 
                      on ps_form_eight_user.feu_gharkulYojna = ps_gharkul_yojna.id 
                      ORDER BY CAST(feu_malmattaNo AS DECIMAL)
                      limit ${page}, ${tcount}`
			let query2 = `SELECT 
                      eight_user.id as id, 
                      feu_malmattaNo,
                      feu_wardNo,
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
                      feu_newOldDharak,
                      feu_newNewDharak,
                      feu_newPherfarDate,
                      feu_newPherfarTharav,
                      feu_newPherfarDocument,
                      feu_newOldDharak,	
                      feu_newNewDharak,	
                      feu_newPherfarDate,	
                      feu_newPherfarTharav,	
                      feu_newPherfarDocument,
                      feu_image,
                      feu_water_tax,
                      gharkul_yojna.gy_name AS graha_yojana,
                      TRIM(GROUP_CONCAT(feu_old_owner )) AS old_owner,
                      TRIM(GROUP_CONCAT(feu_new_owner )) AS new_owner,
                      TRIM(GROUP_CONCAT(tharav_no )) AS tharav_no,
                      TRIM(GROUP_CONCAT(ferfar_date)) AS ferfar_date,
                      TRIM(GROUP_CONCAT(dastavej)) AS dastavej
                      FROM 
                    ps_form_eight_user AS eight_user 
                          INNER JOIN 
                    ps_gharkul_yojna AS gharkul_yojna ON eight_user.feu_gharkulYojna = gharkul_yojna.id
                    LEFT JOIN
                    ps_ferfar AS ferfar ON eight_user.id = ferfar.user_id

                    GROUP BY eight_user.id
                      ORDER BY CAST(feu_malmattaNo AS DECIMAL)
                    limit ${page}, ${tcount}`

			let query3 = `SELECT 
                      eight_user.id as id, 
                      feu_malmattaNo,
                      feu_wardNo,
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
                      feu_newOldDharak,
                      feu_newNewDharak,
                      feu_newPherfarDate,
                      feu_newPherfarTharav,
                      feu_newPherfarDocument,
                      feu_newOldDharak,	
                      feu_newNewDharak,	
                      feu_newPherfarDate,	
                      feu_newPherfarTharav,	
                      feu_newPherfarDocument,
                      feu_image,
                      feu_water_tax,
                      gharkul_yojna.gy_name AS graha_yojana,
                      TRIM(GROUP_CONCAT(feu_old_owner )) AS old_owner,
                      TRIM(GROUP_CONCAT(feu_new_owner )) AS new_owner,
                      TRIM(GROUP_CONCAT(tharav_no )) AS tharav_no,
                      TRIM(GROUP_CONCAT(ferfar_date)) AS ferfar_date,
                      TRIM(GROUP_CONCAT(dastavej)) AS dastavej
                      FROM 
                    ps_form_eight_user AS eight_user 
                          INNER JOIN 
                    ps_gharkul_yojna AS gharkul_yojna ON eight_user.feu_gharkulYojna = gharkul_yojna.id
                    LEFT JOIN
                    ps_ferfar AS ferfar ON eight_user.id = ferfar.user_id

                    GROUP BY eight_user.id
					ORDER BY 
					CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL),
					IF(LOCATE('/', feu_malmattaNo), 
					   CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL), 
					   NULL)
				
                    limit ${page}, ${tcount}`

			pool.query(query3, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	printFormEightUserLimit: function (pool, y1, y2, tp, p) {
        var query = `SELECT 
                    ps_form_eight_user.id, 
                    feu_malmattaNo,
                    feu_wardNo,
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
                    feu_newOldDharak,
                    feu_newNewDharak,
                    feu_newPherfarDate,
                    feu_newPherfarTharav,
                    feu_newPherfarDocument,
                    feu_newOldDharak,	
                    feu_newNewDharak,	
                    feu_newPherfarDate,	
                    feu_newPherfarTharav,	
                    feu_newPherfarDocument,
                    feu_image,
                    feu_water_tax,
                    ps_gharkul_yojna.gy_name as graha_yojana
                    FROM  
                    ps_form_eight_user inner join ps_gharkul_yojna 
                    on ps_form_eight_user.feu_gharkulYojna = ps_gharkul_yojna.id
                    ORDER BY CAST(feu_malmattaNo AS DECIMAL)
                    limit ${p * tp}, ${tp}`

        // form year wise sorting ( this is required later)
        // (select * from ps_form_eight_user where year(feu_created_date) >= (${y1}) and year(feu_created_date) <= (${y2}))

        let query2 = `SELECT 
                    eight_user.id as id, 
                    feu_malmattaNo,
                    feu_wardNo,
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
                    feu_newOldDharak,
                    feu_newNewDharak,
                    feu_newPherfarDate,
                    feu_newPherfarTharav,
                    feu_newPherfarDocument,
                    feu_newOldDharak,	
                    feu_newNewDharak,	
                    feu_newPherfarDate,	
                    feu_newPherfarTharav,	
                    feu_newPherfarDocument,
                    feu_image,
                    feu_water_tax,
                    fet_bahandkam_prakar_text,
                    fet_year_two,
                    gharkul_yojna.gy_name AS graha_yojana,
                    TRIM(GROUP_CONCAT(feu_old_owner )) AS old_owner,
                    TRIM(GROUP_CONCAT(feu_new_owner )) AS new_owner,
                    TRIM(GROUP_CONCAT(tharav_no )) AS tharav_no,
                    TRIM(GROUP_CONCAT(ferfar_date)) AS ferfar_date,
                    TRIM(GROUP_CONCAT(dastavej)) AS dastavej
                    FROM 
                ps_form_eight_user AS eight_user 
                        
                INNER JOIN 

                ps_gharkul_yojna AS gharkul_yojna 
                ON 
                eight_user.feu_gharkulYojna = gharkul_yojna.id
                LEFT JOIN
                ps_ferfar AS ferfar 
                ON 
                eight_user.id = ferfar.user_id

                LEFT JOIN 
                ps_form_eight_taxation
                ON 
                eight_user.id =  ps_form_eight_taxation.user_id

                GROUP BY eight_user.id
                    ORDER BY CAST(feu_malmattaNo AS DECIMAL)
                    limit ${p * tp}, ${tp}`

        //Added later in query2 below details -29/12/2024

        // fet_bahandkam_prakar_text,
        // fet_year_two,

        //LEFT JOIN
        // ps_form_eight_taxation
        // ON
        // eight_user.id =  ps_form_eight_taxation.user_id

        let query3 = `SELECT 
                            eight_user.id as id, 
                            feu_malmattaNo,
                            feu_wardNo,
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
                            feu_newOldDharak,
                            feu_newNewDharak,
                            feu_newPherfarDate,
                            feu_newPherfarTharav,
                            feu_newPherfarDocument,
                            feu_newOldDharak,	
                            feu_newNewDharak,	
                            feu_newPherfarDate,	
                            feu_newPherfarTharav,	
                            feu_newPherfarDocument,
                            feu_image,
                            feu_water_tax,
                            fet_bahandkam_prakar_text,
                            fet_year_two,
                            gharkul_yojna.gy_name AS graha_yojana,
                            TRIM(GROUP_CONCAT(feu_old_owner )) AS old_owner,
                            TRIM(GROUP_CONCAT(feu_new_owner )) AS new_owner,
                            TRIM(GROUP_CONCAT(tharav_no )) AS tharav_no,
                            TRIM(GROUP_CONCAT(ferfar_date)) AS ferfar_date,
                            TRIM(GROUP_CONCAT(dastavej)) AS dastavej
                            FROM 
                            ps_form_eight_user AS eight_user 
                                
                            INNER JOIN 
        
                            ps_gharkul_yojna AS gharkul_yojna 
                            ON 
                            eight_user.feu_gharkulYojna = gharkul_yojna.id
                            LEFT JOIN
                            ps_ferfar AS ferfar 
                            ON 
                            eight_user.id = ferfar.user_id
        
                            LEFT JOIN 
                            ps_form_eight_taxation
                            ON 
                            eight_user.id =  ps_form_eight_taxation.user_id
        
                            GROUP BY eight_user.id
                            ORDER BY 
                            CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL),
                            IF(LOCATE('/', feu_malmattaNo), 
                            CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL), 
                            NULL)
                            limit ${p * tp}, ${tp}`

        return runQuery(pool, query3)
	},

    printFormEightUserLimitOne: (pool) =>{
        // copy of the above function named printFormEightUserLimit, but just returns a single value
        let q = `SELECT 
                    eight_user.id as id, 
                    feu_malmattaNo,
                    feu_wardNo,
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
                    feu_newOldDharak,
                    feu_newNewDharak,
                    feu_newPherfarDate,
                    feu_newPherfarTharav,
                    feu_newPherfarDocument,
                    feu_image,
                    feu_water_tax,
                    fet_bahandkam_prakar_text,
                    fet_year_two,
                    gharkul_yojna.gy_name AS graha_yojana,
                    TRIM(GROUP_CONCAT(feu_old_owner )) AS old_owner,
                    TRIM(GROUP_CONCAT(feu_new_owner )) AS new_owner,
                    TRIM(GROUP_CONCAT(tharav_no )) AS tharav_no,
                    TRIM(GROUP_CONCAT(ferfar_date)) AS ferfar_date,
                    TRIM(GROUP_CONCAT(dastavej)) AS dastavej
                FROM 
                    ps_form_eight_user AS eight_user 
                INNER JOIN 
                    ps_gharkul_yojna AS gharkul_yojna 
                    ON eight_user.feu_gharkulYojna = gharkul_yojna.id
                LEFT JOIN
                    ps_ferfar AS ferfar 
                    ON eight_user.id = ferfar.user_id
                LEFT JOIN 
                    ps_form_eight_taxation
                    ON eight_user.id = ps_form_eight_taxation.user_id
                WHERE
                    REPLACE(eight_user.feu_ownerName, ' ', '') LIKE 'ग्रामपंचायतकार्यालय%'
                GROUP BY eight_user.id
                ORDER BY 
                    CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL),
                    IF(LOCATE('/', feu_malmattaNo), 
                    CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL), 
                    NULL)
                LIMIT 1`;


        return runQuery(pool, q)
    },

    getForm8UserCount: (pool) =>{
        let q = `SELECT COUNT(DISTINCT eight_user.id) as totalUsers
                    FROM ps_form_eight_user AS eight_user
                        INNER JOIN ps_gharkul_yojna AS gharkul_yojna 
                    ON eight_user.feu_gharkulYojna = gharkul_yojna.id
                        LEFT JOIN ps_ferfar AS ferfar 
                    ON eight_user.id = ferfar.user_id
                        LEFT JOIN ps_form_eight_taxation
                    ON eight_user.id = ps_form_eight_taxation.user_id;
                    `
        return runQuery(pool, q)
    },
	printGetFromEightTaxTotalData: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_form_eight_total_taxation`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	printGetFromEightTaxSampleData: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_form_eight_taxation`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	checkDuplicateMember: function (pool, data) {
        let q = `SELECT
                  *
                FROM ps_gp_member_list WHERE fAadhar = ? OR fMobile = ?`


        return runQuery(pool, q, [data.fAadhar, data.fMobile])
	},
    
    checkDuplicateMemberByAadharOnly: (pool, aadharNo) =>{
        return runQuery(pool, `SELECT * FROM ps_gp_member_list WHERE fAadhar = ?;`, [aadharNo])
    },

    checkDuplicateMemberByMobileOnly: (pool, mobileNo) =>{
        return runQuery(pool, `SELECT * FROM ps_gp_member_list WHERE fMobile = ?;`, [mobileNo])
    },

	getGpPopleList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_gp_member_list`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getTodaysBirthday: function (pool) {
		return new Promise((resolve, reject) => {
			let date = new Date()
			date =
				date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

			let query = `SELECT fName,fImage FROM ps_gp_member_list
                  WHERE
                  DATE_FORMAT(fDob, '%m-%d') = DATE_FORMAT('${date}','%m-%d')`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	addNewMember: function (pool, data) {
        let q = `INSERT INTO ps_gp_member_list(
                fName, 
                fAadhar, 
                fMobile,
                fAltMobile, 
                fOccupation,
                fEmail,
                fVillage,
                fBloodGroup,
                fDob,
                fPassword,
                fImage,

                has_aabha_card,
                aabha_card_number,

                has_ayushman_card,
                ayushman_card_number,   
                ayushman_bharat_yojana_name,

                has_downloaded_meri_gram_panchayat_app,
                has_downloaded_panchayat_decision_app,
                has_downloaded_gram_samvad_app,

                createdAt,
                updatedAt

                ) VALUES (?)`

            
        const now = new Date();

        let insertData = [
            data.fName,
            data.fAadhar,
            data.fMobile,
            data.fAltMobile,
            data.fOccupation,
            data.fEmail,
            data.fVillage,
            data.fBloodGroup,
            data.fDob,
            data.fPassword,
            data.image,

            data.has_aabha_card,
            data.aabha_card_number,

            data.has_ayushman_card,
            data.ayushman_card_number,
            data.ayushman_bharat_yojana_name,

            data.has_downloaded_meri_gram_panchayat_app,
            data.has_downloaded_panchayat_decision_app,
            data.has_downloaded_gram_samvad_app,

            data.createdAt || now,
            data.createdAt || now

        ];
        return runQuery(pool, q, [insertData]);
	},
	addNewApplication: function (pool, data) {
        let q = `INSERT INTO ps_user_application(
                  formName, 
                  formMobile, 
                  formEmail,
                  formAddress, 
                  formAadhar,
                  docDetails,
                  create_date
            ) VALUES (?)`; 

        let insertData = [
            data.formName,
            data.formMobile,
            data.formEmail,
            data.formAddress,
            data.formAadhar,
            JSON.stringify(data.docDetails),
            data.create_date || myDates.getDate(),
        ]
        return runQuery(pool, q, [insertData]);
	},
	getPreviousApplicationDate: function (pool, newApplicationData) { 
        let q = `SELECT *,
                        DATE_FORMAT(create_date,'%d-%m-%Y') AS create_date 
                    FROM 
                        ps_user_application 
                    WHERE 
                        formAadhar = ?`

	},
	getNewApplicationPrint: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT
                      id,
                      formName, 
                      formMobile, 
                      formEmail,
                      formAddress, 
                      formAadhar,
                      docDetails,
                      DATE_FORMAT(create_date,'%d-%m-%Y') as create_date
                    FROM ps_user_application WHERE id = ?`
			pool.query(query, [data], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	formEightExportDetails: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
                        fEight.id as anukramank,
                        feu_malmattaNo,
                        feu_homeNo,
                        feu_ownerName,
                        feu_secondOwnerName,
                        feu_havingToilet,
                        feu_totalArea,
                        
                        gy_name,
                        feu_mobileNo,
                        feu_aadharNo,
                        feu_eastLandmark,
                        feu_westLandmark,
                        feu_southLandmark,
                        feu_northLandmark,

                        SUM(fet_width) as fet_width,
                        SUM(fet_height) as fet_height,
                        SUM(fet_sq_meter_area) as fet_sq_meter_area,
                        SUM(fet_sq_area) as fet_sq_area,
                        GROUP_CONCAT ( ' ( ',fet_bahandkam_prakar_text,' , ',fet_prop_space_text , CONCAT(' = लांबी ',fet_height,' x रुंदी ', fet_width ,' = ',fet_sq_area,' ) '),' \n') as fet_prop_space_text
                        FROM ps_form_eight_user as fEight INNER JOIN 
                        ps_gharkul_yojna as g_y ON 
                        fEight.feu_gharkulYojna = g_y.id 
                            INNER JOIN 
                        ps_form_eight_taxation as fEightTotal 
                            ON 
                        fEightTotal.user_id = fEight.id
                            GROUP BY 
                        fEight.id
                    ORDER BY 
					    CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL),
					IF(LOCATE('/', feu_malmattaNo), 
					   CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL), 
					   NULL) ASC`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getWebNoticeListOnHomePage: function (pool) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT
                      id, 
                      wn_notice_name as notice,
                      wn_show as show_type,
                      DATE_FORMAT(created_date,"%d-%m-%Y") as date_1
                    FROM ps_web_notice
                    WHERE
                      wn_show = 1
                     ORDER BY id DESC 
                  `
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	getWebNoticeList: function (pool) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT
                      id, 
                      wn_notice_name as notice,
                      wn_show as show_type,
                      DATE_FORMAT(created_date,"%d-%m-%Y") as date_1
                    FROM ps_web_notice ORDER BY id DESC
                  `
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	saveNewWebNotice: function (pool, data) {
		return new Promise(function (resolve, reject) {
			let query = `INSERT INTO ps_web_notice (
                      wn_notice_name,
                      created_date
                  ) VALUES (?)`
			pool.query(
				query,
				[[data.webNoticeText, myDates.getDate()]],
				function (error, result) {
					if (error) reject(error)
					else resolve(result)
				}
			)
		})
	},
	updateSiteSeen: function (pool, data) {
		return new Promise(function (resolve, reject) {
			let query = `UPDATE ps_gram_panchayet SET gp_site_count = ?`
			pool.query(query, [Number(data.count)], function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	updateVisibilityWebNotice: function (pool, data) {
		return new Promise(function (resolve, reject) {
			let query = `UPDATE ps_web_notice SET wn_show = ? WHERE id=?`
			pool.query(
				query,
				[Number(data.v), Number(data.id)],
				function (error, result) {
					if (error) reject(error)
					else resolve(result)
				}
			)
		})
	},
	getVillageName: function (pool) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT gp_name as name FROM ps_sub_village`
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	deleteWebNotice: function (pool, data) {
		return new Promise(function (resolve, reject) {
			let query = `DELETE FROM ps_web_notice  WHERE id=?`
			pool.query(query, [Number(data.id)], function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	getMeterList: function (pool) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT * FROM ps_meter_bill`
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	getUserMeterList: function (pool) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT 
                    id,
                    mbl_nal_number,
                    mbl_valve_number,
                    mbl_user_name,
                    mbl_total_unit,
                    DATE_FORMAT(mbl_deyak_date,'%d-%m-%Y') as mbl_deyak_date,
                    DATE_FORMAT(mbl_deyak_amt_fill_last_date,'%d-%m-%Y') as mbl_deyak_amt_fill_last_date
                    FROM ps_meter_bill_list`
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	getUserMeterDetails: function (pool, id) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT * FROM ps_meter_bill WHERE id=?`
			pool.query(query, [Number(id)], function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	lastMeterTaxDetails: function (pool, id) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT
							id,
							mbl_amt_before_mudat,
							mbl_before_date_amt_to_fill,
							mbl_after_date_amt_to_fill,
							DATE_FORMAT(inserted_on,'%d-%m-%Y') as inserted_on,
							DATE_FORMAT(mbl_amt_diposite_till_date,'%d-%m-%Y') as mbl_amt_diposite_till_date,
							DATE_FORMAT(mbl_deyak_amt_fill_last_date,'%d-%m-%Y') as mbl_deyak_amt_fill_last_date,
							DATE_FORMAT(mbl_deyak_date,'%d-%m-%Y') as mbl_deyak_date,
							mbl_deyak_number,
							mbl_final_total_amt,
							mbl_last_backlock,
							mbl_meter_image,
							mbl_meter_reading_end,
							mbl_meter_reading_start,
							mbl_nal_number,
							mbl_nal_usage_type,
							mbl_rate,
							mbl_total_unit,
							mbl_total_water_usage,
							mbl_user_meter_number,
							mbl_user_mobile_no,
							mbl_user_name,
							mbl_user_number,
							mbl_valve_number,
							mbl_ward_number,
							mbl_water_amt,
							mbl_water_unit,
							mbl_water_usage_from,
							mbl_water_usage_to,

							DATE_FORMAT(mbl_water_usage_from, '%m/%Y') AS _mbl_water_usage_from,
							DATE_FORMAT(mbl_water_usage_to, '%m/%Y') AS _mbl_water_usage_to,
							DATE_FORMAT(mbl_water_usage_from, '%Y-%m-%d') AS _mbl_water_usage_from_full,
							DATE_FORMAT(mbl_water_usage_to, '%Y-%m-%d') AS _mbl_water_usage_to_full,


							mbl_payment_date,
							mbl_is_fine_relief_given,
							mbl_amount_paid,
							mbl_amount_payable,


							 CASE 
								WHEN mbl_amount_paid = 0 AND mbl_amount_payable = 0 
									THEN mbl_after_date_amt_to_fill
								ELSE
									mbl_amount_payable - mbl_amount_paid
							END AS _last_unpaid_amount,

							user_id
							FROM ps_meter_bill_list WHERE user_id= ? ORDER BY id DESC LIMIT 1`
			pool.query(query, [Number(id)], function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	getMeterRate: function (pool) {
		return new Promise(function (resolve, reject) {
			let query = `SELECT * FROM ps_meter_rates`
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	removeMeterBill: function (pool, id) {
		return new Promise(function (resolve, reject) {
			let query = `DELETE FROM ps_meter_bill_list WHERE id =?`
			pool.query(query, [Number(id)], function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	addMobileCertificate: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_certificate_mobile(
                    certificate_title,
                    certificate_id,
                    input_1,
                    input_2,
                    holder_id,
                    holder_name,
                    created_date) VALUES (?)`
			var insertData = [
				data.certificate_title,
				data.certificate_id,
				data.input_1,
				data.input_2,
				data.holder_id,
				data.holder_name,
				myDates.getDate(),
			]
			pool.query(query, [insertData], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getMobileCertificate: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `SELECT 
                    id,
                    certificate_title as certificate_title,
                    certificate_id,
                    input_1,
                    input_2,
                    holder_name as holder_name,
                    holder_id,
                    DATE_FORMAT(created_date,'%d-%m-%Y') as certificate_date,
                    certificate_status as certificate_status,
                    certificate_url as certificate_url,
                    IFNULL(certificate_message,'') as certificate_message
                    FROM ps_certificate_mobile WHERE holder_id=?`
			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
}

module.exports = HomeModel
