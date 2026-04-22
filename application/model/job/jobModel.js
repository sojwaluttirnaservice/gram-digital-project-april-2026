const jobModel = {
	getAllJobs: (pool) => {
        return new Promise((resolve, reject) => {
			const query = `
                        SELECT *
                            FROM 
                                ps_job_related
                            ORDER BY 
                                created_at DESC    
            `

			pool.query(query, [], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
    },

	getAllNonExpiredJobs: (pool) => {
		return new Promise((resolve, reject) => {
			const query = `
                        SELECT *
                            FROM 
                                ps_job_related
                            WHERE 
                                expiry_date > DATE_FORMAT(NOW(), '%Y-%m-%d')
                            ORDER BY 
                                created_at DESC    
            `

			pool.query(query, [], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
}

module.exports = jobModel
