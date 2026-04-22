const prapatraEECurrentPageModel = require('../../../../application/model/namuna/namuna3/prapatraEECurrentPageModel');
const HomeModel = require('../../../../application/model/HomeModel');

const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');

const { Router } = require('express');

const prapatraEECurrentRouter = Router();

prapatraEECurrentRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const _gp = await HomeModel.getGpData(res.pool);

        const year = req.query.year;

        const _existingRecords = await prapatraEECurrentPageModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/prapatra-ee-current/prapatra-ee-current-edit-page.pug'
                : 'user/namuna/namuna3/prapatra-ee-current/prapatra-ee-current-create-page.pug',
            { gp: _gp[0], prapatraEECurrent: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the prapatra ee page: ${err}`, err);
    }
});

prapatraEECurrentRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraEECurrentPageModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra EE data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving prapatra ee data: ${err}`, err);
    }
});

prapatraEECurrentRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraEECurrentPageModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra EE data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating prapatra ee data: ${err}`, err);
    }
});

module.exports = prapatraEECurrentRouter;
