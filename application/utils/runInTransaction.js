/**
 * Executes multiple MySQL queries inside a single transaction using a connection
 * provided by `express-myconnection` through `req.getConnection`.
 *
 * This helper ensures that all queries inside the callback run on the same
 * database connection and follow **transactional guarantees (ACID)**:
 *
 * ACID properties:
 *   - **Atomicity**: All queries succeed (COMMIT) or all fail (ROLLBACK)
 *   - **Consistency**: Database remains in a valid state
 *   - **Isolation**: Queries inside the transaction are isolated from others
 *   - **Durability**: Once committed, changes persist
 *
 * How it works internally:
 *   1. A connection is acquired via `req.getConnection()`.
 *   2. A transaction is started using `BEGIN`.
 *   3. The provided callback is executed with the same connection.
 *   4. If all queries succeed → `COMMIT`.
 *   5. If any error occurs → `ROLLBACK`.
 *   6. The connection is automatically managed by `express-myconnection`; do NOT call `release()`.
 *
 * Important Notes:
 *   - All queries inside the callback **must use the provided `conn` object**.
 *   - Do **NOT** call `conn.release()` inside the callback.
 *   - Model functions should accept either a connection (`conn`) or a pool (`res.pool`),
 *     but **use the connection in transactions**.
 *   - This wrapper is designed specifically for `express-myconnection`.
 *
 * @param {Object} req - Express request object containing `getConnection()` from `express-myconnection`.
 * @param {Function} callback - Async function executed with the transactional connection.
 *                              Signature: `(conn: Object) => Promise<any>`
 *                              All queries that need transactional guarantees must use `conn`.
 *
 * @returns {Promise<any>}
 *   - Resolves with whatever value the callback returns after a successful COMMIT.
 *   - Rejects if any error occurs during the transaction or inside the callback. Errors
 *     automatically trigger a ROLLBACK.
 *
 * Usage Example:
 * ```javascript
 * const runInTransaction = require("./runInTransaction");
 *
 * await runInTransaction(req, async (conn) => {
 *   // Insert into multiple tables safely
 *   await usersModel.insert(conn, userData);
 *   await paymentsModel.insert(conn, paymentData);
 * });
 * ```
 *
 * Flow:
 * ```
 * req
 *  ↓
 * getConnection()
 *  ↓
 * BEGIN TRANSACTION
 *  ↓
 * callback(conn)
 *  ↓
 * COMMIT (if successful) / ROLLBACK (on error)
 *  ↓
 * connection automatically released by express-myconnection
 * ```
 *
 * Example Use Case (Grampanchayat Payment System):
 * ```javascript
 * await runInTransaction(req, async (conn) => {
 *   await namuna7Model.delete(conn, id);
 *   await paymentModel.deletePaymentRecord(conn, paymentId);
 * });
 * ```
 *
 * Author: Sojwal / Project
 * Created: 2026
 */
function runInTransaction(req, callback) {
  return new Promise((resolve, reject) => {
    // Step 1: Acquire connection
    // conn is connection here
    req.getConnection((err, conn) => {
      if (err) return reject(err);

      // Step 2: Begin transaction
      conn.beginTransaction(async (err) => {
        if (err) return reject(err);

        try {
          // Step 3: Execute callback with transactional connection
          const result = await callback(conn);

          // Step 4: Commit transaction (promisified)
          await new Promise((res, rej) => {
            conn.commit((err) => {
              if (err) {
                // Commit failed → rollback
                conn.rollback(() => rej(err));
              } else {
                res();
              }
            });
          });

          // Step 5: Return result from callback
          resolve(result);
        } catch (error) {
          // Step 6: Any error → rollback transaction
          conn.rollback(() => reject(error));
        }
      });
    });
  });
}

module.exports = runInTransaction;