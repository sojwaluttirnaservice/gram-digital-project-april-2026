const initialBalanceModel = require('../../../../application/model/namuna/namuna3/initialBalanceModel'); // Update with actual model location
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');
const { Router } = require('express');

const initialBalanceRouter = Router();

// Get the initial balance data by year
initialBalanceRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await initialBalanceModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/initial-balance/initial-balance-edit-page.pug'
                : 'user/namuna/namuna3/initial-balance/initial-balance-create-page.pug',
            { initialBalance: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the initial balance page: ${err}`, err);
    }
});

// Save the initial balance data
initialBalanceRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await initialBalanceModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Initial balance data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving initial balance data: ${err}`, err);
    }
});

// Update the initial balance data
initialBalanceRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await initialBalanceModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Initial balance data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating initial balance data: ${err}`, err);
    }
});

module.exports = initialBalanceRouter;
