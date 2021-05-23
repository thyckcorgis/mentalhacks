interface Course {
  id: { buffer: Buffer };
  name: string;
  user_id: string;
  colour: string;
}

type SettingName =
  | "everyday"
  | "no-phone"
  | "breaks"
  | "advance"
  | "hard-first"
  | "write-notes"
  | "practice"
  | "reward "
  | "quiz "
  | "different-place";
type SettingValue = "do" | "plan" | "no";

type Settings = Record<SettingName, SettingValue>;

type SettingRow = { user_id: string; settings: string };

interface Credentials {
  installed: {
    client_id: string;
    project_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_secret: string;
    redirect_uris: string[];
  };
}
