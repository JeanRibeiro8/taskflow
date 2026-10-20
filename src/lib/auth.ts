
import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret || secret.length < 32) {
  throw new Error("JWT_SECRET must contain at least 32 characters.");
}

const secretKey = new TextEncoder().encode(secret);

// JOSE: Creates a signed session token.
export async function createSessionToken(userId: number) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

// JOSE: Verifies a session token.
export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    if (typeof payload.userId !== "number") {
      return null;
    }

    return { userId: payload.userId };
  } catch {
    return null;
  }
}