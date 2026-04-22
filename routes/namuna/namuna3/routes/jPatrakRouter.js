const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const jPatrakModel = require('../../../../application/model/namuna/namuna3/jPatrakModel'); // Adjust the path accordingly
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const jPatrakRouter = Router();

// Route to get the data and render the page
jPatrakRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await jPatrakModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/j-patrak/j-patrak-edit-page.pug'
                : 'user/namuna/namuna3/j-patrak/j-patrak-create-page.pug',
            { jPatrak: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the J Patrak page: ${err}`, err);
    }
});

// Route to save data
jPatrakRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await jPatrakModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'J Patrak data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving J Patrak data: ${err}`, err);
    }
});

// Route to update data
jPatrakRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await jPatrakModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'J Patrak data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating J Patrak data: ${err}`, err);
    }
});

module.exports = jPatrakRouter;
