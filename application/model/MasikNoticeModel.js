var responderSet = require('../config/_responderSet');
const { runQuery } = require('../utils/runQuery');
let myDates = responderSet.myDate

module.exports = {
	getMainList: (pool) =>{
        let q = `SELECT 
                        t.*,
                        DATE_FORMAT(STR_TO_DATE(t.notice_date, '%m/%d/%Y'), '%d/%m/%Y') AS notice_date
                    FROM  
                        ps_masik_notice as t 
                    ORDER BY 
                        id`;
        return runQuery(pool, q);
	},

	getSingleDetails: function (pool, data) {
        const query = `SELECT *  FROM  ps_self_diclaration WHERE id=? `
        return runQuery(pool, query, [Number(data.i)]);
	},

	addNewSelfDeclaration: function (pool, data) {
        const q = `INSERT INTO ps_self_diclaration 
                          (sd_first_name,
                          sd_middle_name,
                          sd_last_name,
                          sd_dob,
                          sd_age,
                          sd_gender,
                          sd_aadhaar,
                          sd_occupation,
                          sd_address,
                          sd_village_name,
                          sd_taluka_name,
                          sd_district_name,
                          sd_recidancy_type,
                          sd_user_image,
                          create_date,
                          create_time)
                        VALUES (?)`;

        const insertArr = [
            data.recreancyFName,
            data.recreancyMName,
            data.recreancyLName,
            '0000-00-00',
            Number(data.recreancyAge),
            data.recreancyGender,
            data.recreancyAadhaar,
            data.recreancyOccupation,
            data.recreancyAddress,
            data.recreancyVillage,
            data.recreancyTaluka,
            data.recreancyDist,
            data.recreancyType,
            data.file_name,
            myDates.getDate(),
            myDates.getTime(),
        ]

        return runQuery(pool, q, [insertArr]);
	},
	saveNewNotice: function (pool, data) {
		// console.log("data model= ", data)
        let q = `INSERT INTO 
                ps_masik_notice (
                  notice_name, 
                  notice_date, 
                  notice_scheule, 

                  notice_time, 
                  notice_place, 
                  notice_subject,

                  notice_number)
                  VALUES(?, ?, ?, ?, ?, ?, ?)`
        let insertArr = [
            data.sabhaName,
            data.sabhaDate,
            data.sabhaSchedule,

            data.sabhaScheduleTime,
            data.sabhaPlace,
            data.masikNoticevishay,

            Number(data.sabhaNumber)
        ]

        return runQuery(pool, q, insertArr);
	},

	updateSabhaNotice: function (pool, data) {
		console.log("Updating data -=== ", data);
		return new Promise((resolve, reject) => {
			let query = `UPDATE  ps_masik_notice 
					SET
                      notice_name = ?, 
                      notice_date = ?, 
                      notice_scheule = ?, 
                      notice_time = ?, 
                      notice_place = ?, 
                      notice_subject = ?,
					  notice_number = ?
					WHERE id = ?`

			let updateArray = [
				data.sabhaName,
				data.sabhaDate,
				data.sabhaSchedule,
				data.sabhaScheduleTime,
				data.sabhaPlace,
				data.masikNoticevishay,
				Number(data.sabhaNumber),
				Number(data.id),
			]

			console.log('Update array ,', updateArray);

			// console.log(updateArray, '------')
			pool.query(query, updateArray, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	deleteNotice: function (pool, id) {
		return new Promise((resolve, reject) => {
			let query = `DELETE FROM 
                    ps_masik_notice 
                  WHERE 
                    id=?`
			pool.query(query, Number(id), function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getSadasyaList: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
                    gp_member
                  FROM 
                    ps_gram_panchayet`
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getNoticeDetails: function (pool, noticeId) {
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM ps_masik_notice WHERE id = ? `
			pool.query(query, Number(noticeId), function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	postSabhaAttendanceList: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO ps_sabha_attendance (sabha_month, sabha_year, sabasad_name, m_bhatta, is_present) values ?`
			let insertData = []
			data._data.forEach((el) => {
				insertData.push([
					data.sabhaMonth,
					data.sabhaYear,
					el.name,
					el.payAmount,
					el.isPresent,
				])
			})
			console.log(insertData, '---')
			pool.query(query, [insertData], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	checkAlreadyFilledSabhaAttendance: function (pool, data) {
		console.log('in modal check filled', data)
		return new Promise((resolve, reject) => {
			let query = `SELECT sabha_month,sabha_year FROM ps_sabha_attendance where sabha_month = ? and sabha_year=? LIMIT 1`
			let insertData = [+data.month, +data.year]

			pool.query(query, insertData, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getSabhaAttendancYears: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `select distinct(sabha_year) from ps_sabha_attendance`
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getPrintAttendanceDetails: function (pool, year) {
		return new Promise((resolve, reject) => {
			let query = `
						select
							sabasad_name, 
							sabha_year, 
							group_concat(sabha_month) as "months",
							m_bhatta, 
							group_concat(is_present) as "present_months"
						from 
							ps_sabha_attendance 
						where 
							sabha_year = ?
						group by 
							sabasad_name
						`
			pool.query(query, [year], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	get_month_wise_sabha_attendance: function (pool, selected_year) {
		console.log(selected_year, 'in modal---')
		return new Promise((resolve, reject) => {
			let query = `select distinct(sabha_month) from ps_sabha_attendance where sabha_year=?`

			pool.query(query, [+selected_year], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	delete_sabha_attendance: function (pool, delete_month_id, delete_sabha_year) {
		return new Promise((resolve, reject) => {
			let query = `delete from ps_sabha_attendance where sabha_month = ? and sabha_year = ?`

			pool.query(
				query,
				[+delete_month_id, +delete_sabha_year],
				function (err, result) {
					err ? reject(err) : resolve(result)
				}
			)
		})
	},

	get_edit_sabha_attendance: function (pool, edit_month, edit_sabha_year) {
		return new Promise((resolve, reject) => {
			let query = `select * from ps_sabha_attendance where sabha_month = ? and sabha_year = ?`

			pool.query(
				query,
				[+edit_month, +edit_sabha_year],
				function (err, result) {
					err ? reject(err) : resolve(result)
				}
			)
		})
	},

	postEditSabhaAttendanceList: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `update ps_sabha_attendance set m_bhatta=?,is_present=? 
							where sabasad_name=? and sabha_month=?;`
			let insertData = [data[3], +data[4], data[2], data[0]]
			pool.query(query, insertData, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
}
