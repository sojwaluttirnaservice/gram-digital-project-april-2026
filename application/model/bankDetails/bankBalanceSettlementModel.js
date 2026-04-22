const { runQuery } = require("../../utils/runQuery")

const bankBalanceSettlementModel = {

    // Create a new settlement record
    createSettlement: (pool, data) => {
        let q = `
            INSERT INTO ps_bank_balance_settlements
            (settlement_reference, bank_id_fk, settlement_for, financial_year, settlement_upto_date, settlement_date, settlement_amount)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `

        let values = [
            data.settlement_reference,
            data.bank_id_fk,
            data.settlement_for,
            data.financial_year,
            data.settlement_upto_date,
            data.settlement_date,
            data.settlement_amount
        ]

        return runQuery(pool, q, values)
    },

    // Calculate total unsettled payments upto a given date
    calculateSettlementAmount: (pool, settlementFor, uptoDate) => {

        let q = `
            SELECT SUM(payment_amount) AS total_amount
            FROM ps_payment_information
            WHERE settlement_for = ?
            AND payment_date <= ?
            AND is_settled = 0
        `

        let values = [settlementFor, uptoDate]

        return runQuery(pool, q, values)
    },

    // Perform settlement of payments upto a given date
    settlePaymentUptoDate: (pool, data) => {

        let q = ``
        let values = []

        return runQuery(pool, q, values)
    },

    // Get settlement by ID
    getSettlementById: (pool, settlementId) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            WHERE id = ?
        `

        let values = [settlementId]

        return runQuery(pool, q, values)
    },

    // Get settlement by reference number
    getSettlementByReference: (pool, settlementReference) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            WHERE settlement_reference = ?
        `

        let values = [settlementReference]

        return runQuery(pool, q, values)
    },

    // List all settlements
    getAllSettlements: (pool) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            ORDER BY settlement_date DESC
        `

        let values = []

        return runQuery(pool, q, values)
    },

    // Get settlements by category
    getSettlementsByCategory: (pool, category) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            WHERE settlement_for = ?
        `

        let values = [category]

        return runQuery(pool, q, values)
    },

    // Get settlements by bank account
    getSettlementsByBankAccount: (pool, bankId) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            WHERE bank_id_fk = ?
        `

        let values = [bankId]

        return runQuery(pool, q, values)
    },

    // Get settlements within a date range
    getSettlementsByDateRange: (pool, startDate, endDate) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            WHERE settlement_date BETWEEN ? AND ?
        `

        let values = [startDate, endDate]

        return runQuery(pool, q, values)
    },

    // Get settlements by financial year
    getSettlementsByFinancialYear: (pool, financialYear) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            WHERE financial_year = ?
        `

        let values = [financialYear]

        return runQuery(pool, q, values)
    },

    // Get latest settlement for category
    getLatestSettlement: (pool, category) => {

        let q = `
            SELECT *
            FROM ps_bank_balance_settlements
            WHERE settlement_for = ?
            ORDER BY settlement_date DESC
            LIMIT 1
        `

        let values = [category]

        return runQuery(pool, q, values)
    },

    // Update settlement details
    updateSettlement: (pool, settlementId, data) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET settlement_amount = ?, settlement_date = ?
            WHERE id = ?
        `

        let values = [
            data.settlement_amount,
            data.settlement_date,
            settlementId
        ]

        return runQuery(pool, q, values)
    },

    // Update receipt / challan information
    updateReceiptDetails: (pool, settlementId, receiptData) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET receipt_number = ?, challan_number = ?
            WHERE id = ?
        `

        let values = [
            receiptData.receipt_number,
            receiptData.challan_number,
            settlementId
        ]

        return runQuery(pool, q, values)
    },

    // Verify settlement
    verifySettlement: (pool, settlementId, userId) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET verified_by = ?, verified_at = NOW()
            WHERE id = ?
        `

        let values = [userId, settlementId]

        return runQuery(pool, q, values)
    },

    // Cancel settlement
    cancelSettlement: (pool, settlementId, userId) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET is_cancelled = 1, cancelled_by = ?
            WHERE id = ?
        `

        let values = [userId, settlementId]

        return runQuery(pool, q, values)
    },

    activateSettlement: (pool, settlementId) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET is_active = 1
            WHERE id = ?
        `

        let values = [settlementId]

        return runQuery(pool, q, values)
    },

    deactivateSettlement: (pool, settlementId) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET is_active = 0
            WHERE id = ?
        `

        let values = [settlementId]

        return runQuery(pool, q, values)
    },

    uploadReceiptPhoto: (pool, settlementId, filePath) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET receipt_photo = ?
            WHERE id = ?
        `

        let values = [filePath, settlementId]

        return runQuery(pool, q, values)
    },

    getPendingSettlementAmount: (pool, category) => {

        let q = `
            SELECT SUM(payment_amount) AS pending_amount
            FROM ps_payment_information
            WHERE settlement_for = ?
            AND is_settled = 0
        `

        let values = [category]

        return runQuery(pool, q, values)
    },

    getOutstandingAmount: (pool, category) => {

        let q = `
            SELECT SUM(payment_amount) AS outstanding_amount
            FROM ps_payment_information
            WHERE settlement_for = ?
            AND is_settled = 0
        `

        let values = [category]

        return runQuery(pool, q, values)
    },

    markPaymentsAsSettled: (pool, settlementId, category, uptoDate) => {

        let q = `
            UPDATE ps_payment_information
            SET is_settled = 1,
                settlement_id_fk = ?
            WHERE settlement_for = ?
            AND payment_date <= ?
        `

        let values = [settlementId, category, uptoDate]

        return runQuery(pool, q, values)
    },

    reverseSettlement: (pool, settlementId, userId) => {

        let q = `
            UPDATE ps_bank_balance_settlements
            SET is_reversed = 1,
                reversed_by = ?
            WHERE id = ?
        `

        let values = [userId, settlementId]

        return runQuery(pool, q, values)
    },

    generateSettlementReference: (pool, category, financialYear) => {

        let q = `
            SELECT COUNT(*) AS total
            FROM ps_bank_balance_settlements
            WHERE settlement_for = ?
            AND financial_year = ?
        `

        let values = [category, financialYear]

        return runQuery(pool, q, values)
    },

    getSettlementSummary: (pool, financialYear) => {

        let q = `
            SELECT settlement_for, SUM(settlement_amount) AS total_settled
            FROM ps_bank_balance_settlements
            WHERE financial_year = ?
            GROUP BY settlement_for
        `

        let values = [financialYear]

        return runQuery(pool, q, values)
    },

    getTotalSettledAmount: (pool, category, financialYear) => {

        let q = `
            SELECT SUM(settlement_amount) AS total_settled
            FROM ps_bank_balance_settlements
            WHERE settlement_for = ?
            AND financial_year = ?
        `

        let values = [category, financialYear]

        return runQuery(pool, q, values)
    },

    getTotalPendingAmount: (pool, category) => {

        let q = `
            SELECT SUM(payment_amount) AS total_pending
            FROM ps_payment_information
            WHERE settlement_for = ?
            AND is_settled = 0
        `

        let values = [category]

        return runQuery(pool, q, values)
    },

    exportSettlements: (pool, filters) => {

        let q = `SELECT * FROM ps_bank_balance_settlements WHERE 1=1`
        let values = []

        if (filters.startDate && filters.endDate) {
            q += ` AND settlement_date BETWEEN ? AND ?`
            values.push(filters.startDate, filters.endDate)
        }

        if (filters.month && filters.year) {
            q += ` AND MONTH(settlement_date) = ? AND YEAR(settlement_date) = ?`
            values.push(filters.month, filters.year)
        }

        if (filters.financial_year) {
            q += ` AND financial_year = ?`
            values.push(filters.financial_year)
        }

        return runQuery(pool, q, values)
    }

}

module.exports = bankBalanceSettlementModel