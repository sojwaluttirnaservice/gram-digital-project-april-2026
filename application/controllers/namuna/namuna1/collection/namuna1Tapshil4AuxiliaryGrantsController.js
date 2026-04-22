const HomeModel = require('../../../../model/HomeModel');
const namuna1Tapshil4AuxiliaryGrantsModel = require('../../../../model/namuna/namuna1/collection/namuna1Tapshil4AuxiliaryGrantsModel');
const asyncHandler = require('../../../../utils/asyncHandler');
const { sendError, renderPage } = require('../../../../utils/sendResponse');

const namuna1Tapshil4AuxiliaryGrantsController = {
    renderNamuna1Tapshil4AuxiliaryGrantsPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            res.render(
                'user/namuna/namuna1/collection/auxiliary-grants/namuna-1-auxiliary-grants-page.pug',
                {
                    gp: _gp[0],
                }
            );
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the auxiliary grants page: ${err}`,
                err
            );
        }
    },


    renderNamuna1CreateUpdateAuxiliaryGrantsPage: asyncHandler(async (req, res) => {
        const { year } = req.query;

         let _auxiliaryGrantsHeaders = [];
            if (year) {
                _auxiliaryGrantsHeaders =
                    await namuna1Tapshil4AuxiliaryGrantsModel.fetchNamuna1Tapshil4AuxiliaryGrantsHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _auxiliaryGrantsEntries = [];
            if (year && _auxiliaryGrantsHeaders[0]?.id) {
                _auxiliaryGrantsEntries =
                    await namuna1Tapshil4AuxiliaryGrantsModel.fetchNamuna1Tapshil4AuxiliaryGrantsByHeaderId(
                        res.pool,
                        _auxiliaryGrantsHeaders[0]?.id
                    );
            }

            let newEntryPath =
                'user/namuna/namuna1/collection/auxiliary-grants/namuna-1-auxiliary-grants-list.pug';
            let updateEntryPath =
                'user/namuna/namuna1/collection/auxiliary-grants/namuna-1-update-auxiliary-grants-list.pug';

            let isEdit = _auxiliaryGrantsEntries?.length > 0 ;
            
            renderPage(res, isEdit ? updateEntryPath : newEntryPath, {
                year,
                fromYear: year - 1,
                isEdit,
                auxiliaryGrantsHeaders: _auxiliaryGrantsHeaders,
                auxiliaryGrantsEntries: _auxiliaryGrantsEntries,
            });
    }),

    renderNamuna1CreateUpdateAuxiliaryGrantsPage: async (req, res) => {
        try {
            const { year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _auxiliaryGrantsHeaders = [];
            if (year) {
                _auxiliaryGrantsHeaders =
                    await namuna1Tapshil4AuxiliaryGrantsModel.fetchNamuna1Tapshil4AuxiliaryGrantsHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _auxiliaryGrantsEntries = [];
            if (year && _auxiliaryGrantsHeaders[0]?.id) {
                _auxiliaryGrantsEntries =
                    await namuna1Tapshil4AuxiliaryGrantsModel.fetchNamuna1Tapshil4AuxiliaryGrantsByHeaderId(
                        res.pool,
                        _auxiliaryGrantsHeaders[0]?.id
                    );
            }

            let newEntryPath =
                'user/namuna/namuna1/collection/auxiliary-grants/namuna-1-auxiliary-grants-list.pug';
            let updateEntryPath =
                'user/namuna/namuna1/collection/auxiliary-grants/namuna-1-update-auxiliary-grants-list.pug';
            res.render(_auxiliaryGrantsEntries?.length > 0 ? updateEntryPath : newEntryPath, {
                gp: _gp[0],
                year,
                fromYear: year - 1,
                isEdit: _auxiliaryGrantsEntries?.length > 0 ? true : false,
                auxiliaryGrantsHeaders: _auxiliaryGrantsHeaders,
                auxiliaryGrantsEntries: _auxiliaryGrantsEntries,
            });
        } catch (err) {
            console.log(err.message);
            return sendError(
                res,
                500,
                0,
                `Error while rendering the create auxiliary grants entries for namuna 1: ${err}`,
                err
            );
        }
    },

    updateSingleAuxiliaryGrantsHeaderEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil4AuxiliaryGrantsModel.updateSingleNamuna1Tapshil4AuxiliaryGrantsHeaderEntry(
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

    saveAuxiliaryGrantsEntries: async (req, res) => {
        try {
            let { auxiliaryGrants } = req.body;
            let { headers, body } = auxiliaryGrants;

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
                    await namuna1Tapshil4AuxiliaryGrantsModel.updateNamuna1Tapshil4AuxiliaryGrantsHeaders(
                        res.pool,
                        headers[0]
                    );
            } else {
                _headerEntryResult =
                    await namuna1Tapshil4AuxiliaryGrantsModel.saveNamuna1Tapshil4AuxiliaryGrantsHeaders(
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

                insertEntry.namuna_1_tapshil_4_auxiliary_grants_headers_id_fk ||
                _headerEntryResult.insertId,
            ]);

            const _result =
                await namuna1Tapshil4AuxiliaryGrantsModel.saveNamuna1Tapshil4AuxiliaryGrantsEntries(
                    res.pool,
                    insertData
                );

            if (_result.affectedRows > 0) {
                res.status(201).json({
                    call: 1,
                    message: 'Auxiliary grants entries saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error in saving auxiliary grants entries: ${err}`, err);
        }
    },

    saveSingleAuxiliaryGrantsEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil4AuxiliaryGrantsModel.saveSingleNamuna1Tapshil4AuxiliaryGrantsEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 auxiliary grants entry saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while adding the single row entry for auxiliary grants: ${err}`,
                err
            );
        }
    },

    deleteNamuna1AuxiliaryGrantsEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil4AuxiliaryGrantsModel.deleteNamuna1Tapshil4AuxiliaryGrantsEntry(
                    res.pool,
                    req.body.id
                );

            if (_result.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 auxiliary grants entry deleted successfully',
                });
            } else {
                return res.status(404).json({
                    call: 0,
                    message: 'Namuna 1 auxiliary grants entry not found',
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while deleting the single auxiliary grants entry: ${err}`,
                err
            );
        }
    },

    updateSingleAuxiliaryGrantsEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil4AuxiliaryGrantsModel.updateSingleNamuna1Tapshil4AuxiliaryGrantsEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 auxiliary grants entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating the single row entry for auxiliary grants: ${err}`,
                err
            );
        }
    },

    updateNamuna1AuxiliaryGrantsEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil4AuxiliaryGrantsModel.updateNamuna1Tapshil4AuxiliaryGrantsEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 auxiliary grants entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating single namuna 1 auxiliary grants entry: ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Tapshil4AuxiliaryGrantsController;
