const bleachingModel = {
	getPreviousKarVasuliAvahalData: function (pool, month, year) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *,
                DATE_FORMAT(date_from, '%d/%m/%Y') AS _date_from,
                    DATE_FORMAT(date_to, '%d/%m/%Y') AS _date_to
                     FROM ps_bleaching_ahaval WHERE month = ? AND  year = ?`

			pool.query(query, [month, year], function (err, result) {
				return err ? reject(err) : resolve(result)
			})
		})
	},

	getPreviousLatestBleachingData: (pool) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT *,
                    DATE_FORMAT(date_from, '%d/%m/%Y') AS _date_from,
                    DATE_FORMAT(date_to, '%d/%m/%Y') AS _date_to
                         FROM ps_bleaching_ahaval WHERE (month, year) = 
                    (
                        SELECT month, year FROM ps_bleaching_ahaval
                        ORDER BY year DESC,  month DESC
                        LIMIT 1
                    )`

			pool.query(q, [], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
	postBleachingAvahal: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO ps_bleaching_ahaval 
                    ( date_from,
                    date_to,
                    gp_name,
                    village_name,
                    total_public_well_count,
                    cleaned_well_count,
                    well_cleaning_day,
                    well_cleaner_name,
                    hudda,
                    well_cleaning_shera,
                    month_start_quantity,
                    month_purchased_quantity,
                    current_month_used_quantity,
                    month_last_remaining_quantity,
                    bleaching_storage_shera,
                    month,
                    year )
                    VALUES (?)`

			let insertArray = [
				data.date_from,
				data.date_to,
				data.gp_name,
				data.village_name,
				data.total_public_well_count,
				data.cleaned_well_count,
				data.well_cleaning_day,
				data.well_cleaner_name,
				data.hudda,
				data.well_cleaning_shera,
				data.month_start_quantity,
				data.month_purchased_quantity,
				data.current_month_used_quantity,
				data.month_last_remaining_quantity,
				data.bleaching_storage_shera,
				data.month,
				data.year,
			]

			pool.query(query, [insertArray], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateBleachingAvahal: function (pool, data, id) {
		console.log('Idk but iam updating')
		return new Promise((resolve, reject) => {
			let query = `UPDATE ps_bleaching_ahaval 
                  SET 
                    date_from = ?,
                    date_to = ?,
                    gp_name = ?,
                    village_name = ?,
                    total_public_well_count = ?,
                    cleaned_well_count = ?,
                    well_cleaning_day = ?,
                    well_cleaner_name = ?,
                    hudda = ?,
                    well_cleaning_shera = ?,
                    month_start_quantity = ?,
                    month_purchased_quantity = ?,
                    current_month_used_quantity = ?,
                    month_last_remaining_quantity = ?,
                    bleaching_storage_shera = ?
                  WHERE
                    id = ? AND
                    month = ? AND
                    year = ?`

			let updateArray = [
				data.date_from,
				data.date_to,
				data.gp_name,
				data.village_name,
				data.total_public_well_count,
				data.cleaned_well_count,
				data.well_cleaning_day,
				data.well_cleaner_name,
				data.hudda,
				data.well_cleaning_shera,
				data.month_start_quantity,
				data.month_purchased_quantity,
				data.current_month_used_quantity,
				data.month_last_remaining_quantity,
				data.bleaching_storage_shera,
				id,
				data.month,
				data.year,
			]

			pool.query(query, updateArray, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	checkAlreadyFilled: function (pool, month, year) {
		return new Promise((resolve, reject) => {
			let query = `SELECT month, year, id FROM ps_bleaching_ahaval WHERE month = ? AND year = ?`
			pool.query(query, [month, year], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	yearWiseList: function (pool, year) {
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM ps_bleaching_ahaval WHERE year = ?`
			pool.query(query, [year], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getMonthWiseList: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `SELECT month, year FROM ps_bleaching_ahaval ORDER BY month`
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getBleachingAvahalData: function (pool, month, year) {
		return new Promise((resolve, reject) => {
			let query = `SELECT *,
			  		DATE_FORMAT(date_from, '%d/%m/%Y') AS _date_from,
                    DATE_FORMAT(date_to, '%d/%m/%Y') AS _date_to
					 FROM ps_bleaching_ahaval WHERE month = ? AND year = ?`
			pool.query(query, [month, year], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	deleteBleachingAvahal: function (pool, month, year) {
		return new Promise((resolve, reject) => {
			let query = `DELETE FROM ps_bleaching_ahaval WHERE month = ? AND year = ?`
			pool.query(query, [month, year], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
}

module.exports = bleachingModel
