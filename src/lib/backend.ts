import { cookies } from "next/headers";

// Default NextAuth cookie names (devit-learn uses no custom prefix)
const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
] as const;

/**
 * Extracts the raw HS256 JWT from the learn site session cookie.
 */
export async function getBackendBearerToken(): Promise<string | null> {
  const cookieStore = await cookies();

  for (const name of SESSION_COOKIE_NAMES) {
    const token = cookieStore.get(name)?.value;
    if (token) return token;
  }

  return null;
}

/**
 * Convenience fetch wrapper for backend API calls from learn site server code.
 * Usage: await backendFetch("/api/domains")
 */
export async function backendFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const token = await getBackendBearerToken();

  if (!token) {
    throw new Error("No session token — user is not authenticated");
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) throw new Error("BACKEND_URL is not set");

  return fetch(`${backendUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}