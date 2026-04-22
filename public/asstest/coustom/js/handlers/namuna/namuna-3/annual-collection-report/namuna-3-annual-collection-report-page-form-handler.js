$(() => {


    // Rendering the list logic


    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // 


    const renderTable = (dataList) => { // type is array of array [[{}, {}, ...], [{}, {}, ...]]


        const tableBody = (
            dataList.map((entryArray, entryIndex) => { // type is array of object [{}, {}, ...

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



        $('#annual-collection-report-table-body').html(tableBody)

    }


    let data_list = [];

    let headings = [
        [
            { headerName: 'सुरुवातीची शिल्लक दिनांक', name: 'start_balance_date' },
            { headerName: 'वर्षात प्राप्त अनुदान २', name: 'grant_received_year_2' },
            { headerName: 'वर्षात प्राप्त व्याज ३', name: 'interest_received_year_3' },
            { headerName: 'देणगी ४', name: 'donation_4' },
            { headerName: 'ग्रामसेवा निधीतून वळती केलेली रक्कम ५', name: 'fund_disbursed_gp_service_5' },

            { headerName: 'ग्रामनिधीतून वळती केलेली रक्कम', name: 'fund_disbursed_village_fund_6' },

            { headerName: 'उसनवार ग्रामनिधीतून', name: 'loan_from_village_fund_7' },
            { headerName: 'उसनवार खाजगी', name: 'loan_from_private_8' },
            { headerName: 'एकूण उसनवार रक्कम (७ + ८)', name: 'total_loan_repaid_7_8' },

            { headerName: 'किरकोळ प्राप्ती', name: 'misc_income_9' },

            { headerName: 'वर्षात एकूण जमा (२ + ३ + ४ + ५ + ६ + ९ + १०)', name: 'total_income_year_10' },

            { headerName: 'सुरुवातीची शिल्लकी सह एकूण जमा (१ + ११)', name: 'start_balance_with_total_income_11' }
        ]

    ];


    data_list = [

        // Sample structure
        /**
        [
            { name: 'start_balance_date', value: '' },
            { name: 'grant_received_year_2', value: '' },
            { name: 'interest_received_year_3', value: '' },
            { name: 'donation_4', value: '' },
            { name: 'fund_disbursed_gp_service_5', value: '' },
            { name: 'fund_disbursed_village_fund_6', value: '' },
            { name: 'loan_from_village_fund_7', value: '' },
            { name: 'loan_from_private_8', value: '' },
            { name: 'total_loan_repaid_7_8', value: '' },

            { name: 'misc_income_9', value: '' },
            { name: 'total_income_year_10', value: '' },
            { name: 'start_balance_with_total_income_11', value: '' }
        ]
        
         */
    ];




    const setDataList = (_newDataList) => {
        data_list = _newDataList;
        console.log(_newDataList);
        renderTable(data_list);
    }


    if (typeof _annualCollectionReport != 'undefined') {
        const parsedData = JSON.parse(_annualCollectionReport.data_list)
        setDataList(parsedData?.map(e => JSON.parse(e)));
    } else {
        renderTable(data_list);
    }

    // Add to array logic

    $(document).on('click', '#add-row-btn', function (e) {
        e.preventDefault();

        let annualCollectionReportForm = document.getElementById('annual-collection-report-form')

        const formData = new FormData(annualCollectionReportForm)

        const newRowData = [
            {
                name: 'start_balance_date',
                value: formData.get('start_balance_date') || '', // If the value is not found, set it to an empty string
            },

            {
                name: 'grant_received_year_2',
                value: formData.get('grant_received_year_2') || '',
            },

            {
                name: 'interest_received_year_3',
                value: formData.get('interest_received_year_3') || '',
            },

            {
                name: 'donation_4',
                value: formData.get('donation_4') || '',
            },

            {
                name: 'fund_disbursed_gp_service_5',
                value: formData.get('fund_disbursed_gp_service_5') || '',
            },

            {
                name: 'fund_disbursed_village_fund_6',
                value: formData.get('fund_disbursed_village_fund_6') || '',
            },

            {
                name: 'loan_from_village_fund_7',
                value: formData.get('loan_from_village_fund_7') || '',
            },

            {
                name: 'loan_from_private_8',
                value: formData.get('loan_from_private_8') || '',
            },

            {
                name: 'total_loan_repaid_7_8',
                value: formData.get('total_loan_repaid_7_8') || '',
            },

            {
                name: 'misc_income_9',
                value: formData.get('misc_income_9') || '',
            },

            {
                name: 'total_income_year_10',
                value: formData.get('total_income_year_10') || '',
            },

            {
                name: 'start_balance_with_total_income_11',
                value: formData.get('start_balance_with_total_income_11') || '',
            }
        ];

        setDataList([...data_list, newRowData])
        annualCollectionReportForm.reset()
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

        let annualCollectionReportForm = document.getElementById('annual-collection-report-form')

        const formData = new FormData(annualCollectionReportForm)

        const newRowData = [
            {
                name: 'start_balance_date',
                value: formData.get('start_balance_date') || '', // If the value is not found, set it to an empty string
            },
            {
                name: 'grant_received_year_2',
                value: formData.get('grant_received_year_2') || '',
            },
            {
                name: 'interest_received_year_3',
                value: formData.get('interest_received_year_3') || '',
            },
            {
                name: 'donation_4',
                value: formData.get('donation_4') || '',
            },
            {
                name: 'fund_disbursed_gp_service_5',
                value: formData.get('fund_disbursed_gp_service_5') || '',
            },
            {
                name: 'fund_disbursed_village_fund_6',
                value: formData.get('fund_disbursed_village_fund_6') || '',
            },
            {
                name: 'loan_from_village_fund_7',
                value: formData.get('loan_from_village_fund_7') || '',
            },
            {
                name: 'loan_from_private_8',
                value: formData.get('loan_from_private_8') || '',
            },
            {
                name: 'total_loan_repaid_7_8',
                value: formData.get('total_loan_repaid_7_8') || '',
            },
            {
                name: 'misc_income_9',
                value: formData.get('misc_income_9') || '',
            },
            {
                name: 'total_income_year_10',
                value: formData.get('total_income_year_10') || '',
            },
            {
                name: 'start_balance_with_total_income_11',
                value: formData.get('start_balance_with_total_income_11') || '',
            }
        ];


        if (editRowIndex != -1) {
            let newDataArray = [...data_list]
            newDataArray[editRowIndex] = newRowData
            setDataList(newDataArray)
            editRowIndex = -1;
            toggleButtonsVisibility(true)
            annualCollectionReportForm.reset()
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
            const saveButton = $('#save-annual-collection-report-btn');
            const updateButton = $('#update-annual-collection-report-btn');
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


            const url = isEdit ? `/namuna/3/annual-collection-report/update` : `/namuna/3/annual-collection-report/save`;

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
            $('#save-annual-collection-report-btn').prop('disabled', false);
            $('#update-annual-collection-report-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-annual-collection-report-btn, #update-annual-collection-report-btn', function (e) {
        e.preventDefault();
        let annualCollectionReportForm = document.getElementById('annual-collection-report-form')


        const formData = new FormData(annualCollectionReportForm)

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