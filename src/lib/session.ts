
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

// NEXT.JS: Reads the session cookie from the current request.
export async function getCurrentUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("taskflow_session")?.value;

  if (!token) {
    return null;
  }

  // JOSE: Verify the token before trusting its user ID.
  const session = await verifySessionToken(token);

  return session?.userId ?? null;
}
