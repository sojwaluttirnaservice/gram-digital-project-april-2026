$(function () {
    const dataArray = [];

    $(document).ready(function () {
        $(document).on('keydown', '.updated_malmattaNo', function (e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault(); // Prevent default Enter key behavior

                // Get the current input's id
                var currentId = $(this).attr('id');

                // Extract the index from the id (assuming the format is updated_malmattaNo-{index})
                var currentIndex = parseInt(currentId.split('-')[1]);

                // Calculate the next index
                var nextIndex = currentIndex + 1;

                // Build the next input's id
                var nextId = 'updated_malmattaNo-' + nextIndex;

                // Find the next input with the calculated id and focus on it
                var nextInput = $('#' + nextId);
                if (nextInput.length) {
                    nextInput.focus();
                }
            }
        });
    });

    const handleUpdateForm8Data = async (dataArray) => {
        try {
            $('#spinner-div').removeClass('d-none');
            let url = `/update-database-table/update-form-8-data`;
            const _response = await fetch(url, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dataArray,
                }),
                // body: dataArray
            });

            const _data = await _response.json();


            // console.log("this is the _data = " + _data)

            if (_data.call == 1) {
                return true;
            }
            return false;
        } catch (err) {
            $('#spinner-div').addClass('d-none');
            console.error(`Error : ${err}`);
            $('.sendToServerBtn').prop('disabled', true);
        }
    };

    let isValid = false;

    $('.sendToServerBtn').on('click', async function (e) {
        e.preventDefault();

        $('.sendToServerBtn').prop('disabled', true);

        const set = new Set();

        const duplicateMalmattaSet = new Set();

        isValid = true;

        // Loop through each row in the table
        let index = 1;

        const totalRecords = +$(`#userTable`).attr('data-length');
        // alert(totalRecords)
        let fields = [];
        for (let _ind = 0; _ind < totalRecords; _ind++) {
            let rowData = {};

            // console.log(`index === ${_ind}`);

            rowData['id'] = $(`#id-${_ind}`).val();
            let updatedMalmatta = $(`#updated_malmattaNo-${_ind}`)?.val()?.trim();
            rowData[`updated_malmattaNo`] = updatedMalmatta;

            if (set.has(updatedMalmatta)) {
                duplicateMalmattaSet.add(updatedMalmatta);
            }
            set.add(updatedMalmatta);
            // console.log(index + 1)
            if (!updatedMalmatta || updatedMalmatta == 0) {
                isValid = false;
                alertjs.warning({
                    t: 'insert valid number',
                });
                $('.sendToServerBtn').prop('disabled', false);
                return;
            }

            rowData[`updated_secondOwnerName`] =
                $(`#updated_secondOwnerName-${_ind}`).val()?.trim() ||
                $(`#feu_secondOwnerName-${_ind}`).val()?.trim();

            rowData[`updated_eastLandmark`] =
                $(`#updated_eastLandmark-${_ind}`).val()?.trim() ||
                $(`#feu_eastLandmark-${_ind}`).val()?.trim();

            rowData[`updated_westLandmark`] =
                $(`#updated_westLandmark-${_ind}`).val()?.trim() ||
                $(`#feu_westLandmark-${_ind}`).val()?.trim();

            rowData[`updated_southLandmark`] =
                $(`#updated_southLandmark-${_ind}`).val()?.trim() ||
                $(`#feu_southLandmark-${_ind}`).val()?.trim();

            rowData[`updated_northLandmark`] =
                $(`#updated_northLandmark-${_ind}`).val()?.trim() ||
                $(`#feu_northLandmark-${_ind}`).val()?.trim();

            dataArray.push(JSON.stringify(rowData));
        }

        if (isValid) {
            if (duplicateMalmattaSet.size > 0) {
                alertjs.warning({
                    t: `Duplicate malmaatta numbers while updating : ${[...duplicateMalmattaSet].join(', ')}`,
                });
                $('.sendToServerBtn').prop('disabled', false);
                return;
            }

            const chunkSize = 300;

            const totalChunks = Math.ceil(dataArray.length / chunkSize);

            let updatedChunkCount = 0;
            for (let i = 0; i < totalChunks; i++) {
                const chunkSizeArray = dataArray.slice(i * chunkSize, (i + 1) * chunkSize);

                // console.log('Updating the chunk number : ' + i);

                let isChunkUpdated = await handleUpdateForm8Data(chunkSizeArray);

                if (!isChunkUpdated) break;

                updatedChunkCount += (isChunkUpdated ? 1 : 0);

                if (chunkSize != 0)
                    $('#updating-percent').html(Math.round(updatedChunkCount * 100 / totalChunks));

                // console.log("updated chunck count = ", updatedChunkCount, totalChunks)
            }

            // console.log("final chunck count = ", updatedChunkCount, totalChunks)


            if (updatedChunkCount == totalChunks) {
                // console.log($('#spinner-div'))
                $('#spinner-div').addClass('d-none');

                alertjs.success(
                    {
                        t: 'Success',
                    },
                    () => {
                        $('.sendToServerBtn').prop('disabled', false);
                        // window.location.reload();
                    }
                );
            } else {
                // console.log($('#spinner-div'))
                $('#spinner-div').addClass('d-none');
                $('.sendToServerBtn').prop('disabled', false);
            }
        }
    });
});
