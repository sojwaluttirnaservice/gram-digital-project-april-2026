const HomeModel = require('../../model/HomeModel');
const namuna15Model = require('../../model/namuna/namuna15Model');

const namuna15Controller = {
    renderNamuna15Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            res.render('user/namuna/namuna15/namuna-15-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering namuna 15 page: ${err}`);
        }
    },

    renderNamuna15PrintPage: async (req, res) => {
        try {
            const { fromYear, toYear } = req.query;
            let _namuna15Details;

            const _gp = await HomeModel.getGpData(res.pool);

            if (fromYear && toYear) {
                _namuna15Details = await namuna15Model.fetchByYearRange(res.pool, req.query);
            } else {
                _namuna15Details = await namuna15Model.fetchAll(res.pool);
            }

            res.render('user/namuna/namuna15/namuna-15-print.pug', {
                fromYear,
                toYear,
                namuna15Details: _namuna15Details,
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering namuna 15 print page: ${err}`);
        }
    },

    renderNamuna15ReportPage: async (req, res) => {
        try {
            const { fromYear, toYear } = req.query;
            let _namuna15Details;

            const _gp = await HomeModel.getGpData(res.pool);

            if (fromYear && toYear) {
                _namuna15Details = await namuna15Model.fetchByYearRange(res.pool, req.query);
            } else {
                _namuna15Details = await namuna15Model.fetchAll(res.pool);
            }

            res.render('user/namuna/namuna15/namuna-15-report-page.pug', {
                fromYear,
                toYear,
                namuna15Details: _namuna15Details,
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering namuna 15 report page: ${err}`);
        }
    },

    renderEditNamuna15Page: async (req, res) => {
        try {
            const { fromYear, toYear } = req.query;
            let _namuna15Details;

            const _gp = await HomeModel.getGpData(res.pool);

            if (fromYear && toYear) {
                _namuna15Details = await namuna15Model.fetchByYearRange(res.pool, req.query);
            } else {
                _namuna15Details = await namuna15Model.fetchAll(res.pool);
            }

            res.render('user/namuna/namuna15/namuna-15-edit-page.pug', {
                fromYear,
                toYear,
                namuna15Details: _namuna15Details,
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering namuna 15 edit page: ${err}`);
        }
    },

    insertBulk: async (req, res) => {
        try {
            const bulkData = req.body;
            const result = await namuna15Model.insertBulk(bulkData);

            if (result.call == 1) {
                res.status(200).json({
                    call: true,
                    message: 'Bulk entries successfully inserted!',
                    data: result,
                });
            }
        } catch (error) {
            console.error('Error inserting bulk entries:', error);
            res.status(500).json({
                call: false,
                message: 'Failed to insert bulk entries. Please try again later.',
                error: error.message,
            });
        }
    },

    updateNamuna15SingleEntry: async (req, res) => {
        try {
            const updateResult = await namuna15Model.updateNamuna15SingleEntry(res.pool, req.body);

            if (updateResult.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Successfully updated the entry!',
                });
            }
        } catch (err) {
            console.log(`Error while updating the single entry: ${err}`);
            return res.status(500).json({
                call: 0,
                error: err,
            });
        }
    },

    updateBulk: async (req, res) => {
        try {
            const bulkData = req.body;
            const result = await namuna15Model.updateBulk(bulkData);

            res.status(200).json({
                call: 1,
                message: 'Bulk entries successfully updated!',
                data: result,
            });
        } catch (error) {
            console.error('Error updating bulk entries:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to update bulk entries. Please try again later.',
                error: error.message,
            });
        }
    },

    deleteNamuna15SingleEntry: async (req, res) => {
        try {
            const data = req.body;
            const deleteResult = await namuna15Model.deleteNamuna15SingleEntry(res.pool, data);

            if (deleteResult.affectedRows == 1) {
                return res.status(200).json({
                    call: 1,
                    message: 'Successfully deleted the entry!',
                });
            }
        } catch (err) {
            console.log(`Error while deleting the namuna 15 entry: ${err}`);
            return res.status(500).json({
                call: 0,
                error: err,
            });
        }
    },

    insertSingleEntry: async (req, res) => {
        try {
            const entryData = req.body;
            const result = await namuna15Model.insertSingleEntry(entryData);

            if (result.affectedRows >= 1) {
                res.status(201).json({
                    call: 1,
                    message: 'Single entry successfully inserted!',
                    data: result,
                });
            }
        } catch (error) {
            console.error('Error inserting single entry:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to insert single entry. Please try again later.',
                error: error.message,
            });
        }
    },

    fetchAll: async (req, res) => {
        try {
            const { fromYear, toYear } = req.query;

            console.log(fromYear, toYear)
            let _namuna15Details;

            if (fromYear && toYear) {
                _namuna15Details = await namuna15Model.fetchByYearRange(res.pool, req.query);
            } else {
                _namuna15Details = await namuna15Model.fetchAll(res.pool);
            }
            console.log(_namuna15Details)

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
                namuna15Details: _namuna15Details || [],
            });
        } catch (error) {
            console.error('Error fetching entries:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries. Please try again later.',
                error: error.message,
            });
        }
    },

    fetchById: async (req, res) => {
        try {
            const result = await namuna15Model.fetchById(req.params.id);
            if (!result) {
                return res.status(404).json({
                    call: 0,
                    message: 'Entry not found.',
                });
            }
            res.status(200).json({
                call: 1,
                message: 'Entry fetched successfully!',
                data: result,
            });
        } catch (error) {
            console.error('Error fetching entry by ID:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entry. Please try again later.',
                error: error.message,
            });
        }
    },

    fetchByYearRange: async (req, res) => {
        try {
            const yearRange = {
                startYear: req.body.startYear,
                endYear: req.body.endYear,
            };
            const result = await namuna15Model.fetchByYearRange(yearRange);
            res.status(200).json({
                call: 1,
                message: 'Entries fetched by year range successfully!',
                data: result,
            });
        } catch (error) {
            console.error('Error fetching entries by year range:', error);
            res.status(500).json({
                call: 0,
                message: 'Failed to fetch entries by year range. Please try again later.',
                error: error.message,
            });
        }
    },
};

module.exports = namuna15Controller;
