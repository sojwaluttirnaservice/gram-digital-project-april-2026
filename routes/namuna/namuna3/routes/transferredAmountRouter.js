const transferredAmountModel = require('../../../../application/model/namuna/namuna3/transferredAmountModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');
const { Router } = require('express');

const transferredAmountRouter = Router();

// Get transferred amount data by year
transferredAmountRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await transferredAmountModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/transferred-amount/transferred-amount-edit-page.pug'
                : 'user/namuna/namuna3/transferred-amount/transferred-amount-create-page.pug',
            { transferredAmount: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the transferred amount page: ${err}`, err);
    }
});

// Save the transferred amount data
transferredAmountRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await transferredAmountModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Transferred amount data saved successfully',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'No data saved, please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while saving transferred amount data: ${err}`, err);
    }
});

// Update the transferred amount data
transferredAmountRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await transferredAmountModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Transferred amount data updated successfully',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'No data updated, please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while updating transferred amount data: ${err}`, err);
    }
});

module.exports = transferredAmountRouter;
