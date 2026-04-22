const HomeModel = require('../../model/HomeModel');
const namuna19EmployeeModel = require('../../model/namuna/namuna19EmployeeModel');

const namuna19EmployeeController = {
    renderNamuna19EmployeePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            // if (fromYear && toYear) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByYearRange(
            //         res.pool,
            //         fromYear,
            //         toYear
            //     );
            // } 
            // else if (month && year) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByMonthAndYear(res.pool, month, year);
            // } else if (year) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByYearRange(res.pool, year - 1, year);
            // }
            //  else {
                reportData = await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);
            // }

            res.render('user/namuna/namuna19Employee/namuna-19-employee-page.pug', {
                gp: _gp[0],
                namuna19EmployeeDetails: reportData,
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 19 employee page: ${err.message}`);
        }
    },

    renderNamuna19EmployeeCreatePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna19Employee/namuna-19-employee-create-entry-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 19 employee create page: ${err.message}`);
        }
    },

    renderEditNamuna19EmployeePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;
            const _namuna19EmployeeEntry = await namuna19EmployeeModel.fetchNamuna19EmployeeById(res.pool, id);

            res.render('user/namuna/namuna19Employee/namuna-19-employee-edit-page.pug', {
                gp: _gp[0],
                namuna19EmployeeEntry: _namuna19EmployeeEntry[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 19 employee edit page: ${err.message}`);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: err?.message,
            });
        }
    },

    insertEntry: async (req, res) => {
        try {
            const entryData = req.body;
            const result = await namuna19EmployeeModel.saveNamuna19EmployeeEntry(res.pool, entryData);

            if (result.affectedRows >= 1) {
                res.status(201).json({
                    call: 1,
                    message: 'Entry successfully inserted!',
                });
            }
        } catch (error) {
            console.error('Error inserting entry:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to insert entry. Please try again later.',
                error: error?.message,
            });
        }
    },

    updateEntry: async (req, res) => {
        try {
            const entryData = req.body;
            const result = await namuna19EmployeeModel.updateNamuna19EmployeeEntry(res.pool, entryData);

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully updated!',
                });
            } else {
                res.status(404).json({
                    call: 0,
                    message: 'Entry not found!',
                });
            }
        } catch (error) {
            console.error('Error updating entry:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to update entry. Please try again later.',
                error: error?.message,
            });
        }
    },

    deleteEntry: async (req, res) => {
        try {
            const { id } = req.body;
            const result = await namuna19EmployeeModel.deleteNamuna19EmployeeEntry(res.pool, id);

            if (result.affectedRows == 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully deleted!',
                });
            } else {
                res.status(500).json({
                    call: 0,
                    message: 'Entry not found!',
                });
            }
        } catch (error) {
            console.error('Error deleting entry:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to delete entry. Please try again later.',
                error: error?.message,
            });
        }
    },

    fetchEntriesByMonthAndYear: async (req, res) => {
        try {
            const { month, year } = req.query;
            const result = await namuna19EmployeeModel.fetchNamuna19EmployeeByMonthAndYear(res.pool, month, year);

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
            });
        } catch (error) {
            console.error('Error fetching entries:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: error?.message,
            });
        }
    },

    fetchAllNamuna19EmployeeEntries: async (req, res) => {

       
        try {

            let _namuna19Employee;
            // _namuna19Employee= await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);

            // const { fromYear, toYear } = req.query;

            // if (fromYear && toYear) {
            //     _namuna19Employee = await namuna19EmployeeModel.fetchNamuna19EmployeeByYearRangeWithGroup(res.pool, fromYear, toYear);
            // } else {
                _namuna19Employee = await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);
            // }

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
                namuna19EmployeeDetails: _namuna19Employee,
            });
        } catch (error) {
            console.error('Error fetching entries by year:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: error?.message,
            });
        }
    },

    // fetchEntriesByYear: async (req, res) => {
    //     try {
    //         const { year } = req.query;
    //         const result = await namuna19EmployeeModel.fetchNamuna19EmployeeByYear(res.pool, year);

    //         res.status(200).json({
    //             call: 1,
    //             message: 'Entries fetched successfully!',
    //         });
    //     } catch (error) {
    //         console.error('Error fetching entries by year:', error);
    //         res.status(500).json({
    //             call: 0,
    //             message: 'Failed to fetch entries. Please try again later.',
    //             error: error?.message,
    //         });
    //     }
    // },

    renderReportPage: async (req, res) => {
        try {
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            // if (fromYear && toYear) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByYearRangeWithGroup(
            //         res.pool,
            //         fromYear,
            //         toYear
            //     );
            // } 
            // else if (month && year) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByMonthAndYear(res.pool, month, year);
            // } else if (year) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByYearRangeWithGroup(res.pool, year - 1, year);
            // } 
            // else {
                reportData = await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);
            // }

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna19Employee/namuna-19-employee-report-page.pug', {
                gp: _gp[0],
                namuna19EmployeeDetails: JSON.stringify(reportData),
                year: year,
                month: month,
                fromYear: fromYear,
                toYear: toYear,
            });
        } catch (err) {
            console.error('Error rendering the report page:', err);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: err?.message,
            });
        }
    },

    renderPrintPage: async (req, res) => {
        try {
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            // console.log(fromYear, toYear);

            // if (fromYear && toYear) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByYearRangeWithGroup(
            //         res.pool,
            //         fromYear,
            //         toYear
            //     );
            // } else if (month && year) {
            //     console.log("in print page for month and year");
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByMonthAndYear(res.pool, month, year);
            //     console.log(reportData);
            // } else if (year) {
            //     reportData = await namuna19EmployeeModel.fetchNamuna19EmployeeByYearRangeWithGroup(res.pool, year - 1, year);
            // }
            //  else {
                reportData = await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);
            // }

            const _gp = await HomeModel.getGpData(res.pool);

            // console.log(reportData);

            res.render('user/namuna/namuna19Employee/namuna-19-employee-print.pug', {
                gp: _gp[0],
                namuna19EmployeeDetails: JSON.stringify(reportData),
                year: year,
                month: month,
                fromYear: fromYear,
                toYear: toYear,
            });
        } catch (err) {
            console.error('Error rendering print page:', err);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: err?.message,
            });
        }
    },
};

module.exports = namuna19EmployeeController;
