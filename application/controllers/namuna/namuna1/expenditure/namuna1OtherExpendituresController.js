const HomeModel = require('../../../../model/HomeModel');
const namuna1OtherExpendituresModel = require('../../../../model/namuna/namuna1/expenditure/namuna1OtherExpendituresModel');

const namuna1OtherExpendituresController = {
    // 1. Render the main page for Other Expenditures
    renderNamuna1OtherExpendituresPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            // Fetch data as needed, example: fetching a list of records for display
            const reportData = await namuna1OtherExpendituresModel.fetchAllNamuna1OtherExpenditures(
                res.pool
            );

            res.render(
                'user/namuna/namuna1/expenditure/other-expenditures/namuna-1-other-expenditures-page.pug',
                {
                    namuna1OtherExpenditures: reportData,
                    gp: _gp[0],
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error while rendering the Namuna 1 Other Expenditures page',
                error: error.message,
            });
        }
    },

    // 2. Render the page to create a new Other Expenditures record
    renderNamuna1OtherExpendituresCreatePage: async (req, res) => {
        const _gp = await HomeModel.getGpData(res.pool);
        try {
            // Additional data can be fetched as needed for the page (e.g., lists, settings)
            res.render(
                'user/namuna/namuna1/expenditure/other-expenditures/namuna-1-other-expenditures-create-entry-page.pug',
                {
                    gp: _gp[0],
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error while rendering the create entry page',
                error: error.message,
            });
        }
    },

    // 3. Render the page to edit an existing Other Expenditures record
    renderEditNamuna1OtherExpendituresPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { id } = req.params;

            const record = await namuna1OtherExpendituresModel.fetchNamuna1OtherExpendituresById(
                res.pool,
                id
            );

            res.render(
                'user/namuna/namuna1/expenditure/other-expenditures/namuna-1-other-expenditures-edit-page.pug',
                {
                    namuna1OtherExpenditures: record[0],
                    gp: _gp[0],
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error while rendering the edit entry page',
                error: error.message,
            });
        }
    },

    // 4. Render the print page for Other Expenditures
    renderNamuna1OtherExpendituresPrint: async (req, res) => {
        try {
            const { year, month } = req.query;
            let reportData = [];
            const _gp = await HomeModel.getGpData(res.pool);

            if (year && month) {
                reportData =
                    await namuna1OtherExpendituresModel.fetchNamuna1OtherExpendituresByYearAndMonth(
                        res.pool,
                        year,
                        month
                    );
            } else if (year) {
                reportData =
                    await namuna1OtherExpendituresModel.fetchNamuna1OtherExpendituresByYear(
                        res.pool,
                        year
                    );
            } else {
                reportData = await namuna1OtherExpendituresModel.fetchAllNamuna1OtherExpenditures(
                    res.pool
                );
            }

            res.render(
                'user/namuna/namuna1/expenditure/other-expenditures/namuna-1-other-expenditures-print.pug',
                {
                    reportData,
                    year,
                    month,
                    gp: _gp[0],
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error while rendering the print page',
                error: error.message,
            });
        }
    },

    // 5. Save new Other Expenditures data
    saveNamuna1OtherExpenditures: async (req, res) => {
        try {
            const data = req.body; // Assuming data is coming from the request body
            const result = await namuna1OtherExpendituresModel.saveNamuna1OtherExpenditures(
                res.pool,
                data
            );

            // Check if affected rows are greater than or equal to 1
            if (result.affectedRows >= 1) {
                res.status(201).json({
                    call: 1,
                    message: 'Other expenditures data saved successfully',
                    result: result,
                });
            } else {
                res.status(400).json({
                    call: 0,
                    message: 'No data saved, please check the input data.',
                    result: result,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error saving other expenditures data',
                error: error.message,
            });
        }
    },

    // 6. Create new Other Expenditures record
    createNamuna1OtherExpenditures: async (req, res) => {
        try {
            const data = req.body;
            const result = await namuna1OtherExpendituresModel.createNamuna1OtherExpenditures(
                res.pool,
                data
            );

            if (result.affectedRows >= 1) {
                res.status(201).json({
                    call: 1,
                    message: 'Other expenditures record created successfully',
                    result: result,
                });
            } else {
                res.status(400).json({
                    call: 0,
                    message: 'Failed to create record, please check the input data.',
                    result: result,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error creating other expenditures record',
                error: error.message,
            });
        }
    },

    // 7. Update an existing Other Expenditures record by ID
    updateNamuna1OtherExpenditures: async (req, res) => {
        try {
            

            const data = req.body;
            const result = await namuna1OtherExpendituresModel.updateNamuna1OtherExpenditures(
                res.pool,
                
                data
            );

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Other expenditures record updated successfully',
                    result: result,
                });
            } else {
                res.status(404).json({
                    call: 0,
                    message: 'No record found to update with the provided ID',
                    result: result,
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                call: 0,
                message: 'Error updating other expenditures record',
                error: error.message,
            });
        }
    },

    // 8. Delete an Other Expenditures record by ID
    deleteNamuna1OtherExpenditures: async (req, res) => {
        try {
            const id = req.body.id;
            const result = await namuna1OtherExpendituresModel.deleteNamuna1OtherExpenditures(
                res.pool,
                id
            );

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Other expenditures record deleted successfully',
                    result: result,
                });
            } else {
                console.log(result);
                res.status(404).json({
                    call: 0,
                    message: 'No record found to delete with the provided ID',
                    result: result,
                });
            }
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error deleting other expenditures record',
                error: error.message,
            });
        }
    },

    // 9. Fetch Other Expenditures by year
    fetchNamuna1OtherExpendituresByYear: async (req, res) => {
        try {
            const year = req.params.year;
            const result = await namuna1OtherExpendituresModel.fetchNamuna1OtherExpendituresByYear(
                res.pool,
                year
            );

            if (result.length > 0) {
                res.status(200).json({
                    call: 1,
                    message: 'Other expenditures data fetched successfully',
                    result: result,
                });
            } else {
                res.status(404).json({
                    call: 0,
                    message: 'No records found for the provided year',
                    result: result,
                });
            }
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error fetching other expenditures data by year',
                error: error.message,
            });
        }
    },

    // 10. Fetch Other Expenditures by ID
    fetchNamuna1OtherExpendituresById: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await namuna1OtherExpendituresModel.fetchNamuna1OtherExpendituresById(
                res.pool,
                id
            );

            if (result.length > 0) {
                res.status(200).json({
                    call: 1,
                    message: 'Other expenditures data fetched successfully',
                    result: result,
                });
            } else {
                res.status(404).json({
                    call: 0,
                    message: 'No record found for the provided ID',
                    result: result,
                });
            }
        } catch (error) {
            res.status(500).json({
                call: 0,
                message: 'Error fetching other expenditures data by ID',
                error: error.message,
            });
        }
    },
};

module.exports = namuna1OtherExpendituresController;
