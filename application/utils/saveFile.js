const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const saveFile = async (file, savePath) => {
    try {

        // Remove filename — get only the directory
        const dir = path.dirname(savePath);

        // Make sure that directory exists (recursively)
        await fs.promises.mkdir(dir, { recursive: true });
        const mvAsync = promisify(file.mv);

        // Save the file to the given path
        await mvAsync.call(file, savePath); // ensure correct context

        return true;
    } catch (error) {
        console.error('Error saving file:', error);
        return false;
    }
};



const deleteFile = async (savePath) => {
    try {
        if (fs.existsSync(savePath))
            await fs.unlinkSync(savePath); // delete the file
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
};
module.exports = { saveFile, deleteFile };
