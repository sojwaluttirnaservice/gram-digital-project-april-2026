$(function () {
    // View Toggling
    const switchSmsViewBtn = $('#switchToSmsViewBtn');
    const switchCreateTemplateBtn = $('#switchToCreateTemplateBtn');

    const smsViewDiv = $('#smsViewDiv');
    const createSmsTemplateDiv = $('#createSmsTemplateDiv');

    createSmsTemplateDiv.addClass('d-none');

    switchCreateTemplateBtn.on('click', function () {
        createSmsTemplateDiv.removeClass('d-none');
        smsViewDiv.addClass('d-none');
    });

    switchSmsViewBtn.on('click', function () {
        createSmsTemplateDiv.addClass('d-none');
        smsViewDiv.removeClass('d-none');
    });

    // Submit data function

    const handleSubmitData = async (formData) => {
        try {
            const response = await fetch('/sms/submit', {
                method: 'POST',
                header: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const res = await response.json();

            if (res.call === 1) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: 'Template successfully saved',
                });
            } else if (res.call == 0) {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Template Already exists',
                });
            } else {
                alertjs.warning({
                    t: 'WARNING',
                    m: 'Template not saved',
                });
            }
        } catch (err) {
            console.log('Error : ', err);
            alertjs.warning({
                t: 'WARNING',
                m: 'Something went wrong',
            });
        }
    };

    $('#createTemplateForm').validate({
        rules: {
            sender_id: {
                required: true,
                minlength: 1, // Minimum length for sender_id
            },
            template_id: {
                required: true,
                digits: true, // Only digits allowed
            },
            template_name: {
                required: true,
                minlength: 3, // Minimum length for template_name
            },
            header_id: {
                required: true,
                digits: true, // Only digits allowed
            },
            template_string: {
                required: true,
                minlength: 5, // Minimum length for template_string
            },
        },
        messages: {
            sender_id: {
                required: 'Sender ID is required',
                minlength: 'Sender ID must be at least 1 character long',
            },
            template_id: {
                required: 'Template ID is required',
                digits: 'Template ID must be a number',
            },
            template_name: {
                required: 'Template Name is required',
                minlength: 'Template Name must be at least 3 characters long',
            },
            header_id: {
                required: 'Header ID is required',
                digits: 'Header ID must be a number',
            },
            template_string: {
                required: 'Template SMS content is required',
                minlength: 'Template SMS content must be at least 5 characters long',
            },
        },
        errorPlacement: function (error, element) {
            // Custom placement example: place error after the input field
            error.insertAfter(element);
        },
        highlight: function (element, errorClass) {
            $(element).addClass('is-invalid'); // Add Bootstrap's 'is-invalid' class on error
        },
        unhighlight: function (element, errorClass) {
            $(element).removeClass('is-invalid'); // Remove error class when valid
        },
    });

    // Form submission
    $('#submit-new-template-btn').on('click', function () {
        // const formDataArray = $('#createTemplateForm').serializeArray();
        // $.each(formDataArray, (index, el) => {
        //     templateFormData.set(el.name, el.value);
        // });
        const templateFormData = new FormData(document.getElementById('createTemplateForm'));

        if (!$('#createTemplateForm').valid()) {
            alertjs.warning({
                t: 'Fill all fields',
            });

            return;
        }

        handleSubmitData(templateFormData);
    });

    $('#senderId').on('change', function () {
        let senderId = $(this).val();

        getTemplates(senderId);
    });
    // Templates
    let smsTemplatesNew = [];
    async function getTemplates(senderId) {
        if (senderId == -1) {
            $('#smsTemplate').val('-1').trigger('change');
            smsTemplatesNew = [];

            pushTemplates([]);
            return;
        }

        // $('#smsTemplate').val($('')).trigger('change');
        let response = await fetch('/sms/get-templates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senderId }),
        });

        let { data } = await response.json();
        console.log(data)

        pushTemplates(data);
    }

    function pushTemplates(templateInfo) {
        templateInfo.forEach((_template) => {
            smsTemplatesNew.push({
                templateId: _template.template_id,
                templateName: _template.template_name,
                templateSms: _template.template_string,

                // This was for pinnacle
                // templateHeaderId: _template.header_id,

                // for digiweapons
                entityId: _template.entity_id
            });
        });

        let html = `<option value='-1'> -- Select Template -- </option>`;

        html += `${smsTemplatesNew
            ?.map((template) => {
                // console.log(template);
                const valueString = `${template.templateId}:-:${template.templateName}:-:${template.templateSms}`;
                return `<option value='${valueString}' data-entityId='${template.entityId}' data-headerId='${template.templateHeaderId}'> ${template.templateName} (${template.templateId})</option>`;
            })
            .join('')}`;

        $('#smsTemplate').html(html);
    }

    let selectedTemplate = '';

    let valArray = [];

    $('#smsTemplate').on('change', function () {
        valArray = $(this).val()?.split(':-:') || [];
        // Get the selected option
        const selectedOption = $(this).find('option:selected');

        // Retrieve the data-headerId attribute from the selected option
        // const headerId = selectedOption.attr('data-headerId'); // Use jQuery's .data() method
        
        // $('#headerId').val(headerId);


        let entityId = selectedOption.attr('data-entityId');

        $("#entityId").val(entityId)

        selectedTemplate = valArray[2] || '-1';

        if (selectedTemplate == '-1') {
            $('#template-preview').html('').removeClass('active');
            return false;
        }

        let count = 0;
        // let templateStr = selectedTemplate
        //     ?.split(/\s+/)
        //     .map((el, i) => {
        //         if (el === '{#var#}') {
        //             return `<input type='text' class='smsTemplateInput form-control' placeholder='Type here' id=val_${(count =
        //                 count + 1)} maxlength='32' />`;
        //         } else {
        //             return el;
        //         }
        //     })
        //     .join(' ');

        let templateStr = selectedTemplate?.replace(/{#var#}/g, () => {
            count += 1;
            return `<input type='text' class='smsTemplateInput form-control' placeholder='Type here' id='val_${count}' maxlength='32' />`;
        });

        $('#template-preview').html(templateStr).addClass('active');

        // SmS preview also change

        // let smsString = selectedTemplate
        //     ?.split(' ')
        //     .map((el, i) => {
        //         if (el === '{#var#}') {
        //             return `__`;
        //         } else {
        //             return el;
        //         }
        //     })
        //     .join(' ');

        let smsString = selectedTemplate?.replace(/{#var#}/g, '__'); // Replace all occurrences of {#var#} with __

        $('#smsPreview').html(smsString);

        let dynamicValues = []; // these are the dynamic values from the sms template
        let previewSms = '';
        for (let i = 1; i <= $('.smsTemplateInput').length; i++) {
            $(document).on('input', '.smsTemplateInput', function (e) {
                e.preventDefault();
                let _this = $(this);

                if (_this.attr('id') == `val_${i}`) {
                    dynamicValues[i - 1] = _this.val();
                }

                // let count2 = 0;
                // previewSms = selectedTemplate
                //     .split(' ')
                //     .map((word, i) => {
                //         if (word === '{#var#}') {
                //             count2 = count2 + 1;
                //             word = dynamicValues[count2 - 1];
                //             return word;
                //         }
                //         return word;
                //     })
                //     .join(' ');

                let count2 = 0; // Initialize count2
                let previewSms = selectedTemplate.replace(/{#var#}/g, () => {
                    count2 += 1; // Increment count2 for each {#var#} found
                    return dynamicValues[count2 - 1]; // Replace with corresponding value from dynamicValues
                });

                // for digiweapons
                // eng : 160 , mr : 70
                
                $('#smsPreview').val(previewSms);

                $('#units-count').html(
                    `Count: ${previewSms.length} &emsp; Units: ${Math.ceil(
                        previewSms.length / 70
                    )}`
                );
            });
        }
    });

    // Select the view of selecting mobile number inputs

    async function handleFetchMobileNumber(url) {
        try {
            const res = await fetch(url, {
                method: 'GET',
            });

            const resData = await res.json();
            console.log(resData.numbers);
            return resData.numbers;
        } catch (err) {
            console.log(`Error while fetching the mobile number : ${err}`);
        }
    }

    function showMobileNumbersInTextarea(string) {
        if (!string || string.length < 10) {
            $('#warning-div').css('display', 'block').html('Count of mobile numbers is 0.');
            $('#candidateMobileNumbers').val('');
            return;
        } else {
            $('#warning-div').css('display', 'none');
        }
        $('#candidateMobileNumbers').val(string);
    }

    async function handleSelectChange() {
        const selectValue = Number($('#select-way').val());
        if (typeof lockEditMode === 'function') {
            lockEditMode();
        }

        $('.view-select').css('display', 'none');
        if (selectValue <= 2) {
            $(`.view-select[data-viewId='${selectValue}']`).show();
            if (selectValue === 1) {
                $('#candidate-excel-sheet-input').val('');
                showMobileNumbersInTextarea('');
                invalidNumbers = [];
                renderInvalidNumbers();
                resetStats();
            } else if (selectValue === 2) {
                let customVal = $('textarea[name="custom_mobile_number_string"]').val() || '';
                let mobiles = customVal
                    .split(',')
                    .filter(item => item.trim() !== '')
                    .map((singleMobileString) => [singleMobileString.trim()]);
                
                if (mobiles.length === 0) {
                    showMobileNumbersInTextarea('');
                    invalidNumbers = [];
                    renderInvalidNumbers();
                    resetStats();
                } else {
                    let validContactNumbers = getValidMobileNumbers(mobiles);
                    showMobileNumbersInTextarea(validContactNumbers);
                }
            }
        } else {
            $('#warning-div').css('display', 'none');
            let mobileNumbersString = '';

            let url = '';

            switch (selectValue) {
                case 3:
                    url = '/sms/nagrik-mobile-numbers';
                    break;
                case 4:
                    url = '/sms/form-8-users-mobile-numbers';
                    break;
                case 5:
                    url = '/sms/gp-members-mobile-numbers';
                    break;
            }

            let mobileNumbersArray = await handleFetchMobileNumber(url);

            const mobiles = mobileNumbersArray.map((singleMobileString) => {
                // Remove all spaces and get the last 10 digits
                const cleanedMobile = singleMobileString.replace(/\s+/g, ''); // Remove all spaces
                return [cleanedMobile.slice(-10)]; // Get last 10 digits
            });

            console.log(mobiles);


            // Reet or cleant hte existing values prevous
            $('#candidateMobileNumbers').val('');


            let validContactNumbers = getValidMobileNumbers(mobiles);

            showMobileNumbersInTextarea(validContactNumbers);
        }
    }
    $(document).on('change', '#select-way', function (e) {
        e.preventDefault();
        handleSelectChange();
    });

    handleSelectChange();

    $(document).on('input change', 'textarea[name="custom_mobile_number_string"]', function () {
        let rawVal = $(this).val();
        let cleanedVal = rawVal.replace(/[^0-9,]/g, '');
        if (rawVal !== cleanedVal) {
            $(this).val(cleanedVal);
            rawVal = cleanedVal;
        }

        let mobiles = rawVal
            .split(',')
            .filter(item => item.trim() !== '')
            .map((singleMobileString) => [singleMobileString.trim()]);

        let validContactNumbers = getValidMobileNumbers(mobiles);
        showMobileNumbersInTextarea(validContactNumbers);
    });

    //UPload sheet
    const uploadCandidateSheetBtn = $('#upload-candidate-sheet-btn');

    uploadCandidateSheetBtn.on('click', function (e) {
        e.preventDefault();
        const candidateExcelSheet = $('#candidate-excel-sheet-input')[0].files[0];

        let oFile = candidateExcelSheet;
        let sFilename = oFile.name;

        let reader = new FileReader();
        let result = {};

        reader.onload = function (e) {
            let data = e.target.result;
            data = new Uint8Array(data);
            let workbook = XLSX.read(data, { type: 'array' });
            let result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                    header: 1,
                    blankrows: false,
                });
                if (sheetData.length) result[sheetName] = sheetData;
            });

            let resultInArray = result.Sheet1;

            let validContactNumbers = getValidMobileNumbers(resultInArray);
            showMobileNumbersInTextarea(validContactNumbers);
        };

        reader.readAsArrayBuffer(oFile);
    });

    /**
     * Array containing identified invalid mobile numbers along with their validation fault reasons.
     * @type {Array<{number: string, reason: string}>}
     */
    let invalidNumbers = [];

    /**
     * Statistics tracker for mobile number processing.
     * @type {{total: number, valid: number, invalid: number, duplicates: number}}
     */
    let stats = {
        total: 0,
        valid: 0,
        invalid: 0,
        duplicates: 0
    };

    /**
     * Resets the statistics object to zero values and renders the updated state in the UI.
     */
    function resetStats() {
        stats = { total: 0, valid: 0, invalid: 0, duplicates: 0 };
        renderStats();
    }

    /**
     * Renders the statistics dashboard showing total inputs, valid uniques, invalid entries, and duplicate counts.
     */
    function renderStats() {
        $('#mobile-count').html(`
            <div class="row g-2 mb-3 mt-1 text-center">
                <div class="col-3">
                    <div class="p-2 border rounded bg-light">
                        <div class="text-muted small fw-semibold" style="font-size: 0.75rem;">Total Inputs</div>
                        <div class="fs-6 fw-bold text-dark" style="font-size: 1rem;">${stats.total}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 border rounded bg-light">
                        <div class="text-muted small fw-semibold" style="font-size: 0.75rem;">Valid (Unique)</div>
                        <div class="fs-6 fw-bold text-success" style="font-size: 1rem;">${stats.valid}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 border rounded bg-light">
                        <div class="text-muted small fw-semibold" style="font-size: 0.75rem;">Invalid</div>
                        <div class="fs-6 fw-bold text-danger" style="font-size: 1rem;">${stats.invalid}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="p-2 border rounded bg-light">
                        <div class="text-muted small fw-semibold" style="font-size: 0.75rem;">Duplicates</div>
                        <div class="fs-6 fw-bold text-warning" style="font-size: 1rem;">${stats.duplicates}</div>
                    </div>
                </div>
            </div>
        `);
    }

    /**
     * Parses an array of raw contact numbers, filters out valid unique entries, populates the statistics dashboard,
     * lists invalid numbers, and returns a comma-separated string of valid numbers (prefixed with country code '91').
     *
     * @param {Array<Array<string|number>>} contactNumbersArray - Array of raw numbers to process.
     * @returns {string} Comma-separated list of valid numbers.
     */
    function getValidMobileNumbers(contactNumbersArray) {
        // Set of unique numbers
        const validContactNumbersSet = new Set();
        const invalidContactNumbersMap = new Map();
        let totalInputCount = 0;

        contactNumbersArray.forEach((contactNum) => {
            let val = contactNum[0];
            if (val === undefined || val === null || val.toString().trim() === '') {
                return;
            }
            let rawNumStr = val.toString().trim();
            totalInputCount++;

            if (isValidMobileNumber(rawNumStr)) {
                let cleaned = rawNumStr.replace(/^[+]/g, '');
                let last10 = cleaned.slice(-10);
                validContactNumbersSet.add(`91${last10}`);
            } else {
                if (!invalidContactNumbersMap.has(rawNumStr)) {
                    invalidContactNumbersMap.set(rawNumStr, getInvalidReason(rawNumStr));
                }
            }
        });

        invalidNumbers = [];
        invalidContactNumbersMap.forEach((reason, number) => {
            invalidNumbers.push({ number, reason });
        });

        stats.total = totalInputCount;
        stats.valid = validContactNumbersSet.size;
        stats.invalid = invalidNumbers.length;
        stats.duplicates = Math.max(0, totalInputCount - (stats.valid + stats.invalid));

        renderStats();
        renderInvalidNumbers();

        let validContactNumbers = [...validContactNumbersSet];
        return validContactNumbers.join(',');
    }

    /**
     * Validates if a contact number is a valid mobile number (10 digits or 12 digits starting with country code '91').
     *
     * @param {string|number} contactNumber - The raw number input to validate.
     * @returns {boolean} True if the number is a valid mobile number, false otherwise.
     */
    function isValidMobileNumber(contactNumber) {
        if (!contactNumber) return false;
        let cleanedNumber = contactNumber.toString().trim().replace(/^[+]/g, '');
        if (
            !cleanedNumber || // Check for null, undefined, or empty strings
            isNaN(cleanedNumber) || // Check for non-numeric values
            !/^\d+$/.test(cleanedNumber) // Ensure it's digits
        ) {
            return false;
        }
        if (cleanedNumber.length === 10) {
            return true;
        }
        if (cleanedNumber.length === 12 && cleanedNumber.startsWith('91')) {
            return true;
        }
        return false;
    }

    /**
     * Determines and returns a user-friendly classification of why a mobile number is invalid.
     *
     * @param {string|number} contactNumber - The raw number input.
     * @returns {string} User-friendly reason string describing the validation fault.
     */
    function getInvalidReason(contactNumber) {
        if (!contactNumber || contactNumber.toString().trim() === '') {
            return 'Empty/Blank value';
        }
        let rawStr = contactNumber.toString().trim();
        let cleaned = rawStr.replace(/^[+]/g, '');
        
        if (!/^\d+$/.test(cleaned)) {
            return `Contains non-numeric characters (Length: ${rawStr.length})`;
        }
        
        if (cleaned.length < 10) {
            return `Too short (${cleaned.length} digits, expected 10)`;
        }
        
        if (cleaned.length === 11) {
            return `Invalid length (${cleaned.length} digits, expected 10 or 12 starting with 91)`;
        }
        
        if (cleaned.length === 12 && !cleaned.startsWith('91')) {
            return `12 digits but does not start with Country Code '91'`;
        }
        
        if (cleaned.length > 12) {
            return `Too long (${cleaned.length} digits, expected 10 or 12)`;
        }
        
        return 'Unknown validation fault';
    }

    function renderInvalidNumbers() {
        const container = $('#invalid-numbers-container');
        const listDiv = $('#invalid-numbers-list');
        const countSpan = $('#invalid-count');

        if (invalidNumbers.length === 0) {
            container.hide();
            listDiv.hide();
            $('#toggle-invalid-btn').text('Show Invalid Numbers');
        } else {
            countSpan.text(`Invalid Numbers Count: ${invalidNumbers.length}`);
            
            let html = '<ul class="list-group list-group-flush" style="margin-bottom: 0;">';
            invalidNumbers.forEach(item => {
                html += `<li class="list-group-item text-danger py-2 d-flex flex-column align-items-start" style="font-size: 0.85rem; background-color: transparent; border-bottom: 1px solid #dee2e6;">`;
                html += `  <span class="fw-bold">${item.number}</span>`;
                html += `  <span class="text-muted" style="font-size: 0.75rem;">Fault: ${item.reason}</span>`;
                html += `</li>`;
            });
            html += '</ul>';
            
            listDiv.html(html);
            container.show();
        }
    }

    $(document).on('click', '#toggle-invalid-btn', function (e) {
        e.preventDefault();
        const list = $('#invalid-numbers-list');
        list.slideToggle('slow', function() {
            if (list.is(':visible')) {
                $('#toggle-invalid-btn').text('Hide Invalid Numbers');
            } else {
                $('#toggle-invalid-btn').text('Show Invalid Numbers');
            }
        });
    });

    // Send Action of SMS to the numbers

    const handleSendSmsData = async (data) => {
        try {
            const response = await fetch('/sms/send-sms', {
                method: 'POST',
                body: data,
            });

            const res = await response.json();

            if (res.call === 1) {
                alertjs.success({
                    t: 'यशस्वी',
                    m: 'मेसेजेस यशस्वीरीत्या पाठवले गेले',
                });
            } else {
                alertjs.warning({
                    t: 'वार्निंग',
                    m: 'मेसेजेस पाठवू शकलो नाही',
                });
            }
        } catch (err) {
            console.log('Error while sending the sms : ', err);
        }
    };

    const performSendSmsFormValidation = () => {
        const senderIdVal = $('#senderId').val();
        if (!senderIdVal || senderIdVal === '-1') {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'Sender Id पर्याय निवडलेला नाही',
            });
            return false;
        }

        const smsTemplateVal = $('#smsTemplate').val();
        if (!smsTemplateVal || smsTemplateVal === '-1') {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'Sms Template पर्याय निवडलेला नाही',
            });
            return false;
        }

        if (!valArray || valArray.length < 2 || !valArray[0] || valArray[0] === '-1') {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'कृपया योग्य Template निवडा',
            });
            return false;
        }

        let hasEmptyInputs = false;
        $('.smsTemplateInput').each(function () {
            if (!$(this).val().trim()) {
                hasEmptyInputs = true;
            }
        });
        if (hasEmptyInputs) {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'सर्व रिकाम्या जागा (Template Inputs) भरा',
            });
            return false;
        }

        const candidateNumbers = $('#candidateMobileNumbers').val();
        if (!candidateNumbers || candidateNumbers.trim() === '') {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'मोबाईल नंबर्स अपलोड केलेले नाही किंवा उपलब्ध नाही',
            });
            return false;
        }

        return true;
    };

    const sendSmsBtn = $('#send-sms-btn');

    sendSmsBtn.on('click', (e) => {
        //should send sms
        e.preventDefault();
        const sendSmsFormData = new FormData();
        const sendSmsFormDataArray = $('#sendSmsForm').serializeArray();

        sendSmsFormDataArray.forEach((el) => {
            sendSmsFormData.set(el.name, el.value);
            console.log(el.name, el.value);
        });

        sendSmsFormData.set('template_id', valArray[0]); //Plus sign to convert it to number
        sendSmsFormData.set('template_name', valArray[1]);
        // for (const [key, val] of sendSmsFormData) {
        //     console.log(key, ' ----------- ', val);
        // }
        if (!performSendSmsFormValidation()) {
            return;
        }

        const mobileNumbers = sendSmsFormData.get('mobile')?.split(',');

        if (!mobileNumbers) {
            alertjs.warning({
                t: 'WARNING',
                m: 'Please provide mobile numbers',
            });
            return;
        }

        const chunkSize = 300;
        const totalChunks = Math.ceil(mobileNumbers.length / chunkSize);
        let currentChunkIndex = 0;

        function sendSmsChunk() {
            if (currentChunkIndex >= totalChunks) {
                alertjs.success({
                    t: 'SUCCESS',
                    m: 'Messages sent to all numbers',
                });
                return;
            }

            // Get the current chunk
            const start = currentChunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, mobileNumbers.length);
            const currentChunk = mobileNumbers.slice(start, end);
            console.log(`Total mobie numbers : ${mobileNumbers.length}`);
            console.log(`Current chunk length = ${currentChunk.length}`);

            console.log(
                `Sending SMS to chunk ${currentChunkIndex + 1} of ${totalChunks}:`,
                currentChunk
            );
            let currentChunkString = currentChunk.join(',');

            sendSmsFormData.set('mobile', currentChunkString);

            // Simulate the SMS sending process (replace this with your actual send function)
            handleSendSmsData(sendSmsFormData);

            // Increment the chunk index for the next iteration
            currentChunkIndex++;

            // Schedule the next chunk to be sent after 1 second (1000 ms)
            setTimeout(sendSmsChunk, 1000);
        }
        sendSmsChunk();
    });

    function lockEditMode() {
        const textarea = $('#candidateMobileNumbers');
        textarea.prop('readonly', true);
        $('#toggle-edit-mobiles-btn')
            .removeClass('btn-success')
            .addClass('btn-outline-success')
            .html('<i class="fa fa-pencil me-1"></i> Edit Numbers');
    }

    $(document).on('click', '#toggle-edit-mobiles-btn', function (e) {
        e.preventDefault();
        const textarea = $('#candidateMobileNumbers');
        const isReadonly = textarea.prop('readonly');

        if (isReadonly) {
            textarea.prop('readonly', false);
            $(this)
                .removeClass('btn-outline-success')
                .addClass('btn-success')
                .html('<i class="fa fa-lock me-1"></i> Lock Numbers');
            alertjs.success({
                t: 'यशस्वी',
                m: 'मोबाईल नंबर संपादन मोड चालू केला आहे',
            });
        } else {
            textarea.prop('readonly', true);
            $(this)
                .removeClass('btn-success')
                .addClass('btn-outline-success')
                .html('<i class="fa fa-pencil me-1"></i> Edit Numbers');
            alertjs.success({
                t: 'यशस्वी',
                m: 'मोबाईल नंबर संपादन मोड बंद केला आहे',
            });
        }
    });

    $(document).on('input change', '#candidateMobileNumbers', function () {
        let rawVal = $(this).val();
        let cleanedVal = rawVal.replace(/[^0-9,]/g, '');
        if (rawVal !== cleanedVal) {
            $(this).val(cleanedVal);
            rawVal = cleanedVal;
        }

        let mobiles = rawVal
            .split(',')
            .filter(item => item.trim() !== '')
            .map((singleMobileString) => [singleMobileString.trim()]);

        if (mobiles.length === 0) {
            invalidNumbers = [];
            renderInvalidNumbers();
            resetStats();
            $('#warning-div').css('display', 'block').html('Count of mobile numbers is 0.');
        } else {
            getValidMobileNumbers(mobiles);
        }
    });

    $('#clear-mobiles-btn').on('click', function (e) {
        e.preventDefault();
        $('#candidateMobileNumbers').val('');
        $('textarea[name="custom_mobile_number_string"]').val('');
        $('#candidate-excel-sheet-input').val('');
        $('#warning-div').css('display', 'block').html('Count of mobile numbers is 0.');
        invalidNumbers = [];
        renderInvalidNumbers();
        resetStats();
        lockEditMode();
        alertjs.success({
            t: 'यशस्वी',
            m: 'मोबाईल नंबर यशस्वीरित्या साफ केले',
        });
    });

    $('#copy-mobiles-btn').on('click', function (e) {
        e.preventDefault();
        const numbers = $('#candidateMobileNumbers').val();
        if (!numbers || numbers.trim() === '') {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'कॉपी करण्यासाठी मोबाईल नंबर्स उपलब्ध नाहीत',
            });
            return;
        }

        navigator.clipboard.writeText(numbers).then(() => {
            alertjs.success({
                t: 'यशस्वी',
                m: 'मोबाईल नंबर क्लिपबोर्डवर कॉपी केले',
            });
        }).catch((err) => {
            console.error('Clipboard copy failed:', err);
            const tempTextarea = $('<textarea>');
            $('body').append(tempTextarea);
            tempTextarea.val(numbers).select();
            document.execCommand('copy');
            tempTextarea.remove();
            alertjs.success({
                t: 'यशस्वी',
                m: 'मोबाईल नंबर क्लिपबोर्डवर कॉपी केले',
            });
        });
    });
});
