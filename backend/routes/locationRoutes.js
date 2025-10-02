const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.get("/location", locationController.getAllLocations);

module.exports = router;
