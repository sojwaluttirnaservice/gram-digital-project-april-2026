const watertaxModel = {
	saveWatertax: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `INSERT INTO ps_watertax 
                        (
							tap_connection_id, 
							last_special_water_tax, 
							current_special_water_tax, 
							total_special_water_tax, 
							
							last_general_water_tax, 
							current_general_water_tax, 
							total_general_water_tax
						) 
                        VALUES (?)`

			const insertArray = [
				data.tap_connection_id,
				data.last_special_water_tax,
				data.current_special_water_tax,
				data.total_special_water_tax,
				data.last_general_water_tax,
				data.current_general_water_tax,
				data.total_general_water_tax,
			]

			pool.query(q, [insertArray], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateWatertax: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `UPDATE ps_watertax 
					SET 
						last_special_water_tax = ?,
						current_special_water_tax = ?,
						total_special_water_tax = ?,
						last_general_water_tax = ?,
						current_general_water_tax = ?,
						total_general_water_tax = ?
					WHERE tap_connection_id = ?
						AND id = ?`

			const updateArray = [
				data.last_special_water_tax,
				data.current_special_water_tax,
				data.total_special_water_tax,
				data.last_general_water_tax,
				data.current_general_water_tax,
				data.total_general_water_tax,
				data.tap_connection_id,
				data.id,
			]

			pool.query(q, updateArray, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	waterTaxDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT * 
						FROM ps_watertax 
							WHERE 
						tap_connection_id = ?`
			pool.query(q, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	allWatertax: (pool) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT wt.*, tc.* 
							FROM ps_watertax wt
						LEFT JOIN 
							ps_tap_connection tc
						ON tc.id = wt.tap_connection_id`
			pool.query(q, [], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	watertaxPrintData: (pool, y1, y2, p, tp) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
                      wt.*,
					  tc.name,
					  tc.mobile,
					  tc.malmatta_no
						FROM 
						ps_watertax AS wt
					LEFT JOIN
						ps_tap_connection AS tc
                      ON 
                    wt.tap_connection_id = tc.id   
              	GROUP BY wt.tap_connection_id ORDER BY CAST(wt.tap_connection_id as UNSIGNED) ASC, wt.tap_connection_id LIMIT ${
									p ? p * tp : 0
								}, ${tp ? tp : 1000}`

			pool.query(q, [], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
}

module.exports = watertaxModel
