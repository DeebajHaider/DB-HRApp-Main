const { listAllJobs } = require("../models/jobModel");
const db = require("../config/db");

async function getAllJobs(req, res) {
  try {
    const employees = await listAllJobs();
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees", error: err });
  }
}

module.exports = { getAllJobs };
