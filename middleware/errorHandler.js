const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errorLog.txt");
  console.erro(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
    error: err.message,
  });
};

module.exports = errorHandler;
