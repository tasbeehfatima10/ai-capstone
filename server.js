const express = require("express");
const path = require("path");
const { validateSettings } = require("./lib/validateSettings");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/settings", (req, res) => {
  const result = validateSettings(req.body);

  if (!result.valid) {
    return res.status(400).json({
      message: "Validation failed.",
      errors: result.errors,
    });
  }

  return res.status(200).json({
    message: "Settings saved successfully.",
    settings: result.value,
  });
});

app.listen(PORT, () => {
  console.log(`Settings app running at http://localhost:${PORT}`);
});
