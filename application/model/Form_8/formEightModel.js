const { runQuery } = require("../../utils/runQuery");

const formEightModel2 = {
  getFormEightData: (pool) => {
    return new Promise((resolve, reject) => {
      const q = `SELECT * FROM ps_form_eight_total_taxation`;

      pool.query(q, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },

  getFormEightUserData: (pool, f8UserId) => {
    return runQuery(pool, `SELECT * FROM ps_form_eight_user WHERE id = ?`, [
      f8UserId,
    ]);
  },

  updateFormEightUserHomeImage: (pool, updateData) => {
    const q = `
            UPDATE ps_form_eight_user 
                SET 
                    feu_image = ?,
                    home_image_upload_person_user_id = ?,
                    home_image_upload_person_username = ?,

                    home_image_longitude = ?,
                    home_image_latitude = ?,
                    home_image_accuracy = ?,
                    home_image_altitude = ?,
                    home_image_altitude_accuracy = ?,
                    home_image_heading = ?,
                    home_image_speed = ?,
                    home_image_timestamp = ?,

                    home_image_location = ST_GeomFromText(?)
                    WHERE 
                id = ?`;

    // Construct WKT POINT(longitude latitude)
    const geomPoint = `POINT(${updateData.home_image_longitude} ${updateData.home_image_latitude})`;

    const updateArr = [
        updateData.feu_image,
        updateData.home_image_upload_person_user_id,
        updateData.home_image_upload_person_username,

        updateData.home_image_longitude,
        updateData.home_image_latitude,
        updateData.home_image_accuracy,
        updateData.home_image_altitude,
        updateData.home_image_altitude_accuracy,
        updateData.home_image_heading,
        updateData.home_image_speed,
        updateData.home_image_timestamp,

        geomPoint,
        updateData.id,
    ];
    return runQuery(pool, q, updateArr);
  },
};

module.exports = formEightModel2;
