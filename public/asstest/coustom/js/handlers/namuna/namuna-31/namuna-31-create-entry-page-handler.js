$(document).ready(function () {
    // Initialize datepicker for any date fields
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy',
        changeMonth: true,
        changeYear: true,
    });

    flatpickr('.timepicker', {
        enableTime: true, // Enable the time picker
        noCalendar: true, // Disable the calendar (only time picker)
        dateFormat: 'h:i K', // 12-hour format with AM/PM
        time_24hr: false, // Use 12-hour format
        defaultHour: 12, // Default hour (12 for noon/midnight)
        defaultMinute: 0, // Default minute
        minuteIncrement: 1, // Minute step for selection
        minTime: '12:00 AM', // Minimum time allowed
        maxTime: '11:59 PM', // Maximum time allowed
    });

    // Function to reformat date to 'YYYY-MM-DD' for submission
    const formatDate = (_date) =>
        _date && _date.trim() ? _date.split('-').reverse().join('-') : '';

    const formatTime = (_time) => {
        console.log('this time', _time);

        if (!_time || !_time.trim()) return '';

        // Check if time is in 12-hour format (with AM/PM)
        const timeMatch = _time.match(/(\d{1,2}):(\d{2})(:(\d{2}))?\s*(AM|PM)/i);
        if (timeMatch) {
            // Extract the hour, minute, second, and AM/PM
            let hours = parseInt(timeMatch[1], 10);
            const minutes = timeMatch[2];
            const seconds = timeMatch[4] || '00';
            const period = timeMatch[5].toUpperCase();

            // Convert to 24-hour format
            if (period === 'PM' && hours < 12) {
                hours += 12; // Convert PM times (except 12 PM)
            } else if (period === 'AM' && hours === 12) {
                hours = 0; // Convert 12 AM to 00
            }

            let date24HourFormat = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // console.log('*******************', date24HourFormat);
            return date24HourFormat;
        }

        // If time is already in 24-hour format, just return it
        const [hours, minutes, seconds = '00'] = _time.split(':').map(Number);
        let date24HourFormat = '';
        if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
            date24HourFormat = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // console.log(date24HourFormat, '------------');
        return date24HourFormat; // Return empty string if the time format is incorrect
    };

    // jQuery validation for the form
    $('#namuna-31-form').validate({
        rules: {
            month: 'required',
            year: { required: true, number: true },
            name_of_person: 'required',
            office_location: 'required',
            departure_place: 'required',
            departure_date: 'required',
            departure_time: 'required',
            arrival_place: 'required',
            arrival_date: 'required',
            arrival_time: 'required',
            means_of_travel: 'required',
            rail_boat_name_class: 'required',
            ticket_count: { required: true, number: true },
            ticket_amount: { required: true, number: true },
            road_distance_km: { required: true, number: true },
            road_rate_per_km: { required: true, number: true },
            road_amount: { required: true, number: true },
            daily_allowance_days: { required: true, number: true },
            daily_allowance_rate: { required: true, number: true },
            daily_allowance_amount: { required: true, number: true },
            travel_reason: 'required',
            total_travel_amount: { required: true, number: true },
        },
        messages: {
            month: 'कृपया महिना निवडा',
            year: { required: 'कृपया वर्ष प्रविष्ट करा', number: 'कृपया वैध संख्या प्रविष्ट करा' },
            name_of_person: 'कृपया व्यक्तीचे नाव प्रविष्ट करा',
            office_location: 'कृपया कार्यालयाचे ठिकाण प्रविष्ट करा',
            departure_place: 'कृपया निगमन ठिकाण प्रविष्ट करा',
            departure_date: 'कृपया निगमन तारीख निवडा',
            departure_time: 'कृपया निगमन वेळ निवडा',
            arrival_place: 'कृपया आगमन ठिकाण प्रविष्ट करा',
            arrival_date: 'कृपया आगमन तारीख निवडा',
            arrival_time: 'कृपया आगमन वेळ निवडा',
            means_of_travel: 'कृपया प्रवासाचे साधन प्रविष्ट करा',
            rail_boat_name_class: 'कृपया रेल्वे किंवा बोटीचे नाव/वर्ग प्रविष्ट करा',
            ticket_count: {
                required: 'कृपया प्रवास तिकीट संख्या प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            ticket_amount: {
                required: 'कृपया तिकीटांची रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            road_distance_km: {
                required: 'कृपया रस्त्याने केलेला प्रवास प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            road_rate_per_km: {
                required: 'कृपया रस्त्याचे दर प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            road_amount: {
                required: 'कृपया रस्त्याने प्रवासाची रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            daily_allowance_days: {
                required: 'कृपया भत्ता मिळालेल्या दिवसांची संख्या प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            daily_allowance_rate: {
                required: 'कृपया दैनिक भत्ता दर प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            daily_allowance_amount: {
                required: 'कृपया दैनिक भत्त्याची रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
            travel_reason: 'कृपया प्रवासाचे कारण प्रविष्ट करा',
            total_travel_amount: {
                required: 'कृपया एकूण रक्कम प्रविष्ट करा',
                number: 'कृपया वैध संख्या प्रविष्ट करा',
            },
        },
    });

    // Save Namuna 31 Entry
    $('#submit-namuna-31-entry').on('click', async function (e) {
        e.preventDefault();
        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-31-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-31-form')[0];
            let namuna31FormData = new FormData(form);

            // Format date and time fields before sending the data
            const departure_date = namuna31FormData.get('departure_date');
            const arrival_date = namuna31FormData.get('arrival_date');
            const departure_time = namuna31FormData.get('departure_time');
            const arrival_time = namuna31FormData.get('arrival_time');

            // Reformat dates and times before setting them back into FormData
            namuna31FormData.set('departure_date', formatDate(departure_date));
            namuna31FormData.set('arrival_date', formatDate(arrival_date));
            namuna31FormData.set('departure_time', formatTime(departure_time));
            namuna31FormData.set('arrival_time', formatTime(arrival_time));

            // Send POST request for saving
            const response = await fetch('/namuna/31/save', {
                method: 'POST',
                body: namuna31FormData,
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
            console.error(`Error while saving the Namuna 31 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });

    // Update Namuna 31 Entry
    $('#update-namuna-31-entry').on('click', async function (e) {
        e.preventDefault();

        const submitButton = $(this);
        submitButton.prop('disabled', true);

        try {
            // Validate the form
            if (!$('#namuna-31-form').valid()) {
                alertjs.warning({ t: 'WARNING', m: 'कृपया सर्व आवश्यक फील्ड्स भरा' });
                submitButton.prop('disabled', false);
                return;
            }

            const form = $('#namuna-31-form')[0];
            let namuna31FormData = new FormData(form);

            // Format date and time fields before sending the data
            const departure_date = namuna31FormData.get('departure_date');
            const arrival_date = namuna31FormData.get('arrival_date');
            const departure_time = namuna31FormData.get('departure_time');
            const arrival_time = namuna31FormData.get('arrival_time');

            // Reformat dates and times before setting them back into FormData
            namuna31FormData.set('departure_date', formatDate(departure_date));
            namuna31FormData.set('arrival_date', formatDate(arrival_date));
            namuna31FormData.set('departure_time', formatTime(departure_time));
            namuna31FormData.set('arrival_time', formatTime(arrival_time));

            // Send PUT request for updating
            const response = await fetch('/namuna/31/update', {
                method: 'PUT', // Using PUT for update
                body: namuna31FormData,
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
            console.error(`Error while updating the Namuna 31 entry: ${err}`);
            alertjs.warning({ t: 'ERROR', m: 'काहीतरी चुकले' });
        } finally {
            submitButton.prop('disabled', false);
        }
    });
});
