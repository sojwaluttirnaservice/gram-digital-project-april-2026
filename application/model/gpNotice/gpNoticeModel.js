const gpNoticeModel = {
	saveGpAtikramanNotice: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `INSERT INTO 
                           ps_atikraman_notice 
                        
						   (
							name,
							address,
							date,
							malmatta_no,
							east_landmark,
							west_landmark,
							north_landmark,
							south_landmark,
							road_name
							)
                            VALUES
                        (?)`

			const insertData = [
				data.name,
				data.address,
				data.date,
				data.malmatta_no,
				data.east_landmark,
				data.west_landmark,
				data.north_landmark,
				data.south_landmark,
				data.road_name,
			]
			pool.query(q, [insertData], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateGpAtikramanNotice: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `UPDATE ps_atikraman_notice 
                    SET 
                        name = ?, 
                        address = ?, 
                        date = ?, 
                        malmatta_no = ?, 
                        east_landmark = ?, 
                        west_landmark = ?, 
                        north_landmark = ?, 
                        south_landmark = ?, 
                        road_name = ?,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?`

			const updateData = [
				data.name,
				data.address,
				data.date,
				data.malmatta_no,
				data.east_landmark,
				data.west_landmark,
				data.north_landmark,
				data.south_landmark,
				data.road_name,
				data.id,
			]

			pool.query(q, updateData, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	updateGpAtikramanNoticeOutgoingNumber: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `UPDATE ps_atikraman_notice 
                    SET 
                        outgoing_number = ?
                    WHERE id = ?`

			const updateData = [id, id]

			pool.query(q, updateData, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	fetchAllAtikramanNotices: (pool, isInDescendingOrder = true) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
                        *,
                        DATE_FORMAT(date, '%d/%m/%Y') AS _date
                        FROM ps_atikraman_notice ORDER  BY id ${isInDescendingOrder ? 'DESC' : 'ASC'}`

			pool.query(q, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	fetchAtikramanNotice: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
                        *,
                        DATE_FORMAT(date, '%d/%m/%Y') AS _date
                        FROM ps_atikraman_notice 
                        WHERE id = ?`

			pool.query(q, [+id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	deleteGpAtikramanNotice: (pool, data) => {
		return new Promise((resolve, reject) => {
			const q = `DELETE FROM ps_atikraman_notice WHERE id = ?`

			pool.query(q, [+data.id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
}

module.exports = gpNoticeModel
