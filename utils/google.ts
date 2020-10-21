import { google } from "googleapis";

const scopes = "https://www.googleapis.com/auth/analytics.readonly";

const googleAuth = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
  scopes
);

export default googleAuth;
