const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const recieptBookReportModel = require('../../../../application/model/namuna/namuna3/recieptBookReportModel');

const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const recieptBookReportRouter = Router();

// Route to get the data and render the page
recieptBookReportRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await recieptBookReportModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;


        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/reciept-book-report/reciept-book-report-edit-page.pug'
                : 'user/namuna/namuna3/reciept-book-report/reciept-book-report-create-page.pug',
            { recieptBookReport: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the reciept book report page: ${err}`, err);
    }
});

// Route to save data
recieptBookReportRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await recieptBookReportModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Reciept Book Record data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving reciept book report data: ${err}`, err);
    }
});

// Route to update data
recieptBookReportRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await recieptBookReportModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Reciept Book Record data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating reciept book report data: ${err}`, err);
    }
});

module.exports = recieptBookReportRouter;
