const { runQuery } = require('../../utils/runQuery');
const namuna25InvestmentDetailsModel = {
	// Save a new record
	saveNamuna25InvestmentDetails: (pool, data) => {
		const q = `
                INSERT INTO ps_namuna_25_investment_register
                (
                    investment_date,
                    investment_details,
                    reference_number,
                    reference_date,
                    face_value,
                    purchase_price,
                    maturity_date,
                    net_payable_amount,
                    interest_earned_date,
                    transfer_promotion_date,
                    cashbook_deposited_amount,
                    specific_details,
                    month,
                    year
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
		return runQuery(pool, q, [
			data.investment_date,
			data.investment_details,
			data.reference_number,
			data.reference_date,
			data.face_value,
			data.purchase_price,
			data.maturity_date,
			data.net_payable_amount,
			data.interest_earned_date,
			data.transfer_promotion_date,
			data.cashbook_deposited_amount,
			data.specific_details,
			data.month,
			data.year
		]);
	},
	updateNamuna25InvestmentDetails: (pool, data) => {
		const q = `
                UPDATE ps_namuna_25_investment_register
                SET
                    investment_date = ?, 
                    investment_details = ?, 
                    reference_number = ?, 
                    reference_date = ?, 
                    face_value = ?, 
                    purchase_price = ?, 
                    maturity_date = ?, 
                    net_payable_amount = ?, 
                    interest_earned_date = ?, 
                    transfer_promotion_date = ?, 
                    cashbook_deposited_amount = ?, 
                    specific_details = ?, 
                    month = ?, 
                    year = ?
                WHERE id = ?
            `;
		return runQuery(pool, q, [
			data.investment_date,
			data.investment_details,
			data.reference_number,
			data.reference_date,
			data.face_value,
			data.purchase_price,
			data.maturity_date,
			data.net_payable_amount,
			data.interest_earned_date,
			data.transfer_promotion_date,
			data.cashbook_deposited_amount,
			data.specific_details,
			data.month,
			data.year,
			data.id
		]);
	},

	// Fetch all records
	fetchAllNamuna25InvestmentDetails: (pool) => {
		const q = `
                SELECT *,
                    DATE_FORMAT(STR_TO_DATE(investment_date, '%Y-%m-%d'), '%d-%m-%Y') AS _investment_date,
                    DATE_FORMAT(STR_TO_DATE(reference_date, '%Y-%m-%d'), '%d-%m-%Y') AS _reference_date,
                    DATE_FORMAT(STR_TO_DATE(maturity_date, '%Y-%m-%d'), '%d-%m-%Y') AS _maturity_date,
                    DATE_FORMAT(STR_TO_DATE(interest_earned_date, '%Y-%m-%d'), '%d-%m-%Y') AS _interest_earned_date,
                    DATE_FORMAT(STR_TO_DATE(transfer_promotion_date, '%Y-%m-%d'), '%d-%m-%Y') AS _transfer_promotion_date,
                    DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') AS _createdAt
                FROM ps_namuna_25_investment_register
            `;
		return runQuery(pool, q);
	},

	// Fetch record by ID
	fetchNamuna25InvestmentDetailsById: (pool, id) => {
		const q = `
                SELECT *,
                    DATE_FORMAT(STR_TO_DATE(investment_date, '%Y-%m-%d'), '%d-%m-%Y') AS _investment_date,
                    DATE_FORMAT(STR_TO_DATE(reference_date, '%Y-%m-%d'), '%d-%m-%Y') AS _reference_date,
                    DATE_FORMAT(STR_TO_DATE(maturity_date, '%Y-%m-%d'), '%d-%m-%Y') AS _maturity_date,
                    DATE_FORMAT(STR_TO_DATE(interest_earned_date, '%Y-%m-%d'), '%d-%m-%Y') AS _interest_earned_date,
                    DATE_FORMAT(STR_TO_DATE(transfer_promotion_date, '%Y-%m-%d'), '%d-%m-%Y') AS _transfer_promotion_date,
                    DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') AS _createdAt
                FROM ps_namuna_25_investment_register
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	},

	// Fetch records by financial year
	fetchNamuna25InvestmentDetailsByFinancialYear: (pool, fromYear, toYear) => {
		const q = `
                SELECT *,
                    DATE_FORMAT(STR_TO_DATE(investment_date, '%Y-%m-%d'), '%d-%m-%Y') AS _investment_date,
                    DATE_FORMAT(STR_TO_DATE(reference_date, '%Y-%m-%d'), '%d-%m-%Y') AS _reference_date,
                    DATE_FORMAT(STR_TO_DATE(maturity_date, '%Y-%m-%d'), '%d-%m-%Y') AS _maturity_date,
                    DATE_FORMAT(STR_TO_DATE(interest_earned_date, '%Y-%m-%d'), '%d-%m-%Y') AS _interest_earned_date,
                    DATE_FORMAT(STR_TO_DATE(transfer_promotion_date, '%Y-%m-%d'), '%d-%m-%Y') AS _transfer_promotion_date,
                    DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') AS _createdAt
                FROM ps_namuna_25_investment_register
                WHERE 
                    (year = ? AND month BETWEEN 4 AND 12)
                    OR
                    (year = ? AND month BETWEEN 1 AND 3)
            `;
		return runQuery(pool, q, [fromYear, toYear]);
	},

	// Fetch records by month and year
	fetchNamuna25InvestmentDetailsByMonthAndYear: (pool, month, year) => {
		let q = `
                SELECT *,
                    DATE_FORMAT(STR_TO_DATE(investment_date, '%Y-%m-%d'), '%d-%m-%Y') AS _investment_date,
                    DATE_FORMAT(STR_TO_DATE(reference_date, '%Y-%m-%d'), '%d-%m-%Y') AS _reference_date,
                    DATE_FORMAT(STR_TO_DATE(maturity_date, '%Y-%m-%d'), '%d-%m-%Y') AS _maturity_date,
                    DATE_FORMAT(STR_TO_DATE(interest_earned_date, '%Y-%m-%d'), '%d-%m-%Y') AS _interest_earned_date,
                    DATE_FORMAT(STR_TO_DATE(transfer_promotion_date, '%Y-%m-%d'), '%d-%m-%Y') AS _transfer_promotion_date,
                    DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') AS _createdAt
                FROM ps_namuna_25_investment_register
                ${month || year ? 'WHERE' : ''}
                ${month ? `month = ?` : ''}
                ${year ? `${month ? ' AND' : ''} year = ?` : ''}
            `;
		return runQuery(pool, q, [month, year]);
	},

	// Fetch records by year
	fetchNamuna25InvestmentDetailsByYear: (pool, year) => {
		const q = `
                SELECT *,
                    DATE_FORMAT(STR_TO_DATE(investment_date, '%Y-%m-%d'), '%d-%m-%Y') AS _investment_date,
                    DATE_FORMAT(STR_TO_DATE(reference_date, '%Y-%m-%d'), '%d-%m-%Y') AS _reference_date,
                    DATE_FORMAT(STR_TO_DATE(maturity_date, '%Y-%m-%d'), '%d-%m-%Y') AS _maturity_date,
                    DATE_FORMAT(STR_TO_DATE(interest_earned_date, '%Y-%m-%d'), '%d-%m-%Y') AS _interest_earned_date,
                    DATE_FORMAT(STR_TO_DATE(transfer_promotion_date, '%Y-%m-%d'), '%d-%m-%Y') AS _transfer_promotion_date,
                    DATE_FORMAT(STR_TO_DATE(createdAt, '%Y-%m-%d'), '%d-%m-%Y') AS _createdAt
                FROM ps_namuna_25_investment_register
                WHERE year = ?
            `;
		return runQuery(pool, q, [year]);
	},
	deleteNamuna25InvestmentDetails: (pool, id) => {
		const q = `
                DELETE FROM ps_namuna_25_investment_register
                WHERE id = ?
            `;
		return runQuery(pool, q, [id]);
	}
};

module.exports = namuna25InvestmentDetailsModel;
