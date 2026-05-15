const fmtDateField = require("../../utils/fmtDateField")
const { runQuery } = require("../../utils/runQuery")

const fundIncomeExpenseModel = {

    /* =========================================================
        FUND INCOME EXPENSE DETAILS
    ========================================================= */

    save: (pool, fundExpenseData) => {

        let q = `
            INSERT INTO ps_fund_income_expense_details
            (
                from_year,
                to_year,
                title,
                uploaded_document
            )
            VALUES (?, ?, ?, ?)
        `

        let insertArr = [
            fundExpenseData.from_year,
            fundExpenseData.to_year,
            fundExpenseData.title,
            fundExpenseData.uploaded_document,
        ]

        return runQuery(pool, q, insertArr)
    },



    update: (pool, fundExpenseData) => {

        let q = `
            UPDATE ps_fund_income_expense_details
            SET
                from_year = ?,
                to_year = ?,
                title = ?,
                uploaded_document = ?
            WHERE id = ?
        `

        let updateArr = [
            fundExpenseData.from_year,
            fundExpenseData.to_year,
            fundExpenseData.title,
            fundExpenseData.uploaded_document,
            fundExpenseData.id,
        ]

        return runQuery(pool, q, updateArr)
    },



    delete: (pool, id) => {

        let q = `
            DELETE FROM ps_fund_income_expense_details
            WHERE id = ?
        `

        return runQuery(pool, q, [id])
    },



    fetchById: (pool, id) => {

        let q = `
            SELECT pfied.*,
                ${fmtDateField('pfied.createdAt')},
                ${fmtDateField('pfied.updatedAt')},
                COUNT(pfiedi.id) AS images_count
            FROM 
                ps_fund_income_expense_details pfied

            LEFT JOIN ps_fund_income_expense_details_images pfiedi
                ON pfiedi.fund_income_exp_id_fk = pfied.id

            WHERE pfied.id = ?
        `

        return runQuery(pool, q, [id])
    },



    fetchAll: (pool, filters = {}) => {

        let q = `
            SELECT pfied.*,
                CONCAT(from_year, '-', to_year) AS financial_year,
                ${fmtDateField('pfied.createdAt')},
                ${fmtDateField('pfied.updatedAt')},
                COUNT(pfiedi.id) AS images_count
            FROM 
                ps_fund_income_expense_details pfied
            LEFT JOIN ps_fund_income_expense_details_images pfiedi
                ON pfiedi.fund_income_exp_id_fk = pfied.id
            WHERE 1
        `

        let params = []

        if (filters.from_year) {
            q += ` AND from_year = ? `
            params.push(filters.from_year)
        }

        if (filters.to_year) {
            q += ` AND to_year = ? `
            params.push(filters.to_year)
        }

        if (filters.title) {
            q += ` AND title LIKE ? `
            params.push(`%${filters.title}%`)
        }

        q += ` ORDER BY id DESC `

        return runQuery(pool, q, params)
    },



    checkDuplicateFinancialYear: (pool, fundExpenseData) => {

        let q = `
            SELECT id
            FROM ps_fund_income_expense_details
            WHERE from_year = ?
            AND to_year = ?
        `

        let params = [
            fundExpenseData.from_year,
            fundExpenseData.to_year,
        ]

        if (fundExpenseData.id) {
            q += ` AND id != ? `
            params.push(fundExpenseData.id)
        }

        return runQuery(pool, q, params)
    },



    /* =========================================================
        IMAGES
    ========================================================= */

    saveImage: (pool, imageData) => {

        let q = `
            INSERT INTO ps_fund_income_expense_details_images
            (
                fund_income_exp_id_fk,
                title,
                \`desc\`,
                uploaded_image
            )
            VALUES (?, ?, ?, ?)
        `

        let insertArr = [
            imageData.fund_income_exp_id_fk,
            imageData.title,
            imageData.desc,
            imageData.uploaded_image,
        ]

        return runQuery(pool, q, insertArr)
    },



    saveMultipleImages: (pool, values) => {

        let q = `
            INSERT INTO ps_fund_income_expense_details_images
            (
                fund_income_exp_id_fk,
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
            UPDATE ps_fund_income_expense_details_images
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
            DELETE FROM ps_fund_income_expense_details_images
            WHERE id = ?
        `

        return runQuery(pool, q, [id])
    },



    deleteAllImagesByFundId: (pool, fundId) => {

        let q = `
            DELETE FROM ps_fund_income_expense_details_images
            WHERE fund_income_exp_id_fk = ?
        `

        return runQuery(pool, q, [fundId])
    },



    fetchImageById: (pool, id) => {

        let q = `
            SELECT *,
                ${fmtDateField('createdAt')},
                            ${fmtDateField('updatedAt')}
            FROM ps_fund_income_expense_details_images
            WHERE id = ?
        `

        return runQuery(pool, q, [id])
    },



    fetchImagesByFundId: (pool, fundId) => {

        let q = `
            SELECT *,
                ${fmtDateField('createdAt')},
                            ${fmtDateField('updatedAt')}
            FROM ps_fund_income_expense_details_images
            WHERE fund_income_exp_id_fk = ?
            ORDER BY id DESC
        `

        return runQuery(pool, q, [fundId])
    },



    /* =========================================================
        JOINED DATA
    ========================================================= */

    fetchFullDetailsById: (pool, id) => {

        let q = `
            SELECT
                pfied.*,

                pfiedi.id AS image_id,
                pfiedi.title AS image_title,
                pfiedi.\`desc\` AS image_desc,
                pfiedi.uploaded_image

            FROM ps_fund_income_expense_details pfied

            LEFT JOIN ps_fund_income_expense_details_images pfiedi
                ON pfiedi.fund_income_exp_id_fk = pfied.id

            WHERE pfied.id = ?
        `

        return runQuery(pool, q, [id])
    },

}

module.exports = fundIncomeExpenseModel