
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createTaskSchema, updateTaskSchema } from "@/lib/validations/task";
import { getCurrentUserId } from "@/lib/session";

// NEXT.JS + PRISMA: List only the current user's tasks.
export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (userId === null) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return NextResponse.json(
      { error: "Failed to fetch tasks." },
      { status: 500 },
    );
  }
}

// NEXT.JS + ZOD + PRISMA: Create a task for the current user.
export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    if (userId === null) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body: unknown = await request.json();
    const result = createTaskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid task data." },
        { status: 400 },
      );
    }

    const task = await prisma.task.create({
      data: {
        title: result.data.title,
        userId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);

    return NextResponse.json(
      { error: "Failed to create task." },
      { status: 500 },
    );
  }
}

// NEXT.JS + ZOD + PRISMA: Update a task only if it belongs to the user.
export async function PATCH(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    if (userId === null) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body: unknown = await request.json();
    const result = updateTaskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? "Invalid task data." },
        { status: 400 },
      );
    }

    const { id, status } = result.data;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Failed to update task:", error);

    return NextResponse.json(
      { error: "Failed to update task." },
      { status: 500 },
    );
  }
}

// NEXT.JS + PRISMA: Delete only a task belonging to the user.
export async function DELETE(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    if (userId === null) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const id = Number(request.nextUrl.searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid task ID." }, { status: 400 });
    }

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete task:", error);

    return NextResponse.json(
      { error: "Failed to delete task." },
      { status: 500 },
    );
  }
}
