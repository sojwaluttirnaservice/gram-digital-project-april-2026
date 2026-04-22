const oneBOtherIncomeModel = require('../../../../application/model/namuna/namuna3/oneBOtherIncomeModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');
const { Router } = require('express');

const otherIncomeRouter = Router();

// Get the other income data by year
otherIncomeRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await oneBOtherIncomeModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/other-income/other-income-edit-page.pug'
                : 'user/namuna/namuna3/other-income/other-income-create-page.pug',
            { otherIncome: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the other income page: ${err}`, err);
    }
});

// Save the other income data
otherIncomeRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await oneBOtherIncomeModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Other income data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving other income data: ${err}`, err);
    }
});

// Update the other income data
otherIncomeRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await oneBOtherIncomeModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Other income data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating other income data: ${err}`, err);
    }
});

module.exports = otherIncomeRouter;
