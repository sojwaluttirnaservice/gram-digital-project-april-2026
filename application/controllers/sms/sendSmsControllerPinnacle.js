var request = require('request');

module.exports = {
    sendNewRegistrationSMS: async function (data, callback) {
    
        // pinnacle
        let url = `http://www.smsjust.com/sms/user/urlsms.php`;

        var sendData = {
            username: 'mudracomputer',
            pass: '!K9xM@0a',
            senderid: data.sender_id?.trim() || 'GPSEVA', //sender
            message: data.sms.trim(), //Sms Stirng
            dest_mobileno: data.mobile.trim(), //String
            msgtype: 'UNI',
            response: 'Y',
            dlttempid: data.template_id,
            dltheaderid: data.header_id,
        };
        var str = serialize(sendData);
        url = `${url}${str}`;

        request.get(
            {
                url: url,
            },
            function (error, response, body) {
                data = {
                    error: error,
                    response: response,
                    body: body,
                };
                callback(data);
            }
        );
    },

    fetchSMSMObileDeliverStatus: async (scheduleId) => {
        const url = `https://www.smsjust.com/sms/user/response.php?Scheduleid=${scheduleId}`;

        try {
            const deliveryStatusRes = await fetch(url);
            const contentType = deliveryStatusRes.headers.get('content-type');
            let deliveryStatusResData;
            if (contentType && contentType.includes('application/json')) {
                deliveryStatusResData = await deliveryStatusRes.json();
            } else {
                // Handle the case where the response is plain text
                deliveryStatusResData = await deliveryStatusRes.text();
            }

            console.log('Response data:', deliveryStatusResData);
        } catch (err) {
            console.log(`Error while fetching the sms deliver status to mobile: ${err.message}`);
        }
    },
};

function serialize(obj) {
    const queryString = Object.keys(obj)
        .map((key) => {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(obj[key]);
            return `${encodedKey}=${encodedValue}`;
        })
        .join('&');

    return `?${queryString}`;
}
