const DISPLAY_NAME_MIN = 2;
const DISPLAY_NAME_MAX = 50;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_THEMES = ["light", "dark", "system"];
const ALLOWED_LANGUAGES = ["en", "es", "fr"];

function validateSettings(settings) {
  const errors = {};

  const displayName = String(settings.displayName ?? "").trim();
  if (!displayName) {
    errors.displayName = "Display name is required.";
  } else if (displayName.length < DISPLAY_NAME_MIN) {
    errors.displayName = `Display name must be at least ${DISPLAY_NAME_MIN} characters.`;
  } else if (displayName.length > DISPLAY_NAME_MAX) {
    errors.displayName = `Display name must be at most ${DISPLAY_NAME_MAX} characters.`;
  }

  const email = String(settings.email ?? "").trim();
  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const theme = String(settings.theme ?? "").trim();
  if (!ALLOWED_THEMES.includes(theme)) {
    errors.theme = "Select a valid theme.";
  }

  const language = String(settings.language ?? "").trim();
  if (!ALLOWED_LANGUAGES.includes(language)) {
    errors.language = "Select a valid language.";
  }

  const emailNotifications = settings.emailNotifications;
  if (typeof emailNotifications !== "boolean") {
    errors.emailNotifications = "Email notifications must be true or false.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: {
      displayName,
      email,
      theme,
      language,
      emailNotifications,
    },
  };
}

module.exports = {
  validateSettings,
  DISPLAY_NAME_MIN,
  DISPLAY_NAME_MAX,
  ALLOWED_THEMES,
  ALLOWED_LANGUAGES,
};
