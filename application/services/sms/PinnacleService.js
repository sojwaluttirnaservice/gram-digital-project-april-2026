class PinnacleService {
    async sendSms({ senderId, sms, mobile, templateId, headerId }) {
        try {
            const url = new URL('http://www.smsjust.com/sms/user/urlsms.php');
            const params = {
                username: 'mudracomputer',
                pass: '!K9xM@0a',
                senderid: senderId?.trim() || 'GPSEVA',
                message: sms.trim(),
                dest_mobileno: mobile.trim(),
                msgtype: 'UNI',
                response: 'Y',
                dlttempid: templateId,
                dltheaderid: headerId || ''
            };
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`Pinnacle API send failed with status ${response.status}`);
            }
            const body = await response.text();

            return {
                success: true,
                scheduleId: body,
                rawResponse: body
            };
        } catch (error) {
            console.error('Pinnacle sendSms error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getDlr(scheduleId) {
        try {
            const url = `https://www.smsjust.com/sms/user/response.php?Scheduleid=${scheduleId}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Pinnacle DLR fetch failed with status ${response.status}`);
            }
            const text = await response.text();

            if (text === 'PENDING') {
                return {
                    success: true,
                    pending: true,
                    deliveredCount: 0,
                    undeliveredCount: 0,
                    details: [],
                    rawResponse: text
                };
            }

            const separatedArray = text.split('<br>');
            const filteredArray = separatedArray.filter((item) => item.trim() !== '');

            let deliveredCount = 0;
            let undeliveredCount = 0;
            const details = [];

            filteredArray.forEach(entry => {
                const [mobileNumber, deliveryStatus] = entry.split(/\s+/);
                if (deliveryStatus === 'DELIVRD') {
                    deliveredCount++;
                } else {
                    undeliveredCount++;
                }
                details.push({
                    mobile: mobileNumber,
                    status: deliveryStatus,
                    raw: entry
                });
            });

            return {
                success: true,
                deliveredCount,
                undeliveredCount,
                details,
                rawResponse: text
            };
        } catch (error) {
            console.error('Pinnacle getDlr error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = PinnacleService;
