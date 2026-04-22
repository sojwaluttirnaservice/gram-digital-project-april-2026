const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const gpWaterSupplyFundModel = require('../../../../application/model/namuna/namuna3/gpWaterSupplyFundModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const gpWaterSupplyFundRouter = Router();

// Route to get the data and render the page
gpWaterSupplyFundRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await gpWaterSupplyFundModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/gp-water-supply-fund/gp-water-supply-fund-edit-page.pug'
                : 'user/namuna/namuna3/gp-water-supply-fund/gp-water-supply-fund-create-page.pug',
            { gpWaterSupplyFund: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the water supply fund report page: ${err}`, err);
    }
});

// Route to save data
gpWaterSupplyFundRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await gpWaterSupplyFundModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Water supply data saved successfully',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'No water supply fund data saved, please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while saving water supply fund data: ${err}`, err);
    }
});

// Route to update data
gpWaterSupplyFundRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await gpWaterSupplyFundModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Water supply data updated successfully',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'No water supply fund data updated, please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while updating water supply fund data: ${err}`, err);
    }
});

module.exports = gpWaterSupplyFundRouter;
