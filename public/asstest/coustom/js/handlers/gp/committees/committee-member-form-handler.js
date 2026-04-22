$(() => {

    const $form = $('#committee-member-form');

    // 🛡️ Validation setup
    $form.validate({
        rules: {
            member_name: {
                required: true
            },
            member_post: {
                required: true
            }
        },
        messages: {
            member_name: {
                required: "कृपया सदस्याचे नाव भरा."
            },
            member_post: {
                required: "कृपया सदस्याचे पद भरा"
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

        try {
            let committeeMemberData = new FormData(form)

            const res = await fetch('/committees/members', {
                method,
                body: committeeMemberData
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({
                    t: "SUCCESS",
                    m: message
                }, () => {
                    form.reset();
                    location.href = `/committees/members/${committeeMemberData.get('committee_id_fk')}`;
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
    };

    // 🖱️ Attach event handlers
    $(document).on('click', '#save-committee-member-btn', e => handleSubmit(e, 'POST'));
    $(document).on('click', '#update-committee-memmber-btn', e => handleSubmit(e, 'PUT'));
});
