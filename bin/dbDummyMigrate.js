/**
 * @file handleCreateDummyData.js
 * @description
 * - Checks if the configured MySQL database exists
 * - If NOT exists:
 *    → Creates database with utf8mb4
 *    → Populates dummy data
 * - If exists:
 *    → Aborts safely
 */

require("dotenv").config({ path: "./bin/.env" });
const readline = require("readline");

const isForcedMigration = process.argv.includes("--force");

console.log("value of argemetn force", isForcedMigration);

const createDummyData = require("./createDummyData");
const sequelize = require("../application/config/db-connect-migration");

/**
 * Checks if the database specified in environment variables exists.
 * @async
 * @returns {Promise<boolean>} True if database exists, false otherwise.
 */
const doesDatabaseExist = async () => {
  let tempSequelize;

  try {
    tempSequelize = new sequelize.constructor(
      "", // connect WITHOUT database
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
      },
    );

    const [results] = await tempSequelize.query(
      "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
      {
        replacements: [process.env.DB_DATABASE],
      },
    );

    return results.length > 0;
  } catch (err) {
    console.error(
      "\x1b[41m\x1b[37m%s\x1b[0m",
      "❌ ERROR CHECKING DATABASE EXISTENCE:",
      err,
    );
    return false;
  } finally {
    if (tempSequelize) {
      await tempSequelize.close();
    }
  }
};

async function confirmForceDrop(databaseName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

  console.log(
    "\x1b[1m\x1b[41m\x1b[37m%s\x1b[0m",
    `⚠️ ⚠️ ⚠️ ⚠️ ⚠️ CAUTION::FORCE MODE ENABLED! You are about to DELETE database "${process.env.DB_DATABASE}" permanently!`,
  );
  console.log("To confirm, follow the steps exactly:");

  const answer1 = await question("1️⃣ Type YES: ");
  if (answer1 !== "YES") {
    console.log("❌ Confirmation failed. Aborting!");
    rl.close();
    process.exit(0);
  }

  const answer2 = await question("2️⃣ Type YES again: ");
  if (answer2 !== "YES") {
    console.log("❌ Confirmation failed. Aborting!");
    rl.close();
    process.exit(0);
  }

  const answer3 = await question(
    `3️⃣ Type the database name "${databaseName}": `,
  );
  if (answer3 !== databaseName) {
    console.log("❌ Database name incorrect. Aborting!");
    rl.close();
    process.exit(0);
  }

  rl.close();
  console.log("\x1b[32m%s\x1b[0m", "✅ Confirmation passed. Proceeding...");
}

/**
 * Creates database with utf8mb4 charset
 * @async
 */
const createDatabase = async () => {
  let tempSequelize;

  try {
    tempSequelize = new sequelize.constructor(
      "",
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
      },
    );

    await tempSequelize.query(`
      CREATE DATABASE \`${process.env.DB_DATABASE}\`
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci
    `);

    console.log(
      "\x1b[32m%s\x1b[0m",
      `✅ DATABASE "${process.env.DB_DATABASE}" CREATED WITH utf8mb4`,
    );
  } finally {
    if (tempSequelize) {
      await tempSequelize.close();
    }
  }
};

/**
 * Handles creation of database (if missing) and populates it with dummy data.
 *
 * ### Behavior:
 * - Checks if the database exists
 * - If NOT:
 *    → Creates the database
 *    → Proceeds to populate dummy data
 * - If EXISTS:
 *    → Without `--force` → aborts safely
 *    → With `--force` → asks for confirmation, then proceeds
 *
 * ### Safety:
 * - Prevents accidental overwrite of existing database
 * - Requires explicit `--force` flag + manual confirmation for destructive actions
 *
 * @async
 * @function handleCreateDummyData
 * @returns {Promise<void>}
 *
 * @example
 * node handleCreateDummyData.js
 * node handleCreateDummyData.js --force
 */
const handleCreateDummyData = async () => {
  try {
    // 🔍 Step 1: Check if database already exists
    const exists = await doesDatabaseExist();

    // Track whether DB existed before script execution
    let dbAlreadyExisted = exists;

    if (!exists) {
      // 🆕 Step 2A: Database does NOT exist → create it
      console.log(
        "\x1b[34m%s\x1b[0m",
        `📦 DATABASE "${process.env.DB_DATABASE}" DOES NOT EXIST. CREATING...`,
      );

      await createDatabase();
      dbAlreadyExisted = false;
    } else {
      // ⚠️ Step 2B: Database EXISTS

      if (!isForcedMigration) {
        // 🚫 No --force flag → abort to prevent accidental overwrite
        console.log(
          "\x1b[33m%s\x1b[0m",
          `⚠️ DATABASE "${process.env.DB_DATABASE}" ALREADY EXISTS. ABORTING. Use --force to override.`,
        );
        return;
      }

      // 🔥 Force flag is present → ask user for confirmation
      // This prevents accidental deletion in production environments
      await confirmForceDrop(process.env.DB_DATABASE);

      console.log(
        "\x1b[31m%s\x1b[0m",
        `🔥 FORCE MODE: Proceeding with existing database "${process.env.DB_DATABASE}"`,
      );
    }

    /**
     * 🔌 Step 3: Connect to the database using Sequelize
     * At this point:
     * - DB is guaranteed to exist
     * - Either newly created OR force-approved existing DB
     */
    await sequelize.authenticate();

    /**
     * 🧪 Step 4: Populate dummy data
     * This will insert seed/test data into the database
     */
    console.log("\x1b[34m%s\x1b[0m", "🧪 CREATING DUMMY DATA...");
    await createDummyData();

    // ✅ Final success log
    console.log("\x1b[32m%s\x1b[0m", "✅ DUMMY DATA CREATED SUCCESSFULLY.");
  } catch (err) {
    // ❌ Global error handler
    console.error(
      "\x1b[41m\x1b[37m%s\x1b[0m",
      "❌ ERROR DURING DUMMY DATA CREATION:",
      err,
    );

    process.exit(1);
  }
};

/**
 * Execute directly
 */
handleCreateDummyData();
