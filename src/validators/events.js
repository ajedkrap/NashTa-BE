const { throw: throwValidator, safeString } = require("./validator")
const validator = require("validator")
const exists = require("../models/participant/participantsExists")

const numberRegex = new RegExp("[0-9]")

module.exports = {
  createEvent: async (req) => {
    const title = safeString(req.title)
    const location = safeString(req.location)
    const participant = safeString(req.participant_id)
    const date = safeString(req.date)
    const note = safeString(req.note)

    if (
      validator.isEmpty(title) ||
      validator.isEmpty(location) ||
      validator.isEmpty(participant) ||
      validator.isEmpty(date) ||
      validator.isEmpty(note)
    ) return throwValidator(false, "Form need to be filled")

    const getDate = date.split("-").filter(value => value)
    if (getDate.length !== 3) return throwValidator(false, "Date invalid")
    const [year, month, day] = getDate
    const eventDate = new Date(year, month - 1, day)
    if (!(eventDate > new Date())) return throwValidator(false, "Date should be in future")

    const participants = participant.split(',').filter(value => value)
    if (participants.length < 1) return throwValidator(false, "No Participants recorded")
    if (participants.length !== new Set(participants).size) return throwValidator(false, "No Duplicate Participant")
    let isExist = true
    let par_id
    for (let id of participants) {
      const exist = await exists({ id: parseInt(id) })
      if (!exist) {
        isExist = false
        par_id = id
        break
      }
    }
    if (!isExist) return throwValidator(false, `Participant no:${par_id} is not exist`)

    if (numberRegex.test(location)) return throwValidator(false, "Location invalid")

    return throwValidator(true, "Event added", {
      title,
      location,
      participant_id: participants.join(','),
      date,
      note
    })


  }
}