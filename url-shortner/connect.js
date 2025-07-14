const mongoose = require('mongoose');
const { Log } = require('../loggingMiddleware/logger');


async function connectDB(url) {
    try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");

    await Log("backend", "debug", "db", "Successfully connected to MongoDB.");
  } catch (err) {
    console.error("DB connection error:", err.message);

    await Log("backend", "fatal", "db", `Critical database connection failure: ${err.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;