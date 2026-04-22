const HomeModel = require('../../model/HomeModel');
const namuna18Model = require('../../model/namuna/namuna18Model');

const namuna18Controller = {
    renderNamuna18Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            if (fromYear && toYear) {
                reportData = await namuna18Model.fetchNamuna18ByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna18Model.fetchNamuna18ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna18Model.fetchNamuna18ByYearRange(res.pool, year - 1, year);
            } else {
                reportData = await namuna18Model.fetchAllNamuna18(res.pool);
            }

            res.render('user/namuna/namuna18/namuna-18-page.pug', {
                gp: _gp[0],
                namuna18Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 18 page: ${err.message}`);
        }
    },

    renderNamuna18CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna18/namuna-18-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 18 create page: ${err.message}`);
        }
    },

    renderEditNamuna18Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna18Entry = await namuna18Model.fetchNamuna18ById(res.pool, id);

            res.render('user/namuna/namuna18/namuna-18-edit-page.pug', {
                gp: _gp[0],
                namuna18Entry: _namuna18Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 18 edit page: ${err.message}`);
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
            const result = await namuna18Model.saveNamuna18Entry(res.pool, entryData);

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

            console.log(entryData);
            const result = await namuna18Model.updateNamuna18Entry(res.pool, entryData);

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully updated!',
                });
            } else {
                res.status(404).json({
                    call: 0,
                    message: 'Entry not found!',
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
            const result = await namuna18Model.deleteNamuna18Entry(res.pool, id);

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
            const result = await namuna18Model.fetchNamuna18ByMonthAndYear(res.pool, month, year);

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

    fetchAllNamuna18Entries: async (req, res) => {
        try {
            let _namuna18 = await namuna18Model.fetchAllNamuna18(res.pool);

            const { fromYear, toYear } = req.query;

            if (fromYear && toYear) {
                _namuna18 = await namuna18Model.fetchNamuna18ByYearRangeWithGroup(res.pool, fromYear, toYear);
            } else {
                _namuna18 = await namuna18Model.fetchAllNamuna18(res.pool);
            }

            // console.log(_namuna18[0]?.corresponding_entries);

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
                namuna18Details: _namuna18,
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
            const result = await namuna18Model.fetchNamuna18ByYear(res.pool, year);

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
                reportData = await namuna18Model.fetchNamuna18ByYearRangeWithGroup(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna18Model.fetchNamuna18ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna18Model.fetchNamuna18ByYearRangeWithGroup(res.pool, year - 1, year);
            } else {
                reportData = await namuna18Model.fetchAllNamuna18(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna18/namuna-18-report-page.pug', {
                gp: _gp[0],
                namuna18Details: JSON.stringify(reportData),
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

            // console.log(fromYear, toYear);
            if (fromYear && toYear) {
                reportData = await namuna18Model.fetchNamuna18ByYearRangeWithGroup(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna18Model.fetchNamuna18ByMonthAndYear(res.pool, month, year);
                // console.log(reportData);
            } else if (year) {
                reportData = await namuna18Model.fetchNamuna18ByYearRangeWithGroup(res.pool, year - 1, year);
            } else {
                reportData = await namuna18Model.fetchAllNamuna18(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);

            // console.log(reportData);

            res.render('user/namuna/namuna18/namuna-18-print.pug', {
                gp: _gp[0],
                namuna18Details: reportData,
                year: year,
                month: month,
                fromYear: fromYear,
                toYear: toYear,
            });
        } catch (err) {
            console.error('Error rendering print page:', err);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: err?.message,
            });
        }
    },
};

module.exports = namuna18Controller;
