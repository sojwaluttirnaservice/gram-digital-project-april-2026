const fs = require('fs').promises;

/**
 * asyncHandler
 * -----------------------
 * Wraps an async Express route handler to automatically:
 * 1. Catch any errors and return a standardized JSON response.
 * 2. Clean up temporary uploaded files stored in `req.filesToCleanup`.
 *
 * Usage:
 *   const asyncHandler = require('./middleware/asyncHandler');
 *   router.post('/upload', asyncHandler(controller.uploadFile));
 *
 * Middleware behavior:
 * - Attach an array `req.filesToCleanup = []` in your route handler.
 * - Whenever a file is saved temporarily, push its absolute path to this array:
 *     req.filesToCleanup.push(filePath);
 * - If an error occurs in the handler:
 *     - All files in `req.filesToCleanup` will be attempted to delete.
 *     - Errors during file removal are logged but do not prevent response.
 *
 * Notes / Edge Cases:
 * - Each request has its own `req` object; cleanup is isolated per request.
 * - Files not pushed to `req.filesToCleanup` will not be removed.
 * - Works with async file operations.
 * - Safe for multiple simultaneous requests.
 *
 * @param {Function} fn - Async route handler (req, res, next)
 * @returns {Function} - Wrapped async function with error handling and cleanup
 */
const asyncHandler = (fn) => {
    return async (req, res, next = () => {}) => {
        try {
            // Initialize cleanup array if not present
            if (!Array.isArray(req.filesToCleanup)) {
                req.filesToCleanup = [];
            }

            // Execute the async route handler
            await fn(req, res, next);

        } catch (err) {
            console.error(`Error: ${err}`);
            console.error('STACK TRACE ::: ', err?.stack);

            // Attempt to clean up temporary files
            if (Array.isArray(req.filesToCleanup) && req.filesToCleanup.length > 0) {
                for (const filePath of req.filesToCleanup) {
                    try {
                        await fs.unlink(filePath);
                        console.log('Removed file due to error:', filePath);
                    } catch (fileErr) {
                        console.error('Failed to remove file:', fileErr);
                    }
                }
            }

            // Send standardized JSON response
            const statusCode = err?.statusCode || 500;
            return res.status(statusCode).json({
                success: false,
                message: err?.message || err?.sqlMessage || 'Internal Server Error',
                data: null,
                error: err,
                ...(process.env.NODE_ENV === 'DEV' && { stackTrace: err.stack }),
            });
        }
    };
};

module.exports = asyncHandler;