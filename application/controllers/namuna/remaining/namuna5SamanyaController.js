const bankDetailsModel = require("../../../model/bankDetails/bankDetailsModel");
const namuna5ExpenditureSamanyaModel = require("../../../model/namuna/namuna5/namuna5SamanyaModel");
const namuna5SamanyaReasonsModel = require("../../../model/namuna/namuna5/namuna5SamanyaReasonsModel");
const paymentSamanyaReceiptModel = require("../../../model/payment-model/paymentSamanyaReceiptModel");
const samanyaTransactionModel = require("../../../model/transaction/samanyaTransactionModel");
const { sendApiResponse } = require("../../../utils/apiResponses");
const AppError = require("../../../utils/AppError");
const asyncHandler = require("../../../utils/asyncHandler");
const runInTransaction = require("../../../utils/runInTransaction");
const { renderPage } = require("../../../utils/sendResponse");

const namuna5SamanyaController = {
  renderNamuna5ExpenditureListPage: asyncHandler(async (req, res) => {
    const n5ExpenditureSamanyaList = await namuna5ExpenditureSamanyaModel.list(
      res.pool,
    );
    renderPage(
      res,
      "user/namuna/remaining/namuna5/5/samanya/namuna-5-expenditure-list-page.pug",
      {
        title: "नमुना ५ सामान्य खर्च",
        n5ExpenditureSamanyaList,
      },
    );
  }),

  renderNamuna5ExpenditureFormPage: asyncHandler(async (req, res) => {
    const dropdown = await namuna5SamanyaReasonsModel.dropdownList(res.pool);

    const [existingBankRecord] = await bankDetailsModel.getActiveAccountSamanya(
      res.pool,
      1,
    );

    let _dropdown = dropdown[0]?.data?.filter(({label}) => label == 'SAMANYA') || []

    // console.log("---+++++---")
    // console.log(_dropdown)
    // console.log("---+++++---")

    const mainReasons = _dropdown[0]?.mainReasons || [];

     console.log("---+++++---")
    console.log(mainReasons[0].subreasons)
    console.log("---+++++---")
    renderPage(
      res,
      "user/namuna/remaining/namuna5/5/samanya/namuna-5-expenditure-form-page.pug",
      {
        existingBankRecord,
        dropdown: _dropdown,
        mainReasons
      },
    );
  }),
  save: asyncHandler(async (req, res) => {
    const n5ExpenditureSamanyaData = req.body;

    if (n5ExpenditureSamanyaData.amount_spent <= 0) {
      throw new AppError("० किंवा त्याच्या खालील रक्कम भरू नये.", 400);
    }

    await runInTransaction(req, async (conn) => {
      const [existingBankRecord] =
        await bankDetailsModel.getActiveAccountSamanya(conn, 1);

      if (!existingBankRecord) {
        throw new Error("सामान्य खात्याची माहिती सेट करा.");
      }

      if (
        +existingBankRecord.account_balance <
        +n5ExpenditureSamanyaData.amount_spent
      ) {
        throw new Error(
          `खर्च रक्कम बँक खात्यातील रक्कमपेक्षा जास्त आहे. बॅंकेतील रक्कम : ${existingBankRecord.account_balance}`,
        );
      }

      // save details in namuna 5
      await namuna5ExpenditureSamanyaModel.save(conn, {
        ...n5ExpenditureSamanyaData,
        available_account_balance: existingBankRecord.account_balance,
        remaining_account_balance:
          existingBankRecord.account_balance -
          +n5ExpenditureSamanyaData.amount_spent,
      });


    //   this is debit, hence going offline
      await samanyaTransactionModel.debitAmount(conn, {

        ps_bank_details_id_fk: existingBankRecord.id,
        before_amount: existingBankRecord.account_balance,
        amount: n5ExpenditureSamanyaData.amount_spent,

        payment_mode: "CASH",

        debit_main_reason: n5ExpenditureSamanyaData.main_reason,
        debit_sub_reason: n5ExpenditureSamanyaData.reason_of_expenditure,
        after_amount: existingBankRecord.account_balance - n5ExpenditureSamanyaData.amount_spent,
        transaction_date: n5ExpenditureSamanyaData.payment_date
      })

      // dedcut aamount from bank balance

      await bankDetailsModel.debitBalance(
        conn,
        existingBankRecord.id,
        +n5ExpenditureSamanyaData.amount_spent,
      );
    });

    return sendApiResponse(res, 200, true, "नमुना ५ सामान्य खर्च जतन झाला.");
  }),

  // renderNamuna5ExpenditureSamanyaPrintPage: asyncHandler(async (req, res) => {

  //   const n5CollectionData =
  //     await paymentSamanyaReceiptModel.getAllPaymentsData(res.pool);

  //   const n5ExpenditureData = await namuna5ExpenditureSamanyaModel.list(
  //     res.pool,
  //   );

  //   // Step 1: Build maps for fast lookup
  //   const collectionMap = n5CollectionData.reduce((map, col) => {
  //   if (!map[col._payment_date]) map[col._payment_date] = [];
  //   map[col._payment_date].push(col);
  //   return map;
  //   }, {});

  //   const expenditureMap = n5ExpenditureData.reduce((map, exp) => {
  //   if (!map[exp._payment_date]) map[exp._payment_date] = [];
  //   map[exp._payment_date].push(exp);
  //   return map;
  //   }, {});

  //   // Step 2: Get all unique dates
  //   const allDates = Array.from(new Set([
  //   ...Object.keys(collectionMap),
  //   ...Object.keys(expenditureMap)
  //   ]));

  //   // Step 3: Merge collections with expenditures
  //   // const mergedFlattened = allDates.flatMap(date => {
  //   //   const collections = collectionMap[date] || [{ recipient_name: null, payment_amount: 0, _payment_date: date }];
  //   //   const expenditures = expenditureMap[date] || [{ payment_reciever: null, amount_spent: 0, check_no: null, _payment_date: date }];

  //   //   // For each collection, merge with all expenditures
  //   //   return collections.flatMap(col => {
  //   //     return expenditures.map(exp => ({
  //   //       ...col,
  //   //       ...exp // merge expenditure properties
  //   //     }));
  //   //   });
  //   // });
  //   const mergedFlattened = allDates.flatMap(date => {
  //   const collections = collectionMap[date] || [{ recipient_name: null, payment_amount: 0, _payment_date: date }];
  //   const expenditures = expenditureMap[date] || [{ payment_reciever: null, amount_spent: 0, check_no: null, _payment_date: date }];

  //   const maxLen = Math.max(collections.length, expenditures.length);

  //   const merged = [];
  //   for (let i = 0; i < maxLen; i++) {
  //       merged.push({
  //       ...collections[i] || { recipient_name: null, payment_amount: 0, _payment_date: date },
  //       ...expenditures[i] || { payment_reciever: null, amount_spent: 0, check_no: null, _payment_date: date }
  //       });
  //   }
  //   return merged;
  //   });

  //   console.log(mergedFlattened[0])

  //   renderPage(
  //     res,
  //     "user/namuna/remaining/namuna5/5/samanya/namuna-5-expenditure-print-page.pug",
  //     {
  //       title: "नमुना ५ प्रिंट",
  //       n5CollectionData,
  //       n5CollectionData,
  //       finalData:mergedFlattened
  //     },
  //   );
  // }),

  renderNamuna5ExpenditureSamanyaPrintPage: asyncHandler(async (req, res) => {
    let { for: forType, date, month, year, fromYear, toYear } = req.query;
    // Step 0: Fetch data
    const n5CollectionData =
      await paymentSamanyaReceiptModel.getAllPaymentsData(res.pool, {
        date,
        month,
        year,
        fromYear,
        toYear,
      });

    const n5ExpenditureData = await namuna5ExpenditureSamanyaModel.list(
      res.pool,
      { date, month, year, fromYear, toYear },
    );

    const finalData = [];

    const mergedCollections = [];
    let tempGroup = [];

    n5CollectionData.forEach((entry) => {
      if (tempGroup.length === 0) {
        tempGroup.push(entry);
        return;
      }

      const prev = tempGroup[tempGroup.length - 1];
      const isSameGroup =
        entry._payment_date === prev._payment_date &&
        entry.payment_for_desc === prev.payment_for_desc;

      if (isSameGroup && tempGroup.length < 5) {
        tempGroup.push(entry);
      } else {
        // Push merged group as a single flat object
        mergedCollections.push({
          _payment_date: tempGroup[0]._payment_date,
          payment_for_desc: tempGroup[0].payment_for_desc,
          from_id: tempGroup[0].collection_id_pk,
          payment_for: tempGroup[0].payment_for,
          to_id: tempGroup[tempGroup.length - 1].collection_id_pk,
          collection_ids: tempGroup.map((e) => e.collection_id_pk), // NEW
          count: tempGroup.length,

          //   building both
          tpl_lastBuildingTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_lastBuildingTax || 0),
            0,
          ),
          tpl_currentBuildingTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_currentBuildingTax || 0),
            0,
          ),

          // both diva tax
          tpl_lastDivaTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_lastDivaTax || 0),
            0,
          ),
          tpl_currentDivaTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_currentDivaTax || 0),
            0,
          ),

          //   both arogya
          tpl_lastArogyaTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_lastArogyaTax || 0),
            0,
          ),
          tpl_currentArogyaTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_currentArogyaTax || 0),
            0,
          ),

          //   cleaning tax
          tpl_lastCleaningTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_lastCleaningTax || 0),
            0,
          ),

          tpl_currentCleaningTax: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_currentCleaningTax || 0),
            0,
          ),

          //   both tax fine and relief
          tpl_lastTaxFine: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_lastTaxFine || 0),
            0,
          ),
          tpl_lastTaxRelief: tempGroup.reduce(
            (sum, e) => sum + Number(e.tpl_lastTaxRelief || 0),
            0,
          ),
          payment_amount: tempGroup.reduce(
            (sum, e) => sum + Number(e.payment_amount || 0),
            0,
          ),
        });

        tempGroup = [entry]; // start new group
      }
    });

    // Push last group
    if (tempGroup.length) {
      mergedCollections.push({
        _payment_date: tempGroup[0]._payment_date,
        payment_for_desc: tempGroup[0].payment_for_desc,
        from_id: tempGroup[0].collection_id_pk,
        payment_for: tempGroup[0].payment_for,
        to_id: tempGroup[tempGroup.length - 1].collection_id_pk,
        collection_ids: tempGroup.map((e) => e.collection_id_pk), // ✅ Add this
        count: tempGroup.length,
        tpl_lastBuildingTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_lastBuildingTax || 0),
          0,
        ),
        tpl_currentBuildingTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_currentBuildingTax || 0),
          0,
        ),
        tpl_lastDivaTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_lastDivaTax || 0),
          0,
        ),
        tpl_currentDivaTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_currentDivaTax || 0),
          0,
        ),
        tpl_lastArogyaTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_lastArogyaTax || 0),
          0,
        ),
        tpl_currentArogyaTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_currentArogyaTax || 0),
          0,
        ),
        //   cleaning tax
        tpl_lastCleaningTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_lastCleaningTax || 0),
          0,
        ),

        tpl_currentCleaningTax: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_currentCleaningTax || 0),
          0,
        ),

        tpl_lastTaxFine: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_lastTaxFine || 0),
          0,
        ),
        tpl_lastTaxRelief: tempGroup.reduce(
          (sum, e) => sum + Number(e.tpl_lastTaxRelief || 0),
          0,
        ),
        payment_amount: tempGroup.reduce(
          (sum, e) => sum + Number(e.payment_amount || 0),
          0,
        ),
      });
    }

    // ========= NEW CODE OF MERGE WITH RIGHT

    // Step 0: Build maps by date
    const leftMap = mergedCollections.reduce((map, item) => {
      if (!map[item._payment_date]) map[item._payment_date] = [];
      map[item._payment_date].push(item);
      return map;
    }, {});

    const rightMap = n5ExpenditureData.reduce((map, item) => {
      if (!map[item._payment_date]) map[item._payment_date] = [];
      map[item._payment_date].push(item);
      return map;
    }, {});

    // Step 1: Get all unique dates from left and right
    const allDates = Array.from(
      new Set([...Object.keys(leftMap), ...Object.keys(rightMap)]),
    ).sort(); // optional sort by date

    // Step 2: Merge left + right per date
    allDates.forEach((date) => {
      const leftRows = leftMap[date] || [];
      const rightRows = rightMap[date] || [];
      const maxLen = Math.max(leftRows.length, rightRows.length);

      for (let i = 0; i < maxLen; i++) {
        const left = leftRows[i] || null;
        const right = rightRows[i] || null;

        finalData.push({
          // LEFT SIDE
          _payment_date: left?._payment_date || right?._payment_date || "-",
          payment_for_desc: left ? left.payment_for_desc : "--",
          from_id: left ? left.from_id : "--",
          payment_for: left ? left.payment_for : null,
          to_id: left ? left.to_id : "--",

          collection_ids: left ? left.collection_ids?.join(",") : "--",

          tpl_lastBuildingTax: left ? left.tpl_lastBuildingTax || 0 : 0,
          tpl_currentBuildingTax: left ? left.tpl_currentBuildingTax || 0 : 0,

          tpl_lastDivaTax: left ? left.tpl_lastDivaTax || 0 : 0,
          tpl_currentDivaTax: left ? left.tpl_currentDivaTax || 0 : 0,

          tpl_lastArogyaTax: left ? left.tpl_lastArogyaTax || 0 : 0,
          tpl_currentArogyaTax: left ? left.tpl_currentArogyaTax || 0 : 0,

          tpl_lastCleaningTax: left ? left.tpl_lastCleaningTax || 0 : 0,
          tpl_currentCleaningTax: left ? left.tpl_currentCleaningTax || 0 : 0,

          tpl_lastTaxFine: left ? left.tpl_lastTaxFine : 0,

          tpl_lastTaxRelief: left ? left.tpl_lastTaxRelief : 0,

          payment_amount: left ? left.payment_amount : "--",

          // RIGHT SIDE
          exp_payment_date: right
            ? new Date(right.payment_date).toLocaleDateString("en-GB")
            : "--",
          check_no: right ? right.check_no || "--" : "--",
          voucher_number: right ? right.voucher_number || "--" : "--",
          payment_reciever: right ? right.payment_reciever || "--" : "--",
          reason_of_expenditure: right
            ? right.reason_of_expenditure || "--"
            : "--",
          ledger_title: right ? right.ledger_title || "--" : "--",
          amount_spent: right ? right.amount_spent || "--" : "--",
        });
      }
    });

    renderPage(
      res,
      "user/namuna/remaining/namuna5/5/samanya/namuna-5-expenditure-print-page.pug",
      {
        title: "नमुना ५ प्रिंट",
        // finalData: mergedCollections,
        finalData,
        date,
        month,
        year,
        fromYear,
        toYear,
      },
    );
  }),

  renderNamuna5SamanyaReasonsPage: asyncHandler(async (req, res) => {
    let n5SamanyaReasons = await namuna5SamanyaReasonsModel.list(res.pool);


    let mainReasons = await namuna5SamanyaReasonsModel.getMainReasons(res.pool);
    renderPage(res, "user/namuna/remaining/namuna5/5/samanya/namuna-5-samanya-reasons-page.pug", {
      title: "नमुना ५ सामान्य कारण",
      n5SamanyaReasons,
      mainReasons
    });
  }),

  saveNamuna5SamanyaReason: asyncHandler(async (req, res) => {
    let n5SamanyaReasonData = req.body;
    await namuna5SamanyaReasonsModel.save(res.pool, n5SamanyaReasonData);
    return sendApiResponse(res, 200, true, "Saved");
  }),
};

module.exports = namuna5SamanyaController;
