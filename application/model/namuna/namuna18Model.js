const { runQuery } = require('../../utils/runQuery');
const namuna18Model = {
	saveNamuna18Entry: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_18 
                (
                    month, 
                    year, 
                    recieved_date, 
                    cheque_number, 
                    received_from, 
                    recieved_amount, 
                    recieved_details, 
                    recieved_advance_amount, 
                    total_recieved_amount, 
                    spending_date, 
                    certificate_number, 
                    given_to, 
                    expense_details, 
                    expense_from_advance, 
                    expense_amount, 
                    total_expense_amount, 
                    remarks
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
		return runQuery(pool, q, [
			data.month,
			data.year,
			data.recieved_date,
			data.cheque_number,
			data.received_from,
			data.recieved_amount,
			data.recieved_details,
			data.recieved_advance_amount,
			data.total_recieved_amount,
			data.spending_date,
			data.certificate_number,
			data.given_to,
			data.expense_details,
			data.expense_from_advance,
			data.expense_amount,
			data.total_expense_amount,
			data.remarks
		]);
	},

	updateNamuna18Entry: (pool, data) => {
		const q = `
                UPDATE ps_namuna_18 
                SET 
                    month = ?, 
                    year = ?, 
                    recieved_date = ?, 
                    cheque_number = ?, 
                    received_from = ?, 
                    recieved_amount = ?, 
                    recieved_details = ?, 
                    recieved_advance_amount = ?, 
                    total_recieved_amount = ?, 
                    spending_date = ?, 
                    certificate_number = ?, 
                    given_to = ?, 
                    expense_details = ?, 
                    expense_from_advance = ?, 
                    expense_amount = ?, 
                    total_expense_amount = ?, 
                    remarks = ?
                WHERE id = ?
            `;
		return runQuery(pool, q, [
			data.month,
			data.year,
			data.recieved_date,
			data.cheque_number,
			data.received_from,
			data.recieved_amount,
			data.recieved_details,
			data.recieved_advance_amount,
			data.total_recieved_amount,
			data.spending_date,
			data.certificate_number,
			data.given_to,
			data.expense_details,
			data.expense_from_advance,
			data.expense_amount,
			data.total_expense_amount,
			data.remarks,
			data.id
		]);
	},

	deleteNamuna18Entry: (pool, id) => {
		const q = `
                DELETE FROM ps_namuna_18 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	fetchNamuna18ById: (pool, id) => {
		const q = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(recieved_date, '%d-%m-%Y'), '') AS _recieved_date,
                    IFNULL(DATE_FORMAT(spending_date, '%d-%m-%Y'), '') AS _spending_date
                FROM ps_namuna_18 
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	/**


    fetchNamuna18ByMonthAndYear: (pool, month, year) => {
            const q = `
                SELECT 
                    year,
                    month,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'month', month,
                            'year', year,
                            'id', id,
                            'recieved_date', IFNULL(DATE_FORMAT(recieved_date, '%d-%m-%Y'), ''),
                            'cheque_number', IFNULL(cheque_number, ''),
                            'received_from', IFNULL(received_from, ''),
                            'recieved_amount', IFNULL(recieved_amount, 0),
                            'recieved_details', IFNULL(recieved_details, ''),
                            'recieved_advance_amount', IFNULL(recieved_advance_amount, 0),
                            'total_recieved_amount', IFNULL(total_recieved_amount, 0),
                            'spending_date', IFNULL(DATE_FORMAT(spending_date, '%d-%m-%Y'), ''),
                            'certificate_number', IFNULL(certificate_number, ''),
                            'given_to', IFNULL(given_to, ''),
                            'expense_details', IFNULL(expense_details, ''),
                            'expense_from_advance', IFNULL(expense_from_advance, 0),
                            'expense_amount', IFNULL(expense_amount, 0),
                            'total_expense_amount', IFNULL(total_expense_amount, 0),
                            'remarks', IFNULL(remarks, '')
                        )
                    ) AS corresponding_entries
                FROM ps_namuna_18
                WHERE month = ? AND year = ?
                GROUP BY year, month
                ORDER BY year ASC, month ASC;
            `;
            return runQuery(pool, q, [month, year]);
        },

     */

	fetchNamuna18ByMonthAndYear: (pool, month, year) => {
		const q = `
                SELECT *,
                    IFNULL(DATE_FORMAT(recieved_date, '%d-%m-%Y'), '') AS _recieved_date,
                    IFNULL(DATE_FORMAT(spending_date, '%d-%m-%Y'), '') AS _spending_date

                FROM ps_namuna_18
                WHERE month = ? AND year = ?
                ORDER BY year ASC, month ASC;
            `;
		return runQuery(pool, q, [month, year]);
	},

	fetchNamuna18ByYear: (pool, year) => {
		const q = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(recieved_date, '%d-%m-%Y'), '') AS _recieved_date,
                    IFNULL(DATE_FORMAT(spending_date, '%d-%m-%Y'), '') AS _spending_date
                FROM ps_namuna_18 
                WHERE YEAR(recieved_date) = ?
            `;
		return runQuery(pool, q, [year]);
	},

	fetchNamuna18ByYearRange: (pool, fromYear, toYear) => {
		const q = `
                SELECT *, 
                    IFNULL(DATE_FORMAT(recieved_date, '%d-%m-%Y'), '') AS _recieved_date,
                    IFNULL(DATE_FORMAT(spending_date, '%d-%m-%Y'), '') AS _spending_date
                FROM ps_namuna_18
                WHERE (year = ? AND month >= 4)
                    OR (year > ? AND year < ?)
                    OR (year = ? AND month <= 3)
                ORDER BY year ASC, month ASC;
            `;
		return runQuery(pool, q, [fromYear, fromYear, toYear, toYear]);
	},

	fetchNamuna18ByYearRangeWithGroup: (pool, fromYear, toYear) => {
		const q = `
                SELECT 
                    year,
                    month,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'month', month,
                            'year', year,
                            'id', id,
                            'recieved_date', IFNULL(DATE_FORMAT(recieved_date, '%d-%m-%Y'), ''),
                            'cheque_number', IFNULL(cheque_number, ''),
                            'received_from', IFNULL(received_from, ''),
                            'recieved_amount', IFNULL(recieved_amount, 0),
                            'recieved_details', IFNULL(recieved_details, ''),
                            'recieved_advance_amount', IFNULL(recieved_advance_amount, 0),
                            'total_recieved_amount', IFNULL(total_recieved_amount, 0),
                            'spending_date', IFNULL(DATE_FORMAT(spending_date, '%d-%m-%Y'), ''),
                            'certificate_number', IFNULL(certificate_number, ''),
                            'given_to', IFNULL(given_to, ''),
                            'expense_details', IFNULL(expense_details, ''),
                            'expense_from_advance', IFNULL(expense_from_advance, 0),
                            'expense_amount', IFNULL(expense_amount, 0),
                            'total_expense_amount', IFNULL(total_expense_amount, 0),
                            'remarks', IFNULL(remarks, '')
                        )
                    ) AS corresponding_entries
                FROM ps_namuna_18
                WHERE (year = ? AND month >= 4)
                    OR (year > ? AND year < ?)
                    OR (year = ? AND month <= 3)
                GROUP BY year, month
                ORDER BY year ASC, month ASC;
            `;
		return runQuery(pool, q, [fromYear, fromYear, toYear, toYear]);
	},

	fetchAllNamuna18: (pool) => {
		const q = `
                SELECT *,
                    IFNULL(DATE_FORMAT(recieved_date, '%d-%m-%Y'), '') AS _recieved_date,
                    IFNULL(DATE_FORMAT(spending_date, '%d-%m-%Y'), '') AS _spending_date
                FROM ps_namuna_18
            `;
		return runQuery(pool, q);
	}
};

module.exports = namuna18Model;
