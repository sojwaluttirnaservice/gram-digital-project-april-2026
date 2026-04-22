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
                        <td>${entryIndex + 1}</td>
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



        $('#gp-cost-revaluation-table-body').html(tableBody)

    }


    let data_list = [];

    const headers = [
        {
            name: 'previous_reassessment_implementation_date',
            headerName: 'मागील फेर आकारणी अमलात आणण्याची तारीख',
        },
        {
            name: 'tax_name_assessed',
            headerName: 'आकारलेल्या कराचे नाव',
        },
        {
            name: 'amount_requested_for_year',
            headerName: 'वर्षासाठी केलेली रक्कम',
        },
        {
            name: 'reassessment_interval_years',
            headerName: 'फेर कर दर ४ वर्षानी आकारणी करण्याचे वर्ष',
        },
        {
            name: 'reassessment_year',
            headerName: 'फेर कर आकारणी केलेले वर्ष',
        },
        {
            name: 'tax_name_in_reassessment',
            headerName: 'फेर आकारणी मध्ये आकारलेल्या कराचे नाव',
        },
        {
            name: 'amount_assessed_for_year',
            headerName: 'आकारणी केलेली रक्कम (वर्षासाठी)',
        },
        {
            name: 'increase_in_income_after_reassessment',
            headerName: 'फेर कर आकारणी नंतर उत्त्पन्नात वाढ कराची रक्कम',
        },
        {
            name: 'total_property_count_buildings',
            headerName: 'एकूण मालमत्ता संख्या इमारती',
        },
        {
            name: 'total_property_count_land',
            headerName: 'एकूण मालमत्ता संख्या जमिनी',
        }
    ];


    data_list = [

        // Sample structure
        /**
         
        [
            
            {
                name: 'previous_reassessment_implementation_date',
                value: '',
            },
            {
                name: 'tax_name_assessed',
                value: '',
            },
            {
                name: 'amount_requested_for_year',
                value: '',
            },
            {
                name: 'reassessment_interval_years',
                value: '',
            },
            {
                name: 'reassessment_year',
                value: '',
            },
            {
                name: 'tax_name_in_reassessment',
                value: '',
            },
            {
                name: 'amount_assessed_for_year',
                value: '',
            },
            {
                name: 'increase_in_income_after_reassessment',
                value: '',
            },
            {
                name: 'total_property_count_buildings',
                value: '',
            },
            {
                name: 'total_property_count_land',
                value: '',
            }
        ],
        [
            // ...similar as above 
        ]
        */
    ];




    const setDataList = (_newDataList) => {
        data_list = _newDataList;
        console.log(_newDataList);
        renderTable(data_list);
    }


    if (typeof _gpCostRevaluation != 'undefined') {
        const parsedData = JSON.parse(_gpCostRevaluation.data_list)
        setDataList(parsedData?.map(e => JSON.parse(e)));
    } else {
        renderTable(data_list);
    }

    // Add to array logic

    $(document).on('click', '#add-row-btn', function (e) {
        e.preventDefault();

        let gpCostRevaluationForm = document.getElementById('gp-cost-revaluation-form')

        const formData = new FormData(gpCostRevaluationForm)

        const newRowData = [
            {
                name: 'previous_reassessment_implementation_date',
                value: formData.get('previous_reassessment_implementation_date') || '', // If the value is not found, set it to an empty string
            },

            {
                name: 'tax_name_assessed',
                value: formData.get('tax_name_assessed') || '',
            },

            {
                name: 'amount_requested_for_year',
                value: formData.get('amount_requested_for_year') || '',
            },

            {
                name: 'reassessment_interval_years',
                value: formData.get('reassessment_interval_years') || '',
            },

            {
                name: 'reassessment_year',
                value: formData.get('reassessment_year') || '',
            },

            {
                name: 'tax_name_in_reassessment',
                value: formData.get('tax_name_in_reassessment') || '',
            },

            {
                name: 'amount_assessed_for_year',
                value: formData.get('amount_assessed_for_year') || '',
            },

            {
                name: 'increase_in_income_after_reassessment',
                value: formData.get('increase_in_income_after_reassessment') || '',
            },

            {
                name: 'total_property_count_buildings',
                value: formData.get('total_property_count_buildings') || '',
            },

            {
                name: 'total_property_count_land',
                value: formData.get('total_property_count_land') || '',
            }
        ];


        setDataList([...data_list, newRowData])
        gpCostRevaluationForm.reset()
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

        let gpCostRevaluationForm = document.getElementById('gp-cost-revaluation-form')

        const formData = new FormData(gpCostRevaluationForm)

        const newRowData = [
            {
                name: 'previous_reassessment_implementation_date',
                value: formData.get('previous_reassessment_implementation_date') || '', // If the value is not found, set it to an empty string
            },

            {
                name: 'tax_name_assessed',
                value: formData.get('tax_name_assessed') || '',
            },

            {
                name: 'amount_requested_for_year',
                value: formData.get('amount_requested_for_year') || '',
            },

            {
                name: 'reassessment_interval_years',
                value: formData.get('reassessment_interval_years') || '',
            },

            {
                name: 'reassessment_year',
                value: formData.get('reassessment_year') || '',
            },

            {
                name: 'tax_name_in_reassessment',
                value: formData.get('tax_name_in_reassessment') || '',
            },

            {
                name: 'amount_assessed_for_year',
                value: formData.get('amount_assessed_for_year') || '',
            },

            {
                name: 'increase_in_income_after_reassessment',
                value: formData.get('increase_in_income_after_reassessment') || '',
            },

            {
                name: 'total_property_count_buildings',
                value: formData.get('total_property_count_buildings') || '',
            },

            {
                name: 'total_property_count_land',
                value: formData.get('total_property_count_land') || '',
            }
        ];



        if (editRowIndex != -1) {
            let newDataArray = [...data_list]
            newDataArray[editRowIndex] = newRowData
            setDataList(newDataArray)
            editRowIndex = -1;
            toggleButtonsVisibility(true)
            gpCostRevaluationForm.reset()
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
            const saveButton = $('#save-gp-cost-revaluation-btn');
            const updateButton = $('#update-gp-cost-revaluation-btn');
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


            const url = isEdit ? `/namuna/3/gp-cost-revaluation/update` : `/namuna/3/gp-cost-revaluation/save`;

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
            $('#save-gp-cost-revaluation-btn').prop('disabled', false);
            $('#update-gp-cost-revaluation-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-gp-cost-revaluation-btn, #update-gp-cost-revaluation-btn', function (e) {
        e.preventDefault();
        let gpCostRevaluationForm = document.getElementById('gp-cost-revaluation-form')


        const formData = new FormData(gpCostRevaluationForm)

        let sendData = {
            year: +formData.get('year'),
            data_list: data_list.map(singleArray => JSON.stringify(singleArray)),
            id: formData.get('id')
        }


        // console.log(sendData);

        handleSaveUpdate(sendData)
    })


    // Save the details to the backend
})