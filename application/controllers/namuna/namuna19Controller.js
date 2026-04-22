const HomeModel = require('../../model/HomeModel');
const namuna19PaymentModel = require('../../model/namuna/namuna19PaymentModel');

const namuna19Controller = {
    renderNamuna19Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
          
            const _paymentRecord = await namuna19PaymentModel.fetchNamuna19PaymentHistory(res.pool)

            res.render('user/namuna/namuna19/namuna-19-page.pug', {
                gp: _gp[0],
                paymentRecord: _paymentRecord,
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 19 page: ${err.message}`);
        }
    },

};

module.exports = namuna19Controller;
