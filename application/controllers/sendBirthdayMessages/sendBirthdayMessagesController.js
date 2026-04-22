const connection = require('express-myconnection')
const { mysql, dbOptions } = require('../../config/db.connect')
const sendBirthdayMessagesModel = require('../../model/sendBirthdayMessages/sendBirthdayMessagesModel')

//working remaining -sojwal
const sendBirthdayMessageController = {
	// Simulate an asynchronous function for sending SMS
	sendBirthdaySmsToNagrik: async function () {
		try {
			const pool = mysql.createConnection(dbOptions)

			pool.connect()

			console.log(pool)
			const currentDate = new Date()
			// const year = currentDate.getFullYear()
			const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
			const day = currentDate.getDate().toString().padStart(2, '0')

			// let date = `${year}-${month}-${day}`

			let data = await sendBirthdayMessagesModel.getRequiredBirthdayOfNagrik(
				pool,
				month,
				day
			)
			console.log('Result of birthdya = ', data)

			return true
		} catch (err) {
			console.log('Error while sending sms', err)
			return false
		}
	},

	enterFakeSmsData: async function (){
		try {
			const pool = mysql.createConnection(dbOptions)

			pool.connect();

		  sendBirthdayMessagesModel.enterFakeSmsData(pool)
			return true
		} catch (err) {
			console.log('Error while sending sms', err)
			return false
		}
	}
}

module.exports = sendBirthdayMessageController
