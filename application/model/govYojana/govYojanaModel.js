const { runQuery } = require("../../utils/runQuery");

const govYojanaModel = {
  list: (pool) => {
    let q = `SELECT * FROM ps_gov_yojna_file_list ORDER BY id DESC`;
    return runQuery(pool, q);
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
      govYojanaData.is_visible ?? 1,
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
  },
};

module.exports = govYojanaModel;
