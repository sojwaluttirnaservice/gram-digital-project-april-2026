$(() => {
    // Attach the change event on selected employee
    $(document).on('change', '#selected-employee', function (e) {
        // Get employee id from value atribte

        const employeeId = $(this).val();
        // There will be two views for employee form and payment form
        // if selected employee is null, make both views none

        if (employeeId == '') {
            $('#namuna-19-employee-form').hide();
            $('#namuna-19-payment-form').hide();
            $('#namuna-19-payment-form [name="employee_id_fk"]').val('');
            return;
        }

        let selectedOption = $(this).find(':selected');
        // GEt employee details
        // Check if the data-employee attribute exists and is not empty
        const dataEmployee = selectedOption.attr('data-employee');
        const employeeData = JSON.parse(dataEmployee);
        // make first view visible and second invisible

        $('#namuna-19-employee-form').show();
        // alert(employeeId)
        $('#namuna-19-payment-form [name="employee_id_fk"]').val(employeeId);

        showPaymentAlreadyDoneBox(false);
        handleVisibilityOfButtons({
            showSave: false,
            showDelete: false,
        });

        $.each(employeeData, function (key, value) {
            // Check if there's an input field with the same name or ID as the key
            const inputField = $('#namuna-19-employee-form').find(`[name=${key}]`);
            if (inputField?.length > 0) {
                // Set the value of the input field if it exists
                inputField.val(value);
            }
        });

        $('#namuna-19-payment-form').show();
        $('#namuna-19-payment-form [name="employee_id_fk"]').val(employeeId);
    });

    // Trigger the change event on page load to simulate the initial check
    $('#selected-employee').trigger('change');
    // showPaymentAlreadyDoneBox(false)

    function handleCalculateSalary(e = null) {
        e?.preventDefault();
        let grampanchayatShareSalary = $(
            '#namuna-19-employee-form [name="grampanchayat_share"]'
        ).val();

        const selectedWorkingDays = $("#namuna-19-payment-form [name='working_days']").val();
        const selectedPresentDays = $(
            "#namuna-19-payment-form [name='present_days'] option:selected"
        ).val();

        let calculatedSalary = 0;

        if (selectedWorkingDays != '' && selectedWorkingDays > 0) {
            calculatedSalary = (
                (selectedPresentDays / selectedWorkingDays) *
                grampanchayatShareSalary
            ).toFixed(2);
        }

        // clg

        $('#namuna-19-payment-form [name="calculated_grampanchayat_salary"]').val(calculatedSalary);
    }

    function countNumberOfDaysExceptSundays(month, year) {
        return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => i + 1).filter(
            (day) => new Date(year, month - 1, day).getDay() !== 0
        ).length;
    }

    // Now handle month and year chage in the payment form

    // function which will handle the change of month and year
    async function handleMonthYearChange(e) {
        e.preventDefault();
        const month = $('#namuna-19-payment-form [name="month"]').val();
        const year = $('#namuna-19-payment-form [name="year"]').val();
        const employeeId = $('#namuna-19-payment-form [name="employee_id_fk"]').val();


        if (month == '' || year == '') {
            return;
        }

        const workingDaysInput = $('#working-days');
        // workingDaysInput.val(0);

        // Add a default "Select" option
        // console.log(workingDaysInput.length);
        let workingDaysInThisMonth = countNumberOfDaysExceptSundays(month, year);

        // Add options for days (1 to daysInMonth)
        workingDaysInput.val(workingDaysInThisMonth);
        if (!employeeId) return;

        // Now get the payment details for this month and year from db

        const existingPaymentRecordForSelectedMonthAndYear = await handleFetchGetPaymentRecord({
            month,
            year,
            employeeId,
        });



        if (existingPaymentRecordForSelectedMonthAndYear?.length > 0) {
            const paymentRecord = existingPaymentRecordForSelectedMonthAndYear[0];
            setNamuna19PaymentFormFieldsReadonlyStatus(true);
            showPaymentAlreadyDoneBox(true);
            handleVisibilityOfButtons({ showSave: false, showDelete: true });
            setValuesInPaymentForm(paymentRecord);
            addAttributeToDeleteButton(paymentRecord);
            return;
        }



        setNamuna19PaymentFormFieldsReadonlyStatus(false);
        handleVisibilityOfButtons({ showSave: true, showDelete: false });
        showPaymentAlreadyDoneBox(false);
        setValuesInPaymentForm();
        addAttributeToDeleteButton();
        addAttributeToDeleteButton();
    }
    // Attach envents on month and year change

    $(document).on('change', "[name='month'], [name='year']", handleMonthYearChange);

    function handleWorkingDaysChange(e) {
        // alert('GEtting triggered');

        // alert('Changing the working days count herer')

        e?.preventDefault();
        const workingDays = parseInt($('#working-days').val(), 10); // Get the value of working days

        // Ensure the value is valid and between 1 and 31
        if (workingDays >= 1 && workingDays <= 31) {
            const presentDaysSelect = $('#present-days');
            presentDaysSelect.empty(); // Clear existing options

            // Add options from 0 to the selected value of working days
            for (let day = 0; day <= workingDays; day++) {
                presentDaysSelect.append(`<option value="${day}">${day}</option>`);
            }

            // Make the select element editable (not readonly)
            presentDaysSelect.prop('readonly', false); // Remove readonly property

            handleCalculateSalary();
        } else {
            // If the value is invalid, clear the present days options
            $('#present-days').empty();
            $('#present-days').prop('readonly', true); // Keep the select readonly if invalid
        }
    }

    // Bind the event handler to the working-days input field
    $('[name="working_days"]').on('change input', handleWorkingDaysChange);
    $('[name="present_days"]').on('change', handleCalculateSalary);

    async function handleFetchGetPaymentRecord({ month, year, employeeId }) {
        const baseUrl = `/namuna/19/payment/history`;
        const queryParams = new URLSearchParams({ month, year, employeeId });

        const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;

        try {
            const _res = await fetch(url);

            const { call, paymentRecord } = await _res.json();

            if (call == 1) {
                return paymentRecord || [];
            }
        } catch (err) {
            console.log('Error while fetching the current record: ' + err.message);
        }
    }

    function addAttributeToDeleteButton(paymentRecord = null) {
        // console.log("payment recording attaching to delete button", paymentRecord.id);
        $('#delete-payment-record-btn').attr('data-paymentId', paymentRecord?.id);
    }

    function setValuesInPaymentForm(paymentRecord = null) {
        let stateShare = $('#namuna-19-employee-form [name="state_share"]').val();
        let pfCuttingPercentage = $('#namuna-19-employee-form [name="pf_cutting_percentage"').val();

        let grampanchayatShare = $('#namuna-19-employee-form [name="grampanchayat_share"]').val();
        $('#namuna-19-payment-form')
            .find('input, select, textarea')
            .each(function () {
                // Get the current field
                const inputField = $(this);

                const nameAttribute = inputField.attr('name');

                if (!paymentRecord || Object.keys(paymentRecord).length === 0) {
                    // Set the input field value to an empty string

                    if (nameAttribute == 'calculated_state_salary') {
                        let salaryAfterCutting = (
                            stateShare -
                            (stateShare * pfCuttingPercentage) / 100
                        ).toFixed(2);
                        inputField.val(salaryAfterCutting);
                    } else {
                        if (['employee_id_fk', 'month', 'year'].includes(nameAttribute)) {
                            // do nothign to this
                        }
                        else if (nameAttribute != 'working_days') {
                            inputField.val('');
                        } else {
                            $('#working-days').trigger('change');
                        }
                    }
                } else {
                    // Replace the value of the input field with paymentRecord[nameAttribute] if it exists, or set to an empty string
                    const value = paymentRecord[nameAttribute] ?? '';

                    console.log('Name attribute', nameAttribute, '  value =  ', value);

                    if (nameAttribute == 'employee_id_fk') {
                        // do nothigns to this
                    }
                    else if (nameAttribute == 'working_days') {
                        $('[name="working_days"]').trigger('change');
                    } else {
                        inputField.val(value);
                    }
                }
            });

        $("#namuna-19-payment-form [name='state_share'").val(stateShare);
        $("#namuna-19-payment-form [name='grampanchayat_share']").val(grampanchayatShare);
        $("#namuna-19-payment-form [name='pf_cutting_percentage']").val(pfCuttingPercentage);
    }

    function handleVisibilityOfButtons({ showSave = false, showDelete = false }) {
        const makePaymentBox = $('.make-payment');
        const deletePaymentBox = $('.delete-payment');
        if (showSave) {
            makePaymentBox.show();
        } else {
            makePaymentBox.hide();
        }

        if (showDelete) {
            deletePaymentBox.show();
        } else {
            deletePaymentBox.hide();
        }
    }

    function showPaymentAlreadyDoneBox(toShow) {
        if (toShow) {
            $('#payment-already-done-box').show();
        } else {
            $('#payment-already-done-box').hide();
        }
    }

    function setNamuna19PaymentFormFieldsReadonlyStatus(setReadOnlyStatusTo) {
        // Select all input fields within #namuna-19-payment-form with the readonly attribute
        $('#namuna-19-payment-form')
            .find('input[readonly]')
            .each(function () {
                // Get the current field
                const inputField = $(this);

                // Set the readonly status based on the parameter
                inputField?.prop('readonly', setReadOnlyStatusTo);
            });
    }

    // HANDLING THE SAVING THE OF PAYMENT RECORDS

    // Initialize jQuery validation
    $('#namuna-19-payment-form').validate({
        rules: {
            month: {
                required: true,
            },
            year: {
                required: true,
            },
            working_days: {
                required: true,
                digits: true,
            },
            present_days: {
                required: true,
                digits: true,
            },
            calculated_salary: {
                required: true,
                number: true,
            },
            employee_id_fk: {
                required: true,
            },
        },
        messages: {
            month: 'कृपया महिना निवडा.',
            year: 'कृपया वर्ष निवडा.',
            working_days: {
                required: 'कृपया कामाचे दिवस भरा.',
                digits: 'कामाचे दिवस वैध संख्येत भरा.',
            },
            present_days: {
                required: 'कृपया उपस्थितीचे दिवस भरा.',
                digits: 'उपस्थितीचे दिवस वैध संख्येत भरा.',
            },
            calculated_salary: {
                required: 'कृपया हजेरी वेतन भरा.',
                number: 'हजेरी वेतन वैध संख्येत भरा.',
            },
            employee_id_fk: 'कर्मचारी आयडी आवश्यक आहे.',
        },
        errorElement: 'div',
        errorClass: 'text-danger small-error', // Text will be styled as red
        // highlight: function (element) {
        //     $(element).addClass('is-invalid');
        // },
        // unhighlight: function (element) {
        //     $(element).removeClass('is-invalid');
        // },
        errorPlacement: function (error, element) {
            if (element.prop('type') === 'checkbox') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
    });

    async function handleSaveNamuna19PaymentRecord(paymentData) {
        try {
            const _res = await fetch('/namuna/19/payment/make', {
                method: 'POST',
                body: paymentData,
            });

            const { call, message, paymentRecord } = await _res.json();

            console.log(paymentRecord);

            if (call == 1) {
                alertjs.success(
                    {
                        t: 'Success',
                        m: 'Payment Saved Successfully',
                    },
                    () => {
                        setValuesInPaymentForm();
                        handleVisibilityOfButtons({ showSave: false, showDelete: false });
                    }
                );
            } else {
                alertjs.warning({
                    t: 'Warning',
                    m: 'सदर महिना आणि वर्ष ह्यासाठी ह्या कर्मचाऱ्याची नोंदणी झाली आहे',
                });
            }
        } catch (err) {
            console.log(`Error while saving the payment record: ${err.message}`);
        }
    }

    $(document).on('click', '#submit-namuna-19-payment-btn', function (e) {
        e.preventDefault();

        if (!$('#namuna-19-payment-form').valid()) {
            alertjs.warning({
                t: 'WARNING',
                m: 'सर्व माहिती भरा',
            });
            return;
        }

        const paymentData = new FormData(document.getElementById('namuna-19-payment-form'));
        handleSaveNamuna19PaymentRecord(paymentData);
    });

    //Delete functionality

    $(document).on('click', '#delete-payment-record-btn', async function (e) {
        e.preventDefault();

        const paymentId = +$(this).attr('data-paymentId');

        if (!paymentId) {
            alertjs.warning({
                t: 'WARNING',
                m: 'No payment id found',
            });
            return;
        }

        try {
            const _res = await fetch(`/namuna/19/payment/delete`, {
                method: 'DELETE',
                body: JSON.stringify({ id: paymentId }),
                headers: { 'Content-Type': 'application/json' },
            });

            const { call, message } = await _res.json();

            if (call == 1) {
                alertjs.success(
                    {
                        t: 'Success',
                        m: 'Payment Record Deleted Successfully',
                    },
                    () => {
                        setValuesInPaymentForm();
                        handleVisibilityOfButtons({ showSave: true, showDelete: false });
                        showPaymentAlreadyDoneBox(false);
                        addAttributeToDeleteButton();
                    }
                );
            }
        } catch (err) {
            console.error(`Error while deleting the payment record: ${err.message}`);
        }
    });
});
