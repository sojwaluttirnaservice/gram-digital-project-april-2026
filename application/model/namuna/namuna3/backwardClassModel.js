const backwardClassModel = {
    create: (pool, createData) => {
        return new Promise((resolve, reject) => {
            const q = `
            INSERT INTO ps_n_3_backward_class (
                year,
                actual_total_income_year,
                backward_classes_15_percent_expense,
                budget_estimate_amount,
                actual_expenditure_amount,
                unspent_amount,
                remaining_amount_to_be_spent,
                reason_if_not_spent,
                work_name,
                expense_amount
            ) VALUES (
                ?
            )
            `;

            const insertArray = [
                createData.year,
                createData.actual_total_income_year,
                createData.backward_classes_15_percent_expense,
                createData.budget_estimate_amount,
                createData.actual_expenditure_amount,
                createData.unspent_amount,
                createData.remaining_amount_to_be_spent,
                createData.reason_if_not_spent,
                createData.work_name,
                createData.expense_amount,
            ];

            pool.query(q, [insertArray], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    update: (pool, updateData) => {
        return new Promise((resolve, reject) => {
            const q = `
                UPDATE ps_n_3_backward_class
                SET
                    actual_total_income_year = ?,
                    backward_classes_15_percent_expense = ?,
                    budget_estimate_amount = ?,
                    actual_expenditure_amount = ?,
                    unspent_amount = ?,
                    remaining_amount_to_be_spent = ?,
                    reason_if_not_spent = ?,
                    work_name = ?,
                    expense_amount = ?
                WHERE id = ?;
            `;

            const updateArray = [
                updateData.actual_total_income_year,
                updateData.backward_classes_15_percent_expense,
                updateData.budget_estimate_amount,
                updateData.actual_expenditure_amount,
                updateData.unspent_amount,
                updateData.remaining_amount_to_be_spent,
                updateData.reason_if_not_spent,
                updateData.work_name,
                updateData.expense_amount,
                updateData.id,
            ];

            pool.query(q, updateArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getByYear: (pool, year) => {
        return new Promise((resolve, reject) => {
            const q = `
                  SELECT 
                    * 
                FROM ps_n_3_backward_class
                WHERE year = ?;
            `;
            pool.query(q, [year], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },
};

module.exports = backwardClassModel;
