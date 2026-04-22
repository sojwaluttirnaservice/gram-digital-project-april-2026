const db = require("../../config/db.connect.promisify");

const bplModel = {

    save: (certificateData) => {
        let q = `INSERT INTO ps_bpl_certificates
                    (
                        name,
                        name_m,
                        gender,
                        gender_m,
                        age,
                        age_m,
                        year,
                        bpl_list_number,
                        bpl_list_number_m,
                        certificate_holder_image_name,
                        bpl_score,
                        createdAt,
                        updatedAt
                    )
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const now = new Date();

        const insertDataArr = [
            certificateData.name,
            certificateData.name_m,
            certificateData.gender,
            certificateData.gender_m,
            certificateData.age,
            certificateData.age_m,
            certificateData.year || new Date().getFullYear(),
            certificateData.bpl_list_number,
            certificateData.bpl_list_number_m || null,
            certificateData.certificate_holder_image_name || null,
            certificateData.bpl_score,

            certificateData.createdAt || now,
            certificateData.createdAt || now
        ];

        return db.query(q, insertDataArr);
    },

    addFamilyMembers: (members, certificateId) => {
        const q = `INSERT INTO ps_bpl_certificate_family_members
                    (
                        bpl_certificate_id_fk,
                        family_member_name,
                        family_member_name_m,
                        relation,
                        relation_m,
                        age,
                        age_m
                    )  VALUES ?`


        const membersDataArr = members?.map((member) => {
            return [
                certificateId,
                member.family_member_name,
                member.family_member_name_m,
                member.relation,
                member.relation_m,
                member.age,
                member.age_m
            ]
        })

        return db.query(q, [membersDataArr])
    },

    update: (certificateData) => {
        let q = `UPDATE ps_bpl_certificates SET 
                    name = ?,
                    name_m = ?,
                    gender = ?,
                    gender_m = ?,
                    age = ?,
                    age_m = ?,
                    year = ?,
                    bpl_list_number = ?,
                    bpl_list_number_m = ?,
                    certificate_holder_image_name = ?,
                    bpl_score = ?,
                    updatedAt = NOW()
                WHERE id = ?`;

        const updateDataArr = [
            certificateData.name,
            certificateData.name_m,
            certificateData.gender,
            certificateData.gender_m,
            certificateData.age,
            certificateData.age_m,
            certificateData.year,
            certificateData.bpl_list_number,
            certificateData.bpl_list_number_m,
            certificateData.certificate_holder_image_name,
            certificateData.bpl_score,
            certificateData.id
        ];

        return db.query(q, updateDataArr);
    },

    delete: (id) => {
        let q = `DELETE FROM ps_bpl_certificates WHERE id = ?`;
        return db.query(q, [id]);
    },

    getById: (id) => {
        let q = `
            SELECT 
                c.*,
                IF(COUNT(f.id), 
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', f.id,
                            'family_member_name', f.family_member_name,
                            'family_member_name_m', f.family_member_name_m,
                            'relation', f.relation,
                            'relation_m', f.relation_m,
                            'age', f.age,
                            'age_m', f.age_m
                        )
                    ), 
                    NULL
                ) AS family_members
            FROM ps_bpl_certificates AS c
            LEFT JOIN ps_bpl_certificate_family_members AS f 
                ON c.id = f.bpl_certificate_id_fk
            WHERE c.id = ?
            GROUP BY c.id
        `;
        return db.query(q, [id]);
    },


    getAll: () => {
        let q = `
            SELECT 
                c.*,
                IF(COUNT(f.id), 
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', f.id,
                            'family_member_name', f.family_member_name,
                            'family_member_name_m', f.family_member_name_m,
                            'relation', f.relation,
                            'relation_m', f.relation_m,
                            'age', f.age,
                            'age_m', f.age_m
                        )
                    ), 
                    NULL
                ) AS family_members
            FROM ps_bpl_certificates AS c
            LEFT JOIN ps_bpl_certificate_family_members AS f 
                ON c.id = f.bpl_certificate_id_fk
            GROUP BY c.id
            ORDER BY c.id DESC
        `;
        return db.query(q);
    },


    saveFamilyMember: (familyMemberData) => {
        const q = `INSERT INTO ps_bpl_certificate_family_members
                    (
                        bpl_certificate_id_fk,
                        family_member_name,
                        family_member_name_m,
                        relation,
                        relation_m,
                        age,
                        age_m
                    )
                        VALUES(?, ?, ?, ?, ?, ?, ?)`

        return db.query(q,
            [
                familyMemberData.bpl_certificate_id_fk,
                familyMemberData.family_member_name,
                familyMemberData.family_member_name_m,
                familyMemberData.relation,
                familyMemberData.relation_m,
                familyMemberData.age,
                familyMemberData.age_m
            ]
        )
    },


    updateFamilyMember: (familyMemberData) => {

        const q = `UPDATE ps_bpl_certificate_family_members
               SET 
                   bpl_certificate_id_fk = ?,
                   family_member_name = ?,
                   family_member_name_m = ?,
                   relation = ?,
                   relation_m = ?,
                   age = ?,
                   age_m = ?
               WHERE id = ?`;

        return db.query(q, [
            +familyMemberData.bpl_certificate_id_fk,
            familyMemberData.family_member_name,
            familyMemberData.family_member_name_m,
            familyMemberData.relation,
            familyMemberData.relation_m,
            familyMemberData.age,
            familyMemberData.age_m,
            familyMemberData.id  // assuming 'id' is passed in familyMemberData
        ]);
    },


    deleteFamilyMember: (id) => {
        const q = `DELETE FROM ps_bpl_certificate_family_members WHERE id = ?`;
        return db.query(q, [id]);
    }

};

module.exports = bplModel;
