$(function () {
    $('#medical-room-details-form').validate({
        rules: {
            authority_person_name: { required: true },
        },
    });

    $('#save-medical-room-details-btn').on('click', async function (e) {
        e.preventDefault();
        var isValid = $('#medical-room-details-form').valid();

        if (!isValid) {
            return false;
        }

        var formDataArray = $('#medical-room-details-form').serializeArray();

        let formData = {};

        $.each(formDataArray, function (index, field) {
            formData[field.name] = $(`[name="${field.name}"]`).val();
        });

        const url = '/master/save-medical-room-details';

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result, 'rtirhtihrtih');
                if (result.call === 1) {
                    alertjs.success(
                        {
                            t: 'यशस्वी रित्या भरली गेली.',
                        },
                        function () {
                            window.location.reload();
                        }
                    );
                } else if (result.call === 0) {
                    alertjs.warning({
                        t: 'माहिती भरली गेली नाही',
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
