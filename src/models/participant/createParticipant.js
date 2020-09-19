const db = require("../../configs/database")

module.exports = async (data) => {
  const sql = 'INSERT INTO participants SET ?'
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, res) => {
      if (err) reject(new Error("Create Participant Error"))
      else if (res.affectedRows > 0) resolve({ id: res.insertId, ...data })
      else reject(new Error("Database Error"))
    })
  })
}