const namuna4Controller = require("../../../application/controllers/namuna/remaining/namuna4Controller");
const getRouter = require("../../../application/utils/getRouter");

const namuna4Router = getRouter();


// show list
namuna4Router.get('/list', namuna4Controller.renderListPage)

// create page
namuna4Router.get('/create', namuna4Controller.renderCreatePage)

// edit page
namuna4Router.get('/edit/:id', namuna4Controller.renderEditPage)

// print page
namuna4Router.get('/print', namuna4Controller.renderPrintPage)



// save
namuna4Router.post('/', namuna4Controller.save)

// update
namuna4Router.put('/', namuna4Controller.update)

// delete
namuna4Router.delete('/', namuna4Controller.delete)

module.exports = namuna4Router;
