const HomeModel = require('../../model/HomeModel');
const namuna32Model = require('../../model/namuna/namuna32Model');

const namuna32Controller = {
    // Render the Namuna 32 page
    renderNamuna32Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna32Model.fetchNamuna32DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna32Model.fetchNamuna32DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna32Model.fetchAllNamuna32Details(res.pool);
            }

            res.render('user/namuna/namuna32/namuna-32-page.pug', {
                gp: _gp[0],
                namuna32Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 32 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 32 entry
    renderNamuna32CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna32/namuna-32-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 32 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 32 entry
    renderEditNamuna32Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna32Entry = await namuna32Model.fetchNamuna32DetailsById(res.pool, id);

            res.render('user/namuna/namuna32/namuna-32-edit-page.pug', {
                gp: _gp[0],
                namuna32Entry: _namuna32Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 32 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 32 report
    renderNamuna32Print: async (req, res) => {
        try {
            const { month, year, id } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna32Details = [];
            if (month && year) {
                _namuna32Details = await namuna32Model.fetchNamuna32DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (id) {
                _namuna32Details = await namuna32Model.fetchNamuna32DetailsById(res.pool, id);
            } else {
                _namuna32Details = await namuna32Model.fetchAllNamuna32Details(res.pool);
            }

            console.log(_namuna32Details)

            res.render('user/namuna/namuna32/namuna-32-print.pug', {
                gp: _gp[0],
                namuna32Details: _namuna32Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 32 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 32 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 32 details
    saveNamuna32Details: async (req, res) => {
        try {
            const result = await namuna32Model.saveNamuna32Details(res.pool, req.body);

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

    // Update Namuna 32 details
    updateNamuna32Details: async (req, res) => {
        try {
            const result = await namuna32Model.updateNamuna32Details(res.pool, req.body);

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

    // Delete Namuna 32 details
    deleteNamuna32Details: async (req, res) => {
        try {
            const result = await namuna32Model.deleteNamuna32DetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 32 details by ID
    fetchNamuna32DetailsById: async (req, res) => {
        try {
            const result = await namuna32Model.fetchNamuna32DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 32 details by month and year
    fetchAllNamuna32DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna32Model.fetchNamuna32DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna32Model.fetchAllNamuna32Details(res.pool);
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

    // Fetch Namuna 32 details by year
    fetchNamuna32DetailsByYear: async (req, res) => {
        try {
            const result = await namuna32Model.fetchNamuna32DetailsByYear(
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

    // Fetch all Namuna 32 details
    fetchAllNamuna32Details: async (req, res) => {
        try {
            const result = await namuna32Model.fetchAllNamuna32(res.pool);
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

module.exports = namuna32Controller;
