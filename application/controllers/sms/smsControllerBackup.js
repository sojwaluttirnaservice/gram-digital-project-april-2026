const HomeModel = require('../../model/HomeModel');
const ZPModel = require('../../model/ZPModel');
const smsModel = require('../../model/sms/smsModel');
const { sendApiResponse } = require('../../utils/apiResponses');
const asyncHandler = require('../../utils/asyncHandler');
const sendSmsController = require('./sendSmsController');
const { sendNewRegistrationSMS } = require('./sendSmsController');
var request = require('request');

const smsDeliveredResponsePatternRegex = /^\d{7}-(\d{4})_(\d{2})_(\d{2})$/;


let apiKey = '36915C24E7BDC2'
// Sample string below
/**
This will return when messages are
successfully uploaded with schedule id
and followed by today’s date.
*/

// const testString = "5068571-2008_12_29";

const messagErrorStatusCode = new Map([
    [
        'ES1004 Invalid Senderid',
        {
            meaning: 'This will return when sender id is incorrect.',
            message: 'Invalid Sender Id',
        },
    ],

    [
        'ES1002 Unauthorized Usage - insufficient privilege',
        {
            meaning: '',
        },
    ],
]);

const smsStatus = {
    DELIVERED: 'DELIVRD',
    EXPIRED: 'EXPIRED',
    UNDELIVERED: 'UNDELIV',
    NCPR: 'NCPR',
    PENDING: 'PENDING',
};


const newDigiWeaponsSmsStatus = {
    DELIVERED: "Delivered",
    UNDELIVERED: 'Failed'
}
// const gsevaBaseUrl = `https://g-seva.com/sms`;

const gsevaBaseUrl = process.env?.PROJECT_ENV == 'DEV' ? 'https://g-seva.com/sms' :`http://localhost:3000/sms`;

