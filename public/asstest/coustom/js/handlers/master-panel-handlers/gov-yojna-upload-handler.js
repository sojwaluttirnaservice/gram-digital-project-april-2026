$(document).ready(() => {
	console.log('gov yojna upload js laoded')
	let file = document.querySelector('#gov-yojna-file')
	$('#upload-gov-yojna-file').on('click', function (e) {
		e.preventDefault()

		let fileName = $('#gov-yojna-file-name').val().trim()

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
		fetch('/master/upload-gov-yojna-file', {
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


    // delte gov-yojna file
    $(document).on('click', '#delete-gov-yojna-file-btn', function(e){
        e.preventDefault();
        let fileName = $(this).attr('data-fileName')
        let fileId = $(this).attr('data-id')

        fetch('/master/delete-gov-yojna-file', {
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
