const { runQuery } = require("../../utils/runQuery");

const lokAdalatNoticesModel = {
    add: (pool, noticeData) => {
        const query = `
            INSERT INTO ps_lok_adalat_notices (
                applicant_name,
                amount,
                amount_in_words,
                court_date,
                court_time,
                court_address,
                date_of_settlement_acceptance,
                place,
                print_date,
                month,
                year,
                createdAt,
                updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

        const values = [
            noticeData.applicant_name,
            noticeData.amount,
            noticeData.amount_in_words,
            noticeData.court_date,
            noticeData.court_time,
            noticeData.court_address,
            noticeData.date_of_settlement_acceptance,
            noticeData.place,
            noticeData.print_date,
            noticeData.month,
            noticeData.year,
        ];

        return runQuery(pool, query, values);
    },

    update: (pool, noticeData) => {
        const query = `
            UPDATE ps_lok_adalat_notices SET
                applicant_name = ?,
                amount = ?,
                amount_in_words = ?,
                court_date = ?,
                court_time = ?,
                court_address = ?,
                date_of_settlement_acceptance = ?,
                place = ?,
                print_date = ?,
                month = ?,
                year = ?,
                updatedAt = NOW()
            WHERE id = ?
        `;

        const values = [
            noticeData.applicant_name,
            noticeData.amount,
            noticeData.amount_in_words,
            noticeData.court_date,
            noticeData.court_time,
            noticeData.court_address,
            noticeData.date_of_settlement_acceptance,
            noticeData.place,
            noticeData.print_date,
            noticeData.month,
            noticeData.year,
            noticeData.id,
        ];

        return runQuery(pool, query, values);
    },

    delete: (pool, lokAdalatNoticeId) => {
        const query = `DELETE FROM ps_lok_adalat_notices WHERE id = ?`;
        return runQuery(pool, query, [lokAdalatNoticeId]);
    },

    lokAdalatNoticeId: (pool, lokAdalatNoticeId) => {
        const query = `SELECT * FROM ps_lok_adalat_notices WHERE id = ?`;
        return runQuery(pool, query, [lokAdalatNoticeId]);
    },

    lokAdalatNoticeByYear: (pool, year) => {
        const query = `SELECT * FROM ps_lok_adalat_notices WHERE year = ? ORDER BY id DESC`;
        return runQuery(pool, query, [year]);
    },


    lokAdalatNoticeByYearRange: (pool, fromYear, toYear) => {
        const query = `SELECT * FROM ps_lok_adalat_notices WHERE 
        
                (year = ? AND month >= 4) OR 
                (year > ? AND year < ?) OR
                (year = ? AND month <= 3)
                
                ORDER BY id DESC`;
        return runQuery(pool, query, [fromYear, fromYear, toYear, toYear]);
    },

    lokAdalatNoticeByMonthYear: (pool, month, year) => {
        const query = `SELECT * FROM ps_lok_adalat_notices WHERE month = ? AND year = ? ORDER BY id DESC`;
        return runQuery(pool, query, [month, year]);
    },

    list: (pool) => {
        const query = `SELECT * FROM ps_lok_adalat_notices ORDER BY id DESC`;
        return runQuery(pool, query, []);
    },
};

module.exports = lokAdalatNoticesModel;
