const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const jPatrakMasikSabhaModel = require('../../../../application/model/namuna/namuna3/jPatrakMasikSabhaModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const jPatrakMasikSabhaRouter = Router();

// Route to get the data and render the page
jPatrakMasikSabhaRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await jPatrakMasikSabhaModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/j-patrak-masik-sabha/j-patrak-masik-sabha-edit-page.pug'
                : 'user/namuna/namuna3/j-patrak-masik-sabha/j-patrak-masik-sabha-create-page.pug',
            { jPatrakMasikSabha: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the Masik Sabha page: ${err}`, err);
    }
});

// Route to save data
jPatrakMasikSabhaRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await jPatrakMasikSabhaModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Masik Sabha data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving Masik Sabha data: ${err}`, err);
    }
});

// Route to update data
jPatrakMasikSabhaRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await jPatrakMasikSabhaModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Masik Sabha data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating Masik Sabha data: ${err}`, err);
    }
});

module.exports = jPatrakMasikSabhaRouter;
