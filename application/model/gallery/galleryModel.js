const { runQuery } = require('../../utils/runQuery');

const galleryModel = {
    getGalleryImageList: (pool) => {
        const q = `SELECT * FROM ps_gallary`;
        return runQuery(pool, q);
    },
    saveNewGalleryImage: (pool, data) => {
        const q = `INSERT INTO ps_gallary(g_image_name, g_image_title, g_image_desc) VALUES (?);`;
        const insertArr = [data.imageName, data.g_image_title, data.g_image_desc];
        return runQuery(pool, q, [insertArr]);
    },
    removeImageFromList: (pool, id) => {
        const q = `DELETE FROM ps_gallary WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },
    getById: (pool, id) => {
        const q = `SELECT * FROM ps_gallary WHERE id = ?`;
        return runQuery(pool, q, [id]);
    },
    editGalleryImage: (pool, id, data) => {
        let q = `UPDATE ps_gallary SET g_image_title = ?, g_image_desc = ?`;
        let params = [data.g_image_title, data.g_image_desc];
        if (data.imageName) {
            q += `, g_image_name = ?`;
            params.push(data.imageName);
        }
        q += ` WHERE id = ?`;
        params.push(id);
        return runQuery(pool, q, params);
    }
};

module.exports = galleryModel;
