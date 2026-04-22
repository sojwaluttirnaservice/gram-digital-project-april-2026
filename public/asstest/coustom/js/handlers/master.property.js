$(document).ready(function () {
	$(document).on('click', '#btnPropertyForm', function (event) {
		event.preventDefault()
		var form = $('#propertyForm')[0]
		var formData = new FormData(form)

		if (formData.get('propertyDesc') == '-1') {
			alert('मालमत्तेचे वर्णन आवशक आहे.')
			return false
		}
		if (formData.get('propertySpecification') == '') {
			alert('बांधकामाचे विवरण आवशक आहे.')
			return false
		}

		if (formData.get('propertyLandRate') == '') {
			alert('जमिनीचा दर आवशक आहे.')
			return false
		}
		if (formData.get('isSkeepTax') == '-1') {
			alert('कर जोडणे पर्याय निवडा.')
			return false
		}
		if (formData.get('isSkipDiwaArogya') == '-1') {
			alert('दिवाबत्ती आरोग्य पर्याय निवडा')
			return false
		}
		if (formData.get('isSkipCleaningTax') == '-1') {
			alert('स्वच्छता कर पर्याय निवडा')
			return false
		}
		if (formData.get('isSkipEducationTax') == '-1') {
			alert('शिक्षण कर पर्याय निवडा')
			return false
		}
		if (formData.get('isSkipTreeTax') == '-1') {
			alert('वृक्ष कर पर्याय निवडा')
			return false
		}
		if (formData.get('isSkipFireblegateTax') == '-1') {
			alert('अग्नी कर पर्याय निवडा')
			return false
		}
		if (homeManager.isEdit == -1) {
			var url = '/master/rate-setting/save-new-gram-prop-specification'
		} else {
			var url = '/master/rate-setting/update-gram-prop-specification'
		}
		var sendData = {
			url: url,
			method: 'post',
			processData: false,
			contentType: false,
			cache: false,
			data: formData,
		}
		homeManager.saveNewPropertyDetails(sendData)
	})

	$('#updatePropertyRateAll').on('click', function (e) {
		e.preventDefault()
		let updatedPropertyRateAmount = $('#updatedPropertyRate').val()

		$.ajax({
			url: '/master/updatePropertyRateAll',
			method: 'POST',
			data: { updatedPropertyRateAmount },
			success: function (result) {
				console.log(result)
				if (result.call == 1) {
					location.reload()
				}
			},
			error: function (err) {
				alert('Error occured please check console')
				console.log(err)
			},
		})
	})

	$(document).on('click', '.changePSInfo', function (event) {
		var details = Number($(this).data('id'))

		window.scrollTo({
			top: document.getElementById('propertyForm').offsetTop - 100,
			behavior: 'smooth',
		})
		console.log(details)
		details = homeManager.propSpace[details]
		// console.log(details, 'details')
		$('#propertyDesc').val(details.ps_pd_id)
		$('#propertySpecification').val(details.ps_name)
		$('#propertyLandRate').val(details.ps_land_rate)
		$('#isSkeepTax').val(details.ps_skeep_tax)
		$('#propertyID').val(details.id)
		$('#isSkipDiwaArogya').val(details.ps_skip_diwa_arogya)
		$('#isSkipCleaningTax').val(details.skipCleaningTax)
		$('#isSkipEducationTax').val(details.skipEducationTax)
		$('#isSkipTreeTax').val(details.skipTreeTax)
		$('#isSkipFireblegateTax').val(details.skipFireblegateTax)
		homeManager.isEdit = 1
	})
	$(document).on('click', '.removePSInfo', function (event) {
		var _id = Number($(this).data('id'))
		var id = homeManager.propSpace[_id].id
		var sendData = {
			url: '/master/rate-setting/remove-gram-prop-specification',
			method: 'post',
			data: {
				id: id,
			},
		}
		homeManager.removeDetails(sendData)
	})
	homeManager.printPropSpecification(function (list) {
		$('#propertySpecificationTbody').html(list)
	})
	$(document).on('click', '.removePSInfo', function (event) { })
	//changePSInfo
})
var homeManager = new MasterHandler()
function MasterHandler() {
	var _this = this
	this.isEdit = -1
	this.propDesc = []
	this.propSpace = []
	this.saveNewPropertyDetails = function (configData) {
		_this
			.ajaxPromise(configData)
			.then((data) => {
				alert('Saved !!!!!')
				_this.isEdit = -1
				window.location.reload()
			})
			.catch((error) => {
				alert('error')
				console.log(error)
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
	this.removeDetails = function (sendData) {
		_this
			.ajaxPromise(sendData)
			.then(function () {
				alert('Successfully Deleted !!!')
				window.location.reload()
			})
			.catch(function (error) {
				alert('error')
				console.log(error)
			})
	}
	this.printPropSpecification = function (callback) {
		console.log(_this.propSpace)
		var _tr = _this.propSpace
			.map(function (element, index) {
				return `<tr>
						<td width="15%">${element.ps_name}</td>
						<td width="8%">${element.pd_name}</td>
						<td width="10%">${element.ps_land_rate}</td>
						<td width="8%">${Number(element.ps_skeep_tax) == 0 ? 'हो' : 'नाही'}</td>
						<td width='8%'> ${Number(element.ps_skip_diwa_arogya) == 0 ? 'हो' : 'नाही'} </td>
						<td width='8%'> ${Number(element.skipCleaningTax) == 0 ? 'हो' : 'नाही'} </td>
						<td width='8%'> ${Number(element.skipEducationTax) == 0 ? 'हो' : 'नाही'} </td>
						<td width='8%'> ${Number(element.skipTreeTax) == 0 ? 'हो' : 'नाही'} </td>
						<td width='8%'> ${Number(element.skipFireblegateTax) == 0 ? 'हो' : 'नाही'} </td>
						<td width="8%">
							<span class="hand fa fa-edit text-primary changePSInfo" data-id="${index}"></span>
							<span class="hand ml-2 fa fa-trash text-danger removePSInfo" data-id="${index}"></span>
						</td> 
                  </tr>
                  `
			})
			.join('')
		callback(_tr)
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

	$(document).on('change', '#isSkipAllTax', function (e) {
		let val = $(this).val()
		$('[name="isSkeepTax"').val(val)
		$('[name="isSkipDiwaArogya"').val(val)
		$('[name="isSkipCleaningTax"').val(val)
		$('[name="isSkipEducationTax"').val(val)
		$('[name="isSkipTreeTax"').val(val)
		$('[name="isSkipFireblegateTax"').val(val)
	})
}
