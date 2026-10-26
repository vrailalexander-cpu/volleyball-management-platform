import type { ApiList, Player, Training, Competition } from "../types/api";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace(/\/$/, "");

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 30 } });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const getPlayers = () => getJson<ApiList<Player>>("/players");
export const getTrainings = () => getJson<ApiList<Training>>("/trainings");
export const getCompetitions = () => getJson<ApiList<Competition>>("/competitions");
