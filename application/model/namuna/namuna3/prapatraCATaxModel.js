const prapatraCATaxModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_patrak_c_a_tax (
                year,
                property_tax_land_buildings,
                street_light_tax,
                cleanliness_tax,
                shop_industry_hotel_tax,

                travel_tax,
                fair_festival_tax,
                cycle_vehicle_tax,
                toll_tax,
                goods_tax,

                forest_development_tax,
                service_tax,
                trade_or_occupation_tax,
                cattle_market_commission_tax,
                other_taxes,

                total_tax_1_to_14
            ) VALUES (?);
            `;

            const insertArray = [
                createData.year,
                createData.property_tax_land_buildings,
                createData.street_light_tax,
                createData.cleanliness_tax,
                createData.shop_industry_hotel_tax,

                createData.travel_tax,
                createData.fair_festival_tax,
                createData.cycle_vehicle_tax,
                createData.toll_tax,
                createData.goods_tax,

                createData.forest_development_tax,
                createData.service_tax,
                createData.trade_or_occupation_tax,
                createData.cattle_market_commission_tax,
                createData.other_taxes,

                createData.total_tax_1_to_14,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
            UPDATE ps_n_3_patrak_c_a_tax
            SET
                property_tax_land_buildings = ?,
                street_light_tax = ?,
                cleanliness_tax = ?,
                shop_industry_hotel_tax = ?,
                travel_tax = ?,
                fair_festival_tax = ?,
                
                cycle_vehicle_tax = ?,
                toll_tax = ?,
                goods_tax = ?,
                forest_development_tax = ?,
                service_tax = ?,

                trade_or_occupation_tax = ?,
                cattle_market_commission_tax = ?,
                other_taxes = ?,
                total_tax_1_to_14 = ?,
                year = ?

            WHERE id = ?;
            `;

            const updateArray = [
                updateData.property_tax_land_buildings,
                updateData.street_light_tax,
                updateData.cleanliness_tax,
                updateData.shop_industry_hotel_tax,
                updateData.travel_tax,

                updateData.fair_festival_tax,
                updateData.cycle_vehicle_tax,
                updateData.toll_tax,
                updateData.goods_tax,
                updateData.forest_development_tax,

                updateData.service_tax,
                updateData.trade_or_occupation_tax,
                updateData.cattle_market_commission_tax,
                updateData.other_taxes,
                updateData.total_tax_1_to_14,

                updateData.year,
                updateData.id,
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
                * 
            FROM ps_n_3_patrak_c_a_tax
            WHERE year = ?;
            `;

            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getById: (pool, id) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT 
                * 
            FROM ps_n_3_patrak_c_a_tax
            WHERE id = ?;
            `;

            pool.query(q, [id], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = prapatraCATaxModel;
