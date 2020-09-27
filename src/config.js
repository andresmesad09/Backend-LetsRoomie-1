require("dotenv").config();

module.exports = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 4000,
  host: process.env.HOST || "http//localhost",
  fbApiKey: process.env.FB_API_KEY,
  fbAuthDomain: process.env.FB_AUTH_DOMAIN,
  fbDbUrl: process.env.FB_DATABASE_URL,
  fbProjectId: process.env.FB_PROJECT_ID,
  fbStorageBuscket: process.env.FB_STORAGE_BUCKET,
  fbMessaginId: process.env.FB_MESSAGIN_ID,
  fbAppId: process.env.FB_APP_ID,
  llave: process.env.SECRET,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretKey: process.env.AWS_SECRET_KEY
};
