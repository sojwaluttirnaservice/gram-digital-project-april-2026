const sendBirthdayMessagesModel = {
	//working remaining -sojwal
	getRequiredBirthdayOfNagrik: function (pool, month, day) {
		return new Promise((resolve, reject) => {
			let query = ` SELECT * 
            FROM ps_gp_member_list`

			console.log(34343343)
			pool.query(query, [month, day], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	enterFakeSmsData: function (pool) {
		function generateRandomMobileNumber() {
			const getRandomDigitInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		
			const randomMobileNumber = Array.from({ length: 10 }, () => getRandomDigitInRange(4, 9)).join('');
		
			return randomMobileNumber;
		}
		
		// Example usage:

		let mobileNumbers = []
		for(let i =0; i < 17; i++){
			const randomMobileNumber = generateRandomMobileNumber();
			mobileNumbers.push(`${randomMobileNumber}`)
		}

		// console.log(mobileNumbers)
		
		// return;
	
		const getRandomMessage = () => {
			const messages = [
				'ग्रामपंचायत दाभा अंतर्गत दाभा येथील सर्वत्र महिला नागरिकांना सूचित करण्यात येते कि, ग्रामपंचायत दाभा खालील प्रमाणे विषयास अनुसरून महिला सभा दिनांक 10/01/2023 रोजी दुपारी 11 वाजता, asd येथे घेण्यात येणार आहे, तेरी सर्वत्र महिला भगिनींनी महिला सभेला हजार राहावे, ही विनंती.',
				'कळविण्यात येते कि ग्रामपंचायतीची सर्व साधारण ग्रामसभा सभा दिनांक 31/03/2024 रोजी रविवार दुपारी ठीक 12:00 PM वाजता ठिकाणी येथे होईल.',
				'ग्रामपंचायत दाभा अंतर्गत दाभा येथील सर्वत्र महिला नागरिकांना सूचित करण्यात येते कि, ग्रामपंचायत दाभा खालील प्रमाणे विषयास अनुसरून महिला सभा दिनांक 10/01/2023 रोजी दुपारी 11 वाजता, asd येथे घेण्यात येणार आहे, तेरी सर्वत्र महिला भगिनींनी महिला सभेला हजार राहावे, ही विनंती.',
				'कळविण्यात येते कि ग्रामपंचायतीची सर्व साधारण ग्रामसभा सभा दिनांक 31/03/2024 रोजी रविवार दुपारी ठीक 12:00 PM वाजता ठिकाणी येथे होईल.',
				'ग्रामपंचायत दाभा अंतर्गत दाभा येथील सर्वत्र महिला नागरिकांना सूचित करण्यात येते कि, ग्रामपंचायत दाभा खालील प्रमाणे विषयास अनुसरून महिला सभा दिनांक 10/01/2023 रोजी दुपारी 11 वाजता, asd येथे घेण्यात येणार आहे, तेरी सर्वत्र महिला भगिनींनी महिला सभेला हजार राहावे, ही विनंती.',
				'कळविण्यात येते कि ग्रामपंचायतीची सर्व साधारण ग्रामसभा सभा दिनांक 31/03/2024 रोजी रविवार दुपारी ठीक 12:00 PM वाजता ठिकाणी येथे होईल.',
				'ग्रामपंचायत दाभा अंतर्गत दाभा येथील सर्वत्र महिला नागरिकांना सूचित करण्यात येते कि, ग्रामपंचायत दाभा खालील प्रमाणे विषयास अनुसरून महिला सभा दिनांक 10/01/2023 रोजी दुपारी 11 वाजता, asd येथे घेण्यात येणार आहे, तेरी सर्वत्र महिला भगिनींनी महिला सभेला हजार राहावे, ही विनंती.',
				'कळविण्यात येते कि ग्रामपंचायतीची सर्व साधारण ग्रामसभा सभा दिनांक 31/03/2024 रोजी रविवार दुपारी ठीक 12:00 PM वाजता ठिकाणी येथे होईल.',
				'ग्रामपंचायत दाभा अंतर्गत दाभा येथील सर्वत्र महिला नागरिकांना सूचित करण्यात येते कि, ग्रामपंचायत दाभा खालील प्रमाणे विषयास अनुसरून महिला सभा दिनांक 10/01/2023 रोजी दुपारी 11 वाजता, asd येथे घेण्यात येणार आहे, तेरी सर्वत्र महिला भगिनींनी महिला सभेला हजार राहावे, ही विनंती.',
				'कळविण्यात येते कि ग्रामपंचायतीची सर्व साधारण ग्रामसभा सभा दिनांक 31/03/2024 रोजी रविवार दुपारी ठीक 12:00 PM वाजता ठिकाणी येथे होईल.',
				'ग्रामपंचायत दाभा अंतर्गत दाभा येथील सर्वत्र महिला नागरिकांना सूचित करण्यात येते कि, ग्रामपंचायत दाभा खालील प्रमाणे विषयास अनुसरून महिला सभा दिनांक 10/01/2023 रोजी दुपारी 11 वाजता, asd येथे घेण्यात येणार आहे, तेरी सर्वत्र महिला भगिनींनी महिला सभेला हजार राहावे, ही विनंती.',
				'कळविण्यात येते कि ग्रामपंचायतीची सर्व साधारण ग्रामसभा सभा दिनांक 31/03/2024 रोजी रविवार दुपारी ठीक 12:00 PM वाजता ठिकाणी येथे होईल.',
				'ग्रामपंचायत दाभा अंतर्गत दाभा येथील सर्वत्र महिला नागरिकांना सूचित करण्यात येते कि, ग्रामपंचायत दाभा खालील प्रमाणे विषयास अनुसरून महिला सभा दिनांक 10/01/2023 रोजी दुपारी 11 वाजता, asd येथे घेण्यात येणार आहे, तेरी सर्वत्र महिला भगिनींनी महिला सभेला हजार राहावे, ही विनंती.',
				'कळविण्यात येते कि ग्रामपंचायतीची सर्व साधारण ग्रामसभा सभा दिनांक 31/03/2024 रोजी रविवार दुपारी ठीक 12:00 PM वाजता ठिकाणी येथे होईल.',
			];
	
			return messages[Math.floor(Math.random() * messages.length)];
		};
	
		return new Promise((resolve, reject) => {
			// Check if there are zero entries in the table
			pool.query('SELECT COUNT(*) AS count FROM ps_gp_sms_track', (countErr, countResult) => {
				if (countErr) {
					reject(countErr);
					return;
				}
		
				const entryCount = countResult[0].count;
		
				if (entryCount === 0) {
					let query = `
						INSERT INTO ps_gp_sms_track
						(reciever_mobile, message, success)
						VALUES (?, ?, ?)`;
		
					const promises = mobileNumbers.map((mobile) => {
						const randomMessage = getRandomMessage();
						return new Promise((resolve, reject) => {
							pool.query(query, [JSON.stringify(mobileNumbers), randomMessage, 1], (err, result) => {
								err ? reject(err) : resolve(result);
							});
						});
					});
		
					Promise.all(promises)
						.then((results) => resolve(results))
						.catch((error) => reject(error));
						console.log(" Enterid done")
				} else {
					// Resolve with a message indicating there are existing entries
					resolve("Entries already exist in the table.");
				}
			});
		});
		
	},
	
}

module.exports = sendBirthdayMessagesModel
