const { runQuery } = require('../../utils/runQuery');

const rtiModel = {
    getAllDisclosures: (pool) => {
        const q = `SELECT * FROM ps_rti_points_pdf ORDER BY from_year DESC, point_number ASC`;
        return runQuery(pool, q);
    },
    saveNewDisclosure: (pool, data) => {
        const q = `INSERT INTO ps_rti_points_pdf(from_year, to_year, document_name, saved_path, description, point_number) VALUES (?);`;
        const insertArr = [data.from_year, data.to_year, data.document_name, data.saved_path, data.description || '', data.point_number];
        return runQuery(pool, q, [insertArr]);
    },
    removeDisclosure: (pool, id) => {
        const q = `DELETE FROM ps_rti_points_pdf WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },
    getById: (pool, id) => {
        const q = `SELECT * FROM ps_rti_points_pdf WHERE id = ?`;
        return runQuery(pool, q, [id]);
    }
};

module.exports = rtiModel;
