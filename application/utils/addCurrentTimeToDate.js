/**
 * Combines a date string (YYYY-MM-DD) with the current system time (24-hour format)
 * and returns a JavaScript Date object.
 *
 * @param {string} dateString - Date in 'YYYY-MM-DD' format
 * @returns {Date} A Date object with the provided date and current time
 *
 * @example
 * addCurrentTimeToDate('2026-12-04')
 * // → 2026-12-04T14:35:22.000Z (time will vary)
 */
function addCurrentTimeToDate(dateString) {
  if (!dateString) return "";
  const [y, m, d] = dateString.split("-").map(Number);
  const now = new Date();

  return new Date(
    y,
    m - 1, // Months are 0-based in JS
    d,
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );
}

module.exports = {
  addCurrentTimeToDate,
};
