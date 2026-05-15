const fmtDateField = require("../../utils/fmtDateField")
const { runQuery } = require("../../utils/runQuery")

const devWorksModel = {

    /* =========================================================
        DEV WORKS
    ========================================================= */

    save: (pool, devWorkData) => {

        let q = `
            INSERT INTO ps_dev_works
            (
                from_year,
                to_year,
                title,
                scheme,
                uploaded_document,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `

        let insertArr = [
            devWorkData.from_year,
            devWorkData.to_year,
            devWorkData.title,
            devWorkData.scheme,
            devWorkData.uploaded_document,
            devWorkData.status,
        ]

        return runQuery(pool, q, insertArr)
    },



    update: (pool, devWorkData) => {

        let q = `
            UPDATE ps_dev_works
            SET
                from_year = ?,
                to_year = ?,
                title = ?,
                scheme = ?,
                uploaded_document = ?,
                status = ?
            WHERE id = ?
        `

        let updateArr = [
            devWorkData.from_year,
            devWorkData.to_year,
            devWorkData.title,
            devWorkData.scheme,
            devWorkData.uploaded_document,
            devWorkData.status,
            devWorkData.id,
        ]

        return runQuery(pool, q, updateArr)
    },



    delete: (pool, id) => {

        let q = `
            DELETE FROM ps_dev_works
            WHERE id = ?
        `

        return runQuery(pool, q, [id])
    },



    fetchById: (pool, id) => {

        let q = `
            SELECT pdw.*,
                ${fmtDateField('pdw.createdAt')},
                ${fmtDateField('pdw.updatedAt')},
                COUNT(pdwi.id) AS images_count
            FROM 
                ps_dev_works pdw

            LEFT JOIN ps_dev_works_images pdwi
                ON pdwi.dev_works_id_fk = pdw.id

            WHERE pdw.id = ?
        `

        return runQuery(pool, q, [id])
    },



    fetchAll: (pool, filters = {}) => {

        let q = `
            SELECT 
                pdw.*,

                CONCAT(
                    pdw.from_year,
                    '-',
                    pdw.to_year
                ) AS financial_year,

                ${fmtDateField('pdw.createdAt')},
                ${fmtDateField('pdw.updatedAt')},

                COUNT(pdwi.id) AS images_count,

                JSON_ARRAYAGG(
                    CASE
                        WHEN pdwi.id IS NOT NULL THEN
                            JSON_OBJECT(
                                'id', pdwi.id,
                                'title', pdwi.title,
                                'desc', pdwi.\`desc\`,
                                'uploaded_image', pdwi.uploaded_image
                            )
                    END
                ) AS images


            FROM ps_dev_works pdw

            LEFT JOIN ps_dev_works_images pdwi
                ON pdwi.dev_works_id_fk = pdw.id

            WHERE 1
        `

        let params = []

        if (filters.from_year) {

            q += ` AND pdw.from_year = ? `
            params.push(filters.from_year)
        }

        if (filters.to_year) {

            q += ` AND pdw.to_year = ? `
            params.push(filters.to_year)
        }

        if (filters.title) {

            q += ` AND pdw.title LIKE ? `
            params.push(`%${filters.title}%`)
        }

        if (filters.scheme) {

            q += ` AND pdw.scheme LIKE ? `
            params.push(`%${filters.scheme}%`)
        }

        if (filters.status) {

            q += ` AND pdw.status = ? `
            params.push(filters.status)
        }

        q += `
            GROUP BY pdw.id
            ORDER BY pdw.id DESC
        `

        return runQuery(pool, q, params)
    },



    checkDuplicateFinancialYear: (pool, devWorkData) => {

        let q = `
            SELECT id
            FROM ps_dev_works
            WHERE from_year = ?
            AND to_year = ?
        `

        let params = [
            devWorkData.from_year,
            devWorkData.to_year,
        ]

        if (devWorkData.id) {

            q += ` AND id != ? `
            params.push(devWorkData.id)
        }

        return runQuery(pool, q, params)
    },



    /* =========================================================
        IMAGES
    ========================================================= */

    saveImage: (pool, imageData) => {

        let q = `
            INSERT INTO ps_dev_works_images
            (
                dev_works_id_fk,
                title,
                \`desc\`,
                uploaded_image
            )
            VALUES (?, ?, ?, ?)
        `

        let insertArr = [
            imageData.dev_works_id_fk,
            imageData.title,
            imageData.desc,
            imageData.uploaded_image,
        ]

        return runQuery(pool, q, insertArr)
    },



    saveMultipleImages: (pool, values) => {

        let q = `
            INSERT INTO ps_dev_works_images
            (
                dev_works_id_fk,
                title,
                \`desc\`,
                uploaded_image
            )
            VALUES ?
        `

        return runQuery(pool, q, [values])
    },



    updateImage: (pool, imageData) => {

        let q = `
            UPDATE ps_dev_works_images
            SET
                title = ?,
                \`desc\` = ?,
                uploaded_image = ?
            WHERE id = ?
        `

        let updateArr = [
            imageData.title,
            imageData.desc,
            imageData.uploaded_image,
            imageData.id,
        ]

        return runQuery(pool, q, updateArr)
    },



    deleteImage: (pool, id) => {

        let q = `
            DELETE FROM ps_dev_works_images
            WHERE id = ?
        `

        return runQuery(pool, q, [id])
    },



    deleteAllImagesByDevWorkId: (pool, devWorkId) => {

        let q = `
            DELETE FROM ps_dev_works_images
            WHERE dev_works_id_fk = ?
        `

        return runQuery(pool, q, [devWorkId])
    },



    fetchImageById: (pool, id) => {

        let q = `
            SELECT *,
                ${fmtDateField('createdAt')},
                ${fmtDateField('updatedAt')}
            FROM ps_dev_works_images
            WHERE id = ?
        `

        return runQuery(pool, q, [id])
    },



    fetchImagesByDevWorkId: (pool, devWorkId) => {

        let q = `
            SELECT *,
                ${fmtDateField('createdAt')},
                ${fmtDateField('updatedAt')}
            FROM ps_dev_works_images
            WHERE dev_works_id_fk = ?
            ORDER BY id DESC
        `

        return runQuery(pool, q, [devWorkId])
    },



    /* =========================================================
        JOINED DATA
    ========================================================= */

    fetchFullDetailsById: (pool, id) => {

        let q = `
            SELECT
                pdw.*,

                pdwi.id AS image_id,
                pdwi.title AS image_title,
                pdwi.\`desc\` AS image_desc,
                pdwi.uploaded_image

            FROM ps_dev_works pdw

            LEFT JOIN ps_dev_works_images pdwi
                ON pdwi.dev_works_id_fk = pdw.id

            WHERE pdw.id = ?
        `

        return runQuery(pool, q, [id])
    },

}

module.exports = devWorksModel