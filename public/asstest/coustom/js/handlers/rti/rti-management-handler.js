$(function () {
    console.log('RTI Management Handler Initialized');

    // Show modal
    $('#upload-rti-document-btn').on('click', function (e) {
        e.preventDefault();
        $('#rti-document-form')[0].reset();
        $('#rti-document-modal').modal('show');
    });

    // Form validation
    $('#rti-document-form').validate({
        rules: {
            point_number: {
                required: true,
            },
            financial_year: {
                required: true,
            },
            document_file: {
                required: true,
            }
        },
        messages: {
            point_number: {
                required: "कृपया मुद्दा निवडा",
            },
            financial_year: {
                required: "कृपया आर्थिक वर्ष निवडा",
            },
            document_file: {
                required: "कृपया पीडीएफ फाईल निवडा",
            }
        }
    });

    // Handle File Upload
    const handleUploadRtiDocument = async (formData) => {
        const submitBtn = $('#submit-rti-document-btn');
        submitBtn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin me-1"></i> अपलोड होत आहे...');

        try {
            const url = '/rti/rti-management/upload';

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                alertjs.success(
                    {
                        t: 'दस्तऐवज यशस्वीरित्या अपलोड झाला.',
                    },
                    () => {
                        window.location.reload();
                    }
                );
            } else {
                alertjs.warning({
                    t: data.message || 'दस्तऐवज अपलोड करताना त्रुटी आली.',
                });
                submitBtn.prop('disabled', false).html('<i class="fa fa-save me-1"></i> जतन करा');
            }
        } catch (err) {
            console.error('Error while uploading the file:', err);
            alertjs.warning({
                t: 'दस्तऐवज अपलोड करताना तांत्रिक त्रुटी आली.',
            });
            submitBtn.prop('disabled', false).html('<i class="fa fa-save me-1"></i> जतन करा');
        }
    };

    // Handle Document Deletion
    const handleDeleteRtiDocument = async (id) => {
        try {
            const url = '/rti/rti-management/delete';

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                alertjs.success(
                    {
                        t: 'दस्तऐवज यशस्वीरित्या काढण्यात आला.',
                    },
                    () => {
                        window.location.reload();
                    }
                );
            } else {
                alertjs.warning({
                    t: data.message || 'दस्तऐवज काढताना त्रुटी आली.',
                });
            }
        } catch (err) {
            console.error('Error while deleting document:', err);
            alertjs.warning({
                t: 'दस्तऐवज काढताना तांत्रिक त्रुटी आली.',
            });
        }
    };

    // Submit Form Event
    $('#rti-document-form').on('submit', function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            alertjs.warning({
                t: 'कृपया सर्व आवश्यक माहिती भरा.',
            });
            return;
        }

        const formData = new FormData(this);
        handleUploadRtiDocument(formData);
    });

    // Delete Button Click Event
    $(document).on('click', '.delete-rti-document-btn', function (e) {
        e.preventDefault();
        const id = $(this).attr('data-id');

        alertjs.deleteSpl('सदर दस्तऐवज काढायचा आहे का?', (status) => {
            if (status) {
                handleDeleteRtiDocument(id);
            }
        });
    });
});
