$(function () {
  const checkIfTaxIsAlreadyPaid = async (malmatta_no) => {
    try {
      const response = await fetch(
        `/form-8/check-tax-paid`,
        {
          method: 'GET'
        }
      );

      const data = response.json();

      if (data.call === 1) {
        alertjs.success({
          t: 'कर(Tax) भरणा',
          m: 'कर भरलेला आहे'
        });
      } else if (data.call === 2) {
        alertjs.warning({
          t: 'कर(Tax) भरणा',
          m: 'कर भरलेला नाही'
        });
      } else {
        alertjs.warning({
          t: 'कर(Tax) भरणा',
          m: 'पुन्हा प्रयत्न करा'
        });
      }
    } catch (err) {
      console.log('Error : ', err);
    }
  };

  $('#checkTaxPaidBtn').on('click', (malmatta_no = null) => {
    if (!malmatta_no) {
      alertjs.warning({
        t: 'कर(Tax) भरणा',
        m: 'सर्व माहिती भरा'
      });
    }
    console.log('Tax is being getting paid');
    checkIfTaxIsAlreadyPaid(malmatta_no);
  });
});
