$(() => {

    // Setup validation rules (triggered manually)
    $('#water-conservation-form').validate({
        rules: {
            structure_name: {
                required: true
            },
            structure_length_m: {
                required: true,
            },
            storage_capacity_cubic_m: {
                required: true,
            }
        },
        messages: {
            structure_name: {
                required: "कृपया संरचनेचे नाव भरा"
            },
            structure_length_m: {
                required: "कृपया लांबी भरा"
            },
            storage_capacity_cubic_m: {
                required: "कृपया साठवण क्षमता भरा"
            }
        }
    });

    // POST: Save new water conservation record
    async function handleSaveWaterConservation(e) {
        e.preventDefault();

        const form = document.getElementById('water-conservation-form');

        if (!$('#water-conservation-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/water-conservation', {
                method: 'POST',
                body: new FormData(form)
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    form.reset();
                    location.href = '/water-conservation';
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
                m: "काहीतरी चुकले"
            });
        }
    }

    // PUT: Update existing water conservation record
    async function handleUpdateWaterConservation(e) {
        e.preventDefault();

        const form = document.getElementById('water-conservation-form');

        if (!$('#water-conservation-form').valid()) {
            return;
        }

        try {
            const res = await fetch('/water-conservation', {
                method: 'PUT',
                body: new FormData(form)
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    form.reset();
                    location.href = '/water-conservation';
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
                m: "काहीतरी चुकले"
            });
        }
    }

    // Attach to button clicks
    $(document).on('click', '#save-water-conservation-btn', handleSaveWaterConservation);
    $(document).on('click', '#update-water-conservation-btn', handleUpdateWaterConservation);
});
