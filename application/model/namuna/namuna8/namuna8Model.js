const db = require("../../../config/db.connect.promisify")

const namuna8Model = {

    getForm8Users: () => {
        let q = `SELECT * FROM ps_form_eight_user`
        return db.query(q)
    }
    
}


module.exports = namuna8Model