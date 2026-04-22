$(() => {
    let emptyWaterFundsEntryObject = {
        year: typeof existingYear !== 'undefined' ? existingYear : '',
        item_in_budget: '',
        estimated_expenditure_of_panchayat: 0,
        approved_estimated_expenditure_amount: 0,
        actual_expenditure_amount_previous_year: 0,
        actual_expenditure_amount_year_before_last: 0,
        id: '',
    };

    const waterFunds = {
        waterFundsHeaders: [
            {
                year: typeof existingYear !== 'undefined' ? existingYear : '',
                item_in_budget_header_name: 'लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केल्याप्रमाणे बाब',
                year_of_estimated_expenditure_of_panchayat: '',
                year_of_approved_estimated_expenditure_amount: '',
                year_of_actual_expenditure_amount_previous_year: '',
                year_of_actual_expenditure_amount_year_before_last: '',
                id: '',
            },
        ],

        waterFundsEntries: [
            {
                // 1
                item_in_budget: 'कर्मचारी वेतन',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                isDefault: true,
                id: '',
            },
            {
                // 2
                item_in_budget: 'कर्मचारी भ.नि.नि.',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                isDefault: true,
                id: '',
            },
            {
                // 3
                item_in_budget: 'कर्मचारी राहणीमान भत्ता',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 4
                item_in_budget: 'विद्युत देयक',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 5
                item_in_budget: 'पाणी पुरवठा देखभाल दुरुस्ती',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 6
                item_in_budget: 'मोटार दुरुस्ती',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 7
                item_in_budget: 'विहीर दुरुस्ती',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 8
                item_in_budget: 'ब्लिचिंग पावडर खरेदी खर्च',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 9
                item_in_budget: 'किरकोळ खर्च',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 10
                item_in_budget: 'नवीन पा. पुरवठा कामावरील खर्च',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 11
                item_in_budget: 'विहीर अधिग्रहण खर्च',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
            {
                // 12
                item_in_budget: 'इतर खर्च',
                estimated_expenditure_of_panchayat: 0,
                approved_estimated_expenditure_amount: 0,
                actual_expenditure_amount_previous_year: 0,
                actual_expenditure_amount_year_before_last: 0,
                id: '',
            },
        ],
    };

    // TODO: uncomment this later

    let isEdit;

    if (typeof isEditPage !== 'undefined') {
        isEdit = isEditPage;
        // alert(true)
    }

    if (typeof existingWaterFundsHeaders !== 'undefined' && existingWaterFundsHeaders.length) {
        waterFunds.waterFundsHeaders = existingWaterFundsHeaders;
    }

    if (typeof existingWaterFundsEntries !== 'undefined' && existingWaterFundsEntries.length) {
        waterFunds.waterFundsEntries = existingWaterFundsEntries;
    }

    function renderTable() {
        const tableHeaderRows = waterFunds.waterFundsHeaders
            ?.map((entry, entryIndex) => {
                const {
                    year,
                    item_in_budget_header_name,
                    year_of_estimated_expenditure_of_panchayat,
                    year_of_approved_estimated_expenditure_amount,
                    year_of_actual_expenditure_amount_previous_year,
                    year_of_actual_expenditure_amount_year_before_last,
                } = entry;
                return `
            
            <tr>
                    <th>
                        <input
                            style="width:fit-content;"
                            class="form-control water-funds-header-input"
                            type="text"
                            name="item_in_budget_header_name"
                            value="${item_in_budget_header_name}"
                            readonly
                            data-index="${entryIndex}" />
                            
                    </th>
                    <th>
                        <input
                            class="form-control water-funds-header-input"
                            type="text"
                            name="year_of_estimated_expenditure_of_panchayat"
                            value="${year_of_estimated_expenditure_of_panchayat}"
                            data-index="${entryIndex}" />
                        ह्या वर्षासाठी पंचायतीची अंदाजित प्राप्ती
                    </th>

                    <th>
                        <input
                            class="form-control water-funds-header-input"
                            type="text"
                            name="year_of_approved_estimated_expenditure_amount"
                            value="${year_of_approved_estimated_expenditure_amount}"
                            data-index="${entryIndex}" />
                        ह्या वर्षासाठी मंजूर केलेली अंदाजित प्राप्ती
                    </th>

                    <th>
                        
                        <input
                            class="form-control water-funds-header-input"
                            type="text"
                            name="year_of_actual_expenditure_amount_previous_year"
                            value="${year_of_actual_expenditure_amount_previous_year}"
                            data-index="${entryIndex}" />
                        मागील वर्षी मिळालेली प्रत्यक्ष रक्कम सन
                    </th>

                    <th>
                        <input
                            class="form-control water-funds-header-input"
                            type="text"
                            name="year_of_actual_expenditure_amount_year_before_last"
                            value="${year_of_actual_expenditure_amount_year_before_last}"
                            data-index="${entryIndex}" />
                            गतपूर्व वर्षात मिळालेली प्रत्यक्ष रक्कम सन
                    </th>

                    <th>
                        Action
                    </th>
                </tr>
            `;
            })
            .join('');

        let lengthOfEntries = waterFunds.waterFundsEntries.length;
        let tableBodyRows = waterFunds.waterFundsEntries
            ?.map((entry, entryIndex) => {
                const {
                    item_in_budget,
                    estimated_expenditure_of_panchayat,
                    approved_estimated_expenditure_amount,
                    actual_expenditure_amount_previous_year,
                    actual_expenditure_amount_year_before_last,
                    isDefault,
                    id,
                } = entry;

                return `
            <tr>
                    <td>
                        <input class='form-control water-funds-entry-input' type="text" name="item_in_budget" value="${item_in_budget}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control water-funds-entry-input' type="number" min="0" name="estimated_expenditure_of_panchayat" value="${estimated_expenditure_of_panchayat}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control water-funds-entry-input' type="number" min="0" name="approved_estimated_expenditure_amount" value="${approved_estimated_expenditure_amount}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control water-funds-entry-input' type="number" min="0" name="actual_expenditure_amount_previous_year" value="${actual_expenditure_amount_previous_year}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control water-funds-entry-input' type="number" min="0" name="actual_expenditure_amount_year_before_last" value="${actual_expenditure_amount_year_before_last}" data-index="${entryIndex}" />
                    </td>

                    <td>
                    <div class='d-flex gap-3'>
                       ${
                           !isEdit
                               ? ''
                               : `


                        
                           <button
                               class="btn btn-success update-water-funds-entry-btn"
                               data-index="${entryIndex}"
                               data-entryId="${id}">
                               Update
                           </button>

                         
                           `
                       }
                        
                           <button
                               class="btn btn-danger delete-water-funds-entry-btn"
                               data-index="${entryIndex}"
                               data-entryId="${id}">
                              Delete
                           </button>
                        </div>
                    </td>
            </tr>`;
            })
            .join('');

        // .delete-water-funds-entry-btn
        const tableStructure = `
            <thead>
                ${tableHeaderRows}
            </thead>
            <tbody>
                ${tableBodyRows}
            </tbody>
            `;

        $('#water-funds').html(tableStructure);
    }

    renderTable();

    $(document).on('input', '.water-funds-entry-input', function (e) {
        e.preventDefault();
        const nameAttribute = $(this).attr('name');
        const inputValue = $(this).val();
        const index = +$(this).attr('data-index');

        let entryAtRowIndex = waterFunds.waterFundsEntries[index];
        waterFunds.waterFundsEntries[index] = {
            ...entryAtRowIndex,
            [nameAttribute]: inputValue,
        };
        console.log(waterFunds.waterFundsEntries[index]);
    });

    $(document).on('click', '.update-water-funds-entry-btn', async function (e) {
        e.preventDefault();

        const index = +$(this).attr('data-index');
        const entryId = $(this).attr('data-entryId');

        try {
            $(this).prop('disabled', true);

            const res = await fetch(
                '/namuna/1/expenditure/water-funds/update-single-water-fund-entry',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...waterFunds.waterFundsEntries[index] }),
                }
            );

            const resData = await res.json();

            if (resData.call) {
                alertjs.success(
                    {
                        t: 'Update',
                        m: 'अपडेट झाले',
                    },
                    () => window.location.reload()
                );
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'अपडेट नाही झाले',
                });
            }
            $(this).prop('disabled', false);
        } catch (err) {
            $(this).prop('disabled', false);
        }
    });

    $(document).on('input', '.water-funds-header-input', function (e) {
        e.preventDefault();
        const nameAttribute = $(this).attr('name');
        const inputValue = $(this).val();
        const index = +$(this).attr('data-index');

        let entryAtRowIndex = waterFunds.waterFundsHeaders[index];
        waterFunds.waterFundsHeaders[index] = {
            ...entryAtRowIndex,
            [nameAttribute]: inputValue,
        };

        console.log(waterFunds.waterFundsHeaders[index]);
    });

    $(document).on('click', '.add-table-row', async function (e) {
        e.preventDefault();
        waterFunds.waterFundsEntries.push({ ...emptyWaterFundsEntryObject });

        let isEdit = $(this).attr('data-isEdit') == 'true';

        if (isEdit) {
            // INSERT A NEW EMPTY ENTRY AGAINS THIS FOR THIS IN THE DATABASE

            try {
                $(this).prop('disabled', true);

                const res = await fetch(
                    '/namuna/1/expenditure/water-funds/save-single-water-fund-entry',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...emptyWaterFundsEntryObject,
                            namuna_1_tapshil_2_expenditure_water_funds_headers_id_fk:
                                waterFunds.waterFundsHeaders[0].id,
                        }),
                    }
                );

                const resData = await res.json();

                if (resData.call) {
                    $(this).prop('disabled', false);
                    window.location.reload();
                } else {
                    alertjs.warning({
                        t: 'WARNING',
                        m: 'Failed to add the row',
                    });
                    $(this).prop('disabled', false);
                }
            } catch (err) {
                $(this).prop('disabled', false);

                console.error('Error while inserting the fund entry: ' + err);
            }
        } else {
            renderTable();
        }
    });

    // /update-header-entry

    $(document).on('blur', '.water-funds-header-input', async function (e) {
        e.preventDefault();

        if (isEdit) {
            try {
                const res = await fetch('/namuna/1/expenditure/water-funds/update-header-entry', {
                    method: 'PUT',
                    body: JSON.stringify({ ...waterFunds.waterFundsHeaders[0] }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const resData = await res.json();

                if (resData.call) {
                    alertjs.success(
                        {
                            t: 'Update',
                            m: 'अपडेट झाले',
                        },
                        () => window.location.reload()
                    );
                }
            } catch (err) {
                console.error(`Error while updating the header : ${err}`);
            }
        }

        // url = '.water-funds-header-input'
    });

    $(document).ready(function () {
        const handleSaveNamuna1Details = async (sendData) => {
            try {
                let url = '/namuna/1/expenditure/water-funds/save';

                const res = await fetch(url, {
                    body: JSON.stringify(sendData),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const resData = await res.json();

                if (resData.call) {
                    alertjs.success(
                        {
                            t: 'SUCCESS',
                            m: 'सेव झाले',
                        },
                        () => window.location.reload()
                    );
                    window.location.reload();
                }
                // alert
            } catch (err) {
                console.error(err);
            }
        };

        $(document).on('click', '#submit-namuna-1-water-funds-btn', async function (e) {
            e.preventDefault();

            let waterFundsData = {
                headers: waterFunds.waterFundsHeaders,
                body: waterFunds.waterFundsEntries,
            };

            const sendData = {
                expenditureWaterFunds: waterFundsData,
            };

            try {
                $(this).prop('disabled', true);

                await handleSaveNamuna1Details(sendData);
                $(this).prop('disabled', false);
            } catch (err) {
                $(this).prop('disabled', false);
            }
        });

        // IMPLEMENTING DELETE FUNCTIONALITY

        $(document).on('click', '.delete-water-funds-entry-btn', function (e) {
            e.preventDefault();

            let index = $(this).attr('data-index');
            const deleteId = $(this).attr('data-entryId');

            if (isEdit) {
                // Delete entry from database

                alertjs.deleteSpl('ही नोंद कायमची डिलीट होईल. डिलीटडेल करायची?', async (status) => {
                    if (!status) {
                        return;
                    }
                    try {
                        const res = await fetch(
                            `/namuna/1/expenditure/water-funds/delete-single-water-fund-entry`,
                            {
                                method: 'DELETE',
                                body: JSON.stringify({ id: deleteId }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        );
                        const resData = await res.json();

                        if (resData.call) {
                            alertjs.success(
                                {
                                    t: 'SUCCESS',
                                    m: 'डिलीट झाले',
                                },
                                () => location.reload()
                            );
                        } else {
                            alertjs.warning({
                                t: 'WARNING',
                                m: 'डिलीट नाही झाले',
                            });
                        }
                    } catch (err) {
                        console.error(`Error while deleting the entry: ${err}`);
                        alertjs.warning({
                            t: 'Error',
                            m: 'डिलीट नाही झाले.',
                        });
                    }
                });
            } else {
                // delete from local arrray
                waterFunds.waterFundsEntries.splice(index, 1);
                renderTable();
            }
        });
    });
});
