const generateStartDate = (month, year) => {
    return `${+year}-${String(+month).padStart(2, '0')}-01`;
};

const generateEndDate = (month, year) => {
    const lastDay = new Date(+year, +month, 0).getDate();

    return `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
};

module.exports = {
    generateStartDate,
    generateEndDate
};