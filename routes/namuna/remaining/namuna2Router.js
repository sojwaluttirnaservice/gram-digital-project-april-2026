const namuna2Controller = require("../../../application/controllers/namuna/remaining/namuna2Controller");
const getRouter = require("../../../application/utils/getRouter");

const namuna2Router = getRouter()

// show list
namuna2Router.get('/list', namuna2Controller.renderListPage)

// create page
namuna2Router.get('/create', namuna2Controller.renderCreatePage)

// edit page
namuna2Router.get('/edit/:id', namuna2Controller.renderEditPage)

// print page
namuna2Router.get('/print', namuna2Controller.renderPrintPage)



// save
namuna2Router.post('/', namuna2Controller.save)

// update
namuna2Router.put('/', namuna2Controller.update)

// delete
namuna2Router.delete('/', namuna2Controller.delete)

module.exports = namuna2Router