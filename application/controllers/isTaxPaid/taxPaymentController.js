const TaxPaymentModel = require('../../model/isTaxPaid/TaxPaymentModel');

const taxPaymentController = {
  isTaxPaid: (req, res) => {
    const malmattaNo = req.body.malmattaNo;
    console.log(malmattaNo, 'req.body ---');

    TaxPaymentModel.isTaxPaid(res.pool, malmattaNo)
      .then((result) => {
        console.log(result)
        console.log(result.length, 'isTaxPaid result');
        return res.status(200).json({
          call: 1,
          result
        });
      })
      .catch((err) => {
        return res.status(500).json({
          call: 0,
          errror: err
        });
      });
  },
  // getPaymentDetails: (req, res) => {
  //   const { paymentFor } = req.query;

  //   TaxPaymentModel.getPaymentDetails(res.pool, paymentFor)
  //     .then((result) => {})
  //     .catch();
  // }
};

module.exports = taxPaymentController;
