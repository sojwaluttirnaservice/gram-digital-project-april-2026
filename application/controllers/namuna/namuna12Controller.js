const HomeModel = require('../../model/HomeModel');
const namuna12Model = require('../../model/namuna/namuna12Model');
const namuna21Model = require('../../model/namuna/namuna21Model');
const { sendApiResponse, sendApiError } = require('../../utils/apiResponses');
const asyncHandler = require('../../utils/asyncHandler');
const { renderPage } = require('../../utils/sendResponse');

const namuna12Controller = {
    // Render the Namuna 12 page
    renderNamuna12Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month } = req.query;
            let reportData = [];

            if (month && year) {
                reportData = await namuna12Model.fetchNamuna12MainByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (year) {
                reportData = await namuna12Model.fetchNamuna12MainByYear(res.pool, year);
            } else {
                reportData = await namuna12Model.fetchAllNamuna12Main(res.pool);
            }

            res.render('user/namuna/namuna12/namuna-12-page.pug', {
                gp: _gp[0],
                namuna12Details: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 12 page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to render the page.',
                error: err?.message,
            });
        }
    },

    // Render the page to create a new Namuna 12 entry
    renderNamuna12CreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna12/namuna-12-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 12 create page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render create entry page. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to edit an existing Namuna 12 entry
    renderEditNamuna12Page: async (req, res) => {
        try {
            const { id } = req.params;
            const _namuna12Entry = await namuna12Model.fetchNamuna12MainById(res.pool, id);
            console.log(_namuna12Entry)
            renderPage(res, 'user/namuna/namuna12/namuna-12-edit-page.pug', {
                namuna12Entry: _namuna12Entry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the Namuna 12 edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    // Render the page to print Namuna 12 report
    renderNamuna12Print: async (req, res) => {
        try {
            const { month, year, year2, id } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _namuna12Details = [];
            if (month && year) {
                _namuna12Details = await namuna12Model.fetchNamuna12MainByMonthAndYear(
                    res.pool,
                    month,
                    year
                );
            } else if (id) {
                _namuna12Details = await namuna12Model.fetchNamuna12MainById(res.pool, id);
            } else if (year) {
                _namuna12Details = await namuna12Model.fetchNamuna12MainByYear(res.pool, year);
            } else {
                _namuna12Details = await namuna12Model.fetchAllNamuna12Main(res.pool);
            }

            console.log(_namuna12Details);

            res.render('user/namuna/namuna12/namuna-12-print.pug', {
                gp: _gp[0],
                namuna12Details: _namuna12Details,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the Namuna 12 page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the Namuna 12 page: ${err.message}`,
                error: err,
            });
        }
    },

    // Save Namuna 12 details
    saveNamuna12Details: async (req, res) => {
        try {
            const data = req.body;
            const _mainEntryResult = await namuna12Model.saveNamuna12MainEntry(res.pool, data);

            if (_mainEntryResult.affectedRows <= 0) {
                return res.status(400).json({
                    call: 0,
                    message: 'Failed to save entry. Please try again later.',
                });
            }

            const spendingData = data?.spending_data
                ? JSON.parse(data.spending_data)?.map((dataEntry) => [
                    dataEntry.item_name_or_goods_name,
                    dataEntry.approval_number,
                    dataEntry.approval_date,
                    dataEntry.quantity_or_weight,

                    dataEntry.rate,
                    dataEntry.unit,
                    dataEntry.total_amount,
                    dataEntry.total_amount_previous_expense,
                    _mainEntryResult.insertId,
                ])
                : [];

            let _finalResult;
            if (spendingData?.length) {
                _finalResult = await namuna12Model.saveNamuna12SpendingEntryBulk(
                    res.pool,
                    spendingData
                );
            }

            if (
                (spendingData?.length && _finalResult?.affectedRows >= 1) ||
                (!spendingData?.length && _mainEntryResult.affectedRows >= 1)
            ) {
                res.status(201).json({
                    call: 1,
                    message: 'Details saved successfully',
                    _finalResult,
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

    // Update Namuna 12 details
    updateNamuna12Details: async (req, res) => {
        try {

            console.log(req.body)
            const result = await namuna12Model.updateNamuna12MainEntry(res.pool, req.body);

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

    saveSpendingEntry: asyncHandler(async (req, res) => {
        await namuna12Model.saveNamuna12SpendingEntry(res.pool, req.body)
        return sendApiResponse(res, 200, true, 'Saved')
    }),

    updateSpendingEntry: asyncHandler(async (req, res) => {
        let updatedSpendingEntry = req.body

        let updateRes = await namuna12Model.updateSpendingEntry(res.pool, updatedSpendingEntry)

        return sendApiResponse(res, 200, true,)
    }),

    deleteSpendingEntry: asyncHandler(async (req, res) => {
        let id = req.body.id

        if (!id) {
            return sendApiError(res, 404, false, 'id पाठवा')
        }

        await namuna12Model.deleteSpendingEntry(res.pool, id)

        return sendApiResponse(res, 200, true, 'Deleted')
    }),

    // Delete Namuna 12 details
    deleteNamuna12Details: async (req, res) => {
        try {
            const result = await namuna12Model.deleteNamuna12MainEntry(res.pool, req.body.id);

            const _result = await namuna12Model.deleteNamuna12SpendingEntries(
                res.pool,
                req.body.id
            );

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Details deleted successfully',
                    result,
                });
            }
        } catch (error) {
            console.log(`Error while deleting details: ${error}`);
            res.status(500).json({
                call: 0,
                message: 'Error deleting details',
                error,
            });
        }
    },

    // Fetch Namuna 12 details by ID
    fetchNamuna12DetailsById: async (req, res) => {
        try {
            const result = await namuna12Model.fetchNamuna12MainById(res.pool, req.params.id);
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

    // Fetch Namuna 12 details by month and year
    fetchAllNamuna12DetailsByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            let result = [];
            if (month && year) {
                result = await namuna12Model.fetchNamuna12MainByMonthAndYear(res.pool);
            } else {
                result = await namuna12Model.fetchAllNamuna12Main(res.pool);
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

    // Fetch Namuna 12 details by year
    fetchNamuna12DetailsByYear: async (req, res) => {
        try {
            const result = await namuna12Model.fetchNamuna12MainByYear(res.pool, req.params.year);
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

    // Fetch all Namuna 12 details
    fetchAllNamuna12Details: async (req, res) => {
        try {
            const result = await namuna12Model.fetchAllNamuna12Main(res.pool);
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

module.exports = namuna12Controller;
