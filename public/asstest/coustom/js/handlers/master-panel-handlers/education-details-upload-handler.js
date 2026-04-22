$(document).ready(function () {
	console.log('education details upload js laoded')
	let isEdit = false
	let editInstituteId = null
	/**
	 * Notes =
	 * education institute types
	 * 1 = अंगणवाडी
	 * 2 = शाळा
	 * 3 = कॉलेज
	 *  */

	$(document).on('click', '#createNewInstituteBtn', function (e) {
		e.preventDefault()
		$('#upload-education-institute-details-modal').modal('show')
	})


	$(document).on('click', '.show-gallery-btn', function (e) {
		e.preventDefault()
		let id = $(this).attr('data-id')
		let instituteName = $(this).attr('data-instituteName')
		window.location.href = `/master/master-institute-gallery-view?id=${id}&instituteName=${instituteName}`
	})
	// /*
	const institute_type_list = [
		{ id: 1, type: 'अंगणवाडी' },
		{ id: 2, type: 'शाळा' },
		{ id: 3, type: 'कॉलेज' },
	]

	$('#upload-institute-details-btn').on('click', function (e) {
		e.preventDefault()
		let { instituteName, instituteType, institutePhoto } = get_form_data()

		if (!validate_form_data(instituteName, instituteType, institutePhoto)) {
			return false
		}

		let formData = new FormData()

		formData.set('instituteName', instituteName)
		formData.set('instituteType', instituteType)

		if (!isEdit) {
			formData.set('institutePhoto', institutePhoto.files[0])
		}
		educationInstituteList

		if (isEdit) {
			formData.set('instituteId', editInstituteId)
			if (
				institutePhoto.files[0] !== null ||
				institutePhoto.files[0] !== undefined
			) {
				formData.set('institutePhoto', institutePhoto.files[0])
			}
		}

		post_form_data(formData)
	})

	function get_form_data() {
		let institutePhoto = document.querySelector('#institute-photo')
		let instituteName = $('#institute-name').val().trim()
		let instituteType = $('#institute-type').val()
		return {
			instituteName,
			instituteType,
			institutePhoto,
		}
	}

	function validate_form_data(instituteName, instituteType, institutePhoto) {
		if (instituteName === '') {
			alertjs.warning({ t: 'Please enter file name' }, () => {})
			return
		}

		if (!isEdit) {
			if (
				institutePhoto.files[0] === undefined ||
				institutePhoto.files[0] === null
			) {
				alertjs.warning({ t: 'Please select file' }, () => {})
				return
			}
		}

		if (instituteType === '-1' || instituteType === null) {
			alertjs.warning({ t: 'Please select type' }, () => {})
			return
		}
		return true
	}

	// edit education details
	$(document).on('click', '.edit-institute-btn', function (e) {
		e.preventDefault()

		isEdit = true
		editInstituteId = $(this).attr('data-id')

		const edit_education_institute = educationInstituteList.filter(
			(institute) => {
				return institute.id === +editInstituteId
			}
		)
		$('#institute-name').val(edit_education_institute[0].institute_name)
		$('#institute-type').val(edit_education_institute[0].institute_type)

		$('#upload-education-institute-details-modal').modal('show')
	})

	$(document).on('click', '.show-institute', function (e) {
		let id = $(this).attr('data-id')
		let instituteName = $(this).attr('data-instituteName')

		window.location.href = `/master/master-institute-details-view?id=${id}&instituteName=${instituteName}`
	})

	function post_form_data(formData) {
		let url
		if (isEdit) {
			url = '/master/edit-education-institute-details'
		} else {
			url = '/master/upload-education-institute-details'
		}
		fetch(url, {
			method: 'POST',
			body: formData,
		})
			.then((result) => {
				return result.json()
			})
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
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	}

	// delete education details
	$(document).on('click', '.delete-institute-btn', function (e) {
		e.preventDefault()
		let instituteImage = $(this).attr('data-instituteImage')
		let instituteId = $(this).attr('data-id')
		deleteEducationDetails(instituteImage, instituteId)
	})

	function deleteEducationDetails(instituteImage, instituteId) {
		let url
		url = '/master/delete-institute-details'

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ instituteImage, instituteId }),
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
	$(document).on('click', '#add-institute-staff-btn', function (e) {
		e.preventDefault()
		$('#upload-education-institute-details-modal').modal('show')
	})

	// */
})
