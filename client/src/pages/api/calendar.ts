import { google } from "googleapis";
import { NextApiHandler } from "next";
import { scopes } from "../../config";

const authCalendar: NextApiHandler = (req, res) => {
  console.log(process.env.CALENDAR_REDIRECT_URIS);
  const [redirectUri, appRedirect] = process.env.CALENDAR_REDIRECT_URIS?.split(" ");
  const oAuth2Client = new google.auth.OAuth2({
    clientId: process.env.CALENDAR_CLIENT_ID,
    clientSecret: process.env.CALENDAR_CLIENT_SECRET,
    redirectUri,
  });

  const url = oAuth2Client.generateAuthUrl({
    access_type: "online",
    scope: scopes,
    redirect_uri: appRedirect,
  });
  res.redirect(url);
};

export default authCalendar;
