const HomeModel = require('../../model/HomeModel');
const namuna19EmployeeModel = require('../../model/namuna/namuna19EmployeeModel');
const namuna19PaymentModel = require('../../model/namuna/namuna19PaymentModel');

const namuna19PaymentController = {
    renderMakePaymentPage: async (req, res) => {
        try {
            const _employees = await namuna19EmployeeModel.fetchAllNamuna19Employees(res.pool);

            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna19Payment/namuna-19-make-payment-page.pug', {
                employees: _employees,
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering while rendering the payment page: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Failed to render payment page. Please try again later.',
                error: err?.message,
            });
        }
    },

    fetchNamuna19PaymentHistory: async (req, res) => {
        try {
            const queryParams = req.query;

            const _paymentRecord = await namuna19PaymentModel.fetchNamuna19PaymentHistory(
                res.pool,
                queryParams
            );

            // console.log(_paymentRecord);

            return res.status(200).json({
                call: 1,
                message: 'Payment history fetched successfully!',
                paymentRecord: _paymentRecord,
            });
        } catch (err) {
            console.log(`Error while fetching the payment history : ${err.message}`);

            return res.status(500).json({
                call: 0,
                message: 'Failed to fetch payment history. Please try again later.',
                error: err?.message,
            });
        }
    },

    renderNamuna19PaymentHistoryOfEmployee: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const reqParams = req.params;
            const _paymentRecord = await namuna19PaymentModel.fetchNamuna19PaymentHistory(
                res.pool,
                reqParams
            );

            console.log(_paymentRecord)

            const _employee = await namuna19EmployeeModel.fetchNamuna19EmployeeById(
                res.pool,
                reqParams.employeeId
            );

            // console.log(_employee);

            res.render('user/namuna/namuna19Payment/namuna-19-payment-history-of-employee.pug', {
                gp: _gp[0],
                paymentRecord: _paymentRecord,
                employeeId: reqParams.employeeId,
                employee: _employee[0],
            });
        } catch (err) {
            console.log(`Error while fetching the payment history : ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Error while rendering the payment history page: ${err.message}',
                error: err?.message,
            });
        }
    },

    saveNamuna19PaymentRecord: async (req, res) => {
        try {
            const data = req.body;
            const _paymentRecord = await namuna19PaymentModel.fetchNamuna19PaymentHistory(
                res.pool,
                {
                    month: data.month,
                    year: data.year,
                    employeeId: data.employee_id_fk,
                }
            );

            if (_paymentRecord?.length > 0) {
                return res.status(422).json({
                    call: 0,
                    message:
                        'Payment record already exists for the given month, year, and employee.',
                    data: _paymentRecord,
                });
            }

            const _res = await namuna19PaymentModel.saveNamuna19PaymentRecord(res.pool, data);

            if (_res.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Payment record saved successfully!',
                });
            } else {
                return res.status(500).json({
                    call: 0,
                    message: 'Failed to save payment record. Please try again later.',
                    error: 'No payment record saved.',
                });
            }
        } catch (error) {
            console.log(`Error while saving the payment record: ${error.message}`);

            console.log('in this');

            return res.status(500).json({
                call: 0,
                message: 'Failed to save payment record. Please try again later.',
                error: error?.message,
            });
        }
    },

    deleteNamuna19PaymentRecord: async (req, res) => {
        try {
            const { id } = req.body;

            console.log(req.body);

            console.log(id);
            const _res = await namuna19PaymentModel.deleteNamuna19PaymentRecord(res.pool, id);

            console.log(_res);

            if (_res.affectedRows >= 1) {
                return res.status(201).json({
                    call: 1,
                    message: 'Payment record deleted successfully!',
                });
            }
            //  else {
            //     console.log('coming in second form');
            //     return res.status(500).json({
            //         call: 0,
            //         message: 'Failed to save payment record. Please try again later.',
            //         error: 'No payment record saved.',
            //     });
            // }
        } catch (error) {
            console.log(`Error while saving the payment record: ${error.message}`);

            return res.status(500).json({
                call: 0,
                message: 'Failed to save payment record. Please try again later.',
                error: error?.message,
            });
        }
    },

    printNamuna19PaymentRecord: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const reqParams = req.query;
            const { month, year } = req.query;
            const _paymentRecord =
                await namuna19PaymentModel.fetchNamuna19PaymentHistoryWithEmployee(
                    res.pool,
                    reqParams
                );

            res.render('user/namuna/namuna19Payment/namuna-19-payment-print.pug', {
                gp: _gp[0],
                paymentRecord: _paymentRecord,
                month,
                year,
            });
        } catch (err) {
            console.log(`Error while fetching the payment history : ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Error while rendering the payment history page: ${err.message}',
                error: err?.message,
            });
        }
    },
    printNamuna19AttendancePayment: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            const reqParams = req.query;
            const { month, year } = req.query;
            const _paymentRecord =
                await namuna19PaymentModel.fetchNamuna19PaymentHistoryWithEmployee(
                    res.pool,
                    reqParams
                );

            console.log(_paymentRecord);
            res.render('user/namuna/namuna19Payment/namuna-19-attendance-payment-print.pug', {
                gp: _gp[0],
                paymentRecord: _paymentRecord,
                month,
                year,
            });
        } catch (err) {
            console.log(`Error while fetching the payment history : ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: 'Error while rendering the payment history page: ${err.message}',
                error: err?.message,
            });
        }
    },
};

module.exports = namuna19PaymentController;
