// payment-types.js
// Centralized payment_for mapping for Grampanchayat project
// Created on 11 March 2026 12:32

/**
 * @typedef {Object} PaymentType
 * @property {number} payment_for
 * @property {string} pramanpatra_name
 * @property {boolean} show
 */

let samanyaCategory = "SAMANYA";
let paaniCategory = "PAANI";
let certificatesCategory = "CERTIFICATE";

const paymentTypesArray = [
  // ==========================================================
  // CORE PAYMENT TYPES (DO NOT MODIFY FIRST 6)
  // ==========================================================
  {
    payment_for: 1,
    pramanpatra_name: "सामान्य कर भरणा",
    categories: [samanyaCategory],
    show: true,
  },
  {
    payment_for: 2,
    pramanpatra_name: "पाणी कर भरणा",
    categories: [paaniCategory],
    show: true,
  },
  {
    payment_for: 3,
    pramanpatra_name: "विवाह नोंदणी प्रमाणपत्र",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 4,
    pramanpatra_name: "रहिवासी स्वयंघोषितपत्र",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 5,
    pramanpatra_name: "नमुना ८ प्रिंट",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 6,
    pramanpatra_name: "थकबाकी/निराधार प्रमाणपत्र",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },

  // ==========================================================
  // CERTIFICATES
  // ==========================================================
  {
    payment_for: 7,
    pramanpatra_name: "जन्म प्रमाणपत्र",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 8,
    pramanpatra_name: "मृत्यू प्रमाणपत्र",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 9,
    pramanpatra_name: "BPL प्रमाणपत्र",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },


//   namuna 7 options
  {
    payment_for: 10,
    pramanpatra_name: "फेरफार फी"
  },
  
  {
    payment_for: 11,
    pramanpatra_name: "निविदा फी"
  },

  {
    payment_for: 12,
    pramanpatra_name: "बायाना रक्कम (अनामत)"
  },

  {
    payment_for: 13,
    pramanpatra_name: "अनुदान रक्कम",
  },

  {
    payment_for: 14,
    pramanpatra_name: "कोंडवाडा व इतर फी",
  },

  {
    payment_for: 15,
    pramanpatra_name: "इतर फी",
  },

  {
    payment_for: 16,
    pramanpatra_name: "नळ कनेक्शन फी",  
  },

  // ==========================================================
  // LAND / ADMIN
  // ==========================================================


  /**
  {
    payment_for: 10,
    pramanpatra_name: "फेरफार फी",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  

  {
    payment_for: 11,
    pramanpatra_name: "निविदा फी",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 12,
    pramanpatra_name: "निविदा फी (पाणी)",
    categories: [paaniCategory, certificatesCategory],
    show: true,
  },

  {
    payment_for: 13,
    pramanpatra_name: "बायाना रक्कम (अनामत) (सामान्य)",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 14,
    pramanpatra_name: "बायाना रक्कम (अनामत) (पाणी)",
    categories: [paaniCategory, certificatesCategory],
    show: true,
  },

  {
    payment_for: 15,
    pramanpatra_name: "अनुदान रक्कम (सामान्य)",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 16,
    pramanpatra_name: "अनुदान रक्कम (पाणी)",
    categories: [paaniCategory, certificatesCategory],
    show: true,
  },

  // ==========================================================
  // WATER RELATED
  // ==========================================================
  {
    payment_for: 17,
    pramanpatra_name: "नळ कनेक्शन फी (पाणी)",
    categories: [paaniCategory, certificatesCategory],
    show: true,
  },

  // Added later

  // include thsi in samanya too
  {
    payment_for: 18,
    pramanpatra_name: "कोंडवाडा व इतर फी(सामान्य)",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },

  {
    payment_for: 19,
    pramanpatra_name: "इतर फी (सामान्य)",
    categories: [samanyaCategory, certificatesCategory],
    show: true,
  },
  {
    payment_for: 20,
    pramanpatra_name: "इतर फी (पाणी)",
    categories: [paaniCategory, certificatesCategory],
    show: true,
  },

  */
];
/**
 * Hashmap for fast lookup of payment type names by payment_for ID.
 * Key: payment_for ID
 * Value: pramanpatra_name
 * @type {Object.<number, string>}
 */
const paymentTypesMap = paymentTypesArray.reduce((map, entry) => {
  map[entry.payment_for] = entry.pramanpatra_name;
  return map;
}, {});

function getPaymentTypesByIds(ids) {
  if (!Array.isArray(ids)) return [];
  return paymentTypesArray.filter((entry) => ids.includes(entry.payment_for));
}




// ===================================================
// *
// * Exporting the payment types data and helper function
// *
// ===================================================

// --------------------------------------
// Precomputed Arrays and Sets
// --------------------------------------

// Only one category
const onlyCertificates = paymentTypesArray
  .filter(p => p.categories?.length === 1 && p.categories.includes(certificatesCategory))
  .map(p => p.payment_for)
  .sort((a,b)=>a-b);

const onlySamanya = paymentTypesArray
  .filter(p => p.categories?.length === 1 && p.categories.includes(samanyaCategory))
  .map(p => p.payment_for)
  .sort((a,b)=>a-b);

const onlyPaani = paymentTypesArray
  .filter(p => p.categories?.length === 1 && p.categories.includes(paaniCategory))
  .map(p => p.payment_for)
  .sort((a,b)=>a-b);


// Both categories required
const samanyaAndCertificates = paymentTypesArray
  .filter(p => p.categories?.includes(samanyaCategory) && p.categories.includes(certificatesCategory))
  .map(p => p.payment_for)
  .sort((a,b)=>a-b);


const paaniAndCertificates = paymentTypesArray
  .filter(p => p.categories?.includes(paaniCategory) && p.categories.includes(certificatesCategory))
  .map(p => p.payment_for)
  .sort((a,b)=>a-b);


// Sets for O(1) lookup
const onlyCertificatesSet = new Set(onlyCertificates);
const onlySamanyaSet = new Set(onlySamanya);
const onlyPaaniSet = new Set(onlyPaani);
const samanyaAndCertificatesSet = new Set(samanyaAndCertificates);
const paaniAndCertificatesSet = new Set(paaniAndCertificates);




// --------------------------------------
// Helper functions
// --------------------------------------
function isPaymentForOnlyCertificates(id) { return onlyCertificatesSet.has(+id); }
function isPaymentForOnlySamanya(id) { return onlySamanyaSet.has(+id); }
function isPaymentForOnlyPaani(id) { return onlyPaaniSet.has(+id); }
function isPaymentForSamanyaAndCertificates(id) { return samanyaAndCertificatesSet.has(+id); }
function isPaymentForPaaniAndCertificates(id) { return paaniAndCertificatesSet.has(+id); }




// Export both array, map, and helper function using CommonJS
module.exports = {
  paymentTypesArray,
  paymentTypesMap,
  getPaymentTypesByIds,

 

  // precomputed arrays
  onlyCertificates,
  onlySamanya,
  onlyPaani,
  samanyaAndCertificates,
  paaniAndCertificates,


  // helper functions
  isPaymentForOnlyCertificates,
  isPaymentForOnlySamanya,
  isPaymentForOnlyPaani,
  isPaymentForSamanyaAndCertificates,
  isPaymentForPaaniAndCertificates,
};
