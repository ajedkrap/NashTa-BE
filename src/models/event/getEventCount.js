const db = require("../../configs/database")

module.exports = async (query) => {
  let sql = "SELECT COUNT(*) as count FROM events "

  if (query.search !== '' && query.search) {
    sql += `WHERE title LIKE '%${query.search}%' `
  }

  return new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(new Error("Internal Server Error"));
      if (res[0].count < 1) reject(new Error("Events data Empty"));
      else resolve(res[0].count);
    });
  });
}