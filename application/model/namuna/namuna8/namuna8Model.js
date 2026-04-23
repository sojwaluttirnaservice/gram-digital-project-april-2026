const { runQuery } = require("../../../utils/runQuery")

const namuna8Model = {

    getForm8Users: (pool) => {
        let q = `SELECT * FROM ps_form_eight_user`
        return runQuery(pool, q)
    }
    
}


module.exports = namuna8Model