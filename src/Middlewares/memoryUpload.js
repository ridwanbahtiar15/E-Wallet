const multer = require("multer");

const storage = multer.memoryStorage();

const memoryUpload = multer({
  storage,
  limits: {
    fileSize: 2e6,
  },
  fileFilter: (req, file, cb) => {
    // const pattern = /jpg|png|jpeg/i;
    // const ext = path.extname(file.originalname);
    // if (!pattern.test(ext)) return cb(null, false);
    cb(null, true);
  },
});

module.exports = {
  singleUpload: (fieldname) => (req, res, next) => {
    memoryUpload.single(fieldname)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ error: "File size is too large. Max allowed size is 2MB." });
        }
        return res.status(400).json({ error: "Unexpected error during file upload." });
      } else if (err) {
        return res.status(500).json({ error: "Failed to upload file." });
      }
      next();
    });
  },
  multiUpload:
    (fieldname, maxCount = 1) =>
    (req, res, next) => {
        memoryUpload.array(fieldname, maxCount)(req, res, (err) => {
            if (err instanceof multer.MulterError) {
              if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({ error: "File size is too large. Max allowed size is 2MB." });
              }
              return res.status(400).json({ error: "Unexpected error during file upload." });
            } else if (err) {
              return res.status(500).json({ error: "Failed to upload file." });
            }
            next();
          });
    }
};