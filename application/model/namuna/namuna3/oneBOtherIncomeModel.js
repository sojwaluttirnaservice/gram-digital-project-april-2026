const oneBOtherIncomeModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_one_b_other_income (
                year,
                market_fee,
                tanga_stand_fee,
                car_stand_fee,
                water_tax,
                cleanliness_fee,
                cow_grazing_fee,
                dvdf_interest_2_5_percent,
                land_rent,
                interest_deposit,
                land_rent_deposit,
                kondwada_deposit,
                donation,
                other_deposits,
                total_other_income,
                total_income_1_2
            ) VALUES (
                ?
            )
            `;

            const insertArray = [
                createData.year,
                createData.market_fee,
                createData.tanga_stand_fee,
                createData.car_stand_fee,
                createData.water_tax,
                createData.cleanliness_fee,
                createData.cow_grazing_fee,
                createData.dvdf_interest_2_5_percent,
                createData.land_rent,
                createData.interest_deposit,
                createData.land_rent_deposit,
                createData.kondwada_deposit,
                createData.donation,
                createData.other_deposits,
                createData.total_other_income,
                createData.total_income_1_2,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_one_b_other_income
            SET
                market_fee = ?,
                tanga_stand_fee = ?,
                car_stand_fee = ?,
                water_tax = ?,
                cleanliness_fee = ?,
                cow_grazing_fee = ?,
                dvdf_interest_2_5_percent = ?,
                land_rent = ?,
                interest_deposit = ?,
                land_rent_deposit = ?,
                kondwada_deposit = ?,
                donation = ?,
                other_deposits = ?,
                total_other_income = ?,
                total_income_1_2 = ?
            WHERE year = ?;
            `;

            const updateArray = [
                updateData.market_fee,
                updateData.tanga_stand_fee,
                updateData.car_stand_fee,
                updateData.water_tax,
                updateData.cleanliness_fee,
                updateData.cow_grazing_fee,
                updateData.dvdf_interest_2_5_percent,
                updateData.land_rent,
                updateData.interest_deposit,
                updateData.land_rent_deposit,
                updateData.kondwada_deposit,
                updateData.donation,
                updateData.other_deposits,
                updateData.total_other_income,
                updateData.total_income_1_2,
                updateData.year,
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                *,
                IFNULL(DATE_FORMAT(createdAt, '%d-%m-%Y'), '') AS _createdAt,
                IFNULL(DATE_FORMAT(updatedAt, '%d-%m-%Y'), '') AS _updatedAt
            FROM ps_n_3_one_b_other_income
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = oneBOtherIncomeModel;
