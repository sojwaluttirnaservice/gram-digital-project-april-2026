$(document).ready(function () {
	console.log('education institute staff details upload js laoded')
	let isEdit = false
	let editStaffId = null
	/**
	 * Notes =
	 * education institute types
	 * 1 = अंगणवाडी
	 * 2 = शाळा
	 * 3 = कॉलेज
	 *  */

	const institute_type_list = [
		{ id: 1, type: 'अंगणवाडी' },
		{ id: 2, type: 'शाळा' },
		{ id: 3, type: 'कॉलेज' },
	]

	$('#upload-staff-details').on('click', function (e) {
		e.preventDefault()
		const { staffPhoto, staffName, staffMobno, staffDesignation } = get_form_data()

		const instituteId = get_institute_id_from_url_params()

		if (!validate_form_data(staffPhoto, staffName, staffMobno)) {
			return false
		}

		let formData = new FormData()

		formData.set('instituteId', instituteId)
		formData.set('staffName', staffName)
		formData.set('staffMobno', staffMobno);
		formData.set('staffDesignation', staffDesignation)

		if (!isEdit) {
			formData.set('staffPhoto', staffPhoto)
		}

		if (isEdit) {
			formData.set('editStaffId', editStaffId)
			formData.set('oldImageName', $(this).attr('data-oldImageName'))
			if (staffPhoto !== undefined && staffPhoto !== null) {
				formData.set('staffPhoto', staffPhoto)
			}
		}
		post_form_data(formData)
	})

	function get_institute_id_from_url_params() {
		const params = new URLSearchParams(window.location.search)
		const instituteId = params.get('id')
		return instituteId
	}

	function get_form_data() {
		let staffPhoto = document.querySelector('#staff-photo').files[0]
		let staffName = $('#staff-name').val().trim()
		let staffMobno = $('#staff-mobile-no').val();
		let staffDesignation = $('#staff-designation').val();
		return {
			staffPhoto,
			staffName,
			staffMobno,
			staffDesignation
		}
	}

	function validate_form_data(staffPhoto, staffName, staffMobno) {
		if (staffName === '') {
			alertjs.warning({ t: 'Please enter staff name' }, () => {})
			return
		}
		if (!isEdit) {
			if (staffPhoto === undefined || staffPhoto === null) {
				alertjs.warning({ t: 'Please select file' }, () => {})
				return
			}
		}

		if (staffMobno === '') {
			alertjs.warning({ t: 'Please enter staff mobile no' }, () => {})
			return
		}
		return true
	}

	// edit education details
	$(document).on('click', '.edit-institute-staff-btn', function (e) {
		e.preventDefault()

		isEdit = true
		editStaffId = $(this).attr('data-id')

		const edit_education_institute_staff_details = instituteStaff.filter(
			(staff) => {
				return staff.id === +editStaffId
			}
		)

		$('#staff-name').val(edit_education_institute_staff_details[0].staff_name)
		$('#staff-mobile-no').val(
			edit_education_institute_staff_details[0].staff_mob_no
		)
		$('#staff-designation').val(
			edit_education_institute_staff_details[0].staff_designation
		)
		let oldImageName = edit_education_institute_staff_details[0].staff_photo
		$('#upload-staff-details').attr('data-oldImageName', oldImageName)

		console.log(edit_education_institute_staff_details[0].staff_designation, 'w3232')

		// console.log('99999999999999999999999999 = ', edit_education_institute_staff_details[0])
		$('#upload-education-institute-details-modal').modal('show')
	})

	function post_form_data(formData) {
		let url
		if (isEdit) {
			url = '/master/update-education-institute-staff-details'
		} else {
			url = '/master/upload-education-institute-staff-details'
		}
		fetch(url, {
			method: 'POST',
			body: formData,
		})
			.then((result) => result.json())
			.then((result) => {
				if (result.call === 1 && isEdit) {
					alertjs.success({ t: 'Successful updation' }, () => {
						window.location.reload()
					})
				} else
					alertjs.success({ t: 'Successful added.' }, () => {
						window.location.reload()
					})
			})
			.catch((err) => {
				console.log('ERRror while editing ; ', err)
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	}

	// delete education details
	$(document).on('click', '.delete-institute-staff-btn', function (e) {
		e.preventDefault()
		let staffPhoto = $(this).attr('data-staffPhoto')
		let staffId = $(this).attr('data-id')
		deleteEducationDetails(staffPhoto, staffId)
	})

	function deleteEducationDetails(staffPhoto, staffId) {
		let url
		url = '/master/delete-institute-staff-details'

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ staffPhoto, staffId }),
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success({ t: 'Successful' }, () => {
						window.location.reload()
					})
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	}

	// add institute staff details.
	// $(document).on('click', '.add-institute-staff-btn', function (e) {
	// 	e.preventDefault()
	// 	const instituteId = $(this).attr('data-id')
	// 	window.open(
	// 		`/master/get-education-institute-add-staff-view?instituteId=${instituteId}`,
	// 		'_self'
	// 	)
	// })
})
