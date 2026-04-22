const HomeModel = require('../../model/HomeModel');
const namuna33TreeDetailsModel = require('../../model/namuna/namuna33TreeDetailsModel');

const namuna33Controller = {
    renderNamuna33Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            // if (fromYear && toYear) {
            //     reportData = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsByYear(
            //         res.pool,
            //         fromYear,
            //         toYear
            //     );
            // } else 
            if (month && year) {
                reportData = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsByYear(
                    res.pool,
                    year - 1,
                    year
                );
            } else {
                reportData = await namuna33TreeDetailsModel.fetchAllNamuna33TreeDetails(res.pool);
            }

            res.render('user/namuna/namuna33/namuna-33-page.pug', {
                gp: _gp[0],
                namuna33Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 33 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    renderNamuna33CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna33/namuna-33-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 33 create page: ${err.message}`);
        }
    },

    renderEditNamuna33Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna33Entry = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsById(res.pool, id);

            res.render('user/namuna/namuna33/namuna-33-edit-page.pug', {
                gp: _gp[0],
                namuna33Entry: _namuna33Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 33 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    renderNamuna33Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);
            const _namuna33Details = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsByMonthAndYear(res.pool, month, year)

            res.render('user/namuna/namuna33/namuna-33-print.pug', {
                gp: _gp[0],
                namuna33Details: _namuna33Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the namuna 33 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the namuna 33 page: ${err.message}`,
                error: err,
            });
        }
    },

    saveNamuna33TreeDetails: async (req, res) => {
        try {
            const result = await namuna33TreeDetailsModel.saveNamuna33TreeDetails(
                res.pool,
                req.body
            );
            res.status(201).json({
                call: 1,
                message: 'Tree details saved successfully',
                result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error saving tree details',
                error,
            });
        }
    },

    updateNamuna33TreeDetails: async (req, res) => {
        try {
            const result = await namuna33TreeDetailsModel.updateNamuna33TreeDetails(
                res.pool,
                req.body
            );
            res.status(200).json({
                call: 1,
                message: 'Tree details updated successfully',
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error updating tree details',
                error,
            });
        }
    },

    deleteNamuna33TreeDetails: async (req, res) => {
        try {
            const result = await namuna33TreeDetailsModel.deleteNamuna33TreeDetails(
                res.pool,
                req.body.id
            );
            res.status(200).json({
                call: 1,
                message: 'Tree details deleted successfully',
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error deleting tree details',
                error,
            });
        }
    },

    fetchNamuna33TreeDetailsById: async (req, res) => {
        try {
            const result = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsById(
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
                message: 'Error fetching tree details by ID',
                error,
            });
        }
    },

    fetchNamuna33TreeDetailsByMonthAndYear: async (req, res) => {
        try {
            const result = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsByMonthAndYear(
                res.pool,
                req.query.month,
                req.query.year
            );
            res.status(200).json({
                call: 1,
                result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error fetching tree details by month and year',
                error,
            });
        }
    },

    fetchNamuna33TreeDetailsByYear: async (req, res) => {
        try {
            const result = await namuna33TreeDetailsModel.fetchNamuna33TreeDetailsByYear(
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
                message: 'Error fetching tree details by year',
                error,
            });
        }
    },

    fetchAllNamuna33TreeDetails: async (req, res) => {
        try {
            const result = await namuna33TreeDetailsModel.fetchAllNamuna33TreeDetails(res.pool);
            res.status(200).json({
                call: 1,
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error fetching all tree details',
                error,
            });
        }
    },
};

module.exports = namuna33Controller;
