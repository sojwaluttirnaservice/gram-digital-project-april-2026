const HomeModel = require('../../model/HomeModel');
const namuna28Model = require('../../model/namuna/namuna28Model');

const namuna28Controller = {
    // Render the Namuna 28 page
    renderNamuna28Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna28Model.fetchNamuna28DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna28Model.fetchNamuna28DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna28Model.fetchAllNamuna28Details(res.pool);
            }

            res.render('user/namuna/namuna28/namuna-28-page.pug', {
                gp: _gp[0],
                namuna28Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 28 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 28 entry
    renderNamuna28CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna28/namuna-28-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 28 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 28 entry
    renderEditNamuna28Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna28Entry = await namuna28Model.fetchNamuna28DetailsById(res.pool, id);

            res.render('user/namuna/namuna28/namuna-28-edit-page.pug', {
                gp: _gp[0],
                namuna28Entry: _namuna28Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 28 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 28 report
    renderNamuna28Print: async (req, res) => {
        try {
            const { month, year, fromYear, toYear } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna28Details = [];
            if (month && year) {
                _namuna28Details = await namuna28Model.fetchNamuna28DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (fromYear && toYear) {
                _namuna28Details = await namuna28Model.fetchNamuna28DetailsByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else {
                _namuna28Details = await namuna28Model.fetchAllNamuna28Details(res.pool);
            }

            res.render('user/namuna/namuna28/namuna-28-print.pug', {
                gp: _gp[0],
                namuna28Details: _namuna28Details,
                month,
                year,
                fromYear,
                toYear,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 28 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 28 page: ${err.message}`,
                error: err,
            });
        }
    },

    

    // Save Namuna 28 details
    saveNamuna28Details: async (req, res) => {
        try {
            const data = req.body;

            const { month, year } = data;
            const _existingEntriesForMonthYear = await namuna28Model.fetchNamuna28DetailsByMonthAndYear(
                res.pool,
                month,
                year
            );

            if (_existingEntriesForMonthYear.length) {
                return res.status(409).json({
                    call: 0,
                    message: 'सदर महिना व वर्षासाठी आधीच नोंद केलेली आहे',
                });
            }

            const result = await namuna28Model.saveNamuna28Details(res.pool, req.body);

            if (result.affectedRows >= 1) {
                res.status(201).json({
                    call: 1,
                    message: 'Details saved successfully',
                    result,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error saving details',
                error,
            });
        }
    },

    // Update Namuna 28 details
    updateNamuna28Details: async (req, res) => {
        try {
            const result = await namuna28Model.updateNamuna28Details(res.pool, req.body);

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Details updated successfully',
                    result,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error updating details',
                error,
            });
        }
    },

    // Delete Namuna 28 details
    deleteNamuna28Details: async (req, res) => {
        try {
            const result = await namuna28Model.deleteNamuna28DetailsById(res.pool, req.body.id);

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Details deleted successfully',
                    result,
                });
            }
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error deleting details',
                error,
            });
        }
    },

    // Fetch Namuna 28 details by ID
    fetchNamuna28DetailsById: async (req, res) => {
        try {
            const result = await namuna28Model.fetchNamuna28DetailsById(res.pool, req.params.id);
            res.status(200).json({
                call: 1,
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error fetching details by ID',
                error,
            });
        }
    },

    // Fetch Namuna 28 details by month and year
    fetchAllNamuna28DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna28Model.fetchNamuna28DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna28Model.fetchAllNamuna28(res.pool);
            }
            res.status(200).json({
                call: 1,
                result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error fetching details by month and year',
                error,
            });
        }
    },

    // Fetch Namuna 28 details by year
    fetchNamuna28DetailsByYear: async (req, res) => {
        try {
            const result = await namuna28Model.fetchNamuna28DetailsByYear(
                res.pool,
                req.params.year
            );
            res.status(200).json({
                call: 1,
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error fetching details by year',
                error,
            });
        }
    },

    // Fetch all Namuna 28 details
    fetchAllNamuna28Details: async (req, res) => {
        try {
            const result = await namuna28Model.fetchAllNamuna28(res.pool);
            res.status(200).json({
                call: 1,
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error fetching all details',
                error,
            });
        }
    },
};

module.exports = namuna28Controller;
