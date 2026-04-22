const translate = require('@iamtraction/google-translate');
const express = require('express');

var middleware = require('./middleware');
const router = express.Router();

router.post('/word', function (req, res) {
  middleware.checkForPoolConnection;

  let englishWord = req.body.data;

  if (englishWord === '') {
    return false;
  }

  // TRANSLATE WORD
  translateWord(englishWord, res);
});

function translateWord(englishWord, res) {
  translate(englishWord, { from: 'en', to: 'mr' })
    .then((data) => {
      res.status(200).send({
        translatedWord: data.text
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

// router.post("/word", function(req, res){
//     middleware.checkForPoolConnection;

//     let marathiWord = req.body.data;
//     if (marathiWord === ""){
//         return false;
//     }
//     translate(marathiWord, {from: "mr"})
// })

module.exports = router;
