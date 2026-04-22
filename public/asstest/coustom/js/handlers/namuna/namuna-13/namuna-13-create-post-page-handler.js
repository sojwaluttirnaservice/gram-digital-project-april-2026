// import { dateFormat } from '../../../common.js';

$(document).ready(function () {
    // Initialize date picker for the order date
    $('#order-date').datepicker({
        dateFormat: 'dd-mm-yy', // or use 'dd-mm-yy' as required
        autoclose: true,
    });

    function dateFormat(_date) {
        return _date?.trim() ? _date.split('-').reverse().join('-') : '';
    }

    // Form validation using jQuery Validate
    $('#namuna-13-post-form').validate({
        rules: {
            post_name: {
                required: true,
                minlength: 3,
            },
            month: {
                required: true,
                min: 1,
                max: 12,
            },
            year: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4,
            },
            post_count: {
                required: true,
                digits: true,
            },
            approved_post: {
                required: true,
                digits: true,
                // lessThanEqualTo: '#post-count',
                // Use the custom rule
            },
            // order_number: {
            //     required: true,
            //     minlength: 3,
            // },
            order_date: {
                required: true,
                // date: true,
            },
            id: {
                required: false,
            },
        },
        messages: {
            post_name: {
                required: 'पदनाम भरा',
                minlength: 'पदनाम किमान ३ अक्षरे हवीत',
            },
            month: {
                required: 'महिना निवडा',
                min: 'महिना १ ते १२ च्या दरम्यान हवे',
                max: 'महिना १ ते १२ च्या दरम्यान हवे',
            },
            year: {
                required: 'वर्ष भरा',
                digits: 'केवळ अंक भरा',
                minlength: 'वर्ष ४ अंकांचे हवे',
                maxlength: 'वर्ष ४ अंकांचे हवे',
            },
            post_count: {
                required: 'पदांची संख्या भरा',
                digits: 'केवळ अंक भरा',
            },
            approved_post: {
                required: 'मंजूर पदांची संख्या भरा',
                digits: 'केवळ अंक भरा',
                lessThanEqualTo: 'मंजूर पदांची संख्या पदांची संख्येपेक्षा जास्त नसावी', // Custom message
            },
            // order_number: {
            //     required: 'आदेश क्रमांक भरा',
            //     minlength: 'आदेश क्रमांक किमान ३ अक्षरे हवे',
            // },
            order_date: {
                required: 'आदेश दिनांक निवडा',
                // date: 'वैध दिनांक भरा',
            },
        },
    });

    $(document).on('click', '#submit-namuna-13-post', async function (e) {
        e.preventDefault();

        try {
            if (!$('#namuna-13-post-form').valid()) {
                return;
            }

            let form = document.getElementById('namuna-13-post-form');
            // Get the form data using FormData API
            let formData = new FormData(form);
            formData.set('order_date', dateFormat(formData.get('order_date')));

            // Send data to the server using fetch API
            const response = await fetch('/namuna/13/post/create', {
                method: 'POST',
                body: formData,
            });

            // Parse the response as JSON
            const { call } = await response.json();

            if (call == 1) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: 'Saved successfully',
                    },
                    () => form.reset()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'something went wrong',
                });
            }
        } catch (error) {
            console.error('Error:', error); // Log the error to the console for debugging
            alertjs.warning({
                t: 'WARNING',
                m: 'something went wrong',
            });
        }
    });

    $(document).on('click', '#update-namuna-13-post', async function (e) {
        e.preventDefault();

        try {
            if (!$('#namuna-13-post-form').valid()) {
                return;
            }

            let form = document.getElementById('namuna-13-post-form');
            // Get the form data using FormData API
            let formData = new FormData(form);
            formData.set('order_date', dateFormat(formData.get('order_date')));

            // Send data to the server using fetch API
            const response = await fetch('/namuna/13/post/update', {
                method: 'PUT',
                body: formData,
            });

            // Parse the response as JSON
            const { call } = await response.json();

            if (call == 1) {
                alertjs.success(
                    {
                        t: 'SUCCESS',
                        m: 'Saved successfully',
                    },
                    () => form.reset()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'something went wrong',
                });
            }
        } catch (error) {
            console.error('Error:', error); // Log the error to the console for debugging
            alertjs.warning({
                t: 'WARNING',
                m: 'something went wrong',
            });
        }
    });
});
