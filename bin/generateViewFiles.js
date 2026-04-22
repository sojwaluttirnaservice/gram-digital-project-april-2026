const jobCardController = require("../application/controllers/gpApplications/jobCardController");
const autoCreatePugFilesFromController = require("../application/utils/autoCreatePugFilesFromController");
const path = require("path");

autoCreatePugFilesFromController(jobCardController, path.join(__dirname, "application/views"));