const HomeModel = require('../../../../model/HomeModel');
const namuna1Tapshil3SanctionedAmountModel = require('../../../../model/namuna/namuna1/collection/namuna1Tapshil3SanctionedAmountModel');
const asyncHandler = require('../../../../utils/asyncHandler');
const { sendError, renderPage } = require('../../../../utils/sendResponse');

const namuna1Tapshil3SanctionedAmountController = {
    renderNamuna1Tapshil3SanctionedAmountPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            res.render(
                'user/namuna/namuna1/collection/sanctioned-amount/namuna-1-sanctioned-amount-page.pug',
                {
                    gp: _gp[0],
                }
            );
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the sanctioned amount page : ${err}`,
                err
            );
        }
    },

    renderNamuna1CreateUpdateSanctionedAmountPage: asyncHandler(async (req, res) => {
        const { year } = req.query;

         let _sanctionedAmountHeaders = [];
            if (year) {
                _sanctionedAmountHeaders =
                    await namuna1Tapshil3SanctionedAmountModel.fetchNamuna1Tapshil3SanctionedAmountHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _sanctionedAmountEntries = [];
            if (year && _sanctionedAmountHeaders[0]?.id) {
                _sanctionedAmountEntries =
                    await namuna1Tapshil3SanctionedAmountModel.fetchNamuna1Tapshil3SanctionedAmountByHeaderId(
                        res.pool,
                        _sanctionedAmountHeaders[0]?.id
                    );
            }

            let newEntryPath =
                'user/namuna/namuna1/collection/sanctioned-amount/namuna-1-sanctioned-amount-list.pug';
            let updateEntryPath =
                'user/namuna/namuna1/collection/sanctioned-amount/namuna-1-update-sanctioned-amount-list.pug';
            
            let isEdit = _sanctionedAmountEntries?.length > 0;
            renderPage(res, isEdit ? updateEntryPath : newEntryPath, {
                year,
                fromYear: year - 1,
                isEdit,
                sanctionedAmountHeaders: _sanctionedAmountHeaders,
                sanctionedAmountEntries: _sanctionedAmountEntries,
            });
    }),

    updateSingleSanctionedAmountHeaderEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil3SanctionedAmountModel.updateSingleNamuna1Tapshil3SanctionedAmountHeaderEntry(
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

    saveSanctionedAmountEntries: async (req, res) => {
        try {
            let { sanctionedAmount } = req.body;
            let { headers, body } = sanctionedAmount;

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
                    await namuna1Tapshil3SanctionedAmountModel.updateNamuna1Tapshil3SanctionedAmountHeaders(
                        res.pool,
                        headers[0]
                    );
            } else {
                _headerEntryResult =
                    await namuna1Tapshil3SanctionedAmountModel.saveNamuna1Tapshil3SanctionedAmountHeaders(
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

                insertEntry.namuna_1_tapshil_3_sanctioned_amount_headers_id_fk ||
                _headerEntryResult.insertId,
            ]);

            const _result =
                await namuna1Tapshil3SanctionedAmountModel.saveNamuna1Tapshil3SanctionedAmountEntries(
                    res.pool,
                    insertData
                );

            if (_result.affectedRows > 0) {
                res.status(201).json({
                    call: 1,
                    message: 'Sanctioned amount entries saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error in saving sanctioned amount entries: ${err}`, err);
        }
    },

    saveSingleSanctionedAmountEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil3SanctionedAmountModel.saveSingleNamuna1Tapshil3SanctionedAmountEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 sanctioned amount entry saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while adding the single row entry for sanctioned amount: ${err}`,
                err
            );
        }
    },

    deleteNamuna1SanctionedAmountEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil3SanctionedAmountModel.deleteNamuna1Tapshil3SanctionedAmountEntry(
                    res.pool,
                    req.body.id
                );

            if (_result.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 sanctioned amount entry deleted successfully',
                });
            } else {
                return res.status(404).json({
                    call: 0,
                    message: 'Namuna 1 sanctioned amount entry not found',
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while deleting the single sanctioned amount entry: ${err}`,
                err
            );
        }
    },

    updateSingleSanctionedAmountEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil3SanctionedAmountModel.updateSingleNamuna1Tapshil3SanctionedAmountEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 sanctioned amount entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating the single row entry for sanctioned amount: ${err}`,
                err
            );
        }
    },

    updateNamuna1SanctionedAmountEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil3SanctionedAmountModel.updateNamuna1Tapshil3SanctionedAmountEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 sanctioned amount entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating single namuna 1 sanctioned amount entry : ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Tapshil3SanctionedAmountController;
