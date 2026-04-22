// $(document).ready(function () {
// 	function hasTouchSupport() {
// 		return 'ontouchstart' in window || navigator.maxTouchPoints > 0
// 	}

// 	const isMobileDevice = hasTouchSupport()

// 	if (!isMobileDevice) {
// 		Webcam.set({
// 			width: 220,
// 			height: 190,
// 			image_format: 'jpeg',
// 			jpeg_quality: 100,
// 		})
// 		Webcam.attach('#camera')

// 		// SHOW THE SNAPSHOT.
// 		takeSnapShot = function () {
// 			Webcam.snap(function (data_uri) {
// 				imageData = data_uri
// 				$('#image-1-preview').prop('src', data_uri)
// 			})
// 		}
// 	}

//   if(isMobileDevice) {
//     $('#webcam-preview-btn').addClass('d-none')
//     $('#webcam-preview-div').addClass('d-none')
//   }
// })
// function b64toBlob(b64Data, contentType, sliceSize) {
// 	contentType = contentType || ''
// 	sliceSize = sliceSize || 512
// 	var byteCharacters = atob(b64Data) // window.atob(b64Data)
// 	var byteArrays = []

// 	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
// 		var slice = byteCharacters.slice(offset, offset + sliceSize)

// 		var byteNumbers = new Array(slice.length)
// 		for (var i = 0; i < slice.length; i++) {
// 			byteNumbers[i] = slice.charCodeAt(i)
// 		}

// 		var byteArray = new Uint8Array(byteNumbers)

// 		byteArrays.push(byteArray)
// 	}

// 	var blob = new Blob(byteArrays, { type: contentType })
// 	return blob
// }
