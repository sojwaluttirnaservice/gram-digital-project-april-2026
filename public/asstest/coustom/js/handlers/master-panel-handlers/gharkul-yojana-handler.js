$(() => {
$("#yojana-table").DataTable({
  destroy:true
})

  $("#save-gharkul-yojana-btn").on("click", async function (e) {
    e.preventDefault();
    const gy_name = $('[name="gy_name"]').val();
    const data = { gy_name };

    const response = await fetch("/gharkul-yojana/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      alert("Yojana created successfully");
      fetchYojanas();
    } else {
      alert("Error creating Yojana");
    }
  });

  $(document).on("click", ".edit-yojana-name-btn", function () {
    const yojanaId = $(this).attr("data-yojanaId");
    const inputField = $(`#input-field-${yojanaId}`);

    // alert(yojanaId);

    // Make the input field editable
    inputField.prop("readonly", false);

    // Hide Edit button and show Update & Cancel buttons
    $(this).hide();
    $(`.update-yojana-name-btn[data-yojanaId=${yojanaId}]`).show();
    $(`.cancel-yojana-name-btn[data-yojanaId=${yojanaId}]`).show();

    inputField.focus();

    const length = inputField.val().length;
    inputField[0].setSelectionRange(length, length);
  });

  // Handle Update Button Click
  $(document).on("click", ".update-yojana-name-btn", async function () {
    const yojanaId = $(this).attr("data-yojanaId");
    const inputField = $(`#input-field-${yojanaId}`);
    const updatedName = inputField.val();

    try {
      const response = await fetch(`/gharkul-yojana/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: yojanaId,
          gy_name: updatedName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        location.reload()
      } else {
        alert("Failed to update the record.");
      }

      // Make the input field readonly again
      inputField.prop("readonly", true);

      // Hide Update & Cancel buttons and show Edit button
      $(this).hide();
      $(`.cancel-yojana-name-btn[data-yojanaId=${yojanaId}]`).hide();
      $(`.edit-yojana-name-btn[data-yojanaId=${yojanaId}]`).show();
    } catch (error) {
      console.error("Error updating yojana:", error);
      alert("Error updating the record.");
    }
  });

  // Handle Cancel Button Click
  $(document).on("click", ".cancel-yojana-name-btn", function () {
    const yojanaId = $(this).attr("data-yojanaId");
    const inputField = $(`#input-field-${yojanaId}`);

    // Revert input field value to original (you might need to store the original value if necessary)
    inputField.val(inputField.attr("data-originalValue"));

    // Make the input field readonly again
    inputField.prop("readonly", true);

    // Hide Update & Cancel buttons and show Edit button
    $(this).hide();
    $(`.update-yojana-name-btn[data-yojanaId=${yojanaId}]`).hide();
    $(`.edit-yojana-name-btn[data-yojanaId=${yojanaId}]`).show();
  });


  $(document).on("click", ".delete-yojana-name-btn", async function () {
    const yojanaId = $(this).attr("data-yojanaId");
  
    // Prompt the user for confirmation
    if (confirm("Are you sure you want to delete this Yojana?")) {
      try {
        // Make the DELETE request to the server using fetch
        const response = await fetch(`/gharkul-yojana/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: yojanaId })
        });
        const data = await response.json();
  
        if (data.success) {
          alert("Yojana deleted successfully.");
  
          // Remove the row from the table
          const row = $(`tr:has(button[data-yojanaId=${yojanaId}])`);
          row.remove();
  
          // Update the indices of remaining rows
          $('table tbody tr').each((index, element) => {
            $(element).find('td:first').text(index + 1);
          });
        } else {
          alert("Failed to delete Yojana. Please try again.");
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        alert("An error occurred while deleting the Yojana.");
      }
    }
  });
  
  
});
