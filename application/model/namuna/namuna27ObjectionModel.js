const namuna27ObjectionModel = {
    saveNamuna27Objection: (pool, data) => {
        return new Promise((resolve, reject) => {
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
            pool.query(
                q,
                [
                    data.month,
                    data.audit_report_year,
                    data.paragraph_number,
                    data.paragraphs_resolved_by_gp,
                    data.objections_resolved_by_committee,
                    data.objections_resolved_by_auditor,
                    data.pending_objections,
                    data.reasons_for_non_compliance,
                    data.remarks,
                ],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    },

    updateNamuna27Objection: (pool, data) => {
        return new Promise((resolve, reject) => {
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
            pool.query(
                q,
                [
                    data.month,
                    data.audit_report_year,
                    data.paragraph_number,
                    data.paragraphs_resolved_by_gp,
                    data.objections_resolved_by_committee,
                    data.objections_resolved_by_auditor,
                    data.pending_objections,
                    data.reasons_for_non_compliance,
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

    deleteNamuna27Objection: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                DELETE FROM ps_namuna_27_objection 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna27ObjectionById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_27_objection 
                WHERE id = ?
            `;
            pool.query(q, [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna27ObjectionByMonthAndYear: (pool, month, year) => {
        return new Promise((resolve, reject) => {
            let q = `SELECT * FROM ps_namuna_27_objection
                ${month || year ? 'WHERE' : ''} 
                ${month ? ` month = ?` : ''}
                ${year ? `${month ? 'AND' : ''} audit_report_year = ?` : ''}`;

            pool.query(q, [month, year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna27ObjectionByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_27_objection 
                WHERE audit_report_year = ?
            `;
            pool.query(q, [year], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    fetchNamuna27ObjectionByYearRange: (pool, fromYear, toYear) => {
        return new Promise((resolve, reject) => {
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

            pool.query(q, [fromYear, fromYear, toYear, toYear], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
    fetchAllNamuna27Objections: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `
                SELECT *, 
                    CASE 
                        WHEN STR_TO_DATE(createdAt, '%Y-%m-%d') IS NOT NULL THEN DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') 
                        ELSE '' 
                    END AS _createdAt 
                FROM ps_namuna_27_objection
            `;
            pool.query(q, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },
};

module.exports = namuna27ObjectionModel;
