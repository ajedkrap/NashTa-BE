
const db = require('../../configs/database')

module.exports = async (query, start, limit, sortBy) => {
  let sql = "SELECT * FROM events "

  if (query.search !== '' && query.search) {
    sql += `WHERE title LIKE '%${query.search}%' `
  }
  if (parseInt(query.sort)) {
    sql += `ORDER BY ${sortBy} DESC `
  } else {
    sql += `ORDER BY ${sortBy} ASC `
  }

  sql += 'LIMIT ?, ?'

  return new Promise((resolve, reject) => {
    db.query(sql, [start, limit], (err, res) => {
      if (err) reject(new Error("Internal Server Error"));
      if (res.length < 1) reject(new Error("Events data empty"));
      else resolve(res);
    });
  });
}