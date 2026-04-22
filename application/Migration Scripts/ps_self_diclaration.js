const Sequelize = require("sequelize");
const sequelize = require("../config/db-connect-migration");
const certificateSubjects = require("../data/certificatesSubjects");
const ps_self_diclaration = sequelize.define(
  "ps_self_diclaration",
  {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    // name
    sd_applicantFullSelfNameE: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    sd_applicantFullSelfNameM: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },

    // parent name full
    sd_applicantFullParentNameE: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    sd_applicantFullParentNameM: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    // relation
    sd_applicantRelation: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },

    // Aadhar
    sd_applicantAadharE: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    sd_applicantAadharM: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    // Age
    sd_applicantAgeE: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    sd_applicantAgeM: {
      type: Sequelize.STRING(5),
      allowNull: true,
    },

    // Gender
    sd_applicantGender: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },

    // occupation
    sd_applicantOccupationE: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    sd_applicantOccupationM: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    // residency
    sd_applicantResidency: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },

    // Address in english
    sd_applicantAddressE: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    sd_applicantAddressM: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },

    // village
    sd_applicantVillage: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    // Taluka
    sd_applicantTaluka: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    // state
    sd_applicantState: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    // user image
    sd_user_image: {
      type: Sequelize.STRING(512),
      allowNull: true,
    },

    mobile: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },

    // ==== COMMON ==== //
    // certificate type

    certificateType: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: "रहिवासी_प्रमाणपत्र",

      // this value will be the subject_code of object in  certificateSubject which i have imported in the top of the file
    },
    // application subject is going to be common in each form

    applicationSubject: {
      type: Sequelize.STRING(400),
      allowNull: true,
    },

    certificateReason: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    applicantSignature: {
      type: Sequelize.STRING(250),
      allowNull: true,
    },

    documents: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
      comment: `जोडलेल्या कागदपत्रांची यादी (JSON array स्वरूपात):
      [
        {
          id: "",
          was_required: "",
          document_name: "",
          document_original_name: "",
          document_saved_path: ""
        }
      ]`,
    },

    // ==== 1.  UNEMPLOYED ===
    // =====================================================
    // CERTIFICATE-SPECIFIC COLUMNS (NULLABLE)
    // =====================================================

    // reason is already captured in the above column certificateReason

    // reason e.g(EDUCATION/OTHER REASON)

    // ==== 2. Residential certificate ===
    // ==== 3. Behavior certificate ===

    // this column is present in the both certificate
    residingFromYear: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },

    yearsOfResidence: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    // signature of applicant common for all the details

    // ==== 4. Electricity Connection NOC ===
    // home type e.g. मालकीच्या, वास्तव्याच्या घरास, इमारतीस
    electricityHomeType: {
      type: Sequelize.STRING(100), // मालकीचे / वास्तव्याचे / इमारत
      allowNull: true,
    },

    // === 5. Nuclear Family Certificate (विभक्त कुटुंब प्रमाणपत्र) ===
    familySeparationDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    // date_of_separation_from_joint_family (माझे कुटुंब दिनांक ........./ .......... / 20.......पासून संयुक्त कुटुंबापासून विभक्त असून स्वतंत्रपणे राहात आहे.)

    // reason of requirement

    // === 6. Occupation / Business NOC ===

    occupationPlaceOwnership: {
      type: Sequelize.STRING(20), // OWNED / RENTED
      //    मालकीच्या / भाडेतत्त्वावरील जागेमध्ये
      allowNull: true,
    },

    occupationName: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    occupationType: {
      // occupation_name
      // occupation_type e.g ((उदा. किराणा दुकान, हॉटेल, सलून, वर्कशॉप, गोदाम इ.))
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    // === 7. Toilet Use Certificate (शौचालय प्रमाणपत्र) ===
    // reason of the certificate (e.g. शासकीय कामकाज / योजना / तपासणीसाठी ) which is already taken care of in previous common column
    // === 8. Life Certificate ====
    ppoNumber: {
      //    PPO क्रमांक
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    // reason of the certificate (माझ्या नावाने सुरू असलेल्या पेन्शन / मानधन / शासकीय लाभ चालू ठेवण्यासाठी हयातीचे प्रमाणपत्र आवश्यक आहे.)

    // === 9. Certificate of Non-Availment of Benefits (कोणत्याही योजनेचा लाभ न घेतल्याचा प्रमाणपत्र):
    // scheme_or_reason (doubt) मला हे प्रमाणपत्र ...........................................(योजनेचे नाव / कारण नमूद करावे) या कारणासाठी आवश्यक आहे.

    // skipped the birth and death certificate availablity cert => already present in the software
    // === 10. Water connection ===
    // no separate column is necessary

    // === 11. NOC certificate ===

    // reason for the certificate

    // 12. Change name

    misspelledNameM: {
      type: Sequelize.STRING(200),
      defaultValue: "",
    },

    misspelledNameE: {
      type: Sequelize.STRING(200),
      defaultValue: "",
    },

    correctNameM: {
      type: Sequelize.STRING(200),
      defaultValue: "",
    },

    correctNameE: {
      type: Sequelize.STRING(200),
      defaultValue: "",
    },

    // 13. Widow

    husbandNameM: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    husbandNameE: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },

    husbandDeathDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    //14. परित्यक्ता असल्याचा स्वयंघोषणा पत्र (Deserted Woman)

    // husband name is alreayd mentioned in previous col, just aading deserted date
    // husbandNameM: {
    //   type: Sequelize.STRING(200),
    //   allowNull: true,
    // },

    // husbandNameE: {
    //   type: Sequelize.STRING(200),
    //   allowNull: true,
    // },

    // When did the husband left
    desertedSinceDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    //15.  for housing nothing is needed as of now

    // no column added

    create_date: { type: Sequelize.DATEONLY, allowNull: false },
    create_time: { type: Sequelize.TIME, allowNull: false },
  },

  {
    createdAt: false,
    updatedAt: false,
  },
);
module.exports = ps_self_diclaration;
