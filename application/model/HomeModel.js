var responderSet = require('../config/_responderSet');
const db = require('../config/db.connect.promisify');
const { getRedisData, setRedisKey } = require('../utils/redis');
const { gpDataRedisKey } = require('../utils/redisKeys');
const { runQuery } = require('../utils/runQuery');
const { updateNewMeterCatalogImage } = require('./MeterModel');
let myDates = responderSet.myDate;

let HomeModel = {
	deleteFromEight: (pool, id) => {
		var query = `DELETE FROM ps_form_eight_user WHERE id=? LIMIT 1`;
		return runQuery(pool, query, [id]);
	},
	deleteFromEightTax: (pool, id) => {
		var query = `DELETE FROM ps_form_eight_total_taxation WHERE user_id=? LIMIT 1`;
		return runQuery(pool, query, [id]);
	},
	deleteFromNine: (pool, id) => {
		var query = `DELETE FROM ps_form_nine_form WHERE user_id=? LIMIT 1`;
		return runQuery(pool, query, [id]);
	},
	getDocList: (pool) => {
		var query = `SELECT * FROM ps_document_type`;
		return runQuery(pool, query);
	},
	startWebSite: async (pool) => {
		var query = `UPDATE ps_gram_panchayet SET gp_is_live=1`;

		try {
			return await runQuery(pool, query);
		} catch (err) {
			responderSet.sendData._call = -1;
			responderSet.sendData._error = 'Op Error, Contact To Admin';
			responderSet.sendData._sys_erorr = err;
			throw responderSet.sendData;
		}
	},
	getGharkulYojanaList: async (pool, aouth_data) => {
		var query = `SELECT id, gy_name as text FROM ps_gharkul_yojna`;

		try {
			return await runQuery(pool, query);
		} catch (err) {
			responderSet.sendData._call = -1;
			responderSet.sendData._error = 'Op Error, Contact To Admin';
			responderSet.sendData._sys_erorr = err;
			throw responderSet.sendData;
		}
	},
	checkDuplicateTax: (pool, data) => {
		var insert_array = [];
		var query = `SELECT * FROM ps_form_eight_taxation
                      WHERE
                        user_id = ? AND
                        fet_ghasara_id = ? AND
                        fet_prop_desc_id = ? AND
                        fet_prop_space_id = ? AND
                        fet_prop_space_pd_id = ? AND
                        fet_bahandkam_prakar_id = ? AND
                        fet_bahandkam_prakar_pd_id = ?
                    LIMIT 1`;

		insert_array = [
			data.id,
			data.ghasara_id,
			data.prop_desc_id,
			data.prop_space_id,
			data.prop_space_pd_id,
			data.bahandkam_prakar_id,
			data.bahandkam_prakar_pd_id
		];
		return runQuery(pool, query, insert_array);
	},
	getFromEightTaxSampleData: (pool, data) => {
		var query = `SELECT * FROM ps_form_eight_taxation WHERE user_id = ?`;
		return runQuery(pool, query, Number(data.id));
	},

	getContactList: (pool) => {
		var query = `SELECT feu_mobileNo as mobile FROM ps_form_eight_user WHERE feu_mobileNo <> '-'`;
		return runQuery(pool, query);
	},
	getFromEightTaxTotalData: (pool, data) => {
		var query = `SELECT * FROM ps_form_eight_total_taxation WHERE user_id = ?`;
		return runQuery(pool, query, data.id);
	},
	removeSingleTaxSample: (pool, data) => {
		var query =
			'DELETE FROM ps_form_eight_taxation WHERE user_id = ? AND id =?';
		return runQuery(pool, query, [
			Number(data.id),
			Number(data.remove_tax_id)
		]);
	},
	cleanFormEightTotalTaxation: (pool, user_id) => {
		var query =
			'DELETE FROM ps_form_eight_total_taxation WHERE user_id = ? ';
		return runQuery(pool, query, [user_id]);
	},
	getNextUserId: (pool, data) => {
		var query = `SELECT id FROM ps_form_eight_user WHERE id > ? ORDER BY id ASC LIMIT 1 `;
		return runQuery(pool, query, [Number(data.id)]);
	},

	getNextUserByMalmatta: (pool, data) => {
		const malmattaInput = String(data.malmattaNumber || '');
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

		return runQuery(pool, q, [mainPart, mainPart, subPart]);
	},

	getCheckMalmattaDetailsDuplicateOrOblique: (pool, data) => {
		var query = `SELECT id FROM ps_form_eight_user WHERE feu_malmattaNo = ? LIMIT 1`;
		return runQuery(pool, query, [data.mNumber]);
	},

	getLastUserId: (pool) => {
		var query = `SELECT id,feu_malmattaNo as malmattaNo  FROM ps_form_eight_user ORDER BY id DESC LIMIT 1`;
		return runQuery(pool, query);
	},
	getAarogyaDivaKarList: (pool) => {
		var query = `SELECT * FROM ps_arogya_diva_kar`;
		return runQuery(pool, query);
	},

	saveNewTotalTaxDetails: (pool, data) => {
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
                ) VALUES (?)`;

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
			data.created_date
		];
		console.log(insertData, '262 line model');
		return runQuery(pool, query, [insertData]);
	},

	saveNewFormEightDetails: (pool, data) => {
		var insert_array = [];
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
                ) VALUES (?)`;

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
			data.waterTax
		];
		return runQuery(pool, query, [insert_array]);
	},

	updateNewFormEightHomeImage: (pool, data) => {
		var insert_array = [];
		var query = `UPDATE ps_form_eight_user SET feu_image = ? WHERE id=?`;
		return runQuery(pool, query, [data.feu_image, Number(data.id)]);
	},

	updateNewFormEightMapImage: (pool, data) => {
		var insert_array = [];
		var query = `UPDATE ps_form_eight_user SET feu_image_map=? WHERE id=?`;
		return runQuery(pool, query, [data.feu_image_map, Number(data.id)]);
	},

	updateNewFormEightCatalogImage: (pool, data) => {
		var insert_array = [];
		var query = `UPDATE ps_form_eight_user SET feu_image = ?,feu_image_map=? WHERE id=?`;
		return runQuery(pool, query, [
			data.feu_image,
			data.feu_image_map,
			Number(data.id)
		]);
	},

	// 	getOldFerfarData: (pool, id) => {
	//     let query = `SELECT
	//                   feu_newOldDharak,
	//                   feu_newNewDharak
	//                   FROM
	//                   ps_form_eight_user
	//                   WHERE
	//                   id= ?`;
	//     return runQuery(pool, query, Number(id));;
	//   	},
	getDastavejDetails: (pool) => {
		let query = `SELECT 
                    gp_dastavegList
                  FROM 
                    ps_gram_panchayet`;
		return runQuery(pool, query);
	},
	getFerfarDetails: (pool, malmattaNumber) => {
		let query = `SELECT 
								* 
							FROM
								ps_form_eight_user
							WHERE 
								feu_malmattaNo = ? 
							LIMIT 1`;
		return runQuery(pool, query, malmattaNumber);
	},
	getOldOwnerList: (pool, id) => {
		let query = `SELECT 
                    *
                  FROM 
                    ps_ferfar
                  WHERE 
                    user_id = ?`;
		return runQuery(pool, query, Number(id));
	},
	updateFerfarDetails: (pool, data) => {
		let query = `INSERT INTO
                    ps_ferfar (user_id,
                                feu_malmatta_no,
                                feu_new_owner,
                                feu_old_owner,
                                tharav_no,
                                dastavej,
                                ferfar_date, 
                                registry_no)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
		let insertData = [
			data.userId,
			data.newMalmattaNo,
			data.newNewDharak,
			data.newOldDharak,
			data.newPherfarTharav,
			data.newPherfarDocument,
			data.newPherfarDate,
			data.registry_no
		];
		return runQuery(pool, query, insertData);
	},
	updateFerfarByUserId: (pool, data) => {
		const query = `
				UPDATE ps_ferfar
				SET
					feu_malmatta_no = ?,
					feu_new_owner = ?,
					feu_old_owner = ?,
					tharav_no = ?,
					dastavej = ?,
					ferfar_date = ?,
					registry_no = ?
				WHERE
					user_id = ?;
			`;
		return runQuery(pool, query, [
			data.newMalmattaNo,
			data.newNewDharak,
			data.newOldDharak,
			data.newPherfarTharav,
			data.newPherfarDocument,
			data.newPherfarDate,
			data.registry_no || '',
			Number(data.userId || data.id)
		]);
	},

	saveEditedFerfar: (pool, data) => {
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
      `;

		return runQuery(pool, query, [
			data.userId,
			data.newNewDharak,
			data.newOldDharak,
			data.newPherfarTharav,
			data.newPherfarDocument,
			data.newPherfarDate,
			data.registry_no,
			data.newMalmattaNo
		]);
	},
	getFerfarAvahalMonths: (pool, year) => {
		const query = `SELECT DISTINCT SUBSTRING(ferfar_date, 1, 2) AS distinct_month
      FROM ps_ferfar
      WHERE ferfar_date LIKE CONCAT('%/', ?)`;

		return runQuery(pool, query, [year]);
	},

	form8FerfarAvahalPrintDetails: (pool, year, month) => {
		let query;

		if (month === undefined || month == null || !month) {
			query = `
						SELECT 
							t1.*,
							t2.*,
                            t1.ferfar_date AS _ferfar_date,
							DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y'), '%d/%m/%Y') as ferfar_date
						FROM 
							ps_ferfar as t1 
						INNER JOIN 
							ps_form_eight_user as t2 
						ON 
							t1.feu_malmatta_no = t2.feu_malmattaNo 
						WHERE 
							t1.ferfar_date LIKE ?`;
			// params = ;
			const likePattern = `%/${year}`; // matches any day/month in that year
			return runQuery(pool, query, [likePattern]);
		} else {
			query = `
        			SELECT 
						t1.*,
						t2.*,
                        t1.ferfar_date AS _ferfar_date,
						DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y'), '%d/%m/%Y') as ferfar_date
						 FROM 
						ps_ferfar as t1 
        			INNER JOIN 
						ps_form_eight_user as t2 
         			ON 
						t1.feu_malmatta_no = t2.feu_malmattaNo 
         			WHERE 
						t1.ferfar_date LIKE ?`;
			const monthStr = month.toString().padStart(2, '0'); // ensure 2 digits
			const likePattern = `%/${monthStr}/${year}`; // matches any day in that month/year
			// params = ;
			return runQuery(pool, query, [likePattern]);
		}
	},

	form8FerfarAvahalPrintDateToDateDetails: (pool, date_from, date_to) => {
		const query = `SELECT 
								t1.*,
								t2.*,
								DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y'), '%d/%m/%Y') as ferfar_date
							FROM ps_ferfar AS t1 
							INNER JOIN 
								ps_form_eight_user AS t2 
							ON 
								t1.feu_malmatta_no = t2.feu_malmattaNo 
							WHERE 
								STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y') 
								BETWEEN STR_TO_DATE(?, '%d/%m/%Y') AND STR_TO_DATE(?, '%d/%m/%Y')
							ORDER BY 
								STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y') ASC;`;

		return runQuery(pool, query, [date_from, date_to]);
	},

	form8FerfarAvahalPrintFinancialYearDetails: (pool, fromYear, toYear) => {
		const query = `SELECT 
								t1.*,
								t2.*,
								DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y'), '%d/%m/%Y') as ferfar_date
							FROM ps_ferfar AS t1 
							INNER JOIN 
								ps_form_eight_user AS t2 
							ON 
								t1.feu_malmatta_no = t2.feu_malmattaNo 
							WHERE 
								STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y') 
								BETWEEN STR_TO_DATE(?, '%d/%m/%Y') AND STR_TO_DATE(?, '%d/%m/%Y')
							ORDER BY 
								STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y') ASC;`;
		const startDate = `01/04/${fromYear}`;
		const endDate = `31/03/${toYear}`;
		return runQuery(pool, query, [startDate, endDate]);
	},
	fetchDataToEdit: (pool, malmattaNumber) => {
		const query = `
					SELECT 
						t1.*,
						DATE_FORMAT(STR_TO_DATE(t1.ferfar_date, '%d/%m/%Y'), '%d/%m/%Y') AS ferfar_date,
						t2.* 
					FROM 
						ps_ferfar AS t1 
					INNER JOIN 
						ps_form_eight_user AS t2 
					ON 
						t1.feu_malmatta_no = t2.feu_malmattaNo 
					AND 
						t1.feu_malmatta_no = ?`;

		return runQuery(pool, query, [malmattaNumber]);
	},

	//BASIS OF MONTH AND YEAR
	deleteFerfarAvahal: (pool, month, year) => {
		const query =
			month !== undefined && month !== null
				? `DELETE  FROM ps_ferfar 
          WHERE 
          ferfar_date LIKE CONCAT(? ,'/%', '/', ?)`
				: `DELETE  FROM ps_ferfar 
          WHERE 
          ferfar_date LIKE CONCAT('%', '/', ?)`;

		if (month !== undefined && month !== null) {
			return runQuery(pool, query, [month, year]);
		} else {
			return runQuery(pool, query, [year]);
		}
	},

	//DATE TO DATE
	deleteFerfarAvahalDateToDate: (pool, date_from, date_to) => {
		const query = `
      DELETE FROM ps_ferfar
      WHERE STR_TO_DATE(ferfar_date, '%d/%m/%Y') 
      BETWEEN STR_TO_DATE(?, '%d/%m/%Y') AND STR_TO_DATE(?, '%d/%m/%Y');
      `;

		return runQuery(pool, query, [date_from, date_to]);
	},

	updateFormEight: (pool, data) => {
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
                    id = ?`;
		let insertData = [
			data.newDharakAadhar,
			data.newNewDharak,
			data.newMobileNo,
			data.newOldDharak,
			data.newNewDharak,
			data.newPherfarDate,
			data.newPherfarTharav,
			data.newPherfarDocument,
			Number(data.userId)
		];
		return runQuery(pool, query, insertData);
	},
	updateFormEightDforetails: (pool, data) => {
		console.log(data, 'updatedata');
		console.log(data.id);
		console.log(Number(data.id));
		var update_array = [];
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
                    WHERE id = ?`;

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
			Number(data.id)
		];
		return runQuery(pool, query, update_array);
	},

	getFerfarYears: (pool) => {
		const query = `SELECT DISTINCT ferfar_date FROM ps_ferfar`;
		return runQuery(pool, query, []);
	},

	updateFormEightDetails: (pool, data) => {
		var update_array = [];
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
                    WHERE id = ?`;

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
			Number(data.id)
		];
		return runQuery(pool, query, update_array);
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

				WHERE id = ?	`;
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
		]);
	},

	saveNewTaxDetails: (pool, data) => {
		var insert_array = [];
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
                ) VALUES (?)`;

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
			myDates.getDate()
		];
		return runQuery(pool, query, [insert_array]);
	},
	checkAuth: (pool, data) => {
		var query = `SELECT * FROM ps_gram_panchayet 
                    WHERE  user_name = ? LIMIT 1`;
		return runQuery(pool, query, [data.userName]);
	},

	getNagrikCount: (pool) => {
		var query = `SELECT  COUNT(*) as member_count FROM ps_gp_member_list`;
		return runQuery(pool, query);
	},
	userCheckAuth: (pool, data) => {
		var query = `SELECT id,fName,fAadhar,fMobile,fEmail,fImage,fVillage,DATE_FORMAT(fDob,'%d-%m-%Y') as fDob  FROM ps_gp_member_list 
                    WHERE  fMobile = ? AND fPassword =? LIMIT 1`;
		return runQuery(pool, query, [data.username, data.password]);
	},

	verifyUserDetails: (pool, data) => {
		var query = `SELECT * FROM ps_form_eight_user WHERE TRIM(feu_malmattaNo)=? AND TRIM(feu_aadharNo)=? LIMIT 1`;
		return runQuery(pool, query, [data.malmatta_no, data.aadhar_no]);
	},
	getUserDetails: (pool, data) => {
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
                    WHERE  id=? LIMIT 1`;
		return runQuery(pool, query, [data.id]);
	},

	getGpCount: function (pool) {
		let query = `SELECT * FROM ps_sub_village`;
		return runQuery(pool, query);
	},

	getVideoGalleryData: (pool) => {
		var query = `SELECT * FROM ps_video_gallery`;
		return runQuery(pool, query);
	},
	getGramAhavalDocuments: (pool) => {
		var query = `SELECT * FROM ps_gram_ahaval_documents`;
		return runQuery(pool, query);
	},

	getGpData: async function (pool) {
		var query = `SELECT * FROM ps_gram_panchayet LIMIT 1`;

		const cacheKey = gpDataRedisKey;

		const cachedGpData = await getRedisData(cacheKey);
		if (cachedGpData) {
			return cachedGpData;
		}
		// let [_gp] = await db.query(query)
		let _gp = await runQuery(pool, query);
		return _gp;
	},

	getMeterDetails: (pool) => {
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
							FROM ps_meter_bill_list`;

		return runQuery(pool, query);
	},
	getGpSiteData: (pool) => {
		var query = `SELECT gps_name as site_name,gps_site as site_url FROM ps_gp_sites`;
		return runQuery(pool, query);
	},
	formEightUser: (pool, data) => {
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
                        home_image_latitude
                    FROM ps_form_eight_user as feu
                        INNER JOIN 
                        ps_gharkul_yojna as gy 
                        ON gy.id  = feu.feu_gharkulYojna 
                    WHERE  feu.id = ?`;
		return runQuery(pool, query, Number(data.id));
	},
	getBahandkamPrakarList: (pool) => {
		var query = `SELECT 
                      id,
                      bp_type as text,
                      bp_ready_nakar_rate as ready_nakar_rate,
                      bp_tax_rate as tax_rate,
                      bp_pd_id as pd_id
                    FROM ps_bahandkam_prakar`;
		return runQuery(pool, query);
	},
	getGhasaraRateList: (pool) => {
		var query = `SELECT  * FROM ps_ghasara_rate`;
		return runQuery(pool, query);
	},
	getPropertyDesc: (pool) => {
		var query = `SELECT 
                      id,
                      pd_name as text,
                      pd_rate as rate
                    FROM ps_property_desc`;
		return runQuery(pool, query);
	},
	getPropertySpecification: (pool) => {
		var query = `SELECT 
                      id,
                      ps_name as text,
                      ps_land_rate as lnd_rate,
                      ps_pd_id as pd_id,
                      ps_skeep_tax as skeep_tax,
                      ps_skip_diwa_arogya
                    FROM ps_property_specification 	`;
		return runQuery(pool, query);
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
			gp: {}
		};
		var _this = this;

		_this
			.getGpData(pool)
			.then((result) => {
				sendData.gp = result[0];
				return _this.formEightUser(pool, data);
			})
			.then((result) => {
				if (result.length == 0) {
					callback(true, { call: 2 });
					return 999;
				} else {
					sendData.user = result[0];
					sendData.jsUser = JSON.stringify(result);
					return _this.getBahandkamPrakarList(pool);
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.bahandkamPrakar = JSON.stringify(result);
					return _this.getPropertyDesc(pool);
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.propertyDesc = JSON.stringify(result);
					return _this.getPropertySpecification(pool);
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.propertySpecification = JSON.stringify(result);
					return _this.getGhasaraRateList(pool);
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.ghasaraRate = JSON.stringify(result);
					return _this.getAarogyaDivaKarList(pool);
				}
			})
			.then((result) => {
				if (result !== 999) {
					sendData.arogyaDivaKar = JSON.stringify(result);
					callback(true, { call: 1, data: sendData });
				}
			})
			.catch((error) => {
				callback(false, { call: 0, data: error });
			});
	},
	getUserInfo: (pool, data) => {
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
                      `;
				var d = [`${data.q}%`];
				break;
			case 2:
				var query = `SELECT 
                          feu.id as id ,
                          feu_malmattaNo as label,
                          feu_malmattaNo,
                          feu_ownerName
                          FROM ps_form_eight_user as feu 
                        WHERE 
                        feu_malmattaNo LIKE ? LIMIT 10
                        `;
				var d = [`${data.q}%`];
				break;
			case 4:
				var query = `SELECT 
                        feu.id as id ,
                        feu_ownerName as label,
                        feu_malmattaNo,
                        feu_ownerName
                        FROM ps_form_eight_user as feu 
                      WHERE 
                        feu_secondOwnerName LIKE ? LIMIT 10`;
				var d = [`${data.q}%`];

				break;
			default:
				var query = `SELECT 
                            feu.id as id ,
                            feu.id as label,
                            feu_malmattaNo,
                            feu_ownerName
                            FROM ps_form_eight_user as feu 
                          WHERE 
                            id = ? LIMIT 10
                          `;
				var d = [Number(data.q)];
				break;
		}

		return runQuery(pool, query, d);
	},

	getTotalPrintFormEightUser: (pool, y1, y2) => {
		let query = `SELECT 
                      COUNT(ps_form_eight_user.id) as total_user
                      
                      FROM  
                      ps_form_eight_user inner join ps_gharkul_yojna 
                      on ps_form_eight_user.feu_gharkulYojna = ps_gharkul_yojna.id`;
		return runQuery(pool, query);
	},

	printFormEightUser: (pool, y1, y2, tp, p) => {
		let page = p * tp;
		let tcount = tp;
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
                      limit ${page}, ${tcount}`;
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
                    limit ${page}, ${tcount}`;

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
				
                    limit ${page}, ${tcount}`;

		return runQuery(pool, query3);
	},
	printFormEightUserLimit: function (pool, y1, y2, tp, p, filters = {}) {
		let where = [];
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
                    limit ${p * tp}, ${tp}`;

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
                    limit ${p * tp}, ${tp}`;

		//Added later in query2 below details -29/12/2024

		// fet_bahandkam_prakar_text,
		// fet_year_two,

		//LEFT JOIN
		// ps_form_eight_taxation
		// ON
		// eight_user.id =  ps_form_eight_taxation.user_id

		if (filters.property_type === 'open_plot') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                            COUNT(*) > 0
                            AND SUM(fet_prop_desc NOT IN (5,6)) = 0
                    )
            `);
		} else if (filters.property_type === 'nivasi') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                        SUM(fet_prop_desc = 1) > 0
                        AND SUM(fet_prop_desc NOT IN (1,5,6)) = 0
                )
            `);
		} else if (filters.property_type === 'audhyogik') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                        SUM(fet_prop_desc = 3) > 0
                        AND SUM(fet_prop_desc NOT IN (3,5,6)) = 0
                )
            `);
		} else if (filters.property_type === 'vanijya') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                        SUM(fet_prop_desc IN (2,4)) > 0
                        AND SUM(fet_prop_desc NOT IN (2,4,5,6)) = 0
                )
            `);
		}

		let whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

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

                            ${whereClause}
        
                            GROUP BY eight_user.id
                            ORDER BY 
                            CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL),
                            IF(LOCATE('/', feu_malmattaNo), 
                            CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL), 
                            NULL)
                            limit ${p * tp}, ${tp}`;

		return runQuery(pool, query3);
	},

	printFormEightUserLimitOne: (pool) => {
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

		return runQuery(pool, q);
	},

	getForm8UserCount: (pool, filters = {}) => {
		let { property_type } = filters;
		let where = [];

		/*
        open_plot
        nivasi
        audhyogik
        vanijya
        */

		if (property_type === 'open_plot') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                        COUNT(*) > 0
                        AND SUM(fet_prop_desc NOT IN (5,6)) = 0
                )
            `);
		} else if (property_type === 'nivasi') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                        SUM(fet_prop_desc = 1) > 0
                        AND SUM(fet_prop_desc NOT IN (1,5,6)) = 0
                )
            `);
		} else if (property_type === 'audhyogik') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                        SUM(fet_prop_desc = 3) > 0
                        AND SUM(fet_prop_desc NOT IN (3,5,6)) = 0
                )
            `);
		} else if (property_type === 'vanijya') {
			where.push(`
                eight_user.id IN (
                    SELECT user_id
                    FROM ps_form_eight_taxation
                    GROUP BY user_id
                    HAVING
                        SUM(fet_prop_desc IN (2,4)) > 0
                        AND SUM(fet_prop_desc NOT IN (2,4,5,6)) = 0
                )
            `);
		}

		let whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

		let originalQuery = `SELECT COUNT(DISTINCT eight_user.id) as totalUsers
                    FROM ps_form_eight_user AS eight_user
                        INNER JOIN ps_gharkul_yojna AS gharkul_yojna 
                    ON eight_user.feu_gharkulYojna = gharkul_yojna.id
                        LEFT JOIN ps_ferfar AS ferfar 
                    ON eight_user.id = ferfar.user_id
                        LEFT JOIN ps_form_eight_taxation
                    ON eight_user.id = ps_form_eight_taxation.user_id;
                    `;
		let filterSupportQuery = `
            SELECT COUNT(DISTINCT eight_user.id) AS totalUsers

            FROM ps_form_eight_user AS eight_user

            INNER JOIN ps_gharkul_yojna AS gharkul_yojna 
                ON eight_user.feu_gharkulYojna = gharkul_yojna.id

            LEFT JOIN ps_ferfar AS ferfar 
                ON eight_user.id = ferfar.user_id

            LEFT JOIN ps_form_eight_taxation
                ON eight_user.id = ps_form_eight_taxation.user_id

            ${whereClause}
        `;
		return runQuery(pool, filterSupportQuery);
	},
	printGetFromEightTaxTotalData: (pool) => {
		var query = `SELECT * FROM ps_form_eight_total_taxation`;
		return runQuery(pool, query);
	},
	printGetFromEightTaxSampleData: (pool) => {
		var query = `SELECT * FROM ps_form_eight_taxation`;
		return runQuery(pool, query);
	},
	checkDuplicateMember: function (pool, data) {
		let q = `SELECT
                  *
                FROM ps_gp_member_list WHERE fAadhar = ? OR fMobile = ?`;

		return runQuery(pool, q, [data.fAadhar, data.fMobile]);
	},

	checkDuplicateMemberByAadharOnly: (pool, aadharNo) => {
		return runQuery(
			pool,
			`SELECT * FROM ps_gp_member_list WHERE fAadhar = ?;`,
			[aadharNo]
		);
	},

	checkDuplicateMemberByMobileOnly: (pool, mobileNo) => {
		return runQuery(
			pool,
			`SELECT * FROM ps_gp_member_list WHERE fMobile = ?;`,
			[mobileNo]
		);
	},

	getGpPopleList: (pool) => {
		var query = `SELECT * FROM ps_gp_member_list`;
		return runQuery(pool, query);
	},
	getTodaysBirthday: (pool) => {
		let date = new Date();
		date =
			date.getFullYear() +
			'-' +
			(date.getMonth() + 1) +
			'-' +
			date.getDate();

		let query = `SELECT fName,fImage FROM ps_gp_member_list
                  WHERE
                  DATE_FORMAT(fDob, '%m-%d') = DATE_FORMAT('${date}','%m-%d')`;
		return runQuery(pool, query);
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

                ) VALUES (?)`;

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
			data.create_date || myDates.getDate()
		];
		return runQuery(pool, q, [insertData]);
	},
	getPreviousApplicationDate: function (pool, newApplicationData) {
		let q = `SELECT *,
                        DATE_FORMAT(create_date,'%d-%m-%Y') AS create_date 
                    FROM 
                        ps_user_application 
                    WHERE 
                        formAadhar = ?
                        AND is_deleted = 0`;
	},
	getNewApplicationPrint: (pool, data) => {
		var query = `SELECT
                      id,
                      formName, 
                      formMobile, 
                      formEmail,
                      formAddress, 
                      formAadhar,
                      docDetails,
                      DATE_FORMAT(create_date,'%d-%m-%Y') as create_date
                    FROM ps_user_application WHERE id = ? AND is_deleted = 0`;
		return runQuery(pool, query, [data]);
	},
	formEightExportDetails: (pool) => {
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
					   NULL) ASC`;
		return runQuery(pool, query);
	},
	getWebNoticeListOnHomePage: (pool) => {
		let query = `SELECT
                      id, 
                      wn_notice_name as notice,
                      wn_show as show_type,
                      DATE_FORMAT(created_date,"%d-%m-%Y") as date_1
                    FROM ps_web_notice
                    WHERE
                      wn_show = 1
                     ORDER BY id DESC 
                  `;
		return runQuery(pool, query);
	},
	getWebNoticeList: (pool) => {
		let query = `SELECT
                      id, 
                      wn_notice_name as notice,
                      wn_show as show_type,
                      DATE_FORMAT(created_date,"%d-%m-%Y") as date_1
                    FROM ps_web_notice ORDER BY id DESC
                  `;
		return runQuery(pool, query);
	},
	saveNewWebNotice: (pool, data) => {
		let query = `INSERT INTO ps_web_notice (
                      wn_notice_name,
                      created_date
                  ) VALUES (?)`;
		return runQuery(pool, query, [[data.webNoticeText, myDates.getDate()]]);
	},
	updateSiteSeen: (pool, data) => {
		let query = `UPDATE ps_gram_panchayet SET gp_site_count = ?`;
		return runQuery(pool, query, [Number(data.count)]);
	},
	updateVisibilityWebNotice: (pool, data) => {
		let query = `UPDATE ps_web_notice SET wn_show = ? WHERE id=?`;
		return runQuery(pool, query, [Number(data.v), Number(data.id)]);
	},
	getVillageName: (pool) => {
		let query = `SELECT gp_name as name FROM ps_sub_village`;
		return runQuery(pool, query);
	},
	deleteWebNotice: (pool, data) => {
		let query = `DELETE FROM ps_web_notice  WHERE id=?`;
		return runQuery(pool, query, [Number(data.id)]);
	},
	getMeterList: (pool) => {
		let query = `SELECT * FROM ps_meter_bill`;
		return runQuery(pool, query);
	},
	getUserMeterList: (pool) => {
		let query = `SELECT 
                    id,
                    mbl_nal_number,
                    mbl_valve_number,
                    mbl_user_name,
                    mbl_total_unit,
                    DATE_FORMAT(mbl_deyak_date,'%d-%m-%Y') as mbl_deyak_date,
                    DATE_FORMAT(mbl_deyak_amt_fill_last_date,'%d-%m-%Y') as mbl_deyak_amt_fill_last_date
                    FROM ps_meter_bill_list`;
		return runQuery(pool, query);
	},
	getUserMeterDetails: (pool, id) => {
		let query = `SELECT * FROM ps_meter_bill WHERE id=?`;
		return runQuery(pool, query, [Number(id)]);
	},
	lastMeterTaxDetails: (pool, id) => {
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
							FROM ps_meter_bill_list WHERE user_id= ? ORDER BY id DESC LIMIT 1`;
		return runQuery(pool, query, [Number(id)]);
	},
	getMeterRate: (pool) => {
		let query = `SELECT * FROM ps_meter_rates`;
		return runQuery(pool, query);
	},
	removeMeterBill: (pool, id) => {
		let query = `DELETE FROM ps_meter_bill_list WHERE id =?`;
		return runQuery(pool, query, [Number(id)]);
	},
	addMobileCertificate: (pool, data) => {
		var query = `INSERT INTO ps_certificate_mobile(
                    certificate_title,
                    certificate_id,
                    input_1,
                    input_2,
                    holder_id,
                    holder_name,
                    created_date) VALUES (?)`;
		var insertData = [
			data.certificate_title,
			data.certificate_id,
			data.input_1,
			data.input_2,
			data.holder_id,
			data.holder_name,
			myDates.getDate()
		];
		return runQuery(pool, query, [insertData]);
	},
	getMobileCertificate: function (pool, id) {
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
                    FROM ps_certificate_mobile WHERE holder_id=?`;
		return runQuery(pool, query, [id]);
	},
	getDashboardServiceStats: async function (pool) {
		const queries = {
			birthCert: `SELECT 
				COUNT(*) as total, 
				SUM(docRemark = 'ACCEPTED') as accepted, 
				SUM(docRemark = 'REJECTED') as rejected
				FROM ps_user_application WHERE is_deleted = 0 AND docDetails LIKE '%जन्म नोंद दाखला%'`,
			deathCert: `SELECT 
				COUNT(*) as total, 
				SUM(docRemark = 'ACCEPTED') as accepted, 
				SUM(docRemark = 'REJECTED') as rejected
				FROM ps_user_application WHERE is_deleted = 0 AND docDetails LIKE '%मृत्यू नोंद दाखला%'`,
			marriageCert: `SELECT 
				COUNT(*) as total, 
				SUM(docRemark = 'ACCEPTED') as accepted, 
				SUM(docRemark = 'REJECTED') as rejected
				FROM ps_user_application WHERE is_deleted = 0 AND docDetails LIKE '%विवाह नोंदणी दाखला%'`,
			namuna8Extract: `SELECT 
				COUNT(*) as total, 
				SUM(docRemark = 'ACCEPTED') as accepted, 
				SUM(docRemark = 'REJECTED') as rejected
				FROM ps_user_application WHERE is_deleted = 0 AND docDetails LIKE '%नमुना नं. 8 चा उतारा%'`,
			destituteCert: `SELECT 
				COUNT(*) as total, 
				SUM(docRemark = 'ACCEPTED') as accepted, 
				SUM(docRemark = 'REJECTED') as rejected
				FROM ps_user_application WHERE is_deleted = 0 AND docDetails LIKE '%निराधार असले बाबतचा दाखला%'`,
			noDuesCert: `SELECT 
				COUNT(*) as total, 
				SUM(docRemark = 'ACCEPTED') as accepted, 
				SUM(docRemark = 'REJECTED') as rejected
				FROM ps_user_application WHERE is_deleted = 0 AND docDetails LIKE '%ग्रामपंचायत येणे बाकी नसल्याचा दाखला%'`,
			bplCert: `SELECT 
				COUNT(*) as total, 
				SUM(docRemark = 'ACCEPTED') as accepted, 
				SUM(docRemark = 'REJECTED') as rejected
				FROM ps_user_application WHERE is_deleted = 0 AND docDetails LIKE '%दारिद्र्यरेषेखालचा दाखला%'`,
			employmentDemand: `SELECT 
				COUNT(*) as total, 
				SUM(registration_status = 'ACCEPTED') as accepted, 
				SUM(registration_status = 'REJECTED') as rejected
				FROM ps_individual_group_employment_demand_application`,
			complaint: `SELECT 
				COUNT(*) as total, 
				SUM(complaintStatus = 'ACCEPTED') as accepted, 
				SUM(complaintStatus = 'REJECTED') as rejected, 
				SUM(complaintStatus = 'RESOLVED') as resolved 
				FROM ps_citizen_complaints`,
			marriage: `SELECT 
				COUNT(*) as total, 
				SUM(application_status = 'ACCEPTED') as accepted, 
				SUM(application_status = 'REJECTED') as rejected
				FROM ps_marriage`,
			citizenReg: `SELECT 
				COUNT(*) as total, 
				COUNT(*) as accepted
				FROM ps_gp_member_list`,
			propertyMutation: `SELECT 
				COUNT(*) as total, 
				SUM(application_status = 'ACCEPTED') as accepted, 
				SUM(application_status = 'REJECTED') as rejected, 
				SUM(application_status = 'RESOLVED') as resolved 
				FROM ps_ferfar_applications`,
			construction: `SELECT 
				COUNT(*) as total, 
				SUM(application_status = 'ACCEPTED') as accepted, 
				SUM(application_status = 'REJECTED') as rejected, 
				SUM(application_status = 'RESOLVED') as resolved 
				FROM ps_construction_applications`,
			jobCard: `SELECT 
				COUNT(*) as total, 
				SUM(registration_status = 'ACCEPTED') as accepted, 
				SUM(registration_status = 'REJECTED') as rejected
				FROM ps_job_cards`,
			toSeva: `SELECT 
				COUNT(*) as total, 
				SUM(registration_status = 'ACCEPTED') as accepted, 
				SUM(registration_status = 'REJECTED') as rejected
				FROM ps_tahsil_office_seva`,
			occupationNoc: `SELECT 
				COUNT(*) as total, 
				SUM(application_status = 'ACCEPTED') as accepted, 
				SUM(application_status = 'REJECTED') as rejected
				FROM ps_occupation_noc`
		};

		let result = {};
		for (let key in queries) {
			try {
				const rows = await runQuery(pool, queries[key]);
				if (rows && rows.length > 0) {
					let item = { total: rows[0].total || 0 };
					if (rows[0].accepted !== undefined)
						item.accepted = rows[0].accepted || 0;
					if (rows[0].rejected !== undefined)
						item.rejected = rows[0].rejected || 0;
					if (rows[0].resolved !== undefined)
						item.resolved = rows[0].resolved || 0;
					result[key] = item;
				} else {
					result[key] = { total: 0 };
				}
			} catch (err) {
				console.error(
					`Error fetching stats for ${key}: ${err.message}`
				);
				result[key] = { total: 0 };
			}
		}

		// Add deeper bifurcation for occupationNoc
		try {
			const nocDetailsRows = await runQuery(
				pool,
				`
				SELECT 
					subject_code, 
					COUNT(*) as total, 
					SUM(application_status = 'ACCEPTED') as accepted, 
					SUM(application_status = 'REJECTED') as rejected 
				FROM ps_occupation_noc 
				GROUP BY subject_code
			`
			);
			if (nocDetailsRows && nocDetailsRows.length > 0) {
				result['occupationNoc'].details = nocDetailsRows.map((row) => ({
					subject: row.subject_code
						? row.subject_code
								.replace(/_NOC$/, '')
								.replace(/_/g, ' ')
						: 'इतर',
					total: row.total || 0,
					accepted: row.accepted || 0,
					rejected: row.rejected || 0
				}));
			}
		} catch (err) {
			console.error(
				`Error fetching detailed stats for occupationNoc: ${err.message}`
			);
		}

		// Add deeper bifurcation for toSeva (tahsil office seva)
		try {
			const toSevaDetailsRows = await runQuery(
				pool,
				`
				SELECT 
					subject, 
					COUNT(*) as total, 
					SUM(registration_status = 'ACCEPTED') as accepted, 
					SUM(registration_status = 'REJECTED') as rejected 
				FROM ps_tahsil_office_seva 
				GROUP BY subject
			`
			);
			if (toSevaDetailsRows && toSevaDetailsRows.length > 0) {
				result['toSeva'].details = toSevaDetailsRows.map((row) => ({
					subject: row.subject ? row.subject : 'इतर',
					total: row.total || 0,
					accepted: row.accepted || 0,
					rejected: row.rejected || 0
				}));
			}
		} catch (err) {
			console.error(
				`Error fetching detailed stats for toSeva: ${err.message}`
			);
		}

		return result;
	}
};

module.exports = HomeModel;
