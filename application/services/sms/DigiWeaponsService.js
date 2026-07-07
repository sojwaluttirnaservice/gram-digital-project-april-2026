const apiKey = '36915C24E7BDC2';

class DigiWeaponsService {
    async sendSms({ senderId, sms, mobile, templateId, entityId }) {
        try {
            const url = new URL('https://sms.digiweapons.in/app/smsapi/index.php');
            const params = {
                key: apiKey,
                senderid: senderId?.trim() || 'GPSEVA',
                msg: sms.trim(),
                contacts: mobile.trim(),
                type: 'UNI',
                response: 'Y',
                template_id: templateId,
                routeid: '9',
                pe_id: entityId || ''
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`DigiWeapons API send failed with status ${response.status}`);
            }
            const body = await response.text();
            
            return {
                success: true,
                scheduleId: body,
                rawResponse: body
            };
        } catch (error) {
            console.error('DigiWeapons sendSms error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getDlr(scheduleId) {
        try {
            const cleanScheduleId = scheduleId.includes('/') ? scheduleId.split('/')[1] : scheduleId;
            const url = `https://sms.digiweapons.in/app/miscapi/${apiKey}/getDLR/${cleanScheduleId}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`DigiWeapons DLR fetch failed with status ${response.status}`);
            }

            const data = await response.json();
            let deliveredCount = 0;
            let undeliveredCount = 0;
            const details = [];

            if (Array.isArray(data)) {
                data.forEach(item => {
                    const status = item.DLR;
                    if (status === 'Delivered') {
                        deliveredCount++;
                    } else {
                        undeliveredCount++;
                    }
                    details.push({
                        mobile: item.MSISDN,
                        status: status,
                        raw: item
                    });
                });
            }

            return {
                success: true,
                deliveredCount,
                undeliveredCount,
                details,
                rawResponse: data
            };
        } catch (error) {
            console.error('DigiWeapons getDlr error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = DigiWeaponsService;
