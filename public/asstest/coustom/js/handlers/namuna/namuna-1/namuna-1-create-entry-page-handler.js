let emptyVillageFundEntryObject = {
    item_in_budget: '',
    estimated_income_of_panchayat: 0,
    approved_estimated_amount: 0,
    actual_amount_previous_year: 0,
    actual_amount_year_before_last: 0,
    year: 2024,
};

const villageFunds = {
    villageFundsHeaders: [
        {
            year: '2024',
            item_in_budget_header_name: 'लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केल्याप्रमाणे बाब',
            year_of_estimated_income_of_panchayat: '2023-2024',
            year_of_approved_estimated_amount: '2022-2023',
            year_of_actual_amount_previous_year: '2023-2022',
            year_of_actual_amount_year_before_last: '2022-2021',
        },
    ],

    villageFundsEntries: [
        {
            item_in_budget: 'मालमत्ता जमीन इमारती या वरील कर',
            estimated_income_of_panchayat: 50000,
            approved_estimated_amount: 2500,
            actual_amount_previous_year: 2200,
            actual_amount_year_before_last: 2100,
            isDefault: true,
        },
        {
            item_in_budget: 'दिवाबत्ती कर',
            estimated_income_of_panchayat: 15000,
            approved_estimated_amount: 1200,
            actual_amount_previous_year: 1000,
            actual_amount_year_before_last: 900,
            isDefault: true,
        },
        {
            item_in_budget: 'स्वच्छता/ आरोग्य कर',
            estimated_income_of_panchayat: 25000,
            approved_estimated_amount: 3000,
            actual_amount_previous_year: 2800,
            actual_amount_year_before_last: 2600,
        },
        {
            item_in_budget: 'धंदा/व्यवसाय कर',
            estimated_income_of_panchayat: 40000,
            approved_estimated_amount: 5000,
            actual_amount_previous_year: 4500,
            actual_amount_year_before_last: 4200,
        },
    ],
};

$(document).ready(function () {
    const handleSaveNamuna1Details = async (sendData) => {
        try {
            let url = '/namuna/1/save';

            const res = await fetch(url, {
                body: JSON.stringify(sendData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const resData = await res.json();

            if (resData.call) {
                alert('SAved');
            }
        } catch (err) {}
    };

    $(document).on('click', '#submit-namuna-1-entry', function (e) {
        e.preventDefault();

        alert('Trying to save');

        let villageFundsData = {
            headers: villageFunds.villageFundsHeaders,
            body: villageFunds.villageFundsEntries,
        };

        const sendData = {
            villageFunds: villageFundsData,
        };
        handleSaveNamuna1Details(sendData);
    });

    $('#submit-namuna-1-entry').click();
});
