require("dotenv").config({ path: "./bin/.env" });

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var upload = require("express-fileupload");
const schedule = require("node-schedule");
const fs = require("fs");

const sendBirthdayMessageController = require("./application/controllers/sendBirthdayMessages/sendBirthdayMessagesController");
var session = require("express-session")({
  secret: "utirna_admin",
  resave: true,
  saveUninitialized: true,
});

// Send messages to
//working remaining -sojwal
// let job = schedule.scheduleJob('*/20 * * * * *', sendBirthdayMessagesToNagrikTask)
/*
let attemptsToSendBirthdaySms=0;
let maxAttempts = 5;
let maxAttemptsReached = false;
async function sendBirthdayMessagesToNagrikTask() {
  try{

    if (maxAttemptsReached) {
            console.log('Max attempts reached. Task will not be retried.');
            return;
        }
  	
    const success = await sendBirthdayMessageController.sendBirthdaySmsToNagrik();

    if(success){
      console.log("Messages send successfullly")
      attemptsToSendBirthdaySms = 0;
    }else{
      console.log("FAiled. will try again in 20 seconds");
      attemptsToSendBirthdaySms++;

      if(attemptsToSendBirthdaySms >= maxAttempts){
        console.log("Max attempts reached")
        maxAttemptsReached = true;
      }else{
        const retryTime = new Date();
        // retryTime.setHours(retryTime.getHours() + 1);
        retryTime.setSeconds(retryTime.getSeconds() + 20);
        console.log(`rechecuiong for ${retryTime}`);
        schedule.rescheduleJob(job, retryTime)
      }
    }
  }catch(err){
    console.log('max attempts reacged ? = ', maxAttemptsReached)
    console.error('Error sending SMS:', err);
  }
}
*/

// Enter Fake sms data in to ps_gp_sms_track

// sendBirthdayMessageController.enterFakeSmsData()

var logger = require("morgan");
var db_connect = require("./application/config/db.connect"); // connection string
var connection = db_connect.myConnection(
  db_connect.mysql,
  db_connect.dbOptions,
  "single"
);

//migration.init(connection, __dirname + "application/config/migration");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
let translateRouter = require("./routes/translateRouter");
let currencyToWordsRouter = require("./routes/currencyToWords");
const { createBaseDir } = require("./application/controllers/createBaseDir");
const { redisClient, connectRedis } = require("./application/utils/redis");
const { supported, getLangObject, t } = require("./myUtils/translator");
const { filesToCleanupMiddleware } = require("./routes/middleware");

var app = express();

createBaseDir();

// create a single instance or database
app.use(connection);
app.use(filesToCleanupMiddleware)

app.use(session);

app.use((req, res, next) => {
  // 1. Determine language: query param -> session -> default
  let lang = req.query.lang || req.session?.language || "mr";

  // 2. Validate supported languages
  if (!supported.includes(lang)) lang = "mr";

  // 3. Store in session if not already stored or if query param exists
  if (!req.session.language || req.query.lang) {
    req.session.language = lang;
  }

  // 4. If user came with query param, redirect to same URL without query
  if (req.query.lang) {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const url = new URL(fullUrl);

    url.searchParams.delete("lang"); // remove only 'lang'

    // console.log("Redirecting to:", url.pathname + url.search);
    return res.redirect(url.pathname + url.search); // keep remaining query params
  }

  // 5. Make language object available in Pug
  res.locals.lang = getLangObject(lang); // entire nested JSON
  // console.log(res.locals.lang)
  res.locals.language = lang;

  res.locals.t = (path, fallback = "") => t(res.locals.lang, path, fallback);

  next();
});

app.use((req, res, next) => {
  res.locals.endpoint = req.originalUrl; // only `/something`
  res.locals.fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  next();
});

app.use(upload());
// view engine setup
app.set("views", path.join(__dirname, "application/views"));
app.use(
  "/js",
  express.static("public/asstest/coustom/js", {
    maxAge: "10h", // Cache files in browser for 10 hours
  })
);
app.set("view engine", "pug");
app.enable("trust proxy");

app.use(logger("dev"));
app.use(express.json({ limit: "1024mb" }));
app.use(express.urlencoded({ extended: true, limit: "1024mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// showing the image if not found

// redisClient.on('connect', () => {
//   console.log("Redis server connected successfully")
// });

redisClient.on("error", (err) => {
  console.log("Error on redis :");
  console.error(err);
  // throw new Error(err)

  // Retry connection after 5 seconds
  // setTimeout(async () => {
  //   try {
  //     await redisClient.connect();
  //     console.log('🔁 Retried Redis connection successfully');
  //   } catch (retryErr) {
  //     console.error('❌ Retry failed:', retryErr.message);
  //   }
  // }, 5000);
});

// (() => connectRedis())()

app.use("/", checkMode, indexRouter);
app.use("/users", checkMode, usersRouter);
app.use("/translate", checkMode, translateRouter);
app.use("/currency", checkMode, currencyToWordsRouter);

if (process.env.NODE_ENV === "development") {
  app.set("view cache", false);
}

app.use(function (req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

let projectEnv = process.env.PROJECT_ENV;
function checkMode(req, res, next) {
  if (projectEnv == "DEV") {
    req.session.User = true;
  }
  next();
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/*", (req, res) => {
  const requestedPath = req.path; // e.g. /gp/payments/image.jpg
  const filePath = path.join(__dirname, "public", requestedPath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist: serve custom HTML page
      console.log("File not found:", filePath);
      return res
        .status(404)
        .sendFile(path.join(__dirname, "public", "image-not-found.html"));
    }

    // File exists: serve it
    console.log("Serving file:", filePath);
    res.sendFile(filePath);
  });
});

module.exports = app;
