// models/laborAttendanceModel.js
const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");

const laborAttendanceModel = {
  // Get all works
  getAll: (pool) => {
    const q = `SELECT *, ${fmtDateField("start_date")}, ${fmtDateField("end_date")} FROM ps_labor_works
        WHERE is_deleted != 1 
        ORDER BY id DESC`;
    return runQuery(pool, q);
  },

  // Get single work by id (raw rows as returned by runQuery)
  getWorkById: (pool, workId) => {
    const q = `SELECT *, ${fmtDateField("start_date")}, ${fmtDateField("end_date")} FROM ps_labor_works WHERE id = ? AND is_deleted != 1 LIMIT 1`;
    return runQuery(pool, q, [workId]);
  },

  /**
   * Get work with its attendance rows joined to workers.
   * Returns rows structured as:
   *   work columns (from ps_labor_works) + worker and attendance columns for each attendance row.
   * If a work has no attendance, you'll still get one row for the work with NULL worker/attendance columns.

  getWorkByIdWithWorkers: (pool, workId) => {
    const q = `
      SELECT
        w.*,
        wk.id AS worker_id,
        wk.employee_code AS worker_employee_code,
        wk.name AS worker_name,
        wk.phone AS worker_phone,
        wk.aadhar AS worker_aadhar,
        wk.is_active AS worker_is_active,
        wk.default_rate AS worker_default_rate,
        a.id AS attendance_id,
        a.attendance_date,
        a.type_code,
        a.in_time,
        a.out_time,
        a.hours_worked,
        a.effective_daily_rate,
        a.recorded_by,
        a.recorded_at
      FROM ps_labor_works w
      LEFT JOIN ps_labor_attendance a ON a.work_id = w.id
      LEFT JOIN ps_labor_workers wk ON wk.id = a.worker_id
      WHERE w.id = ?
      ORDER BY wk.name, a.attendance_date
    `;
    return runQuery(pool, q, [workId]);
  },


     */

  /**
   * Create a work record. Returns whatever runQuery returns for the INSERT.
   * Expectation: caller will handle the returned insert result (insertId etc).
   *
   * work: { code, name, location, start_date, end_date, default_rate, notes }
   */
  createWork: (pool, work) => {
    const q = `
      INSERT INTO ps_labor_works
        (code, name, location, start_date, end_date, default_rate, notes, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const params = [
      work.code || null,
      work.name,
      work.location || null,
      work.start_date,
      work.end_date,
      typeof work.default_rate !== "undefined" && work.default_rate !== null
        ? work.default_rate
        : null,
      work.notes || null,
    ];
    return runQuery(pool, q, params);
  },

  /**
   * Update a work row. Returns whatever runQuery returns for the UPDATE.
   * Expects work.id to be present.
   */
  updateWork: (pool, work) => {
    const q = `
      UPDATE ps_labor_works
      SET
        code = ?,
        name = ?,
        location = ?,
        start_date = ?,
        end_date = ?,
        default_rate = ?,
        notes = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;
    const params = [
      work.code || null,
      work.name,
      work.location || null,
      work.start_date,
      work.end_date,
      typeof work.default_rate !== "undefined" && work.default_rate !== null
        ? work.default_rate
        : null,
      work.notes || null,
      work.id,
    ];
    return runQuery(pool, q, params);
  },

  // Optional: delete work
  deleteWork: (pool, workId) => {
    const q = `DELETE FROM ps_labor_works WHERE id = ?`;
    return runQuery(pool, q, [workId]);
  },

  getWorkersByWorkId: (pool, workId) => {
    const q = `SELECT * FROM ps_labor_workers WHERE work_id_fk = ?`;
    return runQuery(pool, q, [workId]);
  },

  getWorkersByWorkIdWithAttendance: (pool, work) => {
    const q = `
            WITH RECURSIVE date_range AS (
            SELECT DATE(?) AS dt
            UNION ALL
            SELECT DATE_ADD(dt, INTERVAL 1 DAY)
            FROM date_range
            WHERE dt < DATE(?)
            ),
            workers AS (
            SELECT id, worker_name, worker_phone, worker_aadhar, daily_rate, notes, fine
            FROM ps_labor_workers
            WHERE work_id_fk = ?
            ),
            attendance_agg AS (
            SELECT a2.date, a2.worker_id_fk, a2.present_type, a2.work_id_fk, a2.id
            FROM (
                SELECT date, worker_id_fk, MAX(id) AS max_id
                FROM ps_labor_attendance
                WHERE work_id_fk = ?
                GROUP BY date, worker_id_fk
            ) t
            JOIN ps_labor_attendance a2 ON a2.id = t.max_id
            )
            SELECT
            w.id,
            w.worker_name,
            w.worker_phone,
            w.worker_aadhar,
            w.daily_rate,
            w.notes,
            w.fine,
            -- build attendanceRecord as a JSON array string using GROUP_CONCAT (ordered by d.dt)
            CONCAT(
                '[',
                IFNULL(
                GROUP_CONCAT(
                    JSON_OBJECT(
                    'date', DATE_FORMAT(d.dt, '%Y-%m-%d'),
                    '_date', DATE_FORMAT(d.dt, '%d-%m-%Y'),
                    'present_type', COALESCE(a.present_type, 'no_record'),
                    'work_id_fk', a.work_id_fk,
                    'id', a.id
                    ) 
                    ORDER BY d.dt
                    SEPARATOR ','
                ),
                ''
                ),
                ']'
            ) AS attendanceRecord
            FROM workers w
            JOIN date_range d
            LEFT JOIN attendance_agg a
            ON a.date = d.dt AND a.worker_id_fk = w.id
            GROUP BY w.id, w.worker_name, w.worker_phone, w.worker_aadhar, w.daily_rate, w.notes, w.fine
            ORDER BY w.id;
        `;

    const params = [
      work.start_date || work.startDate, // for date_range start
      work.end_date || work.endDate, // for date_range end
      work.id, // workers WHERE work_id_fk = ?
      work.id, // attendance_agg WHERE work_id_fk = ?
    ];

    return runQuery(pool, q, params);
  },

  createWorker: (pool, worker) => {
    const q = `
            INSERT INTO ps_labor_workers (
            work_id_fk,
            worker_name,
            worker_phone,
            worker_aadhar,
            daily_rate,
            notes,
            fine,
            createdAt,
            updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;

    const values = [
      worker.work_id_fk,
      worker.worker_name,
      worker.worker_phone || null,
      worker.worker_aadhar || null,
      worker.daily_rate || null,
      worker.notes || null,
      worker.fine || 0,
    ];

    return runQuery(pool, q, values);
  },

  updateWorker: (pool, updatedWorker) => {
    const q = `
        UPDATE ps_labor_workers
        SET
        worker_name = ?,
        worker_phone = ?,
        worker_aadhar = ?,
        daily_rate = ?,
        notes = ?,
        fine = ?,
        updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const values = [
      updatedWorker.worker_name,
      updatedWorker.worker_phone || null,
      updatedWorker.worker_aadhar || null,
      updatedWorker.daily_rate || null,
      updatedWorker.notes || null,
      updatedWorker.fine || 0,
      updatedWorker.id, // Required for WHERE clause
    ];

    return runQuery(pool, q, values);
  },

  deleteWorker: (pool, workerId) => {
    const q = `
        DELETE FROM ps_labor_workers
        WHERE id = ?`;

    return runQuery(pool, q, [workerId]);
  },

  getWorkerById: (pool, workerId) => {
    return runQuery(pool, `SELECT * FROM ps_labor_workers WHERE id = ?`, [
      workerId,
    ]);
  },

  getWorkerAttendanceForWork: (pool, work, workerId) => {
    const q = `
            WITH RECURSIVE date_range AS (
            SELECT DATE(?) AS dt
            UNION ALL
            SELECT DATE_ADD(dt, INTERVAL 1 DAY)
            FROM date_range
            WHERE dt < DATE(?)
            ),
            attendance_agg AS (
            -- pick the latest row per date for this worker+work (deterministic)
            SELECT a2.date, a2.worker_id_fk, a2.work_id_fk, a2.present_type, a2.id
            FROM (
                SELECT date, MAX(id) AS max_id
                FROM ps_labor_attendance
                WHERE worker_id_fk = ? AND work_id_fk = ?
                GROUP BY date
            ) t
            JOIN ps_labor_attendance a2 ON a2.id = t.max_id
            )
            SELECT
            DATE_FORMAT(d.dt, '%d-%m-%Y') AS _date,
            DATE_FORMAT(d.dt, '%Y-%m-%d') AS date,
            a.worker_id_fk,
            COALESCE(a.present_type, 'no_record') AS present_type,
            a.work_id_fk,
            a.id
            FROM date_range d
            LEFT JOIN attendance_agg a ON a.date = d.dt
            ORDER BY d.dt;
        `;

    const params = [
      work.start_date || work.startDate,
      work.end_date || work.endDate,
      workerId,
      work.id,
    ];

    return runQuery(pool, q, params);
  },

  createAttendance: (pool, markingDetails) => {
    const q = `
        INSERT INTO ps_labor_attendance (
        work_id_fk,
        worker_id_fk,
        date
        ) VALUES (?, ?, ?)`;
    return runQuery(pool, q, [
      markingDetails.work_id_fk,
      markingDetails.worker_id_fk,
      markingDetails.date,
    ]);
  },

  deleteAttendance: (pool, attendanceId) => {
    return runQuery(pool, `DELETE FROM ps_labor_attendance WHERE id = ?`, [
      attendanceId,
    ]);
  },
};

module.exports = laborAttendanceModel;
