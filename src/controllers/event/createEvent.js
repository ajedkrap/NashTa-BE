const response = require("../../helpers/response")
const { createEvent } = require("../../validators/events")
const createEventModel = require("../../models/event/createEvent")
const upload = require("../../utils/multer-event")
const multer = require("multer")

module.exports = (req, res) => {
  upload(req, res, async (fileError) => {
    if (req.fileValidationError) {
      res.status(404).send(response(false, fileError.message))
    }
    if (fileError instanceof multer.MulterError) {
      res.status(404).send(response(false, fileError.message))
    }
    if (!req.file) {
      res.status(404).send(response(false, "File empty"))
    }
    const { status, message, passed } = await createEvent(req.body)
    if (!status) {
      res.status(404).send(response(status, message))
    }
    try {
      const createdEvent = await createEventModel({
        ...passed,
        picture: "picture/" + req.file.filename
      })
      res.status(200).send(response(status, message, createdEvent))
    } catch (e) {
      res.status(500).send(response(false, e.message))
    }
  })


}