export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tech-spring-server.vercel.app';

/**
 * Fetch running campaigns with deadline fallback
 */
export const getRunningCampaigns = async () => {
  try {
    let response = await fetch(`${API_BASE_URL}/addCampaigns?filterByDate=true&limitToSix=true`);
    let data = await response.json();
    
    // Fallback if deadline filtering returns empty array
    if (!Array.isArray(data) || data.length === 0) {
      response = await fetch(`${API_BASE_URL}/addCampaigns?limitToSix=true`);
      data = await response.json();
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching running campaigns:", error);
    return [];
  }
};

/**
 * Fetch all campaigns with optional sorting
 */
export const getAllCampaigns = async (sortByDesc = false) => {
  const response = await fetch(`${API_BASE_URL}/addCampaigns?sortByDesc=${sortByDesc}`);
  if (!response.ok) throw new Error("Failed to fetch campaigns");
  return response.json();
};

/**
 * Fetch single campaign details by ID
 */
export const getCampaignById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/campaign/${id}`);
  if (!response.ok) throw new Error("Failed to fetch campaign details");
  return response.json();
};

/**
 * Fetch user specific campaigns
 */
export const getUserCampaigns = async (email) => {
  const response = await fetch(`${API_BASE_URL}/campaigns/${email}`);
  if (!response.ok) throw new Error("Failed to fetch user campaigns");
  return response.json();
};

/**
 * Fetch user specific donations
 */
export const getUserDonations = async (email) => {
  const response = await fetch(`${API_BASE_URL}/mydonations/emailSpecific/${email}`);
  if (!response.ok) throw new Error("Failed to fetch user donations");
  return response.json();
};
