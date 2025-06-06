const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.erro(err);
  }
};
const logger = (req, res, next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "requestLog.txt"
  );
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
