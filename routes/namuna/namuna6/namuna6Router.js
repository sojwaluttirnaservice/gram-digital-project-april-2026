const namuna6Controller = require("../../../application/controllers/namuna/namuna6/namuna6Controller");
const getRouter = require("../../../application/utils/getRouter");

const namuna6Router = getRouter();
// 


namuna6Router.get(
    '/print', 
    namuna6Controller.renderNamuna6Print
);


module.exports = namuna6Router