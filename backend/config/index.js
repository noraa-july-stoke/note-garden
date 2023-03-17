const Cloud = require("@google-cloud/storage");
const path = require("path");
let serviceKey;

if (process.env.NODE_ENV === "production") {
  serviceKey = "/etc/secrets/southern-surge-378705-44c56a09fd5d.json";
} else {
  serviceKey = path.join(
    __dirname,
    "./southern-surge-378705-44c56a09fd5d.json"
  );
}

const { Storage } = Cloud;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GCLOUD_PROJECT_ID,
});

module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  url: process.env.DB_FILE,
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    schema: process.env.SCHEMA,
  },
  storage: storage,
};
