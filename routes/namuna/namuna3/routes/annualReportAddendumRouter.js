const { Router } = require('express');
const { checkForPoolConnection } = require('../../../middleware');
const annualReportAddendumModel = require('../../../../application/model/namuna/namuna3/annualReportAddendumModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');

const annualReportAddendumRouter = Router();

// Route to get the data and render the page
annualReportAddendumRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await annualReportAddendumModel.getByYear(res.pool, year);

        const isEdit = _existingRecords?.length > 0;


        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/annual-addendum-report/annual-addendum-report-edit-page.pug'
                : 'user/namuna/namuna3/annual-addendum-report/annual-addendum-report-create-page.pug',
            { annualReportAddendum: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(res, 500, 0, `Error while rendering the annual report addendum page: ${err}`, err);
    }
});

// Route to save data
annualReportAddendumRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await annualReportAddendumModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Annual Report Addendum data saved successfully',
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
        return sendError(res, 500, 0, `Error while saving annual report addendum data: ${err}`, err);
    }
});

// Route to update data
annualReportAddendumRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await annualReportAddendumModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Annual Report Addendum data updated successfully',
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
        return sendError(res, 500, 0, `Error while updating annual report addendum data: ${err}`, err);
    }
});

module.exports = annualReportAddendumRouter;
