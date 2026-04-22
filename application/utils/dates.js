const getCurrentDayOfMonth = () => {
  let today = new Date();
  let day = today.getDate();
  return day;
};

module.exports = { getCurrentDayOfMonth };
