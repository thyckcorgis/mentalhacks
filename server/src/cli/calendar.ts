import readline from "readline";
import { readFile, writeFile } from "fs/promises";
import { google, Auth } from "googleapis";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "google/token.json";

async function main() {
  // Load client secrets from a local file.
  const content = await readFile("google/credentials.json");

  const client = await authorize(JSON.parse(content.toString()));
  listEvents(client);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials: Credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client: Auth.OAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  try {
    const token = await readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    return oAuth2Client;
  } catch (err) {
    return getAccessToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client: Auth.OAuth2Client) {
  return new Promise<Auth.OAuth2Client>((res, rej) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "online",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, async (err, token) => {
        if (err || !token) return rej("Error retrieving access token");
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions

        await writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log("Token stored to", TOKEN_PATH);
        res(oAuth2Client);
      });
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth: Auth.OAuth2Client) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      if (!res) return;
      const events = res.data.items;
      if (!events) return;
      if (events.length) {
        console.log("Upcoming 10 events:");
        events.forEach((event) => {
          const start = event?.start?.dateTime || event?.start?.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}

main();
