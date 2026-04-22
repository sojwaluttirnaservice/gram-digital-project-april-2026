$(function () {
	$('#form-sabha-date').datepicker({
		dateFormat: 'dd/mm/yy',
	})

	$('#masikSabhaTharavForm').validate({
		rules: {
			form_sabha_time: { required: true },
			form_sabha_date: { required: true },
			form_sabha_from_year: { required: true },
			form_sabha_to_year: { required: true },
			form_sabha_subject: { required: true },
			form_sabha_tharav_number: { required: true },
			form_sabha_type: { required: true },
			form_sabha_soochak: { required: true },
			form_sabha_anumodak: { required: true },
			form_sabha_guests: { required: true },
			// form_sabha_chairman: { required: true },
			// form_sabha_officer_name: { required: true },
			// form_sabha_officer_position: { required: true },
			// form_sabha_officer_mobile: { required: true },
			// form_sabha_officer_email: { required: true, email: true },
			form_sabha_location: { required: true },
			form_sabha_subject_tharav: { required: true },
		},
	})

	var messages = {
		form_sabha_time: 'सभेची वेळ भरले नाही.',
		form_sabha_date: 'सभेची तारीख भरले नाही.',
		form_sabha_from_year: 'वर्षापासून भरले नाही.',
		form_sabha_to_year: 'वर्षापर्यंत भरले नाही.',
		form_sabha_subject: 'विषय भरले नाही.',
		form_sabha_tharav_number: 'ठराव क्र. भरले नाही.',
		form_sabha_type: 'सभेचा प्रकार भरले नाही.',
		form_sabha_soochak: 'सूचक भरले नाही.',
		form_sabha_anumodak: 'अनुमोदक भरले नाही.',
		// form_sabha_guests: 'सन्माननीय अधिकारी/ अतिथी भरले नाही.',
		form_sabha_chairman: 'सभेचे अध्यक्ष मान्यवर भरले नाही.',
		form_sabha_officer_name:
			'ग्रामसभेत अधिकारी / कर्मचारी/ पदाधीकाराचे नावे भरले नाही.',
		form_sabha_officer_position:
			'ग्रामसभेत अधिकारी / कर्मचारी/ पदाधीकाराचा हुद्दा भरले नाही.',
		form_sabha_officer_mobile: 'मोबाईल क्र भरले नाही.',
		form_sabha_officer_email:
			'ई-मेल भरले नाही. कृपया एक वैध ई-मेल पत्ता प्रविष्ट करा.',
		form_sabha_location: 'सभेचे स्थळ भरले नाही.',
		form_sabha_subject_tharav:
			'सभेपुढे विचाराकरीता आलेले विषय व ठराव भरले नाही.',
	}

	/*
    $('#parentTable').hide();
    $('#form-sabha-show-form-btn').hide();

    // Toggle the visibility of #parentTable and #masikSabhaTharavForm
    $('#form-sabha-print-view-btn').on('click', function () {
        $('#parentTable').show();
        $('#masikSabhaTharavForm').hide();
        $(this).hide();
        $('#form-sabha-show-form-btn').show();
    });

    $('#form-sabha-show-form-btn').on('click', function () {
        $('#parentTable').hide();
        $('#masikSabhaTharavForm').show();
        $(this).hide();
        $('#form-sabha-print-view-btn').show();
    });
    */

	const handleSaveSabhaDetails = async (
		formData,
		isUpdate = false,
		tharavId = -1
	) => {
		// console.log('manager form data', formData);
		const response = await fetch(
			`/tharav/save-sabha-tharav-details?isUpdate=${isUpdate}&tharavId=${tharavId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}
		)

		const data = await response.json()

		if (data.call == 1) {
			alertjs.success(
				{
					t: isUpdate
						? 'माहिती यशस्वीरीत्या अद्ययावत झाली'
						: 'माहिती यशस्वीरीत्या जतन झाली',
				},
				() => {
					if (isUpdate) {
						location.reload()
						return
					}
					document.getElementById('masikSabhaTharavForm').reset()
				}
			)
		} else if (data.call == 0) {
			alertjs.warning({
				t: isUpdate ? 'माहिती अद्ययावत नाही झाली' : 'माहिती जतन नाही झाली',
			})
		}
	}

	$('.dateInput').on('input', function () {
		$(this).val((_, value) =>
			value
				.replace(/[^\d]/g, '')
				.replace(
					/(\d{2})(\d{0,2})(\d{0,4})/,
					(_, d, m, y) => `${d}${m ? '/' + m : ''}${y ? '/' + y : ''}`
				)
				.substring(0, 10)
		)
	})

	var formData = $('#masikSabhaTharavForm').serializeArray()

	let sabhaData = {}
	/*
    // Convert the serialized array to an object
    $.each(formData, function (i, field) {
        $(`[name="${field.name}"]`).on('input', function () {
            // Update the sabhaData object when the input changes
            sabhaData[field.name] = $(this).val();
            console.log('onchange = ', sabhaData);

            $('#table-sabha-time').text(sabhaData['form_sabha_time']);
            $('#table-sabha-date').text(sabhaData['form_sabha_date']);
            $('#table-sabha-chairman').text(sabhaData['form_sabha_chairman']);
            $('#table-sabha-guests').text(sabhaData['form_sabha_guests']);

            $('#table-sabha-anumodak').text(sabhaData['form_sabha_anumodak']);
            $('#table-sabha-soochak').text(sabhaData['form_sabha_soochak']);

            $('#table-sabha-subject-tharav').text(sabhaData['form_sabha_subject_tharav']);
            $('#table-sabha-location').text(sabhaData['form_sabha_location']);
            $('#table-sabha-subject').text(sabhaData['form_sabha_subject']);

            $('#table-sabha-officer-email').text(sabhaData['form_sabha_officer_email']);
            $('#table-sabha-officer-mobile').text(sabhaData['form_sabha_officer_mobile']);

            $('#table-sabha-officer-name').text(sabhaData['form_sabha_officer_name']);
            $('#table-sabha-officer-position').text(sabhaData['form_sabha_officer_position']);

            $('#table-sabha-from-year').text(sabhaData['form_sabha_from_year']);
            $('#table-sabha-to-year').text(sabhaData['form_sabha_to_year']);

            $('#table-sabha-type').text(sabhaData['form_sabha_type']);

            $('#table-sabha-tharav-number').text(sabhaData['form_sabha_tharav_number']);

            /*
            // Update vasti name
            $('#form-sabha-vasti-name').text(sabhaData['form_sabha_vasti_name']);
            // Update vasti population
            $('#form-sabha-vasti-population').text(sabhaData['form_sabha_vasti_population']);
            // Update urvarit shillak anudan
            $('#form-sabha-vasti-urvarit-shillak-anudan').text(
                sabhaData['form_sabha_vasti_urvarit_shillak_anudan']
            );
            // Update year
            $('#form-sabha-vasti-year').text(sabhaData['form_sabha_vasti_year']);
            // Update work name
            $('#form-sabha-vasti-work-name').text(sabhaData['form_sabha_vasti_work_name']);
            // Update amount
            $('#form-sabha-vasti-amount').text(sabhaData['form_sabha_vasti_amount']);

        });
    });
    */

	// console.log(_isEdit)

	function renderMemberTable(members) {
		let html = `
            <table id="dataTable" class='w-100'>
                <thead>
                    <tr>
                        <th>क्रमांक</th>
                        <th>नाव</th>
                        <th>पद</th>
                        <th>क्रिया</th>
                    </tr>
                </thead>
                <tbody>
                    ${members
											.map(
												(item, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.name}</td>
                            <td>${item.post}</td>
                            <td><button type='button' class='btn btn-danger remove-member-btn' data-index ='${index}' )"><i class='fa fa-trash'></></button></td>
                        </tr>
                    `
											)
											.join('')}
                </tbody>
            </table>
        `

		$('#selectedMemberList').html(members.length ? html : '')
	}
	
	let memberArray = []
	if(typeof(_isEdit) != 'undefined'){

		memberArray = _isEdit && _tharavDetails != null
		? JSON.parse(_tharavDetails.sabha_officer_name_post)
		: []
		// console.log(memberArray)
	
		if (_isEdit) {
			renderMemberTable(memberArray)
		}
	}


	


	function handleRemoveMember(_index) {
		if (memberArray.length != 0) {
			memberArray = memberArray.filter((_, index) => index !== _index)
			renderMemberTable(memberArray)
			console.log(memberArray)
		}
	}

	$(document).on('click', '.remove-member-btn', function (e) {
		e.preventDefault()
		handleRemoveMember(+$(this).attr('data-index'))
	})

	function saveForm() {
		var isValid = $('#masikSabhaTharavForm').valid()

		if (!isValid) {
			var formFields = $('#masikSabhaTharavForm').find(
				':input, select, textarea'
			)

			for (var i = 0; i < formFields.length; i++) {
				var fieldName = $(formFields[i]).attr('name')
				var isValidField = $(formFields[i]).valid()

				// console.log(fieldName, " == ", isValidField);

				if (!isValidField) {
					var errorMessage = messages[fieldName]

					console.log(errorMessage)
					alertjs.warning({
						t: errorMessage,
					})
					return false
				}
			}
		}

		var formData = $('#masikSabhaTharavForm').serializeArray()
		// Convert the serialized array to an object
		$.each(formData, function (i, field) {
			sabhaData[field.name] = field.value
		})
		sabhaData[`form_sabha_officer_name_post`] = JSON.stringify(memberArray)
		return true
	}

	$(document).on('click', '.select-member-btn', function (e) {
		e.preventDefault()

		const name = $(this).attr('data-name')
		const post = $(this).attr('data-post')

		// Check if entry is already present
		const existingIndex = memberArray.findIndex(
			(member) => member.name === name && member.post === post
		)

		if (existingIndex !== -1) {
			// Entry exists, remove it
			// memberArray.splice(existingIndex, 1)
		} else {
			// Entry doesn't exist, add it
			memberArray.push({ name, post })
		}
		renderMemberTable(memberArray)
	})

	$('button#submit-sabha-details').on('click', function (e) {
		e.preventDefault()
		if (saveForm()) {
			handleSaveSabhaDetails(sabhaData)
		}
	})

	//Delete thrav

	const handleDeleteTharav = async (deleteId) => {
		const response = await fetch('/tharav/delete-sabha-tharav-details', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ deleteId }),
		})

		const data = await response.json()

		if (data.call === 1) {
			alertjs.success(
				{
					t: 'माहिती यशस्वीरीत्या काढली गेली',
				},
				function () {
					window.location.reload()
				}
			)
		} else if (data.call === 2) {
			alertjs.warning({
				t: 'माहिती यशस्वीरीत्या काढली गेली नाही',
			})
		}
	}

	$('.deleteTharavBtn').on('click', function (e) {
		e.preventDefault()
		const deleteId = $(this).attr('data-deleteId')
		alertjs.delete(function (isTrue) {
			if (isTrue) {
				handleDeleteTharav(deleteId)
			}
		})
	})

	//PRINT
	const handleGetTharavDetails = async (printId, date) => {
		window.open(
			`/tharav/get-sabha-tharav-print-view?printId=${printId}&tharavSabhaDate=${date}`,
			'_blank'
		)
	}

	$('.printTharavBtn').on('click', function (e) {
		e.preventDefault()
		const tharavId = $(this).attr('data-printId')
		const sabhaDate = $(this).attr('data-sabhaDate')
		// console.log(tharavId)
		// console.log(sabhaDate)
		handleGetTharavDetails(tharavId, sabhaDate)
	})

	//Edit tharav

	$('.editTharavBtn').on('click', function (e) {
		e.preventDefault()
		const tharavId = $(this).attr('data-editId')

		window.open(`/tharav/update-view?tharavId=${tharavId}`)
	})

	$('#update-sabha-details').on('click', function (e) {
		e.preventDefault()
		if (!saveForm()) return
		const tharavId = $(this).attr('data-updateId')

		console.log(tharavId)
		handleSaveSabhaDetails(sabhaData, true, tharavId)
	})
})
