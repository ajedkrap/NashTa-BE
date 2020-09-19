const route = require("express").Router()
const getAllEvents = require("../controllers/event/getAllEvents")
const createEvent = require("../controllers/event/createEvent")

route.get("/", getAllEvents)

route.post("/", createEvent)

module.exports = route