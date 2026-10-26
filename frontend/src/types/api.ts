export type PlayerPosition = "Setter" | "Outside hitter" | "Opposite" | "Middle blocker" | "Libero";
export type PlayerStatus = "active" | "injured" | "inactive";
export interface Player {
  id: number; name: string; number: number; position: PlayerPosition; age: number; status: PlayerStatus;
}
export interface Training {
  id: number; title: string; date: string; duration: number; focus: string; location: string; notes: string;
}
export type CompetitionStatus = "upcoming" | "completed" | "cancelled";
export interface Competition {
  id: number; title: string; opponent: string; date: string; venue: string; status: CompetitionStatus;
  score: number | null; opponent_score: number | null;
}
export interface ApiList<T> { data: T[]; total: number; }
export type AsyncState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };
