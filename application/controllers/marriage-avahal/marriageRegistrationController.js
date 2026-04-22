const HomeModel = require('../../model/HomeModel');
const ZPModel = require('../../model/ZPModel');
const marriageRegistrationModel = require('../../model/marriage-registration-avahal/marriageRegistrationModel');

const marriageRegistrationController = {
    //the view
    marriageAvahalView: async (_, res) => {
        let gp = await getGpData(res);

        // render the list page
        return res.render(
            'user/gp-ahaval/marriage-registration-avahal/marriage-registration-avahal-list.pug',
            {
                gp,
            }
        );
    },

    newMarriageRegistrationAvahal: async (req, res) => {
        let gp = await getGpData(res);
        const isUnder18Marriage = req.query.type === '१८ वर्षाचे आतील मुलीची विवाह नोंदणी';
        return res.render(
            'user/gp-ahaval/marriage-registration-avahal/marriage-registration-avahal-gramsevak.pug',
            {
                gp,
                isUnder18Marriage, // true or false
            }
        );
    },

    //New entry
    newMarriageRegistration: async (req, res) => {
        try {
            let data = req.body;
            let response = await marriageRegistrationModel.newMarriageRegistration(res.pool, data);

            if (response.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: `New entry created successfully`,
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                call: 0,
                data: err,
            });
        }
    },

    //Edit Views

    editViewForMarriageRegistration: async (req, res) => {
        try {
            let gp = await getGpData(res);
            const { id, isUnder18 } = req.query;

            let details = await marriageRegistrationModel.getSingleEntryDetails(
                res.pool,
                id,
                isUnder18 === 'true'
            );
            // render the list page
            return res.render(
                'user/gp-ahaval/marriage-registration-avahal/marriage-registration-avahal-gramsevak.pug',
                {
                    gp,
                    isEdit: true,
                    isUnder18: isUnder18 === 'true',
                    id,
                    data: details[0],
                }
            );
        } catch (err) {
            return res.status(500).json({
                call: 0,
                errror: err,
            });
        }
    },

    updateSingleMarriageRegistrationEntry: async (req, res) => {
        try {
            console.log('update body', req.body);
            // return;
            const data = req.body;
            const { id, isUnder18 } = req.query;

            let response = await marriageRegistrationModel.updateSingleMarriageRegistrationEntry(
                res.pool,
                data,
                id,
                isUnder18 === 'true'
            );

            // console.log(response, '==========');
            // render the list page
            return res.status(200).json({
                call: 1,
                message: 'Information updated successfully',
            });
        } catch (err) {
            console.log('errror in update', err);
            return res.status(500).json({
                call: 0,
                errror: err,
                message: 'Internal server error: ' + err,
            });
        }
    },

    under18MarriageRegistration: async function (req, res) {
        try {
            let data = req.body;
            let response = await marriageRegistrationModel.under18MarriageRegistration(
                res.pool,
                data
            );

            if (response.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: `New entry created successfully`,
                });
            }
        } catch (err) {
            console.log('erro while saveing marriage = ', err);
            sendError(res, err);
        }
    },

    getFilledYears: async function (req, res) {
        try {
            let { type } = req.body;

            let response = await marriageRegistrationModel.getDistinctYears(res.pool, type);

            return res.status(200).json({
                call: 1,
                data: response,
            });
        } catch (err) {
            sendError(res, err);
        }
    },

    getDistinctMonths: async function (req, res) {
        try {
            let { year, type } = req.body.data;
            let response = await marriageRegistrationModel.getDistinctMonths(res.pool, year, type);
            return res.status(200).json({
                call: 1,
                data: response,
            });
        } catch (err) {
            sendError(res, err);
        }
    },

    getAvahalData: async function (req, res) {
        try {
            let { type, year, month } = req.body;
            console.log(type, year, month);
            let response = await marriageRegistrationModel.getAvahalData(
                res.pool,
                type,
                year,
                month
            );
            console.log(response, '--');
            return res.status(200).json({
                call: 1,
                data: response,
            });
        } catch (err) {
            sendError(res, err);
        }
    },

    printMarraigeAvahal: async function (req, res) {
        try {
            let { type, year, month } = req.query;
            let response = await marriageRegistrationModel.getAvahalData(
                res.pool,
                type,
                year,
                month
            );
            let gpData = await getGpData(res);
            // console.log(gpData);
            if (type === 'marriage') {
                return res.render(
                    'user/gp-ahaval/marriage-registration-avahal/print-marriage-avahal.pug',
                    {
                        data: response,
                        gp: gpData,
                        type,
                        year,
                        month,
                    }
                );
            }

            if (type === 'under18Marriage') {
                res.render(
                    'user/gp-ahaval/marriage-registration-avahal/print-under18-marrige-avahal.pug',
                    {
                        data: response,
                        gp: gpData,
                        type,
                        year,
                        month,
                    }
                );
            }
        } catch (err) {
            sendError(res, err);
        }
    },

    deleteEntry: async function (req, res) {
        try {
            let { avahalId, avahalType } = req.body;
            console.log(avahalId, avahalType);
            let response = await marriageRegistrationModel.deleteEntry(
                res.pool,
                avahalId,
                avahalType
            );

            console.log(response);

            if (response.affectedRows === 1) {
                return res.status(200).json({
                    call: 1,
                });
            }
        } catch (err) {
            sendError(res, err);
        }
    },
};

async function getGpData(res) {
    let gpData = await ZPModel.getZpDetails(res.pool);
    return gpData[0];
}

function sendError(res, err) {
    return res.status(500).json({
        call: 0,
        data: err,
    });
}

module.exports = marriageRegistrationController;
