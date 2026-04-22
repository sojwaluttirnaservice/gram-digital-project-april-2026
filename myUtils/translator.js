/**
 * Translation loader and accessor utility
 *
 * - Loads locale JSON files into memory
 * - Enables hot-reload ONLY in development
 * - Safe for production (no file watchers)
 */

const fs = require("fs");
const path = require("path");

/**
 * Supported language codes
 * @type {string[]}
 */
const supported = ["en", "mr", "hi"];

/**
 * In-memory translations cache
 * @type {Record<string, Object>}
 */
const translations = {};

/**
 * Determine if current environment is development
 * Accepts: DEV, dev, DEVELOPMENT, development
 * @type {boolean}
 */
const isDev =
  process.env.PROJECT_ENV === "DEV" ||
  process.env.PROJECT_ENV === "dev" ||
  process.env.PROJECT_ENV === "DEVELOPMENT" ||
  process.env.PROJECT_ENV === "development";

/**
 * Load all translation JSON files into memory
 *
 * This function runs once at startup.
 * In production, translations remain static in memory.
 *
 * @returns {void}
 */
function loadTranslations() {
  for (const lang of supported) {
    const filePath = path.join(__dirname, "../public/locales", `${lang}.json`);

    try {
      translations[lang] = JSON.parse(fs.readFileSync(filePath, "utf8")) || {};
    } catch (error) {
      console.error(`❌ Translation load error for ${lang}:`, error);
      translations[lang] = {};
    }
  }
}

/**
 * Initialize file watcher for locale changes (DEV only)
 *
 * Uses chokidar to hot-reload translation files.
 * This MUST NOT run in production.
 *
 * @returns {Promise<void>}
 */
async function initWatcher() {
  try {
    const chokidar = (await import("chokidar")).default;

    const watcher = chokidar.watch(
      path.join(__dirname, "../public/locales/*.json"),
      {
        ignoreInitial: true,
        persistent: true,
      }
    );

    watcher.on("change", (filePath) => {
      const lang = path.basename(filePath, ".json");

      console.log(`🔄 Locale updated: ${lang}`);

      try {
        translations[lang] =
          JSON.parse(fs.readFileSync(filePath, "utf8")) || {};

        console.log(`✅ Reloaded ${lang}.json`);
      } catch (error) {
        console.error(`❌ Failed to reload ${lang}.json`, error);
      }
    });

    console.log("🟢 Locale watcher ENABLED (DEV)");
  } catch (error) {
    console.error("❌ Failed to initialize chokidar:", error);
  }
}

/**
 * Get the translation object for a given language
 *
 * @param {string} lang - Language code (e.g. "en")
 * @returns {Object} Translation object
 */
function getLangObject(lang) {
  return translations[lang] || {};
}

/**
 * Safe translation accessor
 *
 * @example
 * t(langObject, "navbar.top.citizenServiceApplication", "Fallback Text")
 *
 * @param {Object} langObject - Nested language object
 * @param {string} path - Dot-separated key path
 * @param {string} [fallback=""] - Fallback value if key not found
 * @returns {string} Resolved translation or fallback
 */
function t(langObject, path, fallback = "") {
  if (!langObject || typeof path !== "string") return fallback;

  try {
    return (
      path.split(".").reduce((obj, key) => {
        if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
          return obj[key];
        }
        return undefined;
      }, langObject) ?? fallback
    );
  } catch {
    return fallback;
  }
}

/**
 * Initial load (always)
 */
loadTranslations();

/**
 * Enable watcher ONLY in development
 */
if (isDev) {
  initWatcher();
} else {
  console.log("🚫 Locale watcher DISABLED (PRODUCTION)");
}

module.exports = {
  supported,
  getLangObject,
  t,
};
