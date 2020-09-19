const db = require("../../configs/database")

module.exports = async (data) => {
  const sql = "SELECT * FROM participants WHERE ?"
  return new Promise((resolve, reject) => {
    db.query(sql, data, (err, res) => {
      if (err) reject(new Error("Database exist error"))
      else if (res.length > 0) resolve(true)
      else resolve(false)
    })
  })
}