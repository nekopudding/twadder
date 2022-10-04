var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage }); //stores the media in req.file.buffer

module.exports = {upload};