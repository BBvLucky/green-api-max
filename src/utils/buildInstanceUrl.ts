import { API_URL } from "../const";
import { getCredentials } from "./getCredentials";

export function buildInstanceUrl(endpoint: string): string {
  const { idInstance, apiTokenInstance } = getCredentials() ?? {};
  return `${API_URL}/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;
}
