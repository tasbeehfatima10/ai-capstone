const { test } = require("node:test");
const assert = require("node:assert/strict");
const { validateSettings } = require("./validateSettings");

test("accepts valid settings", () => {
  const result = validateSettings({
    displayName: "Jane Doe",
    email: "jane@example.com",
    theme: "dark",
    language: "en",
    emailNotifications: true,
  });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
  assert.deepEqual(result.value, {
    displayName: "Jane Doe",
    email: "jane@example.com",
    theme: "dark",
    language: "en",
    emailNotifications: true,
  });
});

test("rejects empty required fields", () => {
  const result = validateSettings({
    displayName: "   ",
    email: "",
    theme: "",
    language: "",
    emailNotifications: false,
  });

  assert.equal(result.valid, false);
  assert.equal(result.errors.displayName, "Display name is required.");
  assert.equal(result.errors.email, "Email is required.");
  assert.equal(result.errors.theme, "Select a valid theme.");
  assert.equal(result.errors.language, "Select a valid language.");
});

test("rejects display name that is too short or too long", () => {
  const tooShort = validateSettings({
    displayName: "J",
    email: "jane@example.com",
    theme: "light",
    language: "en",
    emailNotifications: false,
  });
  assert.equal(tooShort.errors.displayName, "Display name must be at least 2 characters.");

  const tooLong = validateSettings({
    displayName: "a".repeat(51),
    email: "jane@example.com",
    theme: "light",
    language: "en",
    emailNotifications: false,
  });
  assert.equal(tooLong.errors.displayName, "Display name must be at most 50 characters.");
});

test("rejects invalid email format", () => {
  const result = validateSettings({
    displayName: "Jane Doe",
    email: "not-an-email",
    theme: "light",
    language: "en",
    emailNotifications: false,
  });

  assert.equal(result.errors.email, "Enter a valid email address.");
});

test("rejects invalid theme and language values", () => {
  const result = validateSettings({
    displayName: "Jane Doe",
    email: "jane@example.com",
    theme: "neon",
    language: "de",
    emailNotifications: false,
  });

  assert.equal(result.errors.theme, "Select a valid theme.");
  assert.equal(result.errors.language, "Select a valid language.");
});

test("rejects non-boolean emailNotifications", () => {
  const result = validateSettings({
    displayName: "Jane Doe",
    email: "jane@example.com",
    theme: "light",
    language: "en",
    emailNotifications: "yes",
  });

  assert.equal(
    result.errors.emailNotifications,
    "Email notifications must be true or false."
  );
});

test("trims whitespace from text fields", () => {
  const result = validateSettings({
    displayName: "  Jane Doe  ",
    email: "  jane@example.com  ",
    theme: "system",
    language: "es",
    emailNotifications: true,
  });

  assert.equal(result.valid, true);
  assert.equal(result.value.displayName, "Jane Doe");
  assert.equal(result.value.email, "jane@example.com");
});

test("handles missing fields gracefully", () => {
  const result = validateSettings({});

  assert.equal(result.valid, false);
  assert.equal(result.errors.displayName, "Display name is required.");
  assert.equal(result.errors.email, "Email is required.");
});
