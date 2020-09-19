const getAllEvents = require("../../models/event/getEvents")
const getEventCount = require("../../models/event/getEventCount")
const getParticipantsData = require("../../models/participant/getParticipantsById")
const pagination = require("../../utils/pagination")
const response = require("../../helpers/response")

module.exports = async (req, res) => {
  try {
    const { result, pageInfo } = await pagination(
      req.query,
      getAllEvents,
      getEventCount,
      getParticipantsData,
      "/event"
    );
    res.status(200).send(response(true, "List of Events", result, { pageInfo }));
  }
  catch (e) {
    res.status(500).send(response(false, e.message))
  }
}