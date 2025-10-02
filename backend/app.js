const express = require("express");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const locationRoutes = require("./routes/locationRoutes");

const db = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", jobRoutes);
app.use("/api", employeeRoutes);
app.use("/api", departmentRoutes);
app.use("/api", locationRoutes);

// Catch-all route to verify that the app is running
app.use("/", (req, res) => {
  res.json({ message: "App is running!" });
});

// Start Server and DB
const PORT = process.env.PORT || 5000;
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
