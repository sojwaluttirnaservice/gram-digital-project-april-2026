const annualCollectionReportModel = {
    // Create a new record using raw SQL query
    create: (pool, createData) => {
        console.log(createData);
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_annual_collection_report (
                year,
                data_list
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                JSON.stringify(createData.data_list), // Ensure the data_list is stored as a JSON string
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Update an existing record using raw SQL query
    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_annual_collection_report
            SET
                year = ?,
                data_list = ?
            WHERE id = ?;
            `;

            const updateArray = [
                updateData.year,
                JSON.stringify(updateData.data_list), // Ensure the data_list is updated as a JSON string
                updateData.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // Get records by year using raw SQL query
    getByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                * 
            FROM ps_n_3_annual_collection_report
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = annualCollectionReportModel;
