require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import custom middleware and configurations
const { logger } = require("./middleware/logEvents"); // Assuming logEvents exports logger
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const db = require("./models/db"); // Import the database module

const app = express();
const PORT = process.env.PORT || 3001;

// --- MIDDLEWARE ---

// 1. Custom middleware logger (logs all requests)
app.use(logger);

// 2. Cross-Origin Resource Sharing
// Use your specific CORS options. Remove the generic app.use(cors()) if it was separate.
app.use(cors(corsOptions));

// 3. Built-in middleware to handle URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// 4. Built-in middleware for parsing JSON request bodies
app.use(express.json());

// 5. Serve static files (e.g., CSS, images from a 'public' folder if you have one for the backend)
// This is separate from serving the React frontend.
// Example: app.use(express.static(path.join(__dirname, 'public')));

// --- DATABASE CONNECTION TEST ---
// (Optional, as the pool will try to connect on first query anyway)
// But good for an early check.
db.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(
      "Error connecting to the database during startup check",
      err.stack
    );
    // Consider if you want to prevent the server from starting if DB is down
    // process.exit(1);
  } else {
    console.log("Successfully connected to the database at", res.rows[0].now);
  }
});

// --- API ROUTES ---
app.use("/", require("./routes/root")); // For basic root path (e.g., API welcome message)
app.use("/api/courses", require("./routes/api/courses")); // Standardized API path
app.use("/api/dashboard", require("./routes/api/dashboard")); // New dashboard routes

// --- SERVE REACT FRONTEND (Production) ---
// This should come AFTER your API routes.
// It assumes your React app is built into a 'build' folder in a 'frontend' directory
// sibling to your 'backend' directory. Adjust the path as needed.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
} else {
  // Optional: A simple message for the root in development if not serving React yet
  // app.get('/', (req, res) => res.send('API is running in development...'));
}

// --- ERROR HANDLING ---

// 1. Handle 404 Not Found for any routes not matched above
// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     // You might not have a 404.html in an API-only backend initially
//     res.sendFile(path.join(__dirname, "views", "404.html")); // Create this if you want it
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

// 2. Custom error handler (catches errors passed by next(err))
app.use(errorHandler);

// --- START SERVER ---
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
