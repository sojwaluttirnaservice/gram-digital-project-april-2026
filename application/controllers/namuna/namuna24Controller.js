const HomeModel = require('../../model/HomeModel');
const namuna24Model = require('../../model/namuna/namuna24Model');

const namuna24Controller = {
    // Render the Namuna 24 page
    renderNamuna24Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna24Model.fetchNamuna24DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna24Model.fetchNamuna24DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna24Model.fetchAllNamuna24Details(res.pool);
            }

            res.render('user/namuna/namuna24/namuna-24-page.pug', {
                gp: _gp[0],
                namuna24Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 24 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 24 entry
    renderNamuna24CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna24/namuna-24-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 24 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 24 entry
    renderEditNamuna24Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna24Entry = await namuna24Model.fetchNamuna24DetailsById(res.pool, id);

            res.render('user/namuna/namuna24/namuna-24-edit-page.pug', {
                gp: _gp[0],
                namuna24Entry: _namuna24Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 24 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 24 report
    renderNamuna24Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna24Details = [];
            if (month && year) {
                _namuna24Details = await namuna24Model.fetchNamuna24DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else {
                _namuna24Details = await namuna24Model.fetchAllNamuna24Details(res.pool);
            }

            res.render('user/namuna/namuna24/namuna-24-print.pug', {
                gp: _gp[0],
                namuna24Details: _namuna24Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 24 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 24 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 24 details
    saveNamuna24Details: async (req, res) => {
        try {
            const result = await namuna24Model.saveNamuna24Details(res.pool, req.body);

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

    // Update Namuna 24 details
    updateNamuna24Details: async (req, res) => {
        try {
            const result = await namuna24Model.updateNamuna24Details(res.pool, req.body);

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

    // Delete Namuna 24 details
    deleteNamuna24Details: async (req, res) => {
        try {
            const result = await namuna24Model.deleteNamuna24DetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 24 details by ID
    fetchNamuna24DetailsById: async (req, res) => {
        try {
            const result = await namuna24Model.fetchNamuna24DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 24 details by month and year
    fetchAllNamuna24DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna24Model.fetchNamuna24DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna24Model.fetchAllNamuna24(res.pool);
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

    // Fetch Namuna 24 details by year
    fetchNamuna24DetailsByYear: async (req, res) => {
        try {
            const result = await namuna24Model.fetchNamuna24DetailsByYear(
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

    // Fetch all Namuna 24 details
    fetchAllNamuna24Details: async (req, res) => {
        try {
            const result = await namuna24Model.fetchAllNamuna24(res.pool);
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

module.exports = namuna24Controller;
