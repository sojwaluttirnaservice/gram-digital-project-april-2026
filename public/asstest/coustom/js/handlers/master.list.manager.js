$(document).ready(function () {
	console.log(postList)

	$('.postListTable').append(
		postList.map((post, i) => {
			return ` 
      <tr> 
        <td> ${post.post_name} </td> 
        <td> <button class='btn btn-sm btn-danger deletePost' data-id='${post.id}'> <i class='fa fa-trash'> </i> </button> </td>
      </tr>`
		})
	)

	$(document).on('click', '.deletePost', function (e) {
		e.preventDefault()
		let id = +$(this).attr('data-id')

		alertjs.deleteSpl('सदर पद काढून घायचे आहे का?', (status) => {
			if (status) {
				$.ajax({
					url: '/master/deletePost',
					method: 'POST',
					data: {
						data: JSON.stringify(id),
					},
					success: function (result) {
						if (result.call == 1) {
							alertjs.success(
								{
									t: 'सदर पद काढून घेतले',
								},
								() => {
									window.location.reload()
								}
							)
						}
					},
					error: function (err) {
						console.log(err)
					},
				})
			}
		})
	})

	$('.datavejTable').append(
		dastavejList.map((el, i) => {
			return ` 
      <tr> 
        <td> ${el}</td>
        <td> <button class='btn btn-sm btn-danger deleteDastavej' data-value="${el.trim()}"> <i class='fa fa-trash'> </i></button> </td>
      </tr>
    `
		})
	)

	$(document).on('click', '.deleteDastavej', function (e) {
		e.preventDefault()

		let deletedDastavej = $(this).data('value')

		let updatedDastavejArray = dastavejList.filter((el, i) => {
			return el.trim() !== deletedDastavej
		})

		$.ajax({
			url: '/master/deleteDastavej',
			method: 'POST',
			data: {
				data: JSON.stringify(updatedDastavejArray),
			},
			success: function (result) {
				console.log(result)
				if (result.call == 1) {
					window.location.reload()
				}
			},
			error: function (err) {
				console.log(err)
			},
		})
	})

	$(document).on('click', '#saveGpSadasyaPost', function () {
		var value = $('#gpSadasyaPost').val().trim()

		if (value == '') {
			alertjs.warning({
				t: 'कृपया सदस्य पदाचे नाव टाका',
			})
			return false
		}

		if (value !== '') {
			$.ajax({
				url: '/master/saveGpSadasyaPost',
				type: 'POST',
				data: {
					post: value,
					list: JSON.stringify(homeManager.postList),
				},
			})
				.done(function (data) {
					alertjs.success({
						t: 'पद जतन झले',
					}, () => {
            window.location.reload()
          })
				})
				.fail(function (error) {
					alert('server error')
					console.log(error)
				})
		}
	})

	$(document).on('click', '#saveGpDastaveg', function () {
		var value = $('#gpDastaveg').val()
		if (value.trim() == '') {
			alert('कृपया दस्तावेजचे नाव टाका ')
			return false
		}
		if (value.trim() != '') {
			$.ajax({
				url: '/master/saveGpDastaveg',
				type: 'POST',
				data: {
					doc: value,
					list: JSON.stringify(homeManager.dastavegList),
				},
			})
				.done(function (data) {
					alert('दस्तावेज जतन झले')
					window.location.reload()
				})
				.fail(function (error) {
					alert('server error')
					console.log(error)
				})
		}
	})
})
var homeManager = new MasterHandler()
function MasterHandler() {
	var _this = this
	this.isEdit = -1
	this.postList = []
	this.dastavegList = []
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
		var _tr = _this.dastavegList
			.map(function (element, index) {
				return `<tr>
                    <td width="20%">${element.ps_name}</td>
                    <td width="40%">${element.pd_name}</td>
                    <td width="15%">${element.ps_land_rate}</td>
                    <td width="15%">${
											Number(element.ps_skeep_tax) == 0 ? 'हो' : 'नाही'
										}</td>
                    <td width="10%">
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
}
