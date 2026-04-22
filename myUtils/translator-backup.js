const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const supported = ["en", "mr", "hi"];
const translations = {};

// Helper: deep clone (to avoid accidental mutations)
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Load all locale JSON files once
function loadTranslations() {
  for (const lang of supported) {
    const filePath = path.join(__dirname, "../public/locales", `${lang}.json`);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      translations[lang] = data || {};
    } catch (err) {
      console.error("Translation load error for:", lang, err);
      translations[lang] = {};
    }
  }
}

// Initial load
loadTranslations();

// Watch for changes in locale files (Hot Reload)
const watcher = chokidar.watch(path.join(__dirname, "../public/locales/*.json"), {
  ignoreInitial: true
});

watcher.on("change", (filePath) => {
  const lang = path.basename(filePath, ".json");
  console.log(`Locale updated: ${lang}`);

  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    
    // Deep overwrite without losing reference
    if (!translations[lang]) translations[lang] = {};
    const target = translations[lang];

    // Clear old keys
    for (const key in target) delete target[key];
    // Assign new data
    Object.assign(target, data);

    console.log(`Reloaded ${lang}.json`);
  } catch (err) {
    console.error(`Failed to reload ${lang}.json`, err);
  }
});

// Function to return the language object safely
function getLangObject(lang) {
  return translations[lang] || {};
}

/**
 * Safe translation accessor
 * @param {Object} langObject - the nested language object
 * @param {string} path - dot-separated key path e.g. "navbar.top.citizenServiceApplication"
 * @param {string} fallback - fallback text if key is missing
 */
function t(langObject, path, fallback = "") {
  if (!langObject || typeof path !== "string") return fallback;

  try {
    return path.split(".").reduce((obj, key) => {
      if (obj && Object.prototype.hasOwnProperty.call(obj, key)) return obj[key];
      return undefined;
    }, langObject) ?? fallback;
  } catch {
    return fallback;
  }
}

module.exports = { getLangObject, supported, t };
