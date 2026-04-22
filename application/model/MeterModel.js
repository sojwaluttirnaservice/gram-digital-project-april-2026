var responderSet = require('../config/_responderSet')
let myDates = responderSet.myDate
module.exports = {
	getMeterUserListList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_property_desc`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	existingEntryForMonths: (pool, data, isUpdate = false) => {
		return new Promise((resolve, reject) => {
			const q = `
					SELECT 

                DATE_FORMAT(mbl_water_usage_from, '%Y-%m-%d') AS _mbl_water_usage_from_full,
                DATE_FORMAT(mbl_water_usage_to, '%Y-%m-%d') AS _mbl_water_usage_to_full
					FROM ps_meter_bill_list
					WHERE 
						(
							YEAR(CAST(mbl_water_usage_to AS DATE)) < YEAR(CAST(? AS DATE))
							OR (YEAR(CAST(mbl_water_usage_to AS DATE)) = YEAR(CAST(? AS DATE)) AND MONTH(CAST(mbl_water_usage_to AS DATE)) <= MONTH(CAST(? AS DATE)))
						)
						AND user_id = ? ${isUpdate ? 'AND id != ?' : ''};
				`

			const dataArr = [
				data.mbl_water_usage_from,
				data.mbl_water_usage_from,
				data.mbl_water_usage_from,

				data.user_id,
				data.id,
			]

			pool.query(q, dataArr, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	saveNewMeterUser: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_meter_bill
                    (mb_owner_name,
                    mb_owner_mobile,
                    mb_owner_address,
                    mb_nal_connection_no,
                    mb_meter_connection_no,
                    mb_wall_number,
                    mb_owner_number,
                    mb_zone_number)
                    VALUES (?)`
			var insertData = [
				data.owner_name,
				data.owner_mobile,
				data.owner_address,
				data.nal_connection_no,
				data.meter_connection_no,
				data.wall_number,
				data.owner_number,
				data.mb_zone_number,
			]
			pool.query(query, [insertData], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updateNewMeterUser: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_meter_bill SET
                    mb_owner_name = ?,
                    mb_owner_mobile = ?,
                    mb_owner_address = ?,
                    mb_nal_connection_no = ?,
                    mb_meter_connection_no = ?,
                    mb_wall_number = ?,
                    mb_owner_number = ?,
                    mb_zone_number = ?
                  WHERE id = ?`
			var insertData = [
				data.owner_name,
				data.owner_mobile,
				data.owner_address,
				data.nal_connection_no,
				data.meter_connection_no,
				data.wall_number,
				data.owner_number,
				data.mb_zone_number,
				Number(data.id),
			]
			pool.query(query, insertData, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	saveNewMeterCatalog: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_meter_bill_list
                    (user_id,
                      mbl_nal_number,
                      mbl_meter_image,
                      mbl_deyak_number,
                      mbl_deyak_date,
                      mbl_amt_before_mudat,
                      mbl_deyak_amt_fill_last_date,
                      mbl_ward_number,
                      mbl_user_meter_number,
                      mbl_user_number,
                      mbl_nal_usage_type,
                      mbl_user_name,
                      mbl_user_mobile_no,
                      mbl_water_unit,
                      mbl_water_usage_from,
					  mbl_water_usage_to,
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
                      mbl_valve_number,
                      inserted_on)
                    VALUES (?)`
			var insertData = [
				data.user_id,
				data.mbl_nal_number,
				'',
				data.mbl_deyak_number,
				data.mbl_deyak_date,
				data.mbl_amt_before_mudat,
				data.mbl_deyak_amt_fill_last_date,
				data.mbl_ward_number,
				data.mbl_user_meter_number,
				data.mbl_user_number,
				data.mbl_nal_usage_type,
				data.mbl_user_name,
				data.mbl_user_mobile_no,
				data.mbl_water_unit,
				data.mbl_water_usage_from,
				data.mbl_water_usage_to,
				data.mbl_total_water_usage,
				data.mbl_meter_reading_start,
				data.mbl_meter_reading_end,
				data.mbl_total_unit,
				data.mbl_rate,
				data.mbl_water_amt,
				data.mbl_last_backlock,
				data.mbl_final_total_amt,
				data.mbl_before_date_amt_to_fill,
				data.mbl_after_date_amt_to_fill,
				data.mbl_amt_diposite_till_date,
				Number(data.mbl_valve_number),
				myDates.getDate(),
			]
			pool.query(query, [insertData], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateNewMeterCatalog: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE  ps_meter_bill_list
					SET
                    	user_id = ?,
                      mbl_nal_number = ?,
                      mbl_meter_image = ?,
                      mbl_deyak_number = ?,
                      mbl_deyak_date  = ?,
                      mbl_amt_before_mudat  = ?,
                      mbl_deyak_amt_fill_last_date  = ?,
                      mbl_ward_number  = ?,
                      mbl_user_meter_number  = ?,
                      mbl_user_number  = ?,
                      mbl_nal_usage_type  = ?,
                      mbl_user_name  = ?,
                      mbl_user_mobile_no  = ?,
                      mbl_water_unit  = ?,
                      mbl_water_usage_from  = ?,
					  mbl_water_usage_to  = ?,
                      mbl_total_water_usage  = ?,
                      mbl_meter_reading_start  = ?,
                      mbl_meter_reading_end  = ?,
                      mbl_total_unit  = ?,
                      mbl_rate  = ?,
                      mbl_water_amt  = ?,
                      mbl_last_backlock  = ?,
                      mbl_final_total_amt  = ?,
                      mbl_before_date_amt_to_fill  = ?,
                      mbl_after_date_amt_to_fill  = ?,
                      mbl_amt_diposite_till_date  = ?,
                      mbl_valve_number  = ?
                      
                    WHERE id = ?`
			var updateData = [
				data.user_id,
				data.mbl_nal_number,
				'',
				data.mbl_deyak_number,
				data.mbl_deyak_date,
				data.mbl_amt_before_mudat,
				data.mbl_deyak_amt_fill_last_date,
				data.mbl_ward_number,
				data.mbl_user_meter_number,
				data.mbl_user_number,
				data.mbl_nal_usage_type,
				data.mbl_user_name,
				data.mbl_user_mobile_no,
				data.mbl_water_unit,
				data.mbl_water_usage_from,
				data.mbl_water_usage_to,
				data.mbl_total_water_usage,
				data.mbl_meter_reading_start,
				data.mbl_meter_reading_end,
				data.mbl_total_unit,
				data.mbl_rate,
				data.mbl_water_amt,
				data.mbl_last_backlock,
				data.mbl_final_total_amt,
				data.mbl_before_date_amt_to_fill,
				data.mbl_after_date_amt_to_fill,
				data.mbl_amt_diposite_till_date,
				Number(data.mbl_valve_number),
				data.id,
			]
			pool.query(query, updateData, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	fetchDistinctMonthYear: (pool, startFrom = '', isDescending = false) => {
		return new Promise((resolve, reject) => {
			let q
			if (startFrom.trim() == '') {
				q = `SELECT DISTINCT DATE_FORMAT(mbl_water_usage_from, '%m/%Y') AS monthYear 
				FROM ps_meter_bill_list 
				ORDER BY mbl_water_usage_from ${isDescending ? 'DESC' : 'ASC'};`
			} else {
				q = `SELECT DISTINCT 
						DATE_FORMAT(mbl_water_usage_from, '%m/%Y') AS monthYear
					FROM ps_meter_bill_list 
						WHERE 
					DATE_FORMAT(mbl_water_usage_from, '%m/%Y') LIKE ?
					ORDER BY mbl_water_usage_from ${isDescending ? 'DESC' : 'ASC'};`
			}

			pool.query(q, [`${startFrom}%`], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getValveNumbers: (pool, valveNumber) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT DISTINCT 
						mbl_valve_number 
						FROM ps_meter_bill_list 
						WHERE 
						mbl_valve_number LIKE ?`

			pool.query(q, [`%${valveNumber}%`], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	removeMeterCatalog: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM ps_meter_bill_list WHERE user_id = ?`
			pool.query(query, [Number(data.user_id)], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateNewMeterCatalogImage: function (pool, data) {
		return new Promise((resolve, reject) => {
			var insert_array = []

			var query = `UPDATE ps_meter_bill_list SET mbl_meter_image = ? WHERE id=?`
			pool.query(
				query,
				[data.mbl_meter_image, Number(data.id)],
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
	getUserInfo: function (pool, id, searchMultiple = false) {
		return new Promise((resolve, reject) => {
			let q = ''
			if (!searchMultiple) {
				q = `SELECT * FROM ps_meter_bill WHERE id =? `
			} else {
				q = `SELECT * FROM ps_meter_bill WHERE CAST(id AS CHAR) LIKE ? ORDER BY id ASC LIMIT 7`
			}
			pool.query(q, searchMultiple ? [`%${id}%`] : [+id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getUserInfoByOwnerName: function (pool, name, searchMultiple = false) {
		return new Promise((resolve, reject) => {
			let q

			if (!searchMultiple) {
				q = `SELECT * FROM ps_meter_bill WHERE mb_owner_name = ? LIMIT 10`
			} else {
				q = `SELECT * FROM ps_meter_bill WHERE mb_owner_name REGEXP ? LIMIT 10`
			}

			pool.query(q, [searchMultiple ? `${name}` : name], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getUserInfoByNalConnectionNumber: function (
		pool,
		nal_connectio_no,
		searchMultiple
	) {
		return new Promise((resolve, reject) => {
			let q

			if (!searchMultiple) {
				q = `SELECT * FROM ps_meter_bill WHERE mb_nal_connection_no =? `
			} else {
				q = `SELECT * FROM ps_meter_bill WHERE CAST(mb_nal_connection_no AS CHAR) LIKE ? ORDER BY mb_nal_connection_no ASC LIMIT 7`
			}
			pool.query(
				q,
				searchMultiple ? [`%${nal_connectio_no}%`] : [+nal_connectio_no],
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

	getUserInfoByMeterNumber: function (
		pool,
		meter_connection_no,
		searchMultiple
	) {
		return new Promise((resolve, reject) => {
			let q = ''
			if (!searchMultiple) {
				q = `SELECT * FROM ps_meter_bill WHERE mb_meter_connection_no =? `
			} else {
				q =
					q = `SELECT * FROM ps_meter_bill WHERE CAST(mb_meter_connection_no AS CHAR) LIKE ? ORDER BY mb_meter_connection_no ASC LIMIT 7`
			}
			pool.query(
				q,
				searchMultiple ? [`%${meter_connection_no}%`] : [+meter_connection_no],
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

	//WAter connection/tap connnection

	saveTapConnection: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `INSERT INTO 
                  ps_tap_connection
                  (
                    name,
                    malmatta_no,
                    mobile,

                    tap_owner_number,
                    address,
                    valve_number,
					
                    last_special_water_tax,
					last_general_water_tax
                  )
                  VALUES (?)`

			const insertArray = [
				data.name,
				data.malmatta_no,
				data.mobile,
				data.tap_owner_number,
				data.address,
				data.valve_number,
				data.last_special_water_tax,
				data.last_general_water_tax,
			]
			pool.query(q, [insertArray], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateTapConnection: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `UPDATE 
                    ps_tap_connection
                SET 
                    name = ?,
                    malmatta_no =? ,
                    mobile = ?,

                    tap_owner_number =?,
                    address = ?,
                    valve_number =?,
					
                   last_special_water_tax =?,
                   last_general_water_tax =?
                  
                  WHERE id = ?`

			const updateArray = [
				data.name,
				data.malmatta_no,
				data.mobile,
				data.tap_owner_number,
				data.address,
				data.valve_number,
				data.last_special_water_tax,
				data.last_general_water_tax,
				data.id,
			]

			pool.query(q, updateArray, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateTapWaterTax: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `UPDATE 
                    ps_tap_connection
                SET 		
                   last_special_water_tax =?,
                   last_general_water_tax =?
                  
                  WHERE id = ?`

			const updateArray = [
				data.last_special_water_tax,
				data.last_general_water_tax,
				data.tap_connection_id,
			]

			pool.query(q, updateArray, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	tapConnectionList: (pool) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT * FROM  ps_tap_connection`
			pool.query(q, [], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getTapConnectionDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT * FROM  ps_tap_connection WHERE id = ?`
			pool.query(q, [id], (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	saveMeterTaxDetails: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `UPDATE ps_meter_bill_list
				SET
					mbl_payment_date = ?,
					mbl_amount_paid = ?,
					mbl_is_fine_relief_given = ?,
					mbl_is_payment_done = ?,
					mbl_amount_payable = ?
					
				WHERE 
					id = ?`

			const updateArray = [
				data.mbl_payment_date,
				data.mbl_amount_paid,
				data.mbl_is_fine_relief_given,
				1,
				data.mbl_amount_payable,
				data.id,
			]
			pool.query(q, updateArray, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	existingLastMeterPaymentRecords: (pool, data) => {
		// console.log(data)
		return new Promise((resolve, reject) => {
			const q = `
	SELECT * 
	FROM ps_meter_tax_payment_record
	WHERE 
		user_id = ?
		AND 
		MONTH(water_usage_from_date) = MONTH(STR_TO_DATE(?, '%Y-%m-%d'))
		AND 
		YEAR(water_usage_from_date) = YEAR(STR_TO_DATE(?, '%Y-%m-%d'))
		AND 
		MONTH(water_usage_to_date) = MONTH(STR_TO_DATE(?, '%Y-%m-%d'))
		AND 
		YEAR(water_usage_to_date) = YEAR(STR_TO_DATE(?, '%Y-%m-%d'))
	ORDER BY 
		id DESC 
	LIMIT 1
`

			pool.query(
				q,
				[
					data.user_id,
					data.mbl_water_usage_from,
					data.mbl_water_usage_from,
					data.mbl_water_usage_to,
					data.mbl_water_usage_to,
				],
				(error, result) => {
					error ? reject(error) : resolve(result)
				}
			)
		})
	},

	saveNewMeterPaymentRecord: (pool, data, previousLastRecord) => {
		return new Promise((resolve, reject) => {
			const q = `INSERT INTO ps_meter_tax_payment_record
			
						(
							user_id,
							water_usage_from_date,
							water_usage_to_date,

							amount_paid,
							amount_payable,
							payment_date,

							payment_mode,
							payment_details,
							unpaid_amount
						)
						VALUES
						(?)`

			console.log('first')

			// console.log(previousLastRecord ? previousLastRecord?.amount_paid : 0)
			console.log('second')
			const insertArray = [
				data.user_id,
				data.water_usage_from_date,
				data.water_usage_to_date,

				data.amount_paid,
				data.mbl_amount_payable,
				data.mbl_payment_date,

				data.payment_mode,
				data.payment_details,

				+data.mbl_amount_payable -
					(+data.mbl_amount_paid +
						(typeof previousLastRecord != 'undefined' &&
						previousLastRecord != undefined
							? +previousLastRecord.amount_paid
							: 0)),
			]

			console.log(insertArray)
			// return;
			pool.query(q, [insertArray], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getNextIdDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT *
						FROM ps_meter_bill
							WHERE id > ?
						ORDER BY id
							LIMIT 1;
						`

			pool.query(q, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
}
