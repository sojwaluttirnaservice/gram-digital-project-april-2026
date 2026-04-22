const axios = require("axios");

const nodeEnv = process.env.PROJECT_ENV;

/**
 * Fetch Instagram user data using Instagram Graph API
 *
 * @param {string} igId - The Instagram Graph API User ID (numeric string)
 * @param {string} accessToken - Access token to authenticate with Instagram Graph API
 * @returns {Promise<Object>} Instagram user data
 *
 * @throws Will throw an error if the API request fails or returns an error
 */

const fields = [
  "id",
  "username",
  "name",
  "biography",
  "followers_count",
  "follows_count",
  "media_count",
  "profile_picture_url",
  "media.limit(50){id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count}",
];

const getIgUserData = async (igId, accessToken) => {
  // Validate igId
  if (!/^\d+$/.test(igId)) {
    throw new Error("Invalid Instagram ID. It must be a numeric string.");
  }

  const igBaseUrl = "https://graph.instagram.com/v24.0";
  const url = `${igBaseUrl}/${igId}?fields=${encodeURIComponent(
    fields.join(",")
  )}&access_token=${encodeURIComponent(accessToken)}`;

  try {
    const response = await axios.get(url);

    console.log("Instagram User Data:", response.data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.error?.message ||
      error.response?.statusText ||
      error.message;

    console.error("Error fetching Instagram user:", message);
    // throw new Error(`Instagram API Error: ${message}`);
  }
};

const getIgUser = async (req) => {
  try {
    // Build full URL
    // let fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

    // host here will print the baseUrl of domain like for e.g. https://www.google.com,
    //  hten req.get('host') will give only www.google.com
    // then req.originalUrl ==> gives the endpoint
    let fullUrl = `https://${req.get("host")}${req.originalUrl}`;
    fullUrl = fullUrl.trim().replace(/\/+$/, "");

    // Choose base URL depending on environment
    const baseUrl =
      nodeEnv !== "DEV" ? "http://localhost:3000" : "https://g-seva.com";

    const apiUrl = `${baseUrl}/social-media/ig/credentials?w=${encodeURIComponent(
      fullUrl
    )}`;

    // Axios handles JSON automatically (no .json() needed)
    const response = await axios.get(apiUrl);
    const data = response.data?.data;

    if (!data) return null;

    const { socialAccount } = data;
    if (!socialAccount) return null;

    return getIgUserData(socialAccount.ig_id, socialAccount.ig_access_token);
  } catch (err) {
    console.error("Error:", err.message || err);
    return null;
  }
};

module.exports = { getIgUser };
