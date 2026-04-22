const { Router } = require('express');
const middleware = require('../../routes/middleware');


const getRouter = () => {
    let router = Router();
    router.use(middleware.checkForPoolConnection)
    return router;
}

module.exports = getRouter