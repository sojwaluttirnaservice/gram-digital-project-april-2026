const HomeModel = require('../../model/HomeModel');
const namuna20Model = require('../../model/namuna/namuna20Model');

const namuna20Controller = {
    // Render the Namuna 20 page
    renderNamuna20Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna20Model.fetchAllNamuna20DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna20Model.fetchAllNamuna20DetailsByYear(
                    res.pool,
                    year
                );
            } else {
                reportData = await namuna20Model.fetchAllNamuna20Details(res.pool);
            }

            res.render('user/namuna/namuna20/namuna-20-page.pug', {
                gp: _gp[0],
                namuna20Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 20 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 20 entry
    renderNamuna20CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna20/namuna-20-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 20 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 20 entry
    renderEditNamuna20Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna20Entry = await namuna20Model.fetchNamuna20DetailsById(
                res.pool,
                id
            );

            res.render('user/namuna/namuna20/namuna-20-edit-page.pug', {
                gp: _gp[0],
                namuna20Entry: _namuna20Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 20 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 20 report
    renderNamuna20Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna20Details = [];
            if (month && year) {
                _namuna20Details =
                    await namuna20Model.fetchAllNamuna20DetailsByMonthAndYear(
                        res.pool,
                        month,
                        year
                    );
            } else {
                _namuna20Details = await namuna20Model.fetchAllNamuna20Details(
                    res.pool
                );
            }

            res.render('user/namuna/namuna20/namuna-20-print.pug', {
                gp: _gp[0],
                namuna20Details: _namuna20Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 20 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 20 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 20 details
    saveNamuna20Details: async (req, res) => {
        try {
            const result = await namuna20Model.saveNamuna20Details(res.pool, req.body);
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

    // Update Namuna 20 details
    updateNamuna20Details: async (req, res) => {
        try {
            const result = await namuna20Model.updateNamuna20Details(
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

    // Delete Namuna 20 details
    deleteNamuna20Details: async (req, res) => {
        try {
            const result = await namuna20Model.deleteNamuna20Details(
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

    // Fetch Namuna 20 details by ID
    fetchNamuna20DetailsById: async (req, res) => {
        try {
            const result = await namuna20Model.fetchNamuna20DetailsById(
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

    // Fetch Namuna 20 details by month and year
    fetchAllNamuna20DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna20Model.fetchAllNamuna20DetailsByMonthAndYear(
                    res.pool
                );
            } else {
                result = await namuna20Model.fetchAllNamuna20(res.pool);
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

    // Fetch Namuna 20 details by year
    fetchNamuna20DetailsByYear: async (req, res) => {
        try {
            const result = await namuna20Model.fetchAllNamuna20DetailsByYear(
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

    // Fetch all Namuna 20 details
    fetchAllNamuna20Details: async (req, res) => {
        try {
            const result = await namuna20Model.fetchAllNamuna20(res.pool);
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

module.exports = namuna20Controller;
