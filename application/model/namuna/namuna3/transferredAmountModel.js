const transferredAmountModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_transferred_amount (
                year,
                stamp_duty_fee,
                tax_amount,
                land_revenue,
                land_uniform_tax,
                minor_minerals_amount,
                road_lighting_subsidy,
                water_supply_subsidy,
                backward_tribal_area_support,
                travel_subsidy,
                tax_loss_compensation_grant,
                other_grants,
                total_k_amount,
                total_abk_amount
            ) VALUES (
                ?
            )
            `;

            const insertArray = [
                createData.year,
                createData.stamp_duty_fee,
                createData.tax_amount,
                createData.land_revenue,
                createData.land_uniform_tax,
                createData.minor_minerals_amount,
                createData.road_lighting_subsidy,
                createData.water_supply_subsidy,
                createData.backward_tribal_area_support,
                createData.travel_subsidy,
                createData.tax_loss_compensation_grant,
                createData.other_grants,
                createData.total_k_amount,
                createData.total_abk_amount,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_transferred_amount
            SET
                stamp_duty_fee = ?,
                tax_amount = ?,
                land_revenue = ?,
                land_uniform_tax = ?,
                minor_minerals_amount = ?,
                road_lighting_subsidy = ?,
                water_supply_subsidy = ?,
                backward_tribal_area_support = ?,
                travel_subsidy = ?,
                tax_loss_compensation_grant = ?,
                other_grants = ?,
                total_k_amount = ?,
                total_abk_amount = ?
            WHERE year = ?;
            `;

            const updateArray = [
                updateData.stamp_duty_fee,
                updateData.tax_amount,
                updateData.land_revenue,
                updateData.land_uniform_tax,
                updateData.minor_minerals_amount,
                updateData.road_lighting_subsidy,
                updateData.water_supply_subsidy,
                updateData.backward_tribal_area_support,
                updateData.travel_subsidy,
                updateData.tax_loss_compensation_grant,
                updateData.other_grants,
                updateData.total_k_amount,
                updateData.total_abk_amount,
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
            FROM ps_n_3_transferred_amount
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = transferredAmountModel;
