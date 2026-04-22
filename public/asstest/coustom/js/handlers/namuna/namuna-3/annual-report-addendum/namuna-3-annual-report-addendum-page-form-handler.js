$(() => {


    // Rendering the list logic

    // 


    const renderTable = (dataList) => { // type is array of array [[{}, {}, ...], [{}, {}, ...]]


        const tableBody = (
            dataList.map((entryArray, entryIndex) => { // type is array of object [{}, {}, ...]

                return (


                    `<tr>
                       
                        ${entryArray.map((entry) => { // iterate over each entry in entryArray
                        return `<td>${entry.value}</td>`; // create <td> for each entry's value
                    }).join('')}

                        <td>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="btn btn-success btn-sm edit-row-btn" data-rowIndex="${entryIndex}">
                                    <i class="fa fa-pencil"></i>
                                </button>

                                <button class="btn btn-danger btn-sm delete-row-btn" data-rowIndex="${entryIndex}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>

                    
                    </tr>` // join all <td> elements into a single string
                );

            }).join('') // join all <tr> rows together
        );



        $('#annual-report-addendum-table-body').html(tableBody)

    }


    let data_list = [];

    let headings = [
        [
            { headerName: 'जिल्हा', name: 'district' },
            { headerName: 'ग्रामपंचायत', name: 'gp' },
            { headerName: 'ग्रा. पं. ने चालू वर्षी जि. ग्रा. वि. निधी दिला', name: 'district_gp_fund' },
            { headerName: 'वर्षारंभी शिल्लक ४', name: 'start_balance_4' },
            { headerName: 'पंचायातीनी चालू वर्षी दिलेली निधी रक्कम ५', name: 'fund_disbursed_5' },

            { headerName: 'देणे रक्कम मुद्दल(कर्ज) ६', name: 'principal_loan_6' },
            { headerName: 'परत केली रक्कम(कर्ज) ६ब', name: 'repaid_loan_6b' },
            { headerName: 'देय रक्कम (व्याज) ७', name: 'interest_due_7' },
            { headerName: 'व्याज परत केली रक्कम (व्याज) ७ब', name: 'repaid_interest_7b' },

            { headerName: 'गुंतुवणूकीवर मिळालेले व्याज (सरकारी) ८', name: 'investment_interest_govt_8' },
            { headerName: 'गुंतुवणूकीवर मिळालेले व्याज (इतर) ९', name: 'investment_interest_other_9' },

            { headerName: 'एकूण उत्त्पन्न रकाना ( ५ + ६ब + ७ब + ८ + ९) = (१०)', name: 'total_income_formula_10' },
            { headerName: 'शिल्लाकेसह एकूण उत्त्पन्न (४ + १०) = ११', name: 'total_income_with_balance_11' },
            { headerName: 'चालू वर्षात पंचायतीला दिलेली कर्ज रक्कम १२', name: 'loan_disbursed_current_year_12' },

            { headerName: 'गुंतवलेली रक्कम (सरकारी) १३', name: 'invested_amount_govt_13' },
            { headerName: 'गुंतवलेली रक्कम (इतर) १४', name: 'invested_amount_other_14' },

            { headerName: 'इतर खर्च १५', name: 'other_expenses_15' },
            { headerName: 'इतर खर्च रकाना (१२ + १५)', name: 'total_other_expenses_12_15' },
            { headerName: 'वर्षांच्या शेवटी थकीत कर्जांची रक्कम', name: 'outstanding_loans_year_end' },
            { headerName: 'वर्षाअंती शिल्लक एकूण रक्कम १५', name: 'total_balance_year_end_15' }
        ]

    ];


    data_list = [

        // Sample structure
        /**
        [
            { name: 'district', value: '' },
            { name: 'gp', value: '' },
            { name: 'district_gp_fund', value: '' },
            { name: 'start_balance_4', value: '' },
            { name: 'fund_disbursed_5', value: '' },
            { name: 'principal_loan_6', value: '' },
            { name: 'repaid_loan_6b', value: '' },
            { name: 'interest_due_7', value: '' },
            { name: 'repaid_interest_7b', value: '' },
            { name: 'investment_interest_govt_8', value: '' },
            { name: 'investment_interest_other_9', value: '' },
            { name: 'total_income_formula_10', value: '' },
            { name: 'total_income_with_balance_11', value: '' },
            { name: 'loan_disbursed_current_year_12', value: '' },
            { name: 'invested_amount_govt_13', value: '' },
            { name: 'invested_amount_other_14', value: '' },
            { name: 'other_expenses_15', value: '' },
            { name: 'total_other_expenses_12_15', value: '' },
            { name: 'outstanding_loans_year_end', value: '' },
            { name: 'total_balance_year_end_15', value: '' }
        ],
        //  */
    ];




    const setDataList = (_newDataList) => {
        data_list = _newDataList;
        renderTable(data_list);
    }




    if (typeof _annualReportAddendum != 'undefined') {
        const parsedData = JSON.parse(_annualReportAddendum.data_list)
        setDataList(parsedData?.map(e => JSON.parse(e)));
    } else {
        renderTable(data_list);
    }

    // Add to array logic

    $(document).on('click', '#add-row-btn', function (e) {
        e.preventDefault();

        let annualReportAddendumForm = document.getElementById('annual-report-addendum-form')

        const formData = new FormData(annualReportAddendumForm)

        const newRowData = [
            {
                name: 'district',
                value: formData.get('district') || '', // If the value is not found, set it to an empty string
            },

            {
                name: 'gp',
                value: formData.get('gp') || '',
            },

            {
                name: 'district_gp_fund',
                value: formData.get('district_gp_fund') || '',
            },

            {
                name: 'start_balance_4',
                value: formData.get('start_balance_4') || '',
            },

            {
                name: 'fund_disbursed_5',
                value: formData.get('fund_disbursed_5') || '',
            },

            {
                name: 'principal_loan_6',
                value: formData.get('principal_loan_6') || '',
            },

            {
                name: 'repaid_loan_6b',
                value: formData.get('repaid_loan_6b') || '',
            },

            {
                name: 'interest_due_7',
                value: formData.get('interest_due_7') || '',
            },

            {
                name: 'repaid_interest_7b',
                value: formData.get('repaid_interest_7b') || '',
            },

            {
                name: 'investment_interest_govt_8',
                value: formData.get('investment_interest_govt_8') || '',
            },

            {
                name: 'investment_interest_other_9',
                value: formData.get('investment_interest_other_9') || '',
            },
            
            {
                name: 'total_income_formula_10',
                value: formData.get('total_income_formula_10') || '',
            },
            {
                name: 'total_income_with_balance_11',
                value: formData.get('total_income_with_balance_11') || '',
            },
            {
                name: 'loan_disbursed_current_year_12',
                value: formData.get('loan_disbursed_current_year_12') || '',
            },
            {
                name: 'invested_amount_govt_13',
                value: formData.get('invested_amount_govt_13') || '',
            },
            {
                name: 'invested_amount_other_14',
                value: formData.get('invested_amount_other_14') || '',
            },
            {
                name: 'other_expenses_15',
                value: formData.get('other_expenses_15') || '',
            },
            {
                name: 'total_other_expenses_12_15',
                value: formData.get('total_other_expenses_12_15') || '',
            },
            {
                name: 'outstanding_loans_year_end',
                value: formData.get('outstanding_loans_year_end') || '',
            },
            {
                name: 'total_balance_year_end_15',
                value: formData.get('total_balance_year_end_15') || '',
            }
        ];


        // console.log([...data_list, newRowData]);
        setDataList([...data_list, newRowData])
        annualReportAddendumForm.reset()
    })



    // Delete from arary logic

    $(document).on('click', '.delete-row-btn', function (e) {
        e.preventDefault();
        const rowIndex = parseInt($(this).attr('data-rowIndex'));
        setDataList(data_list.filter((_, index) => index !== rowIndex))
    })

    // Edi Button click

    function setValuesInInputs(rowData) {
        rowData.forEach((entry) => {
            $(`[name=${entry.name}]`).val(entry.value)
        })
    }

    let editRowIndex = -1;

    function toggleButtonsVisibility(showAddBtn) {
        $('#add-row-btn').css('display', showAddBtn ? 'inline-block' : 'none')
        $('#update-row-btn').css('display', !showAddBtn ? 'inline-block' : 'none')

    }

    // By default show add row button on the ui

    toggleButtonsVisibility(true)

    $(document).on('click', '#update-row-btn', function (e) {
        e.preventDefault();

        let annualReportAddendumForm = document.getElementById('annual-report-addendum-form')

        const formData = new FormData(annualReportAddendumForm)

        const newRowData = [
            {
                name: 'district',
                value: formData.get('district') || '', // If the value is not found, set it to an empty string
            },
            {
                name: 'gp',
                value: formData.get('gp') || '',
            },
            {
                name: 'district_gp_fund',
                value: formData.get('district_gp_fund') || '',
            },
            {
                name: 'start_balance_4',
                value: formData.get('start_balance_4') || '',
            },
            {
                name: 'fund_disbursed_5',
                value: formData.get('fund_disbursed_5') || '',
            },
            {
                name: 'principal_loan_6',
                value: formData.get('principal_loan_6') || '',
            },
            {
                name: 'repaid_loan_6b',
                value: formData.get('repaid_loan_6b') || '',
            },
            {
                name: 'interest_due_7',
                value: formData.get('interest_due_7') || '',
            },
            {
                name: 'repaid_interest_7b',
                value: formData.get('repaid_interest_7b') || '',
            },
            {
                name: 'investment_interest_govt_8',
                value: formData.get('investment_interest_govt_8') || '',
            },
            {
                name: 'investment_interest_other_9',
                value: formData.get('investment_interest_other_9') || '',
            },
            {
                name: 'total_income_formula_10',
                value: formData.get('total_income_formula_10') || '',
            },
            {
                name: 'total_income_with_balance_11',
                value: formData.get('total_income_with_balance_11') || '',
            },
            {
                name: 'loan_disbursed_current_year_12',
                value: formData.get('loan_disbursed_current_year_12') || '',
            },
            {
                name: 'invested_amount_govt_13',
                value: formData.get('invested_amount_govt_13') || '',
            },
            {
                name: 'invested_amount_other_14',
                value: formData.get('invested_amount_other_14') || '',
            },
            {
                name: 'other_expenses_15',
                value: formData.get('other_expenses_15') || '',
            },
            {
                name: 'total_other_expenses_12_15',
                value: formData.get('total_other_expenses_12_15') || '',
            },
            {
                name: 'outstanding_loans_year_end',
                value: formData.get('outstanding_loans_year_end') || '',
            },
            {
                name: 'total_balance_year_end_15',
                value: formData.get('total_balance_year_end_15') || '',
            }
        ];


        if (editRowIndex != -1) {
            let newDataArray = [...data_list]
            newDataArray[editRowIndex] = newRowData
            setDataList(newDataArray)
            editRowIndex = -1;
            toggleButtonsVisibility(true)
            annualReportAddendumForm.reset()
        }
    })

    $(document).on('click', '.edit-row-btn', function (e) {
        e.preventDefault();
        const rowIndex = parseInt($(this).attr('data-rowIndex'));
        const currentRowData = data_list[rowIndex];

        editRowIndex = rowIndex;

        toggleButtonsVisibility(false)

        setValuesInInputs(currentRowData)
    })

    // const [isEditing, setIsEditing] = () => {
    //     let value = false;
    //     set
    // }


    const handleSaveUpdate = async (patrakJCleanlinessData) => {
        try {
            // Disable the buttons before making the API call
            const saveButton = $('#save-annual-report-addendum-btn');
            const updateButton = $('#update-annual-report-addendum-btn');
            saveButton.prop('disabled', true);
            updateButton.prop('disabled', true);

            if (!patrakJCleanlinessData.year) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा',
                });
                // Re-enable the buttons if there's an error
                saveButton.prop('disabled', false);
                updateButton.prop('disabled', false);
                return;
            }

            const isEdit = !!patrakJCleanlinessData.id;


            const url = isEdit ? `/namuna/3/annual-report-addendum/update` : `/namuna/3/annual-report-addendum/save`;

            const _res = await fetch(url, {
                method: isEdit ? 'PUT' : 'POST',
                body: JSON.stringify(patrakJCleanlinessData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { call, message } = await _res.json();

            if (call) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: !isEdit ? 'सेव झाले' : 'अपडेट झाले',
                    },
                    () => location.reload()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: !isEdit ? 'सेव नाही झाले' : 'अपडेट नाही झाले',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alertjs.warning({
                t: 'Error',
                m: 'काहीतरी चुकले',
            });
        } finally {
            // Re-enable the buttons after the API call is complete
            $('#save-annual-report-addendum-btn').prop('disabled', false);
            $('#update-annual-report-addendum-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-annual-report-addendum-btn, #update-annual-report-addendum-btn', function (e) {
        e.preventDefault();
        let annualReportAddendumForm = document.getElementById('annual-report-addendum-form')


        const formData = new FormData(annualReportAddendumForm)

        let sendData = {
            year: +formData.get('year'),
            data_list: data_list.map(singleArray => JSON.stringify(singleArray)),
            id: formData.get('id')
        }


        console.log(sendData);

        // return;

        handleSaveUpdate(sendData)
    })


    // Save the details to the backend
})