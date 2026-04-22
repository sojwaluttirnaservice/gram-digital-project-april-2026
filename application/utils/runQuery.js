const runQuery = (pool, query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};

module.exports = { runQuery };
