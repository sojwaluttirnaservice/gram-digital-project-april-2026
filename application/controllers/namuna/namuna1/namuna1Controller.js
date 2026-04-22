const HomeModel = require('../../../model/HomeModel');
const namuna1Tapshil1VillageFundCollectionModel = require('../../../model/namuna/namuna1/collection/namuna1Tapshil1CollectionOfVillageFundsModel');
const namuna1Tapshil2OtherIncomeModel = require('../../../model/namuna/namuna1/collection/namuna1Tapshil2OtherIncomeModel');
const namuna1Tapshil3SanctionedAmountModel = require('../../../model/namuna/namuna1/collection/namuna1Tapshil3SanctionedAmountModel');
const namuna1Tapshil4AuxiliaryGrantsModel = require('../../../model/namuna/namuna1/collection/namuna1Tapshil4AuxiliaryGrantsModel');
const namuna1Tapshil5WaterFundModel = require('../../../model/namuna/namuna1/collection/namuna1Tapshil5WaterFundModel');
const namuna1OtherExpendituresModel = require('../../../model/namuna/namuna1/expenditure/namuna1OtherExpendituresModel');
const namuna1Tapshil1ExpenditureVillageFundsModel = require('../../../model/namuna/namuna1/expenditure/namuna1Tapshil1ExpenditureVillageFundsModel');
const namuna1Tapshil2ExpenditureWaterFundModel = require('../../../model/namuna/namuna1/expenditure/namuna1Tapshil2ExpenditureWaterFundModel');
const { sendError } = require('../../../utils/sendResponse');

