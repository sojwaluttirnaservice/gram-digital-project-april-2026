$(() => {
    // Declaret the variable to store the entrise

    const showHideSaveButton = (show) => {
        const btn = $('#add-to-magni-lekh-bulk-btn');
        if (show) {
            btn.show();
        } else {
            btn.hide();
        }
    };

    showHideSaveButton(false);

    const setFetchBtnDisableProp = (setDisabled) => {
        const fetchBtn = $('#fetch-magni-lekh-entries-btn'); // Select the button using jQuery
        if (setDisabled) {
            fetchBtn.prop('disabled', true); // Disable the button
        } else {
            fetchBtn.prop('disabled', false); // Enable the button
        }
    };

    let magniLekhEntriesGlobal = [];
    const setMagniLekhEntries = (newArray) => (magniLekhEntriesGlobal = newArray);

    // 1. Step 1

    function renderTable(magniLekhEntriesGlobal) {
        // Define the table headers with 'headerName' and 'name' for data keys
        const tableHeadings = [
            { headerName: 'मालमत्ता क्र', name: 'feu_malmattaNo' },
            { headerName: 'वार्ड नं', name: 'feu_wardNo' },
            { headerName: 'घर क्रमांक', name: 'feu_homeNo' },

            { headerName: 'भोगवटदाराचे नाव', name: 'feu_ownerName' },
            { headerName: 'मोबाईल क्रमांक', name: 'feu_mobileNo' },
            { headerName: 'आधार क्रं', name: 'feu_aadharNo' },

            { headerName: 'एकूण कर', name: 'totalTax' },
        ];

        // Construct the table heading dynamically
        const thead = `<thead>
            <tr>
                ${tableHeadings.map((heading) => `<th>${heading.headerName}</th>`).join('')}
            </tr>
        </thead>`;

        // Construct the table body dynamically
        const tbody = `<tbody>
            ${magniLekhEntriesGlobal
                .map((magniEntry) => {
                    return `<tr>
                    ${tableHeadings.map((heading) => `<td>${magniEntry[heading.name]}</td>`).join('')}
                </tr>`;
                })
                .join('')}
        </tbody>`;

        // Combine the thead and tbody to create the full table
        const tableHTML = `<table class="table table-striped">${thead}${tbody}</table>`;

        // Insert the generated table into the HTML container
        const tableContainer = document.getElementById('table');
        tableContainer.innerHTML = tableHTML;
    }

    // Function to fetch the detials based on the limits

    async function handleFetchMagniLekhEntries(minAmount = null, maxAmount = null) {
        try {
            let url = `/magni-lekh/bulk-entries`;

            setFetchBtnDisableProp(true);
            const params = [];
            if (minAmount) params.push(`minAmount=${minAmount}`);
            if (maxAmount) params.push(`maxAmount=${maxAmount}`);

            if (params.length) {
                url += `?${params.join('&')}`;
            }

            console.log('url = ', url);

            const _res = await fetch(url);

            const { call, magniLekhEntries } = await _res.json();

            if (call == 1) {
                // Function for rendering the entries
                magniLekhEntriesGlobal = magniLekhEntries;

                if (magniLekhEntries?.length > 0) {
                    showHideSaveButton(true);
                }else{
                    showHideSaveButton(false)
                }
                renderTable(magniLekhEntriesGlobal);
                console.table(magniLekhEntriesGlobal);
            }
            setFetchBtnDisableProp(false);
        } catch (error) {
            setFetchBtnDisableProp(false);
            console.error(`Error while fetching the entries ${error}`);
            alertjs.warning({
                t: 'Error',
                m: 'Something went wrong'
            })
        }
    }

    // Function to handle min and max amount

    function handleMinMaxAmountChange(e) {
        e?.preventDefault();

        const minAmount = +$("[name='min_amount']").val();
        const maxAmount = +$("[name='max_amount']").val();

        if (minAmount > maxAmount) {
            alertjs.warning({
                t: 'Warning',
                m: 'किमान रक्कम कमाल रकमेपेक्षा मोठी असू शकत नाही.',
            });
            return;
        }

        handleFetchMagniLekhEntries(minAmount, maxAmount);
    }

    // Attach event on both min and max limit inputs

    $(document).on('click', '#fetch-magni-lekh-entries-btn', handleMinMaxAmountChange);

    //2. Step 2

    // A function which save the entries in bulk for this

    async function handleSaveMagniLekhEntriesBulk() {
        try {
            const _res = await fetch('/magni-lekh/add-users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ magniLekhEntries: magniLekhEntriesGlobal }),
            });

            const { call } = await _res.json();

            if (call == 1) {
                alertjs.success(
                    {
                        t: 'Success',
                        m: 'सर्व मागणी लेख जतन झाले',
                    },
                    () => {
                        magniLekhEntriesGlobal = [];
                        renderTable(magniLekhEntriesGlobal);
                        window.location.reload();
                    }
                );
            }
        } catch (err) {
            console.error(`Error saving magni-lekh-entries`);
            alertjs.warning({
                t: 'Error',
                m: 'नोंद होऊ शकली नाही',
            });
        }
    }

    // Attach teh event on

    $(document).on('click', '#add-to-magni-lekh-bulk-btn', function (e) {
        e.preventDefault();
        if (magniLekhEntriesGlobal?.length <= 0) return;
        handleSaveMagniLekhEntriesBulk();
    });
});
