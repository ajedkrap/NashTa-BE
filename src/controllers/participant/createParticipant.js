const response = require("../../helpers/response")
const participantValid = require("../../validators/participant")
const upload = require("../../utils/multer-participant")
const createParticipant = require("../../models/participant/createParticipant")
const multer = require("multer")

module.exports = (req, res) => {
  upload(req, res, async (fileError) => {
    try {
      if (req.fileValidationError) {
        res.status(400).send(response(false, fileError.message))
      }
      if (fileError instanceof multer.MulterError) {
        res.status(400).send(response(false, fileError.message))
      }
      if (!req.file) {
        res.status(400).send(response(false, "File empty"))
      }
      const { status, message, passed } = await participantValid(req.body)
      if (!status) {
        res.status(400).send(response(status, message, passed))
      }
      const participant = await createParticipant({
        name: passed.name,
        picture: "avatar/" + req.file.filename
      })
      res.status(200).send(response(status, "Participant Recorded", participant))
    } catch (e) {
      res.status(500).send(response(false, e.message))
    }
  })
}