import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {  // where to storage or destination/location related work will be in here
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) { // what is the file name or file related work will be in here
    //TODO: below two lines
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname);
  },
});

export const upload = multer({
    storage
})
