$(() => {


    // Rendering the list logic

    // 


    const renderTable = (headings, dataList) => { // type is array of array [[{}, {}, ...], [{}, {}, ...]]

        const tableHeading = `<tr>${headings.map(heading => `<th>${heading.headerName}</th>`).join(' ')}</tr>`

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



        $('#prapatra-f-table-heading').html(tableHeading)
        $('#prapatra-f-table-body').html(tableBody)

    }


    let data_list = [];

    let headings = [
        {
            headerName: 'पंचायत समिती जिल्हा/विभाग',
            name: 'ps_samiti_dept',
        },

        {
            name: 'gram_panchayat_name',
            headerName: 'ग्रामपंचायतीचे नाव',
        },

        {
            name: 'initial_balance',
            headerName: 'प्रारंभीची शिल्लक',
        },

        {
            name: 'income_excluding_the_initial_balance',
            headerName: 'प्रारंभीची शिल्लक वगळून उत्त्पन्न',
        },

        {
            name: 'income_including_the_initial_balance',
            headerName: 'प्रारंभीची शिल्लक धरून उत्त्पन्न (४ + ५)',
        },

        {
            name: 'total_expenses',
            headerName: 'एकूण खर्च (प्रत्रकाचे column)',
        },

        {
            name: 'final_remaining_balance',
            headerName: 'अखेरची शिल्लक (६ - ७) शिल्लक',
        },

        {
            name: 'remarks',
            headerName: 'शेरा',
        },

        {
            name: '',
            headerName: 'Action',
        },
    ];

    data_list = [
        [
            {
                name: 'ps_samiti_dept',
                value: 'सामान्य निधी',
            },

            {
                name: 'gram_panchayat_name',
                value: '',
            },

            {
                name: 'initial_balance',
                value: '',
            },

            {
                name: 'income_excluding_the_initial_balance',
                value: '',
            },

            {
                name: 'income_including_the_initial_balance',
                value: '',
            },

            {
                name: 'total_expenses',
                value: '',
            },

            {
                name: 'final_remaining_balance',
                value: '',
            },

            {
                name: 'remarks',
                value: '',
            },
        ],

        [
            {
                name: 'ps_samiti_dept',
                value: 'ग्रामपाणी पुरवठा निधी',
            },

            {
                name: 'gram_panchayat_name',
                value: '',
            },

            {
                name: 'initial_balance',
                value: '',
            },

            {
                name: 'income_excluding_the_initial_balance',
                value: '',
            },

            {
                name: 'income_including_the_initial_balance',
                value: '',
            },

            {
                name: 'total_expenses',
                value: '',
            },

            {
                name: 'final_remaining_balance',
                value: '',
            },

            {
                name: 'remarks',
                value: '',
            },
        ],
    ];



    const setDataList = (_newDataList) => {
        data_list = _newDataList;
        renderTable(headings, data_list);
    }




    if (typeof _prapatraF != 'undefined') {
        const parsedData = JSON.parse(_prapatraF.data_list)
        setDataList(parsedData?.map(e => JSON.parse(e)));
    } else {
        renderTable(headings, data_list);
    }

    // Add to array logic

    $(document).on('click', '#add-row-btn', function (e) {
        e.preventDefault();

        let prapatraFForm = document.getElementById('prapatra-f-form')

        const formData = new FormData(prapatraFForm)

        const newRowData = [
            {
                name: 'ps_samiti_dept',
                value: formData.get('ps_samiti_dept') || '', // If the value is not found, set it to an empty string
            },
            {
                name: 'gram_panchayat_name',
                value: formData.get('gram_panchayat_name') || '',
            },
            {
                name: 'initial_balance',
                value: formData.get('initial_balance') || '',
            },
            {
                name: 'income_excluding_the_initial_balance',
                value: formData.get('income_excluding_the_initial_balance') || '',
            },
            {
                name: 'income_including_the_initial_balance',
                value: formData.get('income_including_the_initial_balance') || '',
            },
            {
                name: 'total_expenses',
                value: formData.get('total_expenses') || '',
            },
            {
                name: 'final_remaining_balance',
                value: formData.get('final_remaining_balance') || '',
            },
            {
                name: 'remarks',
                value: formData.get('remarks') || '',
            },
        ];

        console.log([...data_list, newRowData]);
        setDataList([...data_list, newRowData])
        prapatraFForm.reset()
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

        let prapatraFForm = document.getElementById('prapatra-f-form')

        const formData = new FormData(prapatraFForm)

        const newRowData = [
            {
                name: 'ps_samiti_dept',
                value: formData.get('ps_samiti_dept') || '', // If the value is not found, set it to an empty string
            },
            {
                name: 'gram_panchayat_name',
                value: formData.get('gram_panchayat_name') || '',
            },
            {
                name: 'initial_balance',
                value: formData.get('initial_balance') || '',
            },
            {
                name: 'income_excluding_the_initial_balance',
                value: formData.get('income_excluding_the_initial_balance') || '',
            },
            {
                name: 'income_including_the_initial_balance',
                value: formData.get('income_including_the_initial_balance') || '',
            },
            {
                name: 'total_expenses',
                value: formData.get('total_expenses') || '',
            },
            {
                name: 'final_remaining_balance',
                value: formData.get('final_remaining_balance') || '',
            },
            {
                name: 'remarks',
                value: formData.get('remarks') || '',
            },
        ];

        if (editRowIndex != -1) {
            let newDataArray = [...data_list]
            newDataArray[editRowIndex] = newRowData
            setDataList(newDataArray)
            editRowIndex = -1;
            toggleButtonsVisibility(true)
            prapatraFForm.reset()
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
            const saveButton = $('#save-prapatra-f-btn');
            const updateButton = $('#update-prapatra-f-btn');
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


            const url = isEdit ? `/namuna/3/prapatra-f/update` : `/namuna/3/prapatra-f/save`;

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
            $('#save-prapatra-f-btn').prop('disabled', false);
            $('#update-prapatra-f-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-prapatra-f-btn, #update-prapatra-f-btn', function (e) {
        e.preventDefault();
        let prapatraFForm = document.getElementById('prapatra-f-form')


        const formData = new FormData(prapatraFForm)

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