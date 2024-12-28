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
    console.error(
      "Error retrieving courses:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateCourse = async (id, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating course:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting course:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
