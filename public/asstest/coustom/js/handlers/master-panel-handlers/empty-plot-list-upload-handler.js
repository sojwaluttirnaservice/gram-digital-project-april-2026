$(document).ready(() => {
	console.log('empty-plot-list upload js laoded')
	let file = document.querySelector('#empty-plot-list-file')
	$('#upload-empty-plot-list-file').on('click', function (e) {
		e.preventDefault()

		let fileName = $('#empty-plot-list-file-name').val().trim()

		if (fileName === '') {
			alertjs.warning({ t: 'Please enter file name' }, () => {})
			return
		}

		if (file.files[0] === undefined || file.files[0] === null) {
			alertjs.warning({ t: 'Please select file' }, () => {})
			return
		}

		let formData = new FormData()
		formData.set('file', file.files[0])
		formData.set('fileName', fileName)

		post_file_data(formData)
	})

	function post_file_data(formData) {
		fetch('/master/upload-empty-plot-list-file', {
			method: 'POST',
			body: formData,
		})
			.then((result) => {
				return result.json()
			})
			.then((result) => {
				if (result.call === 1) {
					alertjs.success({ t: 'Successful' }, () => {
                        window.location.reload();
                    })
				}
			})
			.catch((err) => {
				alertjs.warning({ t: 'Error', m: err }, () => {})
			})
	}


    // delte empty-plot-list file
    $(document).on('click', '#delete-empty-plot-list-file-btn', function(e){
        e.preventDefault();
        let fileName = $(this).attr('data-fileName')
        let fileId = $(this).attr('data-id')

        fetch('/master/delete-empty-plot-list-file', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({fileName, fileId})
        })
        .then(result=>{
            return result.json()
        })
        .then(result=>{
            if (result.call === 1) {
                alertjs.success({t: 'Successful'}, ()=>{
                    window.location.reload();
                })
            }
        })
        .catch(err=>{
            alertjs.warning({t: 'Error', m: err}, ()=>{})
        })
    })
})
