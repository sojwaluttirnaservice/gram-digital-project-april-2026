// -------------------------------------------
// CONSTANTS
// -------------------------------------------

// Key name used in localStorage to remember user's language choice
const localStorageLangKeyName = "website_lang_preference";

// Gets the existing saved language (if any) from localStorage
let savedLanguagePreference = localStorage.getItem(localStorageLangKeyName);

// Function to redirect the page to the selected language
// Uses "_self" to open in the SAME tab

// const redirectWithChosenLanguage = (chosenLanguage) => {
//   window.open(`${location.origin}?lang=${chosenLanguage}`, "_self");
// };

const redirectWithChosenLanguage = (chosenLanguage) => {
  const url = new URL(window.location.href); // Get current URL
  url.searchParams.set("lang", chosenLanguage); // Add or update 'lang'
  window.location.href = url.toString(); // Redirect in same tab
};

// Language that the page is currently loaded with
// This value is set in Pug, e.g.:
// script.
//   window.siteLanguage = "#{language}";
const siteLoadedWithLanguage = window.siteLanguage;

// -------------------------------------------
// LANGUAGE CHECK ON PAGE LOAD
// -------------------------------------------

// If user already has a saved language preference
if (savedLanguagePreference) {
//   console.log("Saved language preference:", savedLanguagePreference);

  // If the loaded page language does NOT match the saved preference,
  // redirect to the saved preferred language.
  if (siteLoadedWithLanguage !== savedLanguagePreference) {
    redirectWithChosenLanguage(savedLanguagePreference);
  }
}

// -------------------------------------------
// DROPDOWN HANDLING (when user selects a new language)
// -------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

  // Get all language selection dropdown elements by class
  const langDropdowns = document.querySelectorAll(".lang-dropdown");

  // Only run this if at least one dropdown exists on the page
  if (langDropdowns.length > 0) {
    langDropdowns.forEach((dropdown) => {
      dropdown.addEventListener("change", function () {
        let selectedLanguage = this.value;

        // Save user's chosen language in localStorage
        localStorage.setItem(localStorageLangKeyName, selectedLanguage);

        // Redirect page with new language
        redirectWithChosenLanguage(selectedLanguage);
      });
    });
  }
});
