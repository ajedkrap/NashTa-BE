const route = require("express").Router()
const getAllParticipants = require("../controllers/participant/getAllParticipants")
const createParticipant = require("../controllers/participant/createParticipant")

route.get("/", getAllParticipants)
route.post("/", createParticipant)

module.exports = route