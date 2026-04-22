document.addEventListener('DOMContentLoaded', () => {
    const fromYearSelect = document.getElementById('from-year');
    const toYearSelect = document.getElementById('to-year');

    // Function to generate table rows for Namuna 15
    const namuna15TableBodyRow = (namunaEntryRow, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${namunaEntryRow._date}</td>
                <td>${namunaEntryRow.initial_quantity}</td>
                <td>${namunaEntryRow.received_item_name}</td>
                <td>${namunaEntryRow.item_quantity}</td>
                <td>${namunaEntryRow.total}</td>
                <td>${namunaEntryRow.purpose_or_receiver}</td>
                <td>${namunaEntryRow.issued_item_quantity}</td>
                <td>${namunaEntryRow.remaining_quantity}</td>
                <td>${namunaEntryRow.issuing_officer_name}</td>
                <td>${namunaEntryRow.receiving_officer_name}</td>
                <td>${namunaEntryRow.remarks}</td>
            </tr>
        `;
    };

    // Render functions for Namuna 15
    const renderFunctions = {
        renderNamuna15TableBody: (_namuna15Entries) => {
            // alert(_namuna15Entries.length)
            const bodyHtml = _namuna15Entries
                .map((namunaEntryRow, index) => namuna15TableBodyRow(namunaEntryRow, index))
                .join(' ');

            document.getElementById('namuna-15-table-body').innerHTML = bodyHtml;
        },
    };

    // Function to fetch Namuna 15 entries from the server
    const fetchNamuna15Entries = async (url) => {
        try {
            const res = await fetch(url);
            const resData = await res.json();
            return resData.namuna15Details; // Ensure this matches the API response
        } catch (err) {
            console.log(`Error while fetching the Namuna 15 entries: ${err}`);
            return [];
        }
    };

    // Event listener for showing results based on year selection
    document.getElementById('show-result-btn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        const fromYear = fromYearSelect.value;
        const toYear = toYearSelect.value;

        const url = `/namuna/15/fetch?fromYear=${fromYear}&toYear=${toYear}`;

        let namuna15Entries = await fetchNamuna15Entries(url);
        renderFunctions.renderNamuna15TableBody(namuna15Entries);
    });

    // Event listener for showing all results
    document.getElementById('show-all-result-btn')?.addEventListener('click', async (e) => {
        e.preventDefault();

        const url = `/namuna/15/fetch`;

        let namuna15Entries = await fetchNamuna15Entries(url);
        renderFunctions.renderNamuna15TableBody(namuna15Entries);
    });

    // Event listener for editing the report
    document.getElementById('edit-report-btn')?.addEventListener('click', async (e) => {
        e.preventDefault();

        const fromYear = fromYearSelect.value;
        const toYear = toYearSelect.value;
        if (fromYear && toYear) {
            window.location.href = `/namuna/15/edit?fromYear=${fromYear}&toYear=${toYear}`;
        } else {
            alert('Please select both From Year and To Year.');
        }
    });

    // Event listener for printing the report
    document.getElementById('go-to-print-btn')?.addEventListener('click', async (e) => {
        e.preventDefault();

        const fromYear = fromYearSelect.value;
        const toYear = toYearSelect.value;
        if (fromYear && toYear) {
            window.open(`/namuna/15/print?fromYear=${fromYear}&toYear=${toYear}`, '_blank');
        } else {
            alert('Please select both From Year and To Year.');
        }
    });
});
