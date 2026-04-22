const birthCertificateEvidences = [
    {
        key: "BIRTH_CERTIFICATE",
        mr: "जन्म दाखला",
        hi: "जन्म प्रमाण पत्र",
        en: "Birth Certificate"
    },
    {
        key: "LEAVING_CERTIFICATE",
        mr: "शाळा सोडल्याचा दाखला",
        hi: "स्कूल लीविंग सर्टिफिकेट",
        en: "School Leaving Certificate"
    },
    {
        key: "TENTH_CERTIFICATE",
        mr: "10वी प्रमाणपत्र",
        hi: "10वीं प्रमाण पत्र",
        en: "10th Certificate"
    },
    {
        key: "PASSPORT",
        mr: "पासपोर्ट",
        hi: "पासपोर्ट",
        en: "Passport"
    }
];

const identityProofs = [
    {
        key: "AADHAR_CARD",
        mr: "आधार कार्ड",
        hi: "आधार कार्ड",
        en: "Aadhar Card"
    },
    {
        key: "PAN_CARD",
        mr: "पॅन कार्ड",
        hi: "पैन कार्ड",
        en: "PAN Card"
    },
    {
        key: "VOTER_ID",
        mr: "मतदार ओळखपत्र",
        hi: "मतदाता पहचान पत्र",
        en: "Voter ID Card"
    },
    {
        key: "PASSPORT",
        mr: "पासपोर्ट",
        hi: "पासपोर्ट",
        en: "Passport"
    }
];

const addressProofs = [
    {
        key: "AADHAR_CARD",
        mr: "आधार कार्ड",
        hi: "आधार कार्ड",
        en: "Aadhar Card"
    },
    {
        key: "ELECTRICITY_BILL",
        mr: "लाईट बिल",
        hi: "बिजली बिल",
        en: "Electricity Bill"
    },
    {
        key: "RENT_AGREEMENT",
        mr: "भाडे करार",
        hi: "किराया अनुबंध",
        en: "Rent Agreement"
    },
    {
        key: "RATION_CARD",
        mr: "रेशन कार्ड",
        hi: "राशन कार्ड",
        en: "Ration Card"
    }
];

const photoRequirements = [
    {
        key: "PASSPORT_SIZE_PHOTOS",
        mr: "वधू-वरांचे पासपोर्ट साईज फोटो – 5 ते 7",
        hi: "दूल्हा-दुल्हन के पासपोर्ट साइज फोटो – 5 से 7",
        en: "Bride & Groom Passport Size Photos – 5 to 7"
    },
    {
        key: "MARRIAGE_CEREMONY_PHOTOS",
        mr: "विवाह सोहळ्याचे फोटो – 2 ते 3",
        hi: "विवाह समारोह के फोटो – 2 से 3",
        en: "Marriage Ceremony Photos – 2 to 3"
    }
];

const witnessRequirements = [
    {
        key: "WITNESS_ID_PROOF",
        mr: "आधार / मतदान कार्ड",
        hi: "आधार / वोटर आईडी",
        en: "Aadhar / Voter ID"
    },
    {
        key: "WITNESS_ADDRESS_PROOF",
        mr: "पत्ता पुरावा",
        hi: "पता प्रमाण",
        en: "Address Proof"
    },
    {
        key: "WITNESS_PHOTO",
        mr: "फोटो",
        hi: "फोटो",
        en: "Photograph"
    }
];

const marriageRelatedProofs = [
    {
        key: "INVITATION_CARD",
        mr: "लग्नपत्रिका (असल्यास)",
        hi: "निमंत्रण पत्र (यदि उपलब्ध)",
        en: "Marriage Invitation Card (If Available)"
    },
    {
        key: "MARRIAGE_VENUE_PROOF",
        mr: "विवाहस्थळाचा पुरावा",
        hi: "विवाह स्थल प्रमाण",
        en: "Marriage Venue Proof"
    },
    {
        key: "MARRIAGE_CERTIFICATE_AUTHORITY",
        mr: "विवाह झाल्याचे प्रमाणपत्र (मंदिर / काजी / पंडित)",
        hi: "विवाह प्रमाण पत्र (मंदिर / काजी / पंडित)",
        en: "Marriage Certificate from Temple / Kazi / Priest"
    }
];

module.exports = {
    birthCertificateEvidences,
    identityProofs,
    addressProofs,
    photoRequirements,
    witnessRequirements,
    marriageRelatedProofs
};
