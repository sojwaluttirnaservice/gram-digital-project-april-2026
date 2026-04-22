const HomeModel = require('../../model/HomeModel');
const namuna30Model = require('../../model/namuna/namuna30Model');

const namuna30Controller = {
    // Render the Namuna 30 page
    renderNamuna30Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna30Model.fetchNamuna30DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna30Model.fetchNamuna30ByYear(
                    res.pool,
                    year
                );
            } else {
                reportData = await namuna30Model.fetchAllNamuna30Details(res.pool);
            }

            res.render('user/namuna/namuna30/namuna-30-page.pug', {
                gp: _gp[0],
                namuna30Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 30 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 30 entry
    renderNamuna30CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna30/namuna-30-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 30 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 30 entry
    renderEditNamuna30Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna30Entry = await namuna30Model.fetchNamuna30DetailsById(
                res.pool,
                id
            );

            res.render('user/namuna/namuna30/namuna-30-edit-page.pug', {
                gp: _gp[0],
                namuna30Entry: _namuna30Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 30 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 30 report
    renderNamuna30Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna30Details = [];
            if (month && year) {
                _namuna30Details =
                    await namuna30Model.fetchNamuna30DetailsByMonthAndYear(
                        res.pool,
                        month,
                        year
                    );
            } else {
                _namuna30Details = await namuna30Model.fetchAllNamuna30Details(
                    res.pool
                );
            }

            res.render('user/namuna/namuna30/namuna-30-print.pug', {
                gp: _gp[0],
                namuna30Details: _namuna30Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 30 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 30 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 30 details
    saveNamuna30Details: async (req, res) => {
        try {
            const result = await namuna30Model.saveNamuna30Details(res.pool, req.body);
            res.status(201).json({
                call: 1,
                message: 'Details saved successfully',
                result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error saving details',
                error,
            });
        }
    },

    // Update Namuna 30 details
    updateNamuna30Details: async (req, res) => {
        try {
            const result = await namuna30Model.updateNamuna30Details(
                res.pool,
                req.body
            );
            res.status(200).json({
                call: 1,
                message: 'Details updated successfully',
                result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error updating details',
                error,
            });
        }
    },

    // Delete Namuna 30 details
    deleteNamuna30Details: async (req, res) => {
        try {
            const result = await namuna30Model.deleteNamuna30Details(
                res.pool,
                req.body.id
            );
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

    // Fetch Namuna 30 details by ID
    fetchNamuna30DetailsById: async (req, res) => {
        try {
            const result = await namuna30Model.fetchNamuna30ById(
                res.pool,
                req.params.id
            );
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

    // Fetch Namuna 30 details by month and year
    fetchNamuna30DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna30Model.fetchNamuna30DetailsByMonthAndYear(
                    res.pool
                );
            } else {
                result = await namuna30Model.fetchAllNamuna30(res.pool);
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

    // Fetch Namuna 30 details by year
    fetchNamuna30DetailsByYear: async (req, res) => {
        try {
            const result = await namuna30Model.fetchNamuna30ByYear(
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

    // Fetch all Namuna 30 details
    fetchAllNamuna30Details: async (req, res) => {
        try {
            const result = await namuna30Model.fetchAllNamuna30(res.pool);
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

module.exports = namuna30Controller;
