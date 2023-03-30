const config = require('../config/index.js')
const gc = config.storage
const bucket = gc.bucket('note_garden_bucket') // should be your bucket name

const uploadImage = (files) =>
  Promise.all(

    files.map((file) => {
      const { originalname, buffer } = file;

      const blob = bucket.file(originalname.replace(/ /g, "_"));
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      return new Promise((resolve, reject) => {
        blobStream
          .on("finish", () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
          })
          .on("error", (e) => {
            console.log(e);
            reject(`Unable to upload image, something went wrong`);
          })
          .end(buffer);
      });
    })
  );

module.exports = uploadImage
