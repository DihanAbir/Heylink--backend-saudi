const express = require("express");
const { route } = require("../app");
const userController = require("../Controller/UserInformation.controller");
const verifyToken = require("../Middleware/verifyToken");
const multer = require("multer");
const path = require("path");
const router = express.Router();

//upload folder destination
const UPLOADS_FOLDER = "./uploads";

//process the storage file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLocaleLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

//process the uploads file and validate files
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, //5mb
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "file") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only .jpg .jpeg .png format is allowed!!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getUserInfo);

router
  .route("/:id")
  .patch(verifyToken, upload.single("file"), userController.patchUserById);

//   .delete(verifyToken, userController.deleteCommon);

module.exports = router;
