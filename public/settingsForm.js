const DISPLAY_NAME_MIN = 2;
const DISPLAY_NAME_MAX = 50;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_THEMES = ["light", "dark", "system"];
const ALLOWED_LANGUAGES = ["en", "es", "fr"];

const form = document.getElementById("settings-form");
const statusEl = document.getElementById("form-status");

const fields = {
  displayName: document.getElementById("displayName"),
  email: document.getElementById("email"),
  theme: document.getElementById("theme"),
  language: document.getElementById("language"),
  emailNotifications: document.getElementById("emailNotifications"),
};

function getSettingsFromForm() {
  return {
    displayName: fields.displayName.value.trim(),
    email: fields.email.value.trim(),
    theme: fields.theme.value,
    language: fields.language.value,
    emailNotifications: fields.emailNotifications.checked,
  };
}

function validateSettings(settings) {
  const errors = {};

  if (!settings.displayName) {
    errors.displayName = "Display name is required.";
  } else if (settings.displayName.length < DISPLAY_NAME_MIN) {
    errors.displayName = `Display name must be at least ${DISPLAY_NAME_MIN} characters.`;
  } else if (settings.displayName.length > DISPLAY_NAME_MAX) {
    errors.displayName = `Display name must be at most ${DISPLAY_NAME_MAX} characters.`;
  }

  if (!settings.email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(settings.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!ALLOWED_THEMES.includes(settings.theme)) {
    errors.theme = "Select a valid theme.";
  }

  if (!ALLOWED_LANGUAGES.includes(settings.language)) {
    errors.language = "Select a valid language.";
  }

  return errors;
}

function setFieldError(fieldName, message) {
  const input = fields[fieldName];
  const errorEl = document.getElementById(`${fieldName}-error`);

  input.setAttribute("aria-invalid", message ? "true" : "false");
  errorEl.textContent = message;
}

function clearErrors() {
  Object.keys(fields).forEach((fieldName) => setFieldError(fieldName, ""));
  statusEl.textContent = "";
  statusEl.className = "form__status";
}

function showErrors(errors) {
  Object.keys(fields).forEach((fieldName) => {
    setFieldError(fieldName, errors[fieldName] || "");
  });
}

function validateField(fieldName) {
  const errors = validateSettings(getSettingsFromForm());
  setFieldError(fieldName, errors[fieldName] || "");
  return !errors[fieldName];
}

Object.keys(fields).forEach((fieldName) => {
  const input = fields[fieldName];
  const eventName = input.type === "checkbox" ? "change" : "blur";

  input.addEventListener(eventName, () => {
    if (form.dataset.submitted === "true") {
      validateField(fieldName);
    }
  });
});

form.addEventListener("reset", () => {
  form.dataset.submitted = "false";
  clearErrors();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  form.dataset.submitted = "true";

  const settings = getSettingsFromForm();
  const errors = validateSettings(settings);

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    statusEl.textContent = "Please fix the highlighted fields.";
    statusEl.className = "form__status form__status--error";
    return;
  }

  clearErrors();
  statusEl.textContent = "Saving...";
  statusEl.className = "form__status";

  try {
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    const data = await response.json();

    if (!response.ok) {
      showErrors(data.errors || {});
      statusEl.textContent = data.message || "Unable to save settings.";
      statusEl.className = "form__status form__status--error";
      return;
    }

    statusEl.textContent = data.message;
    statusEl.className = "form__status form__status--success";
  } catch {
    statusEl.textContent = "Network error. Try again.";
    statusEl.className = "form__status form__status--error";
  }
});
