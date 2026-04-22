var request = require('request');

let apiKey = '36915C24E7BDC2'
module.exports = {
    sendNewRegistrationSMS: async function (data, callback) {

    
        let url = `https://sms.digiweapons.in/app/smsapi/index.php`;
        // let url = `http://www.smsjust.com/sms/user/urlsms.php`

        var sendData = {
            // username: "Sojwal",
            // pass: '123456',
            key: apiKey,
            senderid: data.sender_id?.trim() || 'GPSEVA', //sender
            msg: data.sms.trim(), //Sms Stirng
            contacts: data.mobile.trim(), //String
            type: 'UNI',
            response: 'Y',
            // dlttempid: data.template_id,
            template_id: data.template_id,
            // dltheaderid: data.header_id,
            routeid: 9,
            pe_id: data.entity_id
        };

        console.log("PEID", data.header_id)
        var str = serialize(sendData);
        url = `${url}${str}`;

        request.get(
            {
                url: url,
            },
            function (error, response, body) {
                // console.log(error)
                // console.log(response)
                console.log(body);
                data = {
                    error: error,
                    response: response,
                    body: body,
                };
                // console.log("DAta---------")
                // console.log(data)
                // console.log("DAta-------")
                callback(data);
            }
        );
    },

    fetchSMSMObileDeliverStatus: async (scheduleId) => {
        // const url = `https://www.smsjust.com/sms/user/response.php?Scheduleid=${scheduleId}`;
        const url = `https://sms.digiweapons.in/app/miscapi/${apiKey}/getDLR/${scheduleId}`

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
