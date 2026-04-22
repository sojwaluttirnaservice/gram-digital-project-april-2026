const HomeModel = require('../../model/HomeModel');
const namuna27ObjectionModel = require('../../model/namuna/namuna27ObjectionModel');

const namuna27Controller = {
    renderNamuna27Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna27ObjectionModel.fetchNamuna27ObjectionByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna27ObjectionModel.fetchNamuna27ObjectionByYear(
                    res.pool,
                    year
                );
            } else {
                reportData = await namuna27ObjectionModel.fetchAllNamuna27Objections(res.pool);
            }

            res.render('user/namuna/namuna27/namuna-27-page.pug', {
                gp: _gp[0],
                namuna27Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 27 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    renderNamuna27CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna27/namuna-27-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 27 create page: ${err.message}`);
        }
    },

    renderEditNamuna27Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna27Entry = await namuna27ObjectionModel.fetchNamuna27ObjectionById(
                res.pool,
                id
            );

            res.render('user/namuna/namuna27/namuna-27-edit-page.pug', {
                gp: _gp[0],
                namuna27Entry: _namuna27Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 27 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    renderNamuna27Print: async (req, res) => {
        try {
            const { month, year, fromYear, toYear } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);
            let _namuna27Details = [];

            if (month && year) {
                _namuna27Details =
                    await namuna27ObjectionModel.fetchNamuna27ObjectionByMonthAndYear(
                        res.pool,
                        month,
                        year
                    );
            } else if (fromYear && toYear) {
                _namuna27Details = await namuna27ObjectionModel.fetchNamuna27ObjectionByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            }

            res.render('user/namuna/namuna27/namuna-27-print.pug', {
                gp: _gp[0],
                namuna27Details: _namuna27Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the namuna 27 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the namuna 27 page: ${err.message}`,
                error: err,
            });
        }
    },

    saveNamuna27Objection: async (req, res) => {
        try {
            const result = await namuna27ObjectionModel.saveNamuna27Objection(res.pool, req.body);
            res.status(201).json({
                call: 1,
                message: 'Objection details saved successfully',
                result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error saving objection details',
                error,
            });
        }
    },

    updateNamuna27Objection: async (req, res) => {
        try {
            const result = await namuna27ObjectionModel.updateNamuna27Objection(res.pool, req.body);
            res.status(200).json({
                call: 1,
                message: 'Objection details updated successfully',
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error updating objection details',
                error,
            });
        }
    },

    deleteNamuna27Objection: async (req, res) => {
        try {
            const result = await namuna27ObjectionModel.deleteNamuna27Objection(
                res.pool,
                req.body.id
            );
            res.status(200).json({
                call: 1,
                message: 'Objection details deleted successfully',
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error deleting objection details',
                error,
            });
        }
    },

    fetchNamuna27ObjectionsById: async (req, res) => {
        try {
            const result = await namuna27ObjectionModel.fetchNamuna27ObjectionById(
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
                message: 'Error fetching objection details by ID',
                error,
            });
        }
    },

    fetchNamuna27ObjectionsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;

            let _namuna27Details = [];

            _namuna27Details = await namuna27ObjectionModel.fetchNamuna27ObjectionByMonthAndYear(
                res.pool,
                month,
                year
            );

            res.status(200).json({
                call: 1,
                namuna27Details: _namuna27Details,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error fetching objection details by month and year',
                error,
            });
        }
    },

    fetchNamuna27ObjectionsByYear: async (req, res) => {
        try {
            const result = await namuna27ObjectionModel.fetchNamuna27ObjectionByYear(
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
                message: 'Error fetching objection details by year',
                error,
            });
        }
    },

    fetchAllNamuna27Objections: async (req, res) => {
        try {
            const result = await namuna27ObjectionModel.fetchAllNamuna27Objections(res.pool);
            res.status(200).json({
                call: 1,
                result,
            });
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error fetching all objection details',
                error,
            });
        }
    },
};

module.exports = namuna27Controller;
