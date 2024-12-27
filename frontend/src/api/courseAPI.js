import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const createCourse = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating course:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;  
  } catch (error) {
    console.error("Error retrieving courses:", error.response ? error.response.data : error.message);
    throw error;
  }
};