const krishiVidnyanModel = {
	getKrishiVidnyanList: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM ps_krishi_vidnyan_file_list`;
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
}

module.exports = krishiVidnyanModel
