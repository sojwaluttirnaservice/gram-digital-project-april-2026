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
        if (string.length < 10) {
            $('#warning-div').css('display', 'block').html('Count of mobile numbers is 0.');
            return;
        } else {
            $('#warning-div').css('display', 'none');
        }

        $('#mobile-count').html(
            `<span style='font-weight: bold;'>Valid Mobile Numbers Count </span> : <span style='color: blue; font-weight: bolder;'> ${string.split(',').length} </span>`
        );
        $('#candidateMobileNumbers').html(string);
    }

    async function handleSelectChange() {
        const selectValue = Number($('#select-way').val());

        $('.view-select').css('display', 'none');
        if (selectValue <= 2) {
            $(`.view-select[data-viewId='${selectValue}'`).show();
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
            $('#candidateMobileNumbers').html('');


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
        let currentValue = $(this).val();

        let mobiles = currentValue
            .split(',')
            .map((singleMobileString) => [+`${singleMobileString?.trim()}`]);

        let validContactNumbers = getValidMobileNumbers(mobiles);

        mobiles = currentValue
            .split(',')
            .map((singleMobileString) => [+`91${singleMobileString?.trim()}`]);
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

    function getValidMobileNumbers(contactNumbersArray) {
        // Set of unique numbers
        const validContactNumbersSet = new Set();
        contactNumbersArray.forEach((contactNum) => {
            if (isValidMobileNumber(contactNum[0])) {
                validContactNumbersSet.add(+`91${contactNum[0]}`);
            }
        });
        let validContactNumbers = [...validContactNumbersSet];
        return validContactNumbers.join(',');
    }

    function isValidMobileNumber(contactNumber) {
        let cleanedNumber = contactNumber.toString().trim();
        if (
            !cleanedNumber || // Check for null, undefined, or empty strings
            isNaN(cleanedNumber) || // Check for non-numeric values
            !/^\d{10}$/.test(cleanedNumber) // Ensure it's exactly 10 digits
        ) {
            return false;
        }
        return true;
    }

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
        if (+$('#senderId').val() === '-1') {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'Sender Id पर्याय निवडलेला नाही',
            });
            return false;
        }

        if (+$('#smsTemplate').val() === '-1') {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'Sms Template पर्याय निवडलेला नाही',
            });
            return false;
        }

        if (!$('#candidateMobileNumbers').val()) {
            alertjs.warning({
                t: 'वार्निंग',
                m: 'मोबाईल नंबर्स (excel sheet) अपलोड केलेले नाही',
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
});
