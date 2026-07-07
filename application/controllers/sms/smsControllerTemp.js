const HomeModel = require('../../model/HomeModel');
const ZPModel = require('../../model/ZPModel');
const smsModel = require('../../model/sms/smsModel');
const { sendApiResponse } = require('../../utils/apiResponses');
const asyncHandler = require('../../utils/asyncHandler');
const smsService = require('../../services/sms/smsService');
var request = require('request');

const smsDeliveredResponsePatternRegex = /^\d{7}-(\d{4})_(\d{2})_(\d{2})$/;


let apiKey = '36915C24E7BDC2'

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

const gsevaBaseUrl = process.env?.PROJECT_ENV == 'DEV' ? 'https://g-seva.com/sms' :`http://localhost:3000/sms`;

const smsController = {
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
            const response = await fetch(`${gsevaBaseUrl}/templates`);
            const { data: _templates } = await response.json();

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

    sendSmsToRegisteredNumbers: async (req, res) => {
        try {
            let data = req.body;
            const templateId = data.template_id;
            const templateName = data.template_name;

            const smsRes = await smsService.sendSms({
                senderId: data.sender_id,
                sms: data.sms,
                mobile: data.mobile,
                templateId: templateId,
                entityId: data.entity_id
            });

            if (!smsRes.success) {
                throw new Error(smsRes.error || 'Failed to send SMS');
            }

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
                response_data: smsRes.scheduleId,
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
                try {
                    await smsService.getDlr(smsRes.scheduleId);
                } catch (e) {
                    console.error('Error in deferred getDlr check:', e);
                }
            }, 10000);

            if (smsTrackRecordStatusResponse.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: `Message sent successfully to candidates`,
                });
            }
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
            const _deliveryReport = await smsModel.deliveryReport(res.pool, { scheduleId });
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
            
            const dlrRes = await smsService.getDlr(data.schedule_id);
            if (!dlrRes.success) {
                throw new Error(dlrRes.error || 'Failed to fetch DLR');
            }

            if (dlrRes.pending) {
                return res.status(202).json({ call: 2, message: `Request is pending` });
            }

            const cleanScheduleId = data.schedule_id.includes('/') ? data.schedule_id.split('/')[1] : data.schedule_id;

            const mobileDeliveryStatusArray = dlrRes.details.map(detail => {
                return [
                    cleanScheduleId,
                    JSON.stringify(detail.raw),
                    detail.mobile,
                    detail.status
                ];
            });

            const newData = {
                ...data,
                mobile_delivery_response: dlrRes.rawResponse,
                delivered_mobile_numbers_count: dlrRes.deliveredCount,
                not_delivered_mobile_numbers_count: dlrRes.undeliveredCount,
            };

            const _updateRes = await smsModel.updateSmsTrackRecord(res.pool, newData);
            const _updateSmsDeliveryTableRes = await smsModel.saveSmsDeliveryStatus(
                res.pool,
                mobileDeliveryStatusArray
            );

            if (_updateRes.affectedRows >= 1) {
                return res.status(200).json({
                    call: 1,
                    message: `SMS track record updated successfully`,
                });
            }
        } catch (err) {
            console.error(`Error while updating the SMS track record: ${err.message}`);
            return res.status(500).json({
                call: 0,
                message: `Error while updating the SMS track record`,
                error: err.message
            });
        }
    },

    getGramSandeshSevaView: async (req, res) => {
        try {
            let _gpDetails = await ZPModel.getZpDetails(res.pool);
            let gp = _gpDetails[0];
            res.render('user/sms/gramSandeshSevaView.pug', {
                gp,
            });
        } catch (err) {
            console.log('Error while showing gram sandesh view : ', err);
        }
    },

    sendGpSMS: async (req, res) => {
        try {
            let reqData = req.body;
            let [gp] = await HomeModel.getGpData(res.pool)

            let message = `ग्रा.प. सरपंच/उपसरपंच/सदस्य/सदस्या/कर्मचारी यांना कळविण्यात येते की मासिक सभा ${'sinnar'} सकाळी ${'12pm'} वाजता ,ग्रा.प.कार्यालय येथे आयोजित केली आहे. कृपया उपस्थित राहावे. ग्रा.प. ${gp?.gp_name} - GSEVA`

            const templateId ="1707173554306068940";
            const templateName = 'Masik Sabha Notice';
            const headerId = '1705171030582718558'

            let smsData = {
                sms: reqData.sms || message,
                mobile: reqData.mobile,
                template_id: reqData.template_id || templateId,
                header_id: reqData.header_id || headerId,
                template_name: reqData.template_name
            }

            const smsRes = await smsService.sendSms({
                senderId: 'GPSEVA',
                sms: smsData.sms,
                mobile: smsData.mobile,
                templateId: smsData.template_id,
                headerId: smsData.header_id
            });

            if (!smsRes.success) {
                throw new Error(smsRes.error || 'Failed to send SMS');
            }

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
                response_data: smsRes.scheduleId,
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
                try {
                    await smsService.getDlr(smsRes.scheduleId);
                } catch (e) {
                    console.error('Error in deferred getDlr check:', e);
                }
            }, 10000);

            if (smsTrackRecordStatusResponse.affectedRows > 0) {
                return res.status(200).json({
                    call: 1,
                    message: `SMS sent`,
                });
            }
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
            const senderId = data.sender_id?.trim() || 'GPSEVA';
            
            const smsRes = await smsService.sendSms({
                senderId: senderId,
                sms: data.sms,
                mobile: data.mobile,
                templateId: data.template_id,
                headerId: data.header_id
            });

            return smsRes;
        } catch (err) {
            console.log('Error in sendGpSMS1', err);
        }
    },

    sendGpSmsToNagrik: async (req, res) => {
        try {
            let message = req.body.message;
            const mobileNumbersArrayOfNagrik = await smsModel.getDistinctMobileNumbersOfNagrik(
                res.pool
            );
            let _numbers = mobileNumbersArrayOfNagrik
                .filter((entry) => entry?.fMobile && entry.fMobile.length === 10)
                .map((entry) => entry.fMobile);
            const send_count = _numbers.length;
            const numbers = _numbers.join(',');

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
            let message = req.body.message;
            const mobileNumbersArrayOfForm8Users =
                await smsModel.getDistinctMobileNumbersOfForm8Users(res.pool);

            const _numbers = mobileNumbersArrayOfForm8Users
                .filter((entry) => entry?.feu_mobileNo && entry.feu_mobileNo.length === 10)
                .map((entry) => entry.feu_mobileNo);

            const send_count = _numbers.length;
            const numbers = _numbers.join(',');

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

    sendGpSmsToGpMembers: async (req, res) => {
        try {
            let message = req.body.message;
            const _gp = await ZPModel.getZpDetails(res.pool);
            const gpMembers = JSON.parse(_gp[0].gp_member);
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

    fetchNagrikMobileNumbers: async (req, res) => {
        try {
            const mobileNumbersArrayOfNagrik = await smsModel.getDistinctMobileNumbersOfNagrik(
                res.pool
            );
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

    fetchForm8UsersMobileNumbers: async (req, res) => {
        try {
            const mobileNumbersArrayOfForm8Users =
                await smsModel.getDistinctMobileNumbersOfForm8Users(res.pool);

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

    fetchGpMembersMobileNumbers: async (req, res) => {
        try {
            const _gp = await ZPModel.getZpDetails(res.pool);
            const gpMembers = JSON.parse(_gp[0].gp_member);
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
            mobile: _numbers,
            template_id: templateId,
            header_id: headerId
        }

        const smsRes = await smsService.sendSms({
            senderId: 'GPSEVA',
            sms: smsData.sms,
            mobile: smsData.mobile,
            templateId: smsData.template_id,
            headerId: smsData.header_id
        });

        if (!smsRes.success) {
            throw new Error(smsRes.error || 'Failed to send SMS');
        }

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
            response_data: smsRes.scheduleId,
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
            try {
                await smsService.getDlr(smsRes.scheduleId);
            } catch (e) {
                console.error('Error in deferred getDlr check:', e);
            }
        }, 10000);

        if (smsTrackRecordStatusResponse.affectedRows > 0) {
            return res.status(200).json({
                call: 1,
                message: `SMS sent`,
            });
        }
    }),
};

module.exports = smsController;
