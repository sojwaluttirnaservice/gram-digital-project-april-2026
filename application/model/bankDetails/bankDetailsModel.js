const { runQuery } = require("../../utils/runQuery");

const bankDetailsModel = {
  // INSERT NEW BANK ACCOUNT
  save: (pool, details) => {
    let q = `
        INSERT INTO ps_bank_details
        (
            reference_id,
            account_holder_name,
            father_or_husband_name,
            mobile_number,
            email,
            address,
            village,
            taluka,
            district,
            state,
            pincode,
            bank_name,
            branch_name,
            account_number,
            account_balance,

            last_outstanding_amount,
            fd_amount,

            ifsc_code,
            account_type,
            upi_id,
            aadhar_number,
            pan_number,
            voter_id_number,
            ration_card_number,
            aadhar_card_file,
            pan_card_file,
            passbook_image,
            cancelled_cheque_image,
            photo,
            category
        )
        VALUES (?)
        `;

    let values = [
      details.reference_id,
      details.account_holder_name,
      details.father_or_husband_name,
      details.mobile_number,
      details.email,
      details.address,
      details.village,
      details.taluka,
      details.district,
      details.state,
      details.pincode,
      details.bank_name,
      details.branch_name,
      details.account_number,
      details.account_balance || 0,

      details.last_outstanding_amount,
      details.fd_amount,

      details.ifsc_code,
      details.account_type,
      details.upi_id,
      details.aadhar_number,
      details.pan_number,
      details.voter_id_number,
      details.ration_card_number,
      details.aadhar_card_file,
      details.pan_card_file,
      details.passbook_image,
      details.cancelled_cheque_image,
      details.photo,
      details.category,
    ];

    return runQuery(pool, q, [values]);
  },

  // UPDATE BANK DETAILS
  update: (pool, id, details) => {
    let q = `
        UPDATE ps_bank_details SET
            account_holder_name = ?,
            father_or_husband_name = ?,
            mobile_number = ?,
            email = ?,
            address = ?,
            village = ?,
            taluka = ?,
            district = ?,
            state = ?,
            pincode = ?,
            bank_name = ?,
            branch_name = ?,
            account_number = ?,
            ifsc_code = ?,
            account_type = ?,
            upi_id = ?,
            aadhar_number = ?,
            pan_number = ?,
            voter_id_number = ?,
            ration_card_number = ?
        WHERE id = ?
        `;

    return runQuery(pool, q, [
      details.account_holder_name,
      details.father_or_husband_name,
      details.mobile_number,
      details.email,
      details.address,
      details.village,
      details.taluka,
      details.district,
      details.state,
      details.pincode,
      details.bank_name,
      details.branch_name,
      details.account_number,
      details.ifsc_code,
      details.account_type,
      details.upi_id,
      details.aadhar_number,
      details.pan_number,
      details.voter_id_number,
      details.ration_card_number,
      id,
    ]);
  },

  getCategoryCount: (pool, category) => {
    let q = `
        SELECT COUNT(*) AS total
        FROM ps_bank_details
        WHERE is_active = 1
    `;

    let params = [];

    // ======================================
    // FILTER BY CATEGORY (SAMANYA / PANI)
    // ======================================
    if (category) {
      q += ` AND category = ? `;
      params.push(category);
    }

    return runQuery(pool, q, params);
  },

  // GET BY ID
  getById: (pool, id) => {
    let q = `SELECT * FROM ps_bank_details WHERE id = ?`;

    return runQuery(pool, q, [id]);
  },

  // GET BY REFERENCE ID
  getByReference: (pool, referenceId) => {
    let q = `
        SELECT * 
        FROM ps_bank_details
        WHERE reference_id = ?
        AND is_active = 1
        `;

    return runQuery(pool, q, [referenceId]);
  },

  // GET ALL
  getAll: (pool) => {
    let q = `SELECT * FROM ps_bank_details ORDER BY id DESC`;

    return runQuery(pool, q);
  },

  // GET ACTIVE SAMANYA
  getActiveAccountSamanya: (pool, limit = 1) => {
    let q = `
            SELECT * 
            FROM ps_bank_details 
            WHERE category = 'SAMANYA'
            AND is_active = 1
            ORDER BY id DESC
        `;

    if (limit) {
      q += ` LIMIT ?`;
      return runQuery(pool, q, [limit]);
    }

    return runQuery(pool, q);
  },

  // GET ACTIVE PANI
  getActiveAccountPani: (pool, limit = 1) => {
    let q = `
        SELECT * 
        FROM ps_bank_details 
        WHERE category = 'PANI'
        AND is_active = 1
        ORDER BY id DESC
        `;

    if (limit) {
      q += ` LIMIT ?`;
      return runQuery(pool, q, [limit]);
    }

    return runQuery(pool, q);
  },

   getActiveAccountPostOffice: (pool, limit = 1) => {
    let q = `
        SELECT * 
        FROM ps_bank_details 
        WHERE category = 'POST_OFFICE'
        AND is_active = 1
        ORDER BY id DESC
        `;

    if (limit) {
      q += ` LIMIT ?`;
      return runQuery(pool, q, [limit]);
    }

    return runQuery(pool, q);
  },

  // SOFT DELETE
  deactivate: (pool, id) => {
    let q = `
        UPDATE ps_bank_details 
        SET is_active = 0 
        WHERE id = ?
        `;

    return runQuery(pool, q, [id]);
  },

  // ACTIVATE ACCOUNT
  activate: (pool, id) => {
    let q = `
        UPDATE ps_bank_details 
        SET is_active = 1 
        WHERE id = ?
        `;

    return runQuery(pool, q, [id]);
  },

  // UPDATE ACCOUNT BALANCE
  updateBalance: (pool, id, amount) => {
    let q = `
        UPDATE ps_bank_details
        SET account_balance = ?
        WHERE id = ?
        `;

    return runQuery(pool, q, [amount, id]);
  },

  // CREDIT BALANCE
  creditBalance: (pool, id, amount) => {
    let q = `
        UPDATE ps_bank_details
        SET account_balance = account_balance + ?
        WHERE id = ?
        `;

    return runQuery(pool, q, [+amount, +id]);
  },

  creditOfflinePayment: (pool, id, amount) => {
    const q = `UPDATE ps_bank_details
                SET 
                    account_offline_amount = account_offline_amount + ?
                WHERE 
                    id = ?`;

    return runQuery(pool, q, [+amount, +id]);
  },

  // DEBIT BALANCE
  debitBalance: (pool, id, amount) => {
    let q = `
        UPDATE ps_bank_details
        SET account_balance = account_balance - ?
        WHERE id = ?
        `;
    return runQuery(pool, q, [+amount, id]);
  },

  debitOfflineBalance: (pool, id, amount) => {
    let q = `
        UPDATE ps_bank_details
        SET account_offline_amount = account_offline_amount - ?
        WHERE id = ?
        `;
    return runQuery(pool, q, [+amount, id]);
  },

  // VERIFY KYC
  verifyKYC: (pool, id, verifiedBy) => {
    let q = `
        UPDATE ps_bank_details
        SET 
            verification_status = 'VERIFIED',
            verified_by = ?,
            verified_at = NOW()
        WHERE id = ?
        `;

    return runQuery(pool, q, [verifiedBy, id]);
  },

  // REJECT KYC
  rejectKYC: (pool, id, remark) => {
    let q = `
        UPDATE ps_bank_details
        SET 
            verification_status = 'REJECTED',
            remarks = ?
        WHERE id = ?
        `;

    return runQuery(pool, q, [remark, id]);
  },

  // SEARCH
  search: (pool, keyword) => {
    let q = `
        SELECT *
        FROM ps_bank_details
        WHERE
        account_holder_name LIKE ?
        OR account_number LIKE ?
        OR mobile_number LIKE ?
        OR aadhar_number LIKE ?
        `;

    let k = `%${keyword}%`;

    return runQuery(pool, q, [k, k, k, k]);
  },
};

module.exports = bankDetailsModel;
