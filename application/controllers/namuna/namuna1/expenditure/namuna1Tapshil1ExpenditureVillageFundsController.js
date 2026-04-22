const HomeModel = require('../../../../model/HomeModel');
const namuna1Tapshil1ExpenditureVillageFundsModel = require('../../../../model/namuna/namuna1/expenditure/namuna1Tapshil1ExpenditureVillageFundsModel');
const { sendError } = require('../../../../utils/sendResponse');

const namuna1Tapshil1ExpenditureVillageFundsController = {
    // 1. Render the expenditure village funds page
    renderNamuna1Tapshil1ExpenditureVillageFundsPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna1/expenditure/village-funds/namuna-1-expenditure-village-funds-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the expenditure village funds page: ${err}`,
                err
            );
        }
    },

    // 2. Render the page to create or update expenditure village funds entries
    renderNamuna1CreateUpdateExpenditureVillageFundsPage: async (req, res) => {
        try {
            const { year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _expenditureFundHeaders = [];
            if (year) {
                _expenditureFundHeaders = await namuna1Tapshil1ExpenditureVillageFundsModel.fetchExpenditureVillageFundsHeadersByYear(res.pool, year);
            }

            let _expenditureFundEntries = [];
            if (year && _expenditureFundHeaders[0]?.id) {
                _expenditureFundEntries = await namuna1Tapshil1ExpenditureVillageFundsModel.fetchExpenditureVillageFundsByHeaderId(res.pool, _expenditureFundHeaders[0]?.id);
            }

            let newEntryPath = 'user/namuna/namuna1/expenditure/village-funds/namuna-1-expenditure-village-funds-list.pug';
            let updateEntryPath = 'user/namuna/namuna1/expenditure/village-funds/namuna-1-update-expenditure-village-funds-list.pug';
            res.render(_expenditureFundEntries?.length > 0 ? updateEntryPath : newEntryPath, {
                gp: _gp[0],
                year,
                fromYear: year - 1,
                isEdit: _expenditureFundEntries?.length > 0 ? true : false,
                expenditureFundHeaders: _expenditureFundHeaders,
                expenditureFundEntries: _expenditureFundEntries,
            });
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the create/update expenditure village funds entries for namuna 1: ${err}`,
                err
            );
        }
    },

    // 3. Update a single header entry for expenditure village funds
    updateSingleExpenditureVillageFundHeaderEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil1ExpenditureVillageFundsModel.updateSingleExpenditureVillageFundsHeader(res.pool, req.body);

            if (_result.affectedRows > 0) {
                res.status(200).json({
                    call: 1,
                    message: 'हेडर अपडेट केले गेले.',
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error while updating the header entry: ${err}`, err);
        }
    },

    // 4. Save expenditure village fund entries
    saveExpenditureVillageFundEntries: async (req, res) => {
        try {
            let { expenditureVillageFunds } = req.body;
            let { headers, body } = expenditureVillageFunds;

            if (!headers?.length) {
                return res.status(400).json({
                    call: 0,
                    message: 'मुख्य शिर्ष उपलब्ध नाही.',
                });
            }

            if (!body?.length) {
                return res.status(400).json({
                    call: 0,
                    message: 'माहिती पाठवा.',
                });
            }

            let modifiedHeaders = headers.map((headerEntry) => [
                headerEntry.year,
                headerEntry.item_in_budget_header_name,
                headerEntry.year_of_estimated_expenditure_of_panchayat,
                headerEntry.year_of_approved_estimated_expenditure_amount,
                headerEntry.year_of_actual_expenditure_amount_previous_year,
                headerEntry.year_of_actual_expenditure_amount_year_before_last,
            ]);

            let _headerEntryResult;
            if (headers[0]?.id) {
                modifiedHeaders[0].push(headers[0].id);
                _headerEntryResult = await namuna1Tapshil1ExpenditureVillageFundsModel.updateExpenditureVillageFundsHeaders(res.pool, headers[0]);
            } else {
                _headerEntryResult = await namuna1Tapshil1ExpenditureVillageFundsModel.saveExpenditureVillageFundsHeaders(res.pool, modifiedHeaders);
            }

            if (_headerEntryResult.affectedRows <= 0) {
                return res.status(400).json({
                    call: 0,
                    message: 'हेडर्स सेव नाही झाले',
                });
            }

            const insertData = body.map((insertEntry) => [
                headers[0].year,
                insertEntry.item_in_budget,
                insertEntry.estimated_expenditure_of_panchayat,
                insertEntry.approved_estimated_expenditure_amount,
                insertEntry.actual_expenditure_amount_previous_year,
                insertEntry.actual_expenditure_amount_year_before_last,
                insertEntry.namuna_1_tapshil_1_expenditure_of_village_funds_headers_id_fk || _headerEntryResult.insertId,
            ]);

            const _result = await namuna1Tapshil1ExpenditureVillageFundsModel.saveExpenditureVillageFundsEntries(res.pool, insertData);

            if (_result.affectedRows > 0) {
                res.status(201).json({
                    call: 1,
                    message: 'Expenditure village fund entries saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error in saving expenditure village funds entries: ${err}`, err);
        }
    },

    // 5. Save a single expenditure village fund entry
    saveSingleExpenditureVillageFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil1ExpenditureVillageFundsModel.saveSingleExpenditureVillageFundsEntry(res.pool, req.body);

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 expenditure village fund entry saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while adding the single row entry for expenditure village funds: ${err}`,
                err
            );
        }
    },

    // 6. Delete a single expenditure village fund entry
    deleteNamuna1ExpenditureVillageFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil1ExpenditureVillageFundsModel.deleteExpenditureVillageFundsEntry(res.pool, req.body.id);

            if (_result.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 expenditure village fund entry deleted successfully',
                });
            } else {
                return res.status(404).json({
                    call: 0,
                    message: 'Namuna 1 expenditure village fund entry not found',
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while deleting the single expenditure village funds entry: ${err}`,
                err
            );
        }
    },

    // 7. Update a single expenditure village fund entry
    updateSingleExpenditureVillageFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil1ExpenditureVillageFundsModel.updateSingleExpenditureVillageFundsEntry(res.pool, req.body);

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 expenditure village fund entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating the single row entry for expenditure village funds: ${err}`,
                err
            );
        }
    },

    // 8. Update expenditure village fund entry
    updateExpenditureVillageFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil1ExpenditureVillageFundsModel.updateExpenditureVillageFundsEntry(res.pool, req.body);

            if (_result.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 expenditure village fund entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating single namuna 1 expenditure village fund entry: ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Tapshil1ExpenditureVillageFundsController;
