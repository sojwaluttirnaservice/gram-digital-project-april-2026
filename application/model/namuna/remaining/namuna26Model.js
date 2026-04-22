const asyncHandler = require("../../../utils/asyncHandler")
const { runQuery } = require("../../../utils/runQuery")

const namuna26Model = {

    getNamuna26khData: (pool, filters) =>{


        let q = ``
        let params = [];

        return runQuery(pool, q, params)
    }
}

module.exports = namuna26Model