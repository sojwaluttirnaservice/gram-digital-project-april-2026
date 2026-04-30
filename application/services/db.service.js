const gsevaBaseUrl =
  process.env?.PROJECT_ENV == "DEV"
    ? "http://localhost:3000"
    : `http://localhost:3000`;

const dbService = {
  checkLogin: async (data) => {
    try {
      let endpoint = `${gsevaBaseUrl}/auth/gp-user`;
      let result = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => r.json());

      return result;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  },

  verifyGpCode: async (data) => {
    try {
      let endpoint = `${gsevaBaseUrl}/auth/gp-code`;
      let result = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) => r.json());

      return result;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  },

  getDbDetails: async (dbId) => {
    try {
      let endpoint = `${gsevaBaseUrl}/websites/db-list/db/${dbId}`;
      return await fetch(endpoint).then((r) => r.json());
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  },

  getDbDetailsByGpCode: async (gpCode) => {
    try {
      let endpoint = `${gsevaBaseUrl}/websites/db-list/${gpCode}`;
      return await fetch(`${endpoint}`).then(r => r.json());
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  },

  addDatabase: async(dbData) =>{
    try {
        let endpoint = `${gsevaBaseUrl}/websites/db-list`;
        return await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(dbData),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(r => r.json());
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
  },

  checkExistence: async (dbData) =>{

     try {
        let endpoint = `${gsevaBaseUrl}/websites/db-list/existence`;
        return await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(dbData),
            headers: {
                'Content-Type':'application/json'
            }
        }).then(r => r.json());
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
  }
};

module.exports = dbService;
