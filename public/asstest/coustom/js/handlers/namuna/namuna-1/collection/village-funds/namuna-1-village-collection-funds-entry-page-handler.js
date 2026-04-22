$(() => {
    let emptyVillageFundEntryObject = {
        year: typeof existingYear != 'undefined' ? existingYear : '',
        item_in_budget: '',
        estimated_income_of_panchayat: 0,
        approved_estimated_amount: 0,
        actual_amount_previous_year: 0,
        actual_amount_year_before_last: 0,
        id: '',
    };
    const villageFunds = {
        villageFundsHeaders: [
            {
                year: typeof existingYear != 'undefined' ? existingYear : '',
                item_in_budget_header_name: 'लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केल्याप्रमाणे बाब',
                year_of_estimated_income_of_panchayat: '',
                year_of_approved_estimated_amount: '',
                year_of_actual_amount_previous_year: '',
                year_of_actual_amount_year_before_last: '',
                id: '',
            },
        ],

        villageFundsEntries: [
            {
                item_in_budget: 'मालमत्ता जमीन इमारती या वरील कर',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                isDefault: true,
                id: '',
            },
            {
                item_in_budget: 'दिवाबत्ती कर',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                isDefault: true,
                id: '',
            },
            {
                item_in_budget: 'स्वच्छता/ आरोग्य कर',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },
            {
                item_in_budget: 'धंदा/व्यवसाय कर',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },
            {
                item_in_budget: 'मनोरा कर',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },
        ],
    };

    // TODO: uncomment this later

    let isEdit;

    if (typeof isEditPage != 'undefined') {
        isEdit = isEditPage;
    }

    if (typeof existingVillageFundsHeaders != 'undefined' && existingVillageFundsHeaders.length)
        villageFunds.villageFundsHeaders = existingVillageFundsHeaders;

    if (typeof existingVillageFundsEntries != 'undefined' && existingVillageFundsEntries.length)
        villageFunds.villageFundsEntries = existingVillageFundsEntries;

    function renderTable() {
        const tableHeaderRows = villageFunds.villageFundsHeaders
            ?.map((entry, entryIndex) => {
                const {
                    year,
                    item_in_budget_header_name,
                    year_of_estimated_income_of_panchayat,
                    year_of_approved_estimated_amount,
                    year_of_actual_amount_previous_year,
                    year_of_actual_amount_year_before_last,
                } = entry;
                return `
            
            <tr>
                    <th>
                        <input
                            style="width:fit-content;"
                            class="form-control village-fund-header-input"
                            type="text"
                            style="width:fit-content;"
                            name="item_in_budget_header_name"
                            value="${item_in_budget_header_name}"
                            readonly
                            data-index="${entryIndex}" />
                            
                    </th>
                    <th>
                        <input
                            class="form-control village-fund-header-input"
                            type="text"
                            name="year_of_estimated_income_of_panchayat"
                            value="${year_of_estimated_income_of_panchayat}"
                            data-index="${entryIndex}" />
                        ह्या वर्षासाठी पंचायतीची अंदाजित प्राप्ती
                    </th>

                    <th>
                        <input
                            class="form-control village-fund-header-input"
                            type="text"
                            name="year_of_approved_estimated_amount"
                            value="${year_of_approved_estimated_amount}"
                            data-index="${entryIndex}" />
                        ह्या वर्षासाठी मंजूर केलेली अंदाजित प्राप्ती
                    </th>

                    <th>
                        
                        <input
                            class="form-control village-fund-header-input"
                            type="text"
                            name="year_of_actual_amount_previous_year"
                            value="${year_of_actual_amount_previous_year}"
                            data-index="${entryIndex}" />
                        मागील वर्षी मिळालेली प्रत्यक्ष रक्कम सन
                    </th>

                    <th>
                        <input
                            class="form-control village-fund-header-input"
                            type="text"
                            name="year_of_actual_amount_year_before_last"
                            value="${year_of_actual_amount_year_before_last}"
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

        let lengthOfEntries = villageFunds.villageFundsEntries.length;
        let tableBodyRows = villageFunds.villageFundsEntries
            ?.map((entry, entryIndex) => {
                const {
                    item_in_budget,
                    estimated_income_of_panchayat,
                    approved_estimated_amount,
                    actual_amount_previous_year,
                    actual_amount_year_before_last,
                    isDefault,
                    id,
                } = entry;

                return `
            <tr>
                    <td>
                        <input class='form-control village-fund-entry-input' type="text" name="item_in_budget" value="${item_in_budget}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control village-fund-entry-input' type="number" min="0" name="estimated_income_of_panchayat" value="${estimated_income_of_panchayat}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control village-fund-entry-input' type="number" min="0" name="approved_estimated_amount" value="${approved_estimated_amount}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control village-fund-entry-input' type="number" min="0" name="actual_amount_previous_year" value="${actual_amount_previous_year}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control village-fund-entry-input' type="number" min="0" name="actual_amount_year_before_last" value="${actual_amount_year_before_last}" data-index="${entryIndex}" />
                    </td>

                    <td>
                    <div class='d-flex gap-3'>
                       ${
                           !isEdit
                               ? ''
                               : `


                        
                           <button
                               class="btn btn-success update-village-fund-entry-btn"
                               data-index="${entryIndex}"
                               data-entryId="${id}">
                               Update
                           </button>

                         
                           `
                       }
                        
                           <button
                               class="btn btn-danger delete-village-fund-entry-btn"
                               data-index="${entryIndex}"
                               data-entryId="${id}">
                              Delete
                           </button>
                        </div>
                    </td>
            </tr>`;
            })
            .join('');

        // .delete-village-fund-entry-btn
        const tableStructure = `
            <thead>
                ${tableHeaderRows}
            </thead>
            <tbody>
                ${tableBodyRows}
            </tbody>
            `;

        $('#village-funds').html(tableStructure);
    }

    renderTable();

    $(document).on('input', '.village-fund-entry-input', function (e) {
        e.preventDefault();
        const nameAttribute = $(this).attr('name');
        const inputValue = $(this).val();
        const index = +$(this).attr('data-index');

        let entryAtRowIndex = villageFunds.villageFundsEntries[index];
        villageFunds.villageFundsEntries[index] = {
            ...entryAtRowIndex,
            [nameAttribute]: inputValue,
        };
        console.log(villageFunds.villageFundsEntries[index]);
    });

    $(document).on('click', '.update-village-fund-entry-btn', async function (e) {
        e.preventDefault();

        const index = +$(this).attr('data-index');
        const entryId = $(this).attr('data-entryId');

        try {
            $(this).prop('disabled', true);

            const res = await fetch('/namuna/1/collection/village-funds/update-single-fund-entry', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...villageFunds.villageFundsEntries[index] }),
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

    $(document).on('input', '.village-fund-header-input', function (e) {
        e.preventDefault();
        const nameAttribute = $(this).attr('name');
        const inputValue = $(this).val();
        const index = +$(this).attr('data-index');

        let entryAtRowIndex = villageFunds.villageFundsHeaders[index];
        villageFunds.villageFundsHeaders[index] = {
            ...entryAtRowIndex,
            [nameAttribute]: inputValue,
        };

        console.log(villageFunds.villageFundsHeaders[index]);
    });

    $(document).on('click', '.add-table-row', async function (e) {
        e.preventDefault();
        villageFunds.villageFundsEntries.push({ ...emptyVillageFundEntryObject });

        let isEdit = $(this).attr('data-isEdit') == 'true';

        if (isEdit) {
            // INSERT A NEW EMPTY ENTRY AGAINS THIS FOR THIS IN THE DATABASE

            try {
                $(this).prop('disabled', true);

                const res = await fetch(
                    '/namuna/1/collection/village-funds/save-single-fund-entry',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...emptyVillageFundEntryObject,
                            namuna_1_tapshil_1_collection_of_village_funds_headers_id_fk:
                                villageFunds.villageFundsHeaders[0].id,
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

    $(document).on('blur', '.village-fund-header-input', async function (e) {
        e.preventDefault();

        if (isEdit) {
            try {
                const res = await fetch('/namuna/1/collection/village-funds/update-header-entry', {
                    method: 'PUT',
                    body: JSON.stringify({ ...villageFunds.villageFundsHeaders[0] }),
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

        // url = '.village-fund-header-input'
    });

    $(document).ready(function () {
        const handleSaveNamuna1Details = async (sendData) => {
            try {
                let url = '/namuna/1/collection/village-funds/save';

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

        $(document).on('click', '#submit-namuna-1-village-entries-btn', async function (e) {
            e.preventDefault();

            let villageFundsData = {
                headers: villageFunds.villageFundsHeaders,
                body: villageFunds.villageFundsEntries,
            };

            const sendData = {
                villageFunds: villageFundsData,
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

        $(document).on('click', '.delete-village-fund-entry-btn', function (e) {
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
                            `/namuna/1/collection/village-funds/delete-single-fund-entry`,
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
                villageFunds.villageFundsEntries.splice(index, 1);
                renderTable();
            }
        });
    });
});
