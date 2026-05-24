import { BASE_URL } from "../utils/constants";
import type { Candidate, CandidateInput } from "../utils/types";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data: unknown = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as T;
}

export async function createCandidate(
  data: CandidateInput,
): Promise<Candidate> {
  return apiFetch<Candidate>("/candidates", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
