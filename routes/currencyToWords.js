const { ToWords } = require("to-words");

const express = require("express");

var middleware = require("./middleware");
const router = express.Router();

router.post("/toWords", function (req, res) {
  middleware.checkForPoolConnection;

  // console.log("--------------------------------------------- to Words");
  let number = req.body.data;
  console.log(number);
  if (!number) {
    return false;
  }

  const toWords = new ToWords({
    localeCode: "mr-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });
  let words = toWords.convert(number, { currency: true });

  res.status(200).send({
    words: words,
  });
});

module.exports = router;
