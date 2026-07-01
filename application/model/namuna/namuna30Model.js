const pool = require('../../config/db-connect-migration');
const { runQuery } = require('../../utils/runQuery');

const namuna30Model = {
	// Save a new record
	saveNamuna30Details: (pool, data) => {
		const query = `
                INSERT INTO ps_namuna_30
                (
                    month,
                    audit_report_year,
                    report_received_date,
                    objection_count,
                    objection_sequence,
                    info_only_objection_count,
                    info_only_objection_sequence,
                    resolve_objection_count,
                    resolve_objection_sequence,
                    resolved_objection_outward_number,
                    resolved_objection_outward_date,
                    resolution_forwarded_number,
                    resolution_forwarded_date,
                    zp_approved_objection_count,
                    zp_approved_objection_sequence,
                    book_adjustment_details,
                    recovery_details,
                    assessment_details,
                    irregularity_details,
                    total_remaining_objection_count,
                    total_remaining_objection_sequence,
                    remarks
                )
                VALUES (?);
            `;

		const insertArray = [
			data.month,
			data.audit_report_year,
			data.report_received_date,
			data.objection_count,
			data.objection_sequence,
			data.info_only_objection_count,
			data.info_only_objection_sequence,
			data.resolve_objection_count,
			data.resolve_objection_sequence,
			data.resolved_objection_outward_number,
			data.resolved_objection_outward_date,
			data.resolution_forwarded_number,
			data.resolution_forwarded_date,
			data.zp_approved_objection_count,
			data.zp_approved_objection_sequence,
			data.book_adjustment_details,
			data.recovery_details,
			data.assessment_details,
			data.irregularity_details,
			data.total_remaining_objection_count,
			data.total_remaining_objection_sequence,
			data.remarks
		];

		return runQuery(pool, query, [insertArray]);
	},

	// Update an existing record by ID
	updateNamuna30Details: (pool, data) => {
		const query = `
                UPDATE ps_namuna_30
                SET 
                    month = ?,
                    audit_report_year = ?,
                    report_received_date = ?,
                    objection_count = ?,
                    objection_sequence = ?,
                    info_only_objection_count = ?,
                    info_only_objection_sequence = ?,
                    resolve_objection_count = ?,
                    resolve_objection_sequence = ?,
                    resolved_objection_outward_number = ?,
                    resolved_objection_outward_date = ?,
                    resolution_forwarded_number = ?,
                    resolution_forwarded_date = ?,
                    zp_approved_objection_count = ?,
                    zp_approved_objection_sequence = ?,
                    book_adjustment_details = ?,
                    recovery_details = ?,
                    assessment_details = ?,
                    irregularity_details = ?,
                    total_remaining_objection_count = ?,
                    total_remaining_objection_sequence = ?,
                    remarks = ?
                WHERE id = ?;
            `;

		return runQuery(pool, query, [
			data.month,
			data.audit_report_year,
			data.report_received_date,
			data.objection_count,
			data.objection_sequence,
			data.info_only_objection_count,
			data.info_only_objection_sequence,
			data.resolve_objection_count,
			data.resolve_objection_sequence,
			data.resolved_objection_outward_number,
			data.resolved_objection_outward_date,
			data.resolution_forwarded_number,
			data.resolution_forwarded_date,
			data.zp_approved_objection_count,
			data.zp_approved_objection_sequence,
			data.book_adjustment_details,
			data.recovery_details,
			data.assessment_details,
			data.irregularity_details,
			data.total_remaining_objection_count,
			data.total_remaining_objection_sequence,
			data.remarks,
			data.id
		]);
	},

	// Fetch all records
	fetchAllNamuna30Details: (pool) => {
		const query = `SELECT *                                ,
                                DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                                DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                                DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                             FROM ps_namuna_30;`;
		return runQuery(pool, query);
	},

	fetchAllNamuna30: (pool) => {
		return namuna30Model.fetchAllNamuna30Details(pool);
	},

	// Fetch a record by ID
	fetchNamuna30DetailsById: (pool, id) => {
		const query = `SELECT *                                ,
                                DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                                DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                                DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                            FROM ps_namuna_30 WHERE id = ?;`;
		return runQuery(pool, query, [id]);
	},

	fetchNamuna30ById: (pool, id) => {
		return namuna30Model.fetchNamuna30DetailsById(pool, id);
	},

	// Fetch records by audit report year
	fetchNamuna30DetailsByYear: (pool, year) => {
		const query = `
                SELECT *,
                    DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                    DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                    DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                FROM ps_namuna_30
                WHERE audit_report_year = ?;
            `;
		return runQuery(pool, query, [year]);
	},

	fetchNamuna30ByYear: (pool, year) => {
		return namuna30Model.fetchNamuna30DetailsByYear(pool, year);
	},

	// Fetch records for a financial year range
	fetchNamuna30DetailsByFinancialYear: (pool, fromYear, toYear) => {
		const query = `
                SELECT *,
                    DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                    DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                    DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                FROM ps_namuna_30
                WHERE 
                    (audit_report_year = ? AND month BETWEEN 4 AND 12)
                    OR
                    (audit_report_year = ? AND month BETWEEN 1 AND 3);
            `;
		return runQuery(pool, query, [fromYear, toYear]);
	},

	// Fetch records by month and year
	fetchNamuna30DetailsByMonthAndYear: (pool, month, audit_report_year) => {
		const query = `
                SELECT *                                ,
                                DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                                DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                                DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                FROM ps_namuna_30
                WHERE month = ? AND audit_report_year = ?;
            `;
		return runQuery(pool, query, [month, audit_report_year]);
	},

	// Delete a record by ID
	deleteNamuna30Details: (pool, id) => {
		const query = `DELETE FROM ps_namuna_30 WHERE id = ?;`;
		return runQuery(pool, query, [id]);
	}
};

module.exports = namuna30Model;
