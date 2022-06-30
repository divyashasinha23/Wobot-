
const multer = require('multer');
const path = require( 'path' );


//uploading CSV file 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const Upload = multer({
  storage: storage,
  limits:{ fileSize: 2000000 }, 
 }).single('csv');

 module.exports = Upload;