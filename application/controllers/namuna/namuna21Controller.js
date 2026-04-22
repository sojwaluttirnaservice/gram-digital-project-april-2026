const HomeModel = require('../../model/HomeModel');
const namuna19EmployeeModel = require('../../model/namuna/namuna19EmployeeModel');
const namuna21Model = require('../../model/namuna/namuna21Model');

const namuna21Controller = {
    // Render the Namuna 21 page
    renderNamuna21Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna21Model.fetchNamuna21DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna21Model.fetchNamuna21DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna21Model.fetchAllNamuna21Details(res.pool);
            }

            res.render('user/namuna/namuna21/namuna-21-page.pug', {
                gp: _gp[0],
                namuna21Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 21 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 21 entry
    renderNamuna21CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const _employees = await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);

            console.log(_employees);
            res.render('user/namuna/namuna21/namuna-21-create-entry-page.pug', {
                gp: _gp[0],
                employees: _employees,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 21 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 21 entry
    renderEditNamuna21Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna21Entry = await namuna21Model.fetchNamuna21DetailsById(res.pool, id);
            const _employees = await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);

            res.render('user/namuna/namuna21/namuna-21-edit-page.pug', {
                gp: _gp[0],
                namuna21Entry: _namuna21Entry[0],
                employees: _employees,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 21 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 21 report
    renderNamuna21Print: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna21Details = [];
            if (month && year) {
                _namuna21Details = await namuna21Model.fetchNamuna21DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else {
                _namuna21Details = await namuna21Model.fetchAllNamuna21Details(res.pool);
            }

            res.render('user/namuna/namuna21/namuna-21-print.pug', {
                gp: _gp[0],
                namuna21Details: _namuna21Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 21 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 21 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 21 details
    saveNamuna21Details: async (req, res) => {
        try {
            const result = await namuna21Model.saveNamuna21Details(res.pool, req.body);

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

    // Update Namuna 21 details
    updateNamuna21Details: async (req, res) => {
        try {
            const result = await namuna21Model.updateNamuna21Details(res.pool, req.body);

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

    // Delete Namuna 21 details
    deleteNamuna21Details: async (req, res) => {
        try {
            const result = await namuna21Model.deleteNamuna21DetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 21 details by ID
    fetchNamuna21DetailsById: async (req, res) => {
        try {
            const result = await namuna21Model.fetchNamuna21DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 21 details by month and year
    fetchAllNamuna21DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna21Model.fetchNamuna21DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna21Model.fetchAllNamuna21(res.pool);
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

    // Fetch Namuna 21 details by year
    fetchNamuna21DetailsByYear: async (req, res) => {
        try {
            const result = await namuna21Model.fetchNamuna21DetailsByYear(
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

    // Fetch all Namuna 21 details
    fetchAllNamuna21Details: async (req, res) => {
        try {
            const result = await namuna21Model.fetchAllNamuna21(res.pool);
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

module.exports = namuna21Controller;
