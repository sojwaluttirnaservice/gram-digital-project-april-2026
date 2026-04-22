const HomeModel = require('../../model/HomeModel');
const namuna13Model = require('../../model/namuna/namuna13Model');

const namuna13Controller = {
    renderNamuna13Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const _posts = await namuna13Model.list(res.pool);
            res.render('user/namuna/namuna13/namuna-13-page.pug', {
                gp: _gp[0],
                posts: _posts,
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 13 page : ${err.message}`);
        }
    },

    renderCreateEntryPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const { postId } = req.params;

            // console.log('her is my post id ', postId);

            const _post = await namuna13Model.getSinglePostEntry(res.pool, postId);

            // console.log(_posts);
            res.render('user/namuna/namuna13/namuna-13-create-entry-page.pug', {
                gp: _gp[0],
                post: _post || {},
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 13 page : ${err.message}`);
        }
    },

    renderEditEmployeePage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const { id } = req.params;



            const _namuna13Entry = await namuna13Model.fetchNamuna13ById(res.pool, id);

            const _post = await namuna13Model.getSinglePostEntry(res.pool, _namuna13Entry[0].post_id)
            // console.log(_namuna13Entry);

            res.render('user/namuna/namuna13/namuna-13-edit-page.pug', {
                gp: _gp[0],
                employee: _namuna13Entry[0],
                post: _post
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 13 edit page : ${err.message}`);
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
            const result = await namuna13Model.saveNamuna13Entry(res.pool, entryData);

            if (result.affectedRows >= 1) {
                res.status(201).json({
                    call: 1,
                    message: 'Entry successfully inserted!',
                    // data: result,
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

            const result = await namuna13Model.updateNamuna13Entry(res.pool, entryData);

            console.log(result);

            if (result.affectedRows >= 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully updated!',
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
            const result = await namuna13Model.deleteNamuna13Entry(res.pool, id);

            if (result.affectedRows == 1) {
                res.status(200).json({
                    call: 1,
                    message: 'Entry successfully deleted!',
                });
            } else {
                res.status(404).json({
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
            const result = await namuna13Model.fetchNamuna13ByMonthAndYear(res.pool, month, year);

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
                // data: result,
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

    fetchEntriesByYear: async (req, res) => {
        try {
            const { year } = req.query;
            const result = await namuna13Model.fetchNamuna13ByYear(res.pool, year);

            res.status(200).json({
                call: 1,
                message: 'Entries fetched successfully!',
                // data: result,
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

    renderReportPage: async (req, res) => {
        try {
            const { year, month, fromYear, toYear } = req.query;
            let reportData = [];

            if (fromYear && toYear) {
                reportData = await namuna13Model.fetchNamuna13ByYearRange(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna13Model.fetchNamuna13ByMonthAndYear(res.pool, month, year);
            } else if (year) {
                reportData = await namuna13Model.fetchNamuna13ByYearRange(res.pool, year - 1, year);
            } else {
                reportData = await namuna13Model.fetchAllNamuna13(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna13/namuna-13-report-page.pug', {
                gp: _gp[0],
                namuna13Details: reportData,
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

            if (fromYear && toYear) {
                reportData = await namuna13Model.fetchNamuna13ByYearRangeUseOrderDate(
                    res.pool,
                    fromYear,
                    toYear
                );
            } else if (month && year) {
                reportData = await namuna13Model.fetchNamuna13ByMonthAndYearUseOrderDate(res.pool, month, year);
            } else if (year) {
                reportData = await namuna13Model.fetchNamuna13ByYearRangeUseOrderDate(res.pool, year - 1, year);
            } else {
                reportData = await namuna13Model.fetchAllNamuna13(res.pool);
            }

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna13/namuna-13-print.pug', {
                gp: _gp[0],
                namuna13Details: reportData,
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

    // POST

    renderCreatePostPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna13/namuna-13-create-post-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the namuna 13 page : ${err.message}`);
        }
    },

    // CRUD

    createPost: async (req, res) => {
        try {
            const data = req.body;
            const result = await namuna13Model.createPost(res.pool, data);

            if (result.affectedRows >= 1) {
                return res
                    .status(201)
                    .json({ call: 1, message: 'Post created successfully', result });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error });
        }
    },

    // Update an existing post entry
    updatePost: async (req, res) => {

        console.log("stratosphere");
        try {
            const data = req.body;
            const result = await namuna13Model.updatePost(res.pool, data);

            console.log("stratosphere ----------------------------------------");
            console.log(data);
            console.log("stratosphere ----------------------------------------");

            // console.log(result);
            if (result.affectedRows >= 1) {

                return res
                    .status(200)
                    .json({ call: 1, message: 'Post updated successfully', result });
            } else {
                res.status(404).json({ call: 0, message: 'Post not found' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating post', error });
        }
    },

    // Delete a post entry by ID
    deletePost: async (req, res) => {
        try {
            const { id } = req.body;
            const result = await namuna13Model.deletePost(res.pool, id);

            if (result.affectedRows >= 1) {
                return res.status(200).json({ call: 1, message: 'Post deleted successfully' });
            } else {
                res.status(404).json({ call: 0, message: 'Post not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error });
        }
    },

    // Get a list of posts with optional filters
    getList: async (req, res) => {
        try {
            const filters = req.body;
            const results = await namuna13Model.list(res.pool, filters);

            res.status(200).json({ call: 1, message: 'Posts fetched successfully', results });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    },

    renderEditPostPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const { postId } = req.params;

            const _post = await namuna13Model.getSinglePostEntry(res.pool, postId);

            console.log(_post);

            res.render('user/namuna/namuna13/namuna-13-edit-post-page.pug', {
                gp: _gp[0],
                post: _post,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    },

    renderEmployeeListPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const { postId } = req.params;

            const _employees = await namuna13Model.getEmployeeList(res.pool, {
                post_id: postId,
            });

            res.render('user/namuna/namuna13/namuna-13-employee-list-page.pug', {
                gp: _gp[0],
                employees: _employees,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    },

    getEmployeeList: async (req, res) => {
        try {
            const { postId } = req.params;

            const _employees = await namuna13Model.getEmployeeList(res.pool, {
                post_id: postId,
            });

            res.status(200).json({
                call: 1,
                employees: _employees,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
            res.status(500).json({
                call: 0,
                error: error,
            });
        }
    },
};

module.exports = namuna13Controller;
