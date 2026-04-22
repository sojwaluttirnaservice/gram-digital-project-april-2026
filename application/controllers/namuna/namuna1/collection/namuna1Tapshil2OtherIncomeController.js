const HomeModel = require('../../../../model/HomeModel');
const namuna1Tapshil2OtherIncomeModel = require('../../../../model/namuna/namuna1/collection/namuna1Tapshil2OtherIncomeModel');
const asyncHandler = require('../../../../utils/asyncHandler');
const { sendError, renderPage } = require('../../../../utils/sendResponse');

const namuna1Tapshil2OtherIncomeController = {
    renderNamuna1Tapshil2OtherIncomePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            res.render(
                'user/namuna/namuna1/collection/other-income/namuna-1-other-income-page.pug',
                {
                    gp: _gp[0],
                }
            );
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the other income page : ${err}`,
                err
            );
        }
    },


    renderNamuna1CreateUpdateEntriesPage: asyncHandler(async (req, res) => {
        const { year } = req.query;
         let _otherIncomeHeaders = [];
            if (year) {
                _otherIncomeHeaders =
                    await namuna1Tapshil2OtherIncomeModel.fetchNamuna1Tapshil2OtherIncomeHeadersByYear(
                        res.pool,
                        year
                    );
            }

            // Fetch entries for the selected header id
            let _otherIncomeEntries = [];
            if (year && _otherIncomeHeaders[0]?.id) {
                _otherIncomeEntries =
                    await namuna1Tapshil2OtherIncomeModel.fetchNamuna1Tapshil2OtherIncomeByHeaderId(
                        res.pool,
                        _otherIncomeHeaders[0]?.id
                    );
            }
            let newEntryPath =
                'user/namuna/namuna1/collection/other-income/namuna-1-other-income-list.pug';
            let updateEntryPath =
                'user/namuna/namuna1/collection/other-income/namuna-1-update-other-income-list.pug';
            
            let isEdit = _otherIncomeEntries?.length > 0;

            renderPage(res, isEdit ? updateEntryPath : newEntryPath, {
                year,
                fromYear: year - 1,
                isEdit,
                otherIncomeHeaders: _otherIncomeHeaders,
                otherIncomeEntries: _otherIncomeEntries,
            }); 
    }),


    updateSingleOtherIncomeHeaderEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2OtherIncomeModel.updateSingleNamuna1Tapshil2OtherIncomeHeaderEntry(
                    res.pool,
                    req.body
                );

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

    saveOtherIncomeEntries: async (req, res) => {
        try {
            let { otherIncome } = req.body;
            let { headers, body } = otherIncome;

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
                headerEntry.year_of_estimated_income_of_panchayat,
                headerEntry.year_of_approved_estimated_amount,
                headerEntry.year_of_actual_amount_previous_year,
                headerEntry.year_of_actual_amount_year_before_last,
            ]);

            let _headerEntryResult;
            if (headers[0]?.id) {
                modifiedHeaders[0].push(headers[0].id);
                _headerEntryResult =
                    await namuna1Tapshil2OtherIncomeModel.updateNamuna1Tapshil2OtherIncomeHeaders(
                        res.pool,
                        headers[0]
                    );
            } else {
                _headerEntryResult =
                    await namuna1Tapshil2OtherIncomeModel.saveNamuna1Tapshil2OtherIncomeHeaders(
                        res.pool,
                        modifiedHeaders
                    );
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
                insertEntry.estimated_income_of_panchayat,
                insertEntry.approved_estimated_amount,
                insertEntry.actual_amount_previous_year,
                insertEntry.actual_amount_year_before_last,

                insertEntry.namuna_1_tapshil_2_other_income_headers_id_fk ||
                _headerEntryResult.insertId,
            ]);

            const _result =
                await namuna1Tapshil2OtherIncomeModel.saveNamuna1Tapshil2OtherIncomeEntries(
                    res.pool,
                    insertData
                );

            if (_result.affectedRows > 0) {
                res.status(201).json({
                    call: 1,
                    message: 'Other income entries saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error in saving other income entries: ${err}`, err);
        }
    },

    saveSingleOtherIncomeEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2OtherIncomeModel.saveSingleNamuna1Tapshil2OtherIncomeEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 other income entry saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while adding the single row entry for other income: ${err}`,
                err
            );
        }
    },

    deleteNamuna1OtherIncomeEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2OtherIncomeModel.deleteNamuna1Tapshil2OtherIncomeEntry(
                    res.pool,
                    req.body.id
                );

            if (_result.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 other income entry deleted successfully',
                });
            } else {
                return res.status(404).json({
                    call: 0,
                    message: 'Namuna 1 other income entry not found',
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while deleting the single other income entry: ${err}`,
                err
            );
        }
    },

    updateSingleOtherIncomeEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2OtherIncomeModel.updateSingleNamuna1Tapshil2OtherIncomeEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 other income entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating the single row entry for other income: ${err}`,
                err
            );
        }
    },

    updateNamuna1OtherIncomeEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil2OtherIncomeModel.updateNamuna1Tapshil2OtherIncomeEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 other income entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating single namuna 1 other income entry : ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Tapshil2OtherIncomeController;
