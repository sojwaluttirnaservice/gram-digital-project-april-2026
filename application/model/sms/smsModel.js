// const gpSmsTable = 'sms_track_record';

const { runQuery } = require("../../utils/runQuery");

const smsModel = {
    existingTemplate: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sms_templates WHERE template_id =? AND header_id = ?`;
            pool.query(query, [data.template_id, data.header_id], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    },

    getMessageInfo: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT *,
                                DATE_FORMAT(createdAt, "%d-%m-%Y_%H:%i:%s") _createdAt,
                                DATE_FORMAT(updatedAt, "%d-%m-%Y_%H:%i:%s") _updatedAt 
                            FROM sms_track_record 
                                WHERE response_data LIKE ?`;
            pool.query(query, [`%${data.scheduleId}%`], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    },

    newSmsTemplateSubmit: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `
            INSERT INTO sms_templates 
            (
				sender_id, 
				template_id,
				header_id,
				template_name,
				template_string) 
            VALUES (?, ?, ?, ?, ?)
        `;

            pool.query(
                query,
                [
                    data.sender_id,
                    data.template_id,
                    data.header_id,
                    data.template_name,
                    data.template_string,
                ],
                (err, result) => {
                    return err ? reject(err) : resolve(result);
                }
            );
        });
    },

    deliveryReport: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT *,
                            DATE_FORMAT(createdAt, "%d-%m-%Y_%H:%i:%s") _createdAt,
                            DATE_FORMAT(updatedAt, "%d-%m-%Y_%H:%i:%s") _updatedAt 
                        FROM sms_delivery_status  WHERE delivery_id = ?`;

            pool.query(q, [data.scheduleId], (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // saveSmsDeliveryStatus: (pool, data) => {
    //     console.log(data);
    //     return new Promise((resolve, reject) => {
    //         const q = `INSERT INTO sms_delivery_status
    //                 (
    //                     delivery_id,
    //                     original_response,
    //                     mobile_number,
    //                     sms_delivery_status

    //                 ) VALUES ?`;

    //         const q2 = `

    //             INSERT INTO sms_delivery_status
    //         (
    //             delivery_id,
    //             original_response,
    //             mobile_number,
    //             sms_delivery_status
    //         ) VALUES ?
    //         ON DUPLICATE KEY UPDATE
    //             original_response = VALUES(original_response),
    //             sms_delivery_status = VALUES(sms_delivery_status)
    //         `

    //         pool.query(q2, [data], (err, result) => {
    //             err ? reject(err) : resolve(result);
    //         });
    //     });
    // },

    saveSmsDeliveryStatus: async (pool, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                for (const entry of data) {
                    // for digiweapons, consider ti as shoot id
                    const [delivery_id, original_response, mobile_number, sms_delivery_status] =
                        entry;

                    // Query to check if the row exists
                    const selectQuery = `SELECT COUNT(*) AS count FROM sms_delivery_status WHERE delivery_id = ? AND mobile_number = ?`;

                    const [existing] = await new Promise((resolve, reject) => {
                        pool.query(selectQuery, [delivery_id, mobile_number], (err, result) => {
                            err ? reject(err) : resolve(result);
                        });
                    });

                    if (existing.count > 0) {
                        // Row exists, perform an update
                        console.log("perfromign udpation")
                        const updateQuery = `
                            UPDATE sms_delivery_status 
                            SET original_response = ?, sms_delivery_status = ? 
                            WHERE delivery_id = ? AND mobile_number = ?`;

                        await new Promise((resolve, reject) => {
                            pool.query(
                                updateQuery,
                                [
                                    JSON.stringify(original_response),
                                    sms_delivery_status,
                                    delivery_id,
                                    mobile_number,
                                ],
                                (err, result) => {
                                    err ? reject(err) : resolve(result);
                                }
                            );
                        });
                    } else {
                        // Row does not exist, perform an insert
                        console.log("performing insertion")
                        const insertQuery = `
                            INSERT INTO sms_delivery_status (delivery_id, original_response, mobile_number, sms_delivery_status)
                            VALUES (?, ?, ?, ?)`;

                        await new Promise((resolve, reject) => {
                            pool.query(
                                insertQuery,
                                [
                                    delivery_id,
                                    JSON.stringify(original_response),
                                    mobile_number,
                                    sms_delivery_status,
                                ],
                                (err, result) => {
                                    err ? reject(err) : resolve(result);
                                }
                            );
                        });
                    }
                }

                resolve({ message: 'Operation completed successfully' });
            } catch (err) {
                reject(err);
            }
        });
    },

    getSenderList: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT DISTINCT(sender_id) FROM sms_templates`;
            pool.query(query, function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getAllSmsTemplates: (pool) => {
        // console.log(senderId, 'in model');
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sms_templates`;
            pool.query(query, function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getSmsTemplates: (pool, senderId) => {
        // console.log(senderId, 'in model');
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM sms_templates WHERE sender_id= ?`;
            pool.query(query, senderId, function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // saveSms track record

    saveSmsTrackRecord: (pool, trackRecordData) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO 
                            sms_track_record 
                            
                            (
                                campaining_name,
                                response_data,
                                message,
                                template_id,
                                sender_id,
                                mobile_numbers,
                                total_mobile_numbers_count,
                                delivered_mobile_numbers_count,
                                not_delivered_mobile_numbers_count
                            ) 
                    VALUES
                     (?)
                    `;


            // console.log('---------------+++++++++++++-------------')
            // console.log(trackRecordData)
            // console.log('---------------++++++++++++++-------------')

            const insertArray = [
                trackRecordData.campaining_name,
                trackRecordData.response_data,
                trackRecordData.message,
                trackRecordData.template_id,
                trackRecordData.sender_id,
                trackRecordData.mobile_numbers,
                trackRecordData.total_mobile_numbers_count,
                trackRecordData.delivered_mobile_numbers_count || 0,
                trackRecordData.not_delivered_mobile_numbers_count || 0,
            ];

            return runQuery(pool, query, [insertArray])
        });
    },

    updateSmsTrackRecord: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `UPDATE sms_track_record

                        SET

                            mobile_delivery_response = ?,
                            delivered_mobile_numbers_count = ?,
                            not_delivered_mobile_numbers_count = ?,

                            updatedAt = NOW()

                        WHERE

                            response_data = ? AND
                            id = ?`;

            // console.log(data)

            const updateArray = [
                // first three
                JSON.stringify(data.mobile_delivery_response),
                data.delivered_mobile_numbers_count,
                data.not_delivered_mobile_numbers_count,

                // Next 2
                data.schedule_id,
                data.id,
            ];

            pool.query(q, updateArray, function (err, result) {
                err ? reject(err) : resolve(result);
            });
        });
    },

    //Gp related code belwo

    getDistinctMobileNumbersOfNagrik: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT DISTINCT fMobile FROM ps_gp_member_list`;
            pool.query(query, [], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    },

    getDistinctMobileNumbersOfForm8Users: (pool) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT DISTINCT feu_mobileNo FROM ps_form_eight_user`;
            pool.query(query, [], (err, result) => {
                return err ? reject(err) : resolve(result);
            });
        });
    },

    saveGpSmsTrackRecord: (pool, data) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO 
								sms_track_record
							(
								message,
								reciever_mobile,
								send_count,
								success
							)
							VALUES
							(?, ?, ?, ?);`;

            const insertArray = [data.message, data.reciever_mobile, data.send_count, 1];

            pool.query(query, insertArray, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    getGpSmsRecords: (pool, data) => {
        return new Promise((resolve, reject) => {
            const q = `SELECT 
							*,
                            DATE_FORMAT(createdAt, "%d-%m-%Y_%H:%i:%s") _createdAt,
                            DATE_FORMAT(updatedAt, "%d-%m-%Y_%H:%i:%s") _updatedAt
						FROM 
                            sms_track_record
                        ORDER BY createdAt 
							DESC;`;

            pool.query(q, (err, result) => {
                err ? reject(err) : resolve(result);
            });
        });
    },

    // ABOUT SAVING TEH SMS DELIVERY STATUS TO THE numbers

    saveSMSDeliveryStatus: (pool, data) => {
        // console.log(data);
    },
};

module.exports = smsModel;
