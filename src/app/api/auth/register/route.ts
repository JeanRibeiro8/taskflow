
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

// NEXT.JS: POST registers a new user.
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = registerSchema.safeParse(body);

    // ZOD: Reject invalid registration data.
    if (!result.success) {
      return NextResponse.json(
        {
          error:
            result.error.issues[0]?.message ??
            "Invalid registration data.",
        },
        { status: 400 },
      );
    }

    const email = result.data.email.toLowerCase();
    const password = result.data.password;

    // BCRYPTJS: Reject passwords exceeding bcrypt's byte limit.
    if (Buffer.byteLength(password, "utf8") > 72) {
      return NextResponse.json(
        { error: "Password must not exceed 72 bytes." },
        { status: 400 },
      );
    }

    // PRISMA: Check whether the email is already registered.
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    // BCRYPTJS: Hash the password before saving it.
    const passwordHash = await bcrypt.hash(password, 12);

    // PRISMA: Create the user in PostgreSQL.
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Failed to register user:", error);

    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 },
    );
  }
}
