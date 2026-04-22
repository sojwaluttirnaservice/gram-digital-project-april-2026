const committeesModel = require("../../model/gp/committeesModel");
const { sendApiResponse, sendApiError } = require("../../utils/apiResponses");
const asyncHandler = require("../../utils/asyncHandler");
const generateUniqueFileName = require("../../utils/generateFileName");
const { saveFile, deleteFile } = require("../../utils/saveFile");
const { renderPage } = require("../../utils/sendResponse");
const { baseDir } = require("../createBaseDir");

const committeesController = {

    renderCommitteeListPage: asyncHandler(async (req, res) => {
        let committees = await committeesModel.getAllCommitteesWithMembersCount(res.pool)
        console.log(committees)
        renderPage(res, 'user/gp/committees/committees-list-page.pug', {
            committees
        })
    }),

    renderAddCommiteePage: asyncHandler(async (req, res) => {
        renderPage(res, 'user/gp/committees/add-committee-page.pug', {
            title: 'समिती जोडा'
        })
    }),

    renderEditCommiteePage: asyncHandler(async (req, res) => {
        let { committeeId } = req.params
        const [committee] = await committeesModel.getCommitteeById(res.pool, committeeId)
        renderPage(res, 'user/gp/committees/edit-committee-page.pug', {
            committee
        })
    }),


    renderEditCommitteePage: asyncHandler(async (req, res) => {

    }),

    renderCommitteeMembersListPage: asyncHandler(async (req, res) => {
        let { committeeId } = req.params


        let [committee] = await committeesModel.getCommitteeWithMembers(res.pool, committeeId)

        // console.log(committee)
        renderPage(res, 'user/gp/committees/committee-memebers-list-page.pug', {
            committee
        })
    }),

    renderAddCommitteeMemberPage: asyncHandler(async (req, res) => {
        let { committeeId } = req.params

        let [committee] = await committeesModel.getCommitteeWithMembers(res.pool, committeeId)

        renderPage(res, 'user/gp/committees/add-committee-memeber-page.pug', {
            title: 'समिती सदस्य जोडा',
            committee
        })
    }),
    renderEditCommitteeMemberPage: asyncHandler(async (req, res) => {
        let { memberId } = req.params

        const [committeeMember] = await committeesModel.getCommitteeMember(res.pool, memberId)

        let [committee] = await committeesModel.getCommitteeWithMembers(res.pool, committeeMember?.committee_id_fk)

        renderPage(res, 'user/gp/committees/edit-committee-memeber-page.pug', {
            title: 'समिती सदस्य जोडा',
            committee,
            committeeMember
        })
    }),
    // Add a new committee
    addCommittee: asyncHandler(async (req, res) => {
        const committee = req.body;

        const result = await committeesModel.addCommittee(res.pool, committee);

        if (result.affectedRows) {
            return sendApiResponse(res, 201, true, "समिती जतन झाली.");
        } else {
            return sendApiError(res, 400, false, "समिती जतन नाही झाली.");
        }
    }),

    // Update committee
    updateCommittee: asyncHandler(async (req, res) => {
        const updatedCommittee = req.body;

        const result = await committeesModel.updateCommittee(res.pool, updatedCommittee);

        if (result.affectedRows) {
            return sendApiResponse(res, 200, true, "समिती अद्ययावत झाली.");
        } else {
            return sendApiError(res, 400, false, "समिती अद्ययावत नाही झाली.");
        }
    }),

    // Delete committee
    deleteCommittee: asyncHandler(async (req, res) => {
        console.log('ddddddddddddd')
        const { id } = req.body;

        console.log(req.body)

        const result = await committeesModel.deleteCommittee(res.pool, id);


        console.log(result)

        if (result.affectedRows) {
            return sendApiResponse(res, 200, true, "समिती हटवली गेली.");
        } else {
            return sendApiError(res, 404, false, "समिती सापडली नाही.");
        }
    }),

    // Get all committees with their members
    getAllCommitteesWithMembers: asyncHandler(async (req, res) => {
        const data = await committeesModel.getAllCommitteesWithMembers(res.pool);

        return sendApiResponse(res, 200, true, "सर्व समित्या मिळाल्या.", data);
    }),

    // Add committee member
    addCommitteeMember: asyncHandler(async (req, res) => {
        let member = req.body;


        let memberPhoto = req.files?.memberPhoto

        let committeeMemberPhotosDir = `${baseDir}/uploads/images/committees/committeeMembers`
        if (memberPhoto) {
            let memberPhotoName = generateUniqueFileName(memberPhoto, 'committeeMember')
            let savePath = `${committeeMemberPhotosDir}/${memberPhotoName}`
            member = { ...member, profile_image_name: memberPhotoName }

            await saveFile(memberPhoto, savePath)
        }

        const result = await committeesModel.addCommitteeMember(res.pool, member);

        if (result.affectedRows) {
            return sendApiResponse(res, 201, true, "सदस्य जतन झाला.");
        } else {
            return sendApiError(res, 400, false, "सदस्य जतन नाही झाला.");
        }
    }),

    // Update committee member
    updateCommitteeMember: asyncHandler(async (req, res) => {
        let member = req.body;


        let [existingMemberDetails] = await committeesModel.getCommitteeMember(res.pool, member.id)

        let memberPhoto = req.files?.memberPhoto

        let committeeMemberPhotosDir = `${baseDir}/uploads/images/committees/committeeMembers`
        if (memberPhoto) {
            let memberPhotoName = generateUniqueFileName(memberPhoto, 'committeeMember')
            let savePath = `${committeeMemberPhotosDir}/${memberPhotoName}`
            member = { ...member, profile_image_name: memberPhotoName }

            await saveFile(memberPhoto, savePath)
        } else {
            member = { ...member, profile_image_name: existingMemberDetails?.profile_image_name }
        }

        const result = await committeesModel.updateCommitteeMember(res.pool, member);

        if (result.affectedRows) {
            return sendApiResponse(res, 200, true, "सदस्य अद्ययावत झाला.");
        } else {
            return sendApiError(res, 400, false, "सदस्य अद्ययावत नाही झाला.");
        }
    }),

    // Delete committee member
    deleteCommitteeMember: asyncHandler(async (req, res) => {
        const { id } = req.body;


        let [existingMemberDetails] = await committeesModel.getCommitteeMember(res.pool, id)



        let committeeMemberPhotosDir = `${baseDir}/uploads/images/committees/committeeMembers`

        let removePath = `${committeeMemberPhotosDir}/${existingMemberDetails.profile_image_name}`


        await deleteFile(removePath);

        const result = await committeesModel.deleteCommitteeMember(res.pool, id);
        if (result.affectedRows) {
            return sendApiResponse(res, 200, true, "सदस्य हटवला गेला.");
        } else {
            return sendApiError(res, 404, false, "सदस्य सापडला नाही.");
        }
    }),

    // Get all committee members
    getAllCommitteeMembers: asyncHandler(async (req, res) => {
        const data = await committeesModel.getAllCommitteMembers(res.pool);

        return sendApiResponse(res, 200, true, "सर्व सदस्य मिळाले.", data);
    }),
};

module.exports = committeesController;
