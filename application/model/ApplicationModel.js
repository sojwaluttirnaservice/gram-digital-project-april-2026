var responderSet = require('../config/_responderSet');
let myDates = responderSet.myDate;
var request = require('request');
const { runQuery } = require('../utils/runQuery');
const fmtDateField = require('../utils/fmtDateField');

//NOTE :

// docRemark: 1 => Accepted, 0 => Rejected, 2 => No action taken yet, i.e. pending as per old logic

module.exports = {
	getQuickUserInfoByAadhar: function (pool, data) {
		let q = `SELECT 
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar  
            FROM 
                ps_user_application 
            WHERE 
                formAadhar = ? 
                AND is_deleted = 0
                LIMIT 1`;
		return runQuery(pool, q, [data.addhar]);
	},

	getById: (pool, id) => {
		let q = `SELECT *, ${fmtDateField('create_date')} FROM ps_user_application WHERE id = ? AND is_deleted = 0`;
		return runQuery(pool, q, [+id]);
	},

	getNewApplicationList: (pool) => {
		// docName removed from query
		let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") asdocRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") create_date
            FROM  
                ps_user_application 
                    WHERE documentVerifyDone = 0 AND docRemark IN ('PENDING', '2') AND is_deleted = 0`;

		// -- 'PENDING' is the new docRemark enum value after code refactoring,
		// -- and '2' is the legacy value representing the same "pending" status.
		// -- Both are included here to support old and new data until legacy data is cleaned up.

		return runQuery(pool, q);
	},

	//  returning applications irrespective of accepted or rejected
	getAllApplications: (pool, { sort = 'ASC' } = {}) => {
		let q = `SELECT *, 
                    DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as _docRemarkDate, 
                    DATE_FORMAT(create_date, '%d-%m-%Y') AS _create_date 
                FROM 
                    ps_user_application
                WHERE
                    is_deleted = 0
                ORDER BY 
                    create_date ${sort}`;
		return runQuery(pool, q);
	},

	getRejectedApplicationList: (pool, { sort = 'ASC' } = {}) => {
		// removing the docName from the query
		let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAadhar,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as _docRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") create_date
            FROM  
                ps_user_application 
            WHERE 
                docRemark IN ('REJECTED', '0')
                AND is_deleted = 0
            ORDER BY 
                create_date ${sort}`;
		//  docRemarkDate DESC, id DESC;

		return runQuery(pool, q);
	},

	getAcceptedApplicationList: (pool, { sort = 'ASC' } = {}) => {
		// removing the docName from the query
		let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAadhar,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as docRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") AS _create_date
            FROM  
                ps_user_application 
            WHERE 
                docRemark IN ('ACCEPTED', '0')
                AND is_deleted = 0
            ORDER BY 
                create_date ${sort}`;

		// docRemarkDate DESC, id DESC

		return runQuery(pool, q);
	},

	getAcceptedApplicationListSortByCreateDate: (
		pool,
		{ sort = 'ASC' } = {}
	) => {
		// removing the docName from the query
		let q = `SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAadhar,
                formAddress,

                docDetails,
                dakhlaCheckColOne,
                dakhlaCheckColTwo,
                documentTypeId,
                documentVerifyDone,
                docSms,
                docRemark,
                docSmsDate,
                DATE_FORMAT(docRemarkDate,"%d-%m-%Y") as docRemarkDate,
                DATE_FORMAT(create_date,"%d-%m-%Y") _create_date
            FROM  
                ps_user_application 
            WHERE 
                docRemark IN ('ACCEPTED', '0')
                AND is_deleted = 0
            ORDER BY 
                create_date ${sort}`;

		return runQuery(pool, q);
	},

	updateApplication: (pool, updateData) => {
		let q = `
    UPDATE ps_user_application
    SET
      formName = ?,
      formMobile = ?,
      formEmail = ?,
      formAddress = ?,
      formAadhar = ?,
      docDetails = ?,
      create_date = ?
    WHERE id = ?
  `;

		let updateDataArr = [
			updateData.formName,
			updateData.formMobile,
			updateData.formEmail,
			updateData.formAddress,
			updateData.formAadhar,
			JSON.stringify(updateData.docDetails),
			updateData.create_date,
			updateData.id
		];

		return runQuery(pool, q, updateDataArr);
	},

	updateApplicationStatus: (pool, data) => {
		let q = `UPDATE 
                ps_user_application
            SET
                documentVerifyDone = ?,
                docRemark = ?,
                docSms = ?,
                docSmsDate = ?,
                docRemarkDate = ?
            WHERE 
                id = ?`;

		let updateArr = [
			1,
			Number(data.docResponse),
			data.docSMS,
			myDates.getDate(),
			myDates.getDate(),
			Number(data.appId)
		];

		return runQuery(pool, q, updateArr);
	},

	updateDocRemark: (pool, applicationStatusData) => {
		console.log(applicationStatusData);
		let q = `UPDATE
                ps_user_application
            SET 
                docRemark = ?,
                docRemarkDate = ?
            WHERE 
                id = ?`;

		return runQuery(pool, q, [
			applicationStatusData.changeApplicationStatusTo,
			myDates.getDate(),
			applicationStatusData.applicationId
		]);
	},

	getApplicationsCount: (pool, filters = {}) => {
		let { month, year, fromYear, toYear } = filters;
		let startDate, endDate;

		if (month && year) {
			// Month and Year filter
			startDate = `${year}-${String(month).padStart(2, '0')}-01`;
			const lastDay = new Date(year, month, 0).getDate();
			endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
		} else if (fromYear && toYear) {
			// Financial Year filter (April 1st of fromYear to March 31st of toYear)
			startDate = `${fromYear}-04-01`;
			endDate = `${toYear}-03-31`;
		}

		let q = `
			SELECT

				/* जन्म नोंद दाखला */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'जन्म नोंद दाखला' THEN 1 ELSE 0 END), 0) AS janma_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'जन्म नोंद दाखला' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS janma_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'जन्म नोंद दाखला' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS janma_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'जन्म नोंद दाखला' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS janma_rejected,


				/* मृत्यू नोंद दाखला */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'मृत्यू नोंद दाखला' THEN 1 ELSE 0 END), 0) AS mrutyu_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'मृत्यू नोंद दाखला' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS mrutyu_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'मृत्यू नोंद दाखला' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS mrutyu_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'मृत्यू नोंद दाखला' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS mrutyu_rejected,


				/* विवाह नोंदणी दाखला */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'विवाह नोंदणी दाखला' THEN 1 ELSE 0 END), 0) AS vivah_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'विवाह नोंदणी दाखला' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS vivah_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'विवाह नोंदणी दाखला' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS vivah_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'विवाह नोंदणी दाखला' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS vivah_rejected,


				/* नमुना नं. 8 चा उतारा */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'नमुना नं. 8 चा उतारा' THEN 1 ELSE 0 END), 0) AS namuna8_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'नमुना नं. 8 चा उतारा' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS namuna8_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'नमुना नं. 8 चा उतारा' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS namuna8_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'नमुना नं. 8 चा उतारा' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS namuna8_rejected,


				/* निराधार असले बाबतचा दाखला */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'निराधार असले बाबतचा दाखला' THEN 1 ELSE 0 END), 0) AS niradhar_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'निराधार असले बाबतचा दाखला' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS niradhar_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'निराधार असले बाबतचा दाखला' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS niradhar_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'निराधार असले बाबतचा दाखला' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS niradhar_rejected,


				/* इतर काम लिहावे कोणते असल्यास */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'इतर काम लिहावे कोणते असल्यास' THEN 1 ELSE 0 END), 0) AS itar_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'इतर काम लिहावे कोणते असल्यास' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS itar_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'इतर काम लिहावे कोणते असल्यास' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS itar_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'इतर काम लिहावे कोणते असल्यास' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS itar_rejected,


				/* गावातील तक्रारी */

				COALESCE(SUM(
					CASE
						WHEN jt.docTitle IN (
							'गावातील तक्रारी नोद येथे लिहावी',
							'गावातील तक्रारी नोद येथे लिहावी गावातील'
						)
						THEN 1 ELSE 0
					END
				), 0) AS takrari_total,

				COALESCE(SUM(
					CASE
						WHEN jt.docTitle IN (
							'गावातील तक्रारी नोद येथे लिहावी',
							'गावातील तक्रारी नोद येथे लिहावी गावातील'
						)
						AND p.docRemark = 'PENDING'
						THEN 1 ELSE 0
					END
				), 0) AS takrari_pending,

				COALESCE(SUM(
					CASE
						WHEN jt.docTitle IN (
							'गावातील तक्रारी नोद येथे लिहावी',
							'गावातील तक्रारी नोद येथे लिहावी गावातील'
						)
						AND p.docRemark = 'ACCEPTED'
						THEN 1 ELSE 0
					END
				), 0) AS takrari_accepted,

				COALESCE(SUM(
					CASE
						WHEN jt.docTitle IN (
							'गावातील तक्रारी नोद येथे लिहावी',
							'गावातील तक्रारी नोद येथे लिहावी गावातील'
						)
						AND p.docRemark = 'REJECTED'
						THEN 1 ELSE 0
					END
				), 0) AS takrari_rejected,


				/* ग्रामपंचायत येणे बाकी नसल्याचा दाखला */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'ग्रामपंचायत येणे बाकी नसल्याचा दाखला' THEN 1 ELSE 0 END), 0) AS baki_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'ग्रामपंचायत येणे बाकी नसल्याचा दाखला' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS baki_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'ग्रामपंचायत येणे बाकी नसल्याचा दाखला' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS baki_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'ग्रामपंचायत येणे बाकी नसल्याचा दाखला' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS baki_rejected,


				/* दारिद्र्यरेषेखालचा दाखला */

				COALESCE(SUM(CASE WHEN jt.docTitle = 'दारिद्र्यरेषेखालचा दाखला' THEN 1 ELSE 0 END), 0) AS daridrya_total,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'दारिद्र्यरेषेखालचा दाखला' AND p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS daridrya_pending,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'दारिद्र्यरेषेखालचा दाखला' AND p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS daridrya_accepted,
				COALESCE(SUM(CASE WHEN jt.docTitle = 'दारिद्र्यरेषेखालचा दाखला' AND p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS daridrya_rejected,


				/* overall */

				COUNT(*) AS overall_total,
				COALESCE(SUM(CASE WHEN p.docRemark = 'PENDING' THEN 1 ELSE 0 END), 0) AS overall_pending,
				COALESCE(SUM(CASE WHEN p.docRemark = 'ACCEPTED' THEN 1 ELSE 0 END), 0) AS overall_accepted,
				COALESCE(SUM(CASE WHEN p.docRemark = 'REJECTED' THEN 1 ELSE 0 END), 0) AS overall_rejected

			FROM ps_user_application p

			JOIN JSON_TABLE(
				p.docDetails,
				'$[*]'
				COLUMNS (
					docTitle VARCHAR(255) PATH '$.docTitle'
				)
			) AS jt

			WHERE p.docDetails IS NOT NULL
				AND JSON_VALID(p.docDetails)
				AND p.is_deleted = 0
	`;

		let params = [];
		if (startDate && endDate) {
			q += ` AND p.create_date BETWEEN ? AND ?`;
			params.push(startDate, endDate);
		}

		return runQuery(pool, q, params);
	},

	serialize: function (obj) {
		let str =
			'?' +
			Object.keys(obj)
				.reduce(function (a, k) {
					a.push(k + '=' + encodeURIComponent(obj[k]));
					return a;
				}, [])
				.join('&');
		return str;
	},
	/*sendSMS: function (data, callback) {
    var url = `http://msg.technolitesolution.com/api/SendMesssgeAPI`;
    var sendData = {
      username: "utirna",
      password: "Omsai@800",
      SenderId: "UTIRNA",
      DataCoding: "0",
      Gwid: "2",
      MobileMessage: [
        {
          MobileNumber: data.userMobileNo,
          message: data.docSMS,
        },
      ],
    };

    request(
      {
        url: url,
        json: sendData,
        method: "post",
      },
      function (error, response, body) {
        data = {
          error: error,
          response: response,
          body: body,
        };
        callback(data);
      }
    );
  },*/
	sendSMS: function (data, callback) {
		var url = `http://msg.technolitesolution.com/vendorsms/pushsms.aspx`;

		var sendData = {
			user: 'utirna',
			password: 'Omsai@800',
			sid: 'UTIRNA',
			fl: '0',
			gwid: '2',
			msisdn: data.userMobileNo,
			msg: data.docSMS
		};
		var str = this.serialize(sendData);
		url += str;
		request.get(
			{
				url: url
			},
			function (error, response, body) {
				data = {
					error: error,
					response: response,
					body: body
				};
				callback(data);
			}
		);
	},
	softDelete: (pool, id) => {
		let q = `UPDATE ps_user_application SET is_deleted = 1 WHERE id = ?`;
		return runQuery(pool, q, [+id]);
	}
};
