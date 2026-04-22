$(() => {

    // $(".datepicker").datepicker({
    //     dateFormat: 'dd-mm-yy'
    // });

    const tableDataString = document
        .getElementById('namuna-15-table')
        ?.getAttribute('data-headers');

    const tableData = JSON.parse(tableDataString) || [];
    // Object structure for Namuna 15 fields
    const psNamuna15Object = {
        id: null, // Auto-incremented, so can start as null or undefined
        from_year: null, // Add this field for the year range
        to_year: null, // Add this field for the year range
        date: null, // Date field (required)
        initial_quantity: null, // Updated to match initial_quantity
        received_item_name: '', // Updated to match received_item_name
        item_quantity: null, // Updated to match item_quantity
        total: null, // Total field (optional)
        purpose_or_receiver: '', // Updated to match purpose_or_receiver
        issued_item_quantity: null, // Updated to match issued_item_quantity
        remaining_quantity: null, // Updated to match remaining_quantity
        issuing_officer_name: '', // Match directly
        receiving_officer_name: '', // Match directly
        remarks: '', // Match directly
    };

    let namuna15DetailsArray = [{ ...psNamuna15Object }];

    // Function to apply datepicker for elements with class 'datepicker'
    const applyDatepicker = (lengthN = 1) => {
        $('.datepicker').mask('00-00-0000');
        // for (let i = 1; i <= lengthN; i++) {
        //     const selector = `#datepicker-${i}`;

        //     // Destroy any existing datepicker instance if present
        //     if ($(selector).hasClass('hasDatepicker')) {
        //         $(selector)?.datepicker('destroy'); // Destroy previous instance
        //     }

        //     // Apply datepicker
        //     $(selector)?.datepicker({
        //         dateFormat: 'dd-mm-yy', // Format as 'DD-MM-YYYY'
        //         onSelect: function (dateText) {
        //             $(this).val(dateText); // Set selected date in input
        //             handleInputChange({
        //                 target: this, // Trigger input change handler
        //             });
        //         }
        //     });
        // }
    };

    applyDatepicker(1);

    // Render function to display Namuna 15 table
    const renderFunctions = {
        renderNamuna15TableBody: (_namuna15DetailsArray) => {
            const renderingHtml = _namuna15DetailsArray
                .map((namunaEntry, namunaEntryIndex) => {
                    return `<tr data-rowIndex='${namunaEntryIndex}'>
                            <td>
                                <div> ${namunaEntryIndex + 1} </div>
                            </td>

                        ${tableData
                            .map((tableDataEntry) => {
                                return `
                                
                                <td>
                                    <input 
                                        class="form-control ${tableDataEntry.tableBodyInputClassName}" 
                                        style="width: 200px;"
                                        id='${tableDataEntry.tableBodyInputClassName}${tableDataEntry.isDate && tableDataEntry.isDate == true ? `datepicker-${namunaEntryIndex}` : ''}'
                                        data-rowIndex="${namunaEntryIndex}" 
                                        name="${tableDataEntry.nameAttribute}"
                                        value="${namunaEntry[tableDataEntry.nameAttribute] || ''}"
                                        placeholder='${tableDataEntry.isDate && tableDataEntry.isDate == true ? `DD-MM-YYYY` : ''}'
                                    />
                                </td>
                                `;
                            })
                            .join('')}

                                <td>
                                    <button class="btn btn-success add-row-btn" data-rowIndex="${namunaEntryIndex}" style='width:100px;'>+ Row</button>
                                </td>

                    </tr>`;
                })
                .join('');

            document.getElementById('namuna-15-table-body').innerHTML = renderingHtml;
            applyDatepicker(namuna15DetailsArray.length);
            // $('.datepicker').mask('00-00-0000');
        },
    };

    // Handle input changes
    function handleInputChange(event) {
        const input = event.target;
        const nameAttribute = input.getAttribute('name');
        const index = input.getAttribute('data-rowIndex');

        // Ensure there is a corresponding entry in the details array
        if (!namuna15DetailsArray[index]) {
            namuna15DetailsArray[index] = { ...psNamuna15Object };
        }

        // alert("executin this")
        // Update the corresponding field in the array
        namuna15DetailsArray[index][nameAttribute] = input.value;
    }

    // Event listener for input changes
    document.getElementById('namuna-15-table-body').addEventListener('input', handleInputChange);
    document.getElementById('namuna-15-table-body').addEventListener('change', handleInputChange);

    // On changee of year

    // Assuming namuna11DetailsArray is already defined
    const fromYearSelect = document.getElementById('from-year');
    const toYearSelect = document.getElementById('to-year');

    function updateNamunaDetailsArray() {
        const selectedFromYear = parseInt(fromYearSelect.value, 10);
        const selectedToYear = parseInt(toYearSelect.value, 10);

        // alert(selectedFromYear);

        // Iterate over the namuna11DetailsArray
        namuna15DetailsArray.forEach((entry) => {
            // Update related values as needed based on selected years
            // Example: Updating year values in the entry
            entry.from_year = selectedFromYear;
            entry.to_year = selectedToYear;

            // console.log('this is an entry :', entry);
        });
        // alert(3);

        console.log(namuna15DetailsArray); // Log the updated array for verification
    }

    // Add event listeners for change events
    fromYearSelect?.addEventListener('change', updateNamunaDetailsArray);
    toYearSelect?.addEventListener('change', updateNamunaDetailsArray);

    // Handle row addition
    document.getElementById('namuna-15-table-body').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-row-btn')) {
            const currentIndex = parseInt(event.target.getAttribute('data-rowIndex'), 10);

            // Insert a new object in the array
            namuna15DetailsArray.splice(currentIndex + 1, 0, { ...psNamuna15Object });

            renderFunctions.renderNamuna15TableBody(namuna15DetailsArray);
        }
    });

    // Format date as YYYY-MM-DD for storing in backend
    function formatDateInYYYYMMDD(_date) {
        if (!_date || !_date.trim()) return '';
        return _date.split('-').reverse().join('-');
    }

    let areInsertedEntriesValid = true;

    // Prepare final Namuna 15 details array for submission
    function getFinalNamuna15DetailsArray(array) {
        return array
            .map((entry, entryIndex) => {
                let isEmpty = true;
                const formattedEntry = {};

                for (let key in psNamuna15Object) {
                    const fieldValue = entry[key];

                    if (typeof fieldValue === 'string' && fieldValue.trim()) {
                        isEmpty = false; // If it's a non-empty string, mark isEmpty as false
                    }

                    // If the field is a date, format it
                    if (key === 'date') {
                        formattedEntry[key] = formatDateInYYYYMMDD(fieldValue);
                    } else {
                        formattedEntry[key] = fieldValue;
                    }
                }

                // Skip empty entries
                if (isEmpty) return null;

                return { ...formattedEntry, from_year: fromYearSelect.value, to_year: toYearSelect.value };
            })
            .filter((entry) => entry);
    }

    // Submit all entries
    document
        .getElementById('submit-all-entries-btn')
        ?.addEventListener('click', async function (e) {
            e.preventDefault();

            if (!fromYearSelect.value || !toYearSelect.value) {
                return alertjs.warning({
                    t: 'WARNING',
                    m: 'वर्ष निवडा'
                })
            }

            areInsertedEntriesValid = true; // Reset validity flag
            let finalArray = getFinalNamuna15DetailsArray(namuna15DetailsArray);

            if (!areInsertedEntriesValid || finalArray.length <= 0) {
                return alerjs.warning({
                    t: 'ERROR',
                    m: 'Enter all required fields',
                });
            }

            try {
                const _postUrl = `/namuna/15/create-bulk`;
                const _res = await fetch(_postUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalArray),
                });

                const _resData = await _res.json();

                if (_resData.call == 1) {
                    alertjs.success(
                        {
                            t: 'SAVE',
                            m: 'Entries saved successfully',
                        },
                        () => {
                            areInsertedEntriesValid = true;
                            namuna15DetailsArray = [{ ...psNamuna15Object }];
                            location.reload();
                        }
                    );
                }
            } catch (err) {
                console.log(`Error while submitting the details: ${err}`);
            }
        });

    // ---------------------UPDATE FORM -------------------------------------------------

    // EVERY SINGLE UPDATE BUTTON

    const handleUpdateNamuna15Entry = async (updatedEntry) => {
        try {
            const _url = `/namuna/15/update`; // Update URL for Namuna 15

            const _res = await fetch(_url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEntry),
            });

            const { call, message } = await _res.json();

            if (call == 1) {
                alertjs.success({
                    t: 'UPDATE',
                    m: 'Entry updated successfully',
                });
            } else {
                alertjs.warning({
                    t: 'UPDATE FAILED',
                    m: message || 'Failed to update the entry',
                });
            }
        } catch (err) {
            console.log(`Error while updating the entry : ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'An error occurred while updating the entry',
            });
        }
    };

    document.querySelectorAll('.update-row-btn')?.forEach((updateRowBtn) => {
        updateRowBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const rowIndex = updateRowBtn.getAttribute('data-rowIndex');

            const id = updateRowBtn.getAttribute('data-entryId');
            // Make a copy of the psNamuna15Object for updating
            let updatedEntry = { ...psNamuna15Object };

            // Select all input fields corresponding to the current rowIndex
            const correspondingInputs = document.querySelectorAll(
                `input[data-rowIndex="${rowIndex}"]`
            );

            // Loop through each input and update the corresponding field in updatedEntry
            correspondingInputs.forEach((input) => {
                const inputName = input.getAttribute('name'); // Use 'name' as the key

                let inputValue = input.value; // The input's value

                if (input.classList.contains('datepicker')) {
                    inputValue = formatDateInYYYYMMDD(inputValue);
                }

                updatedEntry = {
                    ...updatedEntry,
                    [inputName]: inputValue, // Update the field based on the input's name and value
                };
            });

            // Include year values and id
            updatedEntry.from_year = fromYearSelect.value;
            updatedEntry.to_year = toYearSelect.value;
            updatedEntry.id = id;

            handleUpdateNamuna15Entry(updatedEntry);
        });
    });

    // --------------- UPDATE END ----------

    // -----------------------DELETE ------------

    const handleDeleteNamuna15Entry = async (id) => {
        try {
            const url = '/namuna/15/delete'; // Delete URL for Namuna 15

            const _res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const _resData = await _res.json();

            if (_resData.call == 1) {
                alertjs.success({
                    t: 'DELETE',
                    m: 'Entry deleted successfully',
                });
                window.location.reload(); // Reload the page after deletion
            } else {
                alertjs.warning({
                    t: 'DELETE FAILED',
                    m: _resData.message || 'Failed to delete the entry',
                });
            }
        } catch (err) {
            console.log(`Error while deleting the entry : ${err}`);
            alertjs.warning({
                t: 'ERROR',
                m: 'Could not delete the entry',
            });
        }
    };

    document.querySelectorAll('.delete-row-btn')?.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            alertjs.deleteSpl('Confirm Delete ?', (status) => {
                if (status) {
                    const id = deleteBtn.getAttribute('data-entryId');
                    handleDeleteNamuna15Entry(id);
                }
            });
        });
    });
});
