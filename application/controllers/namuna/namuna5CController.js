const HomeModel = require('../../model/HomeModel');

const namuna5CController = {
    renderNamuna5CPrint: async (req, res) => {
        try {
            const { month, year } = req.query;
            const _gp = await HomeModel.getGpData(res.pool);
            const _namuna5CDetails = [];

            res.render('user/namuna/namuna5C/namuna-5C-print.pug', {
                gp: _gp[0],
                namuna5CDetails: _namuna5CDetails,
                month,
                year,
            });
        } catch (err) {
            console.error(`Error while rendering the namuna 5C page: ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while rendering the namuna 5C page: ${err.message}`,
                error: err,
            });
        }
    },
};

module.exports = namuna5CController;
