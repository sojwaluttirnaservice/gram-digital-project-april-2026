const HomeModel = require('../../model/HomeModel');
const namuna20CModel = require('../../model/namuna/namuna20CModel');

const namuna20CController = {
    // Render the Namuna 20C page
    renderNamuna20CPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna20CModel.fetchNamuna20cMeasurementDetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna20CModel.fetchNamuna20cMeasurementDetailsByYear(
                    res.pool,
                    year
                );
            } else {
                reportData = await namuna20CModel.fetchAllNamuna20cMeasurementDetails(res.pool);
            }

            res.render('user/namuna/namuna20C/namuna-20C-page.pug', {
                gp: _gp[0],
                namuna20CDetails: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 20C page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 20C entry
    renderNamuna20CCreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna20C/namuna-20C-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 20C create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 20C entry
    renderEditNamuna20CPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna20CEntry = await namuna20CModel.fetchNamuna20cMeasurementDetailsById(
                res.pool,
                id
            );

            res.render('user/namuna/namuna20C/namuna-20C-edit-page.pug', {
                gp: _gp[0],
                namuna20CEntry: _namuna20CEntry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 20C edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 20C report
    renderNamuna20CPrint: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna20CDetails = [];
            if (month && year) {
                _namuna20CDetails =
                    await namuna20CModel.fetchNamuna20cMeasurementDetailsByMonthAndYear(
                        res.pool,
                        month,
                        year
                    );
            } else {
                _namuna20CDetails = await namuna20CModel.fetchAllNamuna20cMeasurementDetails(
                    res.pool
                );
            }

            res.render('user/namuna/namuna20C/namuna-20C-print.pug', {
                gp: _gp[0],
                namuna20CDetails: _namuna20CDetails,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 20C page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 20C page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 20C details
    saveNamuna20CDetails: async (req, res) => {
        try {
            const result = await namuna20CModel.saveNamuna20cMeasurementDetails(res.pool, req.body);
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

    // Update Namuna 20C details
    updateNamuna20CDetails: async (req, res) => {
        try {
            const result = await namuna20CModel.updateNamuna20cMeasurementDetails(
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

    // Delete Namuna 20C details
    deleteNamuna20CDetails: async (req, res) => {
        try {
            const result = await namuna20CModel.deleteNamuna20cMeasurementDetails(
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

    // Fetch Namuna 20C details by ID
    fetchNamuna20CDetailsById: async (req, res) => {
        try {
            const result = await namuna20CModel.fetchNamuna20cMeasurementDetailsById(
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

    // Fetch Namuna 20C details by month and year
    fetchNamuna20cMeasurementDetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna20CModel.fetchNamuna20cMeasurementDetailsByMonthAndYear(
                    res.pool
                );
            } else {
                result = await namuna20CModel.fetchAllNamuna20cMeasurementDetails(res.pool);
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

    // Fetch Namuna 20C details by year
    fetchNamuna20CDetailsByYear: async (req, res) => {
        try {
            const result = await namuna20CModel.fetchNamuna20cMeasurementDetailsByYear(
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

    // Fetch all Namuna 20C details
    fetchAllNamuna20CDetails: async (req, res) => {
        try {
            const result = await namuna20CModel.fetchAllNamuna20cMeasurementDetails(res.pool);
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

module.exports = namuna20CController;
