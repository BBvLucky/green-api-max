import { STORAGE_KEY } from "../const";
import type { AuthCredentials } from "../types/app";

export function getCredentials(): AuthCredentials | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthCredentials;
  } catch {
    return null;
  }
}
