const db = require("../config/db.connect.promisify")
const { runQuery } = require("../utils/runQuery")

module.exports = {
	masterLogin: function (pool, userName, password) {
		return new Promise((resolve, reject) => {
			let query = `SELECT 
                    * 
                  FROM 
                    ps_gram_panchayet
                  WHERE 
                    masterUserName = ? 
                  AND
                    masterPassword = ?`
			pool.query(query, [userName, password], function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getADKValues: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM ps_arogya_diva_kar`

			pool.query(query, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
	updateADK: function (pool, adk, id) {
		console.log(adk, 'updateADK')
		return new Promise((resolve, reject) => {
			let query = `UPDATE
							ps_arogya_diva_kar 
						SET 
							adk_arogya = ?, 
							adk_diva = ?,
							cleaning_tax = ?,
							education_tax = ?,
							tree_tax = ?,
							firebligate_tax = ?
						WHERE 
							id=?`
			pool.query(
				query,
				[
					adk.adkArogya,
					adk.adkDiva,
					adk.cleaningTax,
					adk.educationTax,
					adk.treeTax,
					adk.fireblegateTax,
					Number(id),
				],
				function (err, result) {
					err ? reject(err) : resolve(result)
				}
			)
		})
	},
	getPaniKar: function (pool) {
		console.log("inside pani kar")
		return new Promise((resolve, reject) => {
			let query = `SELECT * FROM ps_pani_kar`
			pool.query(query, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
	updatePaniKar: function (pool, data) {
		let taxAmount = JSON.parse(data.data)
		return new Promise((resolve, reject) => {
			let query = `UPDATE ps_pani_kar 
                      SET 
                   generalWaterTax = ?, 
                   specialWaterTax = ?
                   WHERE id = 1`
			pool.query(
				query,
				[
					JSON.parse(taxAmount.generalWaterTax),
					JSON.parse(taxAmount.specialWaterTax),
				],
				(err, result) => {
					err ? reject(err) : resolve(result)
				}
			)
		})
	},
	getBandkamRedinatorSetting: function (pool) {
		return new Promise((resolve, reject) => {
			let query = `SELECT * from ps_bahandkam_prakar`
			pool.query(query, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
	postBandkamRedinatorSetting: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE ps_bahandkam_prakar 
                  SET 
                  bp_ready_nakar_rate = ?, 
                  bp_tax_rate = ?
                  WHERE 
                  id = ?`
			console.log(data)
			pool.query(
				query,
				[data.redinakarRate, data.taxRate, Number(data.id)],
				(err, result) => {
					err ? reject(err) : resolve(result)
				}
			)
		})
	},
	getPropDesc: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_property_desc`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getGpDetails: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_gram_panchayet LIMIT 1`
			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getPropSpace: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT
                        space.id as id,
                        space.ps_name as ps_name,
                        space.ps_land_rate as ps_land_rate,
                        space.ps_skeep_tax as ps_skeep_tax,
                        space.ps_pd_id as ps_pd_id,
                        space.ps_skip_diwa_arogya,
                        prop_desc.pd_name as pd_name,
						space.ps_skip_cleaning_tax AS skipCleaningTax,
						space.ps_skip_tree_tax AS skipTreeTax,
						space.ps_skip_fireblegate_tax AS skipFireblegateTax,
						space.ps_skip_education_tax AS skipEducationTax
                    FROM 
                        ps_property_specification as space INNER JOIN 
                        ps_property_desc as prop_desc ON 
                        prop_desc.id = space.ps_pd_id order by space.ps_skeep_tax`;

			pool.query(query, (err, result) => {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updatePropertyRateAll: function (pool, updatedPropertyRateAmount) {
		return new Promise(function (resolve, reject) {
			let query = `UPDATE ps_property_specification 
                    SET 
                    ps_land_rate = ?
                    WHERE  
                    ps_land_rate >=1`
			pool.query(
				query,
				Number(updatedPropertyRateAmount),
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},
	getGramInfo: function (pool) {
		return new Promise(function (resolve, reject) {
			var query = 'SELECT * FROM ps_gram_panchayet'
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	getSadasyaInfo: function (pool) {
		return new Promise(function (resolve, reject) {
			var query = 'SELECT * FROM ps_gram_sadasya'
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},

    getSadasyaToList: (pool) =>{
        const q = 'SELECT * FROM ps_gram_sadasya_to'
        return runQuery(pool, q)
    },
	getSadasyaPostList: function (pool) {
		return new Promise(function (resolve, reject) {
			var query = 'SELECT * FROM ps_gram_sadasya_post'
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},

	addSection: (pool, sectionName) => {
		let q = `INSERT INTO ps_gram_sadasya_to (to_name) VALUES (?)`
		return runQuery(pool, q, [sectionName])
	},

    deleteSection: (pool, sId) =>{
        let q = `DELETE FROM ps_gram_sadasya_to WHERE id = ?`;
        return runQuery(pool, q, [sId])
    },

	removeUserFromList: function (pool) {
		return new Promise(function (resolve, reject) {
			var query = 'DELETE FROM ps_form_eight_user'
			pool.query(query, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	saveNewFormEightDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_form_eight_user(
                    id,
                    feu_malmattaNo,
                    feu_oblik_malmatta_id,
                    feu_wardNo,
                    feu_homeNo,
                    feu_aadharNo,
                    feu_ownerName,
                    feu_secondOwnerName,
                    feu_mobileNo,
                    feu_gramPanchayet,
                    feu_villageName,
                    feu_gaatNo,
                    feu_gharkulYojna,
                    feu_havingToilet,
                    feu_areaHeight,
                    feu_areaWidth,
                    feu_totalArea,
                    feu_totalAreaSquareMeter,
                    feu_eastLandmark,
                    feu_westLandmark,
                    feu_northLandmark,
                    feu_southLandmark,
                    feu_bojaShera,
                    feu_created_date,
                    feu_modify_date
                ) VALUES ?`

			console.log("-----------data-------------")
			console.log(data[0])

			pool.query(query, [data], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveNewGalleryImage: function (pool, galleryImageData) {
        let q = `INSERT INTO ps_gallary(g_image_name, g_image_title, g_image_desc) VALUES (?);`
        let insertArr = [galleryImageData.imageName, galleryImageData.g_image_title, galleryImageData.g_image_desc]
        return runQuery(pool, q, [insertArr])
	},
	getGalleryImageList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM  ps_gallary`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	removeImageFromList: function (pool, id) {
		return new Promise(function (resolve, reject) {
			var query = 'DELETE FROM ps_gallary WHERE id = ?'
			pool.query(query, [id], function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	updateGpInfoOne: function (pool, gpData) {

		let query = `UPDATE
                      ps_gram_panchayet 
                    SET 
						gp_name = ?,
						gp_pincode = ?,
						gp_taluka = ?,
						gp_dist = ?,
						gp_state = ?,
						gp_email = ?,
						gp_contact = ?,
						gp_map = ?,
						user_name = ?,
						password = ?,
						gp_ward = ?,
						gp_sadasya = ?,
						gp_is_live=?,
						pg_registration_no=?,
						gramsevak_sign_display = ?,
						srapanch_sign_display=?,
						birth_death_gp_id = ?,

						charge_taken_date = ?,
						sarpanch_election_date = ?,
						term_end_date = ?,
						annual_report_date = ?,
						budget_year = ?,
						audit_year = ?,

						sarpanch_stamp_image_name = ? ,
						sarpanch_stamp_display = ?,
						gramsevak_stamp_image_name = ? ,
						gramsevak_stamp_display = ?,
						gp_office_stamp_image_name = ? ,
						gp_office_stamp_display = ?

                    WHERE id = 1`

		var updateArr = [
			gpData.gpName,
			gpData.gpPinCode,
			gpData.gpTaluka,
			gpData.gpDist,
			'महाराष्ट्र',
			gpData.gpEmail,
			gpData.gpPhone,
			gpData.gpVillageMap,
			gpData.gpUserName,
			gpData.gpPassword,
			Number(gpData.gpWard),
			Number(gpData.gpPadSankhya),
			Number(gpData.gpGav),
			gpData.gpLink,
			+gpData.gramsevakSignDisplay,
			+gpData.sarpanchSignDisplay,
			gpData.birth_death_gp_id,


			gpData.charge_taken_date,
			gpData.sarpanch_election_date,
			gpData.term_end_date,
			gpData.annual_report_date,
			gpData.budget_year,
			gpData.audit_year,


			gpData.sarpanch_stamp_image_name,
			+gpData.sarpanchStampDisplay,
			gpData.gramsevak_stamp_image_name,
			+gpData.gramsevakStampDisplay,
			gpData.gp_office_stamp_image_name,
			+gpData.gpOfficeStampDisplay
		]

		return runQuery(pool, query, updateArr)
	},
	updateGpInfoTwo: function (pool, data) {
		return new Promise(function (resolve, reject) {
			var query = `UPDATE
                      ps_gram_panchayet 
                    SET 
                      gp_info_one = ?
                    WHERE id = 1`
			var update = [data.data]
			pool.query(query, update, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	updateGpInfoThree: function (pool, data) {
		return new Promise(function (resolve, reject) {
			var query = `UPDATE
                      ps_gram_panchayet 
                    SET 
                    gp_info_three = ?
                    WHERE id = 1`
			var update = [data.data]
			pool.query(query, update, function (error, result) {
				if (error) reject(error)
				else resolve(result)
			})
		})
	},
	getVillageList: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM  ps_sub_village`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getVillage: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM  ps_sub_village WHERE id = ?`
			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	removeVillage: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM ps_sub_village WHERE id= ?`
			pool.query(query, [Number(data.id)], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},


	/**
	saveUpdateVillage: function (pool, data) {
		return new Promise((resolve, reject) => {
			if (!data.id) {
				var query = `INSERT INTO ps_sub_village
					  (
						gp_name,
						gp_url,
						gp_male,
						gp_female,
						sc_count,
						st_count,
						nt_count,
						obc_count,
						open_others_count
					  ) VALUES (?)`
				var insert = [
					data.villageName,
					data.villageUrl,
					Number(data.villageMale),
					Number(data.villageFemale),
					Number(data.villageSCCount),
					Number(data.villageSTCount),
					Number(data.villageNTCount),
					Number(data.villageOBCCount),
					Number(data.villageOpenOthersCount),
				]
				pool.query(query, [insert], function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				})
			} else {
				var query = `UPDATE ps_sub_village SET
					  gp_name = ?,
					  gp_url = ?,
					  gp_male = ?,
					  gp_female = ?,
					  sc_count = ?,
					  st_count = ?,
					  nt_count = ?,
					  obc_count = ?,
					  open_others_count = ?
					 WHERE id =?`
				var update = [
					data.villageName,
					data.villageUrl,
					Number(data.villageMale),
					Number(data.villageFemale),
					Number(data.villageSCCount),
					Number(data.villageSTCount),
					Number(data.villageNTCount),
					Number(data.villageOBCCount),
					Number(data.villageOpenOthersCount),
					Number(data.id),
				]
				pool.query(query, update, function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				})
			}
		})
	},
	*/

	saveUpdateVillage: function (pool, data) {
		console.log(data);

		let q = '';
		let insertOrUpdateDataArr = [];

		// JSON-stringify health_sub_centers just in case it's an object
		// const healthSubCentersJson = JSON.stringify(data.health_sub_centers || []);

		if (!data.id) {
			q = `
			INSERT INTO ps_sub_village (
				gp_name, gp_url, gp_male, gp_female,

				sc_count_male, sc_count_female, sc_count,
				st_count_male, st_count_female, st_count,
				nt_count_male, nt_count_female, nt_count,
				obc_count_male, obc_count_female, obc_count,
				open_others_count_male, open_others_count_female, open_others_count,

				ward_numbers, total_members, sarpanch_directly_elected_count,
				home_count, area_in_sq_hectare, area_in_sq_km,
				constituency_number, constituency_name,
				assembly_constituency_number, assembly_constituency_name,
				number_of_households, number_of_households_having_toilets,
				open_defecation_free_year, odf_plus_remarks,
				households_connected_to_waste_management, soak_pits, waste_management,
				tank_location, tank_capacity, staff_in_charge,
				normal_rate, special_rate,
				health_sub_centers
			)
			VALUES (?)
		`;

			insertOrUpdateDataArr = [[
				data.villageName || '',
				data.villageUrl || '',
				Number(data.villageMale || 0),
				Number(data.villageFemale || 0),

				Number(data.villageSCCountMale || 0),
				Number(data.villageSCCountFemale || 0),
				Number(data.villageSCCount || 0),

				Number(data.villageSTCountMale || 0),
				Number(data.villageSTCountFemale || 0),
				Number(data.villageSTCount || 0),

				Number(data.villageNTCountMale || 0),
				Number(data.villageNTCountFemale || 0),
				Number(data.villageNTCount || 0),

				Number(data.villageOBCCountMale || 0),
				Number(data.villageOBCCountFemale || 0),
				Number(data.villageOBCCount || 0),

				Number(data.villageOpenOthersCountMale || 0),
				Number(data.villageOpenOthersCountFemale || 0),
				Number(data.villageOpenOthersCount || 0),

				data.ward_numbers || '',
				data.total_members || '',
				data.sarpanch_directly_elected_count || '',
				data.home_count || '',
				data.area_in_sq_hectare || '',
				data.area_in_sq_km || '',
				data.constituency_number || '',
				data.constituency_name || '',
				data.assembly_constituency_number || '',
				data.assembly_constituency_name || '',
				data.number_of_households || '',
				data.number_of_households_having_toilets || '',
				data.open_defecation_free_year || '',
				data.odf_plus_remarks || '',
				data.households_connected_to_waste_management || '',
				data.soak_pits || '',
				data.waste_management || '',
				data.tank_location || '',
				data.tank_capacity || '',
				data.staff_in_charge || '',
				data.normal_rate || '',
				data.special_rate || '',
				data.health_sub_centers
			]];

		} else {
			q = `
			UPDATE ps_sub_village SET
				gp_name = ?, gp_url = ?, gp_male = ?, gp_female = ?,

				sc_count_male = ?, sc_count_female = ?, sc_count = ?,
				st_count_male = ?, st_count_female = ?, st_count = ?,
				nt_count_male = ?, nt_count_female = ?, nt_count = ?,
				obc_count_male = ?, obc_count_female = ?, obc_count = ?,
				open_others_count_male = ?, open_others_count_female = ?, open_others_count = ?,

				ward_numbers = ?, total_members = ?, sarpanch_directly_elected_count = ?,
				home_count = ?, area_in_sq_hectare = ?, area_in_sq_km = ?,
				constituency_number = ?, constituency_name = ?,
				assembly_constituency_number = ?, assembly_constituency_name = ?,
				number_of_households = ?, number_of_households_having_toilets = ?,
				open_defecation_free_year = ?, odf_plus_remarks = ?,
				households_connected_to_waste_management = ?, soak_pits = ?, waste_management = ?,
				tank_location = ?, tank_capacity = ?, staff_in_charge = ?,
				normal_rate = ?, special_rate = ?,
				health_sub_centers = ?
			WHERE id = ?
		`;

			insertOrUpdateDataArr = [
				data.villageName || '',
				data.villageUrl || '',
				Number(data.villageMale || 0),
				Number(data.villageFemale || 0),

				Number(data.villageSCCountMale || 0),
				Number(data.villageSCCountFemale || 0),
				Number(data.villageSCCount || 0),

				Number(data.villageSTCountMale || 0),
				Number(data.villageSTCountFemale || 0),
				Number(data.villageSTCount || 0),

				Number(data.villageNTCountMale || 0),
				Number(data.villageNTCountFemale || 0),
				Number(data.villageNTCount || 0),

				Number(data.villageOBCCountMale || 0),
				Number(data.villageOBCCountFemale || 0),
				Number(data.villageOBCCount || 0),

				Number(data.villageOpenOthersCountMale || 0),
				Number(data.villageOpenOthersCountFemale || 0),
				Number(data.villageOpenOthersCount || 0),

				data.ward_numbers || '',
				data.total_members || '',
				data.sarpanch_directly_elected_count || '',
				data.home_count || '',
				data.area_in_sq_hectare || '',
				data.area_in_sq_km || '',
				data.constituency_number || '',
				data.constituency_name || '',
				data.assembly_constituency_number || '',
				data.assembly_constituency_name || '',
				data.number_of_households || '',
				data.number_of_households_having_toilets || '',
				data.open_defecation_free_year || '',
				data.odf_plus_remarks || '',
				data.households_connected_to_waste_management || '',
				data.soak_pits || '',
				data.waste_management || '',
				data.tank_location || '',
				data.tank_capacity || '',
				data.staff_in_charge || '',
				data.normal_rate || '',
				data.special_rate || '',
				data.health_sub_centers,
				Number(data.id)
			];
		}

		return runQuery(pool, q, insertOrUpdateDataArr);
	}
	,

	updateMember: function (pool, data) {
        console.log(data.member)
        var query = `UPDATE ps_gram_panchayet SET gp_member = ? WHERE id = 1`
        return runQuery(pool, query, [data.member]);
	},

	addSadasyaPost: function (pool, post) {
		return new Promise((resolve, reject) => {
			let query = `INSERT INTO ps_gram_sadasya_post (post_name) VALUES (?)`
			pool.query(query, [post], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updateGpDastaveg: function (pool, data) {
		data = JSON.stringify(data)
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_dastavegList = '${data}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updateDastaVej: function (pool, data) {
		return new Promise((resolve, reject) => {
			let query = `UPDATE ps_gram_panchayet SET gp_dastavegList = ?`
			pool.query(query, data.data, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	deletePost: function (pool, id) {
		return new Promise((resolve, reject) => {
			let query = `DELETE FROM ps_gram_sadasya_post WHERE id = ?`
			pool.query(query, id, (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},
	saveNewPropSpecification: function (pool, data) {
		// console.log('saving new ', data)
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_property_specification(
                    ps_name,
                    ps_pd_id,
                    ps_land_rate,
                    ps_skeep_tax,
                    ps_skip_diwa_arogya
                  ) VALUES (?)`
			var insertData = [
				data.propertySpecification,
				Number(data.propertyDesc),
				Number(data.propertyLandRate),
				Number(data.isSkeepTax),
				Number(data.isSkipDiwaArogya),
			]
			pool.query(query, [insertData], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updateNewPropSpecification: function (pool, data) {
		console.log(data, 'update diwa agroay skip')
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_property_specification 

                    SET
                      ps_name = ?,
                      ps_pd_id = ?,
                      ps_land_rate =?,
                      ps_skeep_tax = ?,
                      ps_skip_diwa_arogya = ?,
					  ps_skip_cleaning_tax = ?,
					  ps_skip_tree_tax = ?,
					  ps_skip_fireblegate_tax = ?,
					  ps_skip_education_tax = ?
                  WHERE id = ?`
			var updateData = [
				data.propertySpecification,
				Number(data.propertyDesc),
				Number(data.propertyLandRate),
				Number(data.isSkeepTax),
				Number(data.isSkipDiwaArogya),
				Number(data.isSkipCleaningTax),
				Number(data.isSkipTreeTax),
				Number(data.isSkipFireblegateTax),
				Number(data.isSkipEducationTax),
				Number(data.propertyID),
			]

			pool.query(query, updateData, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updateGPYear: function (pool, from_date, to_date) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET
                          gp_working_from = ?,
                          gp_working_to = ?,
                          gp_backup_done =?`
			var updateData = [from_date, to_date, 1]
			pool.query(query, updateData, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	removeNewPropSpecification: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM ps_property_specification  WHERE id = ?`
			var deleteData = [Number(data.id)]
			pool.query(query, deleteData, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	removeFormNineData: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM  ps_form_nine_form`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getFormNineData: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM  ps_form_nine_form`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getFormNineDataOld: function (pool, from_data, to_data) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM  ps_form_nine_form_old WHERE working_year_from = ? AND working_year_to = ?`
			pool.query(query, [from_data, to_data], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	addNineOldYearData: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_form_nine_form_old
                    (   user_id,
                        lastBuildingTax,
                        currentBuildingTax,
                        totalBuildingTax,
                        lastDivaTax,
                        currentDivaTax,
                        totalDivaTax,
                        lastArogyaTax,
                        currentArogyaTax,
                        totalArogyaTax,
                        lastTaxFine,
                        lastYearTaxFine,
                        lastTaxRelief,
                        totalTax,
                        totalSampurnaTax,
                        lastSpacialWaterTax,
                        currentSpacialWaterTax,
                        totalSpacialWaterTax,
                        lastGenealWaterTax,
                        currentGenealWaterTax,
                        totalGenealWaterTax,
                        totalWaterTax,
                        addToMagniLekh,
                        addNalBandNotice,
                        created_date,
                        modify_date,
                        magni_lekh_date,
                        nal_band_notice_date,
                        working_year_from,
                        working_year_to
                      )
                    VALUES ?`
			pool.query(query, [data], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateNineYearData: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_form_nine_form
                    ( user_id,
                    lastBuildingTax,
                    currentBuildingTax,
                    totalBuildingTax,
                    lastDivaTax,
                    currentDivaTax,
                    totalDivaTax,
                    lastArogyaTax,
                    currentArogyaTax,
                    totalArogyaTax,
                    lastTaxFine,
                    lastYearTaxFine,
                    lastTaxRelief,
                    totalTax,
                    totalSampurnaTax,
                    lastSpacialWaterTax,
                    currentSpacialWaterTax,
                    totalSpacialWaterTax,
                    lastGenealWaterTax,
                    currentGenealWaterTax,
                    totalGenealWaterTax,
                    totalWaterTax,
                    addToMagniLekh,
                    addNalBandNotice,
                    created_date,
                    modify_date)
                    VALUES ?`
			pool.query(query, [data], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	delete_empty_plot_list_file: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_empty_plot_list_file_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	get_gr_file_name_list: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_gr_file_list`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//Medical room

	saveMedicalRoomDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			const query = `INSERT INTO 
                    VALUES ?`
			pool.query(query, [data], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updateTakta: function (pool, data) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET
                          ps_gram_adarsh_takta = ?`
			var updateData = [data]
			pool.query(query, updateData, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveGramMahiti: function (pool, _data) {
		var { title, details } = _data

		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_mahiti_details='${details}', gp_mahiti_title  = '${title}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveModalGramMahitiTwoList: function (pool, _data) {
		var data = JSON.stringify(_data)
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_gramMahitiSamitiList='${data}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveModalGramMahitiThreeList: function (pool, _data) {
		var data = JSON.stringify(_data)
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_gramMahitiUdyogiList='${data}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveModalGramMahitiFourList: function (pool, _data) {
		var data = JSON.stringify(_data)
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_gramNewsList='${data}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveModalGramMahitiFiveList: function (pool, _data) {
		var data = JSON.stringify(_data)
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_gramKendraList='${data}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveModalGramMahitiSixList: function (pool, _data) {
		var data = JSON.stringify(_data)
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_gramYojanaList='${data}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	saveModalGramMahitiFiveListOne: function (pool, _data) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_gramKendraPhoto='${_data}'`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	updateBackupNine: function (pool) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE ps_gram_panchayet SET gp_backup_done = 0`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	upload_gr_file: function (pool, fullFileName) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_gr_file_list(file_name) values(?)`
			pool.query(query, [fullFileName], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//Education

	getEducationInstituteGalleryPhotos: (pool, instituteId) => {
		return new Promise((resolve, reject) => {
			var query = `SELECT
								*
						FROM
							ps_education_institute_gallery
						WHERE
						 	institute_id = ?
						ORDER BY 
							created_at DESC`
			pool.query(query, [instituteId], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	addEducationInstituteGalleryPhoto: (pool, instituteId) => {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO
							ps_education_institute_gallery
							(
								gallery_image_name,
								institute_id
							)
						VALUES
						 	(?, ?)`
			pool.query(
				query,
				[new Date().toLocaleString(), instituteId],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	updateEducationInstituteGalleryPhotoName: (pool, imageName, id) => {
		return new Promise((resolve, reject) => {
			var query = `UPDATE
							ps_education_institute_gallery
							SET
								gallery_image_name = ?
						WHERE id = ?`
			pool.query(query, [imageName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	deleteEducationInstituteGalleryPhoto: (pool, id) => {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM
							ps_education_institute_gallery
						WHERE id = ?`
			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getInstituteDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
							*
						FROM 
							ps_education_institute_list 
						WHERE
							id = ?;
							`
			pool.query(q, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	getInstituteStaffDetails: (pool, id) => {
		return new Promise((resolve, reject) => {
			const q = `SELECT 
							*
						FROM 
							ps_education_institute_staff_list 
						WHERE
							institute_id = ?;
							`
			pool.query(q, [id], (err, result) => {
				err ? reject(err) : resolve(result)
			})
		})
	},

	upload_education_institute_details: function (
		pool,
		instituteName,
		instituteType
	) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_education_institute_list(institute_name, institute_type) values(?, ?)`
			pool.query(query, [instituteName, instituteType], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	update_education_institute_photo_details: function (
		pool,
		instituteId,
		photoName
	) {
		return new Promise((resolve, reject) => {
			var query = `update ps_education_institute_list
                            set 
                                institute_image = ?
                            where 
                                id = ?`
			pool.query(query, [photoName, instituteId], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	update_education_institute_details: function (
		pool,
		instituteName,
		instituteType,
		instituteId
	) {
		return new Promise((resolve, reject) => {
			const query = `update ps_education_institute_list
                            set
                                institute_name =?,
                                institute_type =?
                            where 
                                id =?`
			const insertData = [instituteName, instituteType, instituteId]
			pool.query(query, insertData, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	upload_divyanga_file: function (pool, fullFileName) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_divyanga_file_list(file_name) values(?)`

			pool.query(query, [fullFileName], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getInstituteName: function (pool, instituteId) {
		return new Promise((resolve, reject) => {
			const query = `select institute_name from ps_education_institute_list where id = ?`
			pool.query(query, instituteId, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	get_education_institute_staff_list: function (pool, instituteId) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_education_institute_staff_list where institute_id = ?`
			pool.query(query, instituteId, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	upload_education_institute_staff_details: function (
		pool,
		instituteId,
		staffName,
		staffMobno,
		staffDesignation
	) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_education_institute_staff_list(institute_id, staff_name, staff_mob_no, staff_designation) values(?, ?, ?, ?)`
			pool.query(
				query,
				[instituteId, staffName, staffMobno, staffDesignation],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	update_education_institute_staff_details: function (
		pool,
		instituteId,
		staffName,
		staffMobno,
		editStaffId,
		staffDesignation
	) {
		return new Promise((resolve, reject) => {
			var query = `update ps_education_institute_staff_list
                            set 
								staff_name = ?,
                                staff_mob_no = ?,
								staff_designation = ?
                            where 
                                id = ?`
			pool.query(
				query,
				[staffName, staffMobno, staffDesignation, editStaffId],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},
	update_education_institute_staff_photo_details: function (
		pool,
		staffId,
		staffPhotoName
	) {
		return new Promise((resolve, reject) => {
			var query = `update ps_education_institute_staff_list
                            set 
                                staff_photo = ?
                            where 
                                id = ?`
			pool.query(query, [staffPhotoName, staffId], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	delete_education_institute_staff_details: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_education_institute_staff_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	upload_empty_plot_list_file: function (pool, fullFileName) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_empty_plot_list_file_list(file_name) values(?)`

			pool.query(query, [fullFileName], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	delete_divyanga_file: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_divyanga_file_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	delete_gr_file: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_gr_file_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	delete_education_institute_details: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_education_institute_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	delete_empty_plot_list_file: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_empty_plot_list_file_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	get_gr_file_name_list: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_gr_file_list`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	get_education_institute_list: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_education_institute_list`
			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	//Medical room

	saveMedicalRoomDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			const query = `INSERT INTO
				ps_medical_room 
				(
					authority_person_name
				)

				VALUES (?)`

			let insertArray = [data.authority_person_name]

			pool.query(query, [insertArray], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getAuthorityPerson: function (pool) {
		return new Promise((resolve, reject) => {
			const query =
				'SELECT * FROM ps_medical_room ORDER BY createdAt DESC LIMIT 1'
			// console.log("QYYUWEUWUTUTRUETruetruteu")
			pool.query(query, [], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	uploadKrishiVidnyanFile: function (
		pool,
		informationTitle,
		fullFileName,
		type
	) {
		console.log('in modal 1283')
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO ps_krishi_vidnyan_file_list (title,file_name, type) VALUES (?, ?, ?)`
			pool.query(
				query,
				[informationTitle, fullFileName, type],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},
	deleteKrishiVidnyanFile: (pool, id) => {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM ps_krishi_vidnyan_file_list WHERE id = ?`
			pool.query(query, id, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	getKrishiVidnyanFileNameList: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `SELECT * from ps_krishi_vidnyan_file_list`
			pool.query(query, function (err, result) {
				err ? reject(err) : resolve(result)
			})
		})
	},
	get_divyanga_file_name_list: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_divyanga_file_list`

			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	get_empty_plot_list_file_name_list: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_empty_plot_list_file_list`

			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//job related

	get_job_related_details: (pool, fileName, id) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM ps_job_related`

			pool.query(query, [fileName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	upload_job_related_details: (pool, data) => {
		return new Promise((resolve, reject) => {
			const query = `
					INSERT INTO 
					
					ps_job_related  
				 	(
						job_title,
						job_description,
						expiry_date,
						link,
						file_name
					)
					VALUES 
						(?, ?, ?, ?, ?)`

			pool.query(
				query,
				[
					data.job_title,
					data.job_description,
					data.expiry_date,
					data.link,
					data.file_name,
				],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	update_job_related_file_name: (pool, fileName, id) => {
		return new Promise((resolve, reject) => {
			const query = `
					UPDATE
						ps_job_related  
				 	SET 
						file_name = ?
					WHERE 
						id = ?`

			pool.query(query, [fileName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	update_job_related_details: (pool, data) => {
		console.log('IN model finally', data)
		return new Promise((resolve, reject) => {
			const query = `
					UPDATE
						ps_job_related  
				 	SET 
						job_title = ?,
						job_description = ?,
						link = ?,
						file_name = ?,
						expiry_date = ?
					WHERE 
						id = ?`

			pool.query(
				query,
				[
					data.job_title,
					data.job_description,
					data.link,
					data.file_name,
					data.expiry_date,
					data.id,
				],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	delete_job_related_details: (pool, id) => {
		return new Promise((resolve, reject) => {
			const query = `
					DELETE FROM
						ps_job_related  
					WHERE 
						id = ?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//Gram Ahaval Documents

	getGramAvhavalDocuements: (pool) => {
		return new Promise((resolve, reject) => {
			const query = `SELECT * FROM ps_gram_ahaval_documents`

			pool.query(query, [], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	addGramAvhavalDocuement: (pool, data) => {
		return new Promise((resolve, reject) => {
			const query = `
					INSERT INTO
						ps_gram_ahaval_documents
					(
						document_name
					) 
					VALUES
					(?)`

			pool.query(query, [data.document_name], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateGramAvhavalDocumenPathName: (pool, fileName, id) => {
		console.log(' in model ')
		return new Promise((resolve, reject) => {
			const query = `
					UPDATE
						ps_gram_ahaval_documents
					SET
						document_file_name = ? 
					WHERE 
						id = ?`

			pool.query(query, [fileName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	deleteGramAvhavalDocuement: (pool, id) => {
		return new Promise((resolve, reject) => {
			const query = `
					DELETE FROM
						ps_gram_ahaval_documents  
					WHERE 
						id = ?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//Arogya Seva Kendra
	saveArogyaSevaKendraDetails: function (pool, data) {
		return new Promise((resolve, reject) => {
			const query = `
				INSERT INTO ps_arogya_seva_kendra 
					(
						arogya_seva_kendra_name,
						arogya_seva_kendra_description,
						arogya_seva_kendra_address, 
						arogya_seva_kendra_mobile, 
						arogya_seva_kendra_email, 
						arogya_seva_kendra_time, 
						arogya_seva_kendra_adhikari_name
					)
		  		VALUES 
					(?);`

			const insertArray = [
				data.arogya_seva_kendra_name,
				data.arogya_seva_kendra_description,
				data.arogya_seva_kendra_address,
				data.arogya_seva_kendra_mobile,
				data.arogya_seva_kendra_email,
				`${data.arogya_seva_kendra_time_from}-${data.arogya_seva_kendra_time_to}`,
				data.arogya_seva_kendra_adhikari_name,
			]

			pool.query(query, [insertArray], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	addArogyaSevaKendraImageName: function (pool, imageName, id) {
		return new Promise((resolve, reject) => {
			const query = `
				UPDATE
					ps_arogya_seva_kendra 
				SET
					arogya_seva_kendra_image_name = ?
				WHERE 
						id = ?`

			pool.query(query, [imageName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	updateArogyaSevaKendraDetails: function (pool, data, id) {
		return new Promise((resolve, reject) => {
			const query = `
				UPDATE 
						ps_arogya_seva_kendra
					SET
						arogya_seva_kendra_name = ?,
						arogya_seva_kendra_description = ?,
						arogya_seva_kendra_address = ?,
						arogya_seva_kendra_mobile = ?,
						arogya_seva_kendra_email = ?,
						arogya_seva_kendra_time = ?,
						arogya_seva_kendra_adhikari_name = ?
					WHERE
						id = ?;`

			const updateArray = [
				data.arogya_seva_kendra_name,
				data.arogya_seva_kendra_description,
				data.arogya_seva_kendra_address,
				data.arogya_seva_kendra_mobile,
				data.arogya_seva_kendra_email,
				data.arogya_seva_kendra_time,
				data.arogya_seva_kendra_adhikari_name,
				id,
			]

			pool.query(query, updateArray, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getArogyaSevaKendraList: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `
				SELECT 
					kendra.*, 
					COUNT(sevak.id) AS total_arogya_sevak
				FROM 
					ps_arogya_seva_kendra 
						AS kendra
				LEFT JOIN 
					ps_arogya_sevak_information 
						AS sevak 
				ON 
					kendra.id = sevak.arogya_kendra_id
				GROUP BY 
					kendra.id;`

			pool.query(query, [], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getArogyaSevaKendraDetails: function (pool, id) {
		return new Promise((resolve, reject) => {
			const query = `
				SELECT 
					kendra.*, 
					COUNT(sevak.id) AS total_arogya_sevak
				FROM 
					ps_arogya_seva_kendra AS kendra
				LEFT JOIN 
					ps_arogya_sevak_information AS sevak 
				ON 
					kendra.id = sevak.arogya_kendra_id
				WHERE 
					kendra.id = ?
				GROUP BY 
					kendra.id;`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	deleteArogyaSevaKendra: function (pool, id) {
		return new Promise((resolve, reject) => {
			const query = `
			DELETE
				FROM 
					ps_arogya_seva_kendra
				WHERE 
					id = ?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//Arogya Seva Kendra Gallery

	getArogyaSevaKendraGalleryPhotos: (pool, arogyaSevaKendraId) => {
		return new Promise((resolve, reject) => {
			var query = `SELECT
								*
						FROM
							ps_arogya_seva_kendra_gallery
						WHERE
                            arogya_seva_kendra_id = ?
						ORDER BY 
							created_at DESC`
			pool.query(query, [arogyaSevaKendraId], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	addArogyaSevaKendraGalleryPhoto: (pool, arogyaSevaKendraId) => {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO
							ps_arogya_seva_kendra_gallery
							(
								gallery_image_name,
								arogya_seva_kendra_id
							)
						VALUES
						 	(?, ?)`
			pool.query(
				query,
				[new Date().toLocaleString(), arogyaSevaKendraId],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	updateArogyaSevaKendraGalleryPhotoName: (pool, imageName, id) => {
		return new Promise((resolve, reject) => {
			var query = `UPDATE
							ps_arogya_seva_kendra_gallery
							SET
								gallery_image_name = ?
						WHERE id = ?`
			pool.query(query, [imageName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	deleteArogyaSevaKendraGalleryPhoto: (pool, id) => {
		return new Promise((resolve, reject) => {
			var query = `DELETE FROM
							ps_arogya_seva_kendra_gallery
						WHERE id = ?`
			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//Arogya Sevak

	getArogyaSevakListForKendra: function (pool, id) {
		return new Promise((resolve, reject) => {
			const query = `SELECT 
					* 
				FROM 
					ps_arogya_sevak_information
				WHERE 
					arogya_kendra_id = ?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	get_arogya_sevak_information: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_arogya_sevak_information`

			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	post_arogya_sevak_information: function (pool, info) {
		return new Promise((resolve, reject) => {
			const query = `insert into ps_arogya_sevak_information
								(arogya_person_name, 
								arogya_person_mobile_no, 
								arogya_person_time,
								arogya_kendra_id)
							values (?, ?, ?, ?)`

			let insertData = [
				info.arogya_person_name,
				info.arogya_person_mobile_no,
				info.arogya_person_time_from + '-' + info.arogya_person_time_to, // arogya person time from-to (e.g. 9am to 5pm)
				info.arogya_seva_kendra_id
			]

			pool.query(query, insertData, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	add_arogya_sevak_image_name: function (pool, imageName, id) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE  
							ps_arogya_sevak_information
						SET 
							arogya_person_photo = ?
				 		WHERE
							id = ?`

			pool.query(query, [imageName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	delete_arogya_sevak_information: function (pool, delete_id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_arogya_sevak_information where id=?`

			pool.query(query, [delete_id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	upload_arogya_camp_file: function (pool, fullFileName) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_arogya_camp_files(file_name) values(?)`

			pool.query(query, [fullFileName], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	get_arogya_camp_files: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_arogya_camp_files`

			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	delete_arogya_camp_photos: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_arogya_camp_files where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	// gr upload
	get_gov_yojna_file_name_list: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_gov_yojna_file_list`

			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	upload_gov_yojna_file: function (pool, fullFileName) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_gov_yojna_file_list(file_name) values(?)`

			pool.query(query, [fullFileName], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	delete_gov_yojna_file: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_gov_yojna_file_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getDivyangaApplicationSingleUserDetails: function (pool, id) {
		// application_status ; 0 -pending 1 : approved   -1 : rejected

		return new Promise((resolve, reject) => {
			let query = `SELECT
                        id,

                        full_name,
                        address,
                        education,
                        demand,

                        mobile,
                        type_of_disability,
                        percentage_of_disability,
                        age,

                        shera,
                        aadhar_number,
                        user_image_pathurl,
                        application_status,
                        
                        application_number,
						certificate_file_name,
                        created_at,
                        updated_at
                      FROM
                        ps_divyanga_registration
                      WHERE id = ?
                      `

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	getDivyangaPeopleApplicationsList: function (pool, application_status) {
		// application_status ; 0 -pending 1 : approved   -1 : rejected

		return new Promise((resolve, reject) => {
			let query = `SELECT
                        id,

                        full_name,
                        address,
                        education,
                        demand,

                        mobile,
                        type_of_disability,
                        percentage_of_disability,
                        age,

                        shera,
                        aadhar_number,
                        user_image_pathurl,
                        application_status,

                        application_number,
						certificate_file_name,
                        created_at,
                        updated_at
                      FROM
                        ps_divyanga_registration
                      WHERE application_status = ?
                      `

			pool.query(query, [application_status], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	approveDivyangaUserApplication: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `UPDATE 
						ps_divyanga_registration
						SET
						application_status = ?
						WHERE id = ?;`

			pool.query(query, [1, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	rejectDivyangaUserApplication: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `
						UPDATE 
						ps_divyanga_registration
						SET
						application_status = ?
						WHERE id = ?;`

			pool.query(query, [-1, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	delete_arogya_sevak_information: function (pool, delete_id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_arogya_sevak_information where id=?`

			pool.query(query, [delete_id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	upload_arogya_camp_file: function (
		pool,
		fullFileName,
		arogya_seva_kendra_id
	) {
		return new Promise((resolve, reject) => {
			var query = `INSERT INTO
							 ps_arogya_camp_files
						(
							file_name,
							arogya_seva_kendra_id
						) 
						VALUES(?, ?)`

			pool.query(
				query,
				[fullFileName, arogya_seva_kendra_id],
				function (err, result) {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				}
			)
		})
	},

	add_arogya_camp_file_name_for_storage: (pool, fileName, id) => {
		return new Promise((resolve, reject) => {
			var query = `UPDATE
							 ps_arogya_camp_files
						SET
							file_name_for_storage = ?
						WHERE
							id = ?`

			pool.query(query, [fileName, id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	get_arogya_camp_files: function (pool, arogya_seva_kendra_id = -1) {
		return new Promise((resolve, reject) => {
			const query = `select 
							* from
						ps_arogya_camp_files
							WHERE 
						arogya_seva_kendra_id = ?`

			pool.query(query, [arogya_seva_kendra_id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},
	delete_arogya_camp_photos: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_arogya_camp_files where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	// gr upload
	get_gov_yojna_file_name_list: function (pool) {
		return new Promise((resolve, reject) => {
			const query = `select * from ps_gov_yojna_file_list`

			pool.query(query, function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},


    getAllRequiredData: async (pool) => {

        const noticeQ = `
            SELECT 
                id, 
                wn_notice_name AS notice, 
                wn_show AS show_type, 
                DATE_FORMAT(created_date,"%d-%m-%Y") AS date_1 
            FROM ps_web_notice 
            WHERE wn_show = 1 
            ORDER BY id DESC
        `;

        const galleryQ = `SELECT * FROM ps_gallary`;

        const birthdayQ = `
            SELECT fName, fImage 
            FROM ps_gp_member_list 
            WHERE DATE_FORMAT(fDob, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d')
        `;

        const grFileQ = `SELECT * FROM ps_gr_file_list`;

        const divyangaQ = `SELECT * FROM ps_divyanga_file_list`;

        const emptyPlotQ = `SELECT * FROM ps_empty_plot_list_file_list`;

        const sevakQ = `SELECT * FROM ps_arogya_sevak_information`;

        const campQ = `SELECT * FROM ps_arogya_camp_files`;

        // 1️⃣ NOTICE
        const notice = await runQuery(pool, noticeQ);

        // 2️⃣ GALLERY
        const gallery = await runQuery(pool, galleryQ);

        // 3️⃣ BIRTHDAY
        const birthday = await runQuery(pool, birthdayQ);

        // 4️⃣ GR FILE LIST
        const grFileList = await runQuery(pool, grFileQ);

        // 5️⃣ DIVYANGA FILE LIST
        const divyangaFileList = await runQuery(pool, divyangaQ);

        // 6️⃣ EMPTY PLOT LIST
        const emptyPlotListFileList = await runQuery(pool, emptyPlotQ);

        // 7️⃣ AROGYA SEVAK INFORMATION
        const arogyaSevakInformationList = await runQuery(pool, sevakQ);

        // 8️⃣ AROGYA CAMP PHOTOS
        const arogyaCampPhotos = await runQuery(pool, campQ);

        return {
            notice,
            gallery: gallery.reverse(),
            birthday,
            grFileList,
            divyangaFileList,
            emptyPlotListFileList,
            arogyaSevakInformationList,
            arogyaCampPhotos
        };
    },


	upload_gov_yojna_file: function (pool, fullFileName) {
		return new Promise((resolve, reject) => {
			var query = `insert into ps_gov_yojna_file_list(file_name) values(?)`

			pool.query(query, [fullFileName], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	delete_gov_yojna_file: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `delete from ps_gov_yojna_file_list where id=?`

			pool.query(query, [id], function (err, result) {
				if (err) {
					reject(err)
				} else {
					resolve(result)
				}
			})
		})
	},

	//Video gallery data
	getVideoGalleryData: function (pool, id) {
		return new Promise((resolve, reject) => {
			var query = `SELECT * FROM ps_video_gallery`

			pool.query(query, [], function (err, result) {
				return err ? reject(err) : resolve(result)
			})
		})
	},

	uploadVideoGalleryLink: function (pool, videoData) {

		let query = `INSERT INTO 
						ps_video_gallery
						(
							video_link,
							video_name,
                            
                            video_title,
                            video_desc
						)
						VALUES
						(?, ?, ?, ?)`

		return runQuery(pool, query, [videoData.video_link, videoData.video_name, videoData.video_title, videoData.video_desc])
	},
	deleteVideoGalleryLink: function (pool, id) {
		let query = `DELETE FROM ps_video_gallery WHERE id = ?`
		return runQuery(pool, query, [id])
	},

	saveVillageGuide: function (pool, data, fileName) {
		// console.log(data, '-in modal')
		return new Promise((resolve, reject) => {
			var query = `UPDATE
							ps_gram_panchayet
							SET 
								village_guide_name = ?,
								village_guide_title = ?,
								village_guide_image_name = ?
							WHERE 
								id = ?`

			pool.query(
				query,
				[data.village_guide_name, data.village_guide_title, fileName, data.id],
				function (err, result) {
					return err ? reject(err) : resolve(result)
				}
			)
		})
	},
}
