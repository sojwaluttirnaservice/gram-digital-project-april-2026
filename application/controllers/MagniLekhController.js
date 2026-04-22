let HomeModel = require('../model/HomeModel');
let MagniLekhModel = require('../model/MagniLekhModel');
var responderSet = require('../config/_responderSet');
const { response } = require('express');
let myDates = responderSet.myDate;

let MagniLekhController = {
    allList: function (req, res, next) {
        var gp = {};
        var gp = {};
        var p_query = Number(req.query.e);
        console.log(p_query);
        if (isNaN(p_query)) {
            p_query = 0;
        }
        HomeModel.getGpData(res.pool)
            .then((result) => {
                gp = result[0];
                return MagniLekhModel.getMagnilekhLsit(res.pool);
            })
            .then((result) => {
                res.render('user/magniBillView', {
                    title: 'मागणी बिल लिस्ट',
                    users: result,
                    gp: gp,
                    p_query: p_query,
                });
            })
            .catch((error) => {
                res.status(500).send({ call: 0, data: error });
            });
    },
    getSingleMagniList: function (req, res, next) {
        var data = req.body;
        MagniLekhModel.getSingleMagniList(res.pool, data)
            .then((result) => {
                if (result[0].tax_id == null) {
                    res.status(200).send({ call: 2 });
                } else {
                    res.status(200).send({ call: 1, data: result[0] });
                }
            })
            .catch((error) => {
                res.status(500).send({ call: 0, data: error });
            });
    },

    renderMagniLekhBulkEntryPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/magni-bill/magni-bill-bulk-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering then mangi lekh bulk entry page: ${err}`);
        }
    },

    getMagniLekhEntries: async (req, res) => {
        try {
            const conditions = req.query;
            const _magniLekhEntries = await MagniLekhModel.getMagniLekhEntries(
                res.pool,
                conditions
            );

            return res.status(200).json({
                call: 1,
                magniLekhEntries: _magniLekhEntries,
            });
        } catch (err) {
            console.log(`Error while fetching the magni lekh entries: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to fetch magni lekh entries. Please try again later.',
                error: err?.message,
            });
        }
    },

    removeFromMagniLekh: function (req, res, next) {
        var id = req.body.id;
        MagniLekhModel.removeFromMagniLekh(res.pool, id)
            .then((result) => {
                res.status(200).send({ call: 1 });
            })
            .catch((error) => {
                res.status(500).send({ call: 0, data: error });
            });
    },
    addMagniLekh: function (req, res, next) {
        var data = req.body;
        MagniLekhModel.addMagniLekh(res.pool, data)
            .then((result) => {
                res.status(200).send({ call: 1 });
            })
            .catch((error) => {
                res.status(500).send({ call: 0, data: error });
            });
    },

    addMagniLekhBulk: async (req, res) => {
        try {
            const { magniLekhEntries } = req.body;

            if (!magniLekhEntries || magniLekhEntries?.length <= 0) {
                return res.status(422).json({
                    call: 0,
                    message: 'No magni lekh entries provided.',
                });
            }

            const _res = await MagniLekhModel.addMagniLekhBulk(res.pool, magniLekhEntries);

            console.log(_res);

            if (_res.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Magni lekh entries added successfully.',
                });
            }
        } catch (err) {
            console.log(`Error while adding magni lekh : ${err.message}`);
            return res.status(500).json({
                cal: 0,
                error: err,
                message: 'Failed to add magni lekh. Please try again later.',
            });
        }
    },
    nallBandAllList: function (req, res, next) {
        var gp = {};
        var p_query = Number(req.query.e);
        console.log(p_query);
        if (isNaN(p_query)) {
            p_query = 0;
        }
        HomeModel.getGpData(res.pool)
            .then((result) => {
                gp = result[0];
                return MagniLekhModel.getNalBandList(res.pool);
            })
            .then((result) => {
                // res.status(200).send({ call: 1, data: result });
                res.render('user/nalBandView', {
                    users: result,
                    gp: gp,
                    p_query: p_query,
                });
            })
            .catch((error) => {
                res.status(500).send({ call: 0, data: error });
            });
    },
    getSingleNalBandList: function (req, res, next) {
        // console.log(req.body, 'data controller');
        var data = req.body;
        // console.log('DAATA in query for get nal band notice in query = ', req.query);
        MagniLekhModel.getSingleNalBandList(res.pool, data)
            .then((result) => {
                // console.log(result);
                if (result[0]?.tax_id == null) {
                    return res.status(200).send({ call: 2 });
                } else {
                    return res.status(200).send({ call: 1, data: result[0] });
                }
            })
            .catch((error) => {
                console.error(error)
                return res.status(500).send({ call: 0, data: error });
            });
    },
    removeFromNalBand: function (req, res, next) {
        var data = req.body;
        MagniLekhModel.removeFromNalBandList(res.pool, data)
            .then((result) => {
                res.status(200).send({ call: 1 });
            })
            .catch((error) => {
                res.status(500).send({ call: 0, data: error });
            });
    },
    addNalBandUser: function (req, res, next) {
        var data = req.body;
        MagniLekhModel.addNalBandUser(res.pool, data)
            .then((result) => {
                res.status(200).send({ call: 1 });
            })
            .catch((error) => {
                res.status(500).send({ call: 0, data: error });
            });
    },

    getMaginLekhSearch: function (req, res, next) {
        var data = req.body;
        MagniLekhModel.getSingleMagniListAutocomplete(res.pool, data)
            .then((result) => {
                res.status(200).send({ call: result });
            })
            .catch((error) => {
                res.status(500).send({ call: error });
            });
    },
    getAutoSearch: function (req, res, next) {
        var data = req.body;
        MagniLekhModel.getSingleNalBandListAutocomplete(res.pool, data)
            .then((result) => {
                res.status(200).send({ call: result });
            })
            .catch((error) => {
                res.status(500).send({ call: error });
            });
    },
};
module.exports = MagniLekhController;