const smsController = {
    // done
    smsPageView: async function (req, res) {
        try {

            const gp = await HomeModel.getGpData(res.pool);

            let url = `${gsevaBaseUrl}/senderid`

            const response = await fetch(url);

            const { senderList } = await response.json();

            return res.render('user/sms/smsView', {
                title: 'SMS',
                gp: gp[0],
                senderList: JSON.stringify(senderList),
            });
        } catch (error) {
            console.error(error)
            res.status(500).send({ call: 0, data: error });
        }
    },

    // getting updated templates 
    // done
    getSmsTemplates: async (req, res) => {
        try {
            let { senderId } = req.body;
            const result = await smsModel.getSmsTemplates(res.pool, senderId);

            const response = await fetch(`${gsevaBaseUrl}/templates?senderId=${senderId}`);

            const { data } = await response.json();

            return res.status(200).json({
                call: 1,
                data: data,
            });
        } catch (err) {
            return res.status(500).json({
                call: 0,
                data: err,
            });
        }
    },


    smsTemplatesPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            // const _templates = await smsModel.getAllSmsTemplates(res.pool);

            const response = await fetch(`${gsevaBaseUrl}/templates`);
            const { data: _templates } = await response.json();

            console.log(_templates);
            res.render('user/sms/templatesPage', {
                templates: _templates,
                gp: _gp[0],
            });
        } catch (err) {
            console.log(`Error while rendering the templates page : ${err}`);
        }
    },

    

    renderSmsReportPage: async (req, res) => {
        try {
            const _gp = await HomeModel.getGpData(res.pool);
            const _report = await smsModel.getGpSmsRecords(res.pool);

           

            res.render('user/sms/sms-report-page', {
                gp: _gp[0],
                report: _report,
            });
        } catch (err) {
            console.log(`Error while rendering the report page : ${err}`);
        }
    },

    newSmsTemplateSubmit: async (req, res) => {
        try {
            const formData = req.body;

            const _existingTemplates = await smsModel.existingTemplate(res.pool, formData);

            // If the template already exists, return a 409 Conflict status
            if (_existingTemplates && _existingTemplates.length > 0) {
                return res.status(409).json({
                    call: 0,
                    message: 'Template already exists.',
                });
            }

            const _submitRes = await smsModel.newSmsTemplateSubmit(res.pool, formData);

            if (_submitRes.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: `New template created successfully`,
                });
            }
        } catch (err) {
            console.log(`Error while creating a new template`);
            res.status(500).send({
                call: 0,
                message: `Error while creating new template.`,
                error: err,
            });
        }
    },

    // To send the data:
    sendSmsToRegisteredNumbers: async (req, res) => {
        try {
            let data = req.body;

            const templateId = data.template_id;
            const templateName = data.template_name;


            // console.log("_________-")
            // console.log(data)
            // console.log("___________")

            return await sendNewRegistrationSMS(data, async (_data) => {
                const today = new Date();
                const dateTime =
                    ('0' + today.getDate()).slice(-2) +
                    '/' +
                    ('0' + (today.getMonth() + 1)).slice(-2) +
                    '/' +
                    today.getFullYear() +
                    '::IST::' +
                    ('0' + today.getHours()).slice(-2) +
                    ':' +
                    ('0' + today.getMinutes()).slice(-2) +
                    ':' +
                    ('0' + today.getSeconds()).slice(-2);

                const trackRecordData = {
                    campaining_name: `${templateName}_${dateTime}`,
                    response_data: _data.response.body,
                    message: data.sms,
                    template_id: templateId,
                    sender_id: data.sender_id,
                    mobile_numbers: data.mobile,
                    total_mobile_numbers_count: data.mobile.split(',').length || 0,
                    delivered_mobile_numbers_count: data.delivered_mobile_numbers_count || 0,
                    not_delivered_mobile_numbers_count:
                        data.not_delivered_mobile_numbers_count || 0,
                };

                const smsTrackRecordStatusResponse = await smsModel.saveSmsTrackRecord(
                    res.pool,
                    trackRecordData
                );
                setTimeout(async () => {
                    const getRecordData = await sendSmsController.fetchSMSMObileDeliverStatus(
                        _data.response.body
                    );

                    // console.log(getRecordData);

                    if (smsTrackRecordStatusResponse.affectedRows > 0) {
                        return res.status(200).json({
                            call: 1,
                            message: `Message sent successfully to ${_data.response.body.length} candidates`,
                        });
                    }
                }, 10000); // 3000 milliseconds = 3 seconds
            });
        } catch (err) {
            console.log(`Final error : ${err}`);
            return res.status(500).json({
                call: 0,
                message: 'Error while sending the messages',
                error: `${err?.message || 'Internal Server Error'}`,
            });
        }
    },

    renderSmsDeliveryPage: async (req, res) => {
        try {
            const { id, scheduleId } = req.query;

            const _gp = await HomeModel.getGpData(res.pool);


            console.log("---------")

            console.log(scheduleId)
            console.log('-----------')
            // console.log(object)

            const _deliveryReport = await smsModel.deliveryReport(res.pool, { scheduleId });

            console.log(_deliveryReport);

            const _msgInfo = await smsModel.getMessageInfo(res.pool, { scheduleId });

            res.render('user/sms/sms-delivery-report-page', {
                gp: _gp[0],
                deliveryReport: _deliveryReport,
                msgInfo: _msgInfo[0],
            });
        } catch (err) {
            console.log('Error while rendering the sms delivery status page :' + err);
        }
    },

    updateSmsTrackRecord: async (req, res) => {
        try {
            const data = req.body;

            // console.log('updating track recored ');
            const { singleRecord } = req.query;

            // Perform the fetch request
            // console.log(data.schedule_id)
            let digiweaponsScheduleId = data.schedule_id.split('/')[1]
            const _res = await fetch(
                // `http://smsjust.com/sms/user/response.php?Scheduleid=${data.schedule_id}`
                `https://sms.digiweapons.in/app/miscapi/${apiKey}/getDLR/${digiweaponsScheduleId}`
            );

            // Check if the response is okay
            if (_res.ok) {

                // old pinnnacle way
                /** 
                // Extract the response text
                const _responseString = await _res.text();

                if (_responseString == `PENDING`) {
                    return res.status(202).json({ call: 2, message: `Request is pending` });
                }
                */

                // let responseArray = await _res.text();
                let responseArray = await _res.json()

                let deliveredCount = 0;
                let undeliveredCount = 0;
                // let pendingCount = 0;

                
                // console.log(responseArray)
              

                // old pinnacle way 
                /** 
                const separatedArray = _responseString.split('<br>');

                // Filter out any empty values that may result from the last <br>
                const filteredArray = separatedArray.filter((item) => item.trim() !== '');

                

           
                const mobileDeliveryStutusArray = filteredArray.map((entry, index) => {
                    const [mobileNumber, deliveryStatus] = entry.split(/\s+/);

                    switch (deliveryStatus) {
                        case smsStatus.DELIVERED:
                            deliveredCount++;
                            break;

                        default:
                            undeliveredCount++;
                            break;
                    }

                    const rowObject = {
                        delivery_id: data.schedule_id,
                        original_response: entry,
                        mobile_number: mobileNumber,
                        sms_delivery_status: deliveryStatus,
                    };

                    return [
                        rowObject.delivery_id,
                        rowObject.original_response,
                        rowObject.mobile_number,
                        rowObject.sms_delivery_status,
                    ];
                });

                */
                

                // new digiweapons way
                let  mobileDeliveryStutusArray = [];
                if(responseArray) {

                    console.log(responseArray)

                    // console.log)

                    // sample response object of digiweapons sms 
                    // [{"MSISDN":"918308145363","DLR":"Delivered","DESC":"NA"}] 
                    mobileDeliveryStutusArray = responseArray.map(responseObject =>{
                        // let responseOb
                        // console.log(responseObject)
                        let deliveryStatus = responseObject.DLR;

                        switch (deliveryStatus) {
                            case newDigiWeaponsSmsStatus.DELIVERED:
                                deliveredCount++;
                                break;

                            default:
                                undeliveredCount++;
                                break;
                        }

                        let rowObject = {
                            delivery_id: digiweaponsScheduleId,
                            original_response: responseObject,
                            mobile_number: responseObject.MSISDN,
                            sms_delivery_status: responseObject.DLR, 
                        }

                       return [
                            rowObject.delivery_id,
                            rowObject.original_response,
                            rowObject.mobile_number,
                            rowObject.sms_delivery_status,
                        ];
                    })
                }
                

                const newData = {
                    ...data,

                    mobile_delivery_response: responseArray,
                    delivered_mobile_numbers_count: deliveredCount,
                    not_delivered_mobile_numbers_count: undeliveredCount,
                };


                // this line updates the tracks record
                const _updateRes = await smsModel.updateSmsTrackRecord(res.pool, newData);


                console.log("Adter updating rack record")
                // this one saves teh treack of delivery for each mobile number
                const _updateSmsDeliveryTableRes = await smsModel.saveSmsDeliveryStatus(
                    res.pool,
                    mobileDeliveryStutusArray
                );

                if (_updateRes.affectedRows >= 1) {
                    return res.status(200).json({
                        call: 1,
                        message: `SMS track record updated successfully`,
                    });
                }
            } else {
                // Log the error if the response is not OK
                console.error('Failed to fetch response. Status Code:', _res.status);
            }
        } catch (err) {
            console.log(`Error while updating the updating report record : ${err}`);
        }
    },

    //For GP
    getGramSandeshSevaView: async (req, res) => {
        try {
            let _gpDetails = await ZPModel.getZpDetails(res.pool);
            let gp = _gpDetails[0];
            // console.log('Gram sandesh view gp deatials : ', gp);
            res.render('user/sms/gramSandeshSevaView.pug', {
                gp,
            });
        } catch (err) {
            console.log('Error while showing gram sandesh view : ', err);
        }
    },

    // This is for __________
    sendGpSMS: async (req, res) => {
       
        /*
        try {
            let data = req.body;

            if (
                !data.sender_id?.trim()
            ) {
                data.sender_id = 'GPSEVA'; //if sender is nothing, we will use default sender Id here
            }

            data.sms = `सर्व test-6 कळविण्यात येते कि test test test. ग्रामपंचायत test-1 , धन्यवाद. MS`;

            var url = gsevaBaseUrl;
            var sendData = {
                senderid: data.sender_id.trim(), //sender
                dest_mobileno: data.mobile.trim(), //String
                msgtype: gpMessageType,
                message: data.sms.trim(), //Sms Stirng
                response: 'Y',
                apikey: gpApiKey,
            };

           
            var str = serialize(sendData);
            url += str;
            console.log('URL : ', url);
            request.get(
                {
                    url: url,
                },
                function (error, response, body) {
                    console.log('Error is this', error);
                    // console.log("response is this", response)
                    console.log('DATA body', body);
                    data = {
                        error: error,
                        response: response,
                        body: body,
                    };
                    res.send(data);
                    // callback(data);
                }
            );
        } catch (err) {
            console.log('Error ', err);
        }
            */



        try {
            let reqData = req.body;

            let [gp] = await HomeModel.getGpData(res.pool)

            let message = `ग्रा.प. सरपंच/उपसरपंच/सदस्य/सदस्या/कर्मचारी यांना कळविण्यात येते की मासिक सभा ${'sinnar'} सकाळी ${'12pm'} वाजता ,ग्रा.प.कार्यालय येथे आयोजित केली आहे. कृपया उपस्थित राहावे. ग्रा.प. ${gp?.gp_name} - GSEVA`

            // as per dlt template
            const templateId ="1707173554306068940";
            const templateName = 'Masik Sabha Notice';
            const headerId = '1705171030582718558'

            const gpMembers = JSON.parse(gp.gp_member);


            

            
            let smsData = {
                    sms: reqData.sms || message,
                    mobile: reqData.mobile, //separated the numbers by comman, and added 91 befoe numbers
                    template_id: reqData.template_id || templateId,
                    header_id: reqData.header_id || headerId,
                    template_name: reqData.template_name
                }

                
            return await sendNewRegistrationSMS(smsData, async (_data) => {
                const today = new Date();
                const dateTime =
                    ('0' + today.getDate()).slice(-2) +
                    '/' +
                    ('0' + (today.getMonth() + 1)).slice(-2) +
                    '/' +
                    today.getFullYear() +
                    '::IST::' +
                    ('0' + today.getHours()).slice(-2) +
                    ':' +
                    ('0' + today.getMinutes()).slice(-2) +
                    ':' +
                    ('0' + today.getSeconds()).slice(-2);

                const trackRecordData = {
                    campaining_name: `${templateName}_${dateTime}`,
                    response_data: _data.response.body,
                    message: smsData.sms,
                    template_id: smsData.template_id || templateId,
                    sender_id: 'GPSEVA',
                    mobile_numbers: smsData.mobile,
                    total_mobile_numbers_count: smsData.mobile.split(',').length || 0,
                    delivered_mobile_numbers_count: smsData.delivered_mobile_numbers_count || 0,
                    not_delivered_mobile_numbers_count:
                        smsData.not_delivered_mobile_numbers_count || 0,
                };

                const smsTrackRecordStatusResponse = await smsModel.saveSmsTrackRecord(
                    res.pool,
                    trackRecordData
                );
                setTimeout(async () => {
                    const getRecordData = await sendSmsController.fetchSMSMObileDeliverStatus(
                        _data.response.body
                    );

                    // console.log(getRecordData);

                    if (smsTrackRecordStatusResponse.affectedRows > 0) {
                        return res.status(200).json({
                            call: 1,
                            message: `SMS sent`,
                        });
                    }
                }, 10000); // 3000 milliseconds = 3 seconds
            });
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({
                call: 0,
                message: "Internal Server Error"
            })
        }
    },

    sendGpSMS1: async (data) => {
        try {
            console.log('SendData = ', data);
            if (
                data.sender_id === undefined ||
                data.sender_id === null ||
                data.sender_id.trim() === ''
            ) {
                data.sender_id = gpSenderId; //if sender is nothing, we will use default sender Id here
            }

            // console.log("in req.", data)

            var url = gpUrl;
            var sendData = {
                senderid: data.sender_id.trim(), //sender
                dest_mobileno: data.mobile.trim(), //String
                msgtype: gpMessageType,
                message: data.sms.trim(), //Sms Stirng
                response: 'Y',
                apikey: gpApiKey,
            };
            var str = serialize(sendData);
            url += str;
            console.log('URL : ', url);
            request.get(
                {
                    url: url,
                },
                function (error, response, body) {
                    // console.log('Error is this', error);
                    // // console.log("response is this", response)
                    // console.log('DATA body', body);
                    data = {
                        error: error,
                        response: response,
                        body: body,
                    };

                    // callback(data);
                }
            );
        } catch (err) {
            console.log('Error ', err);
        }
    },

    sendGpSmsToNagrik: async (req, res) => {
        try {
            let message = req.body.message;

            // console.log('Message = ', message)
            const mobileNumbersArrayOfNagrik = await smsModel.getDistinctMobileNumbersOfNagrik(
                res.pool
            );
            //Getting a string of numbers
            let _numbers = mobileNumbersArrayOfNagrik
                .filter((entry) => entry?.fMobile && entry.fMobile.length === 10)
                .map((entry) => entry.fMobile);
            const send_count = _numbers.length;

            const numbers = _numbers.join(',');

            // const numbers = '8421282798'

            console.log('MobileNumbers = ', numbers);

            // tmep numbers

            let sendData = {
                mobile: numbers,
                sms: message,
            };

            await smsController.sendGpSMS1(sendData);

            let trackData = {
                reciever_mobile: numbers,
                message: message,
                send_count,
            };
            return await smsController.saveGpSmsTrackRecord(req, res, trackData);
        } catch (err) {
            console.log('Error while sending sms to nagrik', err);
            return res.status(500).json({
                call: 0,
                error: err,
            });
        }
    },

    sendGpSmsToForm8Users: async (req, res) => {
        try {
            // console.log('Send form 8 users controller')
            let message = req.body.message;
            const mobileNumbersArrayOfForm8Users =
                await smsModel.getDistinctMobileNumbersOfForm8Users(res.pool);

            //Getting a string of numbers
            const _numbers = mobileNumbersArrayOfForm8Users
                .filter((entry) => entry?.feu_mobileNo && entry.feu_mobileNo.length === 10)
                .map((entry) => entry.feu_mobileNo);

            const send_count = _numbers.length;

            const numbers = _numbers.join(',');

            // console.log('form 8 mobile array = ', mobileNumbersArrayOfForm8Users)
            // console.log('form 8 mobile numbers = ', numbers)

            let sendData = {
                mobile: numbers,
                sms: message,
            };
            // smsController.sendGpSMS1(sendData)

            let trackData = {
                reciever_mobile: numbers,
                message: message,
                send_count,
            };
            return await smsController.saveGpSmsTrackRecord(req, res, trackData);
        } catch (err) {
            console.log('Error while sending sms to nagrik', err);
            return res.status(500).json({
                call: 0,
                error: err,
            });
        }
    },

    sendGpSmsToGpMembers: async (req, res) => {
        try {
            let message = req.body.message;
            // console.log('Message = ', message)
            const _gp = await ZPModel.getZpDetails(res.pool);
            const gpMembers = JSON.parse(_gp[0].gp_member);
            //Getting a string of numbers
            let _numbers = [
                ...new Set(
                    gpMembers
                        .filter(
                            (member) => member?.sadasyaMobile && member.sadasyaMobile.length === 10
                        )
                        .map((member) => member.sadasyaMobile)
                ),
            ];
            const send_count = _numbers.length;

            const numbers = _numbers.join(',');
            // console.log('MobileNumbers of sadaysa = ', numbers);
            // tmep numbers
            // numbers = `8421282798`
            let sendData = {
                mobile: numbers,
                sms: message,
            };
            // smsController.sendGpSMS1(sendData)

            let trackData = {
                reciever_mobile: numbers,
                message: message,
                send_count,
            };
            return await smsController.saveGpSmsTrackRecord(req, res, trackData);
        } catch (err) {
            console.log('Error while sending sms to nagrik', err);
            return res.status(500).json({
                call: 0,
                error: err,
            });
        }
    },

    getGpSmsRecordView: async (req, res) => {
        try {
            const _gp = await ZPModel.getZpDetails(res.pool);
            const _smsRecords = await smsModel.getGpSmsRecords(res.pool);

            return res.render('user/sms/gramSandeshRecordView.pug', {
                gp: _gp[0],
                smsRecords: _smsRecords,
            });
        } catch (err) {
            console.log(`Error while rendering the track record page : ${err.message}`);
        }
    },

    saveGpSmsTrackRecord: async (req, res, trackData) => {
        try {
            const _saveTrackRecordResponse = await smsModel.saveGpSmsTrackRecord(
                res.pool,
                trackData
            );

            // console.log('saving the record')
            // console.log(_saveTrackRecordResponse)

            if (_saveTrackRecordResponse.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: `Sms track record saved successfully`,
                });
            }
        } catch (err) {
            console.log(`Error while saving the track record : ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while save the record`,
            });
        }
    },

    // Nagrik mobile numbers return in array format

    fetchNagrikMobileNumbers: async (req, res) => {
        try {
            const mobileNumbersArrayOfNagrik = await smsModel.getDistinctMobileNumbersOfNagrik(
                res.pool
            );
            //Getting a string of numbers
            let _numbers = mobileNumbersArrayOfNagrik
                .filter((entry) => entry?.fMobile && entry.fMobile.length === 10)
                .map((entry) => entry.fMobile);

            return res.status(200).json({
                call: 1,
                numbers: _numbers || [],
            });
        } catch (err) {
            console.log(`Error while fetching the mobile numbers of gram sadasya`, err);
            return res.status(500).json({
                call: 0,
                message: `Error while fetching the numbers`,
                error: err,
            });
        }
    },

    // Form 8 users
    fetchForm8UsersMobileNumbers: async (req, res) => {
        try {
            const mobileNumbersArrayOfForm8Users =
                await smsModel.getDistinctMobileNumbersOfForm8Users(res.pool);

            //Getting a string of numbers
            const _numbers = mobileNumbersArrayOfForm8Users
                .filter((entry) => entry?.feu_mobileNo && entry.feu_mobileNo.length === 10)
                .map((entry) => entry.feu_mobileNo);

            return res.status(200).json({
                call: 1,
                numbers: _numbers || [],
            });
        } catch (err) {
            console.log(`Error while fetching the numbers : ${err}`);
            return res.status(500).json({
                call: 0,
                message: `Error while fetching the numbers`,
                error: err,
            });
        }
    },

    // Gp members
    fetchGpMembersMobileNumbers: async (req, res) => {
        try {
            const _gp = await ZPModel.getZpDetails(res.pool);
            const gpMembers = JSON.parse(_gp[0].gp_member);
            //Getting a string of numbers
            let _numbers = [
                ...new Set(
                    gpMembers
                        .filter(
                            (member) => member?.sadasyaMobile && member.sadasyaMobile.length === 10
                        )
                        .map((member) => member.sadasyaMobile)
                ),
            ];

            return res.status(200).json({
                call: 1,
                numbers: _numbers || [],
            });
        } catch (err) {
            console.log(`Error while fetching the mobile numbers of gram sadasya`, err);
            return res.status(500).json({
                call: 0,
                message: `Error while fetching the numbers`,
                error: err,
            });
        }
    },

    sendMasikSabhaNoticeSms: asyncHandler(async (req, res) => {
        let masikNoticeInfo = req.body;

        let [gp] = await HomeModel.getGpData(res.pool)

        let message = `ग्रा.प. सरपंच/उपसरपंच/सदस्य/सदस्या/कर्मचारी यांना कळविण्यात येते की मासिक सभा ${masikNoticeInfo.notice_place} सकाळी ${masikNoticeInfo.notice_time} वाजता ,ग्रा.प.कार्यालय येथे आयोजित केली आहे. कृपया उपस्थित राहावे. ग्रा.प. ${gp?.gp_name} - GSEVA`

        // as per dlt template
        const templateId ="1707173554306068940";
        const templateName = 'Masik Sabha Notice';
        const headerId = '1705171030582718558'

        const gpMembers = JSON.parse(gp.gp_member);


        let _numbers = [
                ...new Set(
                    gpMembers
                        .filter(
                            (member) => member?.sadasyaMobile && member.sadasyaMobile.length === 10
                        )
                        .map((member) => `91${member.sadasyaMobile}`)
                ),
            ].join(',');

        
        let smsData = {
                sms: message,
                mobile: _numbers, //separated the numbers by comman, and added 91 befoe numbers
                template_id: templateId,
                header_id: headerId
            }

            
        return await sendNewRegistrationSMS(smsData, async (_data) => {
            const today = new Date();
            const dateTime =
                ('0' + today.getDate()).slice(-2) +
                '/' +
                ('0' + (today.getMonth() + 1)).slice(-2) +
                '/' +
                today.getFullYear() +
                '::IST::' +
                ('0' + today.getHours()).slice(-2) +
                ':' +
                ('0' + today.getMinutes()).slice(-2) +
                ':' +
                ('0' + today.getSeconds()).slice(-2);

            const trackRecordData = {
                campaining_name: `${templateName}_${dateTime}`,
                response_data: _data.response.body,
                message: smsData.sms,
                template_id: templateId,
                sender_id: 'GPSEVA',
                mobile_numbers: smsData.mobile,
                total_mobile_numbers_count: smsData.mobile.split(',').length || 0,
                delivered_mobile_numbers_count: smsData.delivered_mobile_numbers_count || 0,
                not_delivered_mobile_numbers_count:
                    smsData.not_delivered_mobile_numbers_count || 0,
            };

            const smsTrackRecordStatusResponse = await smsModel.saveSmsTrackRecord(
                res.pool,
                trackRecordData
            );
            setTimeout(async () => {
                const getRecordData = await sendSmsController.fetchSMSMObileDeliverStatus(
                    _data.response.body
                );

                // console.log(getRecordData);

                if (smsTrackRecordStatusResponse.affectedRows > 0) {
                    return res.status(200).json({
                        call: 1,
                        message: `SMS sent`,
                    });
                }
            }, 10000); // 3000 milliseconds = 3 seconds
        });
    }),
};

function serialize(obj) {
    let str =
        '?' +
        Object.keys(obj)
            .reduce(function (a, k) {
                a.push(k + '=' + encodeURIComponent(obj[k]));
                return a;
            }, [])
            .join('&');
    return str;
}

module.exports = smsController;
