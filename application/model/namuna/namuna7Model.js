const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const { fmtDateToTimestamp } = require("../../utils/sqlDates");

const namuna7Model = {

    // ===============================
    // SAVE
    // ===============================
    save: (pool, data) => {

        const q = `
            INSERT INTO ps_namuna_7
            (
                recipient_name,
                date,
                ps_payment_information_id_fk,
                ps_payment_receipt_samanya_id_fk,

                payment_for,

                reason_in_words,
                amount,
                payment_medium,
                check_no,
                demand_draft_no,
                rtgs_no,
                transaction_number,
                other_id,
                other_id_name,

                payment_type,
                payment_for_desc,
                tax_category
            )
            VALUES (?)
        `;

        const values = [
            data.recipient_name,
            data.date,
            data.ps_payment_information_id_fk || null,
            data.ps_payment_receipt_samanya_id_fk || null,

            data.payment_for,

            data.reason_in_words || null,
            data.amount,
            data.payment_medium,
            data.check_no || null,
            data.demand_draft_no || null,
            data.rtgs_no || null,
            data.transaction_number || null,
            data.other_id || null,
            data.other_id_name || null,

            "CERTIFICATE",
            data.payment_for_desc,
            data.tax_category
        ];

        return runQuery(pool, q, [values]);
    },


    // ===============================
    // UPDATE
    // ===============================
    update: (pool, id, data) => {

        const q = `
            UPDATE ps_namuna_7
            SET
                recipient_name = ?,
                date = ?,
                ps_payment_information_id_fk = ?,
                payment_for = ?,
                reason_in_words = ?,
                amount = ?,
                payment_medium = ?,
                check_no = ?,
                demand_draft_no = ?,
                rtgs_no = ?,
                transaction_number = ?,
                other_id = ?,
                other_id_name = ?
            WHERE id = ?
        `;

        const params = [
            data.recipient_name,
            data.date,
            data.ps_payment_information_id_fk || null,
            data.payment_for,
            data.reason_in_words || null,
            data.amount,
            data.payment_medium,
            data.check_no || null,
            data.demand_draft_no || null,
            data.rtgs_no || null,
            data.transaction_number || null,
            data.other_id || null,
            data.other_id_name || null,
            id
        ];

        return runQuery(pool, q, params);
    },


    // ===============================
    // DELETE
    // ===============================
    delete: (pool, id) => {

        const q = `
            DELETE FROM ps_namuna_7
            WHERE id = ?
        `;

        return runQuery(pool, q, [id]);
    },


    // ===============================
    // GET BY ID
    // ===============================
    getById: (pool, id) => {

        const q = `
            SELECT *,
            ${fmtDateField("date")},
            ${fmtDateToTimestamp("createdAt")},
            ${fmtDateToTimestamp("updatedAt")}
            FROM ps_namuna_7
            WHERE id = ?
        `;

        return runQuery(pool, q, [id]);
    },


    // ===============================
    // LIST
    // ===============================
    list: (pool, options = {}) => {

        let q = `
            SELECT *,
            ${fmtDateField("date")},
            ${fmtDateToTimestamp("createdAt")},
            ${fmtDateToTimestamp("updatedAt")}
            FROM ps_namuna_7
  
        `;

        const params = [];

        if(options && options.taxCategory) {
            q += ` WHERE tax_category = ?`
            params.push(options.taxCategory?.toUpperCase())
        }

        q += ` ORDER BY id DESC`; // ✅ always last


        return runQuery(pool, q, params);
    }

};

module.exports = namuna7Model;