const express = require("express");
const router = express.Router();
const path = require("path");

// pass the RegExp object, not the string of the RegExp to the route handler
/**
 * /../ everything in side those slashes is a regex
 * ^ marks the beginning of the string
 * $ marks the end of the string
 * | or operator
 * \ is an escape character
 * (?:...) is a non-capturing group
 * \. is a literal dot (escaped)
 * (...)? is an optional group
 */
router.get(/^\/$|\/index(?:\.html)?$/, (req, res) => {
  // res.sendFile() is a method in Express.js that allows you to send a file from your server to the client — usually HTML, images, or other static content.
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
