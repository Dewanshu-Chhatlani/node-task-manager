const multer = require("multer");

const avatarUpload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image uploads are supported!"));
    }

    cb(undefined, true);
  },
});

module.exports = {
  avatar: avatarUpload.single("avatar"),
};