const namuna1Controller = {
    renderNamuna1Page: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            res.render('user/namuna/namuna1/namuna-1-page.pug', {
                gp: _gp[0],
            });
        } catch (err) {
            return sendError(res, 500, 0, `Error while rendering the namuna 1 page : ${err}`);
        }
    },

    renderNamuna1PrintPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);

            // INITIALLY IT WAS ONLY YEAR, then later it was required in this format (fromyear to toYear, but not )
            // changing the code, but only chanign it for only view purpose
            const { fromYear, toYear: year } = req.query;

            // 1 - VILLAGE FUNDS

            let _villageFundsHeaders = [];
            if (year) {
                _villageFundsHeaders =
                    await namuna1Tapshil1VillageFundCollectionModel.fetchNamuna1Tapshil1VillageFundHeadersByYear(
                        res.pool,
                        year
                    );
            }

            // Take id of the above and  get Entries by above id as fk in below entries

            let _villageFundsEntries = [];

            if (year && _villageFundsHeaders[0]?.id) {
                _villageFundsEntries =
                    await namuna1Tapshil1VillageFundCollectionModel.fetchNamuna1Tapshil1VillageFundsByHeaderId(
                        res.pool,
                        _villageFundsHeaders[0]?.id
                    );
            }

            // 2 ---oHTER INCOME

            let _otherIncomeHeaders = [];
            if (year) {
                _otherIncomeHeaders =
                    await namuna1Tapshil2OtherIncomeModel.fetchNamuna1Tapshil2OtherIncomeHeadersByYear(
                        res.pool,
                        year
                    );
            }

            // Fetch entries for the selected header id
            let _otherIncomeEntries = [];
            if (year && _otherIncomeHeaders[0]?.id) {
                _otherIncomeEntries =
                    await namuna1Tapshil2OtherIncomeModel.fetchNamuna1Tapshil2OtherIncomeByHeaderId(
                        res.pool,
                        _otherIncomeHeaders[0]?.id
                    );
            }

            // 3 Sanctioned amount

            let _sanctionedAmountHeaders = [];
            if (year) {
                _sanctionedAmountHeaders =
                    await namuna1Tapshil3SanctionedAmountModel.fetchNamuna1Tapshil3SanctionedAmountHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _sanctionedAmountEntries = [];
            if (year && _sanctionedAmountHeaders[0]?.id) {
                _sanctionedAmountEntries =
                    await namuna1Tapshil3SanctionedAmountModel.fetchNamuna1Tapshil3SanctionedAmountByHeaderId(
                        res.pool,
                        _sanctionedAmountHeaders[0]?.id
                    );
            }

            // 4

            let _auxiliaryGrantsHeaders = [];
            if (year) {
                _auxiliaryGrantsHeaders =
                    await namuna1Tapshil4AuxiliaryGrantsModel.fetchNamuna1Tapshil4AuxiliaryGrantsHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _auxiliaryGrantsEntries = [];
            if (year && _auxiliaryGrantsHeaders[0]?.id) {
                _auxiliaryGrantsEntries =
                    await namuna1Tapshil4AuxiliaryGrantsModel.fetchNamuna1Tapshil4AuxiliaryGrantsByHeaderId(
                        res.pool,
                        _auxiliaryGrantsHeaders[0]?.id
                    );
            }

            // 5

            let _waterFundHeaders = [];
            if (year) {
                _waterFundHeaders =
                    await namuna1Tapshil5WaterFundModel.fetchNamuna1Tapshil5WaterFundHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _waterFundEntries = [];
            if (year && _waterFundHeaders[0]?.id) {
                _waterFundEntries =
                    await namuna1Tapshil5WaterFundModel.fetchNamuna1Tapshil5WaterFundByHeaderId(
                        res.pool,
                        _waterFundHeaders[0]?.id
                    );
            }

            // EXPENDITURE -----------

            // 1
            let _expenditureVillageFundHeaders = [];
            if (year) {
                _expenditureVillageFundHeaders =
                    await namuna1Tapshil1ExpenditureVillageFundsModel.fetchExpenditureVillageFundsHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _expenditureVillageFundEntries = [];
            if (year && _expenditureVillageFundHeaders[0]?.id) {
                _expenditureVillageFundEntries =
                    await namuna1Tapshil1ExpenditureVillageFundsModel.fetchExpenditureVillageFundsByHeaderId(
                        res.pool,
                        _expenditureVillageFundHeaders[0]?.id
                    );
            }

            // 2
            let _expenditureWaterFundHeaders = [];
            if (year) {
                _expenditureWaterFundHeaders =
                    await namuna1Tapshil2ExpenditureWaterFundModel.fetchNamuna1Tapshil2ExpenditureWaterFundHeadersByYear(
                        res.pool,
                        year
                    );
            }

            let _expenditureWaterFundEntries = [];
            if (year && _expenditureWaterFundHeaders[0]?.id) {
                _expenditureWaterFundEntries =
                    await namuna1Tapshil2ExpenditureWaterFundModel.fetchNamuna1Tapshil2ExpenditureWaterFundByHeaderId(
                        res.pool,
                        _expenditureWaterFundHeaders[0]?.id
                    );
            }

            let _namuna1OtherExpenditures =
                await namuna1OtherExpendituresModel.fetchNamuna1OtherExpendituresByYear(
                    res.pool,
                    year
                );

            console.log(_namuna1OtherExpenditures);
            res.render('user/namuna/namuna1/namuna-1-print.pug', {
                gp: _gp[0],
                year,

                // collection --- जमा
                // 1
                villageFundsHeaders: _villageFundsHeaders,
                villageFundsEntries: _villageFundsEntries,
                //2
                otherIncomeHeaders: _otherIncomeHeaders,
                otherIncomeEntries: _otherIncomeEntries,
                // 3
                sanctionedAmountHeaders: _sanctionedAmountHeaders,
                sanctionedAmountEntries: _sanctionedAmountEntries,

                // 4
                auxiliaryGrantsHeaders: _auxiliaryGrantsHeaders,
                auxiliaryGrantsEntries: _auxiliaryGrantsEntries,

                // 5
                waterFundHeaders: _waterFundHeaders,
                waterFundEntries: _waterFundEntries,

                // expenditure (खर्च)

                // 1
                expenditureVillageFundHeaders: _expenditureVillageFundHeaders,
                expenditureVillageFundEntries: _expenditureVillageFundEntries,

                // 2
                expenditureWaterFundHeaders: _expenditureWaterFundHeaders,
                expenditureWaterFundEntries: _expenditureWaterFundEntries,

                // 3 Other expenditure

                namuna1OtherExpenditure: _namuna1OtherExpenditures[0],
            });
        } catch (err) {
            return sendError(
                res,
                500,
                0,
                `Error while rendering the namuna 1 print page: ${err}`,
                err
            );
        }
    },
};

module.exports = namuna1Controller;
