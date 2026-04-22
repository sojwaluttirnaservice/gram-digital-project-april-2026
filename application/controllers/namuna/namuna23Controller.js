const HomeModel = require('../../model/HomeModel');
const namuna23Model = require('../../model/namuna/namuna23Model');

const namuna23Controller = {
    // Render the Namuna 23 page
    renderNamuna23Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna23Model.fetchNamuna23DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna23Model.fetchNamuna23DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna23Model.fetchAllNamuna23Details(res.pool);
            }

            res.render('user/namuna/namuna23/namuna-23-page.pug', {
                gp: _gp[0],
                namuna23Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 23 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 23 entry
    renderNamuna23CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna23/namuna-23-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 23 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 23 entry
    renderEditNamuna23Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna23Entry = await namuna23Model.fetchNamuna23DetailsById(res.pool, id);

            res.render('user/namuna/namuna23/namuna-23-edit-page.pug', {
                gp: _gp[0],
                namuna23Entry: _namuna23Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 23 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 23 report
    renderNamuna23Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna23Details = [];
            if (month && year) {
                _namuna23Details = await namuna23Model.fetchNamuna23DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else {
                _namuna23Details = await namuna23Model.fetchAllNamuna23Details(res.pool);
            }

            res.render('user/namuna/namuna23/namuna-23-print.pug', {
                gp: _gp[0],
                namuna23Details: _namuna23Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 23 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 23 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 23 details
    saveNamuna23Details: async (req, res) => {
        try {
            const result = await namuna23Model.saveNamuna23Details(res.pool, req.body);

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

    // Update Namuna 23 details
    updateNamuna23Details: async (req, res) => {
        try {
            const result = await namuna23Model.updateNamuna23Details(res.pool, req.body);

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

    // Delete Namuna 23 details
    deleteNamuna23Details: async (req, res) => {
        try {
            const result = await namuna23Model.deleteNamuna23DetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 23 details by ID
    fetchNamuna23DetailsById: async (req, res) => {
        try {
            const result = await namuna23Model.fetchNamuna23DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 23 details by month and year
    fetchAllNamuna23DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna23Model.fetchNamuna23DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna23Model.fetchAllNamuna23(res.pool);
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

    // Fetch Namuna 23 details by year
    fetchNamuna23DetailsByYear: async (req, res) => {
        try {
            const result = await namuna23Model.fetchNamuna23DetailsByYear(
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

    // Fetch all Namuna 23 details
    fetchAllNamuna23Details: async (req, res) => {
        try {
            const result = await namuna23Model.fetchAllNamuna23(res.pool);
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

module.exports = namuna23Controller;
