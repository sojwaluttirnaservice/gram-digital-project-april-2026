$(() => {
    const $form = $('#aanganwadi-center-form');

    // 🛡️ Validation setup
    $form.validate({
        rules: {
            center_name: {
                required: true
            },
            center_number: {
                required: true
            },
            village_name: {
                required: true
            }
        },
        messages: {
            center_name: {
                required: "कृपया केंद्राचे नाव भरा."
            },
            center_number: {
                required: "कृपया केंद्र क्रमांक भरा."
            },
            village_name: {
                required: "कृपया गावाचे नाव भरा."
            }
        }
    });

    /**
     * Generic form submit handler
     * @param {Event} e
     * @param {'POST'|'PUT'} method
     */
    const handleSubmit = async (e, method) => {
        e.preventDefault();

        if (!$form.valid()) return;

        const form = $form[0];
        const formData = new FormData(form);

        try {
            const res = await fetch('/aanganwadi', {
                method,
                body: formData
            });

            const { success, message, data } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    if (method === 'POST') {
                        form.reset();
                        location.href = `/aanganwadi/edit/${data.id}`
                    }
                    // location.href = '/aanganwadi';
                });
            } else {
                alertjs.warning({
                    t: "WARNING",
                    m: message
                });
            }
        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: "ERROR",
                m: "काहीतरी चुकले."
            });
        }
    };

    // 🖱️ Attach event handlers
    $(document).on('click', '#save-aanganwadi-center-btn', e => handleSubmit(e, 'POST'));
    $(document).on('click', '#update-aanganwadi-center-btn', e => handleSubmit(e, 'PUT'));



    // BELOW WILL HANDLE THE PART OF YEAR ADDITION
    // Add year range
    async function handleAddYearRange(e) {
        e.preventDefault()

        let $yearRangeForm = $('#add-year-range-form')

        let yearRangeFormData = new FormData($yearRangeForm[0])

        try {

            // Add corresponding year range
            let resData = await fetch('/aanganwadi/year-range', {
                method: 'POST',
                body: yearRangeFormData
            })

            let { success, message } = await resData.json()

            if (success) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: message
                },
                    () => location.reload()
                )
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                })

            }

        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: 'WARNING',
                m: 'काहीतरी चुकले'
            })
        }
    }
    $(document).on('click', '#add-year-range-btn', handleAddYearRange)


    // update year range
    $(document).on('click', '.update-year-range-btn', async function (e) {
        e.preventDefault()
        const $form = $(this).closest('.edit-year-range-form');

        // Collect form data using jQuery
        const formData = new FormData($form[0]);

        try {
            const response = await fetch('/aanganwadi/year-range', {
                method: 'PUT',
                body: formData
            });


            const { success, message } = await response.json();

            if (success) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: message
                },
                    () => {
                        // $form.trigger('reset');
                        location.reload()
                    }
                )
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                })
            }


            // Optionally update UI here, e.g., add new entry to a list

        } catch (error) {
            alertjs.warning({
                t: 'WARNING',
                m: 'काहीतरी चुकले'
            })
            console.error(error);
        }
    });


    // DELETE YEAR RANGE

    // DELETE AGEWISE COUNT
    $(document).on('click', '.delete-year-range-btn', async function (e) {

        e.preventDefault()

        try {
            let id = $(this).attr('data-year-range-id')

            const resData = await fetch('/aanganwadi/year-range', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let { success, message } = await resData.json()

            if (success) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: message
                }, () => {
                    location.reload()
                })
                // () => location.reload()
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                })
            }

        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: 'WARNING',
                m: 'काहीतरी चुकले'
            })
        }
    })


    // -------------------CHILD COUNT--------------------------------------------
    // Add child
    $(document).on('click', '.add-child-count-btn', async function (e) {
        e.preventDefault()
        const $form = $(this).closest('.add-age-group-form');

        // Collect form data using jQuery
        const formData = new FormData($form[0]);
        try {
            const response = await fetch('/aanganwadi/agewise-count', {
                method: 'POST',
                body: formData
            });


            const { success, message } = await response.json(); // or .json() if you return JSON

            // alert('मुलांची संख्या यशस्वीरित्या जोडली!');
            if (success) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: message
                },
                    () => {
                        $form.trigger('reset');
                        location.reload()
                    }
                )
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                })
            }


            // Optionally update UI here, e.g., add new entry to a list

        } catch (error) {
            alertjs.warning({
                t: 'WARNING',
                m: 'काहीतरी चुकले'
            })
            console.error(error);
        }
    });


    // EDIT AGEWISE COUNT
    $(document).on('click', '.update-child-btn', async function (e) {
        e.preventDefault()
        const $form = $(this).closest('.edit-agewise-count-form');

        // Collect form data using jQuery
        const formData = new FormData($form[0]);

        try {
            const response = await fetch('/aanganwadi/agewise-count', {
                method: 'PUT',
                body: formData
            });


            const { success, message } = await response.json(); // or .json() if you return JSON

            // alert('मुलांची संख्या यशस्वीरित्या जोडली!');
            if (success) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: message
                },
                    () => {
                        // $form.trigger('reset');
                        location.reload()
                    }
                )
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                })
            }


            // Optionally update UI here, e.g., add new entry to a list

        } catch (error) {
            alertjs.warning({
                t: 'WARNING',
                m: 'काहीतरी चुकले'
            })
            console.error(error);
        }
    });

    // DELETE AGEWISE COUNT
    $(document).on('click', '.delete-child-btn', async function (e) {

        e.preventDefault()

        try {
            let id = $(this).attr('data-child-id')

            const resData = await fetch('/aanganwadi/agewise-count', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let { success, message } = await resData.json()

            if (success) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: message
                }, () => {
                    location.reload()
                })
                // () => location.reload()
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: message
                })
            }

        } catch (err) {
            console.error('Error:', err);
            alertjs.warning({
                t: 'WARNING',
                m: 'काहीतरी चुकले'
            })
        }
    })

});
