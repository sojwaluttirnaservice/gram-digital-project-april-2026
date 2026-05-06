const { runQuery } = require("../../utils/runQuery");

const namuna11Model = {
    // Save a new record
    saveNamuna11Details: (pool, data) => {
        const q = `
            INSERT INTO ps_namuna_11 (
                month,
                year,
                name_of_person,
                address_of_person,
                nature_of_demand,
                authority_for_demand,
                demand_installment,
                demand_amount,
                demand_total_amount,
                bill_number,
                bill_date,
                receipt_number,
                receipt_date,
                recovered_amount,
                order_number,
                order_date,
                exemption_amount,
                remaining_amount,
                remarks
            ) VALUES (?)
        `;
        const insertArray = [
            data.month,
            data.year,
            data.name_of_person,
            data.address_of_person,
            data.nature_of_demand,
            data.authority_for_demand,
            data.demand_installment,
            data.demand_amount,
            data.demand_total_amount,
            data.bill_number,
            data.bill_date,
            data.receipt_number,
            data.receipt_date,
            data.recovered_amount,
            data.order_number,
            data.order_date,
            data.exemption_amount,
            data.remaining_amount,
            data.remarks,
        ];
        return runQuery(pool, q, [insertArray]);
    },

    // Update an existing record by ID
    updateNamuna11Details: (pool, data) => {
        const q = `
            UPDATE ps_namuna_11
            SET 
                month = ?,
                year = ?,
                name_of_person = ?,
                address_of_person = ?,
                nature_of_demand = ?,
                authority_for_demand = ?,
                demand_installment = ?,
                demand_amount = ?,
                demand_total_amount = ?,
                bill_number = ?,
                bill_date = ?,
                receipt_number = ?,
                receipt_date = ?,
                recovered_amount = ?,
                order_number = ?,
                order_date = ?,
                exemption_amount = ?,
                remaining_amount = ?,
                remarks = ?
            WHERE id = ?
        `;
        const updateArray = [
            data.month,
            data.year,
            data.name_of_person,
            data.address_of_person,
            data.nature_of_demand,
            data.authority_for_demand,
            data.demand_installment,
            data.demand_amount,
            data.demand_total_amount,
            data.bill_number,
            data.bill_date,
            data.receipt_number,
            data.receipt_date,
            data.recovered_amount,
            data.order_number,
            data.order_date,
            data.exemption_amount,
            data.remaining_amount,
            data.remarks,
            data.id,
        ];
        return runQuery(pool, q, updateArray);
    },

    // Fetch all records
    fetchAllNamuna11Details: (pool) => {
        const q = `
            SELECT *,
                IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
            FROM ps_namuna_11
        `;
        return runQuery(pool, q)
    },

    // Fetch record by ID
    fetchNamuna11DetailsById: (pool, id) => {
        const q = `
            SELECT *,
                IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
            FROM ps_namuna_11 
            WHERE id = ?
        `;
        return runQuery(pool, q, [id])
    },

    // Fetch records by Month and Year
    fetchByMonthAndYear: (pool, month, year) => {
        const q = `
            SELECT *,
                IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
            FROM ps_namuna_11 
            WHERE month = ? AND year = ?
        `;
        return runQuery(pool, q, [month, year]);
    },

    fetchByYear: (pool, year) => {
        const q = `
             SELECT *,
                IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
            FROM ps_namuna_11 
            WHERE year = ?
        `;
        return runQuery(pool, q, [year]);
    },

    // Fetch records by Year financial year
    fetchFinancialYear: (pool, fromYear, toYear) => {
        const q = `
            SELECT *,
                IFNULL(DATE_FORMAT(bill_date, '%d-%m-%Y'), 'Invalid Date') AS _bill_date,
                IFNULL(DATE_FORMAT(receipt_date, '%d-%m-%Y'), 'Invalid Date') AS _receipt_date,
                IFNULL(DATE_FORMAT(order_date, '%d-%m-%Y'), 'Invalid Date') AS _order_date
            FROM ps_namuna_11 
            WHERE 
                (year = ? AND month BETWEEN 4 AND 12)
                OR
                (year = ? AND month BETWEEN 1 AND 3)
        `;

        return runQuery(pool, q, [
            fromYear, // Apr–Dec (e.g. 2025)
            toYear    // Jan–Mar (e.g. 2026)
        ]);
    },

    // Delete record by ID
    deleteNamuna11DetailsById: (pool, id) => {
        const q = `DELETE FROM ps_namuna_11 WHERE id = ?`;
        return runQuery(pool, q);
    },
};

module.exports = namuna11Model;
