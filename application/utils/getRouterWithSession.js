const { Router } = require('express');
const middleware = require('../../routes/middleware');


const getRouterWithSession = () => {
    let router = Router();
    router.use(middleware.checkForPoolConnectionWithSession)
    return router;
}

module.exports = getRouterWithSession