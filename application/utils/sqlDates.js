/**
 * Generates a SQL snippet to format a DATETIME field as
 * 'dd-mm-yyyy hh:mm:ss AM/PM' with null check and alias.
 *
 * @param {string} fieldName - The SQL DATETIME field name.
 * @returns {string} SQL formatted datetime expression.
 *
 * @example
 * // IFNULL(DATE_FORMAT(createdAt, '%d-%m-%Y %h:%i:%s %p'), '') AS _createdAt
 * fmtDateToTimestamp('createdAt');
 */
const fmtDateToTimestamp = (fieldName, aliasAs='', skipAlias = false) =>
 `IFNULL(DATE_FORMAT(${fieldName}, '%d-%m-%Y %h:%i:%s %p'), '') AS ${skipAlias ? '' : aliasAs ? aliasAs : `_${fieldName.split('.').pop()}`}`;

module.exports = {
  fmtDateToTimestamp
};
