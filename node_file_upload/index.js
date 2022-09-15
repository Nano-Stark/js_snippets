const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

const filesPayloadExists = require("./middleware/filesPayloadExist");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");

let fileDir;
const PORT = process.env.PORT || 3500;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filePath = path.join(__dirname, "files", files[key].name);
      files[key].mv(filePath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

app.get("/view", (req, res) => {
  // fileDir.forEach(file)
  //   console.log({ ...fileDir });
  if (fs.existsSync(path.join(__dirname, "files"))) {
    fileDir = fs.readdirSync(path.join(__dirname, "files"));
    // console.log(`File dir: ${fileDir}`);
  }
  res.json({ ...fileDir });
});

app.get("/view/:file", (req, res) => {
  // fileDir.forEach(file)
  //   console.log({ ...fileDir });
  const file = req.params.file;
  res.sendFile(path.join(__dirname, "files", file));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
