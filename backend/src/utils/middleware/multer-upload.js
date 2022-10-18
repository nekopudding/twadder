/**
 * Multer enables express to receive multipart formdata
 * files inside req.files or req.file.
 * 
 * using memoryStorage will store the file inside a temporary
 * buffer so that it can be processed and stored in the database.
 */

var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage }); //stores the media in req.file.buffer

module.exports = {upload};