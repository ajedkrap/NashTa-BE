const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./public/PARTICIPANT");
  },
  filename: function (request, file, callback) {
    callback(null, "PARTICIPANT_" + new Date().getTime() + path.extname(file.originalname));
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: function (req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      req.fileValidationError = "Only image files are allowed!";
      return callback(new Error("Only image files are allowed!"), false);
    }
    callback(null, true);
  }
})

module.exports = upload.single("picture");
