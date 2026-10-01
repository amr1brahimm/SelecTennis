export const API_BASE_URL = "https://selectennis-production.up.railway.app";
const API_BASE_PATH = `${API_BASE_URL}/api`;

export function apiUrl(path) {
  return `${API_BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}