import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "/tmp/images",        // optional, if images save to internal server / project
  filename: function (req, file, cb) {
    console.log({file}, 'file');
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadSingle = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    console.log(file, 'satu');
    checkFileType(file, cb);
  },
}).single("image");

const uploadMultiple = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image");

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Harap masukkan file berupa jpeg|jpg|png|webp ");
  }
}

// module.exports = { uploadSingle, uploadMultiple };
export default uploadSingle;
