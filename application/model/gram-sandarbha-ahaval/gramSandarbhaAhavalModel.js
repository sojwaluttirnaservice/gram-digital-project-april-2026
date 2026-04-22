const gramSandarbhaAhavalModel = {
	saveGramSandarbhaAhaval: (pool, data) => {
		return new Promise((resolve, reject) => {
			const query = `INSERT INTO 
                    ps_gram_sandarbha_ahaval
                (
                    malmatta_owner_name,
                    malmatta_no,
                    survey_number,
                    year_from,

                    year_to,
                    area_sq_feet,
                    area_sq_meter,
                    tax_rate,

                    taxation,
                    year_difference,
                    total_taxation,
                    shera
                )
                VALUES (?, ?, ?, ?, 
                        ?, ?, ?, ?, 
                        ?, ?, ? ?)
                `

			const insertArray = [
				data.malmatta_owner_name,
				data.malmatta_no,
				data.survey_number,
				data.year_from,

				data.year_to,
				data.area_sq_feet,
				data.area_sq_meter,
				data.tax_rate,

				data.taxation,
				data.year_difference,
				data.total_taxation,
				data.shera,
			]
			pool.query(query, insertArray, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateGramSandarbhaAhaval: (pool, data) => {
		console.log('calling update')
		return new Promise((resolve, reject) => {
			const query = `UPDATE 
                    ps_gram_sandarbha_ahaval
                SET
                    malmatta_owner_name = ? ,
                    malmatta_no = ? ,
                    survey_number = ? ,
                    year_from = ?,

                    year_to = ?,
                    area_sq_feet = ?,
                    area_sq_meter = ?,
                    tax_rate = ?,

                    taxation = ?,
                    year_difference = ?,
                    total_taxation = ?,
                    shera = ?
                
                WHERE
                    id = ?
                `

			const updateArray = [
				data.malmatta_owner_name,
				data.malmatta_no,
				data.survey_number,
				data.year_from,

				data.year_to,
				data.area_sq_feet,
				data.area_sq_meter,
				data.tax_rate,

				data.taxation,
				data.year_difference,
				data.total_taxation,
				data.shera,

				data.id,
			]
			pool.query(query, updateArray, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	deleteGramSandarbhaAhaval: (pool, id) => {
		return new Promise((resolve, reject) => {
			const query = `DELETE FROM 
                                ps_gram_sandarbha_ahaval 
                            WHERE
                                 id = ?`
			pool.query(query, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getGramSandarbhaAhaval: (pool, id) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM 
                                ps_gram_sandarbha_ahaval 
                            WHERE
                                 id = ?`
			pool.query(query, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getGramSandarbhaAhavalList: (pool) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM ps_gram_sandarbha_ahaval`
			pool.query(query, [], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
}

module.exports = gramSandarbhaAhavalModel
