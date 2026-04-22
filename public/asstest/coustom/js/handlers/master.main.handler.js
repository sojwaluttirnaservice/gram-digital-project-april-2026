$(document).ready(function () {
	// gav map upload

	$('#select-gav-map-btn').on('click', function (e) {
		e.preventDefault()
		$('#gpVillageMapTwo').trigger('click')
	})

	$('#gpVillageMapTwo').on('change', function (e) {
		let file = $(this)[0]
		if (!checkFileType(file)) {
			return false
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			$('#gavMapPreview').prop('src', e.target.result)
			$('#remove-gav-map-btn').removeClass('d-none')
		}
		reader.readAsDataURL(file.files[0])
	})

	$('#remove-gav-map-btn').on('click', function (e) {
		e.preventDefault()
		$(this).addClass('d-none')
		$('#gpVillageMapTwo').val = ''
		$('#gavMapPreview').prop('src', null)
	})

	// gramsevak sign upload

	function checkFileType(file) {
		let _fileExtension = file.files[0].name.split('.').pop()
		// console.log(_fileExtension, 'ext')
		// console.log('jpg')

		if (_fileExtension !== 'jpg') {
			if (_fileExtension !== 'jpeg') {
				alert('Only jpeg / jpg files are allowed')
				return false
			}
		}
		return true
	}


	// ----------------------  Gramsevak

	$('#select-gramsevak-sign-btn').on('click', function (e) {
		e.preventDefault()
		$('#gramsevak-sign').trigger('click')
	})

	$('#gramsevak-sign').on('change', function (e) {
		let file = $(this)[0]
		if (!checkFileType(file)) {
			return false
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			$('#gramsevakSignPreview').prop('src', e.target.result)
			$('#remove-gramsevak-sign-btn').removeClass('d-none')
		}
		reader.readAsDataURL(file.files[0])
	})

	$('#remove-gramsevak-sign-btn').on('click', function (e) {
		e.preventDefault()
		$(this).addClass('d-none')
		$('#gramsevak-sign').val = ''
		$('#gramsevakSignPreview').prop('src', null)
	})
	// xxxxxxxxxxxxxxxxxxxxxx Gramsevak

	// ----------------------- Gramsevak stamp upload
	$('#select-gramsevak-stamp-btn').on('click', function (e) {
		e.preventDefault()
		$('#gramsevak-stamp').trigger('click')
	})

	$('#gramsevak-stamp').on('change', function (e) {
		let file = $(this)[0]
		if (!checkFileType(file)) {
			return false
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			$('#gramsevakStampPreview').prop('src', e.target.result)
			$('#remove-gramsevak-stamp-btn').removeClass('d-none')
		}
		reader.readAsDataURL(file.files[0])
	})

	$('#remove-gramsevak-stamp-btn').on('click', function (e) {
		e.preventDefault()
		$(this).addClass('d-none')
		$('#gramsevak-stamp').val = ''
		$('#gramsevakStampPreview').prop('src', null)
	})
	// xxxxxxxxxxxxxxxxxxxxxxx Gramsevak stamp upload

	// sarpanch sign upload
	$('#select-sarpanch-sign-btn').on('click', function (e) {
		e.preventDefault()
		$('#sarpanch-sign').trigger('click')
	})

	$('#sarpanch-sign').on('change', function (e) {
		let file = $(this)[0]


		if (!checkFileType(file)) {
			return false
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			$('#sarpanchSignPreview').prop('src', e.target.result)
			$('#remove-sarpanch-sign-btn').removeClass('d-none')
		}
		reader.readAsDataURL(file.files[0])
	})

	$('#remove-sarpanch-sign-btn').on('click', function (e) {
		e.preventDefault()
		$(this).addClass('d-none')
		$('#sarpanch-sign').val = ''
		$('#sarpanchSignPreview').prop('src', null)
	})



	// ----------------------- Gramsevak stamp upload
	$('#select-sarpanch-stamp-btn').on('click', function (e) {
		e.preventDefault()
		$('#sarpanch-stamp').trigger('click')
	})

	$('#sarpanch-stamp').on('change', function (e) {
		let file = $(this)[0]
		if (!checkFileType(file)) {
			return false
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			$('#sarpanchStampPreview').prop('src', e.target.result)
			$('#remove-sarpanch-stamp-btn').removeClass('d-none')
		}
		reader.readAsDataURL(file.files[0])
	})

	$('#remove-sarpanch-stamp-btn').on('click', function (e) {
		e.preventDefault()
		$(this).addClass('d-none')
		$('#sarpanch-stamp').val = ''
		$('#sarpanchStampPreview').prop('src', null)
	})
	// xxxxxxxxxxxxxxxxxxxxxxx Gramsevak stamp upload







	// ----------------------- Gramsevak stamp upload
	$('#select-gp-office-stamp-btn').on('click', function (e) {
		e.preventDefault()
		$('#gp-office-stamp').trigger('click')
	})

	$('#gp-office-stamp').on('change', function (e) {
		let file = $(this)[0]
		if (!checkFileType(file)) {
			return false
		}
		const reader = new FileReader()
		reader.onload = (e) => {
			$('#gpOfficeStampPreview').prop('src', e.target.result)
			$('#remove-gp-office-stamp-btn').removeClass('d-none')
		}
		reader.readAsDataURL(file.files[0])
	})

	$('#remove-gp-office-stamp-btn').on('click', function (e) {
		e.preventDefault()
		$(this).addClass('d-none')
		$('#gp-office-stamp').val = ''
		$('#gpOfficeStampPreview').prop('src', null)
	})
	// xxxxxxxxxxxxxxxxxxxxxxx Gramsevak stamp upload











	if ($('#gpVillageMap').val() != '') {
		$('#mapData').removeClass('d-none')
		var i = `<iframe style="border: 0; width: 100%; height: 270px" src="${$(
			'#gpVillageMap'
		).val()}" frameborder="0" allowfullscreen=""></iframe>`
		$('#mapData').html(i)
	}
	$('#gpGav').change(function () {
		$('#gpGavLink').val('')
	})

	$(document).on('click', '#basicGramInfoBtn', function (event) {



		event.preventDefault()
		if ($('#gpGav').val() == '0' && $('#gpGavLink').val() == '') {
			alert('कृपया ग्रामपंचायत  वेबसाईट लिंक टाका')
			$('#gpGavLink').focus()
			return false
		}
		var form = $('#basicGramInfoForm')[0]
		let formData = new FormData(form)



		if (formData.get('gramsevakSignDisplay') === 'on') {
			formData.set('gramsevakSignDisplay', 1)
		} else {
			formData.set('gramsevakSignDisplay', 0)
		}

		if (formData.get('sarpanchSignDisplay') === 'on') {
			formData.set('sarpanchSignDisplay', 1)
		} else {
			formData.set('sarpanchSignDisplay', 0)
		}


		// do same for stamp 


		if (formData.get('gramsevakStampDisplay') === 'on') {
			formData.set('gramsevakStampDisplay', 1)
		} else {
			formData.set('gramsevakStampDisplay', 0)
		}

		if (formData.get('sarpanchStampDisplay') === 'on') {
			formData.set('sarpanchStampDisplay', 1)
		} else {
			formData.set('sarpanchStampDisplay', 0)
		}

		if (formData.get('gpOfficeStampDisplay') === 'on') {
			formData.set('gpOfficeStampDisplay', 1)
		} else {
			formData.set('gpOfficeStampDisplay', 0)
		}




		var sendData = {
			url: '/master/manage-gp/save-gp-info-1',
			method: 'post',
			processData: false,
			contentType: false,
			cache: false,
			data: formData,
		}
		homeManager
			.saveGramBasicInformation(sendData)
			.then(function (data) {
				alert('Saved ....')
				console.log(data)
			})
			.catch(function (error) {
				alert('You have sever error')
				console.log(error, '---')
			})
	})

	/*
  $(document).on("click", ".commonModalFrom", function (e) {
	homeManager.navigationType = Number($(this).data("id"));

	switch (homeManager.navigationType) {
	  case 1:
		window.location.assign("/master/user-excel");
		break;
	  case 2:
		window.location.assign("/master/gram-manager");
		break;
	  case 3:
		window.location.assign("/master/gram-sadasya");
		break;
	  case 4:
		window.location.assign("/master/karSudharni");
		break;
	  default:
		break;
	}
  });
  */

	$(document).on('change blur', '#gpVillageMap', function () {
		if ($('#gpVillageMap').val() == '') {
			$('#mapData').addClass('d-none')
			$('#mapData').html('')
		} else {
			$('#mapData').removeClass('d-none')
			var i = `<iframe style="border: 0; width: 100%; height: 270px" src="${$(
				'#gpVillageMap'
			).val()}" frameborder="0" allowfullscreen=""></iframe>`
			$('#mapData').html(i)
		}
	})

	$(document).on('click', '.changeInfoThree', function (event) {
		var id = (homeManager.isEditThree = Number($(this).data('id')))
		var text = homeManager.gramWork[id].info
		$('#inputGramMahitiThree').val(text)
	})

	$(document).on('click', '.changeInfoOne', function (event) {
		var id = (homeManager.isEdit = Number($(this).data('id')))
		var text = homeManager.gpInfo[id].info
		$('#inputGramMahitiOne').val(text)
	})

	$(document).on('click', '#btnGramMahitiThree', function (event) {
		var text = $('#inputGramMahitiThree').val()
		var id = homeManager.isEditThree
		if (text !== '') {
			if (id !== -1) {
				homeManager.gramWork[id].info = text
				homeManager.isEditThree = -1
			} else {
				homeManager.gramWork.push({ info: text })
			}

			var sendData = {
				url: '/master/manage-gp/save-gp-info-3',
				method: 'post',
				data: { data: JSON.stringify(homeManager.gramWork) },
			}
			homeManager
				.ajaxPromise(sendData)
				.then(function (data) {
					$('#inputGramMahitiThree').val('')
					return homeManager.printGramInfoThree()
				})
				.then(function (data) {
					$('#gramMahitiThreeList').html(data)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	})

	$(document).on('click', '#btnGramMahitiOne', function (event) {
		var text = $('#inputGramMahitiOne').val()
		var id = homeManager.isEdit
		if (text !== '') {
			if (id !== -1) {
				homeManager.gpInfo[id].info = text
				homeManager.isEdit = -1
			} else {
				homeManager.gpInfo.push({ info: text })
			}

			var sendData = {
				url: '/master/manage-gp/save-gp-info-2',
				method: 'post',
				data: { data: JSON.stringify(homeManager.gpInfo) },
			}
			homeManager
				.updateGramInformationOne(sendData)
				.then(function (data) {
					$('#inputGramMahitiOne').val('')
					return homeManager.printGramInfoOne()
				})
				.then(function (data) {
					$('#gramMahitiList').html(data)
				})
				.catch(function (error) {
					console.log(error)
				})
		}
	})

	$(document).on('click', '.removeInfoOThree', function (event) {
		if (homeManager.isEditThree == -1) {
			var id = Number($(this).data('id'))
			homeManager.removeGramWork(id)
		} else {
			alert("You can't delete this item , edit mode is on.Save Details First")
		}
	})
	$(document).on('click', '#nav-gp-info-tab', function () {
		homeManager
			.printGramInfoOne()
			.then(function (data) {
				$('#gramMahitiList').html(data)
			})
			.catch(function () { })
	})

	$(document).on('click', '#nav-gp-work-tab', function () {
		homeManager
			.printGramInfoThree()
			.then(function (data) {
				$('#gramMahitiThreeList').html(data)
			})
			.catch(function () { })
	})

	$(document).on('click', '.removeInfoOne', function (event) {
		if (homeManager.isEdit == -1) {
			var id = Number($(this).data('id'))
			homeManager.gpInfo.splice(id, 1)
			var sendData = {
				url: '/master/manage-gp/save-gp-info-2',
				method: 'post',
				data: { data: JSON.stringify(homeManager.gpInfo) },
			}
			homeManager
				.updateGramInformationOne(sendData)
				.then(function (data) {
					$('#inputGramMahitiOne').val('')
					return homeManager.printGramInfoOne()
				})
				.then(function (data) {
					$('#gramMahitiList').html(data)
				})
				.catch(function (error) {
					console.log(error)
				})
		} else {
			alert("You can't delete this item , edit mode is on.Save Details First")
		}
	})
	$(document).on('click', '#nav-villages-tab', function (event) {
		homeManager.getVillageList()
	})

	$(document).on('click', '.changeVillageInfo', function (event) {
		var id = Number($(this).attr('data-id'))

		window.location.href = `/master/gram-village-update-view?id=${id}`
	})
	$(document).on('click', '.removeVillageInfo', function (event) {
		var id = Number($(this).attr('data-id'))
		// var data = homeManager.gramVillagesList[id]
		homeManager.removeGramillage(Number(id))
	})

	$(document).on('click', '#updateGramVillageBtn', async function (e) {
		e.preventDefault()
		let villageName = $('#inputGramVellageName').val()
		let villageUrl = $('#inputGramVellageUrl').val()
		let villageMale = $('#inputGramVellageMale').val()
		let villageFemale = $('#inputGramVellageFemale').val()
		let villageSCCountMale = $('#inputSCCountMale').val()
		let villageSCCountFemale = $('#inputSCCountFemale').val()
		let villageSCCount = $('#inputSCCount').val()

		let villageSTCountMale = $('#inputSTCountMale').val()
		let villageSTCountFemale = $('#inputSTCountFemale').val()
		let villageSTCount = $('#inputSTCount').val()

		let villageNTCountMale = $('#inputNTCountMale').val()
		let villageNTCountFemale = $('#inputNTCountFemale').val()
		let villageNTCount = $('#inputNTCount').val()

		let villageOBCCountMale = $('#inputOBCCountMale').val()
		let villageOBCCountFemale = $('#inputOBCCountFemale').val()
		let villageOBCCount = $('#inputOBCCount').val()

		let villageOpenOthersCountMale = $('#inputOpenOthersCountMale').val()
		let villageOpenOthersCountFemale = $('#inputOpenOthersCountFemale').val()
		let villageOpenOthersCount = $('#inputOpenOthersCount').val()

		const container = document.getElementById('healthSubCentersContainer');
		const rows = container.querySelectorAll('.row');

		const healthSubCenters = [];


		// Additional form inputs
		let ward_numbers = $('#ward_numbers').val();
		let total_members = $('#total_members').val();
		let sarpanch_directly_elected_count = $('#sarpanch_directly_elected_count').val();
		let home_count = $('#home_count').val();
		let area_in_sq_hectare = $('#area_in_sq_hectare').val();
		let area_in_sq_km = $('#area_in_sq_km').val();

		let constituency_number = $('#constituency_number').val();
		let constituency_name = $('#constituency_name').val();
		let assembly_constituency_number = $('#assembly_constituency_number').val();
		let assembly_constituency_name = $('#assembly_constituency_name').val();

		let number_of_households = $('#number_of_households').val();
		let number_of_households_having_toilets = $('#number_of_households_having_toilets').val();
		let open_defecation_free_year = $('#open_defecation_free_year').val();
		let odf_plus_remarks = $('#odf_plus_remarks').val();

		let households_connected_to_waste_management = $('#households_connected_to_waste_management').val();
		let soak_pits = $('#soak_pits').val();
		let waste_management = $('#waste_management').val();

		let tank_location = $('#tank_location').val();
		let tank_capacity = $('#tank_capacity').val();
		let staff_in_charge = $('#staff_in_charge').val();
		let normal_rate = $('#normal_rate').val();
		let special_rate = $('#special_rate').val();


		rows.forEach(row => {
			const inputs = row.querySelectorAll('input');

			const center = {
				name: inputs[0]?.value.trim() || '',
				worker_name: inputs[1]?.value.trim() || '',
				contact: inputs[2]?.value.trim() || ''
			};

			// Optional: only push if name is filled
			if (center.name) {
				healthSubCenters.push(center);
			}
		});

		let id = $(this).attr('data-id')
		let sendData = {
			villageName: villageName,
			villageUrl: villageUrl,
			villageMale: villageMale,
			type: homeManager.isVillageEdit,
			villageFemale: villageFemale,
			villageSCCountMale,
			villageSCCountFemale,
			villageSCCount,

			villageSTCountMale,
			villageSTCountFemale,
			villageSTCount,

			villageNTCountMale,
			villageNTCountFemale,
			villageNTCount,

			villageOBCCountMale,
			villageOBCCountFemale,
			villageOBCCount,

			villageOpenOthersCountMale,
			villageOpenOthersCountFemale,
			villageOpenOthersCount,



			ward_numbers,
			total_members,
			sarpanch_directly_elected_count,
			home_count,
			area_in_sq_hectare,
			area_in_sq_km,
			constituency_number,
			constituency_name,
			assembly_constituency_number,
			assembly_constituency_name,
			number_of_households,
			number_of_households_having_toilets,
			open_defecation_free_year,
			odf_plus_remarks,
			households_connected_to_waste_management,
			soak_pits,
			waste_management,
			tank_location,
			tank_capacity,
			staff_in_charge,
			normal_rate,
			special_rate,

			health_sub_centers: JSON.stringify(healthSubCenters),

			id,
			// isUpdate: true
		}

		try {
			let url = '/master/manage-gp/save-update-village'
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(sendData),
				headers: {
					'Content-Type': 'application/json',
				},
			})

			const data = await response.json()
			if (data.call === 1) {
				alertjs.success(
					{
						t: 'Updated Successfully',
					},
					() => {
						window.history.back()
					}
				)
			}
		} catch (err) { }
	})

	$(document).on('click', '#btnGramVellage', function (event) {
		let villageName = $('#inputGramVellageName').val()
		let villageUrl = $('#inputGramVellageUrl').val()
		let villageMale = $('#inputGramVellageMale').val()
		let villageFemale = $('#inputGramVellageFemale').val()
		let villageSCCountMale = $('#inputSCCountMale').val()
		let villageSCCountFemale = $('#inputSCCountFemale').val()
		let villageSCCount = $('#inputSCCount').val()

		let villageSTCountMale = $('#inputSTCountMale').val()
		let villageSTCountFemale = $('#inputSTCountFemale').val()
		let villageSTCount = $('#inputSTCount').val()

		let villageNTCountMale = $('#inputNTCountMale').val()
		let villageNTCountFemale = $('#inputNTCountFemale').val()
		let villageNTCount = $('#inputNTCount').val()

		let villageOBCCountMale = $('#inputOBCCountMale').val()
		let villageOBCCountFemale = $('#inputOBCCountFemale').val()
		let villageOBCCount = $('#inputOBCCount').val()

		let villageOpenOthersCountMale = $('#inputOpenOthersCountMale').val()
		let villageOpenOthersCountFemale = $('#inputOpenOthersCountFemale').val()
		let villageOpenOthersCount = $('#inputOpenOthersCount').val()


		const container = document.getElementById('healthSubCentersContainer');
		const rows = container.querySelectorAll('.row');

		const healthSubCenters = [];


		// Additional form inputs
		let ward_numbers = $('#ward_numbers').val();
		let total_members = $('#total_members').val();
		let sarpanch_directly_elected_count = $('#sarpanch_directly_elected_count').val();
		let home_count = $('#home_count').val();
		let area_in_sq_hectare = $('#area_in_sq_hectare').val();
		let area_in_sq_km = $('#area_in_sq_km').val();

		let constituency_number = $('#constituency_number').val();
		let constituency_name = $('#constituency_name').val();
		let assembly_constituency_number = $('#assembly_constituency_number').val();
		let assembly_constituency_name = $('#assembly_constituency_name').val();

		let number_of_households = $('#number_of_households').val();
		let number_of_households_having_toilets = $('#number_of_households_having_toilets').val();
		let open_defecation_free_year = $('#open_defecation_free_year').val();
		let odf_plus_remarks = $('#odf_plus_remarks').val();

		let households_connected_to_waste_management = $('#households_connected_to_waste_management').val();
		let soak_pits = $('#soak_pits').val();
		let waste_management = $('#waste_management').val();

		let tank_location = $('#tank_location').val();
		let tank_capacity = $('#tank_capacity').val();
		let staff_in_charge = $('#staff_in_charge').val();
		let normal_rate = $('#normal_rate').val();
		let special_rate = $('#special_rate').val();


		rows.forEach(row => {
			const inputs = row.querySelectorAll('input');

			const center = {
				name: inputs[0]?.value.trim() || '',
				worker_name: inputs[1]?.value.trim() || '',
				contact: inputs[2]?.value.trim() || ''
			};

			// Optional: only push if name is filled
			if (center.name) {
				healthSubCenters.push(center);
			}
		});


		var sendData = {
			villageName: villageName,
			villageUrl: villageUrl,
			villageMale: villageMale,
			type: homeManager.isVillageEdit,
			villageFemale: villageFemale,
			villageSCCountMale,
			villageSCCountFemale,
			villageSCCount,

			villageSTCountMale,
			villageSTCountFemale,
			villageSTCount,

			villageNTCountMale,
			villageNTCountFemale,
			villageNTCount,

			villageOBCCountMale,
			villageOBCCountFemale,
			villageOBCCount,

			villageOpenOthersCountMale,
			villageOpenOthersCountFemale,
			villageOpenOthersCount,

			ward_numbers,
			total_members,
			sarpanch_directly_elected_count,
			home_count,
			area_in_sq_hectare,
			area_in_sq_km,
			constituency_number,
			constituency_name,
			assembly_constituency_number,
			assembly_constituency_name,
			number_of_households,
			number_of_households_having_toilets,
			open_defecation_free_year,
			odf_plus_remarks,
			households_connected_to_waste_management,
			soak_pits,
			waste_management,
			tank_location,
			tank_capacity,
			staff_in_charge,
			normal_rate,
			special_rate,

			health_sub_centers: JSON.stringify(healthSubCenters),
		}
		homeManager.saveUpdateVillageData(sendData)
	})

	//Video Gallery
	const handleUploadVideoGalleryLink = async (formData) => {
		try {
			let url = `/master/manage-gp/upload-video-gallery-link`
			const response = await fetch(url, {
				method: 'POST',
				body: formData,
			})

			const data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: 'यशस्वीरीत्या अपलोड झाली.',
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.log(`Error while uploading the video link ${err}`)
			alertjs.warning({
				t: 'अपलोड झाली नाही.',
			})
		}
	}

	const handleDeleteVideoGalleryLink = async (id) => {
		try {
			let url = `/master/manage-gp/delete-video-gallery-link?id=${id}`
			const response = await fetch(url, {
				method: 'DELETE',
			})

			const data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: 'यशस्वीरीत्या लिंक काढली गेली.',
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.log(`Error while uploading the video link ${err}`)
			alertjs.warning({
				t: 'लिंक काढली गेली नाही.',
			})
		}
	}

	$(document).on('click', '#uploadNewVideoGalleryVideoBtn', function (e) {
		e.preventDefault()

		let videoForm = document.getElementById('video-gallery-form')
		let formData = new FormData(videoForm)
		// let videoLink = $('#video-link').val().trim()


		if (formData.get('video_link')?.trim() == ''
			&& !formData.get('video_file')) {

			alertjs.warning({
				t: 'विडिओ लिंक भरा किंवा विडिओ अपलोड करा',
			})
			return
		}

		handleUploadVideoGalleryLink(formData)
	})

	$(document).on('click', '.deleteVideoBtn', function (e) {
		e.preventDefault()

		let id = $(this).attr('data-id')
		alertjs.deleteSpl('विडिओ काढायचा आहे का?', (status) => {
			if (status) {
				handleDeleteVideoGalleryLink(id)
			}
		})
	})

	$('#addVillageGuideForm').validate({
		rules: {
			village_guide_name: {
				required: true,
			},
			village_guide_title: {
				required: true,
			},
		},
	})

	$(document).on('click', '#addVillageGuideBtn', function (e) {
		e.preventDefault()
		$('#addVillageGuideModal').modal({
			show: true,
		})
	})

	const handleSaveVillageGuideDetails = async (formData) => {
		try {
			let url = `/master/save-village-guide`
			const response = await fetch(url, {
				method: 'POST',
				body: formData,
			})
			const data = await response.json()

			if (data.call === 1) {
				alertjs.success(
					{
						t: 'Added Successfully',
					},
					() => {
						window.location.reload()
					}
				)
			}
		} catch (err) {
			console.error(`Error : ${err}`)
			alertjs.warning({
				t: 'Failed',
			})
		}
	}

	function calculateSize(img, maxWidth, maxHeight) {
		let width = img.width
		let height = img.height

		if (width > height) {
			if (width > maxWidth) {
				height = Math.round((height * maxWidth) / width)
				width = maxWidth
			}
		} else {
			if (height > maxHeight) {
				width = Math.round((width * maxHeight) / height)
				height = maxHeight
			}
		}

		return [width, height]
	}

	function compressAndDisplayImage(
		fileInput,
		previewImageId,
		formDataKey,
		callback
	) {
		console.log(fileInput)
		if (fileInput.files && fileInput.files[0]) {
			let reader = new FileReader()
			reader.onload = function (e) {
				let img = new Image()
				img.src = e.target.result
				img.onload = function () {
					const canvas = document.createElement('canvas')
					const ctx = canvas.getContext('2d')

					// Set the target file size range in kilobytes (e.g., between 100 KB and 300 KB)
					const targetMinSizeKB = 100
					const targetMaxSizeKB = 200

					// Initial dimensions
					let maxWidth = 800
					let maxHeight = 1000

					// Maximum number of iterations to avoid an infinite loop
					const maxIterations = 10

					function compress(iteration) {
						// Calculate new width and height while maintaining proportions
						let [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight)

						canvas.width = newWidth
						canvas.height = newHeight
						ctx.drawImage(img, 0, 0, newWidth, newHeight)
						// Convert the canvas content to a blob (compressed image)
						canvas.toBlob(
							function (blob) {
								const compressedSizeKB = blob.size / 1024

								// console.log(
								// 	`Iteration ${iteration}: Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
								// )

								// Display the compressed image in the preview
								// $('#' + previewImageId).attr('src', URL.createObjectURL(blob))

								// If the compressed size is within the target range, stop
								if (
									compressedSizeKB <= targetMaxSizeKB ||
									compressedSizeKB >= targetMinSizeKB
								) {
									// Add the compressed image to FormData
									// formData.set(formDataKey, blob)
									// console.log(
									// 	`Final Compressed ${formDataKey} Size: ${compressedSizeKB} KB`
									// )
									// 	console.log('blob')
									callback(blob)
								} else if (iteration < maxIterations) {
									// Adjust the dimensions for the next iteration
									maxWidth *= 0.9 // Decrease by 10%
									maxHeight *= 0.9 // Decrease by 10%

									// Continue to the next iteration
									compress(iteration + 1)
								} else {
									console.log(
										'Maximum iterations reached. Compression stopped.'
									)
								}
							},
							'image/jpeg',
							0.9
						) // Adjust the quality as needed
					}

					// Start the iterative compression process
					compress(1)
				}
			}
			reader.readAsDataURL(fileInput.files[0])
		} else {
			console.log('in else')
			callback('')
		}
	}

	$(document).on('change', '#village-guide-photo', function () {
		let file = document.getElementById('village-guide-photo').files[0]
		console.log('file ', file)
		let reader = new FileReader()

		reader.addEventListener('load', function () {
			$('#village-guide-image-preview')[0].src = reader.result
		})
		reader.readAsDataURL(file)
	})

	$('#addVillageGuideForm').on('submit', function (e) {
		e.preventDefault()

		let isValid = $('#addVillageGuideForm').valid()

		if (!isValid) {
			alertjs.warning({
				t: 'सर्व माहिती भरा',
			})
			return
		}

		let id = $('#saveVillageGuideBtn').attr('data-id')
		let oldFileName = $('#saveVillageGuideBtn').attr('data-oldFileName')
		const formData = new FormData(
			document.getElementById('addVillageGuideForm')
		)

		let fileInput = document.querySelector('#village-guide-photo')
		let fileExtension =
			fileInput.files && fileInput.files[0]
				? fileInput.files[0].name.split('.').pop()
				: ''
		compressAndDisplayImage(
			fileInput,
			'village-guide-image-preview',
			'village_guide_photo',
			(blob) => {
				if (blob !== '') {
					formData.set('village_guide_photo', blob)
					formData.set('fileExtension', fileExtension)
				}
				formData.set('id', id)
				formData.set('oldFileName', oldFileName ?? '')
				handleSaveVillageGuideDetails(formData)
			}
		)
	})
})
var homeManager = new MasterHandler()
function MasterHandler() {
	var _this = this
	this.isEdit = -1
	this.isEditThree = -1
	this.isVillageEdit = -1
	this.gpInfo = []
	this.gramVillagesList = []
	this.gramWork = []
	this.navigationType = ''
	this.saveGramBasicInformation = function (configData) {
		return new Promise(function (resolve, reject) {
			ajax(configData, function (status, data) {
				if (status) resolve(data)
				else reject(data)
			})
		})
	}

	this.updateGramInformationOne = function (configData) {
		return new Promise(function (resolve, reject) {
			ajax(configData, function (status, data) {
				if (status) resolve(data)
				else reject(data)
			})
		})
	}

	this.ajaxPromise = function (configData) {
		return new Promise(function (resolve, reject) {
			ajax(configData, function (status, data) {
				if (status) resolve(data)
				else reject(data)
			})
		})
	}
	this.saveUpdateVillageData = function (data) {
		var sendData = {
			url: '/master/manage-gp/save-update-village',
			method: 'post',
			data: data,
		}
		_this
			.ajaxPromise(sendData)
			.then(function (data) {
				homeManager.isVillageEdit = -1
				_this.getVillageList()
			})
			.catch(function (error) {
				alert('error')
				console.log(error)
			})
	}
	this.removeGramillage = function (id) {
		var sendData = {
			url: '/master/manage-gp/remove-village',
			method: 'post',
			data: { id: id },
		}
		_this
			.ajaxPromise(sendData)
			.then(function () {
				_this.getVillageList()
			})
			.catch(function (error) {
				alert('error')
				console.log(error)
			})
	}
	this.removeGramWork = function (id) {
		homeManager.gramWork.splice(id, 1)
		var sendData = {
			url: '/master/manage-gp/save-gp-info-3',
			method: 'post',
			data: { data: JSON.stringify(homeManager.gramWork) },
		}
		_this
			.ajaxPromise(sendData)
			.then(function () {
				return homeManager.printGramInfoThree()
			})
			.then(function (data) {
				$('#gramMahitiThreeList').html(data)
			})
			.catch(function (error) {
				alert('error')
				console.log(error)
			})
	}

	this.getVillageList = function () {
		$('#inputGramVellageName').val('')
		$('#inputGramVellageUrl').val('')
		$('#inputGramVellageMale').val('')
		$('#inputGramVellageFemale').val('')
		var sendData = {
			url: '/master/manage-gp/get-village-list',
			method: 'get',
		}
		this.ajaxPromise(sendData)
			.then(function (data) {
				_this.gramVillagesList = data.data
				return _this.printVillage()
			})
			.then(function (data) {
				$('#gramVillagesList').html(data)
			})
			.catch(function (error) {
				alert('error')
				console.log(error)
			})
	}
	this.printVillage = function () {
		return new Promise(function (resolve, reject) {
			var _tr = _this.gramVillagesList.map(function (villageInfo, index) {
				return `<tr>
                    <td width="20%">${villageInfo.gp_name}</td>
                    <td width="50%">${villageInfo.gp_url}</td>
                    <td width="10%">${villageInfo.gp_male}</td>
                    <td width="10%">${villageInfo.gp_female}</td>

                    <td width="10%">${villageInfo.sc_count_male}</td>
                    <td width="10%">${villageInfo.sc_count_female}</td>
                    <td width="10%">${villageInfo.sc_count}</td>

                    <td width="10%">${villageInfo.st_count_male}</td>
					<td width="10%">${villageInfo.st_count_female}</td>
					<td width="10%">${villageInfo.st_count}</td>

                    <td width="10%">${villageInfo.nt_count_male}</td>
                    <td width="10%">${villageInfo.nt_count_female}</td>
                    <td width="10%">${villageInfo.nt_count}</td>

                    <td width="10%">${villageInfo.obc_count_male}</td>
                    <td width="10%">${villageInfo.obc_count_female}</td>
                    <td width="10%">${villageInfo.obc_count}</td>

                    <td width="15%">${villageInfo.open_others_count_male}</td>
                    <td width="15%">${villageInfo.open_others_count_female}</td>
                    <td width="15%">${villageInfo.open_others_count}</td>

                    <td width="10%">
                      <span class="hand fa fa-edit text-primary changeVillageInfo" data-id="${villageInfo.id}"></span>
                      <span class="hand ml-2 fa fa-trash text-danger removeVillageInfo" data-id="${villageInfo.id}"></span>
                    </td> 
                  </tr>
                  `
			})
			resolve(_tr)
		})
	}
	this.printGramInfoOne = function () {
		return new Promise(function (resolve, reject) {
			var _tr = _this.gpInfo
				.map(function (element, index) {
					return `<tr>
                    <td width="90%">${element.info}</td>
                    <td width="10%" class='d-flex align-items-center justify-content-center'>
                      <span class="hand fa fa-edit text-primary changeInfoOne" data-id="${index}"></span>
                      <span class="hand ml-2 fa fa-trash text-danger removeInfoOne" data-id="${index}"></span>
                    </td> 
                  </tr>
                  `
				})
				.join('')
			resolve(_tr)
		})
	}

	this.printGramInfoThree = function () {
		return new Promise(function (resolve, reject) {
			var _tr = _this.gramWork
				.map(function (element, index) {
					return `<tr>
                    <td width="90%">${element.info}</td>
                    <td width="10%" class='d-flex align-items-center justify-content-center'>
                      <span class="hand fa fa-edit text-primary changeInfoThree" data-id="${index}"></span>
                      <span class="hand ml-2 fa fa-trash text-danger removeInfoOThree" data-id="${index}"></span>
                    </td> 
                  </tr>
                  `
				})
				.join('')
			resolve(_tr)
		})
	}

	function ajax(configData, callback) {
		$.ajax(configData)
			.done(function (data) {
				callback(true, data)
			})
			.fail(function (error) {
				callback(false, error)
			})
	}
}
