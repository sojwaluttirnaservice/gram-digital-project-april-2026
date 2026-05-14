const { getPoolConnection } = require("../application/config/manageDbConnection");
const asyncHandler = require("../application/utils/asyncHandler");
// const fs = require('fs').promises;
require("dotenv").config({ path: "./bin/.env" });

var sendData = {
    _call: 0,
    _error: [],
};

const middleware = {


    // New code
    checkForPoolConnection: async (req, res, next) => {
        try {
            res.User=req.session?.User;
            
            // req.session.dbDetails = {dbName: "g-seva_dev1"}

            const continueUrl = encodeURIComponent(
                req.originalUrl || req.headers.referer || "/",
            );
            if (!req.session.dbDetails?.dbName) {
                req.continue = continueUrl;
                return res.redirect(`/login?continue=${continueUrl}`);
            }

            const dbName = req.session?.dbDetails?.dbName;
            if (!dbName) {
                return res.status(400).json({
                    success: false,
                    message: "DB not selected in session",
                });
            }

            const __pool = getPoolConnection(dbName);

            if (!__pool) {
                return res.status(500).json({
                    _call: 3000,
                    _error: "_ connection error",
                });
            }

            res.pool = __pool;
            next()
        } catch (err) {
            console.log("In error block")
            console.log(err)
            console.log("In error block")
            return res.status(500).json({
                _call: 3000,
                _error: "_ connection error",
            });
        }
    },

    checkForPoolConnectionWithSession: async (req, res, next) => {
        res.User=req.session?.User;
       
        req.withoutLogin = true;
        console.log(req.origin);
        if (
           ( process.env.PROJECT_ENV != "DEV" &&
            typeof req.session.User == "undefined")
            || !req.session?.dbDetails?.dbName
        ) {
            const continueUrl = encodeURIComponent(
                req.originalUrl || req.headers.referer || "/",
            );
            req.continue = continueUrl;
            return res.redirect(`/login?continue=${continueUrl}`);
        }


        const dbName = req.session?.dbDetails?.dbName;
        // if (!dbName) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "DB not selected in session",
        //     });
        // }

        const __pool = getPoolConnection(dbName);

        if (!__pool) {
            return res.status(500).json({
                _call: 3000,
                _error: "_ connection error",
            });
        }

        res.pool = __pool;
        next();
    },

    isUserLoggedIn: asyncHandler(async (req, res, next) => {
        res.User=req.session?.User;
        if (
            process.env.PROJECT_ENV !== "DEV" &&
            (!req.session || !req.session.User)
        ) {
            return res.redirect("/login");
        }
        next();
    }),

    /**
     * @file filesToCleanupMiddleware.js
     * @description
     * Middleware to attach a per-request cleanup mechanism for temporary files.
     *
     * Each request gets a `req.filesToCleanup` array. You can push file paths to this array
     * whenever you save a temporary file (e.g., uploaded image, PDF, etc.).
     * If your async handler fails (throws an error), the asyncHandler will
     * automatically attempt to delete all files in `req.filesToCleanup`.
     *
     * This is designed to **prevent orphaned files** from filling storage in case of errors.
     *
     * Usage:
     * ```js
     * const express = require('express');
     * const router = express.Router();
     * const filesToCleanupMiddleware = require('../middleware/filesToCleanupMiddleware');
     * const asyncHandler = require('../middleware/asyncHandler');
     * const controller = require('../controllers/myController');
     *
     * router.post(
     *   '/upload',
     *   filesToCleanupMiddleware, // attach per-request cleanup array
     *   asyncHandler(controller.uploadFile)
     * );
     * ```
     *
     * @warning
     * - This middleware only **attaches an array**. You must push file paths manually.
     * - Works **per request**. Files from one request will **never affect another request**.
     * - Ensure you push **absolute paths** for correct removal.
     * - If you push a non-existent path, deletion will fail silently and log an error.
     * - If multiple async handlers use this, they must respect the array on `req`.
     *
     * @example
     * ```js
     * // In controller
     * req.filesToCleanup.push(savedFilePath);
     * ```
     *
     * @returns {function} Express middleware
     */
    filesToCleanupMiddleware: (req, res, next) => {
        // Initialize the cleanup array if not present
        if (!Array.isArray(req.filesToCleanup)) {
            req.filesToCleanup = [];
        }
        // Pass control to the next middleware
        next();
    },
};

module.exports = middleware;