$(function () {

   $("input[name='birthdate_of_girl'], input[name='birthdate_of_groom'],  input[name='date_of_marriage'], input[name='date_of_reciept_of_marriage_info']").datepicker({
    dateFormat: 'dd/mm/yy'
   })
    const monthsMap = [
        { monthName: '-- महिना -- ', monthNumber: -1 },
        { monthName: 'जानेवारी', monthNumber: 1 },
        { monthName: 'फेब्रुवारी', monthNumber: 2 },
        { monthName: 'मार्च', monthNumber: 3 },
        { monthName: 'एप्रिल', monthNumber: 4 },
        { monthName: 'मे', monthNumber: 5 },
        { monthName: 'जून', monthNumber: 6 },
        { monthName: 'जुलै', monthNumber: 7 },
        { monthName: 'ऑगस्ट', monthNumber: 8 },
        { monthName: 'सप्टेंबर', monthNumber: 8 },
        { monthName: 'ऑक्टोबर', monthNumber: 10 },
        { monthName: 'नोव्हेंबर', monthNumber: 11 },
        { monthName: 'डिसेंबर', monthNumber: 12 },
    ];

    let monthHtml = monthsMap.map(({ monthName, monthNumber }) => {
        return `<option value=${monthNumber}> ${monthName} </option> `;
    });
    $('#selectAvahalMonth').html(monthHtml);

    const el = {
        monthDropdown: $('#monthDropdown'),
        selectAvahalYear: $('#selectAvahalYear'),
        marriageRegistrationAvahalYear: $('#marriageRegistrationAvahalYear'),
        newMarriageRegistrationAvahalButton: $('#newMarriageRegistrationAvahalButton'),
        closeMarriageRegistrationAvahalModal: $('.closeMarriageRegistrationAvahalModal'),
        addNewMarriageRegistrationAvahal: $('#addNewMarriageRegistrationAvahal'),
    };

    function showMarriageModal() {
        $('#newMarriageRegistrationAvahalModal').modal('show');
    }

    function hideMarriageModal() {
        $('#newMarriageRegistrationAvahalModal').modal('hide');
    }

    $('.gp-name1').keyup(function () {
        $('.gp-name2').val($(this).val());
    });

    $('.village-name1').keyup(function () {
        $('.village-name2').val($(this).val());
    });

    $(document).on('click', '#newMarriageRegistrationButton', function (e) {
        e.preventDefault();

        let marriageRegistrationTypes = [
            {
                marriageRegistrationType: 'विवाह नोंदणी',
            },
            {
                marriageRegistrationType: '१८ वर्षाचे आतील मुलीची विवाह नोंदणी',
            },
        ];

        let html = marriageRegistrationTypes.map((el) => {
            return `
                <button type='button' class='btn btn-primary font-weight-bold marriageRegistrationButton' data-m_reg_type='${el.marriageRegistrationType}'> 
                    ${el.marriageRegistrationType} 
                </button>`;
        });

        $('.marriageRegistrationTypes').html(html);
        $('#marriageRegistrationTypeModal').modal('show');
    });

    let marriageRegistrationType;
    $(document).on('click', '.marriageRegistrationButton', function (e) {
        e.preventDefault();

        marriageRegistrationType = $(this).attr('data-m_reg_type');

        $('#marriageRegistrationTypeModal').modal('hide');
        showMarriageModal();
    });

    el.closeMarriageRegistrationAvahalModal.click(function () {
        hideMarriageModal();
    });

    el.addNewMarriageRegistrationAvahal.click(function () {
        if (el.monthDropdown.val() === '-1') {
            alertjs.warning({
                t: 'कृपया महिना निवडा',
            });
            return false;
        }

        if (el.marriageRegistrationAvahalYear.val() === '') {
            alertjs.warning({
                t: 'कृपया वर्ष निवडा',
            });
            return false;
        }

        let data = {
            month: el.monthDropdown.val(),
            year: el.marriageRegistrationAvahalYear.val(),
        };

        window.open(
            `/marriage-registration-avahal/new-marriage-registration?type=${marriageRegistrationType}&month=${data.month}&year=${data.year}`,
            '_self'
        );
    });

    // VALIDATE #under18MarriageForm

    $('#under18MarriageForm').validate({
        rules: {
            name_of_under_18_married_girl: {
                required: true,
            },
            name_of_father_or_guardian_of_girl: {
                required: true,
            },
            address_of_under_18_married_girl: {
                required: true,
            },
            address_of_father_or_guardian_of_girl: {
                required: true,
            },
            birthdate_of_girl: {
                required: true,
            },
            age_of_girl_at_marriage: {
                required: true,
            },
            education_of_girl: {
                required: true,
            },
            name_of_groom: {
                required: true,
            },
            name_of_father_or_guardian_of_groom: {
                required: true,
            },
            address_of_groom: {
                required: true,
            },
            address_of_father_or_guardian_of_groom: {
                required: true,
            },
            birthdate_of_groom: {
                required: true,
            },
            age_of_groom_at_marriage: {
                required: true,
            },
            date_of_marriage: {
                required: true,
            },
            place_of_marriage: {
                required: true,
            },
            name_of_office_manager: {
                required: true,
            },
            address_of_bhataji: {
                required: true,
            },
            address_of_office: {
                required: true,
            },
            name_of_wedding_card_printing_house: {
                required: true,
            },
            name_of_owner_of_wedding_card_printing_house: {
                required: true,
            },
            address_of_wedding_card_printing_house: {
                required: true,
            },
        },
    });

    $('#marriageForm').validate({
        rules: {
            full_name_of_groom: { required: true },
            full_name_of_father_or_parent_of_groom: { required: true },
            age_of_groom: { required: true },
            nationality_of_groom: { required: true },
            religion_of_groom: { required: true },
            place_of_groom: { required: true },
            full_name_of_bride: { required: true },
            full_name_of_father_or_parent_of_bride: { required: true },
            place_of_bride: { required: true },
            bride_father_address: { required: true },
            age_of_bride: { required: true },
            nationality_of_bride: { required: true },
            religion_of_bride: { required: true },
            name_of_informant: { required: true },
            date_of_reciept_of_marriage_info: { required: true },
            date_of_marriage: { required: true },
            place_of_marriage: { required: true },
            shera: { required: true },
        },
    });

    // SUBMITTING THE UNDER 18 MARRIAGE REG FORM
    $('#under18Submit').click(function (e) {
        e.preventDefault();

        if (!$('#under18MarriageForm').valid()) {
            return false;
        }

        let formName = '#under18MarriageForm';
        let allData = getFormData(formName);

        $.ajax({
            url: '/marriage-registration-avahal/post-new-under-18-marriage-registration',
            method: 'POST',
            processData: false,
            contentType: false,
            data: allData,
            success: function (result) {
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'यशस्वी',
                        },
                        function () {
                            window.location.href = '/marriage-registration-avahal';
                        }
                    );
                }
            },
            error: function (error) {
                console.log('errorr ==== ', error);
                alert('Errorddfd  ', error);
                return false;
            },
        });
    });

    // SUBMITTING MARRIAGE REG FORM
    $('#marriageRegSubmit').click(function (e) {
        e.preventDefault();

        if (!$('#marriageForm').valid()) {
            return false;
        }

        let formName = '#marriageForm';
        let allData = getFormData(formName);

        $.ajax({
            url: '/marriage-registration-avahal/post-new-marriage-registration',
            method: 'POST',
            processData: false,
            contentType: false,
            data: allData,
            success: function (result) {
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'यशस्वी रित्या जतन केले.',
                        },
                        function () {
                            window.location.href = '/marriage-registration-avahal';
                        }
                    );
                }
            },
            error: function (error) {
                alert('Error', error);
                return false;
            },
        });
    });

    function getFormData(formName, isUpdate = false, month = -1, year = -1) {
        let formArr = $(formName).serializeArray();
        let formData = new FormData();

        if (isUpdate) {
            formData.set('month', month);
            formData.set('year', year);
            // console.log("month year ", month, year)
        } else {
            let searchParams = new URLSearchParams(window.location.href);
            formData.set('month', searchParams.get('month'));
            formData.set('year', searchParams.get('year'));
        }

        $.each(formArr, function (_, value) {
            formData.set(value.name, value.value);
            console.log(value.name, value.value)
        });

        // console.log('data in functino ', formData);

        return formData;
    }

    $('#selectAvahalMonth, #selectAvahalYear, #printMarraigeAvahalBtn').addClass('d-none');

    // get avahal list as per month and year and type selected

    $('#selectMarraigeAvahalType').change(function () {
        let type = $('#selectMarraigeAvahalType').val();

        // get years
        getUniqueYear(type);
    });

    function getUniqueYear(type) {
        $.ajax({
            url: '/marriage-registration-avahal/get-filled-years',
            method: 'POST',
            data: {
                type: type,
            },
            success: function (result) {
                $('#selectAvahalYear').removeClass('d-none');
                $('#selectAvahalYear').html('');

                $('#selectAvahalYear').html(
                    '<option value=-1> -- वर्ष --</option>' +
                        result.data.map(({ year }) => {
                            return `<option value='${year}'> ${year}</option>`;
                        })
                );
            },
            error: function (error) {
                alert('Error', error);
                return false;
            },
        });
    }

    // get the month data
    $(document).on('change', '#selectAvahalYear', function () {
        if ($(this).val() === '-1') {
            $('#printMarraigeAvahalBtn').addClass('d-none');
            $('#marriageAvahalListTable').addClass('d-none');
            $('#selectAvahalMonth').addClass('d-none');
            return false;
        }

        let sendData = {
            year: $(this).val(),
            type: $('#selectMarraigeAvahalType').val(),
        };

        $.ajax({
            url: '/marriage-registration-avahal/get-filled-months',
            method: 'POST',
            data: {
                data: sendData,
            },
            success: function (result) {
                $('#selectAvahalMonth').removeClass('d-none');
                $('#selectAvahalMonth').html('');

                $('#selectAvahalMonth').html(
                    '<option value=-1> -- महिना --</option>' +
                        result.data.map(({ month }) => {
                            return `<option value='${month}'> ${month}</option>`;
                        })
                );
            },
            error: function (error) {
                alert('Error', error);
                return false;
            },
        });
    });

    // GET ACTUAL AHAVAL DATA
    let printData;

    $(document).on('change', '#selectAvahalMonth', function () {
        if ($(this).val() === '-1') {
            $('#printMarraigeAvahalBtn').addClass('d-none');
            $('#marriageAvahalListTable').addClass('d-none');
            return false;
        }

        let sendData = {
            type: $('#selectMarraigeAvahalType').val(),
            year: $('#selectAvahalYear').val(),
            month: $('#selectAvahalMonth').val(),
        };

        $.ajax({
            url: '/marriage-registration-avahal/get-avahal-data',
            method: 'POST',
            data: sendData,
            success: function (result) {
                printData = result.data;

                // CHECK IF THERE ARE ANY RESULT
                if (result.data.length >= 1) {
                    $('#printMarraigeAvahalBtn').removeClass('d-none');
                    $('#marriageAvahalListTable').removeClass('d-none');

                    // CHECK TYPE OF AHAVAL AND AS PER THAT PRINTIG THE TABLES
                    if (sendData.type === 'marriage') {
                        clearHtml();
                        printTableMarriage(printData, 'marriage');
                        // const headingHtml = printMarriageAvahalTableHeading();
                        // const html = printMarriageAvahalTable(result.data);
                        // $('#marriageAvahalListTable').html(headingHtml + html);
                    }
                    if (sendData.type === 'under18Marriage') {
                        clearHtml();

                        printTableMarriage(printData, 'under18Marriage');
                        // const headingHtml = printUnder18MarriageTableHeading();
                        // const html = printUnder18MarriageTable(result.data);
                        // $('#marriageAvahalListTable').html(headingHtml + html);
                    }
                }
            },
            error: function (error) {
                alert('Error', error);
                return false;
            },
        });
    });

    function clearHtml() {
        $('#marriageAvahalListTable').html('');
    }

    function printTableMarriage(data, type) {
        console.log(type);
        console.log(printData);

        if (type === 'marriage') {
            const headingHtml = printMarriageAvahalTableHeading();
            const html = printMarriageAvahalTable(data);
            $('#marriageAvahalListTable').html(headingHtml + html);
        }

        if (type === 'under18Marriage') {
            const headingHtml = printUnder18MarriageTableHeading();
            const html = printUnder18MarriageTable(data);
            $('#marriageAvahalListTable').html(headingHtml + html);
        }
    }

    function printMarriageAvahalTableHeading() {
        return `<tr>
              <th class='bg-primary text-white' scope="col">अ क्र</th>
              <th class='bg-primary text-white' scope="col">विवाह माहिती मिल्यालाची तारिक </th>
              <th class='bg-primary text-white' scope="col">विवाह झाल्याची तारिक व ठिकाण </th>
              <th class='bg-primary text-white' scope="col">वरचे संपूर्ण नाव, वय, राहण्याचे ठिकाण </th>
              <th class='bg-primary text-white' scope="col">वधूचे संपूर्ण नाव, वय, राहण्याचे ठिकाण </th>
              <th class='bg-primary text-white' scope="col">धर्म (वराचा)</th>
              <th class='bg-primary text-white' scope="col">धर्म (वधूचा)</th>
              <th class='bg-primary text-white' scope="col">राष्ट्रीयत्वा (वरचे) </th>
              <th class='bg-primary text-white' scope="col">राष्ट्रीयत्वा (वधूचे) </th>
              <th class='bg-primary text-white' scope="col">वरचे वडिलांचे, पालकाचे संपूर्ण नाव </th>
              <th class='bg-primary text-white' scope="col">वधूचे वडिलांचे, पालकाचे संपूर्ण नाव </th>
              <th class='bg-primary text-white' scope="col">माहिती देणाराचे नाव </th>
              <th class='bg-primary text-white' scope="col">शेरा</th>
              <th class='bg-primary text-white' scope='col'>अपडेट</th>
              <th class='bg-primary text-white' scope='col'>डिलीट</th>
            </tr>`;
    }

    function printMarriageAvahalTable(data) {
        return data.map((val, i) => {
            return ` <tr> 
                  <td scope="col">${i + 1}</td>
                  <td scope="col">${val.date_of_reciept_of_marriage_info} </td>
                  <td scope="col"> ${val.date_of_marriage} , ${val.place_of_marriage} </td>
                  <td scope="col">${val.full_name_of_groom}, ${val.age_of_groom}, ${
                      val.place_of_groom
                  } </td>
                  <td scope="col"> ${val.full_name_of_bride}, ${val.age_of_bride}, ${
                      val.place_of_bride
                  } </td>
                  <td scope="col">${val.religion_of_groom}</td>
                  <td scope="col">${val.religion_of_bride}</td>
                  <td scope="col">${val.nationality_of_groom}  </td>
                  <td scope="col">${val.nationality_of_bride}  </td>
                  <td scope="col">${val.full_name_of_father_or_parent_of_groom} </td>
                  <td scope="col">${val.full_name_of_father_or_parent_of_bride} </td>
                  <td scope="col">${val.name_of_informant} </td>
                  <td scope="col">${val.shera}</td>

                  <td> <button type='button' data-id='${
                      val.id
                  }' data-type='marriage' class='btn p-1 bg-info edit-marriage-avahal-btn'> 
                    <i class='fa fa-edit text-white'></i> 
                  </button> </td> 

                  <td> <button type='button' data-id='${
                      val.id
                  }' data-type='marriage' class='btn p-1 bg-danger delete-marriage-avahal-btn'>
                     <i class='fa fa-trash text-white'></i> 
                    </button> </td> 
                </tr>`;
        });
    }

    function printUnder18MarriageTableHeading() {
        return `<tr>
              <th class='bg-primary text-white' scope="col">अ क्र</th>
              <th class='bg-primary text-white' scope="col">18 वर्षाचे आतील मुलीचे लग्न झालेल्या मुलीचे पूर्ण नाव व पत्ता</th>
              <th class='bg-primary text-white' scope="col">मुलीचे पित्याचे / पालकाचे पूर्ण नाव व पत्ता</th>
              <th class='bg-primary text-white' scope="col">मुलीची जन्म तारिक व लग्नाचे वेळी मुलीचे वय </th>
              <th class='bg-primary text-white' scope="col">मुलीचे शिक्षण </th>
              <th class='bg-primary text-white' scope="col">लग्नाचा दिनांक व स्थळ </th>
              <th class='bg-primary text-white' scope="col">वरचे व वराच्या पित्याचे / पालकाचे पूर्ण नाव व पत्ता </th>
              <th class='bg-primary text-white' scope="col">वरची जन्म तारिक व लग्नाचे वेळी वरचे वय </th>
              <th class='bg-primary text-white' scope="col">लग्न लावणारे भटजी/ भिक्शु / काजी इ. पत्ता </th>
              <th class='bg-primary text-white' scope="col">मंगलकार्यालयाचे वावस्थापाकाचे नाव व पत्ता</th>
              <th class='bg-primary text-white' scope="col">लग्न पत्रिका छापणारे छापखान्याचे व मालकाचे नाव व पत्ता</th>
              <th class='bg-primary text-white' scope='col'>एडीट</th>
              <th class='bg-primary text-white' scope='col'>डिलीट</th>
            </tr>`;
    }

    function printUnder18MarriageTable(data) {
        return data.map((val, i) => {
            return ` 
        <tr> 
          <td>${i + 1} </td> 
          <td>${val.name_of_under_18_married_girl} </td> 
          <td>${val.address_of_father_or_guardian_of_girl} </td> 
          <td>${val.birthdate_of_girl} </td> 
          <td>${val.education_of_girl} </td> 
          <td>${val.date_of_marriage}, ${val.place_of_marriage}</td> 
          <td>${val.name_of_groom}, ${val.name_of_father_or_guardian_of_groom}</td> 
          <td>${val.birthdate_of_groom} </td> 
          <td>${val.name_of_bhataji} </td> 
          <td>${val.name_of_wedding_card_printing_house}, ${
              val.address_of_wedding_card_printing_house
          } </td> 
          <td>${val.name_of_owner_of_wedding_card_printing_house} </td> 

          <td>
            <button type='button'  data-id='${
                val.id
            }' data-type='under18Marriage' class='btn p-1 bg-info edit-under-18-marriage-avahal-btn'>
            <i class='fa fa-edit text-white'></i> </button> 
          </td> 
          
          <td> 
            <button type='button' data-id='${
                val.id
            }' data-type='under18Marriage' class='btn p-1 bg-danger delete-marriage-avahal-btn'> 
            <i class='fa fa-trash text-white'></i>
            </button>
          </td> 
        </tr> 

      `;
        });
    }

    // DELETE THE MARRIAGE AVAHAL
    $(document).on('click', '.delete-marriage-avahal-btn', function (e) {
        e.preventDefault();

        alertjs.delete((status) => {
            if (status !== true) {
                return;
            }
        });

        const avahalId = $(this).attr('data-id');
        const avahalType = $(this).attr('data-type');

        $.ajax({
            url: '/marriage-registration-avahal/delete-entry',
            method: 'POST',
            data: {
                avahalId,
                avahalType,
            },
            success: function (result) {
                console.log(result);
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'यशस्वी रित्या डिलीट झाले.',
                        },
                        function () {
                            let filteredData = printData.filter((el, i) => {
                                return el.id != avahalId;
                            });

                            printTableMarriage(filteredData, avahalType);
                            printData = filteredData;
                        }
                    );
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

    $(document).on('click', '#printMarraigeAvahalBtn', function () {
        let printType = {
            type: $('#selectMarraigeAvahalType').val(),
            year: $('#selectAvahalYear').val(),
            month: $('#selectAvahalMonth').val(),
        };

        window.open(
            `/marriage-registration-avahal/print-marriage-avahal?type=${printType.type}&month=${printType.month}&year=${printType.year}`
        );
    });

    //UPDATE OF AVAHALS
    //NORMal

    $(document).on('click', '.edit-marriage-avahal-btn', function (e) {
        e.preventDefault();

        const id = $(this).attr('data-id');

        alert(id);
        window.open(
            `/marriage-registration-avahal/edit-marriage-entry-view?id=${id}&isUnder18=false`
        );
    });

    // UNDER  18

    $(document).on('click', '.edit-under-18-marriage-avahal-btn', function (e) {
        e.preventDefault();

        const id = $(this).attr('data-id');

        alert(id);
        window.open(
            `/marriage-registration-avahal/edit-under-18-marriage-entry-view?id=${id}&isUnder18=true`
        );
    });


    //UPDATE for BOTH

    $(document).on('click', '#under18UpdateBtn, #marriageRegUpdateBtn', async function (e) {
        e.preventDefault();
        const id = $(this).attr('data-id');
        const isUnder18 = $(this).attr('data-isUnder18') === 'true';

        const url = `/marriage-registration-avahal/update-single-marriage-registration-avahal-entry?id=${id}&isUnder18=${isUnder18}`;
        const month = $(this).attr('data-month');
        const year = $(this).attr('data-year');
        let allData;

        // console.log(isUnder18, 'Under18');
        if (isUnder18) {
            if (!$('#under18MarriageForm').valid()) {
                return false;
            }
            let formName = '#under18MarriageForm';
            allData = getFormData(formName, true, month, year);
            // console.log(allData, 'Under18');
        } else {
            if (!$('#marriageForm').valid()) {
                return false;
            }
            let formName = '#marriageForm';
            allData = getFormData(formName, true, month, year);
            // console.log(allData, 'Marriage');
        }

        await fetch(url, {
            method: 'POST',
            body: allData,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result, 'rtirhtihrtih');
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'यशस्वी रित्या अद्ययावत झाली.',
                        },
                        function () {
                            window.location.reload();
                        }
                    );
                } else if (result.call === 0) {
                    alertjs.warning(
                        {
                            t: 'अद्ययावत झाली नाही.',
                        },
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
