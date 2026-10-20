
import { describe, expect, it } from "vitest";
import {
  loginSchema,
  registerSchema,
} from "@/lib/validations/auth";

describe("registerSchema", () => {
  it("accepts a valid email and password", () => {
    expect(
      registerSchema.safeParse({
        email: "user@example.com",
        password: "password123",
      }).success,
    ).toBe(true);
  });

  it("trims whitespace from the email", () => {
    const result = registerSchema.safeParse({
      email: "  user@example.com  ",
      password: "password123",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.email).toBe("user@example.com");
    }
  });

  it("rejects an invalid email", () => {
    expect(
      registerSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      }).success,
    ).toBe(false);
  });

  it("rejects passwords shorter than 8 characters", () => {
    expect(
      registerSchema.safeParse({
        email: "user@example.com",
        password: "short",
      }).success,
    ).toBe(false);
  });

  it("rejects passwords longer than 72 characters", () => {
    expect(
      registerSchema.safeParse({
        email: "user@example.com",
        password: "a".repeat(73),
      }).success,
    ).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts valid login data", () => {
    expect(
      loginSchema.safeParse({
        email: "user@example.com",
        password: "a",
      }).success,
    ).toBe(true);
  });

  it("rejects an empty password", () => {
    expect(
      loginSchema.safeParse({
        email: "user@example.com",
        password: "",
      }).success,
    ).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(
      loginSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      }).success,
    ).toBe(false);
  });
});
