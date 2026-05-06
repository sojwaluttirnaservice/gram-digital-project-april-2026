const HomeModel = require('../../model/HomeModel');
const namuna11Model = require('../../model/namuna/namuna11Model');
const asyncHandler = require('../../utils/asyncHandler');
const { renderPage } = require('../../utils/sendResponse');

const namuna11Controller = {
    // Render the Namuna 11 page
    renderNamuna11Page: asyncHandler(async (req, res) => {
        const { year, month, fromYear, toYear } = req.query;
        let reportData = [];
        if (month && year) {
            reportData = await namuna11Model.fetchByMonthAndYear(res.pool, month, year);
        } else if (year) {
            reportData = await namuna11Model.fetchFinancialYear(res.pool, fromYear, toYear);
        } else {
            reportData = await namuna11Model.fetchAllNamuna11Details(res.pool);
        }
        renderPage(res, 'user/namuna/namuna11/namuna-11-page.pug', {
            namuna11Details: reportData,
        })
    }),

    // Render the page to create a new Namuna 11 entry
    renderNamuna11CreatePage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/namuna/namuna11/namuna-11-create-entry-page.pug')
    }),

    // Render the page to edit an existing Namuna 11 entry
    renderEditNamuna11Page: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const _namuna11Entry = await namuna11Model.fetchNamuna11DetailsById(res.pool, id);
        renderPage(res, 'user/namuna/namuna11/namuna-11-edit-page.pug', {
            namuna11Entry: _namuna11Entry[0],
        })
    }),

    // Render the page to print Namuna 11 report
    renderNamuna11Print: asyncHandler(async (req, res) => {
        const { month, year } = req.query;
        let _namuna11Details = [];
        if (month && year) {
            _namuna11Details = await namuna11Model.fetchByMonthAndYear(res.pool, month, year);
        } else {
            _namuna11Details = await namuna11Model.fetchAllNamuna11Details(res.pool);
        }
        renderPage(res, 'user/namuna/namuna11/namuna-11-print.pug', {
            namuna11Details: _namuna11Details,
            month,
            year
        })
    }),

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
