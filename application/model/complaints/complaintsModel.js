const fmtDateField = require("../../utils/fmtDateField");
const { runQuery } = require("../../utils/runQuery");
const complaintsModel = {
  existingComplaintsInPreviousDays: (pool, data, checkForPreviousDays = 30) => {
    const { formAadhar, formMobile } = data;
    

    const q = `
        SELECT 
            *
        FROM 
            ps_citizen_complaints
        WHERE 
            createdAt >= NOW() - INTERVAL ${checkForPreviousDays} DAY
            AND (
                 formAadhar = ? 
                 OR formMobile = ?
            )
    `;

    const values = [formAadhar, formMobile];

    return runQuery(pool, q, values);
  },

  // ============================================
  // LIST ALL COMPLAINTS
  // ============================================
  list: (pool, complaintStatus = "pending", sort = "desc") => {
    const q = `
            SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar,
                complaintSubject,
                complaintImageUrl,
                complaintDocUrl,

                garbageVanPicksUpGarbage,
                garbageCollectionVanFrequencyByWeek,
                isGarbageProperlyDisposed,

                imageLongitude,
                imageLatitude,
                ST_AsText(imageLocation) AS imageLocation,

                complaintResolutionDate,
                ${fmtDateField("complaintResolutionDate")},
                complaintStatus,
                complaintResolutionImageUrl,
                complaintResolutionRemark,
                complaintResolutionImageLongitude,
                complaintResolutionImageLatitude,
                ${fmtDateField("createdAt")},

                complaintRejectionDate,
                ${fmtDateField("complaintRejectionDate")},
                rejectionReason,
                createdAt,
                updatedAt
            FROM ps_citizen_complaints
                WHERE complaintStatus = ?
            ORDER BY id ${sort == "desc" ? "DESC" : "ASC"}
        `;

    return runQuery(pool, q, [complaintStatus]);
  },

  getComplaintById: (pool, complaintId) => {
    let q = `
            SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar,
                complaintSubject,
                complaintImageUrl,
                complaintDocUrl,

                garbageVanPicksUpGarbage,
                garbageCollectionVanFrequencyByWeek,
                isGarbageProperlyDisposed,

                imageLongitude,
                imageLatitude,
                ST_AsText(imageLocation) AS imageLocation,

                complaintResolutionDate,
                ${fmtDateField("complaintResolutionDate")},
                complaintStatus,
                complaintResolutionImageUrl,
                complaintResolutionRemark,
                complaintResolutionImageLongitude,
                complaintResolutionImageLatitude,

                ${fmtDateField("createdAt")},
                complaintRejectionDate,
                ${fmtDateField("complaintRejectionDate")},
                rejectionReason,
                createdAt,
                updatedAt
            FROM ps_citizen_complaints
            WHERE id = ?
        `;
    return runQuery(pool, q, [complaintId]);
  },

  getAllComplaints: (pool) => {
    let q = `
            SELECT 
                id,
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar,
                complaintSubject,
                complaintImageUrl,
                complaintDocUrl,

                garbageVanPicksUpGarbage,
                garbageCollectionVanFrequencyByWeek,
                isGarbageProperlyDisposed,

                imageLongitude,
                imageLatitude,
                ST_AsText(imageLocation) AS imageLocation,

                complaintResolutionDate,
                ${fmtDateField("complaintResolutionDate")},
                complaintStatus,
                complaintResolutionImageUrl,
                complaintResolutionRemark,
                complaintResolutionImageLongitude,
                complaintResolutionImageLatitude,

                ${fmtDateField("createdAt")},
                complaintRejectionDate,
                ${fmtDateField("complaintRejectionDate")},
                rejectionReason,
                createdAt,
                updatedAt
            FROM ps_citizen_complaints
            ORDER BY id DESC
        `;
    return runQuery(pool, q);
  },

  getComplaintsByYearRange: (pool, fromYear) => {
    // Financial year: 1 April of fromYear to 31 March of fromYear + 1
    const q = `
        SELECT 
            id,
            formName,
            formMobile,
            formEmail,
            formAddress,
            formAadhar,
            complaintSubject,
            complaintImageUrl,
            complaintDocUrl,

            garbageVanPicksUpGarbage,
            garbageCollectionVanFrequencyByWeek,
            isGarbageProperlyDisposed,

            imageLongitude,
            imageLatitude,
            ST_AsText(imageLocation) AS imageLocation,

            complaintResolutionDate,
            ${fmtDateField("complaintResolutionDate")},
            complaintStatus,
            complaintResolutionImageUrl,
            complaintResolutionRemark,
            complaintResolutionImageLongitude,
            complaintResolutionImageLatitude,

            ${fmtDateField("createdAt")},
            complaintRejectionDate,
            ${fmtDateField("complaintRejectionDate")},
            rejectionReason,
            createdAt,
            updatedAt
        FROM ps_citizen_complaints
        WHERE 
            complaintStatus = ? AND

        ((YEAR(createdAt) = ? AND MONTH(createdAt) >= 4)
        OR
        (YEAR(createdAt) = ? AND MONTH(createdAt) <= 3))
        ORDER BY 
            createdAt ASC;
    `;

    return runQuery(pool, q, ["RESOLVED", +fromYear, +fromYear + 1]);
  },

  getComplaintsByMonthAndYear: (pool, month, year) => {
    const q = `
        SELECT 
            id,
            formName,
            formMobile,
            formEmail,
            formAddress,
            formAadhar,
            complaintSubject,
            complaintImageUrl,
            complaintDocUrl,

            garbageVanPicksUpGarbage,
            garbageCollectionVanFrequencyByWeek,
            isGarbageProperlyDisposed,

            imageLongitude,
            imageLatitude,
            ST_AsText(imageLocation) AS imageLocation,

            complaintResolutionDate,
            ${fmtDateField("complaintResolutionDate")},
            complaintStatus,
            complaintResolutionImageUrl,
            complaintResolutionRemark,
            complaintResolutionImageLongitude,
            complaintResolutionImageLatitude,

            ${fmtDateField("createdAt")},
            complaintRejectionDate,
            ${fmtDateField("complaintRejectionDate")},
            rejectionReason,           
            createdAt,
            updatedAt
            
        FROM ps_citizen_complaints
        
        WHERE 
            complaintStatus = ? AND
         MONTH(createdAt) = ? AND YEAR(createdAt) = ?
        ORDER BY 
            createdAt ASC;
    `;

    return runQuery(pool, q, ['RESOLVED', month, year]);
  },

  // ============================================
  // REGISTER NEW COMPLAINT
  // ============================================
  register: (pool, data) => {
    const q = `
            INSERT INTO ps_citizen_complaints 
            (
                formName,
                formMobile,
                formEmail,
                formAddress,
                formAadhar,
                complaintSubject,
                complaintImageUrl,
                complaintDocUrl,

                garbageVanPicksUpGarbage,
                garbageCollectionVanFrequencyByWeek,
                isGarbageProperlyDisposed,

                imageLongitude,
                imageLatitude,
                imageLocation,

                complaintStatus,

                createdAt,
                updatedAt
            ) 
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?,
                ?, ?, 
                ST_PointFromText(?),
                "PENDING",

                ?,?
            )
        `;

    const point = `POINT(${data.imageLongitude} ${data.imageLatitude})`;

    const now = new Date();

    const params = [
      data.formName,
      data.formMobile,
      data.formEmail,
      data.formAddress,
      data.formAadhar,
      data.complaintSubject,
      data.complaintImageUrl,
      data.complaintDocUrl,

      data.garbageVanPicksUpGarbage,
      data.garbageCollectionVanFrequencyByWeek,
      data.isGarbageProperlyDisposed,

      data.imageLongitude,
      data.imageLatitude,
      point,

      data.createdAt || now,
      data.createdAt || now
    ];

    return runQuery(pool, q, params);
  },

  // ============================================
  // UPDATE STATUS + OPTIONAL RESOLUTION DATA
  // ============================================
  updateStatus: (pool, data) => {
    const q = `
            UPDATE ps_citizen_complaints
            SET 
                complaintStatus = ?,
                complaintResolutionDate = ?,
                complaintResolutionImageUrl = ?,
                complaintResolutionRemark = ?,
                updatedAt = CURRENT_TIMESTAMP
            WHERE id = ?
        `;

    const params = [
      data.complaintStatus,
      data.complaintResolutionDate || null,
      data.complaintResolutionImageUrl || null,
      data.complaintResolutionRemark || null,
      data.id,
    ];

    return runQuery(pool, q, params);
  },

  revokeComplaint: (pool, complaintId) => {
    const q = `UPDATE ps_citizen_complaints
                
                SET 
                    complaintResolutionDate = ?,
                    complaintStatus = ?,
                    complaintResolutionRemark = ?,
                    complaintRejectionDate = ?, 
                    rejectionReason = ?
                
                WHERE 
                    id = ?`;

    return runQuery(pool, q, [null, "PENDING", "", null, "", complaintId]);
  },

  acceptComplaint: (pool, acceptedData) => {
    const q = `UPDATE ps_citizen_complaints
                
                SET
                    complaintResolutionDate = ?,
                    complaintStatus = ?,
                    complaintResolutionRemark = ?
                WHERE
                    id = ?`;

    return runQuery(pool, q, [
      acceptedData.complaintResolutionDate,
      // COMPLAINT STATUS
      "ACCEPTED",
      // belwo is the resolution remark
      acceptedData.complaintResolutionRemark,
      acceptedData.id,
    ]);
  },

  resolveComplaint: (pool, resolvedData) => {
        const q = `
            UPDATE ps_citizen_complaints
                SET
                    complaintResolutionImageUrl = ?,
                    complaintFinalResolutionDate = ?,
                    complaintStatus = ?,
                    complaintResolutionImageLongitude = ?,
                    complaintResolutionImageLatitude = ?,
                    complaintResolutionImageLocation = ST_GeomFromText(?)
                WHERE
                id = ?`;

    // MySQL POINT format: POINT(longitude latitude)
    const locationPoint =
      resolvedData.complaintResolutionImageLongitude &&
      resolvedData.complaintResolutionImageLatitude
        ? `POINT(${resolvedData.complaintResolutionImageLongitude} ${resolvedData.complaintResolutionImageLatitude})`
        : null;

    return runQuery(pool, q, [
      resolvedData.complaintResolutionImageUrl || null,
      new Date(), // final resolution date (intended)
      "RESOLVED",
      resolvedData.complaintResolutionImageLongitude || null,
      resolvedData.complaintResolutionImageLatitude || null,
      locationPoint, // passed to ST_GeomFromText
      resolvedData.id,
    ]);
  },

  rejectComplaint: (pool, rejectedData) => {
    const q = `
        UPDATE ps_citizen_complaints
        SET
            complaintRejectionDate = ?,
            complaintStatus = ?,
            rejectionReason = ?
        WHERE
            id = ?`;

    return runQuery(pool, q, [
      // Rejection date (Sequelize.DATE)
      rejectedData.complaintRejectionDate,
      // Status
      "REJECTED",
      // Reason
      rejectedData.rejectionReason,
      // Complaint ID
      rejectedData.id,
    ]);
  },

  updateResolutionDateChange: (pool, newExtendData) => {
    let q = `UPDATE ps_citizen_complaints
        
                SET 
                    complaintResolutionDate = ?,
                    complaintResolutionRemark = ?
                
                WHERE 
                    id = ?`;
    // Input: YYYY-MM-DD
    const dateOnly = newExtendData.complaintResolutionDate;

    // Append current time → YYYY-MM-DD HH:mm:ss
    const now = new Date();
    const timePart = now.toTimeString().split(' ')[0]; // HH:mm:ss
    const fullDateTime = `${dateOnly} ${timePart}`;
    return runQuery(pool, q, [
      fullDateTime,
      newExtendData.complaintResolutionRemark,
      newExtendData.id,
    ]);
  },

  addResolutionDateChange: (pool, oldData, newExtendData, complaintId) => {
    let q = `INSERT INTO 
                ps_citizen_complaints_resolution_dates
                (
                    ps_citizen_complaints_id_fk,

                    oldResolutionDate,
                    oldResolutionRemark,
                    
                    newResolutionDate,
                    newResolutionRemark

                ) VALUES (?)`;

    return runQuery(pool, q, [
      [
        complaintId,

        oldData.complaintResolutionDate,
        oldData.complaintResolutionRemark,

        newExtendData.complaintResolutionDate,
        newExtendData.complaintResolutionRemark,
      ],
    ]);
  },
};

module.exports = complaintsModel;
