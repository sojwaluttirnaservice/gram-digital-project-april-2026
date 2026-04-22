const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const gpCostRevaluationModel = require('../../../../application/model/namuna/namuna3/gpCostRevaluationModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const gpCostRevaluationRouter = Router();

// Route to get the data and render the page
gpCostRevaluationRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await gpCostRevaluationModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/gp-cost-revaluation/gp-cost-revaluation-edit-page.pug'
                : 'user/namuna/namuna3/gp-cost-revaluation/gp-cost-revaluation-create-page.pug',
            { gpCostRevaluation: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering GP Cost Revaluation page: ${err}`, err);
    }
});

// Route to save data
gpCostRevaluationRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await gpCostRevaluationModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'GP Cost Revaluation data saved successfully.',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'Failed to save GP Cost Revaluation data. Please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while saving GP Cost Revaluation data: ${err}`, err);
    }
});

// Route to update data
gpCostRevaluationRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await gpCostRevaluationModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'GP Cost Revaluation data updated successfully.',
                result: _result,
            });
        } else {
            res.status(400).json({
                call: 0,
                message: 'Failed to update GP Cost Revaluation data. Please check the input data.',
                result: _result,
            });
        }
    } catch (err) {
        return sendError(res, 500, 0, `Error while updating GP Cost Revaluation data: ${err}`, err);
    }
});

module.exports = gpCostRevaluationRouter;
