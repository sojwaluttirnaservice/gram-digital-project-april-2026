const HomeModel = require('../../../../model/HomeModel');
const namuna1Tapshil5WaterFundModel = require('../../../../model/namuna/namuna1/collection/namuna1Tapshil5WaterFundModel');
const { sendError } = require('../../../../utils/sendResponse');

const namuna1Tapshil5WaterFundController = {
    renderNamuna1Tapshil5WaterFundPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            res.render(
                'user/namuna/namuna1/collection/water-funds/namuna-1-water-funds-page.pug',
                {
                    gp: _gp[0],
                }
            );
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the water funds page: ${err}`,
                err
            );
        }
    },

    renderNamuna1CreateUpdateWaterFundPage: async (req, res) => {
        try {
            const { year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);

            let _waterFundHeaders = [];
            if (year) {
                _waterFundHeaders = await namuna1Tapshil5WaterFundModel.fetchNamuna1Tapshil5WaterFundHeadersByYear(
                    res.pool,
                    year
                );
            }

            let _waterFundEntries = [];
            if (year && _waterFundHeaders[0]?.id) {
                _waterFundEntries = await namuna1Tapshil5WaterFundModel.fetchNamuna1Tapshil5WaterFundByHeaderId(
                    res.pool,
                    _waterFundHeaders[0]?.id
                );
            }

            let newEntryPath =
                'user/namuna/namuna1/collection/water-funds/namuna-1-water-funds-list.pug';
            let updateEntryPath =
                'user/namuna/namuna1/collection/water-funds/namuna-1-update-water-funds-list.pug';
            res.render(_waterFundEntries?.length > 0 ? updateEntryPath : newEntryPath, {
                gp: _gp[0],
                year,
                fromYear: year - 1,
                isEdit: _waterFundEntries?.length > 0 ? true : false,
                waterFundHeaders: _waterFundHeaders,
                waterFundEntries: _waterFundEntries,
            });
        } catch (err) {
            console.log(err.message);
            return sendError(
                res,
                500,
                0,
                `Error while rendering the create water funds entries for namuna 1: ${err}`,
                err
            );
        }
    },

    updateSingleWaterFundHeaderEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil5WaterFundModel.updateSingleNamuna1Tapshil5WaterFundHeader(
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

    saveWaterFundEntries: async (req, res) => {
        try {
            let { waterFund } = req.body;
            let { headers, body } = waterFund;

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
                _headerEntryResult = await namuna1Tapshil5WaterFundModel.updateNamuna1Tapshil5WaterFundHeaders(
                    res.pool,
                    headers[0]
                );
            } else {
                _headerEntryResult = await namuna1Tapshil5WaterFundModel.saveNamuna1Tapshil5WaterFundHeaders(
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

                insertEntry.namuna_1_tapshil_5_water_funds_headers_id_fk ||
                _headerEntryResult.insertId,
            ]);

            const _result = await namuna1Tapshil5WaterFundModel.saveNamuna1Tapshil5WaterFundEntries(
                res.pool,
                insertData
            );

            if (_result.affectedRows > 0) {
                res.status(201).json({
                    call: 1,
                    message: 'Water funds entries saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(res, 500, 0, `Error in saving water funds entries: ${err}`, err);
        }
    },

    saveSingleWaterFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil5WaterFundModel.saveSingleNamuna1Tapshil5WaterFundEntry(
                res.pool,
                req.body
            );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 water funds entry saved successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while adding the single row entry for water funds: ${err}`,
                err
            );
        }
    },

    deleteNamuna1WaterFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil5WaterFundModel.deleteNamuna1Tapshil5WaterFundEntry(
                res.pool,
                req.body.id
            );

            if (_result.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 water funds entry deleted successfully',
                });
            } else {
                return res.status(404).json({
                    call: 0,
                    message: 'Namuna 1 water funds entry not found',
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while deleting the single water funds entry: ${err}`,
                err
            );
        }
    },

    updateSingleWaterFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil5WaterFundModel.updateSingleNamuna1Tapshil5WaterFundEntry(
                res.pool,
                req.body
            );

            if (_result.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Namuna 1 water funds entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating the single row entry for water funds: ${err}`,
                err
            );
        }
    },

    updateNamuna1WaterFundEntry: async (req, res) => {
        try {
            const _result = await namuna1Tapshil5WaterFundModel.updateNamuna1Tapshil5WaterFundEntry(
                res.pool,
                req.body
            );

            if (_result.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: 'Namuna 1 water funds entry updated successfully',
                    result: _result,
                });
            }
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while updating single namuna 1 water funds entry: ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Tapshil5WaterFundController;
