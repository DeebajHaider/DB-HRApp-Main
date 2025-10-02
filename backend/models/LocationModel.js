const oracledb = require("oracledb");

/**
 * Retrieves all location IDs from the locations table.
 * @returns {Promise<Array>} Array of location IDs.
 */
async function listAllLocations() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT LOCATION_ID FROM locations`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

module.exports = {
  listAllLocations,
};