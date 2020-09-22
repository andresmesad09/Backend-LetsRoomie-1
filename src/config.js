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
  serviceType: process.env.SERVICE_TYPE,
  privateKeyId: process.env.FB_PRIVATE_KEY_ID,
  privateKey: process.env.FB_PRIVATE_KEY,
  clientEmail: process.env.FB_CLIENT_EMAIL,
  clientId: process.env.FB_CLIENT_ID,
  authUri: process.env.FB_AUTH_URI,
  tokenUri: process.env.FB_TOKEN_URI,
  providerCert: process.env.FB_AUTH_PROVIDER_CERT,
  certUrl: process.env.FB_CERT_URL
};
