const HomeModel = require('../../model/HomeModel');
const namuna29Model = require('../../model/namuna/namuna29Model');

const namuna29Controller = {
    // Render the Namuna 29 page
    // FOR LOAN
    renderNamuna29Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna29Model.fetchNamuna29DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna29Model.fetchNamuna29DetailsByYear(res.pool, year);
            } else {
                reportData = await namuna29Model.fetchAllNamuna29Details(res.pool);
            }

            console.log(reportData);

            res.render('user/namuna/namuna29/namuna-29-page.pug', {
                gp: _gp[0],
                namuna29Details: reportData,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 29 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 29 entry
    renderNamuna29CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna29/namuna-29-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 29 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },
    // FOR CREATING SINGLE INSTALLMENT

    renderNamuna29CreateInstallmentPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { loanId: id } = req.params;
            const _namuna29Entry = await namuna29Model.fetchNamuna29DetailsById(res.pool, id);

            res.render('user/namuna/namuna29/namuna-29-create-installment-page.pug', {
                gp: _gp[0],
                namuna29Entry: _namuna29Entry[0],
                loanId: id,
            });
        } catch (err) {
            console.error(`Error while rendering the create installment page : ${err}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render the create installment page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 29 entry
    renderEditNamuna29Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna29Entry = await namuna29Model.fetchNamuna29DetailsById(res.pool, id);

            res.render('user/namuna/namuna29/namuna-29-edit-page.pug', {
                gp: _gp[0],
                namuna29Entry: _namuna29Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 29 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 29 entry
    renderEditNamuna29InstallmentPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id: installmentId } = req.params;
            const _namuna29InstallmentEntry =
                await namuna29Model.fetchNamuna29InstallmentDetailsById(res.pool, installmentId);

            res.render('user/namuna/namuna29/namuna-29-edit-installment-page.pug', {
                gp: _gp[0],
                namuna29InstallmentEntry: _namuna29InstallmentEntry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 29 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render hisotry for particular namuna 29 installment

    renderNamuna29HistoryPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { loanId } = req.params;
            const _namuna29InstallmentEntries = await namuna29Model.fetchAllInstallmentsForLoan(
                res.pool,
                loanId
            );


            console.log(_namuna29InstallmentEntries);

            res.render('user/namuna/namuna29/namuna-29-loan-installment-history-page.pug', {
                gp: _gp[0],
                namuna29InstallmentEntries: _namuna29InstallmentEntries,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 29 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 29 report
    renderNamuna29Print: async (req, res) => {
        try {
            const { month, year, fromYear, toYear } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna29Details = [];
            if (month && year) {
                _namuna29Details = await namuna29Model.fetchNamuna29DetailsByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (fromYear && toYear) {
                _namuna29Details = await namuna29Model.fetchNamuna29DetailsByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else {
                _namuna29Details = await namuna29Model.fetchAllNamuna29Details(res.pool);
            }


            console.log(_namuna29Details);
            res.render('user/namuna/namuna29/namuna-29-print.pug', {
                gp: _gp[0],
                namuna29Details: _namuna29Details,
                month,
                year,
                fromYear,
                toYear,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 29 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 29 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 29 details
    saveNamuna29Details: async (req, res) => {
        try {
            const data = req.body;

            const result = await namuna29Model.saveNamuna29Details(res.pool, req.body);

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

    saveNamuna29InstallmentDetails: async (req, res) => {
        try {
            const data = req.body;

            const result = await namuna29Model.saveNamuna29InstallmentDetails(res.pool, req.body);

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

    // Update Namuna 29 details
    updateNamuna29Details: async (req, res) => {
        try {
            const result = await namuna29Model.updateNamuna29Details(res.pool, req.body);

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

    // Update Namuna 29 details
    updateNamuna29InstallmentDetails: async (req, res) => {
        try {
            const result = await namuna29Model.updateNamuna29InstallmentDetails(res.pool, req.body);

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

    // Delete Namuna 29 details
    deleteNamuna29Details: async (req, res) => {
        try {


            const _namuna29InstallmentEntries = await namuna29Model.fetchAllInstallmentsForLoan(res.pool, req.body.id)


            if(_namuna29InstallmentEntries.length){
                return res.status(400).json({
                    call: 0,
                    message: 'नोंद काढली जाऊ शकत नाही. ह्याच्या संबंधित installments च्या नोंदी आहे.',
                });
            }
            const result = await namuna29Model.deleteNamuna29DetailsById(res.pool, req.body.id);

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
    deleteNamuna29InstallmentDetails:async (req, res) => {
        try {
            const result = await namuna29Model.deleteNamuna29InstallmentDetailsById(res.pool, req.body.id);

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

    // Fetch Namuna 29 details by ID
    fetchNamuna29DetailsById: async (req, res) => {
        try {
            const result = await namuna29Model.fetchNamuna29DetailsById(res.pool, req.params.id);
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

    // Fetch Namuna 29 details by month and year
    fetchAllNamuna29DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna29Model.fetchNamuna29DetailsByMonthAndYear(res.pool);
            } else {
                result = await namuna29Model.fetchAllNamuna29(res.pool);
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

    // Fetch Namuna 29 details by year
    fetchNamuna29DetailsByYear: async (req, res) => {
        try {
            const result = await namuna29Model.fetchNamuna29DetailsByYear(
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

    // Fetch all Namuna 29 details
    fetchAllNamuna29Details: async (req, res) => {
        try {
            const result = await namuna29Model.fetchAllNamuna29(res.pool);
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

module.exports = namuna29Controller;
