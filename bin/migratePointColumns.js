const sequelize = require("../application/config/db-connect-migration");
const dotenv = require('dotenv');
dotenv.config();

const migratePointColumns = async () => {
  // Tables & POINT columns to fix
  const tablesToUpdate = [
    {
      tableName: "ps_form_eight_user",
      latitudeCol: "home_image_latitude",
      longitudeCol: "home_image_longitude",
      pointCol: "home_image_location"
    },
    {
      tableName: "ps_citizen_complaints",
      latitudeCol: "imageLatitude",
      longitudeCol: "imageLongitude",
      pointCol: "imageLocation"
    },
    {
      tableName: "ps_citizen_complaints",
      latitudeCol: "complaintResolutionImageLatitude",
      longitudeCol: "complaintResolutionImageLongitude",
      pointCol: "complaintResolutionImageLocation"
    }
  ];

  const transaction = await sequelize.transaction();

  try {
    console.log("🚀 Starting safe geometry migration...");

    // Disable safe updates for this transaction
    await sequelize.query("SET SQL_SAFE_UPDATES = 0;", { transaction });

    for (const { tableName, latitudeCol, longitudeCol, pointCol } of tablesToUpdate) {

      // 1️⃣ Log invalid or missing POINTs
      const [invalidRows] = await sequelize.query(`
        SELECT id, ${latitudeCol}, ${longitudeCol}, ${pointCol}
        FROM \`${tableName}\`
        WHERE (${latitudeCol} IS NOT NULL AND ${longitudeCol} IS NOT NULL)
          AND (${pointCol} IS NULL OR NOT ST_IsValid(${pointCol}))
          AND ${latitudeCol} REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
          AND ${longitudeCol} REGEXP '^-?[0-9]+(\\.[0-9]+)?$';
      `, { transaction });

      if (invalidRows.length > 0) {
        console.log(`⚠️ Table ${tableName} has ${invalidRows.length} invalid or missing POINT(s) in column ${pointCol}:`);
        console.table(invalidRows.map(r => ({
          id: r.id,
          lat: r[latitudeCol],
          lon: r[longitudeCol],
          oldPoint: r[pointCol]
        })));
      }

      // 2️⃣ Update/fix POINT columns from latitude & longitude
      const updateQuery = `
        UPDATE \`${tableName}\`
        SET \`${pointCol}\` = ST_GeomFromText(
            CONCAT('POINT(', \`${longitudeCol}\`, ' ', \`${latitudeCol}\`, ')'),
            4326
        )
        WHERE \`${longitudeCol}\` IS NOT NULL
          AND \`${latitudeCol}\` IS NOT NULL
          AND \`${latitudeCol}\` REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
          AND \`${longitudeCol}\` REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
          AND (\`${pointCol}\` IS NULL OR NOT ST_IsValid(\`${pointCol}\`))
          AND id != -1; -- satisfy safe update mode
      `;
      console.log(`🔹 Migrating ${tableName}.${pointCol} from ${latitudeCol}/${longitudeCol}...`);
      await sequelize.query(updateQuery, { transaction });
    }

    await transaction.commit();
    console.log("✅ Safe geometry migration completed successfully!");

    // Re-enable safe updates (optional)
    await sequelize.query("SET SQL_SAFE_UPDATES = 1;");

  } catch (err) {
    console.error("❌ Migration failed, rolling back...", err.message);
    await transaction.rollback();
  }
};

// Run migration if executed directly
if (require.main === module) {
  migratePointColumns()
    .then(() => {
      console.log("Migration finished.");
      process.exit(0);
    })
    .catch(err => {
      console.error("Migration error:", err);
      process.exit(1);
    });
}

module.exports = migratePointColumns;