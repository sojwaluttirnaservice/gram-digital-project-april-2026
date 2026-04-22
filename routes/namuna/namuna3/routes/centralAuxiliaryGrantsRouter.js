const centralAuxiliaryGrantsModel = require('../../../../application/model/namuna/namuna3/centralAuxiliaryGrantsModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');
const { Router } = require('express');

const centralAuxiliaryGrantsRouter = Router();

// Get central auxiliary grants data by year
centralAuxiliaryGrantsRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await centralAuxiliaryGrantsModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/central-auxiliary-grants/central-auxiliary-grants-edit-page.pug'
                : 'user/namuna/namuna3/central-auxiliary-grants/central-auxiliary-grants-create-page.pug',
            { centralAuxiliaryGrants: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the central auxiliary grants page: ${err}`,
            err
        );
    }
});

// Save the central auxiliary grants data
centralAuxiliaryGrantsRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await centralAuxiliaryGrantsModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Central auxiliary grants data saved successfully',
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
        return sendError(
            res,
            500,
            0,
            `Error while saving central auxiliary grants data: ${err}`,
            err
        );
    }
});

// Update the central auxiliary grants data
centralAuxiliaryGrantsRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await centralAuxiliaryGrantsModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Central auxiliary grants data updated successfully',
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
        return sendError(
            res,
            500,
            0,
            `Error while updating central auxiliary grants data: ${err}`,
            err
        );
    }
});

module.exports = centralAuxiliaryGrantsRouter;
