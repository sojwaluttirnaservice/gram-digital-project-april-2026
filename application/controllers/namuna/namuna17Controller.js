const HomeModel = require('../../model/HomeModel');
const namuna17Model = require('../../model/namuna/namuna17Model');

const namuna17Controller = {
    renderNamuna17Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            if (fromYear && toYear) {
                reportData = await namuna17Model.fetchNamuna17ByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna17Model.fetchNamuna17ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna17Model.fetchNamuna17ByYearRange(res.pool, year - 1, year);
            } else {
                reportData = await namuna17Model.fetchAllNamuna17(res.pool);
            }

            res.render('user/namuna/namuna17/namuna-17-page.pug', {
                gp: _gp[0],
                namuna17Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 17 page: ${err.message}`);
        }
    },


    renderNamuna17CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna17/namuna-17-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 17 page: ${err.message}`);
        }
    },

    renderEditNamuna17Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna17Entry = await namuna17Model.fetchNamuna17ById(res.pool, id);

            res.render('user/namuna/namuna17/namuna-17-edit-page.pug', {
                gp: _gp[0],
                namuna17Entry: _namuna17Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 17 edit page: ${err.message}`);
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
            const result = await namuna17Model.saveNamuna17Entry(res.pool, entryData);

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
            const result = await namuna17Model.updateNamuna17Entry(res.pool, entryData);

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully updated!',
                });
            }else{
                res.status(404).json({
                    call: 0,
                    message: 'Entry not found! ',
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
            const result = await namuna17Model.deleteNamuna17Entry(res.pool, id);

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
            const result = await namuna17Model.fetchNamuna17ByMonthAndYear(res.pool, month, year);

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

    fetchAllNamuna17Entries: async (req, res) => {
        try {
            const _namuna17 = await namuna17Model.fetchAllNamuna17(res.pool);

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
                namuna17Details: _namuna17,
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

    fetchEntriesByYear: async (req, res) => {
        try {
            const { year } = req.query;
            const result = await namuna17Model.fetchNamuna17ByYear(res.pool, year);

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
                reportData = await namuna17Model.fetchNamuna17ByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna17Model.fetchNamuna17ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna17Model.fetchNamuna17ByYearRange(res.pool, year - 1, year);
            } else {
                reportData = await namuna17Model.fetchAllNamuna17(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna17/namuna-17-report-page.pug', {
                gp: _gp[0],
                namuna17Details: reportData,
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
                reportData = await namuna17Model.fetchNamuna17ByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna17Model.fetchNamuna17ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna17Model.fetchNamuna17ByYearRange(res.pool, year - 1, year);
            } else {
                reportData = await namuna17Model.fetchAllNamuna17(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);
            


            // console.log("This is the print page")
            // console.log(reportData);

            res.render('user/namuna/namuna17/namuna-17-print.pug', {
                gp: _gp[0],
                namuna17Details: reportData,
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

module.exports = namuna17Controller;
