// Allow only numbers and max 4 digits
$(document).on("input", "input[name='fromYear'], input[name='toYear']", function () {
    this.value = this.value.replace(/\D/g, '').slice(0, 4);
});

// Auto-fill toYear when fromYear is valid
$(document).on("input", "input[name='fromYear']", function () {
    let fromYear = $(this).val();

    if (fromYear.length === 4) {
        let nextYear = parseInt(fromYear) + 1;
        $("input[name='toYear']").val(nextYear);
    }
});

// Validation before submit
let validateYears = () => {
    let fromYear = $("input[name='fromYear']").val();
    let toYear = $("input[name='toYear']").val();

    if (!fromYear || !toYear) {
        alert("Both years are required");
        return false;
    }

    if (fromYear.length !== 4 || toYear.length !== 4) {
        alert("Year must be 4 digits");
        return false;
    }

    fromYear = parseInt(fromYear);
    toYear = parseInt(toYear);

    if (fromYear === toYear) {
        alert("From year and To year cannot be same");
        return false;
    }

    if ((toYear - fromYear) !== 1) {
        alert("Year difference must be exactly 1");
        return false;
    }

    return true;
};

// API call
let handleCreateDbBackUp = async ($btn, backupData) => {
    try {
        $btn.prop("disabled", true).text("Processing...");

        const { success, message } = await fetch('/db/clone', {
            method: "POST",
            body: backupData,
        }).then(r => r.json());

        if (success) {
            alertjs.success({
                t: 'SUCCESS',
                m: "Backup done"
            }, () => {
                location.reload();
            });
        } else {
            alert(message || "Something went wrong");
        }

    } catch (err) {
        console.error('Error:', err);
        alert("Error occurred");
    } finally {
        $btn.prop("disabled", false).text("Save Backup");
    }
};

// Submit handler
$(document).on("click", '#save-backup-db-btn', function (e) {
    e.preventDefault();

    if (!validateYears()) return;

    let $btn = $(this);
    let $formEl = document.getElementById("backup-form");
    let backupData = new FormData($formEl);

    handleCreateDbBackUp($btn, backupData);
});