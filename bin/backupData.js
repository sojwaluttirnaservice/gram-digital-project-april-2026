const { exec } = require('child_process');
const fs = require('fs-extra');
const dayjs = require('dayjs');
require('dotenv').config();

const backupDatabase = async () => {
    const timestamp = dayjs().format('DD-MM-YYYY-HH-mm-ss');
    const fileName = `all-databases-backup-${timestamp}.sql`;
    const backupPath = `${process.env.DB_SAVE_PATH}${fileName}`;

    // Ensure local backup folder exists
    await fs.ensureDir(process.env.DB_SAVE_PATH);

    // Construct the mysqldump command
    const dumpCommand = `mysqldump -h ${process.env.DB_HOST} -P ${process.env.DB_PORT || 3306} -u ${process.env.DB_USER} -p${process.env.DB_PASSWORD} --all-databases > "${backupPath}"`;

    console.log(`⏳ Running: ${dumpCommand}`);

    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Backup failed: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`⚠️ stderr: ${stderr}`);
        }
        console.log(`✅ Backup successful: ${backupPath}`);
    });
};

backupDatabase();
