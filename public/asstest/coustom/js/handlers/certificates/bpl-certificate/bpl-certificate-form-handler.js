

$(function () {

    $(".datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "-90:+0",
    });
    let members = [];        // Internal array
    let editingIndex = null;
    let editingId = null // Tracks the current edit index

    let isEditPage = false;

    // Render function
    function renderMembers(_members) {
        const container = $("#family-members-container");
        // container.empty();
        // console.log('--------------------------')
        // console.log(_members)
        // console.log('==========')

        let html = _members.map((member, index) => {
            return `
                <div class="col-12 mt-2 family-member" data-index="${index}" data-bplFamilyMemberId="${member.id || ''}">
                    <div class="row gy-2 align-items-center">
                        <div class="col-4">
                            <input type="text" class="form-control" value="${member.family_member_name}" disabled>
                        </div>
                        <div class="col-4">
                            <input type="text" class="form-control" value="${member.family_member_name_m}" disabled>
                        </div>
                        <div class="col-4 text-end">
                            <button type="button" class="btn btn-sm btn-warning edit-member-btn" data-index="${index}" data-familyMemberId="${member.id || ''}">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-danger delete-member-btn" data-index="${index}" data-familyMemberId="${member.id || ''}">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join(' ');
        container.html(html);
    }

    if (typeof _bplCertificate != 'undefined') {
        isEditPage = true
        if (_bplCertificate.family_members && _bplCertificate.family_members?.length) {
            members = _bplCertificate.family_members
            console.log(members)
            renderMembers(members)
        }
    }

    // Add / Update member
    $(document).on("click", "#add-family-member-btn", async function () {
        const name = $("#new-member-name").val().trim();
        const name_m = $("#new-member-name-m").val().trim();

        if (!name || !name_m) {
            alertjs.warning({ t: "कृपया सदस्याचे नाव भरा" });
            return;
        }


        // When not a editing page
        if (!isEditPage) {

            if (editingIndex !== null) {
                members[editingIndex].family_member_name = name;
                members[editingIndex].family_member_name_m = name_m;
                editingIndex = null;
                editingId = null
            } else {
                members.push({
                    id: null,
                    family_member_name: name,
                    family_member_name_m: name_m
                });
            }

            $("#new-member-name").val('');
            $("#new-member-name-m").val('');
            renderMembers(members);
        } else {

            let payload = {
                family_member_name: name,
                family_member_name_m: name_m,
                bpl_certificate_id_fk: isEditPage ? _bplCertificate.id : '',
                id: editingId
            }

            let stringifiedPayload = JSON.stringify(payload)


            try {

                let url = '/bpl-certificate/family-member'

                let { success, message } = await fetch(url, {
                    method: editingIndex != null ? 'PUT' : 'POST',
                    body: stringifiedPayload,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())

                if (success) {
                    alertjs.success({ t: 'SUCCESS', m: message }, () => location.reload())
                } else {
                    alertjs.warning({ t: 'WARNING', m: message })
                }
            } catch (err) {
                console.error('Error:', err);
                alertjs.warning({ t: 'WARNING', m: err?.message || 'काहीतरी चुकले.' })
            }
        }
    });

    // Edit member
    $(document).on("click", ".edit-member-btn", function () {
        const index = $(this).data("index");
        const certId = $(this).attr('data-familyMemberId')

        const member = members[index];

        $("#new-member-name").val(member.family_member_name);
        $("#new-member-name-m").val(member.family_member_name_m);

        editingIndex = index;
        editingId = certId
    });

    // Delete member
    $(document).on("click", ".delete-member-btn", async function () {
        if (!isEditPage) {
            const index = $(this).data("index");
            members = members.filter((_, i) => i !== index);
            renderMembers(members);
        } else {
            try {

                let url = '/bpl-certificate/family-member'

                let { success, message } = await fetch(url, {
                    method: 'DELETE',
                    body: JSON.stringify({ id: $(this).attr('data-familyMemberId') }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())

                if (success) {
                    alertjs.success({ t: 'SUCCESS', m: message }, () => location.reload())
                } else {
                    alertjs.warning({ t: 'WARNING', m: message })
                }
            } catch (err) {
                console.error('Error:', err);
                alertjs.warning({ t: 'WARNING', m: err?.message || 'काहीतरी चुकले.' })
            }
        }
    });

    // Auto translate to Marathi
    $(document).on("change", ".to-marathi", function () {
        const engText = $(this).val();
        const marathiInput = $(this).closest(".form-group").find("input").eq(1);
        commonHandler.translateWord(engText, function (data) {
            marathiInput.val(data);
        });
    });

    // Gender translation
    $(document).on("change", "[name='gender']", function () {
        const gender = $(this).val()?.toLowerCase();
        let marathiGender = "";
        if (gender === "male") marathiGender = "पुरुष";
        else if (gender === "female") marathiGender = "स्त्री";
        else if (gender === "other") marathiGender = "इतर";
        $("[name='gender_m']").val(marathiGender);
    });

    // Form validation
    $("#bpl-certificate-form").validate({
        rules: {
            name: "required",
            name_m: "required",
            gender: "required",
            gender_m: "required",
            bpl_list_number: "required",
            bpl_list_number_m: "required",
            image: {
                required: function () {
                    return !isEditPage; // required if NOT edit page
                }
            },
            year: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            name: "कृपया नाव प्रविष्ट करा",
            name_m: "कृपया मराठी नाव प्रविष्ट करा",
            gender: "कृपया लिंग निवडा",
            gender_m: "कृपया लिंग (मराठीत) निवडा",
            bpl_list_number: "कृपया यादी क्रमांक प्रविष्ट करा",
            bpl_list_number_m: "कृपया मराठी यादी क्रमांक प्रविष्ट करा",
            image: "कृपया छायाचित्र अपलोड करा",
            year: "कृपया वैध वर्ष प्रविष्ट करा"
        }
    });

    // Form submit
    $(document).on("submit", "#bpl-certificate-form", async function (e) {
        e.preventDefault();

        if (!$("#bpl-certificate-form").valid()) {
            alertjs.warning({ t: "कृपया सर्व आवश्यक माहिती भरा" });
            return;
        }

        if (members.length === 0) {
            alertjs.warning({ t: "कृपया किमान एक कुटुंब सदस्य जोडा" });
            return;
        }

        const formEl = document.getElementById("bpl-certificate-form");
        const formData = new FormData(formEl);
        formData.set('createdAt', _commonjsDateFormat(formData.get('createdAt')));
        formData.append("members", JSON.stringify(members));

        try {
            const res = await fetch("/bpl-certificate", {
                method: isEditPage ? "PUT" : "POST",
                body: formData
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({ t: "यशस्वी", m: message || "प्रमाणपत्र जतन झाले." }, () => location.reload());
                // formEl.reset();
                // members = [];
                renderMembers(members);
            } else {
                alertjs.warning({ t: "त्रुटी", m: message || "प्रमाणपत्र जतन करता आले नाही." });
            }
        } catch (err) {
            console.error("Form Submit Error:", err);
            alertjs.warning({ t: "त्रुटी", m: "जतन करताना अडचण आली." });
        }
    });
});



/*
$(function () {
    // ✅ Auto-translate to Marathi
    $(document).on("change", ".to-marathi", function (e) {
        e.preventDefault();
        const engText = $(this).val();
        const marathiInput = $(this).closest(".form-group").find("input").eq(1);
        commonHandler.translateWord(engText, function (data) {
            marathiInput.val(data);
        });
    });

    // ✅ Gender Marathi Mapping
    $(document).on("change", "[name='gender']", function () {
        const gender = $(this).val()?.toLowerCase();
        let marathiGender = "";
        switch (gender) {
            case "male":
                marathiGender = "पुरुष";
                break;
            case "female":
                marathiGender = "स्त्री";
                break;
            case "other":
                marathiGender = "इतर";
                break;
        }
        $("[name='gender_m']").val(marathiGender);
    });

    // ✅ Validation rules
    $("#bpl-certificate-form").validate({
        rules: {
            name: "required",
            name_m: "required",
            gender: "required",
            gender_m: "required",
            bpl_list_number: "required",
            bpl_list_number_m: "required",
            image: "required",
            year: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            name: "कृपया नाव प्रविष्ट करा",
            name_m: "कृपया मराठी नाव प्रविष्ट करा",
            gender: "कृपया लिंग निवडा",
            gender_m: "कृपया लिंग (मराठीत) निवडा",
            bpl_list_number: "कृपया यादी क्रमांक प्रविष्ट करा",
            bpl_list_number_m: "कृपया मराठी यादी क्रमांक प्रविष्ट करा",
            image: "कृपया छायाचित्र अपलोड करा",
            year: "कृपया वैध वर्ष प्रविष्ट करा"
        }
    });

    // ✅ Submit handler
    $(document).on("submit", "#bpl-certificate-form", async function (e) {
        e.preventDefault();

        const formEl = document.getElementById("bpl-certificate-form");
        const formData = new FormData(formEl);

        // ✅ Collect family members (with Marathi names)
        const members = [];
        $("#family-members-container .family-member").each(function () {
            const name = $(this).find("input[name='member_name[]']").val();
            const name_m = $(this).find("input[name='member_name_m[]']").val();

            if (name && name_m) {
                members.push({ family_member_name: name, family_member_name_m: name_m });
            }
        });

        formData.append("members", JSON.stringify(members));

        if (!$("#bpl-certificate-form").valid()) {
            alertjs.warning({ t: "कृपया सर्व आवश्यक माहिती भरा" });
            return;
        }

        try {
            const res = await fetch("/bpl-certificate", {
                method: "POST",
                body: formData
            });

            const { success, message } = await res.json();

            if (success) {
                alertjs.success({ t: "यशस्वी", m: message || "प्रमाणपत्र जतन झाले." });
                formEl.reset();
                $("#family-members-container").empty();
            } else {
                alertjs.warning({ t: "त्रुटी", m: message || "प्रमाणपत्र जतन करता आले नाही." });
            }
        } catch (err) {
            console.error("Error saving BPL certificate:", err);
            alertjs.warning({ t: "त्रुटी", m: "जतन करताना अडचण आली." });
        }
    });

    let familyMembers = []


    function renderFamilyMembers(_membersList) {
        const html = familyMembers.map((_member, _index) => {
            return `
            `
        })
    }




    // ✅ Add family member input row
    $(document).on("click", "#add-family-member-btn", function () {
        const html = `

        <div class='col-12 mt-2 family-member'>
            <div class='row gy-2'>
                <div class="col-5">
                    <input type="text" class="form-control to-marathi" name="member_name[]" placeholder="नाव">
                </div>
                <div class="col-5">
                    <input type="text" class="form-control" name="member_name_m[]" placeholder="नाव (मराठीत)">
                </div>
                <div class="col-2 text-end">
                    <button type="button" class="btn btn-danger remove-member-btn"><i class="fa fa-trash"></i></button>
                </div>
            </div>
        </div>

    `;
        $("#family-members-container").append(html);
    });
    // ✅ Remove family member row
    $(document).on("click", ".remove-member-btn", function () {
        $(this).closest(".family-member").remove();
    });
});

*/