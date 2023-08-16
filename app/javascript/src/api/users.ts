import axios from "axios";

export const getCurrentUserId = async (): Promise<number> => {
  try {
    const response = await axios.get("/current_user_info");
    return response.data.user_id;
  } catch (error) {
    console.error("Error fetching current user's ID:", error);
    throw error;
  }
};
