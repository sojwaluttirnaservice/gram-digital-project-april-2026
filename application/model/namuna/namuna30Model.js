const pool = require('../../config/db-connect-migration');

const namuna30Model = {
    // Save a new record
    saveNamuna30Details: (pool, data) => {
        return new Promise((resolve, reject) => {
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
                data.remarks,
            ];

            pool.query(query, [insertArray], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update an existing record by ID
    updateNamuna30Details: (pool, data) => {
        return new Promise((resolve, reject) => {
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

            pool.query(
                query,
                [
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
                    data.id,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    // Fetch all records
    fetchAllNamuna30Details: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT *                                ,
                                DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                                DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                                DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                             FROM ps_namuna_30;`;
            pool.query(query, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Fetch a record by ID
    fetchNamuna30DetailsById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT *                                ,
                                DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                                DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                                DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                            FROM ps_namuna_30 WHERE id = ?;`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },


    // Fetch records by month and year
    fetchNamuna30DetailsByMonthAndYear: (pool, month, audit_report_year) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *                                ,
                                DATE_FORMAT(report_received_date, '%d-%m-%Y') AS _report_received_date, 
                                DATE_FORMAT(resolved_objection_outward_date, '%d-%m-%Y') AS _resolved_objection_outward_date, 
                                DATE_FORMAT(resolution_forwarded_date, '%d-%m-%Y') AS _resolution_forwarded_date 
                FROM ps_namuna_30
                WHERE month = ? AND audit_report_year = ?;
            `;
            pool.query(query, [month, audit_report_year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete a record by ID
    deleteNamuna30Details: (pool, id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_30 WHERE id = ?;`;
            pool.query(query, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna30Model;