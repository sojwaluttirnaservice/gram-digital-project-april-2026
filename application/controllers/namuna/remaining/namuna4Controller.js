const asyncHandler = require("../../../utils/asyncHandler")
const { renderPage } = require("../../../utils/sendResponse")

const namuna4Controller = {
    renderListPage: asyncHandler(async (req, res) => {
        
    }),

    renderCreatePage: asyncHandler(async (req, res) => {
        
    }),

    renderEditPage: asyncHandler(async (req, res) => {
        
    }),

    renderPrintPage: asyncHandler(async (req, res) => {
       renderPage(res, 'user/namuna/remaining/namuna4/namuna-4-print-page.pug', {

       }) 
    }),

    save: asyncHandler(async (req, res) => {
        
    }),

    update: asyncHandler(async (req, res) => {
        
    }),

    delete: asyncHandler(async (req, res) => {
        
    }),
}


module.exports = namuna4Controller