import axios from "axios";
import Cookies from "js-cookie";

// Base API request function
export const apiRequest = async (method, url, data = null, requiresAuth = true) => {
  // Get the authentication token if required
  const userAuthToken = requiresAuth ? Cookies.get("userAuthToken") : null;

  // If authentication is required but the token is missing, throw an auth error
  if (requiresAuth && !userAuthToken) {
    throw new Error("Authentication required. Please log in.");
  }
  try {

    // API request configuration
    const config = {
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...(userAuthToken && { Authorization: `Bearer ${userAuthToken}` }),
      },
      withCredentials: true,
    };

    // Make API request
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.response?.data?.error || "Something went wrong"
    );
  }
};


// Base API request function
export const apiRequestMultipart = async (method, url, data = null, requiresAuth = true) => {
  try {
    // Get the authentication token if required
    const userAuthToken = requiresAuth ? Cookies.get("userAuthToken") : null;

    // If authentication is required but the token is missing, throw an auth error
    if (requiresAuth && !userAuthToken) {
      throw new Error("Authentication required. Please log in.");
    }

    // API request configuration
    const config = {
      method,
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        ...(userAuthToken && { Authorization: `Bearer ${userAuthToken}` }),
      },
      withCredentials: true,
    };

    // Make API request
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.response?.data?.error || "Something went wrong"
    );
  }
};