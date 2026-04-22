const HomeModel = require('../../model/HomeModel');
const namuna31Model = require('../../model/namuna/namuna31Model'); // Importing the model for Namuna 31

const namuna31Controller = {
    // Render the Namuna 31 page
    renderNamuna31Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna31Model.fetchNamuna31DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna31Model.fetchNamuna31DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna31Model.fetchAllNamuna31Details(res.pool);
            }

            res.render('user/namuna/namuna31/namuna-31-page.pug', {
                gp: _gp[0],
                namuna31Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 31 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 31 entry
    renderNamuna31CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna31/namuna-31-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 31 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 31 entry
    renderEditNamuna31Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna31Entry = await namuna31Model.fetchNamuna31DetailsById(res.pool, id);

            res.render('user/namuna/namuna31/namuna-31-edit-page.pug', {
                gp: _gp[0],
                namuna31Entry: _namuna31Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 31 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 31 report
    renderNamuna31Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna31Details = [];
            if (month && year) {
                _namuna31Details = await namuna31Model.fetchNamuna31DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else {
                _namuna31Details = await namuna31Model.fetchAllNamuna31Details(res.pool);
            }

            res.render('user/namuna/namuna31/namuna-31-print.pug', {
                gp: _gp[0],
                namuna31Details: _namuna31Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 31 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 31 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 31 details
    saveNamuna31Details: async (req, res) => {
        try {
            const result = await namuna31Model.saveNamuna31Details(res.pool, req.body);

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

    // Update Namuna 31 details
    updateNamuna31Details: async (req, res) => {
        try {
            const result = await namuna31Model.updateNamuna31Details(res.pool, req.body);

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

    // Delete Namuna 31 details
    deleteNamuna31Details: async (req, res) => {
        try {
            const result = await namuna31Model.deleteNamuna31DetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 31 details by ID
    fetchNamuna31DetailsById: async (req, res) => {
        try {
            const result = await namuna31Model.fetchNamuna31DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 31 details by month and year
    fetchAllNamuna31DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna31Model.fetchNamuna31DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else {
                result = await namuna31Model.fetchAllNamuna31Details(res.pool);
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

    // Fetch Namuna 31 details by year
    fetchNamuna31DetailsByYear: async (req, res) => {
        try {
            const result = await namuna31Model.fetchNamuna31DetailsByYear(
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

    // Fetch all Namuna 31 details
    fetchAllNamuna31Details: async (req, res) => {
        try {
            const result = await namuna31Model.fetchAllNamuna31Details(res.pool);
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

module.exports = namuna31Controller;
