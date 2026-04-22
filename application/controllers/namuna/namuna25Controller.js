const HomeModel = require('../../model/HomeModel');
const namuna25InvestmentDetailsModel = require('../../model/namuna/namuna25InvestmentDetailsModel');


const namuna25Controller = {
    renderNamuna25Page: async (req, res) => {

     
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna25InvestmentDetailsModel.fetchNamuna25InvestmentDetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna25InvestmentDetailsModel.fetchNamuna25InvestmentDetailsByYear(
                    res.pool,
                    year - 1,
                    year
                );
            } else {
                reportData = await namuna25InvestmentDetailsModel.fetchAllNamuna25InvestmentDetails(res.pool);
            }

            res.render('user/namuna/namuna25/namuna-25-page.pug', {
                gp: _gp[0],
                namuna25Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 25 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    renderNamuna25CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna25/namuna-25-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 25 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            })
        }
    },

    renderEditNamuna25Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna25Entry = await namuna25InvestmentDetailsModel.fetchNamuna25InvestmentDetailsById(
                res.pool,
                id
            );

            res.render('user/namuna/namuna25/namuna-25-edit-page.pug', {
                gp: _gp[0],
                namuna25Entry: _namuna25Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 25 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    renderNamuna25Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);
            const _namuna25Details = await namuna25InvestmentDetailsModel.fetchNamuna25InvestmentDetailsByMonthAndYear(
                res.pool,
                month,
                year
            );

            res.render('user/namuna/namuna25/namuna-25-print.pug', {
                gp: _gp[0],
                namuna25Details: _namuna25Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 25 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 25 page: ${err.message}`,
                error: err,
            });
        }
    },

    saveNamuna25Details: async (req, res) => {
        try {
            const result = await namuna25InvestmentDetailsModel.saveNamuna25InvestmentDetails(res.pool, req.body);
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

    updateNamuna25Details: async (req, res) => {
        try {
            const result = await namuna25InvestmentDetailsModel.updateNamuna25InvestmentDetails(res.pool, req.body);
            res.status(200).json({
                call: 1,
                message: 'Details updated successfully',
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error updating details',
                error,
            });
        }
    },

    deleteNamuna25Details: async (req, res) => {
        try {
            const result = await namuna25InvestmentDetailsModel.deleteNamuna25InvestmentDetails(res.pool, req.body.id);
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

    fetchNamuna25DetailsById: async (req, res) => {
        try {
            const result = await namuna25InvestmentDetailsModel.fetchNamuna25InvestmentDetailsById(
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

    fetchNamuna25InvestmentDetailsByMonthAndYear: async (req, res) => {
        try {
            const result = await namuna25InvestmentDetailsModel.fetchNamuna25InvestmentDetailsByMonthAndYear(
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
                message: 'Error fetching details by month and year',
                error,
            });
        }
    },

    fetchNamuna25InvestmentDetailsByYear: async (req, res) => {
        try {
            const result = await namuna25InvestmentDetailsModel.fetchNamuna25InvestmentDetailsByYear(
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

    fetchAllNamuna25Details: async (req, res) => {
        try {
            const result = await namuna25InvestmentDetailsModel.fetchAllNamuna25InvestmentDetails(res.pool);
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

module.exports = namuna25Controller;
