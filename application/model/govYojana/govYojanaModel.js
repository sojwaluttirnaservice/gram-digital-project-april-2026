const { runQuery } = require('../../utils/runQuery');

const govYojanaModel = {
	list: (pool) => {
		let q = `SELECT * FROM ps_gov_yojna_file_list ORDER BY id DESC`;
		return runQuery(pool, q);
	},

	listWithBeneficiaries: async (pool) => {
		let q = `
		SELECT
			f.id,
			f.yojana_name,
			f.website_link,
			f.yojana_description,
			f.required_documents_list,
			f.yojana_status,
			f.start_date,
			f.image_banner,
			f.is_visible,
			f.file_name,
			f.createdAt,
			f.updatedAt,
			COALESCE(
				(
					SELECT JSON_ARRAYAGG(
						JSON_OBJECT(
							'id', b.id,
							'yojana_id', b.yojana_id,
							'from_year', b.from_year,
							'to_year', b.to_year,
							'document_name', b.document_name,
							'document_desc', b.document_desc,
							'file_name', b.file_name,
							'createdAt', b.createdAt,
							'updatedAt', b.updatedAt
						)
					)
					FROM ps_gov_yojna_beneficiary_list b
					WHERE b.yojana_id = f.id
				),
				JSON_ARRAY()
			) AS beneficiaryLists
		FROM ps_gov_yojna_file_list f
		ORDER BY f.id DESC;
		`;

		return runQuery(pool, q)
	},

	getById: (pool, id) => {
		let q = `SELECT * FROM ps_gov_yojna_file_list WHERE id = ?`;
		return runQuery(pool, q, [+id]);
	},

	update: (pool, govYojanaData) => {
		let q = `
        UPDATE ps_gov_yojna_file_list
        SET
            yojana_name = ?,
            website_link = ?,
            yojana_description = ?,
            required_documents_list = ?,
            yojana_status = ?,
            start_date = ?,
            is_visible = ?,
            updatedAt = CURRENT_TIMESTAMP
    `;

		let updateArr = [
			govYojanaData.yojana_name,
			govYojanaData.website_link || null,
			govYojanaData.yojana_description || null,
			govYojanaData.required_documents_list || null,
			govYojanaData.yojana_status,
			govYojanaData.start_date || null,
			govYojanaData.is_visible ?? 1
		];

		/* =====================================
        OPTIONAL IMAGE UPDATE
    ===================================== */

		if (govYojanaData.image_banner) {
			q += `,
            image_banner = ?
        `;

			updateArr.push(govYojanaData.image_banner);
		}

		/* =====================================
        OPTIONAL FILE UPDATE
    ===================================== */

		if (govYojanaData.file_name) {
			q += `,
            file_name = ?
        `;

			updateArr.push(govYojanaData.file_name);
		}

		q += `
        WHERE id = ?
    `;

		updateArr.push(govYojanaData.id);

		return runQuery(pool, q, updateArr);
	}
};

module.exports = govYojanaModel;
