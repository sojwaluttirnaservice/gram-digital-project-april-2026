const sequelize = require('../../config/db-connect-migration');
const ps_namuna_15 = require('../../Migration Scripts/namuna/ps_namuna_15');
const { runQuery } = require('../../utils/runQuery');

const namuna15Model = {
    // Insert multiple entries into the database (bulk insert)
    insertBulk: async (data) => {
        const transaction = await sequelize.transaction(); // Start transaction
        try {
            // Perform the bulk insert
            await ps_namuna_15.bulkCreate(data, { transaction });
            // Commit the transaction
            await transaction.commit();
            console.log('Bulk entries successfully inserted!');
            return { call: 1, message: 'Bulk entries successfully inserted!' };
        } catch (error) {
            // Rollback transaction in case of an error
            await transaction.rollback();
            console.error('Error inserting bulk entries:', error);
            throw error;
        }
    },

    // Update single entry
    updateNamuna15SingleEntry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ps_namuna_15 
                SET 
                    date = ?, 
                    initial_quantity = ?, 
                    received_item_name = ?, 
                    item_quantity = ?, 
                    total = ?, 
                    purpose_or_receiver = ?, 
                    issued_item_quantity = ?,
                    remaining_quantity = ?,
                    issuing_officer_name = ?, 
                    receiving_officer_name = ?, 
                    remarks = ?
                WHERE id = ?
            `;

            const values = [
                data.date,
                data.initial_quantity, // Match this with initial_quantity
                data.received_item_name,
                data.item_quantity, // Match this with item_quantity
                data.total,
                data.purpose_or_receiver,
                data.issued_item_quantity, // Use issued_item_quantity
                data.remaining_quantity, // Use remaining_quantity
                data.issuing_officer_name,
                data.receiving_officer_name,
                data.remarks,
                data.id,
            ];

            pool.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },

    // Update multiple entries in the database (bulk update)
    updateBulk: async (data) => {
        const transaction = await sequelize.transaction();
        try {
            for (const item of data) {
                await ps_namuna_15.update(
                    {
                        date: item.date,
                        initial_balance: item.initial_balance,
                        received_item_name: item.received_item_name,
                        item_quantity: item.item_quantity,
                        total: item.total,
                        purpose_or_receiver: item.purpose_or_receiver,
                        given_quantity: item.given_quantity,
                        balance: item.balance,
                        giver_officer_name: item.giver_officer_name,
                        receiver_officer_name: item.receiver_officer_name,
                        remarks: item.remarks,
                    },
                    { where: { id: item.id }, transaction }
                );
            }
            await transaction.commit();
            console.log('Bulk entries successfully updated!');
            return { call: 1, message: 'Bulk entries successfully updated!' };
        } catch (error) {
            await transaction.rollback();
            console.error('Error updating bulk entries:', error);
            throw error;
        }
    },

    // Delete single entry
    deleteNamuna15SingleEntry: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ps_namuna_15 WHERE id = ?`;
            pool.query(query, [Number(data.id)], (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    },

    // Insert single entry into the database
    insertSingleEntry: async (data) => {
        const transaction = await sequelize.transaction();
        try {
            const result = await ps_namuna_15.create(data, { transaction });
            await transaction.commit();
            console.log('Single entry successfully inserted!');
            return result;
        } catch (error) {
            await transaction.rollback();
            console.error('Error inserting single entry:', error);
            throw error;
        }
    },

    // Fetch all entries from the database
    fetchByYearRange: async (pool, data) => {
        const query = `
            SELECT 
                *, 
                DATE_FORMAT(date, '%d-%m-%Y') AS _date 
            FROM 
                ps_namuna_15    
                
            WHERE from_year = ?
            AND to_year =?;
        `;
        return runQuery(pool, query, [data.fromYear, data.toYear]);
    },

    // Fetch all entries from the database
    fetchAll: async (pool) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    *, 
                    DATE_FORMAT(date, '%d-%m-%Y') AS _date 
                FROM 
                    ps_namuna_15;
            `;
            pool.query(query, [], (err, result) => {
                if (err) {
                    console.error('Error fetching all entries:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    },

    // Fetch single entry by ID
    fetchById: async (id) => {
        try {
            const result = await ps_namuna_15.findByPk(id);
            return result;
        } catch (error) {
            console.error('Error fetching entry by ID:', error);
            throw error;
        }
    },
};

module.exports = namuna15Model;
