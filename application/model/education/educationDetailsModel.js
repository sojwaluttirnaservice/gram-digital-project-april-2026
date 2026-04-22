const { runQuery } = require("../../utils/runQuery")

const educationDetailsModel = {
	getSchoolCollegeList: (pool, institute_type) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT * FROM ps_education_institute_list ${institute_type !== -1 ? 'WHERE institute_type = ?' : ''}`
			pool.query(q, [institute_type], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getInstituteDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
							*
						FROM 
							ps_education_institute_list 
						WHERE
							id = ?;
							`
			pool.query(q, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getEducationInstituteGalleryPhotos: (pool, instituteId) => {
		return new Promise((resolve, reject) => {
			var query = `SELECT
								*
						FROM
							ps_education_institute_gallery
						WHERE
						 	institute_id = ?
						ORDER BY 
							created_at DESC`
			pool.query(query, [instituteId], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getInstituteDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
							*
						FROM 
							ps_education_institute_list 
						WHERE
							id = ?;
							`
			pool.query(q, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getInstituteStaffDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
							id,
							staff_name,
							staff_photo,
							staff_designation
						FROM 
							ps_education_institute_staff_list 
						WHERE
							institute_id = ?;
							`
			pool.query(q, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getInstitutesWithStaffList: (pool) => {
		const q = `
			SELECT 
				i.id AS institute_id,
				i.institute_name,
				i.institute_image,
				i.institute_type,
				CASE 
					WHEN COUNT(s.id) > 0 THEN JSON_ARRAYAGG(
						JSON_OBJECT(
							'id', s.id,
							'staff_name', s.staff_name,
							'staff_designation', s.staff_designation,
							'staff_photo', s.staff_photo,
							'staff_mob_no', s.staff_mob_no
						)
					)
					ELSE NULL
				END AS staff_members
			FROM 
				ps_education_institute_list i
			LEFT JOIN 
				ps_education_institute_staff_list s ON i.id = s.institute_id
			GROUP BY 
				i.id, i.institute_name, i.institute_image, i.institute_type;
		`

		return runQuery(pool, q)
	}
}

module.exports = educationDetailsModel
