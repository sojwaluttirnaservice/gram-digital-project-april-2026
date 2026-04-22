const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const patrakGGPWaterSupplyModel = require('../../../../application/model/namuna/namuna3/patrakGGPWaterSupplyModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const patrakGGPWaterSupplyRouter = Router();

// Route to get the data and render the page
patrakGGPWaterSupplyRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await patrakGGPWaterSupplyModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/patrak-g-gp-water-supply/patrak-g-gp-water-supply-edit-page.pug'
                : 'user/namuna/namuna3/patrak-g-gp-water-supply/patrak-g-gp-water-supply-create-page.pug',
            { patrakGGPWaterSupply: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the water supply report page: ${err}`, err);
    }
});

// Route to save data
patrakGGPWaterSupplyRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakGGPWaterSupplyModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Water supply data saved successfully',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'No water supply data saved, please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while saving water supply data: ${err}`, err);
    }
});

// Route to update data
patrakGGPWaterSupplyRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakGGPWaterSupplyModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Water supply data updated successfully',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'No water supply data updated, please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while updating water supply data: ${err}`, err);
    }
});

module.exports = patrakGGPWaterSupplyRouter;
