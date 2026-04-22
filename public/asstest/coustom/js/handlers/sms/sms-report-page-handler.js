$(() => {
    $(document).on('click', '.update-sms-delivery-status', async function (e) {
        e.preventDefault();

        const id = $(this).attr('data-reportId');

        const scheduleId = $(this).attr('data-scheduleId');

        try {
            const _res = await fetch('/sms/update-report?singleRecord=true', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, schedule_id: scheduleId }),
            });

            const _updateRes = await _res.json();

            if (_updateRes.call == 1) {
                alertjs.success(
                    {
                        t: 'UPDATE',
                        m: 'SMS delivery status updated successfully',
                    },
                    () => window.location.reload()
                );
            }
            else if (_updateRes.call == 2){
                alertjs.warning({
                    t: 'WARNING',
                    m: 'एसएमएस पाठवले जात आहेत,काही वेळानंतर पुन्हा प्रयत्न करा.',
                });
            }
        } catch (err) {
            console.log(`Error while updating the report record`);
            alertjs.warning({
                t: 'ERROR',
                m: 'Could not update the report record',
            });
        }
    });
});
