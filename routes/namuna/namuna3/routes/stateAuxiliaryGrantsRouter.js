const stateAuxiliaryGrantsModel = require('../../../../application/model/namuna/namuna3/stateAuxiliaryGrantsModel ');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');
const { Router } = require('express');

const stateAuxiliaryGrantsRouter = Router();

// Get state auxiliary grants data by year
stateAuxiliaryGrantsRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await stateAuxiliaryGrantsModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/state-auxiliary-grants/state-auxiliary-grants-edit-page.pug'
                : 'user/namuna/namuna3/state-auxiliary-grants/state-auxiliary-grants-create-page.pug',
            { stateAuxiliaryGrants: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the state auxiliary grants page: ${err}`, err);
    }
});

// Save the state auxiliary grants data
stateAuxiliaryGrantsRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await stateAuxiliaryGrantsModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'State auxiliary grants data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving state auxiliary grants data: ${err}`, err);
    }
});

// Update the state auxiliary grants data
stateAuxiliaryGrantsRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await stateAuxiliaryGrantsModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'State auxiliary grants data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating state auxiliary grants data: ${err}`, err);
    }
});

module.exports = stateAuxiliaryGrantsRouter;
