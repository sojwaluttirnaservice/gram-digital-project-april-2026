/**
 * Generates a SQL snippet to format a DATE field as 'dd-mm-yyyy' with null check and alias.
 *
 * @param {string} fieldName - The name of the SQL DATE field.
 * @returns {string} SQL expression formatting the date with alias '_fieldName'.
 *
 * @example
 * // Returns: "IFNULL(DATE_FORMAT(start_date, '%d-%m-%Y'), '') AS _start_date"
 * fmtDateField('start_date');
 */
function fmtDateField(fieldName, aliasAs='', skipAlias=false) {
  return `IFNULL(DATE_FORMAT(${fieldName}, '%d-%m-%Y'), '') AS ${skipAlias ? '' : aliasAs ? aliasAs : `_${fieldName}`} `;
}

module.exports = fmtDateField;
