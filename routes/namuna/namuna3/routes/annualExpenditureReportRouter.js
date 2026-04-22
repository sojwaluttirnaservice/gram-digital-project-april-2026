const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const annualExpenditureReportModel = require('../../../../application/model/namuna/namuna3/annualExpenditureReportModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const annualExpenditureReportRouter = Router();

// Route to get the data and render the page
annualExpenditureReportRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await annualExpenditureReportModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;


        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/annual-expenditure-report/annual-expenditure-report-edit-page.pug'
                : 'user/namuna/namuna3/annual-expenditure-report/annual-expenditure-report-create-page.pug',
            { annualExpenditureReport: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the receipt book details page: ${err}`, err);
    }
});

// Route to save data
annualExpenditureReportRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await annualExpenditureReportModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Reciept  data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving receipt book details data: ${err}`, err);
    }
});

// Route to update data
annualExpenditureReportRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await annualExpenditureReportModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Reciept  data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating receipt book details data: ${err}`, err);
    }
});

module.exports = annualExpenditureReportRouter;
