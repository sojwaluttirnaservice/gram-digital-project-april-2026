const { Router } = require('express');

const prapatraCATaxModel = require('../../../../application/model/namuna/namuna3/prapatraCATaxModel');
const { checkForPoolConnection } = require('../../../middleware');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const prapatraCATaxRouter = Router();

// Route to get the data and render the page
prapatraCATaxRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await prapatraCATaxModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/prapatra-c/prapatra-c-a-tax/prapatra-c-a-tax-edit-page.pug'
                : 'user/namuna/namuna3/prapatra-c/prapatra-c-a-tax/prapatra-c-a-tax-create-page.pug',
            { prapatraCATax: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the ps_n_3_patrak_c_a_tax page: ${err}`,
            err
        );
    }
});

// Route to save data
prapatraCATaxRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraCATaxModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Prapatra C A Tax data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving ps_n_3_patrak_c_a_tax data: ${err}`, err);
    }
});

// Route to update data
prapatraCATaxRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await prapatraCATaxModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Prapatra C A Tax data updated successfully',
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
            `Error while updating ps_n_3_patrak_c_a_tax data: ${err}`,
            err
        );
    }
});

module.exports = prapatraCATaxRouter;
