const HomeModel = require('../model/HomeModel');

const sendError = (res, statusCode, call, message, error) => {
    console.error(message);
    return res.status(statusCode).json({
        call: call,
        message: message,
        error: error,
    });
};

const renderPage = async (res, renderUrl, renderObject) => {
    try {
        const [gp] = await HomeModel.getGpData(res.pool);

        return res.render(renderUrl, {
            gp,
            zp: gp,
            title: "Page",
            dastaveg: JSON.parse(gp.gp_dastavegList),
            ...renderObject,
            place: renderObject?.place || gp.gp_name
        });
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

module.exports = { sendError, renderPage };
