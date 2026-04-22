$(() => {


    // Rendering the list logic

    // 


    const renderTable = (dataList) => { // type is array of array [[{}, {}, ...], [{}, {}, ...]]


        const tableBody = (
            dataList.map((entryArray, entryIndex) => { // type is array of object [{}, {}, ...]

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



        $('#reciept-book-report-table-body').html(tableBody)

    }


    let data_list = [];

    let headings = [
        { name: 'gp_member_name', headerName: 'ग्रा.पं. सभासदाचे नाव' },
        { name: 'post', headerName: 'पद' },

        { name: 'class', headerName: 'प्रवर्ग' },
        { name: 'age', headerName: 'वय' },
        { name: 'education', headerName: 'शिक्षण' },
    ];


    data_list = [
        // Sample Data

        // [
        //     { name: 'gp_member_name', value: '' },
        //     { name: 'post', value: '' },

        //     { name: 'class', value: '' },
        //     { name: 'age', value: '' },
        //     { name: 'education', value: '' },
        // ],

        // [
        //     // ...
        // ]

    ];




    const setDataList = (_newDataList) => {
        data_list = _newDataList;
        renderTable(data_list);
    }





    if (typeof _recieptBookReport != 'undefined') {
        const parsedData = JSON.parse(_recieptBookReport.data_list)
        setDataList(parsedData?.map(e => JSON.parse(e)));
        console.log(_recieptBookReport);
        setValuesInOtherFormInputs(_recieptBookReport)
    } else {
        renderTable(data_list);
    }

    // Add to array logic

    $(document).on('click', '#add-row-btn', function (e) {
        e.preventDefault();

        let recieptBookReportForm = document.getElementById('reciept-book-report-form')

        const formData = new FormData(recieptBookReportForm)

        const newRowData = [
            {
                name: 'gp_member_name',
                value: formData.get('gp_member_name') || '', // Default value if not found
            },
            {
                name: 'post',
                value: formData.get('post') || '', // Empty string if not found
            },
            {
                name: 'class',
                value: formData.get('class') || '', // Empty string if not found
            },
            {
                name: 'age',
                value: formData.get('age') || '', // Empty string if not found
            },
            {
                name: 'education',
                value: formData.get('education') || '', // Empty string if not found
            },
        ];



        // console.log([...data_list, newRowData]);
        setDataList([...data_list, newRowData])
        recieptBookReportForm.reset()
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

        let recieptBookReportForm = document.getElementById('reciept-book-report-form')

        const formData = new FormData(recieptBookReportForm)

        const newRowData = [
            {
                name: 'gp_member_name',
                value: formData.get('gp_member_name') || '', // Default value if not found
            },
            {
                name: 'post',
                value: formData.get('post') || '', // Empty string if not found
            },
            {
                name: 'class',
                value: formData.get('class') || '', // Empty string if not found
            },
            {
                name: 'age',
                value: formData.get('age') || '', // Empty string if not found
            },
            {
                name: 'education',
                value: formData.get('education') || '', // Empty string if not found
            },
        ];



        if (editRowIndex != -1) {
            let newDataArray = [...data_list]
            newDataArray[editRowIndex] = newRowData
            setDataList(newDataArray)
            editRowIndex = -1;
            toggleButtonsVisibility(true)
            recieptBookReportForm.reset()
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
            const saveButton = $('#save-reciept-book-report-btn');
            const updateButton = $('#update-reciept-book-report-btn');
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


            const url = isEdit ? `/namuna/3/reciept-book-report/update` : `/namuna/3/reciept-book-report/save`;

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
            $('#save-reciept-book-report-btn').prop('disabled', false);
            $('#update-reciept-book-report-btn').prop('disabled', false);
        }
    };

    $(document).on('click', '#save-reciept-book-report-btn, #update-reciept-book-report-btn', function (e) {
        e.preventDefault();
        let recieptBookReportForm = document.getElementById('reciept-book-report-form')


        const formData = new FormData(recieptBookReportForm)

        const otherFormData = new FormData(document.getElementById('other-data-form'))

        let sendData = {
            year: +formData.get('year'),
            data_list: data_list.map(singleArray => JSON.stringify(singleArray)),

            reciept_books: otherFormData.get('reciept_books'),
            namuna_10: otherFormData.get('namuna_10'),
            namuna_7: otherFormData.get('namuna_7'),

            kondwada_number: otherFormData.get('kondwada_number'),
            gp_fund: otherFormData.get('gp_fund'),
            gp_water_fund: otherFormData.get('gp_water_fund'),
            s_g_r_y: otherFormData.get('s_g_r_y'),
            b_v_a: otherFormData.get('b_v_a'),
            d_v_s_y: otherFormData.get('d_v_s_y'),


            id: formData.get('id'),
        }


        // console.log(sendData);


        handleSaveUpdate(sendData)
    })


    // Save the details to the backend
})