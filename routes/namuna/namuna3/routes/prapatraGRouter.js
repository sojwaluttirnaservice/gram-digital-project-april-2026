const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const prapatraGModel = require('../../../../application/model/namuna/namuna3/prapatraGModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');


const prapatraGRouter = Router();

// Route to get the data and render the page
prapatraGRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await prapatraGModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(

            res,
            isEdit
                ? 'user/namuna/namuna3/prapatra-g/prapatra-g-edit-page.pug'
                : 'user/namuna/namuna3/prapatra-g/prapatra-g-create-page.pug',
            { prapatraG: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the prapatra G page: ${err}`, err);
    }
});

// Route to save data
prapatraGRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraGModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra G data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving prapatra G data: ${err}`, err);
    }
});

// Route to update data
prapatraGRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraGModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra G data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating prapatra G data: ${err}`, err);
    }
});

module.exports = prapatraGRouter;
