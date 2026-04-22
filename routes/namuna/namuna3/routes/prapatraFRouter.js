const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const prapatraFModel = require('../../../../application/model/namuna/namuna3/prapatraFModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const prapatraFRouter = Router();

// Route to get the data and render the page
prapatraFRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await prapatraFModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;


        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/prapatra-f/prapatra-f-edit-page.pug'
                : 'user/namuna/namuna3/prapatra-f/prapatra-f-create-page.pug',
            { prapatraF: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the prapatra F page: ${err}`, err);
    }
});

// Route to save data
prapatraFRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraFModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra F data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving prapatra F data: ${err}`, err);
    }
});

// Route to update data
prapatraFRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraFModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra F data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating prapatra F data: ${err}`, err);
    }
});

module.exports = prapatraFRouter;
