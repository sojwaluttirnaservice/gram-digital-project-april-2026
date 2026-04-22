const bankDetailsModel = require("../../../model/bankDetails/bankDetailsModel");
const namuna5ExpenditureSamanyaModel = require("../../../model/namuna/namuna5/namuna5SamanyaModel");
const namuna5kSamanyaModel = require("../../../model/namuna/namuna5k/namuna5kSamanyaModel");
const namuna26Model = require("../../../model/namuna/remaining/namuna26Model");
const paymentSamanyaReceiptModel = require("../../../model/payment-model/paymentSamanyaReceiptModel");
const samanyaTransactionModel = require("../../../model/transaction/samanyaTransactionModel");
const asyncHandler = require("../../../utils/asyncHandler")
const { renderPage } = require("../../../utils/sendResponse")

const namuna26Controller = {



    renderNamuna26khPrintPage: asyncHandler(async (req, res) => {


        let filters = req.query;
        // hardcoded for now, temp provision
        if(!filters.fromYear)
            filters.fromYear = 2026;
        if(!filters.toYear)
            filters.toYear = 2027;
        let {fromYear, toYear } = filters
        // let {fromYear, toYear} = 

        let [postOfficeBankAccount] = await bankDetailsModel.getActiveAccountPostOffice(res.pool);

        let [samanyaBankAccount] = await bankDetailsModel.getActiveAccountSamanya(res.pool)

        // console.log(samanyaBankAccount)

        let namuna5ReceiptDataMonthWise = await paymentSamanyaReceiptModel.getOnlinePaymentMonthWise(res.pool, filters)

        console.log(namuna5ReceiptDataMonthWise)

    
        
        let namuna5OfflineCollection = await namuna5kSamanyaModel.getNamuna5kMonthWise(res.pool, filters)
        
        // console.log(namuna5OfflineCollection)
        // conver thsi above array into siple object (hashmap like thing whre ym will be the key which we get using the query)
        let namuna5OfflineCollectionObj = namuna5OfflineCollection.reduce((accumulator, item) =>{
            accumulator[item.ym] = item;
            return accumulator;
        }, {}); // initialzied as the empty object with no keys

        
        let lastRemainingForEachMonth = await namuna5kSamanyaModel.getLastRemaining(res.pool, filters)


        // console.log(lastRemainingForEachMonth)
        // let lastRemainingObj = lastRemainingForEachMonth.reduce((accumulator, item) => {
        //     accumulator[item.ym] = item;
        //     return accumulator;
        // }, {});

        let lastKnownOutstanding = 0;
        let lastKnownDeposited = 0;
        let lastKnownNotPaid = 0;

        /**
         * Purpose:
         * --------
         * Convert array → object (keyed by ym)
         * AND apply carry-forward logic for missing months.
         *
         * Why:
         * ----
         * - Data is inserted ONLY when deposit happens
         * - Missing month (has_data = null) means:
         *      → no update happened
         *      → previous values should continue
         *
         * So we carry forward:
         * - actual_cash_outstanding
         * - deposited_cash_amount
         * - amount_not_paid
         */

        let lastRemainingObj = lastRemainingForEachMonth.reduce((accumulator, item) => {

        let hasData = item.has_data !== null;

        let currentOutstanding = Number(item.actual_cash_outstanding);
        let currentDeposited = Number(item.deposited_cash_amount);
        let currentNotPaid = Number(item.amount_not_paid);

        if (hasData) {
            // ✅ Real entry exists → update last known values
            lastKnownOutstanding = currentOutstanding;
            lastKnownDeposited = currentDeposited;
            lastKnownNotPaid = currentNotPaid;

        } else {
            // ❌ No entry → carry forward previous values
            currentOutstanding = lastKnownOutstanding;
            currentDeposited = lastKnownDeposited;
            currentNotPaid = lastKnownNotPaid;
        }

        accumulator[item.ym] = {
            ...item,
            actual_cash_outstanding: currentOutstanding,
            deposited_cash_amount: currentDeposited,
            amount_not_paid: currentNotPaid
        };

        return accumulator;

        }, {});


        // this one gets the last row from the central ps_payment_transactions_samanya for all months, irrespecitve of its presence or not
        let lastBankAccountBalanceForEachMonth = await samanyaTransactionModel.bankaBalanceAtEachMonthLastRow(res.pool, filters)
        // console.log(lastBankAccountBalanceForEachMonth)

        let lastKnownBalance = 0;

        /**
         * Purpose:
         * --------
         * Convert the month-wise array result into an object keyed by `ym` (YYYY-MM),
         * while also correcting the bank balance continuity issue.
         *
         * Why this is needed:
         * -------------------
         * 1. The SQL query returns the "last transaction per month".
         * 2. If a month has NO transaction, SQL returns:
         *      - after_amount = 0 (via COALESCE)
         *      - has_data = null
         *
         * 3. But in financial systems:
         *      - Bank balance is a STATE (not a flow)
         *      - If no transaction occurs in a month,
         *        the balance should REMAIN SAME as previous month
         *
         * 4. Therefore:
         *      - We MUST carry forward the last known balance
         *      - We MUST NOT treat 0 as "no data"
         *
         * How we detect real vs missing data:
         * ----------------------------------
         * - has_data !== null  → real transaction exists for that month
         * - has_data === null  → no transaction (missing month)
         *
         * Logic Applied:
         * --------------
         * - If transaction exists:
         *      → take after_amount as true balance
         *      → update lastKnownBalance
         *
         * - If transaction does NOT exist:
         *      → carry forward lastKnownBalance
         *
         * Additional Benefit:
         * -------------------
         * - Converting to object gives O(1) lookup:
         *      obj["2026-04"] instead of looping array
         */

        let lastBankAccountBalanceForEachMonthObj =
        lastBankAccountBalanceForEachMonth.reduce((accumulator, item) => {

            const hasData = item.has_data !== null;   // true if actual DB row exists
            let currentBalance = Number(item.after_amount); // convert string → number

            if (hasData) {
            // Case 1: Real transaction exists for this month
            // → This is the correct closing balance for the month
            lastKnownBalance = currentBalance;

            } else {
            // Case 2: No transaction in this month
            // → Carry forward previous month's balance
            currentBalance = lastKnownBalance;
            }

            // Store corrected balance in result object
            accumulator[item.ym] = {
            ...item,
            after_amount: currentBalance
            };

            return accumulator;

        }, {});

        renderPage(res, 'user/namuna/remaining/namuna26/kh/namuna-26-kh-print-page.pug', {
            postOfficeBankAccount,
            namuna5ReceiptDataMonthWise,
            namuna5OfflineCollection,
            samanyaBankAccount,
            namuna26khEntries: [], // setting empty to not break frontend structure,
            namuna5OfflineCollectionObj,
            lastRemainingObj,
            lastBankAccountBalanceForEachMonthObj,
            ...filters
       }) 
    }),

}

module.exports = namuna26Controller