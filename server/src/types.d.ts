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
