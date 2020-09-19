const db = require("../../configs/database")

module.exports = async () => {
  const sql = "SELECT * FROM participants "
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(new Error("Participant not Found"))
      else resolve(res)
    })
  })
}