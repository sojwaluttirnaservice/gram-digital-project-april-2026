const HomeModel = require('../../../../application/model/HomeModel');
const prapatraBModel = require('../../../../application/model/namuna/namuna3/prapatraBModel');

const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');

const { Router } = require('express');

const prapatraBRouter = Router();

prapatraBRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const _gp = await HomeModel.getGpData(res.pool);

        const year = req.query.year;

        const _existingRecords = await prapatraBModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/prapatra-b/prapatra-b-edit-page.pug'
                : 'user/namuna/namuna3/prapatra-b/prapatra-b-create-page.pug',
            { gp: _gp[0], prapatraB: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the prapatra b page: ${err}`, err);
    }
});

prapatraBRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraBModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra B data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving prapatra b data: ${err}`, err);
    }
});

prapatraBRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraBModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra B data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating prapatra b data: ${err}`, err);
    }
});

module.exports = prapatraBRouter;
