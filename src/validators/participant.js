const { throw: throwValidator, safeString } = require("./validator")
const validator = require("validator")

const numberRegex = new RegExp("[0-9]")

module.exports = async (req) => {
  const name = safeString(req.name)

  if (validator.isEmpty(name)) return throwValidator(false, "Form need to be filled")
  if (numberRegex.test(name)) return throwValidator(false, "Name should not contain number")

  return throwValidator(true, "Participant Added", {
    name
  })

}