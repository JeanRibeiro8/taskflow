
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";
import { createSessionToken } from "@/lib/auth";

// NEXT.JS: Authenticates a user.
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = loginSchema.safeParse(body);

    // ZOD: Validate login data.
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 },
      );
    }

    const email = result.data.email.toLowerCase();

    // PRISMA: Find the user by email.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // BCRYPTJS: Verify the password.
    if (
      !user ||
      !(await bcrypt.compare(result.data.password, user.passwordHash))
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    // JOSE: Create a signed session token.
    const token = await createSessionToken(user.id);

    // NEXT.JS: Return the user and set a secure session cookie.
    const response = NextResponse.json({
      id: user.id,
      email: user.email,
    });

    response.cookies.set("taskflow_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Failed to log in:", error);

    return NextResponse.json(
      { error: "Failed to log in." },
      { status: 500 },
    );
  }
}
