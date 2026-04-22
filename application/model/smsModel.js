var request = require("request");
const { sms } = require("./sms.templates");

module.exports = {
  serialize: function (obj) {
    let str =
      "?" +
      Object.keys(obj)
        .reduce(function (a, k) {
          a.push(k + "=" + encodeURIComponent(obj[k]));
          return a;
        }, [])
        .join("&");
    return str;
  },
  sendNewRegistrationSMS: function (data, callback) {
    var url = `https://api.pinnacle.in/index.php/sms/urlsms`;
    var sendData = {
      sender: "THRECT",
      numbers: data.mobile,
      messagetype: "TXT",
      message: sms.regSMS(data),
      response: "Y",
      apikey: "bb9e1c-c9c03b-4d9f53-a5c48d-a7163b",
    };
    var str = this.serialize(sendData);
    url += str;
    request.get(
      {
        url: url,
      },
      function (error, response, body) {
        data = {
          error: error,
          response: response,
          body: body,
        };
        callback(data);
      }
    );
  },
};
