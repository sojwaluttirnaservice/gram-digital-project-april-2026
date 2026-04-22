const namuna1OtherExpendituresModel = {
    // 1. Save other expenditures (Create)
    saveNamuna1OtherExpenditures: (pool, data) => {
        return new Promise((resolve, reject) => {
            // SQL query to insert data into the table
            const q = `INSERT INTO ps_namuna_1_other_expenditures 
                        (
                            year, 
                            monthly_resolution, 
                            monthly_resolution_date, 
                            backward_class_15_percent_expenditure, 
                            women_and_child_welfare_10_percent_expenditure, 
                            disabled_people_3_percent_expenditure, 
                            district_rural_development_fund_contribution_025_percent, 
                            remarks
                        ) 
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?)`;

            const insertArray = [
                data.year,
                data.monthly_resolution,
                data.monthly_resolution_date,
                data.backward_class_15_percent_expenditure,
                data.women_and_child_welfare_10_percent_expenditure,
                data.disabled_people_3_percent_expenditure,
                data.district_rural_development_fund_contribution_025_percent,
                data.remarks,
            ];

            pool.query(q, insertArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    fetchAllNamuna1OtherExpenditures: (pool) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *,
                 IFNULL(DATE_FORMAT(monthly_resolution_date, '%d-%m-%Y'), '') AS _monthly_resolution_date
                 FROM ps_namuna_1_other_expenditures`;

            pool.query(q, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // 2. Create new other expenditures record
    createNamuna1OtherExpenditures: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO ps_namuna_1_other_expenditures 
                        (
                            year, 
                            monthly_resolution, 
                            monthly_resolution_date, 
                            backward_class_15_percent_expenditure, 
                            women_and_child_welfare_10_percent_expenditure, 
                            disabled_people_3_percent_expenditure, 
                            district_rural_development_fund_contribution_025_percent, 
                            remarks
                        ) 
                        VALUES 
                        (?, ?, ?, ?, ?, ?, ?, ?)`;

            const insertArray = [
                data.year,
                data.monthly_resolution,
                data.monthly_resolution_date,
                data.backward_class_15_percent_expenditure,
                data.women_and_child_welfare_10_percent_expenditure,
                data.disabled_people_3_percent_expenditure,
                data.district_rural_development_fund_contribution_025_percent,
                data.remarks,
            ];

            pool.query(q, insertArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // 3. Update existing other expenditures record by ID
    updateNamuna1OtherExpenditures: (pool, data) => {

        console.log('***************************')

        console.log(data)

        console.log('***************************')

        return new Promise((resolve, reject) => {
            const q = `UPDATE ps_namuna_1_other_expenditures SET 
                        monthly_resolution = ?, 
                        monthly_resolution_date = ?, 
                        backward_class_15_percent_expenditure = ?, 
                        women_and_child_welfare_10_percent_expenditure = ?, 
                        disabled_people_3_percent_expenditure = ?, 
                        district_rural_development_fund_contribution_025_percent = ?, 
                        remarks = ? 
                        WHERE id = ?`;

            const insertArray = [
                data.monthly_resolution,
                data.monthly_resolution_date,
                data.backward_class_15_percent_expenditure,
                data.women_and_child_welfare_10_percent_expenditure,
                data.disabled_people_3_percent_expenditure,
                data.district_rural_development_fund_contribution_025_percent,
                data.remarks,
                data.id,
            ];

            pool.query(q, insertArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // 4. Delete other expenditures record by ID
    deleteNamuna1OtherExpenditures: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM ps_namuna_1_other_expenditures WHERE id = ?`;

            const insertArray = [id];

            pool.query(q, insertArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // 5. Fetch other expenditures record by year
    fetchNamuna1OtherExpendituresByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *,
                IFNULL(DATE_FORMAT(monthly_resolution_date, '%d-%m-%Y'), '') AS _monthly_resolution_date
                 FROM ps_namuna_1_other_expenditures WHERE year = ?`;

            const insertArray = [year];

            pool.query(q, insertArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // 6. Fetch other expenditures record by ID
    fetchNamuna1OtherExpendituresById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *,
            IFNULL(DATE_FORMAT(monthly_resolution_date, '%d-%m-%Y'), '') AS _monthly_resolution_date
             FROM ps_namuna_1_other_expenditures WHERE id = ?`;

            const insertArray = [id];

            pool.query(q, insertArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = namuna1OtherExpendituresModel;
