$(() => {
    let emptySanctionedAmountEntryObject = {
        year: typeof existingYear !== 'undefined' ? existingYear : '',
        item_in_budget: '',
        estimated_income_of_panchayat: 0,
        approved_estimated_amount: 0,
        actual_amount_previous_year: 0,
        actual_amount_year_before_last: 0,
        id: '',
    };

    const auxiliaryGrants = {
        auxiliaryGrantsHeaders: [
            {
                year: typeof existingYear !== 'undefined' ? existingYear : '',
                item_in_budget_header_name: 'लेखाशिर्ष अर्थसंकल्पात निर्दिष्ट केल्याप्रमाणे बाब',
                year_of_estimated_income_of_panchayat: '',
                year_of_approved_estimated_amount: '',
                year_of_actual_amount_previous_year: '',
                year_of_actual_amount_year_before_last: '',
                id: '',
            },
        ],

        auxiliaryGrantsEntries: [
            {
                item_in_budget: 'कर्मचारी किमान वेतन अनुदान',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },
            {
                item_in_budget: 'सरपंच मानधन अनुदान',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },
            {
                item_in_budget: 'सदस्य बैठक भत्ता अनुदान',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },

            // 6

            {
                item_in_budget: 'बांधकाम अनुदान',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },

            // 7

            {
                item_in_budget: 'संत गाडगेबाबा अनुदान',
                estimated_income_of_panchayat: 0,
                approved_estimated_amount: 0,
                actual_amount_previous_year: 0,
                actual_amount_year_before_last: 0,
                id: '',
            },

            // 8

            {
                item_in_budget: 'जन सुविधा अनुदान',
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

    if (typeof isEditPage !== 'undefined') {
        isEdit = isEditPage;
        // alert(true)
    }

    if (
        typeof existingAuxiliaryGrantsHeaders !== 'undefined' &&
        existingAuxiliaryGrantsHeaders.length
    ) {
        auxiliaryGrants.auxiliaryGrantsHeaders = existingAuxiliaryGrantsHeaders;
    }

    if (
        typeof existingAuxiliaryGrantsEntries !== 'undefined' &&
        existingAuxiliaryGrantsEntries.length
    ) {
        auxiliaryGrants.auxiliaryGrantsEntries = existingAuxiliaryGrantsEntries;
    }

    function renderTable() {
        const tableHeaderRows = auxiliaryGrants.auxiliaryGrantsHeaders
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
                            class="form-control auxiliary-grants-header-input"
                            type="text"
                            name="item_in_budget_header_name"
                            value="${item_in_budget_header_name}"
                            readonly
                            data-index="${entryIndex}" />
                            
                    </th>
                    <th>
                        <input
                            class="form-control auxiliary-grants-header-input"
                            type="text"
                            name="year_of_estimated_income_of_panchayat"
                            value="${year_of_estimated_income_of_panchayat}"
                            data-index="${entryIndex}" />
                        ह्या वर्षासाठी पंचायतीची अंदाजित प्राप्ती
                    </th>

                    <th>
                        <input
                            class="form-control auxiliary-grants-header-input"
                            type="text"
                            name="year_of_approved_estimated_amount"
                            value="${year_of_approved_estimated_amount}"
                            data-index="${entryIndex}" />
                        ह्या वर्षासाठी मंजूर केलेली अंदाजित प्राप्ती
                    </th>

                    <th>
                        
                        <input
                            class="form-control auxiliary-grants-header-input"
                            type="text"
                            name="year_of_actual_amount_previous_year"
                            value="${year_of_actual_amount_previous_year}"
                            data-index="${entryIndex}" />
                        मागील वर्षी मिळालेली प्रत्यक्ष रक्कम सन
                    </th>

                    <th>
                        <input
                            class="form-control auxiliary-grants-header-input"
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

        let lengthOfEntries = auxiliaryGrants.auxiliaryGrantsEntries.length;
        let tableBodyRows = auxiliaryGrants.auxiliaryGrantsEntries
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
                        <input class='form-control auxiliary-grants-entry-input' type="text" name="item_in_budget" value="${item_in_budget}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control auxiliary-grants-entry-input' type="number" min="0" name="estimated_income_of_panchayat" value="${estimated_income_of_panchayat}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control auxiliary-grants-entry-input' type="number" min="0" name="approved_estimated_amount" value="${approved_estimated_amount}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control auxiliary-grants-entry-input' type="number" min="0" name="actual_amount_previous_year" value="${actual_amount_previous_year}" data-index="${entryIndex}" />
                    </td>
                    <td>
                        <input class='form-control auxiliary-grants-entry-input' type="number" min="0" name="actual_amount_year_before_last" value="${actual_amount_year_before_last}" data-index="${entryIndex}" />
                    </td>

                    <td>
                    <div class='d-flex gap-3'>
                       ${
                           !isEdit
                               ? ''
                               : `


                        
                           <button
                               class="btn btn-success update-auxiliary-grants-entry-btn"
                               data-index="${entryIndex}"
                               data-entryId="${id}">
                               Update
                           </button>

                         
                           `
                       }
                        
                           <button
                               class="btn btn-danger delete-auxiliary-grants-entry-btn"
                               data-index="${entryIndex}"
                               data-entryId="${id}">
                              Delete
                           </button>
                        </div>
                    </td>
            </tr>`;
            })
            .join('');

        // .delete-auxiliary-grants-entry-btn
        const tableStructure = `
            <thead>
                ${tableHeaderRows}
            </thead>
            <tbody>
                ${tableBodyRows}
            </tbody>
            `;

        $('#auxiliary-grants').html(tableStructure);
    }

    renderTable();

    $(document).on('input', '.auxiliary-grants-entry-input', function (e) {
        e.preventDefault();
        const nameAttribute = $(this).attr('name');
        const inputValue = $(this).val();
        const index = +$(this).attr('data-index');

        let entryAtRowIndex = auxiliaryGrants.auxiliaryGrantsEntries[index];
        auxiliaryGrants.auxiliaryGrantsEntries[index] = {
            ...entryAtRowIndex,
            [nameAttribute]: inputValue,
        };
        console.log(auxiliaryGrants.auxiliaryGrantsEntries[index]);
    });

    $(document).on('click', '.update-auxiliary-grants-entry-btn', async function (e) {
        e.preventDefault();

        const index = +$(this).attr('data-index');
        const entryId = $(this).attr('data-entryId');

        try {
            $(this).prop('disabled', true);

            const res = await fetch(
                '/namuna/1/collection/auxiliary-grants/update-single-fund-entry',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...auxiliaryGrants.auxiliaryGrantsEntries[index] }),
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

    $(document).on('input', '.auxiliary-grants-header-input', function (e) {
        e.preventDefault();
        const nameAttribute = $(this).attr('name');
        const inputValue = $(this).val();
        const index = +$(this).attr('data-index');

        let entryAtRowIndex = auxiliaryGrants.auxiliaryGrantsHeaders[index];
        auxiliaryGrants.auxiliaryGrantsHeaders[index] = {
            ...entryAtRowIndex,
            [nameAttribute]: inputValue,
        };

        console.log(auxiliaryGrants.auxiliaryGrantsHeaders[index]);
    });

    $(document).on('click', '.add-table-row', async function (e) {
        e.preventDefault();
        auxiliaryGrants.auxiliaryGrantsEntries.push({ ...emptySanctionedAmountEntryObject });

        let isEdit = $(this).attr('data-isEdit') == 'true';

        if (isEdit) {
            // INSERT A NEW EMPTY ENTRY AGAINS THIS FOR THIS IN THE DATABASE

            try {
                $(this).prop('disabled', true);

                const res = await fetch(
                    '/namuna/1/collection/auxiliary-grants/save-single-fund-entry',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...emptySanctionedAmountEntryObject,
                            namuna_1_tapshil_4_deposit_of_auxiliary_grants_headers_id_fk:
                                auxiliaryGrants.auxiliaryGrantsHeaders[0].id,
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

    $(document).on('blur', '.auxiliary-grants-header-input', async function (e) {
        e.preventDefault();

        if (isEdit) {
            try {
                const res = await fetch(
                    '/namuna/1/collection/auxiliary-grants/update-header-entry',
                    {
                        method: 'PUT',
                        body: JSON.stringify({ ...auxiliaryGrants.auxiliaryGrantsHeaders[0] }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
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
                }
            } catch (err) {
                console.error(`Error while updating the header : ${err}`);
            }
        }

        // url = '.auxiliary-grants-header-input'
    });

    $(document).ready(function () {
        const handleSaveNamuna1Details = async (sendData) => {
            try {
                let url = '/namuna/1/collection/auxiliary-grants/save';

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

        $(document).on('click', '#submit-namuna-1-auxiliary-grants-btn', async function (e) {
            e.preventDefault();

            let auxiliaryGrantsData = {
                headers: auxiliaryGrants.auxiliaryGrantsHeaders,
                body: auxiliaryGrants.auxiliaryGrantsEntries,
            };

            const sendData = {
                auxiliaryGrants: auxiliaryGrantsData,
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

        $(document).on('click', '.delete-auxiliary-grants-entry-btn', function (e) {
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
                            `/namuna/1/collection/auxiliary-grants/delete-single-fund-entry`,
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
                auxiliaryGrants.auxiliaryGrantsEntries.splice(index, 1);
                renderTable();
            }
        });
    });
});
