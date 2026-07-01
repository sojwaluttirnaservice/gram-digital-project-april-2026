const { runQuery } = require('../../../utils/runQuery');
const prapatraBModel = {
	create: (pool, createData) => {
		const q = `
            INSERT INTO ps_n_3_prapatra_b (
                year,
                gp_groups,
                sq_meter_area,
                population_at_201,
                establishment_date,
                last_election_date,
                regular_term_expiry_date,
                not_reserved_posts_count,
                reserved_seats_female,
                reserved_seats_scheduled_caste,
                reserved_seats_scheduled_tribe,
                reserved_seats_other_backward_classes,
                elected_grampanchayat_members_count,
                by_election_grampanchayat_members_count,
                elected_female_members_count,
                elected_male_members_count,
                scheduled_tribe_members_elected_female,
                scheduled_tribe_members_elected_male,
                scheduled_caste_members_elected_female,
                scheduled_caste_members_elected_male,
                other_backward_classes_members_elected_female,
                other_backward_classes_members_elected_male
            ) VALUES (
                ?
            )
            `;

		const insertArray = [
			createData.year,
			createData.gp_groups,
			createData.sq_meter_area,
			createData.population_at_201,
			createData.establishment_date,
			createData.last_election_date,
			createData.regular_term_expiry_date,
			createData.not_reserved_posts_count,
			createData.reserved_seats_female,
			createData.reserved_seats_scheduled_caste,
			createData.reserved_seats_scheduled_tribe,
			createData.reserved_seats_other_backward_classes,
			createData.elected_grampanchayat_members_count,
			createData.by_election_grampanchayat_members_count,
			createData.elected_female_members_count,
			createData.elected_male_members_count,
			createData.scheduled_tribe_members_elected_female,
			createData.scheduled_tribe_members_elected_male,
			createData.scheduled_caste_members_elected_female,
			createData.scheduled_caste_members_elected_male,
			createData.other_backward_classes_members_elected_female,
			createData.other_backward_classes_members_elected_male
		];

		return runQuery(pool, q, [insertArray]);
	},

	update: (pool, updateData) => {
		const q = `
                UPDATE ps_n_3_prapatra_b
                SET
                    gp_groups = ?,
                    sq_meter_area = ?,
                    population_at_201 = ?,
                    establishment_date = ?,
                    last_election_date = ?,
                    regular_term_expiry_date = ?,
                    not_reserved_posts_count = ?,
                    reserved_seats_female = ?,
                    reserved_seats_scheduled_caste = ?,
                    reserved_seats_scheduled_tribe = ?,
                    reserved_seats_other_backward_classes = ?,
                    elected_grampanchayat_members_count = ?,
                    by_election_grampanchayat_members_count = ?,
                    elected_female_members_count = ?,
                    elected_male_members_count = ?,
                    scheduled_tribe_members_elected_female = ?,
                    scheduled_tribe_members_elected_male = ?,
                    scheduled_caste_members_elected_female = ?,
                    scheduled_caste_members_elected_male = ?,
                    other_backward_classes_members_elected_female = ?,
                    other_backward_classes_members_elected_male = ?
                WHERE id = ?;
            `;

		const updateArray = [
			updateData.gp_groups,
			updateData.sq_meter_area,
			updateData.population_at_201,
			updateData.establishment_date,
			updateData.last_election_date,
			updateData.regular_term_expiry_date,
			updateData.not_reserved_posts_count,
			updateData.reserved_seats_female,
			updateData.reserved_seats_scheduled_caste,
			updateData.reserved_seats_scheduled_tribe,
			updateData.reserved_seats_other_backward_classes,
			updateData.elected_grampanchayat_members_count,
			updateData.by_election_grampanchayat_members_count,
			updateData.elected_female_members_count,
			updateData.elected_male_members_count,
			updateData.scheduled_tribe_members_elected_female,
			updateData.scheduled_tribe_members_elected_male,
			updateData.scheduled_caste_members_elected_female,
			updateData.scheduled_caste_members_elected_male,
			updateData.other_backward_classes_members_elected_female,
			updateData.other_backward_classes_members_elected_male,
			updateData.id
		];

		return runQuery(pool, q, updateArray);
	},

	getByYear: (pool, year) => {
		const q = `
                  SELECT 
                    *,
                    IFNULL(DATE_FORMAT(establishment_date, '%d-%m-%Y'), '') AS _establishment_date,
                    IFNULL(DATE_FORMAT(last_election_date, '%d-%m-%Y'), '') AS _last_election_date,
                    IFNULL(DATE_FORMAT(regular_term_expiry_date, '%d-%m-%Y'), '') AS _regular_term_expiry_date
                FROM ps_n_3_prapatra_b
                WHERE year = ?;
            `;
		return runQuery(pool, q, [year]);
	}
};

module.exports = prapatraBModel;
