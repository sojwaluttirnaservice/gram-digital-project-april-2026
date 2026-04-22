const HomeModel = require('../../model/HomeModel');
const namuna22Model = require('../../model/namuna/namuna22Model');

const namuna22Controller = {
    // Render the Namuna 22 page
    renderNamuna22Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna22Model.fetchAllNamuna22DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna22Model.fetchAllNamuna22DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna22Model.fetchAllNamuna22Details(res.pool);
            }

            res.render('user/namuna/namuna22/namuna-22-page.pug', {
                gp: _gp[0],
                namuna22Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 22 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 22 entry
    renderNamuna22CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna22/namuna-22-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 22 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 22 entry
    renderEditNamuna22Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna22Entry = await namuna22Model.fetchNamuna22DetailsById(res.pool, id);

            res.render('user/namuna/namuna22/namuna-22-edit-page.pug', {
                gp: _gp[0],
                namuna22Entry: _namuna22Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 22 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 22 report
    renderNamuna22Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna22Details = [];
            if (month && year) {
                _namuna22Details = await namuna22Model.fetchAllNamuna22DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else {
                _namuna22Details = await namuna22Model.fetchAllNamuna22Details(res.pool);
            }

            res.render('user/namuna/namuna22/namuna-22-print.pug', {
                gp: _gp[0],
                namuna22Details: _namuna22Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 22 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 22 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 22 details
    saveNamuna22Details: async (req, res) => {
        try {
            const result = await namuna22Model.saveNamuna22Details(res.pool, req.body);

            if (result.affectedRows >= 1) {
                res.status(200).json({
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

    // Update Namuna 22 details
    updateNamuna22Details: async (req, res) => {
        try {
            const result = await namuna22Model.updateNamuna22Details(res.pool, req.body);

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

    // Delete Namuna 22 details
    deleteNamuna22Details: async (req, res) => {
        try {
            const result = await namuna22Model.deleteNamuna22Details(res.pool, req.body.id);
            res.status(200).json({
                call: 1,
                message: 'Details deleted successfully',
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error deleting details',
                error,
            });
        }
    },

    // Fetch Namuna 22 details by ID
    fetchNamuna22DetailsById: async (req, res) => {
        try {
            const result = await namuna22Model.fetchNamuna22DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 22 details by month and year
    fetchAllNamuna22DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna22Model.fetchAllNamuna22DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna22Model.fetchAllNamuna22(res.pool);
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

    // Fetch Namuna 22 details by year
    fetchNamuna22DetailsByYear: async (req, res) => {
        try {
            const result = await namuna22Model.fetchAllNamuna22DetailsByYear(
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

    // Fetch all Namuna 22 details
    fetchAllNamuna22Details: async (req, res) => {
        try {
            const result = await namuna22Model.fetchAllNamuna22(res.pool);
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

module.exports = namuna22Controller;
