const { runQuery } = require("../../utils/runQuery")

const gpModel = {

    updateGpImage: (pool, imageName) => {
        return runQuery(pool, `UPDATE  ps_gram_panchayet SET gp_image_name = ? WHERE id = 1`, [imageName])
    }

}

module.exports = gpModel