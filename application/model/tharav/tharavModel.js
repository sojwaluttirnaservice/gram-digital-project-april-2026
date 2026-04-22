const tharavModel = {
  getSabhaTharavDetails: (pool, tharavId) => {
    return new Promise((resolve, reject) => {
      let q = `SELECT * FROM ps_masik_sabha_tharav WHERE id = ?`;
      pool.query(q, [tharavId], (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  },

  saveSabhaTharavDetails: (pool, data, isUpdate = false, tharavId = -1) => {
    // console.log('tharavId', tharavId);

    return new Promise((resolve, reject) => {
      let q;
      if (isUpdate == true && tharavId !== -1) {
        q = `
                    UPDATE ps_masik_sabha_tharav
                        SET
                            sabha_time = ?,
                            sabha_date = ?,
                            sabha_from_year = ?,
                            sabha_to_year = ?,
                            
                            sabha_tharav_number = ?,
                            sabha_type = ?,
                            sabha_location = ?,
                            sabha_soochak = ?,
                            
                            sabha_anumodak = ?,
                            sabha_guests = ?,
                            sabha_subject = ?,
                            sabha_chairman = ?,
                            
                            
                            sabha_officer_name_post = ?,
                            sabha_officer_mobile = ?,
                            sabha_officer_email = ?,
                            sabha_subject_tharav = ?,
                            sabha_number = ?
                            
                        WHERE
                            id = ${tharavId};`;
      } else {
        q = `
                INSERT INTO ps_masik_sabha_tharav
                (
                    sabha_time,
                    sabha_date,
                    sabha_from_year,
                    sabha_to_year,
                    
                    sabha_tharav_number,
                    sabha_type,
                    sabha_location,
                    sabha_soochak,
                    
                    sabha_anumodak,
                    sabha_guests,
                    sabha_subject,
                    sabha_chairman,
                    
                    sabha_officer_name_post,
                    sabha_officer_mobile,
                    sabha_officer_email,
                    sabha_subject_tharav,

                    sabha_number

                ) 
                VALUES (?, ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, ?, ?, 
                    ?, ?, ?, ?,
                    ?)         
                    `;
      }

      let insertData = [
        data.form_sabha_time,
        data.form_sabha_date,
        data.form_sabha_from_year,
        data.form_sabha_to_year,

        data.form_sabha_tharav_number,
        data.form_sabha_type,
        data.form_sabha_location,
        data.form_sabha_soochak,

        data.form_sabha_anumodak,
        data.form_sabha_guests,
        data.form_sabha_subject,
        data.form_sabha_chairman,

        data.form_sabha_officer_name_post,
        data.form_sabha_officer_mobile,
        data.form_sabha_officer_email,
        data.form_sabha_subject_tharav,

        data.form_sabha_number
      ];



      pool.query(q, insertData, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  deleteSabhaTharavDetails: (pool, deleteId) => {
    return new Promise((resolve, reject) => {
      let q = `DELETE FROM ps_masik_sabha_tharav WHERE id = ?`;
      pool.query(q, [deleteId], (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  },
  getTharavListByDescOrder: (pool) => {
    return new Promise((resolve, reject) => {
      let q = `
                SELECT *
                FROM ps_masik_sabha_tharav
                ORDER BY STR_TO_DATE(sabha_date, '%d/%m/%Y') DESC;
            `;

      pool.query(q, [], (err, result) => {
        return err ? reject(err) : resolve(result);
      });
    });
  },
};

module.exports = tharavModel;
