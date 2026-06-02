const { runQuery } = require('../../utils/runQuery');

const govYojanaBeneficiaryModel = {
	listByYojanaId: (pool, yojanaId) => {
		let q = `SELECT * FROM ps_gov_yojna_beneficiary_list WHERE yojana_id = ? ORDER BY from_year DESC, id DESC`;
		return runQuery(pool, q, [+yojanaId]);
	},

	getById: (pool, id) => {
		let q = `SELECT * FROM ps_gov_yojna_beneficiary_list WHERE id = ?`;
		return runQuery(pool, q, [+id]);
	},

	create: (pool, data) => {
		let q = `
        INSERT INTO ps_gov_yojna_beneficiary_list 
        (yojana_id, from_year, to_year, document_name, document_desc, file_name)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
		let insertArr = [
			+data.yojana_id,
			+data.from_year,
			+data.to_year,
			data.document_name,
			data.document_desc || null,
			data.file_name
		];
		return runQuery(pool, q, insertArr);
	},

	update: (pool, data) => {
		let q = `
        UPDATE ps_gov_yojna_beneficiary_list
        SET
            from_year = ?,
            to_year = ?,
            document_name = ?,
            document_desc = ?,
            updatedAt = CURRENT_TIMESTAMP
    `;
		let updateArr = [
			+data.from_year,
			+data.to_year,
			data.document_name,
			data.document_desc || null
		];

		if (data.file_name) {
			q += `, file_name = ?`;
			updateArr.push(data.file_name);
		}

		q += ` WHERE id = ?`;
		updateArr.push(+data.id);

		return runQuery(pool, q, updateArr);
	},

	delete: (pool, id) => {
		let q = `DELETE FROM ps_gov_yojna_beneficiary_list WHERE id = ?`;
		return runQuery(pool, q, [+id]);
	}
};

module.exports = govYojanaBeneficiaryModel;
