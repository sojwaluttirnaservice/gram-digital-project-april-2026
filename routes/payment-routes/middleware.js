var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '././public/assets/images/pics/'); // set the destination
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '.jpg'); // set the file name and extension
  }
});

var transactionImg = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '././public/assets/images/transaction/'); // set the destination
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '_' + Date.now() + '.jpg'); // set the file name and extension
  }
});

var extraDoc = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '././public/assets/extra_doc/'); // set the destination
  },
  filename: function (req, file, callback) {
    let pos = file.originalname.lastIndexOf('.');
    let ext = file.originalname.substring(pos);
    callback(null, 'extra_doc_' + Date.now() + ext); // set the file name and extension
  }
});

var upload = multer({ storage: storage });
var transactionImgId = multer({ storage: transactionImg });
let extraDocId = multer({ storage: extraDoc });
var sendData = {
  _call: 0,
  _error: []
};
var uploadarray = [
  {
    name: 'photo',
    maxCount: 1
  },
  {
    name: 'sign',
    maxCount: 1
  }
];
var extraUploadArray = [
  {
    name: 'extra_doc',
    maxCount: 1
  }
];
var translationArray = [
  {
    name: 'doc',
    maxCount: 1
  }
];
var middleware = {
  redirectToHome: function (req, res, next) {
    next();
    // res.redirect("/");
    // return false;
  },
  checkForPoolConnection: function (req, res, next) {
    req.getConnection(function (err, connection) {
      if (err) {
        sendData._call = 999;
        sendData._error = err;
        res.send(sendData);
      } else {
        res.pool = connection;
        next();
      }
    });
  },
  checkForPoolConnectionWithSession: function (req, res, next) {
    if (typeof req.session.User == 'undefined') {
      res.redirect('/');
      //  return false;
    }
    req.getConnection(function (err, connection) {
      if (err) {
        sendData._call = 999;
        sendData._error = err;
        res.send(sendData);
      } else {
        res.pool = connection;
        next();
      }
    });
  },
  setSessionData: (req) => {
    req.session.cri = 100048;
    req.session.criString = 'MTAwMDQ4';
    req.session.cfi = 7;
    req.session.currentPassword = 'moftdywm';
  }
};

module.exports = {
  middleware,
  upload,
  uploadarray,
  transactionImgId,
  translationArray,
  extraUploadArray,
  extraDocId
};
