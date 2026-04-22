$(function () {
	$('#loginNavigation').on('click', function (e) {
		e.preventDefault()
		if (gpCount === 0) {
			window.location.assign('/login')
		} else {
			daisyUIModal.show('myModal')
		}
	})
	$('#newApplicationNavigation').on('click', function (e) {
		e.preventDefault()
		if (gpCount === 0) {
			window.location.assign('/new-application-form')
		} else {
			console.log(gpCount)
			daisyUIModal.show('myModal1')
		}
	})
})
