/**
 * Controller for employee-related operations
 */
const {
  listAllEmployees,
  newEmployee,
  getMaxID,
  updateEmployeeByID,
  deleteEmployeeByID,
} = require("../models/EmployeeModel");
const db = require("../config/db");

/**
 * Get all employees
 * @param req - Request object
 * @param res - Response object
 */
async function getAllEmployees(req, res) {
  try {
    // get all employees
    const employees = await listAllEmployees();

    // send response with employees in json
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees", error: err });
  }
}

/**
 * Get the maximum employee ID
 * @param req - Request object
 * @param res - Response object
 */
async function getIDMax(req, res) {
  try {
    const employees = await getMaxID();
    res.json({ data: employees });
  } catch (err) {
    res.status(500).json({ message: "Error fetching the max ID", error: err });
  }
}

/**
 * Add a new employee
 * @param req - Request object
 * @param res - Response object
 */
async function addEmployee(req, res) {
  try {
    await newEmployee(req.body);
    res.status(201).json({ message: "Employee added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding employee", error: err });
  }
}

/**
 * Update an employee
 * @param req - Request object
 * @param res - Response object
 */
async function updateEmployee(req, res) {
  try {
    const updatedData = req.body;
    console.log(updatedData);

    const result = await updateEmployeeByID(updatedData);

    if (result.rowsAffected > 0) {
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating employee", error: err });
  }
}

/**
 * Delete an employee
 * @param req - Request object
 * @param res - Response object
 */
async function deleteEmployee(req, res) {
  try {
    const employeeID = req.params.id; // Employee ID from the URL parameter
    const result = await deleteEmployeeByID(employeeID);

    if (result.rowsAffected > 0) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee", error: err });
  }
}

module.exports = {
  getAllEmployees,
  getIDMax,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
