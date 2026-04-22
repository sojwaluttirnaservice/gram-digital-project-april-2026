let FormEightModel = require('../model/HomeModel');
let FormNineModel = require('../model/FormNightModel');
let MarriageModel = require('../model/MarriageModel');
let CertificateModel = require('../model/CertificateModel');
let FormPrintModel = require('../model/FormPrintModel');
let TaxPayerModel = require('../model/TaxPayerModel');
let SelfDeclarationModal = require('../model/SelfDeclarationModal');
let ZPModel = require('../model/ZPModel');
const HomeModel = require('../model/HomeModel');
const { myDate } = require('../config/_responderSet');
const formEightModel2 = require('../model/Form_8/formEightModel');
const qrCodeModel = require('../model/qrCode/qrCodeModel');
const { baseDir } = require('./createBaseDir');
const { sendError, renderPage } = require('../utils/sendResponse');
const asyncHandler = require('../utils/asyncHandler');
const { sendApiResponse } = require('../utils/apiResponses');
const TaxPaymentModel = require('../model/isTaxPaid/TaxPaymentModel');
let FromPrintController = {
    homeView: function (req, res, next) {
        res.redirect('/');
    },

    printFormEightSinglePlain: asyncHandler(async (req, res) => {

        const queryData = req.query
        const { id: form8UserId, y1, y2 } = queryData;


        if (form8UserId == 'undefined' || isNaN(form8UserId) || form8UserId < 1) {
            return sendApiResponse(res, 400, false, 'Form 8 User id not found or Invalid form 8 user id')
        }

        // fetch fomr 8 user data 
        const [userData] = await FormEightModel.formEightUser(res.pool, queryData);


        const allOldOwnerList = await HomeModel.getOldOwnerList(res.pool, form8UserId)

        const totalTaxSample = await FormEightModel.getFromEightTaxSampleData(res.pool, queryData);



        const totalTaxArray = await FormEightModel.getFromEightTaxTotalData(res.pool, queryData);

        // let waterTaxAmount =
        // 	userData.feu_water_tax === 'सामान्य पाणीकर'
        // 		? 150
        // 		: userData.feu_water_tax === 'विशेष पाणीकर'
        // 			? 1200
        // 			: 0

        let waterTaxAmount = 0; // TEMPORARY ZERO


        let [qrCodes] = await qrCodeModel.qrCodeList(res.pool)
        renderPage(res, 'user/print/pageFormEightSingleNoImage',
            {
                userData,
                waterTaxAmount,
                totalTaxSample,
                totalTaxArray,
                allOldOwnerList,
                y1,
                qrCodes: qrCodes || {},
                y2,
            }
        )
    }),

    printFromEight: asyncHandler(async (req, res) => {

        const queryData = req.query
        const { id: form8UserId, y1, y2 } = queryData;


        if (form8UserId == 'undefined' || isNaN(form8UserId) || form8UserId < 1) {
            return sendApiResponse(res, 400, false, 'Form 8 User id not found or Invalid form 8 user id')
        }

        // fetch fomr 8 user data 
        const [userData] = await FormEightModel.formEightUser(res.pool, queryData);


        const allOldOwnerList = await HomeModel.getOldOwnerList(res.pool, form8UserId)

        const totalTaxSample = await FormEightModel.getFromEightTaxSampleData(res.pool, queryData);



        const totalTaxArray = await FormEightModel.getFromEightTaxTotalData(res.pool, queryData);

        // let waterTaxAmount =
        // 	userData.feu_water_tax === 'सामान्य पाणीकर'
        // 		? 150
        // 		: userData.feu_water_tax === 'विशेष पाणीकर'
        // 			? 1200
        // 			: 0

        let waterTaxAmount = 0; // TEMPORARY ZERO


        let [qrCodes] = await qrCodeModel.qrCodeList(res.pool)
        renderPage(res, 'user/print/pageFormEightSingle',
            {
                userData,
                waterTaxAmount,
                totalTaxSample,
                totalTaxArray,
                allOldOwnerList,
                y1,
                qrCodes: qrCodes || {},
                y2,
            }
        )
    }),

    /*
    // OLD CODE DONT DELETE
    printFromEight: async function (req, res, next) {
        let data = req.query;

        let userData = {};
        let totalArray = [];
        let totalTaxSample = [];
        let zpData = {};
        let allOldOwnerList;

        const bankQRCodeList = await qrCodeModel.qrCodeList(res.pool);

        if (typeof data.id == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.y1 == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.y2 == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (isNaN(Number(data.id))) {
            res.status(502).send('Invalid Data');
            return false;
        }
        HomeModel.getOldOwnerList(res.pool, data.id)
            .then((result) => {
                let allFerfarList = result;
                return allFerfarList;
            })
            .then((allFerfarList) => {
                allOldOwnerList = allFerfarList;

                return ZPModel.getZpDetails(res.pool);
            })
            .then((result) => {
                zpData = result[0];
                return FormEightModel.formEightUser(res.pool, data);
            })
            .then((result) => {
                if (result.length == 0) {
                    res.status(200).send({ call: 'Invalid Data Passes' });
                    return 999;
                } else {
                    userData = result[0];
                    return FormEightModel.getFromEightTaxTotalData(res.pool, data);
                }
            })
            .then((result) => {
                if (result != 999) {
                    totalArray = result;
                    return FormEightModel.getFromEightTaxSampleData(res.pool, data);
                } else {
                    return 999;
                }
            })
            .then(async (result) => {
                if (result != 999) {
                    totalTaxSample = result;
                    // let waterTaxAmount =
                    // 	userData.feu_water_tax === 'सामान्य पाणीकर'
                    // 		? 150
                    // 		: userData.feu_water_tax === 'विशेष पाणीकर'
                    // 			? 1200
                    // 			: 0
                    
                    let waterTaxAmount = 0; // TEMPORARY ZERO
                    console.log(userData);
                    renderPage(res, 'user/print/pageFormEightSingle', {
                        userData: userData,
                        waterTaxAmount,
                        totalArray: totalArray,
                        totalTaxSample: totalTaxSample,
                        y1: data.y1,
                        y2: data.y2,
                        zp: zpData,
                        ownerList: allOldOwnerList,
                        bankQrCodeName:
                            bankQRCodeList?.length > 0
                                ? bankQRCodeList[0]?.bank_qr_code_image_name
                                : null,
                        showBankQrCode:
                            bankQRCodeList?.length > 0
                                ? bankQRCodeList[0]?.show_bank_qr_code_image
                                : 0,
                        bankQrCodePath: '/new-gp-page/main-page/files/qr-codes',
                    });
                }
            })
            .catch((error) => {
                res.status(200).send({ call: error });
            });
    },

*/
    printFromEightImage: asyncHandler(async (req, res) => {

        const queryData = req.query;

        const { id: form8UserId, y1, y2 } = queryData;


        if (form8UserId == 'undefined' || isNaN(form8UserId) || form8UserId < 1) {
            return sendApiResponse(res, 400, false, 'Form 8 User id not found or Invalid form 8 user id')
        }

        // fetch fomr 8 user data 
        const [userData] = await FormEightModel.formEightUser(res.pool, queryData);


        const allOldOwnerList = await HomeModel.getOldOwnerList(res.pool, form8UserId)

        const totalTaxSample = await FormEightModel.getFromEightTaxSampleData(res.pool, queryData);



        const totalTaxArray = await FormEightModel.getFromEightTaxTotalData(res.pool, queryData);

        // let waterTaxAmount =
        // 	userData.feu_water_tax === 'सामान्य पाणीकर'
        // 		? 150
        // 		: userData.feu_water_tax === 'विशेष पाणीकर'
        // 			? 1200
        // 			: 0

        let waterTaxAmount = 0; // TEMPORARY ZERO

        const [qrCodes] = await qrCodeModel.qrCodeList(res.pool)


        renderPage(res, 'user/print/pageFormEightImageSingle',
            {
                qrCodes: qrCodes || {},
                userData,
                waterTaxAmount,
                totalTaxSample,
                userDataString: JSON.stringify([userData]),
                totalTaxArray,
                allOldOwnerList,
                y1,
                y2,
            }
        )
    }),

    /*

    printFromEightImage: function (req, res, next) {
        let data = req.query;
        let userData = {};
        let totalArray = [];
        let totalTaxSample = [];
        let zpData = {};

        if (typeof data.id == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.y1 == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.y2 == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (isNaN(Number(data.id))) {
            res.status(502).send('Invalid Data');
            return false;
        }
        let allOldOwnerList;
        HomeModel.getOldOwnerList(res.pool, data.id)
            .then((result) => {
                let allFerfarList = result;
                return allFerfarList;
            })
            .then((allFerfarList) => {
                allOldOwnerList = allFerfarList;
                return ZPModel.getZpDetails(res.pool);
            })
            .then((result) => {
                zpData = result[0];
                return FormEightModel.formEightUser(res.pool, data);
            })
            .then((result) => {
                if (result.length == 0) {
                    res.status(200).send({ call: 'Invalid Data Passes' });
                    return 999;
                } else {
                    userData = result[0];
                    return FormEightModel.getFromEightTaxTotalData(res.pool, data);
                }
            })
            .then((result) => {
                if (result != 999) {
                    totalArray = result;
                    return FormEightModel.getFromEightTaxSampleData(res.pool, data);
                } else {
                    return 999;
                }
            })
            .then((result) => {
                if (result != 999) {
                    totalTaxSample = result;
                    // let waterTaxAmount =
                    // 	userData.feu_water_tax === 'सामान्य पाणीकर'
                    // 		? 150
                    // 		: userData.feu_water_tax === 'विशेष पाणीकर'
                    // 			? 1200
                    // 			: 0

                    let waterTaxAmount = 0; // TEMPORARY ZERO
                    res.render('user/print/pageFormEightImageSingle', {
                        userData: userData,
                        waterTaxAmount,
                        totalArray: totalArray,
                        userDataString: JSON.stringify([userData]),
                        totalTaxSample: totalTaxSample,
                        y1: data.y1,
                        y2: data.y2,
                        zp: zpData,
                        ownerList: allOldOwnerList,
                    });
                }
            })
            .catch((error) => {
                res.status(200).send({ call: error });
            });
    },
*/

    printpPageForm8KarNihayYadiAndOther: asyncHandler(async (req, res) => {
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];
        let zp_data = {};
        let start = 0;
        let count = 0;
        let finalArray = [];

        let queryRes = await FormPrintModel.getDistinctMalmattaCountExcludingOblique(res.pool)

        const data = await FormPrintModel.printForm8All(res.pool, y1, y2);

        // let pages = Math.ceil(data.length / 25);

        // for (let i = 0; i < pages; i++) {
        //   start = count * 25;
        //   let array1 = data.slice(start, start + 25);
        //   finalArray.push(array1);
        //   count++;
        // }

        return renderPage(res, 'user/print/pageForm8All', {
            data,
            // pages,
            year: { year1, year2 },
            distinct_malmatta_count: queryRes[0]?.distinct_malmatta_count || 0
        })
    }),


    printpPageForm8KarNihayYadi: asyncHandler(async (req, res) => {
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];
        let zp_data = {};
        let start = 0;
        let count = 0;
        let finalArray = [];



        let queryRes = await FormPrintModel.getDistinctMalmattaCountExcludingOblique(res.pool)

        const data = await FormPrintModel.printForm8All(res.pool, y1, y2);

        // let pages = Math.ceil(data.length / 25);

        // for (let i = 0; i < pages; i++) {
        //   start = count * 25;
        //   let array1 = data.slice(start, start + 25);
        //   finalArray.push(array1);
        //   count++;
        // }

        return renderPage(res, 'user/print/kar-nihay-yadi', {
            data,
            // pages,
            year: { year1, year2 },
            distinct_malmatta_count: queryRes[0]?.distinct_malmatta_count || 0
        })
    }),

    printForm8All: function (req, res, next) {
        let { year1, year2 } = req.params;
        let { sortBy } = req.query;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];
        let zp_data = {};
        let start = 0;
        let count = 0;
        let finalArray = [];

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zp_data = result[0];
                return FormPrintModel.allForm8Users(res.pool, sortBy);
            })
            .then((result) => {
                // let pages = Math.ceil(result.length / 25);

                // for (let i = 0; i < pages; i++) {
                //   start = count * 25;
                //   let array1 = result.slice(start, start + 25);
                //   finalArray.push(array1);
                //   count++;
                // }
                // console.log(result);

                res.render('user/print/pageForm8KarNihayYadi.pug', {
                    data: result,
                    // pages,
                    zp: zp_data,
                    year: { year1, year2 },
                });
            })
            .catch((err) => console.log(err));
    },

    printForm8AllMalmattaDharakList: function (req, res, next) {
        let { year1, year2 } = req.params;
        let { sortBy } = req.query;
        let y1 = year1
        let y2 = year2
        let zp_data = {};
        let start = 0;
        let count = 0;
        let finalArray = [];

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zp_data = result[0];
                return FormPrintModel.allForm8Users(res.pool, sortBy);
            })
            .then((result) => {
                // let pages = Math.ceil(result.length / 25);

                // for (let i = 0; i < pages; i++) {
                //   start = count * 25;
                //   let array1 = result.slice(start, start + 25);
                //   finalArray.push(array1);
                //   count++;
                // }
                // console.log(result);

                res.render('user/print/pageForm8KarNihayYadi.pug', {
                    data: result,
                    // pages,
                    zp: zp_data,
                    year: { year1: '-', year2: '-' },
                });
            })
            .catch((err) => console.log(err));
    },

    form8Pratidnyapatra: function (req, res, next) {
        let { year1, year2, p, tp } = req.query;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let userData = [];
        let totalArray = [];
        let totalTaxSample = [];
        let zpData = {};
        let totalRecords;
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormEightModel.getTotalPrintFormEightUser(res.pool, y1, y2);
            })
            .then((total) => {
                totalRecords = total[0].total_user;
                return FormEightModel.printFormEightUserLimit(res.pool, y1, y2, tp, p);
            })
            .then((result) => {
                if (result.length == 0) {
                    res.status(200).send({ call: 'Invalid Data Passes' });
                    return 999;
                } else {
                    userData = result;
                    return FormEightModel.printGetFromEightTaxTotalData(res.pool);
                }
            })
            .then((result) => {
                if (result != 999) {
                    totalArray = result;
                    return FormEightModel.printGetFromEightTaxSampleData(res.pool);
                } else {
                    return 999;
                }
            })
            .then((result) => {
                if (result != 999) {
                    let indexNumberEnd = Number(tp) * (Number(p) + 1);
                    let indexNumberStart = indexNumberEnd - Number(tp) + 1;
                    totalTaxSample = result;
                    res.render('user/print/pageFormEightPratidnyapatra', {
                        totalRecords,
                        indexNumberStart,
                        userData: userData,
                        userDataString: JSON.stringify(userData),
                        totalArray: totalArray,
                        totalTaxSample: totalTaxSample,
                        y1: year1,
                        y2: year2,
                        zp: zpData,
                    });
                }
            })
            .catch((error) => {
                res.status(200).send({ call: error });
            });
    },

    printFromNineAll: asyncHandler(async (req, res) => {
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];
        let start = 0;
        let count = 0;
        // let pages = Math.ceil(result.length / 6);
        // for (let i = 0; i < pages; i++) {
        //   start = count * 13;
        //   let array1 = result.slice(start, start + 6);
        //   finalArray.push(array1);
        //   count++;
        // }
        let data = await FormNineModel.printFormNineAll(res.pool, y1, y2);
        console.log(data[0])
        renderPage(res, 'user/print/pageFormNineAll', {
            data,
            year: { year1, year2 }, 
        })
    }),


    printFormNineAllSamanya: asyncHandler(async (req, res) => {
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let start = 0;
        let count = 0; 


        // pagination logic
         // console.log(result, 'this is result')
                // let pages = Math.ceil(result.length / 6);

                // for (let i = 0; i < pages; i++) {
                //   start = count * 13;
                //   let array1 = result.slice(start, start + 6);
                //   finalArray.push(array1);
                //   count++;
                // }


        const data = await FormNineModel.printFormNineAllSamanya(res.pool, y1, y2);

        renderPage(res, "user/print/pageFormNineAllSamanya", {
            data,
            year: {
                year1, year2
            }
        })
    }),


    printFormNineAllSamanyaTotal: function (req, res, next) {
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let zp_data = {};

        let start = 0;
        let count = 0;

        let finalArray = [];

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zp_data = result[0];
                // console.log(' inthsi separete controllelr')
                return FormNineModel.printFormNineAllSamanya(res.pool, y1, y2);
            })
            .then((result) => {
                // console.log(result, 'this is result')
                // let pages = Math.ceil(result.length / 6);

                // for (let i = 0; i < pages; i++) {
                //   start = count * 13;
                //   let array1 = result.slice(start, start + 6);
                //   finalArray.push(array1);
                //   count++;
                // }

                res.render('user/print/pageFormNineAllSamanyaTotal', {
                    data: result,
                    year: { year1, year2 },
                    zp: zp_data,
                });
            })
            .catch((err) => console.log(err));
    },

    printFormEightAll: function (req, res, next) {
        let { year1, year2, showWatermark, p, tp } = req.query;

        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let userData = [];
        let totalArray = [];
        let totalTaxSample = [];
        let zpData = {};
        let totalRecords;

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormEightModel.getTotalPrintFormEightUser(res.pool, y1, y2);
            })
            .then((total) => {
                console.log(total);
                totalRecords = total[0].total_user;
                return FormEightModel.printFormEightUser(res.pool, y1, y2, tp, p);
            })
            .then((result) => {
                if (result.length == 0) {
                    console.log('no records found');
                } else {
                    console.log(result[0], 'result is here');
                    userData = result;
                    return FormEightModel.printGetFromEightTaxTotalData(res.pool);
                }
            })
            .then((result) => {
                if (result != 999) {
                    totalArray = result;
                    return FormEightModel.printGetFromEightTaxSampleData(res.pool);
                } else {
                    return 999;
                }
            })
            .then((result) => {
                if (result != 999) {
                    let indexNumberEnd = Number(tp) * (Number(p) + 1);
                    let indexNumberStart = indexNumberEnd - Number(tp) + 1;
                    totalTaxSample = result;
                    // let waterTaxAmount =
                    // 	userData.feu_water_tax === 'सामान्य पाणीकर'
                    // 		? 150
                    // 		: userData.feu_water_tax === 'विशेष पाणीकर'
                    // 			? 1200
                    // 			: 0

                    let waterTaxAmount = 0; // TEMPORARY ZERO
                    res.render('user/print/pageFormEightAll', {
                        totalRecords,
                        indexNumberStart,
                        userData: userData,
                        waterTaxAmount,
                        totalArray: totalArray,
                        totalTaxSample: totalTaxSample,
                        year: { year1, year2 },
                        y1: year1,
                        y2: year2,
                        showWatermark,
                        zp: zpData,
                    });
                }
            })
            .catch((error) => {
                res.status(200).send({ call: error });
            });
    },

    printFormEightAllImage: asyncHandler(async (req, res) => {
        // p - page number , tp: total pages
        const { year1, year2, showWatermark, p, tp } = req.query

        let y1 = year1
        let y2 = year2


        const [{ total_user: totalRecords }] = await FormEightModel.getTotalPrintFormEightUser(res.pool, y1, y2);


        const userData = await FormEightModel.printFormEightUserLimit(res.pool, y1, y2, tp, p);

        const totalArray = await FormEightModel.printGetFromEightTaxTotalData(res.pool);


        const totalTaxSample = await FormEightModel.printGetFromEightTaxSampleData(res.pool);

        const [qrCodes] = await qrCodeModel.qrCodeList(res.pool)


        let indexNumberEnd = Number(tp) * (Number(p) + 1);
        let indexNumberStart = indexNumberEnd - Number(tp) + 1;

        renderPage(res, 'user/print/pageFormEightAllImage', {
            totalRecords,
            userData,
            userDataString: JSON.stringify(userData),
            totalArray,
            totalTaxSample,
            year: { year1, year2 },
            indexNumberStart,
            y1,
            y2,
            showWatermark,
            qrCodes: qrCodes || {}
        })
    }),


    // printFormEightAllImage: function (req, res, next) {
    //     let { year1, year2, showWatermark, p, tp } = req.query;
    //     let y1 = year1.split('-')[0];
    //     let y2 = year2.split('-')[0];

    //     let userData = [];
    //     let totalArray = [];
    //     let totalTaxSample = [];
    //     let zpData = {};
    //     let totalRecords;

    //     ZPModel.getZpDetails(res.pool)
    //         .then((result) => {
    //             zpData = result[0];
    //             return FormEightModel.getTotalPrintFormEightUser(res.pool, y1, y2);
    //         })
    //         .then((total) => {

    //             // let [{ total_user }] = total


    //             // console.log('this is toala user = ', total_user)

    //             totalRecords = total[0].total_user;
    //             return FormEightModel.printFormEightUserLimit(res.pool, y1, y2, tp, p);
    //         })
    //         .then((result) => {
    //             if (result.length == 0) {
    //                 console.log('no records found');
    //             } else {
    //                 userData = result;

    //                 return FormEightModel.printGetFromEightTaxTotalData(res.pool);
    //             }
    //         })
    //         .then((result) => {
    //             if (result != 999) {
    //                 totalArray = result;
    //                 return FormEightModel.printGetFromEightTaxSampleData(res.pool);
    //             } else {
    //                 return 999;
    //             }
    //         })
    //         .then((result) => {
    //             let indexNumberEnd = Number(tp) * (Number(p) + 1);
    //             let indexNumberStart = indexNumberEnd - Number(tp) + 1;

    //             // console.log(`Total ARray = ${totalArray.length}`);
    //             if (result != 999) {
    //                 totalTaxSample = result;
    //                 res.render('user/print/pageFormEightAllImage', {
    //                     totalRecords,
    //                     userData: userData,
    //                     userDataString: JSON.stringify(userData),
    //                     totalArray: totalArray,
    //                     totalTaxSample: totalTaxSample,
    //                     year: { year1, year2 },
    //                     indexNumberStart,
    //                     y1,
    //                     y2,
    //                     showWatermark,
    //                     gp: zpData,
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             res.status(200).send({ call: error });
    //         });
    // },


    // /*
    printFormEightAllQR: asyncHandler(async (req, res) => {
        // p - page number , tp: total pages
        const { year1, year2, showWatermark, p, tp } = req.query

        let y1 = year1
        let y2 = year2


        const [{ total_user: totalRecords }] = await FormEightModel.getTotalPrintFormEightUser(res.pool, y1, y2);


        const userData = await FormEightModel.printFormEightUserLimit(res.pool, y1, y2, tp, p);



        const totalArray = await FormEightModel.printGetFromEightTaxTotalData(res.pool);


        const totalTaxSample = await FormEightModel.printGetFromEightTaxSampleData(res.pool);

        const [qrCodes] = await qrCodeModel.qrCodeList(res.pool)


        let indexNumberEnd = Number(tp) * (Number(p) + 1);
        let indexNumberStart = indexNumberEnd - Number(tp) + 1;

        renderPage(res, 'user/print/pageFormEightAllQR', {
            totalRecords,
            userData,
            userDataString: JSON.stringify(userData),
            totalArray,
            totalTaxSample,
            year: { year1, year2 },
            indexNumberStart,
            y1,
            y2,
            showWatermark,
            qrCodes: qrCodes || {}
        })
    }),

    // */

    /*
    printFormEightAllQR: function (req, res, next) {
        let { year1, year2, showWatermark, p, tp } = req.query;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let userData = [];
        let totalArray = [];
        let totalTaxSample = [];
        let zpData = {};
        let totalRecords;

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormEightModel.getTotalPrintFormEightUser(res.pool, y1, y2);
            })
            .then((total) => {
                totalRecords = total[0].total_user;
                return FormEightModel.printFormEightUserLimit(res.pool, y1, y2, tp, p);
            })
            .then((result) => {
                if (result.length == 0) {
                    console.log('no records found');
                } else {
                    userData = result;

                    return FormEightModel.printGetFromEightTaxTotalData(res.pool);
                }
            })
            .then((result) => {
                if (result != 999) {
                    totalArray = result;
                    return FormEightModel.printGetFromEightTaxSampleData(res.pool);
                } else {
                    return 999;
                }
            })
            .then((result) => {
                if (result != 999) {
                    let indexNumberEnd = Number(tp) * (Number(p) + 1);
                    let indexNumberStart = indexNumberEnd - Number(tp) + 1;
                    totalTaxSample = result;
                    res.render('user/print/pageFormEightAllQR', {
                        totalRecords,
                        indexNumberStart,
                        userData: userData,
                        userDataString: JSON.stringify(userData),
                        totalArray: totalArray,
                        totalTaxSample: totalTaxSample,
                        year: { year1, year2 },
                        y1,
                        y2,
                        showWatermark,
                        zp: zpData,
                    });
                }
            })
            .catch((error) => {
                res.status(200).send({ call: error });
            });
    },
    */

    /** 
    cardPrint: function (req, res, next) {
        let { p, tp } = req.query;

        // these are hard coded values as of now but later will be dynamic
        let y1 = 2022;
        let y2 = 2023;

        let userData = [];
        let zpData = {};
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormEightModel.printFormEightUserLimit(res.pool, y1, y2, tp, p);
            })
            .then((result) => {
                // console.log(result, '-in this case-');
                if (result != 999) {
                    res.render('user/print/pageCard', {
                        userData: result,
                        userDataString: JSON.stringify(result),
                        zp: zpData,
                    });
                } else {
                    res.status(200).send({ call: 'Invalid Data Passes' });
                }
            })
            .catch((error) => {
                res.status(200).send({ call: error });
            });
    },
    */

    // /**

    cardPrint: asyncHandler(async (req, res) => {
        let { p, tp } = req.query;

        // these are hard coded values as of now but later will be dynamic
        let y1 = 2022;
        let y2 = 2023;

        let userData = await FormEightModel.printFormEightUserLimit(res.pool, y1, y2, tp, p);
        let [{totalUsers}] = await FormEightModel.getForm8UserCount(res.pool)
        renderPage(res, 'user/print/pageCard', {
            userData,
            userDataString: JSON.stringify(userData),
            totalRecords: totalUsers
        })
    }),

    printFromNineSamanya: asyncHandler(async (req, res) => {
        let { year1, year2} = req.params;
        let data =await  FormNineModel.getSamanyaPrintData(res.pool, year1, year2);  
        renderPage(res, "user/print/pageFormNineSamanya", {
            data,
            year: { year1, year2 }
        })
    }),

    printFromNineSamanyaOther: asyncHandler(async (req, res) => {
        let year = req.params;
        const data = await FormNineModel.getSamanyaPrintData(res.pool, year.year1, year.year2);
        renderPage(res, "user/print/pageFormNineSamanyaOther", {
            data, 
            year
        })
    }),

    printFromNineSamanyaKar: asyncHandler(async (req, res) => {
         let year = req.params;
         let data = await FormNineModel.getSamanyaPrintDataNew(res.pool, year.year1, year.year2);
         renderPage(res, "user/print/pageFormNineSamanyaKar", {
            data,
            year
         })
    }),

    printSamanyKarMagniDemand: function (req, res, next) {
        let year = req.params;
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let zpData = {};
        let taxesArray = [];
        let taxes = {
            buildingTax: {
                name: 'इमारत कर ',
                lastTotalBuildingTax: 0,
                currentTotalBuildingTax: 0,
            },
            taxFine: {
                name: 'इतर कर ',
                lastTotalTaxFine: 0,
                currentTotalTaxFine: 0,
            },
            divaTax: {
                name: 'दिवाबत्ती कर ',
                lastTotalDivaTax: 0,
                currentTotalDivaTax: 0,
            },
            arogyaTax: {
                name: 'आरोग्य कर ',
                lastTotalArogyaTax: 0,
                currentTotalArogyaTax: 0,
            },
            educationTax: {
                name: 'शिक्षण कर ',
                lastTotalEducationTax: 0,
                currentTotalEducationTax: 0,
            },
            cleaningTax: {
                name: 'स्वच्छता कर ',
                lastTotalCleaningTax: 0,
                currentTotalCleaningTax: 0,
            },
            treeTax: {
                name: 'वृक्ष कर ',
                lastTotalTreeTax: 0,
                currentTotalTreeTax: 0,
            },
            fireblegateTax: {
                name: 'अग्नी कर ',
                lastTotalFireblegateTax: 0,
                currentTotalFireblegateTax: 0,
            },
            totalTax: {
                name: 'एकूण मागणी ',
                lastTotalTax: 0,
                currentTotalTax: 0,
            },
        };

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getSamanyaKarMagniDemand(res.pool, y1, y2);
            })
            .then((result) => {
                // console.log('701', result);
                for (let i = 0; i < result.length; i++) {
                    let data = result[i];

                    taxes.buildingTax.lastTotalBuildingTax += +data.lastBuildingTax;
                    taxes.buildingTax.currentTotalBuildingTax += +data.currentBuildingTax;

                    taxes.taxFine.lastTotalTaxFine += +data.lastTaxFine;

                    taxes.divaTax.lastTotalDivaTax += +data.lastDivaTax;
                    taxes.divaTax.currentTotalDivaTax += +data.currentDivaTax;

                    taxes.arogyaTax.lastTotalArogyaTax += +data.lastArogyaTax;
                    taxes.arogyaTax.currentTotalArogyaTax += +data.currentArogyaTax;

                    taxes.educationTax.lastTotalEducationTax += +data.lastEducationTax;
                    taxes.educationTax.currentTotalEducationTax += +data.currentEducationTax;

                    taxes.fireblegateTax.lastTotalFireblegateTax += +data.lastFireblegateTax;
                    taxes.fireblegateTax.currentTotalFireblegateTax += +data.currentFireblegateTax;

                    taxes.cleaningTax.lastTotalCleaningTax += +data.lastCleaningTax;
                    taxes.cleaningTax.currentTotalCleaningTax += +data.currentCleaningTax;

                    taxes.treeTax.lastTotalTreeTax += +data.lastTreeTax;
                    taxes.treeTax.currentTotalTreeTax += +data.currentTreeTax;

                    taxes.totalTax.lastTotalTax +=
                        +data.lastBuildingTax +
                        +data.lastDivaTax +
                        +data.lastArogyaTax +
                        +data.lastEducationTax +
                        +data.lastFireblegateTax +
                        +data.lastTreeTax +
                        +data.lastCleaningTax +
                        +data.lastTaxFine;

                    taxes.totalTax.currentTotalTax +=
                        +data.currentBuildingTax +
                        +data.currentDivaTax +
                        +data.currentArogyaTax +
                        +data.currentEducationTax +
                        +data.currentFireblegateTax +
                        +data.currentTreeTax +
                        +data.currentCleaningTax;
                }

                taxesArray.push(taxes);
                res.render('user/print/surwadiDemand', {
                    year1,
                    year2,
                    year: { year1, year2 },
                    zp: zpData,
                    data: taxesArray[0],
                });
            });
    },
    printPaniKarMagniDemand: function (req, res, next) {
        let year = req.params;
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let zpData = {};
        let taxArray = [];
        let taxes = {
            generalWaterTax: {
                name: 'सामान्य पाणी कर',
                lastGenealWaterTax: 0,
                currentGenealWaterTax: 0,
            },
            specialWaterTax: {
                name: 'विशेष पाणी कर',
                lastSpacialWaterTax: 0,
                currentSpacialWaterTax: 0,
            },
            totalTax: {
                name: 'एकूण मागणी ',
                lastTotalTax: 0,
                currentTotalTax: 0,
            },
        };

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getSamanyaKarMagniDemand(res.pool, y1, y2);
            })
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    let data = result[i];
                    // console.log('data ', data)
                    // console.log('tax ', data.currentGenealWaterTax)
                    // console.log('tax special', data.lastSpacialWaterTax)
                    // console.log('tax ', data.currentGenealWaterTax)
                    // console.log('tax ', data.currentGenealWaterTax)

                    taxes.generalWaterTax.lastGenealWaterTax += +data.lastGenealWaterTax;
                    taxes.generalWaterTax.currentGenealWaterTax += +data.currentGenealWaterTax;

                    taxes.specialWaterTax.lastSpacialWaterTax += +data.lastSpacialWaterTax;
                    taxes.specialWaterTax.currentSpacialWaterTax += +data.currentSpacialWaterTax;

                    taxes.totalTax.lastTotalTax +=
                        +data.lastGenealWaterTax + +data.lastSpacialWaterTax;
                    taxes.totalTax.currentTotalTax +=
                        +data.currentGenealWaterTax + +data.currentSpacialWaterTax;
                }

                taxArray.push(taxes);
                res.render('user/print/surwadiDemandPani', {
                    year1,
                    year2,
                    year: { year1, year2 },
                    zp: zpData,
                    data: taxArray[0],
                });
            })
            .catch((err) => {
                console.log(`Error : ${err}`);
            });
    },
    printSamanyaChaluKarMagniDemand: function (req, res, next) {
        let year = req.params;
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let zpData = {};
        let taxArray = [];
        let taxes = {
            buildingTax: {
                name: 'इमारत कर ',
                currentTotalBuildingTax: 0,
            },
            taxFine: {
                name: 'इतर कर ',
                currentTotalTaxFine: 0,
            },
            divaTax: {
                name: 'दिवाबत्ती कर ',
                currentTotalDivaTax: 0,
            },
            arogyaTax: {
                name: 'आरोग्य कर ',
                currentTotalArogyaTax: 0,
            },
            treeTax: {
                name: 'वृक्ष कर ',
                currentTotalTreeTax: 0,
            },
            cleaningTax: {
                name: 'स्वच्छता कर ',
                currentTotalCleaningTax: 0,
            },
            fireBlegateTax: {
                name: 'अग्नी कर ',
                currentTotalFireBlegateTax: 0,
            },
            educationTax: {
                name: 'शिक्षण कर ',
                currentTotalEducationTax: 0,
            },
            totalTax: {
                name: 'एकूण मागणी ',
                currentTotalTax: 0,
            },
        };

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                // return FormNineModel.getSamanyaKarMagniDemand(res.pool, y1, y2)
                return formEightModel2.getFormEightData(res.pool);
            })
            .then((_result) => {
                let result = _result;
                // console.log('832', result[0])

                //Form 9 data
                /*
                result.forEach((data) => {
                    taxes.buildingTax.currentTotalBuildingTax += +data.currentBuildingTax

                    // taxes.taxFine.lastTotalTaxFine += +data.lastTaxFine

                    taxes.divaTax.currentTotalDivaTax += +data.currentDivaTax

                    taxes.arogyaTax.currentTotalArogyaTax += +data.currentArogyaTax

                    taxes.treeTax.currentTotalTreeTax += +data.currentTreeTax

                    taxes.cleaningTax.currentTotalCleaningTax += +data.currentCleaningTax

                    taxes.fireBlegateTax.currentTotalFireBlegateTax +=
                        +data.currentFireblegateTax

                    taxes.educationTax.currentTotalEducationTax +=
                        +data.currentEducationTax

                    taxes.totalTax.currentTotalTax +=
                        +data.currentBuildingTax +
                        +data.currentDivaTax +
                        +data.currentArogyaTax +
                        +data.currentTreeTax +
                        +data.currentCleaningTax +
                        +data.currentFireblegateTax +
                        +data.currentEducationTax
                })

                */

                result.forEach((data) => {
                    taxes.buildingTax.currentTotalBuildingTax +=
                        +data.building_tax + +data.open_area_tax;

                    // taxes.taxFine.lastTotalTaxFine += +data.other_tax
                    taxes.taxFine.currentTotalTaxFine += +data.other_tex;
                    taxes.divaTax.currentTotalDivaTax += +data.dava_kar;

                    taxes.arogyaTax.currentTotalArogyaTax += +data.arogya_kar;

                    taxes.treeTax.currentTotalTreeTax += +data.tree_tax;

                    taxes.cleaningTax.currentTotalCleaningTax += +data.cleaning_tax;

                    taxes.fireBlegateTax.currentTotalFireBlegateTax += +data.fireblegate_tax;

                    taxes.educationTax.currentTotalEducationTax += +data.education_tax;

                    taxes.totalTax.currentTotalTax +=
                        +data.building_tax +
                        +data.open_area_tax +
                        +data.dava_kar +
                        +data.arogya_kar +
                        +data.tree_tax +
                        +data.cleaning_tax +
                        +data.fireblegate_tax +
                        +data.education_tax +
                        +data.other_tex;
                });

                taxArray.push(taxes);
                console.log(taxArray[0]);
                res.render('user/print/surwadiDemandChalu', {
                    year1,
                    year2,
                    year: { year1, year2 },
                    zp: zpData,
                    data: taxArray[0],
                });
            });
    },
    printPaniChaluKarMagniDemand: function (req, res, next) {
        let year = req.params;
        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let zpData = {};
        let finalArray = [];
        let dataObject = {
            generalWaterTax: {
                name: 'सामान्य पाणी कर',
                currentGeneralWaterTax: 0,
            },
            specialWaterTax: {
                name: 'विशेष पाणी कर',
                currentSpecialWaterTax: 0,
            },
            totalTax: {
                name: 'एकूण मागणी ',
                currentTotalTax: 0,
            },
        };

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getSamanyaKarMagniDemand(res.pool, y1, y2);
            })
            .then((result) => {
                console.log('886', result);
                result.forEach((data) => {
                    dataObject.generalWaterTax.currentGeneralWaterTax += data.currentGenealWaterTax;

                    dataObject.specialWaterTax.currentSpecialWaterTax +=
                        data.currentSpacialWaterTax;

                    dataObject.totalTax.currentTotalTax +=
                        data.currentGenealWaterTax + data.currentSpacialWaterTax;
                });

                finalArray.push(dataObject);
                res.render('user/print/surwadiDemandChaluPani', {
                    year1,
                    year2,
                    year: { year1, year2 },
                    zp: zpData,
                    data: finalArray[0],
                });
            });
    },
    printForm9PagenusarSamanya: function (req, res, next) {
        let year = req.params;

        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        console.log(year);
        let zpData = {};
        let finalArray = [];
        let start = 0;
        let count = 0;

        let dataObject = {
            malmattaNoFrom: 0,
            malmattaNoTo: 0,
            lastBuildingTax: 0,
            currentBuildingTax: 0,
            totalBuildingTax: 0,
            lastTaxFine: 0,
            lastDivaTax: 0,
            currentDivaTax: 0,
            totalDivaTax: 0,
            lastArogyaTax: 0,
            currentArogyaTax: 0,
            totalArogyaTax: 0,
            totalTax: 0,
        };

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getForm9PagenusarSamanya(res.pool, y1, y2);
            })
            .then((result) => {
                let pages = Math.ceil(result.length / 5);

                for (let i = 0; i < pages; i++) {
                    start = count * 5;
                    let array1 = result.slice(start, start + 5);
                    console.log(array1);
                    dataObject.malmattaNoFrom = array1[0].feu_malmattaNo;
                    dataObject.malmattaNoTo = array1[array1.length - 1].feu_malmattaNo;

                    array1.forEach((el, i) => {
                        dataObject.lastBuildingTax += el.lastBuildingTax;
                        dataObject.currentBuildingTax += el.currentBuildingTax;
                        dataObject.totalBuildingTax += el.totalBuildingTax;
                        dataObject.lastTaxFine += el.lastTaxFine;
                        dataObject.lastDivaTax += el.lastDivaTax;
                        dataObject.currentDivaTax += el.currentDivaTax;
                        dataObject.totalDivaTax += el.totalDivaTax;
                        dataObject.lastArogyaTax += el.lastArogyaTax;
                        dataObject.currentArogyaTax += el.currentArogyaTax;
                        dataObject.totalArogyaTax += el.totalArogyaTax;
                        dataObject.totalTax +=
                            el.totalBuildingTax + el.totalDivaTax + el.totalArogyaTax;
                    });

                    finalArray.push(dataObject);
                    dataObject = {
                        malmattaNoFrom: 0,
                        malmattaNoTo: 0,
                        lastBuildingTax: 0,
                        currentBuildingTax: 0,
                        totalBuildingTax: 0,
                        lastTaxFine: 0,
                        lastDivaTax: 0,
                        currentDivaTax: 0,
                        totalDivaTax: 0,
                        lastArogyaTax: 0,
                        currentArogyaTax: 0,
                        totalArogyaTax: 0,
                        totalTax: 0,
                    };
                    count++;
                }
                res.render('user/print/pageForm9PagenusarYadiSamanya', {
                    data: finalArray,
                    year: { year1, year2 },
                    zp: zpData,
                    result,
                });
            })
            .catch((error) => {
                res.status(502).send(error);
            });
    },
    printForm9PagenusarPani: function (req, res, next) {
        let year = req.params;

        let { year1, year2 } = req.params;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];

        let zpData = {};
        let finalArray = [];
        let start = 0;
        let count = 0;
        let dataObject = {
            malmattaNoFrom: 0,
            malmattaNoTo: 0,

            lastSpecialWaterTax: 0,
            currentSpecialWaterTax: 0,
            totalSpecialWaterTax: 0,

            lastCommonWaterTax: 0,
            currentCommonWaterTax: 0,
            totalCommonWaterTax: 0,

            totalWaterTax: 0,
        };
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getForm9PagenusarPani(res.pool, y1, y2);
            })
            .then((result) => {
                // console.log(result);
                let pages = Math.ceil(result.length / 5);

                for (let i = 0; i < pages; i++) {
                    start = count * 5;
                    let array1 = result.slice(start, start + 5);
                    console.log(array1, 'pani list -all ');
                    dataObject.malmattaNoFrom = array1[0].feu_malmattaNo;
                    dataObject.malmattaNoTo = array1[array1.length - 1].feu_malmattaNo;

                    array1.forEach((data, i) => {
                        dataObject.lastSpecialWaterTax += data.lastSpacialWaterTax;
                        dataObject.currentSpecialWaterTax += data.currentSpacialWaterTax;
                        dataObject.totalSpecialWaterTax += data.totalSpacialWaterTax;

                        dataObject.lastCommonWaterTax += data.lastGenealWaterTax;
                        dataObject.currentCommonWaterTax += data.currentGenealWaterTax;
                        dataObject.totalCommonWaterTax += data.totalGenealWaterTax;

                        dataObject.totalWaterTax +=
                            data.totalSpacialWaterTax + data.totalGenealWaterTax;
                    });

                    finalArray.push(dataObject);
                    dataObject = {
                        malmattaNoFrom: 0,
                        malmattaNoTo: 0,

                        lastSpecialWaterTax: 0,
                        currentSpecialWaterTax: 0,
                        totalSpecialWaterTax: 0,

                        lastCommonWaterTax: 0,
                        currentCommonWaterTax: 0,
                        totalCommonWaterTax: 0,

                        totalWaterTax: 0,
                    };
                    count++;
                }
                res.render('user/print/pageForm9PagenusarYadiPani', {
                    year: { year1, year2 },
                    zp: zpData,
                    data: finalArray,
                });
            });
    },

    printFromNinePani: asyncHandler(async (req, res) => {
        let year = req.params;
        let data = await FormNineModel.getSamanyaPrintData(res.pool, year.year1, year.year2);
        renderPage(res, 'user/print/pageFormNightPani', {
            data,
            y1: year.year1,
            y2: year.year2,
        });
    }),
    printMagniBill: function (req, res, next) {
        let { year1, year2, date, p, tp } = req.query;
        let y1 = year1.split('-')[0];
        let y2 = year2.split('-')[0];
        let totalRecords;
        let zpData = {};

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getTotalPrintCount(res.pool, y1, y2);
            })
            .then((total) => {
                totalRecords = total.length;
                return FormNineModel.getSamanyaPrintData(res.pool, y1, y2, p, tp);
            })
            .then((result) => {
                res.render('user/print/pageMagniBill', {
                    billStart: p * tp,
                    totalRecords,
                    data: result,
                    dataString: JSON.stringify(result),
                    zp: zpData,
                    year1,
                    year2,
                    date,
                    tp,
                    p,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(502).send(error);
            });
    },
    bankQRCodeMagniBill: async function (req, res, next) {
        try {
            let { year1, year2, date, p, tp } = req.query;
            let y1 = year1.split('-')[0];
            let y2 = year2.split('-')[0];
            let totalRecords;
            let zpData = {};

            zpData = await ZPModel.getZpDetails(res.pool);
            zpData = zpData[0];

            const bankQRCodeList = await qrCodeModel.qrCodeList(res.pool);

            const total = await FormNineModel.getTotalPrintCount(res.pool, y1, y2);
            totalRecords = total.length;

            const result = await FormNineModel.getSamanyaPrintData(res.pool, y1, y2, p, tp);

            res.render('user/print/bankQrCodePageMagniBill', {
                billStart: p * tp,
                totalRecords,
                data: result,
                dataString: JSON.stringify(result),
                zp: zpData,
                year1,
                year2,
                date,
                tp,
                p,
                bankQrCodeName:
                    bankQRCodeList?.length > 0 ? bankQRCodeList[0]?.bank_qr_code_image_name : null,
                showBankQrCode:
                    bankQRCodeList?.length > 0 ? bankQRCodeList[0]?.show_bank_qr_code_image : 0,

                bankQrCodeNameWater:
                    bankQRCodeList?.length > 0
                        ? bankQRCodeList[0]?.bank_qr_code_water_image_name
                        : null,
                showBankQrCodeWater:
                    bankQRCodeList?.length > 0
                        ? bankQRCodeList[0]?.show_bank_qr_code_water_image
                        : 0,

                bankQrCodePath: '/new-gp-page/main-page/files/qr-codes',
            });
        } catch (error) {
            console.log(error);
            res.status(502).send(error);
        }
    },

    printMagniLekh: function (req, res, next) {
        let year = req.query;
        let zpData = {};
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getMahniLekhPrintData(res.pool);
            })
            .then((result) => {
                // console.log(result, '---');
                res.render('user/print/pageMagniLekh', {
                    data: result,
                    y1: year.year1,
                    y2: year.year2,
                    date1: year.date1,
                    printDate: year.printDate,
                    zp: zpData,
                });
            })
            .catch((error) => {
                res.status(502).send(error);
            });
        //
    },
    printNalBandNotice: function (req, res, next) {
        let year = req.query;
        let zpData = {};
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormNineModel.getNalBandNoticePrintData(res.pool);
            })
            .then((result) => {
                res.render('user/print/pagePaniNalBandNotice', {
                    data: result,
                    y1: year.y1,
                    y2: year.y2,
                    date1: year.date,
                    zp: zpData,
                });
            })
            .catch((error) => {
                res.status(502).send(error);
            });
        //
    },
    printMarriage: async function (req, res, next) {
        let data = req.query;

        if (typeof data.p == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.d == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.i == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (isNaN(Number(data.i))) {
            res.status(502).send('Invalid Data');
            return false;
        }
        let zpData = {};

        const bankQRCodeList = await qrCodeModel.qrCodeList(res.pool);

        console.log(bankQRCodeList);

        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                // console.log(zpData);
                return MarriageModel.getSingleMarriageData(res.pool, data);
            })
            .then((result) => {
                if (result.length == 0) {
                    res.status(200).send('Details Not Found');
                } else {
                    // res.status(200).send();


                    // If Queryr format is new , i will go to the custom html made certificate page
                    // else it will redirect to image background certficate
                    let renderUrl =
                        req?.query?.format == 'new'
                            ? 'user/print/pageMarriageCertificateNew'
                            : 'user/print/pageMarriageCertificate';
                    res.render(renderUrl, {
                        data: data.d,
                        place: data.p,
                        userInfo: result,
                        zp: zpData,
                        bankQrCodeName:
                            bankQRCodeList?.length > 0
                                ? bankQRCodeList[0]?.bank_qr_code_image_name
                                : null,
                        showBankQrCode:
                            bankQRCodeList?.length > 0
                                ? bankQRCodeList[0]?.show_bank_qr_code_image
                                : 0,
                        bankQrCodePath: '/new-gp-page/main-page/files/qr-codes',
                    });
                }
            })
            .catch((error) => {
                res.status(502).send(error);
            });
        //
    },
    noDuesCertificate: function (req, res, next) {
        let data = req.query;

        if (typeof data.p == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.d == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.i == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (isNaN(Number(data.i))) {
            res.status(502).send('Invalid Data');
            return false;
        }
        let zpData = {};
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return CertificateModel.getSingleCertificate(res.pool, data);
            })
            .then((result) => {
                if (result.length == 0) {
                    res.status(200).send('Details Not Found');
                } else {
                    // res.status(200).send();
                    res.render('user/print/pageClearcertificate1.pug', {
                        data: data.d,
                        place: data.p,
                        userInfo: result,
                        zp: zpData,
                    });
                }
            })
            .catch((error) => {
                res.status(502).send(error);
            });
        //
    },

    printSelfDeclaration: asyncHandler(async (req, res) => {

        const {i: id, appType, d: date, p: place} = req.query;

        // validation
        if (!id || isNaN(Number(id))) {
            return res.status(502).send('Invalid Data');
        }

        // fetch self declaration details
        const result = await SelfDeclarationModal.getById(res.pool, id);

        if (!result || result.length === 0) {
            return res.status(200).send('Details Not Found');
        }

        const userInfo = result[0];

        // app type → template mapping
        const templateMap = {
            'रहिवासी घोषणापत्र': 'user/print/rahivaiSelfDecleration',
            'हयातीचे घोषणापत्र': 'user/print/hayatSelfDecleration',
            'ना हरकत घोषणापत्र': 'user/print/naHarkatSelfDecleration',
            'शौचालय घोषणापत्र': 'user/print/toiletSelfDecleration',
        };

        const template = templateMap[appType];

        if (!template) {
            return res.status(400).send('Invalid Application Type');
        }

        // shared render payload
        renderPage(res, template, {
            date,
            place,
            userInfo
        });
    }),


    certificateOfNiradhar: function (req, res, next) {
        let data = req.query;

        if (typeof data.p == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.d == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.i == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (isNaN(Number(data.i))) {
            res.status(502).send('Invalid Data');
            return false;
        }
        let zpData = {};
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return CertificateModel.getSingleCertificate(res.pool, data);
            })
            .then((result) => {
                if (result.length == 0) {
                    res.status(200).send('Details Not Found');
                } else {
                    // res.status(200).send();
                    res.render('user/print/pageClearcertificate2.pug', {
                        data: data.d,
                        place: data.p,
                        userInfo: result,
                        zp: zpData,
                    });
                }
            })
            .catch((error) => {
                res.status(502).send(error);
            });
    },
    pageFormNoSeven: function (req, res, next) {
        let data = req.query;
        if (typeof data.id == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.y1 == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.y2 == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.pavti == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (typeof data.r == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (isNaN(Number(data.id))) {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (isNaN(Number(data.r))) {
            res.status(502).send('Invalid Data');
            return false;
        }
        if (data.pavti == '') {
            res.status(502).send('Invalid Data');
            return false;
        }
        let zpData = {};
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                if (result.length == 0) {
                    res.status(200).send('Details Not Found');
                } else {
                    res.render('user/print/pageFormNoSeven', {
                        data: data.d,
                        place: data.p,
                        zp: zpData,
                        pavti: data.pavti,
                        r: data.r,
                        id: data.id,
                        y1: data.y1,
                        y2: data.y2,
                    });
                }
            })
            .catch((error) => {
                res.status(502).send(error);
            });
    },

    printPageMeterBill: async function (req, res, next) {
        try {
            // await
            let data = req.query;
            const { printDate, fromDate, toDate, valveNumber } = req.query;

            console.log(req.query);

            const _zp = await ZPModel.getZpDetails(res.pool);

            const _rates = await FormPrintModel.getMeterRate(res.pool);

            const _data = await FormPrintModel.getMeterPrintDetails(
                res.pool,
                valveNumber,
                fromDate,
                toDate
            );
            // console.log(_data)

            res.render('user/print/pageMeterBill', {
                zp: _zp[0],
                bills: _data,
                rates: _rates,
                printDate,
            });
        } catch (err) {
            console.log(`ERror while showing the print page ${err}`);
            res.status(500).send({
                call: 0,
                error: err,
            });
        }

        /*	let zpData = {}
        let meter_rate = []
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0]
                return FormPrintModel.getMeterRate(res.pool)
            })
            .then((result) => {
                if (result.length == 0) {
                    res.status(200).send('Details Not Found')
                    return 999
                } else {
                    meter_rate = result
                    return FormPrintModel.getMeterPrintDetails(res.pool, +data.id)
                }
            })
            .then((result) => {
                console.log(result)
                if (result !== 999) {
                    res.render('user/print/pageMeterBill', {
                        zp: zpData,
                        data: result,
                        meter_rate: meter_rate,
                    })
                }
            })
            .catch((error) => {
                res.status(502).send(error)
            })
            */
    },
    printMeterPaniNondaniBill: function (req, res, next) {
        const data = req.query;

        const { usageFrom, usageTo } = req.query;
        if (typeof data.from == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }

        if (typeof data.to == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }

        let zpData = {};
        let meter_rate = [];
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                return FormPrintModel.getAllUserMeterPrintDetails(res.pool, usageFrom, usageTo);
            })
            .then((result) => {
                if (result !== 999) {
                    console.log(result);
                    res.render('user/print/pageMeterPaniNondaniBill', {
                        zp: zpData,
                        data: result,
                        from: data.from,
                        to: data.to,
                    });
                }
            })
            .catch((error) => {
                res.status(502).send(error);
            });
    },


    taxPayerSamanyaPrint: asyncHandler(async (req, res) => {
        // tax number, form 8 user id
        const { t_no: samanyaTaxId, i: form8UserId, txn: transactionNumber } = req.query;

        // Check if 't_no' (samanyaTaxId) is missing
        if (samanyaTaxId === undefined || samanyaTaxId === null || samanyaTaxId === '') {
            return sendApiResponse(res, 400, false, "'t_no' (samanyaTaxId) is required");
        }

        // Check if 'i' (form8UserId) is missing
        if (form8UserId === undefined || form8UserId === null || form8UserId === '') {
            return sendApiResponse(res, 400, false, "'i' (form8UserId) is required");
        }

        // Validate 't_no' is a valid number
        if (isNaN(Number(samanyaTaxId))) {
            return sendApiResponse(res, 400, false, "'t_no' must be a valid number");
        }

        // Validate 'i' is a valid number
        if (isNaN(Number(form8UserId))) {
            return sendApiResponse(res, 400, false, "'i' must be a valid number");
        }



        const formResult = await FormPrintModel.formEightUser(res.pool, { id: form8UserId });
        if (formResult.length === 0) {
            return res.status(404).send({ message: 'Form 8 user Details Not Found' });
        }
        let form8UserData = formResult[0];


        // Fetch Taxpayer Samanya Details
        const taxResult = await FormPrintModel.getSingleTaxPayerSamanya(
            res.pool,
            samanyaTaxId
        );

        if (taxResult.length === 0) {
            return res.status(404).send({ message: 'Taxpayer Samanya Details Not Found' });
        }


        const _qrCodes = await qrCodeModel.qrCodeList(res.pool);


        const paymentHistory = await TaxPaymentModel.getPaymentDetailsByMalmattaAndPaymentFor(res.pool, form8UserData.feu_malmattaNo, 1);



        renderPage(res, 'user/print/taxPayerSamanya', {
            form8UserData,
            samanyaTax: taxResult[0],
            qrCodes: _qrCodes[0] || {},
            transactionNumber,
            paymentHistory
        })
    }),




    // samanya records, provide either month and year || startYear and endYear
    taxPayerSamanyaPrintMonthOrYearWise: async (req, res) => {
        try {

            const { month, year, startYear, endYear } = req.query;
            let receipts = []
            // lets say month is provide, whihc means the user want to fetch data as per month
            if (month && year) {
                const monthNum = parseInt(month, 10);
                const yearNum = parseInt(year, 10);

                if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
                    return sendError(res, 400, 0, 'चुकीचा महिना भरला आहे.');
                }

                if (isNaN(yearNum) || year.length !== 4) {
                    return sendError(res, 400, 0, 'चुकीचा वर्ष निवडला आहे.');
                }

                receipts = await FormPrintModel.getMonthwiseTaxPayerSamanya(res.pool, {
                    month: monthNum,
                    year: yearNum
                });
            }
            // fetch all records, by default not provding any year as of now
            else {
                // i wont send any year from frontend, neither i am using it in the query as of now
                const start = parseInt(startYear, 10);
                const end = parseInt(endYear, 10);

                // Optional: add checks for start/end year if needed
                receipts = await FormPrintModel.getAllTaxPayerSamanya(res.pool, {
                    startYear: start,
                    endYear: end
                });
            }



            // if month is not provdided

            const _gp = await HomeModel.getGpData(res.pool)


            //  this page, it can render all the data or data or monthwise too, format is gonna be the same
            renderPage(res, 'user/print/taxPayerSamanyaAll', {
                gp: _gp[0],
                receipts,
                month,
                year,
                startYear,
                endYear
            })


        } catch (err) {
            console.error('Error:', err);
            return sendError(res, 500, 0, err?.message || 'Something went wrong', err)
        }
    },


    taxPayerPaniPrint: asyncHandler(async (req, res) => {
        const { t_no: waterTaxId, i: form8UserId, txn: transactionNumber } = req.query
        if (waterTaxId === undefined || waterTaxId === null || waterTaxId === '') {
            return sendApiResponse(res, 400, false, "'t_no' (waterTaxId) is required");
        }

        // Check if 'i' (form8UserId) is missing
        if (form8UserId === undefined || form8UserId === null || form8UserId === '') {
            return sendApiResponse(res, 400, false, "'i' (form8UserId) is required");
        }

        // Validate 't_no' is a valid number
        if (isNaN(Number(waterTaxId))) {
            return sendApiResponse(res, 400, false, "'t_no' must be a valid number");
        }

        // Validate 'i' is a valid number
        if (isNaN(Number(form8UserId))) {
            return sendApiResponse(res, 400, false, "'i' must be a valid number");
        }



        const formResult = await FormPrintModel.formEightUser(res.pool, { id: form8UserId });
        if (formResult.length === 0) {
            return res.status(404).send({ message: 'Form 8 user Details Not Found' });
        }
        let form8UserData = formResult[0];


        const taxResult = await FormPrintModel.getSingleTaxPayerPani(
            res.pool,
            waterTaxId
        );

        if (taxResult.length === 0) {
            return res.status(404).send({ message: 'Taxpayer Samanya Details Not Found' });
        }


        const _qrCodes = await qrCodeModel.qrCodeList(res.pool);
        const paymentHistory = await TaxPaymentModel.getPaymentDetailsByMalmattaAndPaymentFor(res.pool, form8UserData.feu_malmattaNo, 2);


        renderPage(res, 'user/print/taxPayerSamanyaPani', {
            form8UserData,
            waterTax: taxResult[0],
            qrCodes: _qrCodes[0] || {},
            transactionNumber,
            paymentHistory
        })
    }),

    taxPayerPaniPrintMonthOrYearWise: async (req, res) => {
        try {

            const { month, year, startYear, endYear } = req.query;
            let receipts = []
            // lets say month is provide, whihc means the user want to fetch data as per month
            if (month && year) {
                const monthNum = parseInt(month, 10);
                const yearNum = parseInt(year, 10);

                if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
                    return sendError(res, 400, 0, 'चुकीचा महिना भरला आहे.');
                }

                if (isNaN(yearNum) || year.length !== 4) {
                    return sendError(res, 400, 0, 'चुकीचा वर्ष निवडला आहे.');
                }

                receipts = await FormPrintModel.getMonthwiseTaxPayerPani(res.pool, {
                    month: monthNum,
                    year: yearNum
                });
            }
            // fetch all records, by default not provding any year as of now
            else {
                // i wont send any year from frontend, neither i am using it in the query as of now
                const start = parseInt(startYear, 10);
                const end = parseInt(endYear, 10);

                // if month is not provdided
                // Optional: add checks for start/end year if needed
                receipts = await FormPrintModel.getAllTaxPayerPani(res.pool, {
                    startYear: start,
                    endYear: end
                });
            }

            const _gp = await HomeModel.getGpData(res.pool)

            //  this page, it can render all the data or data or monthwise too, format is gonna be the same
            renderPage(res, 'user/print/taxPayerSamanyaPaniAll', {
                gp: _gp[0],
                receipts,
                month,
                year,
                startYear,
                endYear
            })


        } catch (err) {
            console.error('Error:', err);
            return sendError(res, 500, 0, err?.message || 'Something went wrong', err)
        }
    },

    calcMonth: function (_currentMonth, _month, _currentYear) {
        let _mainYear = 0;
        if (_currentMonth >= 4 && _month >= 4) {
            _mainYear = _currentYear;
        }

        if (_currentMonth >= 4 && _month < 4) {
            _mainYear = 0;
        }

        if (_currentMonth < 4 && _month >= 4) {
            _mainYear = _currentYear - 1;
        }

        if (_currentMonth < 4 && _month < 4) {
            _mainYear = _currentYear;
        }
        return _mainYear;
    },
    gpAhavalKarVasul: function (req, res, next) {
        let data = req.query;
        let month = Number(data.m);
        if (typeof data.m == 'undefined') {
            res.status(502).send('Invalid Data');
            return false;
        }

        if (isNaN(Number(data.m))) {
            res.status(502).send('Invalid Data');
            return false;
        }

        let zpData = {};
        let currentVasuliSamanya = {};
        let lastVasuliSamanya = {};
        let currentVasuliPani = {};
        let lastVasuliPani = {};
        let formNineDetails = {};
        let totalPaniVasuliOfYear = {};
        let totalSamanyaVasuliOfYear = {};
        let year = new Date();
        let currentMonth = year.getMonth() + 1;
        let currentYear = year.getFullYear();
        let mainYear = 0;
        mainYear = FromPrintController.calcMonth(currentMonth, month, currentYear);
        if (month > 12) {
            res.status(200).send({ error: 'Invalid Month Passed' });
            return false;
        }
        if (mainYear == 0) {
            res.status(200).send({ error: 'Invalid Month Passed' });
            return false;
        }
        ZPModel.getZpDetails(res.pool)
            .then((result) => {
                zpData = result[0];
                if (result.length == 0) {
                    res.status(200).send('Details Not Found');
                    return 999;
                } else {
                    return TaxPayerModel.getValusliKarDetailsSamanya(
                        res.pool,
                        Number(month),
                        mainYear
                    );
                }
            })
            .then((result) => {
                currentVasuliSamanya = result[0];
                l_month = Number(data.m);
                l_month -= 1;

                if (l_month == 0) {
                    l_month = 12;
                }
                // console.log(l_month, currentMonth);
                if ((l_month < 4 && currentMonth >= 4) || month == 4) {
                    // console.log(true);
                    return [
                        {
                            tpl_lastBuildingTax: 0,
                            tpl_currentBuildingTax: 0,
                            tpl_totalBuildingTax: 0,
                            tpl_lastDivaTax: 0,
                            tpl_currentDivaTax: 0,
                            tpl_totalDivaTax: 0,
                            tpl_lastArogyaTax: 0,
                            tpl_currentArogyaTax: 0,
                            tpl_totalArogyaTax: 0,
                            tpl_lastTaxFine: 0,
                            tpl_lastTaxRelief: 0,
                            tpl_totalTax: 0,
                        },
                    ];
                } else {
                    // console.log(false);

                    let lastYear = FromPrintController.calcMonth(
                        currentMonth,
                        l_month,
                        currentYear
                    );
                    console.log(lastYear, '---');
                    if (l_month < 4) {
                        let year_one = lastYear - 1;
                        let year_two = lastYear;
                    } else {
                        let year_one = lastYear;
                        let year_two = lastYear;
                    }
                    let _y1 = year_one + '-04-01';

                    let daysInMonth = getLastDayOfMonth(l_month, year_two);

                    let _y2 = year_two + '-' + l_month + `-${daysInMonth}`;
                    console.log('last_samany', _y1, _y2);
                    return TaxPayerModel.getTotalValusliKarDetailsSamanya(res.pool, _y1, _y2);
                }
            })
            .then((result) => {
                lastVasuliSamanya = result[0];
                l_month = Number(data.m);
                l_month -= 1;
                if (l_month == 0) {
                    l_month = 12;
                }
                if ((l_month < 4 && currentMonth >= 4) || month == 4) {
                    return [
                        {
                            tpl_lastSpacialWaterTax: 0,
                            tpl_currentSpacialWaterTax: 0,
                            tpl_totalSpacialWaterTax: 0,
                            tpl_lastGenealWaterTax: 0,
                            tpl_currentGenealWaterTax: 0,
                            tpl_totalGenealWaterTax: 0,
                        },
                    ];
                } else {
                    let lastYear = FromPrintController.calcMonth(
                        currentMonth,
                        l_month,
                        currentYear
                    );
                    if (l_month < 4) {
                        let year_one = lastYear - 1;
                        let year_two = lastYear;
                    } else {
                        let year_one = lastYear;
                        let year_two = lastYear;
                    }
                    let _y1 = year_one + '-04-01';
                    let daysInMonth = getLastDayOfMonth(l_month, year_two);

                    let _y2 = year_two + '-' + l_month + `-${daysInMonth}`;
                    // console.log("last_pani", _y1, _y2);
                    return TaxPayerModel.getTotalValusliKarDetailsPani(res.pool, _y1, _y2);
                }
            })
            .then((result) => {
                lastVasuliPani = result[0];
                return TaxPayerModel.getValusliKarDetailsPani(res.pool, Number(month), mainYear);
            })
            .then((result) => {
                currentVasuliPani = result[0];

                let date = new Date();
                let _month = date.getMonth() + 1;
                let _year = date.getFullYear();

                if (_month < 4) {
                    let year_one = _year - 1;
                    let year_two = _year;
                } else {
                    let year_one = _year;
                    let year_two = _year + 1;
                }
                let _y1 = year_one + '-04-01';
                let _y2 = year_two + '-03-31';
                // console.log("total_pani", _y1, _y2);
                return TaxPayerModel.getTotalValusliKarDetailsPani(res.pool, _y1, _y2);
            })
            .then((result) => {
                totalPaniVasuliOfYear = result[0];
                let date = new Date();
                let _month = date.getMonth() + 1;
                let _year = date.getFullYear();

                if (_month < 4) {
                    let year_one = _year - 1;
                    let year_two = _year;
                } else {
                    let year_one = _year;
                    let year_two = _year + 1;
                }
                let _y1 = year_one + '-04-01';
                let _y2 = year_two + '-03-31';
                // console.log("total_samanya", _y1, _y2);
                return TaxPayerModel.getTotalValusliKarDetailsSamanya(res.pool, _y1, _y2);
            })
            .then((result) => {
                totalSamanyaVasuliOfYear = result[0];
                let date = new Date();
                let _month = date.getMonth() + 1;
                let _year = date.getFullYear();

                if (_month < 4) {
                    let year_one = _year - 1;
                    let year_two = _year;
                } else {
                    let year_one = _year;
                    let year_two = _year + 1;
                }
                let _y1 = year_one + '-04-01';
                let _y2 = year_two + '-03-31';
                // console.log("nine_total", _y1, _y2);
                return FormNineModel.getFormNineYearSummery(res.pool, _y1, _y2);
            })
            .then((result) => {
                // res.status(200).send({ data: result });

                formNineDetails = result[0];
                formNineDetails.lastBuildingTax += totalSamanyaVasuliOfYear.tpl_lastBuildingTax;
                formNineDetails.currentBuildingTax +=
                    totalSamanyaVasuliOfYear.tpl_currentBuildingTax;
                formNineDetails.totalBuildingTax += totalSamanyaVasuliOfYear.tpl_totalBuildingTax;
                formNineDetails.lastDivaTax += totalSamanyaVasuliOfYear.tpl_lastDivaTax;
                formNineDetails.currentDivaTax += totalSamanyaVasuliOfYear.tpl_currentDivaTax;
                formNineDetails.totalDivaTax += totalSamanyaVasuliOfYear.tpl_totalDivaTax;
                formNineDetails.lastArogyaTax += totalSamanyaVasuliOfYear.tpl_lastArogyaTax;
                formNineDetails.currentArogyaTax += totalSamanyaVasuliOfYear.tpl_currentArogyaTax;
                formNineDetails.totalArogyaTax += totalSamanyaVasuliOfYear.tpl_totalArogyaTax;
                formNineDetails.lastTaxFine += totalSamanyaVasuliOfYear.tpl_lastTaxFine;
                formNineDetails.lastTaxFine += formNineDetails.lastYearTaxFine;
                formNineDetails.lastTaxRelief += totalSamanyaVasuliOfYear.tpl_lastTaxRelief;
                formNineDetails.totalTax += totalSamanyaVasuliOfYear.tpl_totalTax;
                formNineDetails.lastSpacialWaterTax +=
                    totalPaniVasuliOfYear.tpl_lastSpacialWaterTax;
                formNineDetails.currentSpacialWaterTax +=
                    totalPaniVasuliOfYear.tpl_currentSpacialWaterTax;
                formNineDetails.totalSpacialWaterTax +=
                    totalPaniVasuliOfYear.tpl_totalSpacialWaterTax;
                formNineDetails.lastGenealWaterTax += totalPaniVasuliOfYear.tpl_lastGenealWaterTax;
                formNineDetails.currentGenealWaterTax +=
                    totalPaniVasuliOfYear.tpl_currentGenealWaterTax;
                formNineDetails.totalGenealWaterTax +=
                    totalPaniVasuliOfYear.tpl_totalGenealWaterTax;

                res.render('user/print/gpAhavalKarVasul', {
                    zp: zpData,
                    currentVasuliSamanya: currentVasuliSamanya,
                    lastVasuliSamanya: lastVasuliSamanya,
                    currentVasuliPani: currentVasuliPani,
                    lastVasuliPani: lastVasuliPani,
                    formNineDetails: formNineDetails,
                });
            })
            .catch((error) => {
                res.status(502).send(error);
            });
    },

    printCertificatePaymentRecipt: function (req, res) {
        const { amtWrd: amountInwords, reciptNo } = req.query;

        let payDetails = {};
        FormPrintModel.getPaymentDetails(res.pool, reciptNo)
            .then((paymentDetails) => {
                payDetails = paymentDetails[0];
                console.log(payDetails.payment_for);
                switch (payDetails.payment_for) {
                    case 1:
                        payDetails.certificate_name = 'सामान्य कर भरणा';
                        break;
                    case 2:
                        payDetails.certificate_name = 'पाणी कर भरणा';
                        break;
                    case 3:
                        payDetails.certificate_name = 'विवाह नोंदणी प्रमाणपत्र पेमेंट';
                        break;
                    case 4:
                        payDetails.certificate_name = 'स्वयं घोषणा पत्र पेमेंट';
                        break;
                    case 5:
                        payDetails.certificate_name = 'नमुना ८ प्रमाणपत्र पेमेंट';
                        break;
                    case 6:
                        payDetails.certificate_name = 'थकबाकी / निराधार प्रमाणपत्र पेमेंट';
                        break;
                    default:
                        payDetails.certificate_name = 'प्रमाणपत्र पेमेंट';
                }
                payDetails.payment_date = myDate.changeDateFormat(payDetails.payment_date);

                payDetails.amountInwords = amountInwords;
                return ZPModel.getZpDetails(res.pool);
            })
            .then((gp_data) => {
                res.render('user/print/certificate-payment-recipt.pug', {
                    payDetails,
                    gp: gp_data[0],
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    call: 0,
                    data: err,
                });
            });
    },
};

module.exports = FromPrintController;

function getLastDayOfMonth(month, year) {
    // Month is 1-indexed, so if you pass February (month 2), it will handle leap years too.
    const date = new Date(year, month, 0); // 0 will give the last day of the previous month
    console.log('in function');
    let daysInMonth = date.getDate();
    console.log(daysInMonth);
    return daysInMonth; // This will return the last day of the given month
}
