const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const {
    PutObjectCommand,
    S3Client,
    S3ServiceException
}  = require("@aws-sdk/client-s3");
require("dotenv").config({ path: "./bin/.env" });

const cleanFilePath = (inputPath) => {
  if (!inputPath || typeof inputPath !== "string") return "";

  // Normalize slashes (handles ./, ../, duplicate slashes)
  let normalized = path.normalize(inputPath);

  // Convert Windows backslashes → forward slashes
  normalized = normalized.replace(/\\/g, "/");

  // Remove leading "./"
  normalized = normalized.replace(/^\.\/+/, "");

  // Remove leading "/"
  normalized = normalized.replace(/^\/+/, "");

  // Remove "public/" at the start (only if it's the first folder)
  normalized = normalized.replace(/^public\//, "");

  return normalized;
};

const saveFile = async (file, savePath) => {

    const cleanPath = cleanFilePath(savePath);
    try {

        let dynamicFolder = file?.dynamicFolder; 
        const client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_SECRET_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${dynamicFolder}/${cleanPath}`,
            Body: file.data,
            ContentType: file.mimetype,
        })

        const response = await client.send(command);

        return {
            success: true,
            key: cleanPath,
            response,
        };
        // Remove filename — get only the directory
        // const dir = path.dirname(savePath);

        // Make sure that directory exists (recursively)
        // await fs.promises.mkdir(dir, { recursive: true });
        // const mvAsync = promisify(file.mv);

        // // Save the file to the given path
        // await mvAsync.call(file, savePath); // ensure correct context

        return true;
    } catch (caught) {
        // console.error('Error saving file:', error);
        // return false;

        if (caught instanceof S3ServiceException) {
      console.error("S3 error:", caught.name, caught.message);
    } else {
      console.error("Unknown error:", caught);
    }

    return {
      success: false,
      error: caught.message,
    };
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
