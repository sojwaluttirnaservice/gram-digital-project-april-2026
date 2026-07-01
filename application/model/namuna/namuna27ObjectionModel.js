const { runQuery } = require('../../utils/runQuery');
const namuna27ObjectionModel = {
	saveNamuna27Objection: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_27_objection 
                (
                    month,
                    audit_report_year,
                    paragraph_number,
                    paragraphs_resolved_by_gp,
                    objections_resolved_by_committee,
                    objections_resolved_by_auditor,
                    pending_objections,
                    reasons_for_non_compliance,
                    remarks
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
		return runQuery(pool, q, [
			data.month,
			data.audit_report_year,
			data.paragraph_number,
			data.paragraphs_resolved_by_gp,
			data.objections_resolved_by_committee,
			data.objections_resolved_by_auditor,
			data.pending_objections,
			data.reasons_for_non_compliance,
			data.remarks
		]);
	},

	updateNamuna27Objection: (pool, data) => {
		const q = `
                UPDATE ps_namuna_27_objection 
                SET 
                    month = ?,
                    audit_report_year = ?,
                    paragraph_number = ?,
                    paragraphs_resolved_by_gp = ?,
                    objections_resolved_by_committee = ?,
                    objections_resolved_by_auditor = ?,
                    pending_objections = ?,
                    reasons_for_non_compliance = ?,
                    remarks = ?
                WHERE id = ?
            `;
		return runQuery(pool, q, [
			data.month,
			data.audit_report_year,
			data.paragraph_number,
			data.paragraphs_resolved_by_gp,
			data.objections_resolved_by_committee,
			data.objections_resolved_by_auditor,
			data.pending_objections,
			data.reasons_for_non_compliance,
			data.remarks,
			data.id
		]);
	},

	deleteNamuna27Objection: (pool, id) => {
		const q = `
                DELETE FROM ps_namuna_27_objection 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna27ObjectionById: (pool, id) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_27_objection 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna27ObjectionByMonthAndYear: (pool, month, year) => {
		let q = `SELECT * FROM ps_namuna_27_objection
                ${month || year ? 'WHERE' : ''} 
                ${month ? ` month = ?` : ''}
                ${year ? `${month ? 'AND' : ''} audit_report_year = ?` : ''}`;

		return runQuery(pool, q, [month, year]);
	},

	fetchNamuna27ObjectionByYear: (pool, year) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_27_objection 
                WHERE audit_report_year = ?
            `;
		return runQuery(pool, q, [year]);
	},

	fetchNamuna27ObjectionByYearRange: (pool, fromYear, toYear) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_27_objection 
                WHERE 
                        (audit_report_year = ? AND month >= 4) 
                        OR 
                        (audit_report_year > ? AND audit_report_year < ?)           
                        OR 
                        (audit_report_year = ? AND month <= 3)  
                    ORDER BY audit_report_year ASC, month ASC`;

		return runQuery(pool, q, [fromYear, fromYear, toYear, toYear]);
	},
	fetchAllNamuna27Objections: (pool) => {
		const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_27_objection
            `;
		return runQuery(pool, q);
	}
};

module.exports = namuna27ObjectionModel;
