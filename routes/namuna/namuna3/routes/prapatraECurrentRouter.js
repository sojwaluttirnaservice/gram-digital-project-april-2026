const prapatraECurrentPageModel = require('../../../../application/model/namuna/namuna3/prapatraECurrentPageModel');
const HomeModel = require('../../../../application/model/HomeModel');

const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');

const { Router } = require('express');

const prapatraECurrentRouter = Router();

prapatraECurrentRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const _gp = await HomeModel.getGpData(res.pool);

        const year = req.query.year;

        const _existingRecords = await prapatraECurrentPageModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/prapatra-e-current/prapatra-e-current-edit-page.pug'
                : 'user/namuna/namuna3/prapatra-e-current/prapatra-e-current-create-page.pug',
            { gp: _gp[0], prapatraECurrent: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the prapatra e page: ${err}`, err);
    }
});

prapatraECurrentRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraECurrentPageModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra E data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving prapatra e data: ${err}`, err);
    }
});

prapatraECurrentRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraECurrentPageModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra E data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating prapatra e data: ${err}`, err);
    }
});

module.exports = prapatraECurrentRouter;
