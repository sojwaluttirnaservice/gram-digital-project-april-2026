const gharkulYojanaModel = require("../../model/gharkulYojana/gharkulYojanaModel");

const gharkulYojanaController = {
  renderGharkulYojanaPage: async (req, res) => {
    try {
      const _yojanaList = await gharkulYojanaModel.getAllGharkulYojana(
        res.pool
      );
      res.render("master/gharkul-yojana/gharkul-yojana-page", {
        gharkulYojanaList: _yojanaList,
      });
    } catch (err) {
      console.log(`Error while rendering the gharkul youjana page: ${err}`);
    }
  },

  getAllGharkulYojana: async (req, res) => {
    try {
      const result = await gharkulYojanaModel.getAllGharkulYojana(res.pool);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  createGharkulYojana: async (req, res) => {
    try {
      const { gy_name } = req.body;
      const result = await gharkulYojanaModel.createGharkulYojana(
        res.pool,
        gy_name
      );
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  updateGharkulYojana: async (req, res) => {
    try {
      const { id, gy_name } = req.body;
      const result = await gharkulYojanaModel.updateGharkulYojana(
        res.pool,
        id,
        gy_name
      );
      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ success: true, message: "Yojana updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Yojana not found" });
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, message: err.message });
    }
  },

  deleteGharkulYojana: async (req, res) => {
    try {
      const { id } = req.body;
      const result = await gharkulYojanaModel.deleteGharkulYojana(res.pool, id);
      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ success: true, message: "Yojana deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "Yojana not found" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};

module.exports = gharkulYojanaController;
