const mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const { addRoutersInApp } = require("./src/routes");
// import modules here

var app = express();

app.use(bodyParser.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("MongoDB is connected successfully");
  } catch (err) {
    console.error("Error in MongoDB connection:", err);
  }
};

connectDB();

addRoutersInApp(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

function exitHandler(options, exitCode) {
  console.log("Started cleaning before termination");
  if (options.cleanup) console.log("clean");
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) {
    // Clean crons here
    process.exit();
  }
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

module.exports = app;
