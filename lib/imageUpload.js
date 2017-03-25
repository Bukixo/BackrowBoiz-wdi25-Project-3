const s3 = require('./s3');
const uuid =  require('uuid');

function imageUpload(req, res, next) {
  if(!req.body.base64) return next();

  const base64Data = req.body.base64.match(/base64,(.*)$/)[1];
  const mimeType = req.body.base64.match(/^data:(.*);/)[1]; //

  const extension = mimeType.replace('image/', '');// replacing the word image/ with nothing
  const filename = `${uuid.v4()}.${extension}`;

  s3.upload({
    Key: filename,
    Body: new Buffer(base64Data, 'base64'), // takes string and turns it back into a an image
    ContentType: mimeType
  }, (err) => {
    if (err) return next(err);

    req.file = { filename, mimeType }; // we store it in to a req.file so we can hadle the file

    next();
  });
}


module.exports = imageUpload;
