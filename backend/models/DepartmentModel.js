const oracledb = require("oracledb");

/**
 * Retrieves all departments from the departments table.
 * (Implementation to be completed)
 * @returns {Promise<Array>} Array of department records.
 */
async function listAllDepartments() {
  //OPTIONAL TASK: Finish Implementation

}

/**
 * Retrieves a department by its ID.
 * @param {number} departmentID - The department ID.
 * @returns {Promise<Array>} The department record.
 */
async function departmentByID(departmentID) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM departments WHERE DEPARTMENT_ID = :departmentID`, [departmentID]);
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
 * Inserts a new department into the departments table.
 * @param {Object} departmentData - The department data to insert.
 */
async function newDepartment(departmentData) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    await conn.execute(
      `INSERT INTO DEPARTMENTS (DEPARTMENT_ID, DEPARTMENT_NAME, MANAGER_ID, LOCATION_ID) VALUES (:department_id, :department_name, :manager_id, :location_id)`,
      {
        department_id: departmentData.id,
        department_name: departmentData.name,
        manager_id: 100,
        location_id: departmentData.location,
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
 * Gets the maximum department ID from the departments table.
 * @returns {Promise<Array>} The maximum department ID.
 */
async function getMaxID() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT MAX(DEPARTMENT_ID) FROM DEPARTMENTS`);
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
 * Updates an existing department's details.
 * @param {Object} departmentData - The updated department data.
 */
async function modifyDepartment(departmentData) {
  console.log(departmentData);
  let conn;
  try {
    conn = await oracledb.getConnection();
    await conn.execute(
      `UPDATE DEPARTMENTS SET DEPARTMENT_NAME = :department_name, MANAGER_ID = :manager_id, LOCATION_ID = :location_id WHERE DEPARTMENT_ID = :department_id`,
      {
        department_id:departmentData.id,
        department_name: departmentData.name,
        manager_id:100,
        location_id: departmentData.location,
      },
      { autoCommit: true }
    );
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = {
  listAllDepartments,
  getMaxID,
  departmentByID,
  newDepartment,
  modifyDepartment,
};