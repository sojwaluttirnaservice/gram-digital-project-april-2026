// $(document).ready(function () {
// alert(snapMale)
//     Webcam.set({
//         width: 220,
//         height: 190,
//         image_format: 'jpeg',
//         jpeg_quality: 100,
//     });

//     Webcam.attach('#cameraMale');
//     Webcam.set({
//         width: 220,
//         height: 190,
//         image_format: 'jpeg',
//         jpeg_quality: 100,
//     });
//     Webcam.attach('#cameraFemale');
//     // SHOW THE SNAPSHOT.
//     $(document).on('click', '#spanFemale', function (e) {
//         Webcam.snap(function (data_uri) {
//             snapFemale = data_uri;
//             $('#image-2-preview').prop('src', data_uri);
//         });
//     });

//     $(document).on('click', '#spanMale', function (e) {
//         Webcam.snap(function (data_uri) {
//             snapMale = data_uri;
//             // console.log(snapMale)
//             $('#image-1-preview').prop('src', data_uri);
//         });
//     });

   
// });

// function b64toBlob(b64Data, contentType, sliceSize) {
//     contentType = contentType || '';
//     sliceSize = sliceSize || 512;
//     var byteCharacters = atob(b64Data); // window.atob(b64Data)
//     var byteArrays = [];

//     for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//         var slice = byteCharacters.slice(offset, offset + sliceSize);

//         var byteNumbers = new Array(slice.length);
//         for (var i = 0; i < slice.length; i++) {
//             byteNumbers[i] = slice.charCodeAt(i);
//         }

//         var byteArray = new Uint8Array(byteNumbers);

//         byteArrays.push(byteArray);
//     }

//     var blob = new Blob(byteArrays, { type: contentType });
//     return blob;
// }
