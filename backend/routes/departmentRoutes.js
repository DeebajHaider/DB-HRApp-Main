const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

//LAB TASK: Add the route to get all departments

// router.get("/department", departmentController.getAllDepartments);
router.get("/department/:id", departmentController.getDepartmentByID);
router.get("/departmentIDMax", departmentController.getIDMax);
router.post("/department", departmentController.addDepartment);
router.put("/department", departmentController.updateDepartment);

module.exports = router;
