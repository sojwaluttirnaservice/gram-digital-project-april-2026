const { Router } = require('express');
const { checkForPoolConnection } = require('../../../../middleware');
const patrakJPublicInfra2Model = require('../../../../../application/model/namuna/namuna3/patrakJ/patrakJPublicInfra2Model');
const { renderPage, sendError } = require('../../../../../application/utils/sendResponse');
const HomeModel = require('../../../../../application/model/HomeModel');

const patrakJPublicInfra2Router = Router();

// Route to get the data and render the page
patrakJPublicInfra2Router.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await patrakJPublicInfra2Model.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/patrak-j/patrak-j-public-infra-2/patrak-j-public-infra-2-edit-page.pug'
                : 'user/namuna/namuna3/patrak-j/patrak-j-public-infra-2/patrak-j-public-infra-2-create-page.pug',
            { patrakJPublicInfra2: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the patrak J Public Infra 2 page: ${err}`,
            err
        );
    }
});

// Route to save data
patrakJPublicInfra2Router.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJPublicInfra2Model.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra J Public Infra 2 data saved successfully',
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
            `Error while saving patrak J Public Infra 2 data: ${err}`,
            err
        );
    }
});

// Route to update data
patrakJPublicInfra2Router.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJPublicInfra2Model.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra J Public Infra 2 data updated successfully',
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
            `Error while updating patrak J Public Infra 2 data: ${err}`,
            err
        );
    }
});

module.exports = patrakJPublicInfra2Router;
