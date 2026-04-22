const arogyaModel = {
	getArogyaSevaKendraList: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `
				SELECT 
					kendra.*, 
					COUNT(sevak.id) AS total_arogya_sevak
				FROM 
					ps_arogya_seva_kendra 
						AS kendra
				LEFT JOIN 
					ps_arogya_sevak_information 
						AS sevak 
				ON 
					kendra.id = sevak.arogya_kendra_id
				GROUP BY 
					kendra.id;`

			pool.query(query, [], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getArogyaSevaKendraDetails: function (pool, id) {
		return new Promise((resolve, reject) => {
			const query = `
				SELECT 
					kendra.*, 
					COUNT(sevak.id) AS total_arogya_sevak
				FROM 
					ps_arogya_seva_kendra AS kendra
				LEFT JOIN 
					ps_arogya_sevak_information AS sevak 
				ON 
					kendra.id = sevak.arogya_kendra_id
				WHERE 
					kendra.id = ?
				GROUP BY 
					kendra.id;`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getArogaySevakListForKendra: function (pool, id) {
		return new Promise((resolve, reject) => {
			const query = `SELECT 
					* 
				FROM 
					ps_arogya_sevak_information
				WHERE 
					arogya_kendra_id = ?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getArogyaSevaKendraGalleryPhotos: (pool, arogyaSevaKendraId) => {
		return new Promise((resolve, reject) => {
			var query = `SELECT
								*
						FROM
							ps_arogya_seva_kendra_gallery
						WHERE
                            arogya_seva_kendra_id = ?
						ORDER BY 
							created_at DESC`
			pool.query(query, [arogyaSevaKendraId], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
}

module.exports = arogyaModel
