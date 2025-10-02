const { listAllLocations } = require("../models/LocationModel");

async function getAllLocations(req, res) {
  try {
    const locations = await listAllLocations();
    res.json({ data: locations });
  } catch (err) {
    res.status(500).json({ message: "Error fetching locations", error: err });
  }
}

module.exports = { getAllLocations };
