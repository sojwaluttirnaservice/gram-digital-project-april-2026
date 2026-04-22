const HomeModel = require('../../model/HomeModel');
const namuna14Model = require('../../model/namuna/namuna14Model');


const namuna14Controller = {
    // Render the Namuna 14 page
    renderNamuna14Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna14Model.fetchNamuna14DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna14Model.fetchNamuna14DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna14Model.fetchAllNamuna14Details(res.pool);
            }

            res.render('user/namuna/namuna14/namuna-14-page.pug', {
                gp: _gp[0],
                namuna14Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 14 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 14 entry
    renderNamuna14CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna14/namuna-14-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 14 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 14 entry
    renderEditNamuna14Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna14Entry = await namuna14Model.fetchNamuna14DetailsById(res.pool, id);

            res.render('user/namuna/namuna14/namuna-14-edit-page.pug', {
                gp: _gp[0],
                namuna14Entry: _namuna14Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 14 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 14 report
    renderNamuna14Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna14Details = [];
            if (month && year) {
                _namuna14Details = await namuna14Model.fetchNamuna14DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else {
                _namuna14Details = await namuna14Model.fetchAllNamuna14Details(res.pool);
            }

            res.render('user/namuna/namuna14/namuna-14-print.pug', {
                gp: _gp[0],
                namuna14Details: _namuna14Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 14 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 14 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 14 details
    saveNamuna14Details: async (req, res) => {
        try {
            const result = await namuna14Model.saveNamuna14Details(res.pool, req.body);

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

    // Update Namuna 14 details
    updateNamuna14Details: async (req, res) => {
        try {
            const result = await namuna14Model.updateNamuna14Details(res.pool, req.body);

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

    // Delete Namuna 14 details
    deleteNamuna14Details: async (req, res) => {
        try {
            const result = await namuna14Model.deleteNamuna14DetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 14 details by ID
    fetchNamuna14DetailsById: async (req, res) => {
        try {
            const result = await namuna14Model.fetchNamuna14DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 14 details by month and year
    fetchAllNamuna14DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna14Model.fetchNamuna14DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna14Model.fetchAllNamuna14Details(res.pool);
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

    // Fetch Namuna 14 details by year
    fetchNamuna14DetailsByYear: async (req, res) => {
        try {
            const result = await namuna14Model.fetchNamuna14DetailsByYear(
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

    // Fetch all Namuna 14 details
    fetchAllNamuna14Details: async (req, res) => {
        try {
            const result = await namuna14Model.fetchAllNamuna14(res.pool);
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

module.exports = namuna14Controller;
