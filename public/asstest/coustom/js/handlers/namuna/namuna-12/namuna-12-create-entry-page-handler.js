$(document).ready(function () {

    const tableDataSequence = [
        {
            tableHeader: 'मागविलेल्या वस्तूचे/ मालाचे नाव',
            nameAttribute: 'item_name_or_goods_name',
        },
        {
            tableHeader: 'total_amount_previous_expense',
            nameAttribute: 'approval_number',
        },
        {
            tableHeader: 'पंचायतीचा मंजूरी दिनांक',
            nameAttribute: 'approval_date',
            isDate: true,
        },
        {
            tableHeader: 'नग/ वजन',
            nameAttribute: 'quantity_or_weight',
        },
        {
            tableHeader: 'दर',
            nameAttribute: 'rate',
        },
        {
            tableHeader: 'युनिट',
            nameAttribute: 'unit',
        },
        {
            tableHeader: 'एकूण रक्कम',
            nameAttribute: 'total_amount',
        },
        {
            tableHeader: 'एकूण रक्कम पूर्वीचा खर्च',
            nameAttribute: 'total_amount_previous_expense',
        },
    ];


    let spendingDataArray = [];

    function setSpendingDataArray(newArray) {
        spendingDataArray = newArray;
        renderSpendingData(spendingDataArray);
    }


    let emptySpendingEntry = {
        id: '',
        item_name_or_goods_name: '',
        approval_number: '',
        approval_date: '',

        quantity_or_weight: '',
        rate: '',
        unit: '',
        total_amount: '',
        total_amount_previous_expense: '',
        main_namuna_12_id_fk: '',
        // index: '-1'
    }

    let isOnEditPage = typeof _namuna12Entry != 'undefined'
    if (isOnEditPage) {
        emptySpendingEntry.main_namuna_12_id_fk = _namuna12Entry.id

        if (_namuna12Entry && _namuna12Entry.spendingData &&
            Array.isArray(_namuna12Entry.spendingData)
        ) {
            setSpendingDataArray(_namuna12Entry.spendingData)
        }
    }


    function setEntriesInSpendingDataModal(entry) {
        if (!entry) {
            console.error('No namuna 12 spending entry found')
            return
        }
        Object.keys(entry).forEach((key) => {
            console.log(key, entry[key])
            if (entry?.id && key == 'approval_date') {
                $(`#spendingDetailsForm [name="${key}"]`).val(entry[`_${key}`])
            } else {
                $(`#spendingDetailsForm [name="${key}"]`).val(entry[key])
            }
        })
    }

    setEntriesInSpendingDataModal(emptySpendingEntry)


    // Initialize datepicker for any date fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';


    function formatSpendingData(spendingDataArray) {
        // Format dates to 'YYYY-MM-DD'
        const formattedArray = spendingDataArray.map((spendingEntry) => {
            const newObject = {};

            // Iterate over each entry in the spendingEntry object
            for (const [key, value] of Object.entries(spendingEntry)) {
                let formattedValue = value; // Start with the original value

                // Check if the key matches any entry in the tableDataSequence
                for (const entry of tableDataSequence) {
                    // If there's a match and it's a date field, format the value
                    if (key === entry.nameAttribute && entry.isDate) {
                        formattedValue = formatDate(value); // Apply date formatting
                        break; // Exit the loop as we don't need to check further
                    }
                }

                // Assign the (possibly formatted) value to the new object
                newObject[key] = formattedValue;
            }

            return newObject; // Return the newly created object for this entry
        });
        return formattedArray;
    }

    function renderSpendingData(spendingDataArray) {
        let tableBody = $('#spending-table tbody');

        let totalSpending = 0;

        // Create table rows from the spending data array
        let tableBodyRows = spendingDataArray
            ?.map((spendingEntry, index) => {
                totalSpending += +spendingEntry.total_amount;
                return `<tr>
                            <td>${index + 1}</td>
                            ${tableDataSequence
                        .map((sequenceEntry) => {
                            return `<td>${sequenceEntry.nameAttribute == 'approval_date' && spendingEntry?.id ? spendingEntry[`_${sequenceEntry.nameAttribute}`] : spendingEntry[sequenceEntry.nameAttribute]}</td>`;
                        })
                        .join('')}
                        <td>
                            <div style='display:flex; gap:1rem;'>
                                <button type='button' class='btn btn-sm btn-success editTableEntryBtn' data-entry=${JSON.stringify(spendingEntry)} data-index='${index}'>
                                    <i class='fa fa-pencil'></i> 
                                </button>
                                <button type='button' class='btn btn-sm btn-danger deleteTableEntryBtn' data-index='${index}'>
                                    <i class='fa fa-trash'></i> 
                                </button>
                            </div>
                        </td>
                    </tr>`;
            })
            .join(''); // Join to concatenate the <tr> elements

        $(`[name='total_spending']`).val(totalSpending);
        // Insert the rows into the table body
        $(tableBody).html(tableBodyRows);
    }


    $('#spendingDetailsFormModal').on('hidden.bs.modal', function () {
        // Your code here
        $(this).attr('aria-hidden', 'false'); // force override if Bootstrap missed it
        setEntriesInSpendingDataModal(emptySpendingEntry)
    });



    $(document).on('click', '#openSpendingDetailsModalForNewEntry', function (e) {
        e.preventDefault()


        $('#spendingDetailsFormModal').modal('show')
        $('#updateNamuna12SpendingEntryBtn').css('display', 'none')
        $('#addEntryToTableBtn').css('display', 'inline-block')

    })


    $(document).on('click', '#updateNamuna12SpendingEntryBtn', async function (e) {
        e.preventDefault()

        if (isOnEditPage) {
            try {
                let spendingFormData = new FormData(document.getElementById('spendingDetailsForm'))
                spendingFormData.set('approval_date', formatDate(spendingFormData.get('approval_date')))
                let res = await fetch('/namuna/12/update-spending-entry', {
                    method: 'PUT',
                    body: spendingFormData
                })

                let { success, message } = await res.json()

                if (success) {
                    // console.log('success' + message)
                    alertjs.success({
                        t: 'SUCCESS',
                        m: message
                    }, () => location.reload())
                } else {
                    // alert('failure' + message)
                    alertjs.warning({
                        t: 'WARNING',
                        m: message
                    })
                }
            } catch (err) {
                console.error('Error:', err);
                alertjs.warning({
                    t: 'WARNING',
                    m: err?.message || err
                })
            }
            return;
        }

        // else i am on create page, no need ot save to database, update in local

        let spendingFormData = new FormData(document.getElementById('spendingDetailsForm'))

        let index = spendingFormData.get('index')

        let formDataObj = Object.fromEntries(spendingFormData.entries())

        spendingDataArray[index] = {
            ...spendingDataArray[index],
            ...formDataObj
        }

        setSpendingDataArray(spendingDataArray)
        $('#spendingDetailsFormModal').modal('hide')
    })

    $(document).on('click', '.editTableEntryBtn', function (e) {
        e.preventDefault()
        $('#spendingDetailsFormModal').modal('show')




        $('#addEntryToTableBtn').css('display', 'none')
        $('#updateNamuna12SpendingEntryBtn').css('display', 'inline-block')

        // Safely get and parse the JSON
        let entryString = $(this).attr('data-entry');
        let entryIndex = $(this).attr('data-index')


        // Assign value to index input present in the 
        console.log($('#index'))


        try {
            let entry = JSON.parse(entryString);
            // You can now populate the form using:
            for (let key in entry) {
                // console.log(key, '---------------', entry[key])
                $(`[name="${key}"]`).val(entry[key]);
            }

            setEntriesInSpendingDataModal(entry)
            $('#index').val(entryIndex)
        } catch (err) {
            console.error('Failed to parse entry JSON:', err);
        }
    })

    $(document).on('click', '#addEntryToTableBtn', async function (e) {
        e.preventDefault();


        // this means we are on edit page and it on this click add entry to teh database please
        if (emptySpendingEntry.main_namuna_12_id_fk) {

            try {

                let spendingFormData = new FormData(document.getElementById('spendingDetailsForm'))

                spendingFormData.set('approval_date', formatDate(spendingFormData.get('approval_date')))
                let res = await fetch('/namuna/12/save-spending-entry', {
                    method: 'POST',
                    body: spendingFormData
                })

                let { success, message } = await res.json()

                if (success) {
                    // console.log('success' + message)
                    alertjs.success({
                        t: 'SUCCESS',
                        m: message
                    }, () => location.reload())
                } else {
                    // alert('failure' + message)
                    alertjs.warning({
                        t: 'WARNING',
                        m: message
                    })
                }
            } catch (err) {
                console.error('Error:', err);
                alertjs.warning({
                    t: 'WARNING',
                    m: err?.message || err
                })
            }
            return;
        }

        // Validate the form
        if (!$('#spendingDetailsForm').valid()) {
            alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
            return;
        }
        const singleSpendingEntry = {}; // This will hold the new form data

        const spendingFormElement = document.getElementById('spendingDetailsForm');

        // Ensure the form exists before creating FormData
        if (spendingFormElement) {
            const spendingFormData = new FormData(spendingFormElement);

            for (const [key, value] of spendingFormData) {
                singleSpendingEntry[key] = value;
            }
            setSpendingDataArray([...spendingDataArray, { ...singleSpendingEntry }]);
            $('#spendingDetailsFormModal').modal('hide');
            spendingFormElement.reset();
        } else {
            console.error('Form not found!');
        }
    });

    $(document).on('click', '.deleteTableEntryBtn', function (e) {
        e.preventDefault();
        const index = Number($(this).attr('data-index'));
        let entrySelectedForDeltetion = spendingDataArray[index]

        if (!entrySelectedForDeltetion?.id) {
            setSpendingDataArray(spendingDataArray.filter((spendingEntry, idx) => idx != index));
            return
        }
        alert(entrySelectedForDeltetion.id)

        // if above condition is failed
        // then this will be for permanent Delete

        const deleteEntryFromDb = async () => {
            try {
                const res = await fetch('/namuna/12/delete-spending-entry', {
                    method: 'DELETE',
                    body: JSON.stringify({ id: entrySelectedForDeltetion.id }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                let { success, message } = await res.json()

                if (success) {
                    console.log('success' + message)
                    alertjs.success({
                        t: 'SUCCESS',
                        m: message
                    }, () => location.reload())
                } else {
                    // alert('failure' + message)
                    alertjs.warning({
                        t: 'WARNING',
                        m: message
                    })
                }
            } catch (err) {
                console.error('Error:', err);
                alertjs.warning({
                    t: 'WARNING',
                    m: err?.message || err
                })
            }
        }



        alertjs.deleteSpl('ही Entry कायमची Delete करायची?', (isYes) => {
            if (isYes) deleteEntryFromDb()
        })

    });

    // jQuery validation for the Namuna 12 form
    $('#namuna-12-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            bill_number: 'required',
            bill_date: 'required',
            name_of_person_accepting_bill: 'required',
            certificate_number: 'required',
            page_number_in_cash_book: 'required',
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            bill_number: 'कृपया देयक क्रमांक प्रविष्ट करा',
            bill_date: 'कृपया देयक दिनांक निवडा',
            name_of_person_accepting_bill: 'कृपया देयक स्वीकारणाऱ्याचे नाव प्रविष्ट करा',
            certificate_number: 'कृपया प्रमाणपत्र क्रमांक प्रविष्ट करा',
            page_number_in_cash_book: 'कृपया रोकडवहीतील पृष्ठ क्रमांक प्रविष्ट करा',
        },
    });

    $('#spendingDetailsForm').validate({
        rules: {
            item_name_or_goods_name: 'required', // Item name is required
            approval_number: 'required', // Approval number is required
            approval_date: 'required', // Approval date is required
            quantity_or_weight: { required: true, number: true }, // Quantity/Weight is required and must be a valid number
            rate: { required: true, number: true }, // Rate is required and must be a valid number
            unit: 'required', // Unit is required
            total_amount: { required: true, number: true }, // Total amount is required and must be a valid number
            total_amount_previous_expense: { required: true, number: true }, // Previous expense is required and must be a valid number
        },
        messages: {
            item_name_or_goods_name: 'कृपया वस्तूचे नाव प्रविष्ट करा', // Custom error message in Marathi
            approval_number: 'कृपया मंजुरी क्रमांक प्रविष्ट करा', // Custom error message
            approval_date: 'कृपया मंजुरी दिनांक निवडा', // Custom error message
            quantity_or_weight: {
                required: 'कृपया नग/वजन प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            }, // Custom error messages
            rate: { required: 'कृपया दर प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' }, // Custom error messages
            unit: 'कृपया युनिट प्रविष्ट करा', // Custom error message
            total_amount: {
                required: 'कृपया एकूण रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            }, // Custom error messages
            total_amount_previous_expense: {
                required: 'कृपया पूर्वीचा खर्च प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            }, // Custom error messages
        },
    });

    // Save Namuna 12 Entry
    $('#submit-namuna-12-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-12-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-12-form')[0];
            let namuna12FormData = new FormData(form);

            // Format date fields before sending the data
            const billDate = namuna12FormData.get('bill_date');

            // Reformat dates before setting them back into FormData
            namuna12FormData.set('bill_date', formatDate(billDate));

            namuna12FormData.set(
                'spending_data',
                JSON.stringify(formatSpendingData(spendingDataArray))
            );

            console.log('before here ');
            console.log(namuna12FormData.get('spending_data'));

            // Send POST request for saving
            const response = await fetch('/namuna/12/save', {
                method: 'POST',
                body: namuna12FormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success({ t: 'SUCCESS', m: 'सुरक्षितपणे जतन केले' }, () => {
                    window.location.reload();
                });
            } else {
                alertjs.warning({ t: 'ERROR', m: message || 'जतन करण्यात अयशस्वी' });
            }
        } catch (err) {
            console.error(`Error while saving the Namuna 12 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 12 Entry
    $('#update-namuna-12-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-12-form').valid()) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'कृपया सर्व आवश्यक फील्ड्स भरा'
                });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-12-form')[0];
            let namuna12FormData = new FormData(form);

            // Reformat dates before setting them back into FormData

            const billDate = namuna12FormData.get('bill_date');

            // Reformat dates before setting them back into FormData
            namuna12FormData.set('bill_date', formatDate(billDate));

            // Send PUT request for updating
            const response = await fetch(`/namuna/12/update`, {
                method: 'PUT',
                body: namuna12FormData,
            });

            const { call, message } = await response.json();

            if (call) {
                alertjs.success({ t: 'SUCCESS', m: 'सुरक्षितपणे अपडेट केले' }, () => {
                    window.location.reload();
                });
            } else {
                alertjs.warning({ t: 'ERROR', m: message || 'अपडेट करण्यात अयशस्वी' });
            }
        } catch (err) {
            console.error(`Error while updating the Namuna 12 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
