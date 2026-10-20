
import { describe, expect, it } from "vitest";
import {
  createTaskSchema,
  updateTaskSchema,
} from "@/lib/validations/task";

describe("createTaskSchema", () => {
  it("accepts a valid task title", () => {
    expect(createTaskSchema.safeParse({ title: "Study React" }).success)
      .toBe(true);
  });

  it("trims whitespace from the title", () => {
    const result = createTaskSchema.safeParse({
      title: "  Study React  ",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.title).toBe("Study React");
    }
  });

  it("rejects an empty title", () => {
    expect(createTaskSchema.safeParse({ title: "" }).success).toBe(false);
  });

  it("rejects a title containing only whitespace", () => {
    expect(createTaskSchema.safeParse({ title: "   " }).success).toBe(false);
  });

  it("rejects titles longer than 100 characters", () => {
    expect(
      createTaskSchema.safeParse({ title: "a".repeat(101) }).success,
    ).toBe(false);
  });

  it.each(["TODO", "IN_PROGRESS", "DONE"])(
    "accepts the %s status",
    (status) => {
      expect(
        updateTaskSchema.safeParse({ id: 1, status }).success,
      ).toBe(true);
    },
  );

  it("rejects an invalid task ID", () => {
    expect(
      updateTaskSchema.safeParse({ id: 0, status: "TODO" }).success,
    ).toBe(false);
  });

  it("rejects an unknown status", () => {
    expect(
      updateTaskSchema.safeParse({ id: 1, status: "BLOCKED" }).success,
    ).toBe(false);
  });
});
