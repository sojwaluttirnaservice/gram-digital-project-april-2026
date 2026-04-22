const womenChildrenWelfareModel = require('../../../../application/model/namuna/namuna3/womenChildrenWelfareModel');
const { renderPage, sendError } = require('../../../../application/utils/sendResponse');
const { checkForPoolConnection } = require('../../../middleware');

const { Router } = require('express');

const womenChildrenWelfareRouter = Router();

womenChildrenWelfareRouter.get('/', checkForPoolConnection, async (req, res) => {
    try {
        const year = req.query.year;

        const _existingRecords = await womenChildrenWelfareModel.getByYear(res.pool, year);

        console.log(_existingRecords);

        const isEdit = _existingRecords?.length > 0;

        renderPage(
            res,
            isEdit
                ? 'user/namuna/namuna3/women-children-welfare/women-children-welfare-edit-page.pug'
                : 'user/namuna/namuna3/women-children-welfare/women-children-welfare-create-page.pug',
            { wcWelfare: _existingRecords[0], year }
        );
    } catch (err) {
        return sendError(
            res,
            500,
            0,
            `Error while rendering the women children welfare page: ${err}`,
            err
        );
    }
});

womenChildrenWelfareRouter.post('/save', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await womenChildrenWelfareModel.create(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(201).json({
                call: 1,
                message: 'Women Children Welfare data saved successfully',
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
            `Error while saving women children welfare data: ${err}`,
            err
        );
    }
});

womenChildrenWelfareRouter.put('/update', checkForPoolConnection, async (req, res) => {
    try {
        const data = req.body;

        const _result = await womenChildrenWelfareModel.update(res.pool, data);

        if (_result.affectedRows > 0) {
            res.status(200).json({
                call: 1,
                message: 'Women Children Welfare data updated successfully',
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
            `Error while updating women children welfare data: ${err}`,
            err
        );
    }
});

module.exports = womenChildrenWelfareRouter;
