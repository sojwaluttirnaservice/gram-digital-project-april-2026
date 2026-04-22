const sequelize = require("../application/config/db-connect-migration");
const dotenv = require('dotenv')
dotenv.config()

const DB_NAME = process.env.DB_DATABASE

const cleanDuplicateUniqueIndexes = async () => {


    try {
        const [tables] = await sequelize.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = '${DB_NAME}'
        `);


        for (const { TABLE_NAME: table_name } of tables) {
            const [indexes] = await sequelize.query(`
                    SELECT INDEX_NAME, COLUMN_NAME
                    FROM INFORMATION_SCHEMA.STATISTICS
                    WHERE TABLE_SCHEMA = '${DB_NAME}'
                    AND TABLE_NAME = '${table_name}'
                    AND INDEX_NAME <> 'PRIMARY'
            `);

            // Group by column_name
            const indexMap = {};
            for (const row of indexes) {
                const col = row.COLUMN_NAME;
                if (!indexMap[col]) indexMap[col] = [];
                indexMap[col].push(row.INDEX_NAME);
            }

            // Drop duplicates (keep the first one)
            for (const [col, indexNames] of Object.entries(indexMap)) {
                if (indexNames.length > 1) {
                    for (let i = 1; i < indexNames.length; i++) {
                        const indexName = indexNames[i];
                        const dropQuery = `ALTER TABLE \`${table_name}\` DROP INDEX \`${indexName}\`;`;
                        console.log('🔻 Dropping duplicate index:', dropQuery);
                        try {
                            await sequelize.query(dropQuery);
                        } catch (err) {
                            console.error(`⚠️ Error dropping ${indexName} on ${table_name}:`, err.message);
                        }
                    }
                }
            }
        }

        console.log('✅ Cleanup of duplicate unique indexes completed.');
        // await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err);
    }
};


module.exports = cleanDuplicateUniqueIndexes