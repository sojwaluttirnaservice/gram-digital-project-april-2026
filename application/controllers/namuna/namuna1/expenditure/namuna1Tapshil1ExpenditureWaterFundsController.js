const HomeModel = require('../../../../model/HomeModel');
const namuna1Tapshil2ExpenditureWaterFundModel = require('../../../../model/namuna/namuna1/expenditure/namuna1Tapshil2ExpenditureWaterFundModel');
const { sendError } = require('../../../../utils/sendResponse');

const namuna1Tapshil2ExpenditureWaterFundController = {
    // 1. Render the expenditure water fund page
    renderNamuna1ExpenditureWaterFundPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render(
                'user/namuna/namuna1/expenditure/water-funds/namuna-1-expenditure-water-funds-page.pug',
                {
                    gp: _gp[0],
                }
            );
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the expenditure water fund page: ${err}`,
                err
            );
        }
    },

    // 2. Render the page to create or update expenditure water fund entries
    renderNamuna1CreateUpdateExpenditureWaterFundPage: async (req, res) => {
        try {
            const { year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _expenditureFundHeaders = [];
            if (year) {
                _expenditureFundHeaders =
                    await namuna1Tapshil2ExpenditureWaterFundModel.fetchNamuna1Tapshil2ExpenditureWaterFundHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _expenditureFundEntries = [];
            if (year && _expenditureFundHeaders[0]?.id) {
                _expenditureFundEntries =
                    await namuna1Tapshil2ExpenditureWaterFundModel.fetchNamuna1Tapshil2ExpenditureWaterFundByHeaderId(
                        res.pool,
                        _expenditureFundHeaders[0]?.id
                    );
            }


            let newEntryPath =
                'user/namuna/namuna1/expenditure/water-funds/namuna-1-expenditure-water-funds-list.pug';
            let updateEntryPath =
                'user/namuna/namuna1/expenditure/water-funds/namuna-1-update-expenditure-water-funds-list.pug';
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
                `Error while rendering the create/update expenditure water fund entries: ${err}`,
                err
            );
        }
    },

    // 3. Update a single header entry for expenditure water fund
    updateSingleExpenditureWaterFundHeaderEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2ExpenditureWaterFundModel.updateSingleNamuna1Tapshil2ExpenditureWaterFundHeader(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows > 0) {
                res.status(200).json({
                    call: 1,
                    message: 'Header entry updated successfully.',
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error while updating the header entry: ${err}`, err);
        }
    },

    // 4. Save multiple expenditure water fund entries
    saveExpenditureWaterFundEntries: async (req, res) => {
        try {
            let { expenditureWaterFunds } = req.body;
            let { headers, body } = expenditureWaterFunds;

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
                _headerEntryResult =
                    await namuna1Tapshil2ExpenditureWaterFundModel.updateNamuna1Tapshil2ExpenditureWaterFundHeaders(
                        res.pool,
                        headers[0]
                    );
            } else {
                _headerEntryResult =
                    await namuna1Tapshil2ExpenditureWaterFundModel.saveNamuna1Tapshil2ExpenditureWaterFundHeaders(
                        res.pool,
                        modifiedHeaders
                    );
            }

            if (_headerEntryResult.affectedRows <= 0) {
                return res.status(400).json({
                    call: 0,
                    message: 'Headers not saved.',
                });
            }

            const insertData = body.map((insertEntry) => [
                headers[0].year,
                insertEntry.item_in_budget,
                insertEntry.estimated_expenditure_of_panchayat,
                insertEntry.approved_estimated_expenditure_amount,
                insertEntry.actual_expenditure_amount_previous_year,
                insertEntry.actual_expenditure_amount_year_before_last,
                insertEntry.namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk ||
                _headerEntryResult.insertId,
            ]);

            const _result =
                await namuna1Tapshil2ExpenditureWaterFundModel.saveNamuna1Tapshil2ExpenditureWaterFundEntries(
                    res.pool,
                    insertData
                );

            if (_result.affectedRows > 0) {
                res.status(201).json({
                    call: 1,
                    message: 'Expenditure water fund entries saved successfully.',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error in saving expenditure water fund entries: ${err}`,
                err
            );
        }
    },

    // 5. Save a single expenditure water fund entry
    saveSingleExpenditureWaterFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2ExpenditureWaterFundModel.saveSingleNamuna1Tapshil2ExpenditureWaterFundEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Expenditure water fund entry saved successfully.',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while adding the single expenditure water fund entry: ${err}`,
                err
            );
        }
    },

    // 6. Delete a single expenditure water fund entry
    deleteNamuna1ExpenditureWaterFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2ExpenditureWaterFundModel.deleteNamuna1Tapshil2ExpenditureWaterFundEntry(
                    res.pool,
                    req.body.id
                );

            if (_result.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Expenditure water fund entry deleted successfully.',
                });
            } else {
                return res.status(404).json({
                    call: 0,
                    message: 'Expenditure water fund entry not found.',
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while deleting the expenditure water fund entry: ${err}`,
                err
            );
        }
    },

    // 7. Update a single expenditure water fund entry
    updateSingleExpenditureWaterFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2ExpenditureWaterFundModel.updateNamuna1Tapshil2ExpenditureWaterFundEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Expenditure water fund entry updated successfully.',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating the expenditure water fund entry: ${err}`,
                err
            );
        }
    },

    // 8. Update expenditure water fund entry
    updateExpenditureWaterFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2ExpenditureWaterFundModel.updateNamuna1Tapshil2ExpenditureWaterFundEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: 'Expenditure water fund entry updated successfully.',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating expenditure water fund entry: ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Tapshil2ExpenditureWaterFundController;
