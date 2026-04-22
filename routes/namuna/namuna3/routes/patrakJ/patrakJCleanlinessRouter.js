const { Router } = require('express');
const { checkForPoolConnection } = require('../../../../middleware');
const patrakJCleanlinessModel = require('../../../../../application/model/namuna/namuna3/patrakJ/patrakJCleanlinessModel');
const { renderPage, sendError } = require('../../../../../application/utils/sendResponse');

const patrakJCleanlinessRouter = Router();

// Route to get the data and render the page
patrakJCleanlinessRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;
        
        const _existingRecords = await patrakJCleanlinessModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/patrak-j/patrak-j-cleanliness/patrak-j-cleanliness-edit-page.pug'
                : 'user/namuna/namuna3/patrak-j/patrak-j-cleanliness/patrak-j-cleanliness-create-page.pug',
            { patrakJCleanliness: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the patrak J Cleanliness page: ${err}`,
            err
        );
    }
});

// Route to save data
patrakJCleanlinessRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJCleanlinessModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra J Cleanliness data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving patrak J Cleanliness data: ${err}`, err);
    }
});

// Route to update data
patrakJCleanlinessRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJCleanlinessModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra J Cleanliness data updated successfully',
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
        return sendError(
            res,
            500,
            0,
            `Error while updating patrak J Cleanliness data: ${err}`,
            err
        );
    }
});

module.exports = patrakJCleanlinessRouter;
