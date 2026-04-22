$(() => {
  // Rendering the list logic

  //

  const renderTable = (dataList) => {
    // type is array of array [[{}, {}, ...], [{}, {}, ...]]

    const tableBody = dataList
      .map((entryArray, entryIndex) => {
        // type is array of object [{}, {}, ...]

        return `<tr>
                        <td>${entryIndex + 1}</td>
                        ${entryArray
                          .map((entry) => {
                            // iterate over each entry in entryArray
                            return `<td>${entry.value}</td>`; // create <td> for each entry's value
                          })
                          .join("")}

                        <td>
                            <div style="display: flex; gap: 0.4rem;">
                                <button class="btn btn-success btn-sm edit-row-btn" data-rowIndex="${entryIndex}">
                                    <i class="fa fa-pencil"></i>
                                </button>

                                <button class="btn btn-danger btn-sm delete-row-btn" data-rowIndex="${entryIndex}">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>

                    
                    </tr>`; // join all <td> elements into a single string
      })
      .join(""); // join all <tr> rows together

    $("#prapatra-g-table-body").html(tableBody);
  };

  let data_list = [];

  let headings = [
    {
      name: "tax_name",
      headerName: "कराचे नाव",
    },

    {
      name: "year_start_balance",
      headerName: "वर्षाच्या आरंभी येणे असलेली बाकी",
    },

    {
      name: "requested_for_year",
      headerName: "वर्षासाठी केलेली मागणी",
    },

    {
      name: "amount_to_be_collected",
      headerName: "वसूल करावयाची रक्कम",
    },

    {
      name: "amount_collected",
      headerName: "वसूल केलेली रक्कम",
    },
    {
      name: "concession_amount",
      headerName: "सूट म्हणून दिलेली रक्कम",
    },

    {
      name: "outstanding_previous_year_end",
      headerName: "वर्षाच्या अखेरीस मागील थकबाकी",
    },

    {
      name: "outstanding_current_year_end",
      headerName: "वर्षाच्या अखेरीस चालू अखेरीस थकबाकी",
    },

    {
      name: "total_at_year_end",
      headerName: "वर्षाच्या अखेरीस एकूण",
    },
    {
      name: "cash_collection_ratio",
      headerName: "वसुलीचे रोकडा प्रमाण",
    },

    {
      name: "collection_work_remark",
      headerName: "वसुलीच्या कामासंबधीचा शेरा",
    },

    {
      name: "",
      headerName: "Action",
    },
  ];

  data_list = [
    [
      { name: "tax_name", value: "इमारत जमीन कर" },
      { name: "year_start_balance", value: "" },
      { name: "requested_for_year", value: "" },
      { name: "amount_to_be_collected", value: "" },
      { name: "amount_collected", value: "" },
      { name: "concession_amount", value: "" },

      { name: "outstanding_previous_year_end", value: "" },
      { name: "outstanding_current_year_end", value: "" },
      { name: "total_at_year_end", value: "" },

      { name: "cash_collection_ratio", value: "" },
      { name: "collection_work_remark", value: "" },
    ],
    [
      { name: "tax_name", value: "विद्युत कर" },
      { name: "year_start_balance", value: "" },
      { name: "requested_for_year", value: "" },
      { name: "amount_to_be_collected", value: "" },
      { name: "amount_collected", value: "" },
      { name: "concession_amount", value: "" },

      { name: "outstanding_previous_year_end", value: "" },
      { name: "outstanding_current_year_end", value: "" },
      { name: "total_at_year_end", value: "" },

      { name: "cash_collection_ratio", value: "" },
      { name: "collection_work_remark", value: "" },
    ],
    [
      { name: "tax_name", value: "आरोग्य कर" },
      { name: "year_start_balance", value: "" },
      { name: "requested_for_year", value: "" },
      { name: "amount_to_be_collected", value: "" },
      { name: "amount_collected", value: "" },
      { name: "concession_amount", value: "" },
      { name: "outstanding_previous_year_end", value: "" },
      { name: "outstanding_current_year_end", value: "" },
      { name: "total_at_year_end", value: "" },
      { name: "cash_collection_ratio", value: "" },
      { name: "collection_work_remark", value: "" },
    ],
    [
      { name: "tax_name", value: "व्यवसाय कर" },
      { name: "year_start_balance", value: "" },
      { name: "requested_for_year", value: "" },
      { name: "amount_to_be_collected", value: "" },
      { name: "amount_collected", value: "" },
      { name: "concession_amount", value: "" },
      { name: "outstanding_previous_year_end", value: "" },
      { name: "outstanding_current_year_end", value: "" },
      { name: "total_at_year_end", value: "" },
      { name: "cash_collection_ratio", value: "" },
      { name: "collection_work_remark", value: "" },
    ],
  ];

  const setDataList = (_newDataList) => {
    data_list = _newDataList?.filter((entry) => entry != null) || [];
    renderTable(data_list);
  };

  if (typeof _prapatraG != "undefined") {
    console.log(_prapatraG);
    const parsedData = JSON.parse(_prapatraG.data_list);
    console.log(parsedData);
    let parsedDataList = parsedData?.map((e) => JSON.parse(e));
    // console.log(parsedDataList)
    setDataList(parsedDataList);
  } else {
    renderTable(data_list);
  }

  // Add to array logic

  $(document).on("click", "#add-row-btn", function (e) {
    e.preventDefault();

    let prapatraGForm = document.getElementById("prapatra-g-form");

    const formData = new FormData(prapatraGForm);

    const newRowData = [
      {
        name: "tax_name",
        value: formData.get("tax_name") || "", // If the value is not found, set it to an empty string
      },
      {
        name: "year_start_balance",
        value: formData.get("year_start_balance") || "",
      },
      {
        name: "requested_for_year",
        value: formData.get("requested_for_year") || "",
      },
      {
        name: "amount_to_be_collected",
        value: formData.get("amount_to_be_collected") || "",
      },
      {
        name: "amount_collected",
        value: formData.get("amount_collected") || "",
      },
      {
        name: "concession_amount",
        value: formData.get("concession_amount") || "",
      },
      {
        name: "outstanding_previous_year_end",
        value: formData.get("outstanding_previous_year_end") || "",
      },
      {
        name: "outstanding_current_year_end",
        value: formData.get("outstanding_current_year_end") || "",
      },

      {
        name: "total_at_year_end",
        value: formData.get("total_at_year_end") || "",
      },
      {
        name: "cash_collection_ratio",
        value: formData.get("cash_collection_ratio") || "",
      },
      {
        name: "collection_work_remark",
        value: formData.get("collection_work_remark") || "",
      },
    ];

    // console.log([...data_list, newRowData]);
    setDataList([...data_list, newRowData]);
    prapatraGForm.reset();
  });

  // Delete from arary logic

  $(document).on("click", ".delete-row-btn", function (e) {
    e.preventDefault();
    const rowIndex = parseInt($(this).attr("data-rowIndex"));
    setDataList(data_list.filter((_, index) => index !== rowIndex));
  });

  // Edi Button click

  function setValuesInInputs(rowData) {
    rowData.forEach((entry) => {
      $(`[name=${entry.name}]`).val(entry.value);
    });
  }

  let editRowIndex = -1;

  function toggleButtonsVisibility(showAddBtn) {
    $("#add-row-btn").css("display", showAddBtn ? "inline-block" : "none");
    $("#update-row-btn").css("display", !showAddBtn ? "inline-block" : "none");
  }

  // By default show add row button on the ui

  toggleButtonsVisibility(true);

  $(document).on("click", "#update-row-btn", function (e) {
    e.preventDefault();

    let prapatraGForm = document.getElementById("prapatra-g-form");

    const formData = new FormData(prapatraGForm);

    const newRowData = [
      {
        name: "tax_name",
        value: formData.get("tax_name") || "", // If the value is not found, set it to an empty string
      },
      {
        name: "year_start_balance",
        value: formData.get("year_start_balance") || "",
      },
      {
        name: "requested_for_year",
        value: formData.get("requested_for_year") || "",
      },
      {
        name: "amount_to_be_collected",
        value: formData.get("amount_to_be_collected") || "",
      },
      {
        name: "amount_collected",
        value: formData.get("amount_collected") || "",
      },
      {
        name: "concession_amount",
        value: formData.get("concession_amount") || "",
      },
      {
        name: "outstanding_previous_year_end",
        value: formData.get("outstanding_previous_year_end") || "",
      },
      {
        name: "outstanding_current_year_end",
        value: formData.get("outstanding_current_year_end") || "",
      },

      {
        name: "total_at_year_end",
        value: formData.get("total_at_year_end") || "",
      },
      {
        name: "cash_collection_ratio",
        value: formData.get("cash_collection_ratio") || "",
      },
      {
        name: "collection_work_remark",
        value: formData.get("collection_work_remark") || "",
      },
    ];

    if (editRowIndex != -1) {
      let newDataArray = [...data_list];
      newDataArray[editRowIndex] = newRowData;
      setDataList(newDataArray);
      editRowIndex = -1;
      toggleButtonsVisibility(true);
      prapatraGForm.reset();
    }
  });

  $(document).on("click", ".edit-row-btn", function (e) {
    e.preventDefault();
    const rowIndex = parseInt($(this).attr("data-rowIndex"));
    const currentRowData = data_list[rowIndex];

    editRowIndex = rowIndex;

    toggleButtonsVisibility(false);

    setValuesInInputs(currentRowData);
  });

  // const [isEditing, setIsEditing] = () => {
  //     let value = false;
  //     set
  // }

  const handleSaveUpdate = async (patrakJCleanlinessData) => {
    try {
      // Disable the buttons before making the API call
      const saveButton = $("#save-prapatra-g-btn");
      const updateButton = $("#update-prapatra-g-btn");
      saveButton.prop("disabled", true);
      updateButton.prop("disabled", true);

      if (!patrakJCleanlinessData.year) {
        alertjs.warning({
          t: "WARNING",
          m: "वर्ष निवडा",
        });
        // Re-enable the buttons if there's an error
        saveButton.prop("disabled", false);
        updateButton.prop("disabled", false);
        return;
      }

      const isEdit = !!patrakJCleanlinessData.id;

      const url = isEdit
        ? `/namuna/3/prapatra-g/update`
        : `/namuna/3/prapatra-g/save`;

      const _res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(patrakJCleanlinessData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { call, message } = await _res.json();

      if (call) {
        alertjs.success(
          {
            t: "SUCCESS",
            m: !isEdit ? "सेव झाले" : "अपडेट झाले",
          },
          () => location.reload()
        );
      } else {
        alertjs.warning({
          t: "WARNING",
          m: !isEdit ? "सेव नाही झाले" : "अपडेट नाही झाले",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alertjs.warning({
        t: "Error",
        m: "काहीतरी चुकले",
      });
    } finally {
      // Re-enable the buttons after the API call is complete
      $("#save-prapatra-g-btn").prop("disabled", false);
      $("#update-prapatra-g-btn").prop("disabled", false);
    }
  };

  $(document).on(
    "click",
    "#save-prapatra-g-btn, #update-prapatra-g-btn",
    function (e) {
      e.preventDefault();
      let prapatraGForm = document.getElementById("prapatra-g-form");

      const formData = new FormData(prapatraGForm);

      let sendData = {
        year: +formData.get("year"),
        data_list: data_list.map((singleArray) => JSON.stringify(singleArray)),
        id: formData.get("id"),
      };

      console.log(sendData);

      // return;

      handleSaveUpdate(sendData);
    }
  );

  // Save the details to the backend
});
