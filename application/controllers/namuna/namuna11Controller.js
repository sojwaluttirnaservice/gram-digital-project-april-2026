const HomeModel = require('../../model/HomeModel');
const namuna11Model = require('../../model/namuna/namuna11Model');

const namuna11Controller = {
    // Render the Namuna 11 page
    renderNamuna11Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna11Model.fetchByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna11Model.fetchByYear(res.pool, year);
            } else {
                reportData = await namuna11Model.fetchAllNamuna11Details(res.pool);
            }

            res.render('user/namuna/namuna11/namuna-11-page.pug', {
                gp: _gp[0],
                namuna11Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 11 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 11 entry
    renderNamuna11CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna11/namuna-11-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 11 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 11 entry
    renderEditNamuna11Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna11Entry = await namuna11Model.fetchNamuna11DetailsById(res.pool, id);

            res.render('user/namuna/namuna11/namuna-11-edit-page.pug', {
                gp: _gp[0],
                namuna11Entry: _namuna11Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 11 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 11 report
    renderNamuna11Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna11Details = [];
            if (month && year) {
                _namuna11Details = await namuna11Model.fetchByMonthAndYear(res.pool, month, year);
            } else {
                _namuna11Details = await namuna11Model.fetchAllNamuna11Details(res.pool);
            }

            res.render('user/namuna/namuna11/namuna-11-print.pug', {
                gp: _gp[0],
                namuna11Details: _namuna11Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 11 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 11 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 11 details
    saveNamuna11Details: async (req, res) => {
        try {
            const result = await namuna11Model.saveNamuna11Details(res.pool, req.body);

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

    // Update Namuna 11 details
    updateNamuna11Details: async (req, res) => {
        try {
            const result = await namuna11Model.updateNamuna11Details(res.pool, req.body);

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

    // Delete Namuna 11 details
    deleteNamuna11Details: async (req, res) => {
        try {
            const result = await namuna11Model.deleteNamuna11DetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 11 details by ID
    fetchNamuna11DetailsById: async (req, res) => {
        try {
            const result = await namuna11Model.fetchNamuna11DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 11 details by month and year
    fetchAllNamuna11DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna11Model.fetchByMonthAndYear(res.pool);
            } else {
                result = await namuna11Model.fetchAllNamuna11Details(res.pool);
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

    // Fetch Namuna 11 details by year
    fetchNamuna11DetailsByYear: async (req, res) => {
        try {
            const result = await namuna11Model.fetchByYear(res.pool, req.params.year);
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

    // Fetch all Namuna 11 details
    fetchAllNamuna11Details: async (req, res) => {
        try {
            const result = await namuna11Model.fetchAllNamuna11Details(res.pool);
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

module.exports = namuna11Controller;
