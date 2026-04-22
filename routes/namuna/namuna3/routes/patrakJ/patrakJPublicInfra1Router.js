const { Router } = require('express');
const { checkForPoolConnection } = require('../../../../middleware');
const patrakJPublicInfra1Model = require('../../../../../application/model/namuna/namuna3/patrakJ/patrakJPublicInfra1Model');
const { renderPage, sendError } = require('../../../../../application/utils/sendResponse');

const patrakJPublicInfra1Router = Router();

// Route to get the data and render the page
patrakJPublicInfra1Router.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await patrakJPublicInfra1Model.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/patrak-j/patrak-j-public-infra-1/patrak-j-public-infra-1-edit-page.pug'
                : 'user/namuna/namuna3/patrak-j/patrak-j-public-infra-1/patrak-j-public-infra-1-create-page.pug',
            { patrakJPublicInfra1: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the patrak J Public Infra 1 page: ${err}`,
            err
        );
    }
});

// Route to save data
patrakJPublicInfra1Router.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJPublicInfra1Model.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra J Public Infra 1 data saved successfully',
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
            `Error while saving patrak J Public Infra 1 data: ${err}`,
            err
        );
    }
});

// Route to update data
patrakJPublicInfra1Router.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJPublicInfra1Model.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra J Public Infra 1 data updated successfully',
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
            `Error while updating patrak J Public Infra 1 data: ${err}`,
            err
        );
    }
});

module.exports = patrakJPublicInfra1Router;
