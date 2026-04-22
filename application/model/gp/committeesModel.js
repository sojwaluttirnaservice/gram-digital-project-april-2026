const { runQuery } = require("../../utils/runQuery");

const committeesModel = {

    addCommittee: (pool, committee) => {
        const q = `
            INSERT INTO ps_committees 
                (committee_name, resolution_number, resolution_date)
            VALUES (?, ?, ?)
        `;

        const values = [
            committee.committee_name,
            committee.resolution_number,
            committee.resolution_date,
        ];

        return runQuery(pool, q, values);
    },

    updateCommittee: (pool, updatedCommittee) => {
        const q = `
            UPDATE ps_committees
            SET committee_name = ?, resolution_number = ?, resolution_date = ?
            WHERE id = ?
        `;

        const values = [
            updatedCommittee.committee_name,
            updatedCommittee.resolution_number,
            updatedCommittee.resolution_date,
            updatedCommittee.id,
        ];

        return runQuery(pool, q, values);
    },

    deleteCommittee: (pool, committeeId) => {
        const q = `DELETE FROM ps_committees WHERE id = ?`;
        return runQuery(pool, q, [committeeId]);
    },

    getCommitteeById: (pool, committeeId) => {
        let q = `SELECT *, COALESCE(DATE_FORMAT(resolution_date, '%d-%m-%Y'), '') AS _resolution_date FROM ps_committees WHERE id = ?`
        return runQuery(pool, q, [committeeId])
    },

    getCommitteeWithMembers: (pool, committeeId) => {
        const q = `
            SELECT 
                    c.id AS committee_id,
                    c.committee_name,
                    c.resolution_number,
                    c.resolution_date,
                    COALESCE(DATE_FORMAT(c.resolution_date, '%d-%m-%Y'), '') AS _resolution_date,
                    COALESCE(
                        JSON_ARRAYAGG(
                            IF(m.id IS NOT NULL,
                                JSON_OBJECT(
                                    'member_id', m.id,
                                    'member_name', m.member_name,
                                    'member_post', m.member_post,
                                    'profile_image_url', m.profile_image_name
                                ),
                                NULL
                            )
                        ),
                        JSON_ARRAY()
                    ) AS committee_members
                FROM ps_committees c
                LEFT JOIN ps_committee_members m
                    ON c.id = m.committee_id_fk
                WHERE c.id = ?
                GROUP BY c.id
                ORDER BY c.id;

        `;

        return runQuery(pool, q, [committeeId]);
    },

    getAllCommitteesWithMembersCount: (pool) => {
        const q = `
            SELECT 
                c.id AS committee_id,
                c.committee_name,
                c.resolution_number,
                c.resolution_date,
                COALESCE(DATE_FORMAT(c.resolution_date, '%d-%m-%Y'), '') AS _resolution_date,
                COUNT(m.id) AS members_count
            FROM ps_committees c
            LEFT JOIN ps_committee_members m
                ON c.id = m.committee_id_fk
            GROUP BY 
                        c.id, 
                        c.committee_name, 
                        c.resolution_number, 
                        c.resolution_date
            ORDER BY c.id
        `;

        return runQuery(pool, q);
    },


    getAllCommitteesWithMembers: (pool) => {
        const q = `
            SELECT 
                c.id AS committee_id,
                c.committee_name,
                c.resolution_number,
                c.resolution_date,
                COALESCE(DATE_FORMAT(c.resolution_date, '%d-%m-%Y'), '') AS _resolution_date,
                COALESCE(
                    JSON_ARRAYAGG(
                        IF(m.id IS NOT NULL,
                            JSON_OBJECT(
                                'member_id', m.id,
                                'member_name', m.member_name,
                                'member_post', m.member_post,
                                'profile_image_url', m.profile_image_name
                            ),
                            NULL
                        )
                    ),
                    JSON_ARRAY()
                ) AS committee_members
            FROM ps_committees c
            LEFT JOIN ps_committee_members m
                ON c.id = m.committee_id_fk
            GROUP BY c.id
            ORDER BY c.id;
                    `;

        return runQuery(pool, q);
    },

    addCommitteeMember: (pool, member) => {
        const q = `
            INSERT INTO ps_committee_members 
                (committee_id_fk, member_name, member_post, profile_image_name)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            member.committee_id_fk,
            member.member_name,
            member.member_post,
            member.profile_image_name || ''
        ];

        return runQuery(pool, q, values);
    },

    updateCommitteeMember: (pool, member) => {
        const q = `
            UPDATE ps_committee_members
            SET member_name = ?, member_post = ?, profile_image_name = ?
            WHERE id = ?
        `;

        const values = [
            member.member_name,
            member.member_post,
            member.profile_image_name,
            member.id,
        ];

        return runQuery(pool, q, values);
    },

    deleteCommitteeMember: (pool, committeeMemberId) => {
        const q = `DELETE FROM ps_committee_members WHERE id = ?`;
        return runQuery(pool, q, [committeeMemberId]);
    },

    getCommitteeMember: (pool, committeMemberId) => {
        const q = `
                SELECT 
                    m.id as member_id,
                    m.member_name,
                    m.member_post,
                    m.profile_image_name,
                    m.committee_id_fk,
                    c.committee_name,
                    m.profile_image_name,
                    COALESCE(DATE_FORMAT(c.resolution_date, '%d-%m-%Y'), '') AS _resolution_date
                FROM ps_committee_members m
                LEFT JOIN ps_committees c
                ON m.committee_id_fk = c.id
                WHERE m.id = ?
            `;

        return runQuery(pool, q, [committeMemberId]);
    },


    getAllCommitteMembers: (pool) => {
        const q = `
            SELECT 
                m.id as member_id,
                m.committee_id_fk,
                m.member_name,
                m.member_post,
                m.profile_image_name,
                c.committee_name,
                COALESCE(DATE_FORMAT(c.resolution_date, '%d-%m-%Y'), '') AS _resolution_date,
            FROM ps_committee_members m
            LEFT JOIN ps_committees c
            ON m.committee_id_fk = c.id
            ORDER BY m.committee_id_fk
        `;

        return runQuery(pool, q);
    }

};

module.exports = committeesModel;
