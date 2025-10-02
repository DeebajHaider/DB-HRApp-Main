const oracledb = require("oracledb");

/**
 * Retrieves all employees from the employees table.
 * @returns {Promise<Array>} Array of employee records.
 */
async function listAllEmployees() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM employees`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

/**
 * Gets the maximum employee ID from the employees table.
 * @returns {Promise<Array>} The maximum employee ID.
 */
async function getMaxID() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT MAX(EMPLOYEE_ID) FROM EMPLOYEES`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

/**
 * Inserts a new employee into the employees table.
 * @param {Object} employeeData - The employee data to insert.
 */
async function newEmployee(employeeData) {
  // Convert ISO date string to JavaScript Date object
  const hireDate = new Date(employeeData.hire_date);
  const email = employeeData.email.substring(
    0,
    employeeData.email.indexOf("@")
  );

  let conn;
  try {
    conn = await oracledb.getConnection();
    console.log(employeeData);
    await conn.execute(
      `INSERT INTO EMPLOYEES (employee_id, first_Name, last_name, email, phone_number, HIRE_DATE, JOB_ID, salary, manager_id, department_id) VALUES (:employee_id, :first_name, :last_name, :email, :phone_number, :hire_date , :job_id, :salary, 100, 90)`,
      {
        employee_id: employeeData.id,
        first_name: employeeData.firstName,
        last_name: employeeData.lastName,
        email: email,
        phone_number: employeeData.phone,
        hire_date: hireDate,
        job_id: employeeData.jobID,
        salary: employeeData.salary,
      },
      { autoCommit: true }
    );
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

/**
 * Updates an employee's details by their ID.
 * @param {Object} updatedData - The updated employee data.
 * @returns {Promise<Object>} The result of the update operation.
 */
async function updateEmployeeByID(updatedData) {
  console.log(updatedData);
  let conn;
  try {
    conn = await oracledb.getConnection();

    let fieldsToUpdate = [];
    let values = { employee_id: updatedData.id };

    if (updatedData.firstName) {
      fieldsToUpdate.push("first_name = :first_name");
      values.first_name = updatedData.firstName;
    }
    if (updatedData.lastName) {
      fieldsToUpdate.push("last_name = :last_name");
      values.last_name = updatedData.lastName;
    }
    if (updatedData.email) {
      fieldsToUpdate.push("email = :email");
      values.email = updatedData.email;
    }
    if (updatedData.salary) {
      fieldsToUpdate.push("salary = :salary");
      values.salary = updatedData.salary;
    }

    // If no fields to update, return
    if (fieldsToUpdate.length === 0) {
      throw new Error("No fields provided to update");
    }

    const sql = `UPDATE employees SET ${fieldsToUpdate.join(
      ", "
    )} WHERE employee_id = :employee_id`;

    const result = await conn.execute(sql, values, { autoCommit: true });
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

/**
 * Deletes an employee by their ID, updates related manager fields, and removes job history.
 * @param {number} id - The employee ID to delete.
 * @returns {Promise<Object>} The result of the delete operation.
 */
async function deleteEmployeeByID(id) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    // Get the manager_id of the employee being deleted
    const getManagerResult = await conn.execute(
      `SELECT manager_id FROM employees WHERE employee_id = :employee_id`,
      { employee_id: id }
    );

    const managerId = getManagerResult.rows[0][0];

    if (managerId !== undefined) {
      // Update the manager_id of employees reporting to the employee being deleted
      await conn.execute(
        `UPDATE employees 
         SET manager_id = :new_manager_id 
         WHERE manager_id = :old_manager_id`,
        {
          new_manager_id: managerId,
          old_manager_id: id,
        },
        { autoCommit: true }
      );

      // Update the manager_id in the departments where the employee is a manager
      await conn.execute(
        `UPDATE departments
         SET manager_id = :new_manager_id
         WHERE manager_id = :old_manager_id`,
        {
          new_manager_id: managerId,
          old_manager_id: id,
        },
        { autoCommit: true }
      );
    }
    // Deleting employee from job history
    await conn.execute(
      "DELETE FROM JOB_HISTORY WHERE EMPLOYEE_ID= :employee_id",
      { employee_id: id },
      { autoCommit: true }
    );

    // Delete the employee
    const deleteResult = await conn.execute(
      "DELETE FROM employees WHERE employee_id = :employee_id",
      { employee_id: id },
      { autoCommit: true }
    );

    return deleteResult;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}
module.exports = {
  listAllEmployees,
  getMaxID,
  newEmployee,
  updateEmployeeByID,
  deleteEmployeeByID,
};