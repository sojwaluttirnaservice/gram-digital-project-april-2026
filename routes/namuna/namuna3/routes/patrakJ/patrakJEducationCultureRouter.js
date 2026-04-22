const { Router } = require('express');
const { checkForPoolConnection } = require('../../../../middleware');
const patrakJEducationCultureModel = require('../../../../../application/model/namuna/namuna3/patrakJ/patrakJEducationCultureModel');
const { renderPage, sendError } = require('../../../../../application/utils/sendResponse');

const patrakJEducationCultureRouter = Router();

// Route to get the data and render the page
patrakJEducationCultureRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await patrakJEducationCultureModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/patrak-j/patrak-j-education-culture/patrak-j-education-culture-edit-page.pug'
                : 'user/namuna/namuna3/patrak-j/patrak-j-education-culture/patrak-j-education-culture-create-page.pug',
            { patrakJEducationCulture: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the patrak J Education Culture page: ${err}`,
            err
        );
    }
});

// Route to save data
patrakJEducationCultureRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJEducationCultureModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra J Education Culture data saved successfully',
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
            `Error while saving patrak J Education Culture data: ${err}`,
            err
        );
    }
});

// Route to update data
patrakJEducationCultureRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await patrakJEducationCultureModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra J Education Culture data updated successfully',
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
            `Error while updating patrak J Education Culture data: ${err}`,
            err
        );
    }
});

module.exports = patrakJEducationCultureRouter;
