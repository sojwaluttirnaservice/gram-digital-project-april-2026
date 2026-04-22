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



        $('#annual-expenditure-report-table-body').html(tableBody)

    }


    let data_list = [];

    let headings = [

        {
            name: 'work_done_name',
            headerName: 'वर्षात केलेले कामाचे नाव',
        },

        {
            name: 'expenditure_on_material',
            headerName: 'साहित्यावर खर्च',
        },

        {
            name: 'expenditure_on_labor',
            headerName: 'मजुरीवर खर्च',
        },

        {
            name: 'total_expenditure',
            headerName: 'एकूण खर्च',
        },

        // --------------------------

        {
            name: 'loan_repayment_gp_fund',
            headerName: 'उसनवार परत (ग्रामनिधी)',
        },

        {
            name: 'loan_repayment_private',
            headerName: 'उसनवार परत (खाजगी)',
        },


        // --------------------------

        {
            name: 'total_loan_repayment',
            headerName: 'एकूण उसनवार परत रक्कम',
        },

        {
            name: 'total_expenditure_8',
            headerName: 'एकूण खर्च ८',
        },

        {
            name: 'remaining_balance',
            headerName: 'अखेर शिल्लक दि. ______ सन _____',
        },

        {
            name: '',
            headerName: 'Action',
        },
    ];


    data_list = [
        // Sample Data
        // [
        //     { name: 'work_done_name', value: '' },
        //     { name: 'expenditure_on_material', value: '' },
        //     { name: 'expenditure_on_labor', value: '' },
        //     { name: 'total_expenditure', value: '' },

        //     { name: 'loan_repayment_gp_fund', value: '' },
        //     { name: 'loan_repayment_private', value: '' },

        //     { name: 'total_loan_repayment', value: '' },
        //     { name: 'total_expenditure_8', value: '' },
        //     { name: 'remaining_balance', value: '' },
        // ],

    ];




    const setDataList = (_newDataList) => {
        data_list = _newDataList;
        renderTable(data_list);
    }





    if (typeof _annualExpenditureReport != 'undefined') {
        const parsedData = JSON.parse(_annualExpenditureReport.data_list)
        setDataList(parsedData?.map(e => JSON.parse(e)));
        console.log(_annualExpenditureReport);
        setValuesInOtherFormInputs(_annualExpenditureReport)
    } else {
        renderTable(data_list);
    }

    // Add to array logic

    $(document).on('click', '#add-row-btn', function (e) {
        e.preventDefault();

        let annualExpenditureReportForm = document.getElementById('annual-expenditure-report-form')

        const formData = new FormData(annualExpenditureReportForm)

        const newRowData = [
            {
                name: 'work_done_name',
                value: formData.get('work_done_name') || '', // Default value if not found
            },
            {
                name: 'expenditure_on_material',
                value: formData.get('expenditure_on_material') || '', // Empty string if not found
            },
            {
                name: 'expenditure_on_labor',
                value: formData.get('expenditure_on_labor') || '',
            },
            {
                name: 'total_expenditure',
                value: formData.get('total_expenditure') || '',
            },
            {
                name: 'loan_repayment_gp_fund',
                value: formData.get('loan_repayment_gp_fund') || '',
            },
            {
                name: 'loan_repayment_private',
                value: formData.get('loan_repayment_private') || '',
            },
            {
                name: 'total_loan_repayment',
                value: formData.get('total_loan_repayment') || '',
            },
            {
                name: 'total_expenditure_8',
                value: formData.get('total_expenditure_8') || '',
            },
            {
                name: 'remaining_balance',
                value: formData.get('remaining_balance') || '',
            },
        ];


        // console.log([...data_list, newRowData]);
        setDataList([...data_list, newRowData])
        annualExpenditureReportForm.reset()
    })



    // Delete from arary logic

    $(document).on('click', '.delete-row-btn', function (e) {
        e.preventDefault();
        const rowIndex = parseInt($(this).attr('data-rowIndex'));
        setDataList(data_list.filter((_, index) => index !== rowIndex))
    })

    // Edi Button click

    function setValuesInOtherFormInputs(_formInputs) {

        for (let key in _formInputs) {
            if (key == 'year' || key == 'data_list') continue
            $(`[name=${key}]`).val(_formInputs[key])
            // console.log(key, _formInputs[key]);
        }
    }

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

        let annualExpenditureReportForm = document.getElementById('annual-expenditure-report-form')

        const formData = new FormData(annualExpenditureReportForm)

        const newRowData = [
            {
                name: 'work_done_name',
                value: formData.get('work_done_name') || '', // Default value if not found
            },
            {
                name: 'expenditure_on_material',
                value: formData.get('expenditure_on_material') || '', // Empty string if not found
            },
            {
                name: 'expenditure_on_labor',
                value: formData.get('expenditure_on_labor') || '',
            },
            {
                name: 'total_expenditure',
                value: formData.get('total_expenditure') || '',
            },
            {
                name: 'loan_repayment_gp_fund',
                value: formData.get('loan_repayment_gp_fund') || '',
            },
            {
                name: 'loan_repayment_private',
                value: formData.get('loan_repayment_private') || '',
            },
            {
                name: 'total_loan_repayment',
                value: formData.get('total_loan_repayment') || '',
            },
            {
                name: 'total_expenditure_8',
                value: formData.get('total_expenditure_8') || '',
            },
            {
                name: 'remaining_balance',
                value: formData.get('remaining_balance') || '',
            },
        ];


        if (editRowIndex != -1) {
            let newDataArray = [...data_list]
            newDataArray[editRowIndex] = newRowData
            setDataList(newDataArray)
            editRowIndex = -1;
            toggleButtonsVisibility(true)
            annualExpenditureReportForm.reset()
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
            const saveButton = $('#save-annual-expenditure-report-btn');
            const updateButton = $('#update-annual-expenditure-report-btn');
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


            const url = isEdit ? `/namuna/3/annual-expenditure-report/update` : `/namuna/3/annual-expenditure-report/save`;

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
            $('#save-annual-expenditure-report-btn').prop('disabled', false);
            $('#update-annual-expenditure-report-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-annual-expenditure-report-btn, #update-annual-expenditure-report-btn', function (e) {
        e.preventDefault();
        let annualExpenditureReportForm = document.getElementById('annual-expenditure-report-form')


        const formData = new FormData(annualExpenditureReportForm)

        const otherFormData = new FormData(document.getElementById('other-data-form'))

        let sendData = {
            year: +formData.get('year'),
            data_list: data_list.map(singleArray => JSON.stringify(singleArray)),
            id: formData.get('id'),
            man_days_created: otherFormData.get('man_days_created'),
            tharav_number: otherFormData.get('tharav_number'),
            approval_order_number: otherFormData.get('approval_order_number'),
        }


        // console.log(sendData);


        handleSaveUpdate(sendData)
    })


    // Save the details to the backend
})