const gharkulYojanaModel = {
  getAllGharkulYojana: function (pool) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM ps_gharkul_yojna";
      pool.query(query, (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  },

  createGharkulYojana: function (pool, gy_name) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO ps_gharkul_yojna (gy_name) VALUES (?)";
      
      pool.query(query, [gy_name], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  },

  updateGharkulYojana: function (pool, id, gy_name) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE ps_gharkul_yojna SET gy_name = ? WHERE id = ?";
      pool.query(query, [gy_name, id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  },

  deleteGharkulYojana: function (pool, id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM ps_gharkul_yojna WHERE id = ?";
      pool.query(query, [id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  },
};

module.exports = gharkulYojanaModel;
