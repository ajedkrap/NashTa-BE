const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const os = require("os");
require('dotenv').config();

const app = express();
const { APP_PORT } = process.env;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/picture", express.static("./public/event"))
app.use("/avatar", express.static("./public/participant"))
app.use("/event", require("./src/routes/event"))
app.use("/participant", require("./src/routes/participant"))

app.get("/", (_, res) => {
  res.status(200).send("Backend is running")
});

app.listen(APP_PORT, (err) => {
  if (err) {
    throw err;
  }
  const network = os.networkInterfaces()
  console.log(`IP address: ${network.en0[1].address}`)
  console.log("Express app listening on port " + APP_PORT)
});
