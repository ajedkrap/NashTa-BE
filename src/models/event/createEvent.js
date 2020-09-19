const db = require("../../configs/database")

module.exports = (data) => {
  const sql = "INSERT INTO events SET ?"
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, res) => {
      if (err) reject(new Error("Create Event Error"))
      else if (res.affectedRows > 0) resolve({ id: res.insertId, ...data })
      else reject(new Error("Database Error"))
    })
  })
}