const dbService = require("../../services/db.service");
const { sendApiResponse } = require("../../utils/apiResponses");
const AppError = require("../../utils/AppError");
const asyncHandler = require("../../utils/asyncHandler");
const { cloneDatabase } = require("../../utils/cloneDatabase");
const { renderPage } = require("../../utils/sendResponse");

const dbController = {
    

    renderDbListPage:asyncHandler(async (req, res) => {

        let User = req.session?.User
        const {success, data} =  await dbService.getDbDetailsByGpCode(User.gp_code)

        console.log(data)
        renderPage(res, 'user/db/db-list-page.pug', {
            primaryDb: req.session?.dbDetails?.dbName,
            website: data?.website || {},
            dbList : data?.dbList || []
        })
    }),
    
    dbClone: asyncHandler(async (req, res) => {
        let originaDbName = req.body.original;
        let { fromYear, toYear } = req.body;

        if (!fromYear || !toYear) {
            throw new AppError("Provide years", 400);
        }

        let dbData = req.body;
        let {success: _success, message: _checkMsg} = await dbService.checkExistence(dbData)

        if(!_success){
            throw new AppError(_checkMsg, 400)
        }
        

        let newDbName = `${originaDbName}_${fromYear}_${toYear}`;

        const result = await cloneDatabase(originaDbName, newDbName);

        // detect success from bash output
        const isSuccess = result && result.toString().includes("Clone completed successfully");

        const message = isSuccess
            ? `Database cloned successfully: ${originaDbName} → ${newDbName}`
            : "Database clone failed";

        console.log(message);

        if(!isSuccess) {
            throw new AppError(message, 400)
        }

        let  {success, message: _msg}= await dbService.addDatabase({
            ...dbData,
            backup_status: "COMPLETED",
            db_name: newDbName
        })

        if(!success){
            throw new AppError(_msg, 400)
        }

        return sendApiResponse(res, 200, success, `${message}. ${_msg}`, {
            source: originaDbName,
            target: newDbName
        });
    }),
}

module.exports = dbController