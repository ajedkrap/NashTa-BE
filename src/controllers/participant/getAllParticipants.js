const response = require("../../helpers/response")
const getParticipants = require("../../models/participant/getAllParticipants")

module.exports = async (req, res) => {
  try {
    const getAllParticipants = await getParticipants()
    res.status(200).send(response(true, "list of participants", getAllParticipants))
  } catch (e) {
    res.status(500).send(response(false, e.message))
  }
}