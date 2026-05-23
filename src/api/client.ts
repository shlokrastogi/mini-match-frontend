import { BASE_URL } from "../utils/constants";

export async function apiFetch(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function createCandidate(data: any) {
  return apiFetch("/candidates", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
