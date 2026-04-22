const meetingsModel = {
	getAllZoomMeetings: (pool, forUsers = false) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM ps_zoom_meetings ${forUsers ? 'ORDER BY created_at DESC' : ''}`
			pool.query(query, [], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateMeetingRecord: (pool, data, fileName) => {
		return new Promise((resolve, reject) => {
			const query = `
                       UPDATE 
                            ps_zoom_meetings
                        SET
                            meeting_title = ?,
                            meeting_description = ?,
                            meeting_date = ?,
                            meeting_time = ?,
                            meeting_link = ?,
                            recording_link = ?,
							online_guide_image_name = ?
                        
                        WHERE id = ?`

			let updateArray = [
				data.meeting_title,
				data.meeting_description,
				data.meeting_date,
				data.meeting_time,
				data.meeting_link,
				data.recording_link,
				fileName,
				data.id,
			]

			pool.query(query, updateArray, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	createNewMeetingRecord: (pool, data) => {
		
		return new Promise((resolve, reject) => {
			const query = `
                       INSERT INTO 
                        ps_zoom_meetings
                        
                        (
                            meeting_title,
                            meeting_description,
                            meeting_date,
                            meeting_time,
                            meeting_link,
                            recording_link,
							online_guide_name
                        )
                        VALUES (?)
            `

			let insertArray = [
				data.meeting_title,
				data.meeting_description,
				data.meeting_date,
				data.meeting_time,
				data.meeting_link,
				data.recording_link,
				data.online_guide_name
			]

			pool.query(query, [insertArray], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateZoomMeetingGuideImageName: (pool, fileName, id) => {
		return new Promise((resolve, reject) => {
			const query = `
                       UPDATE 
                        ps_zoom_meetings
                        
                       SET
                        online_guide_image_name = ?

                        WHERE 
                            id = ?
            `

			pool.query(query, [fileName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	addRecordingLink: (pool, link, id) => {
		return new Promise((resolve, reject) => {
			const query = `
                       UPDATE 
                        ps_zoom_meetings
                        
                       SET
                        recording_link = ?

                        WHERE 
                            id = ?
            `

			pool.query(query, [link, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	deleteMeetingRecord: (pool, id) => {
		return new Promise((resolve, reject) => {
			const query = `
                    DELETE FROM
                        ps_zoom_meetings
                    WHERE 
                            id = ?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
}

module.exports = meetingsModel
