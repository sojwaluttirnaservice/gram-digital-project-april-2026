const namuna7Controller = require("../../application/controllers/namuna/namuna7Controller");
const rokadController = require("../../application/controllers/rokadController");
const getRouter = require("../../application/utils/getRouter");

const namuna7Router = getRouter();




// list page
namuna7Router.get('/list', namuna7Controller.renderNamuna7ListPage)


// form page 
namuna7Router.get('/form', namuna7Controller.renderNamuna7FormPage)


// taken from file rokadVahi.js file with this route and this ocntorller, jsut commented there
namuna7Router.get('/dakhle-pay-list', rokadController.getDakhlaPaylistView)

// save
namuna7Router.post('/', namuna7Controller.save)
// edit
namuna7Router.put('/', namuna7Controller.update)

// delete
namuna7Router.delete('/', namuna7Controller.delete)

namuna7Router.get(
    '/reasons',
    namuna7Controller.renderNamuna7ReasonsPage
)

namuna7Router.post(
    '/reasons',
    namuna7Controller.saveNamuna7Reason
)


module.exports = namuna7Router