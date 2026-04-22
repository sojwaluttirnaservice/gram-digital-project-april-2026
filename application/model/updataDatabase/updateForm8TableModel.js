const updateForm8TableModel = {
	getForm8Users: (pool) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT * FROM ps_form_eight_user ORDER BY 
				CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', 1) AS DECIMAL),
                IF(LOCATE('/', feu_malmattaNo), 
                  CAST(SUBSTRING_INDEX(feu_malmattaNo, '/', -1) AS DECIMAL), 
                  NULL) `

			pool.query(q, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateForm8Data: (pool, data) => {
		console.log([data.updated_malmattaNo, +data.id])

		return new Promise((resolve, reject) => {
			let q = `UPDATE ps_form_eight_user
						SET
							feu_malmattaNo = ?,
							feu_secondOwnerName = ?,
							feu_eastLandmark = ?,
							feu_westLandmark = ?,
							feu_southLandmark = ?,
							feu_northLandmark = ?
						WHERE
							id = ?;`

			pool.query(
				q,
				[
					data.updated_malmattaNo,
					data.updated_secondOwnerName,
					data.updated_eastLandmark,
					data.updated_westLandmark,
					data.updated_southLandmark,
					data.updated_northLandmark,
					+data.id,
				],
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
}

module.exports = updateForm8TableModel
