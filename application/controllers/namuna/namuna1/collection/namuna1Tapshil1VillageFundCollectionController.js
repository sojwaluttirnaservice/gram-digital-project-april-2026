const HomeModel = require('../../../../model/HomeModel');
const namuna1Tapshil1VillageFundCollectionModel = require('../../../../model/namuna/namuna1/collection/namuna1Tapshil1CollectionOfVillageFundsModel');
const asyncHandler = require('../../../../utils/asyncHandler');
const { sendError, renderPage } = require('../../../../utils/sendResponse');

const namuna1Tapshil1VillageFundCollectionController = {
    renderNamuna1Tapshil1CollectionOfVillageFundsPage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/namuna/namuna1/collection/village-funds/namuna-1-village-funds-page.pug')
    }),
    
    renderNamuna1CreateUpdateEntriesPage: asyncHandler(async (req, res) => {
          const { year } = req.query;
          let _villageFundsHeaders = [];
            if (year) {
                _villageFundsHeaders =
                    await namuna1Tapshil1VillageFundCollectionModel.fetchNamuna1Tapshil1VillageFundHeadersByYear(
                        res.pool,
                        year
                    );
            }

            // Take id of the above and  get Entries by above id as fk in below entries

            let _villageFundsEntries = [];

            if (year && _villageFundsHeaders[0]?.id) {
                _villageFundsEntries =
                    await namuna1Tapshil1VillageFundCollectionModel.fetchNamuna1Tapshil1VillageFundsByHeaderId(
                        res.pool,
                        _villageFundsHeaders[0]?.id
                    );
            }

            let newEntryPath =
                'user/namuna/namuna1/collection/village-funds/namuna-1-village-funds-list.pug';
            let updateEntryPath =
                'user/namuna/namuna1/collection/village-funds/namuna-1-update-village-funds-list.pug';

            let isEdit =  _villageFundsEntries?.length > 0;

            renderPage(res, isEdit ? updateEntryPath : newEntryPath, {

                year, // this is toYear
                fromYear: year - 1,
                
                isEdit,

                villageFundsHeaders: _villageFundsHeaders,
                villageFundsEntries: _villageFundsEntries,
            });
    }),

    updateSingleVillageFundHeaderEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil1VillageFundCollectionModel.updateSingleVillageFundHeaderEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows > 0) {
                res.status(200).json({
                    call: 1,
                    message: '��े��र ������ा��ित केले ����े.',
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error while updating the header entry: ${err}`, err);
        }
    },

    saveVilageCollectionFundsEntries: async (req, res) => {
        try {
            let { villageFunds } = req.body;

            let { headers, body } = villageFunds;
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
                    await namuna1Tapshil1VillageFundCollectionModel.updateVillageCollectionFundsHeaders(
                        res.pool,
                        headers[0]
                    );
            } else {
                _headerEntryResult =
                    await namuna1Tapshil1VillageFundCollectionModel.saveVillageCollectionFundsHeaders(
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

            console.log(headers);
            const insertData = body.map((insertEntry) => [
                headers[0].year, // this value is set as the year for each entry
                insertEntry.item_in_budget,
                insertEntry.estimated_income_of_panchayat,
                insertEntry.approved_estimated_amount,
                insertEntry.actual_amount_previous_year,
                insertEntry.actual_amount_year_before_last,

                insertEntry.namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk ||
                _headerEntryResult.insertId, // fallback to the header entry insert ID if not already set

                // insertEntry.id, // extra field (not needed in INSERT query)
            ]);

            const _result =
                await namuna1Tapshil1VillageFundCollectionModel.saveVillageCollectionFundsEntries(
                    res.pool,
                    insertData
                );

            if (_result.affectedRows > 0) {
                res.status(201).json({
                    call: 1,
                    message: 'Village Collection Funds entries saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error in saving Village Collection Funds entries: ${err}`,
                err
            );
        }
    },

    saveSingleVillageFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil1VillageFundCollectionModel.saveSingleVillageFundEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 village fund entry saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while adding the single row entry for funds: ${err}`,
                err
            );
        }
    },

    deleteNamuna1VillageCollectionFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil1VillageFundCollectionModel.deleteNamuna1VillageCollectionFundEntry(
                    res.pool,
                    req.body.id
                );

            if (_result.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 village fund entry deleted successfully',
                });
            } else {
                return res.status(404).json({
                    call: 0,
                    message: 'Namuna 1 village fund entry not found',
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while deleting the single village fund entry: ${err}`,
                err
            );
        }
    },

    updateSingleVillageFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil1VillageFundCollectionModel.updateSingleVillageFundEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 village fund entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating the single row entry for funds: ${err}`,
                err
            );
        }
    },

    updateNamuna1VillageCollectionFundEntry: async (req, res) => {
        try {
            const _result =
                await namuna1Tapshil1VillageFundCollectionModel.updateNamuna1VillageCollectionFundEntry(
                    res.pool,
                    req.body
                );

            if (_result.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 village fund entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating single namuna 1 village fund entry : ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Tapshil1VillageFundCollectionController;
