import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

// NEXT.JS: Returns the currently authenticated user.
export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (userId === null) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    // PRISMA: Retrieve public user information.
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch current user:", error);

    return NextResponse.json(
      { error: "Failed to fetch current user." },
      { status: 500 },
    );
  }
}