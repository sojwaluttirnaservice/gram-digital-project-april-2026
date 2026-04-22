module.exports = function (io) {
  var IndexModel = require("../model/indexModel");
  io.on("connection", function (client) {
    client.on("chat", function (data) {
      io.to(client.id).emit("recived_data", data);
    });
  });
};
