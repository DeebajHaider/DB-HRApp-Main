const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

//http://localhost:3001/api/employees
router.get("/employees", employeeController.getAllEmployees);
router.get("/employeeIDMax", employeeController.getIDMax);
router.post("/employees", employeeController.addEmployee);
router.put("/employees/", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);

module.exports = router;
