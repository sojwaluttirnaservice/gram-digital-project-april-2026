const HomeModel = require('../../model/HomeModel');
const namuna16Model = require('../../model/namuna/namuna16Model');

const namuna16Controller = {
    renderNamuna16Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna16/namuna-16-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 16 page: ${err.message}`);
        }
    },

    renderEditNamuna16Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna16Entry = await namuna16Model.fetchNamuna16ById(res.pool, id);

            res.render('user/namuna/namuna16/namuna-16-edit-page.pug', {
                gp: _gp[0],
                namuna16Entry: _namuna16Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 16 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    insertEntry: async (req, res) => {
        try {
            const entryData = req.body;
            const result = await namuna16Model.saveNamuna16Entry(res.pool, entryData);

            if (result.affectedRows >= 1) {
                res.status(201).json({
                    call: 1,
                    message: 'Entry successfully inserted!',
                });
            }
        } catch (error) {
            console.error('Error inserting entry:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to insert entry. Please try again later.',
                error: error?.message,
            });
        }
    },

    updateEntry: async (req, res) => {
        try {
            const entryData = req.body;
            const result = await namuna16Model.updateNamuna16Entry(res.pool, entryData);

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully updated!',
                });
            }
        } catch (error) {
            console.error('Error updating entry:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: error?.message,
            });
        }
    },

    deleteEntry: async (req, res) => {
        try {
            const { id } = req.body;
            const result = await namuna16Model.deleteNamuna16Entry(res.pool, id);

            if (result.affectedRows == 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully deleted!',
                });
            } else {
                res.status(500).json({
                    call: 0,
                    message: 'Entry not found!',
                });
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to delete entry. Please try again later.',
                error: error?.message,
            });
        }
    },

    fetchEntriesByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            const result = await namuna16Model.fetchNamuna16ByMonthAndYear(res.pool, month, year);

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
            });
        } catch (error) {
            console.error('Error fetching entries:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: error?.message,
            });
        }
    },

    fetchEntriesByYear: async (req, res) => {
        try {
            const { year } = req.query;
            const result = await namuna16Model.fetchNamuna16ByYear(res.pool, year);

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
            });
        } catch (error) {
            console.error('Error fetching entries by year:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: error?.message,
            });
        }
    },

    renderReportPage: async (req, res) => {
        try {
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            if (fromYear && toYear) {
                reportData = await namuna16Model.fetchNamuna16ByYearRange(res.pool, fromYear, toYear);
            } else if (month && year) {
                reportData = await namuna16Model.fetchNamuna16ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna16Model.fetchNamuna16ByYearRange(res.pool, year - 1, year);
            } else {
                reportData = await namuna16Model.fetchAllNamuna16(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna16/namuna-16-report-page.pug', {
                gp: _gp[0],
                namuna16Details: reportData,
                year: year,
                month: month,
                fromYear: fromYear,
                toYear: toYear,
            });
        } catch (err) {
            console.error('Error rendering the report page:', err);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: err?.message,
            });
        }
    },

    renderPrintPage: async (req, res) => {
        try {
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            if (fromYear && toYear) {
                reportData = await namuna16Model.fetchNamuna16ByYearRange(res.pool, fromYear, toYear);
            } else if (month && year) {
                reportData = await namuna16Model.fetchNamuna16ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna16Model.fetchNamuna16ByYearRange(res.pool, year - 1, year);
            } else {
                reportData = await namuna16Model.fetchAllNamuna16(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna16/namuna-16-print.pug', {
                gp: _gp[0],
                namuna16Details: reportData,
                year: year,
                month: month,
                fromYear: fromYear,
                toYear: toYear,
            });
        } catch (err) {
            console.error('Error rendering the print page:', err);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: err?.message,
            });
        }
    },
};

module.exports = namuna16Controller;
