import apiClient from "./apiClient";

// Generic function
export const apiCall = async (method, url, data = {}, config = {}) => {
  console.log('url======>',url,data);
  
  try {
    
    const response = await apiClient({
      method,
      url,
      data,
      ...config,
    });
    return response;
  } catch (error) {
    throw error; // Let component handle error
  }
};

// Shortcuts
export const getData = (url, config) => apiCall("get", url, {}, config);
export const postData = (url, data, config) => apiCall("post", url, data, config);
export const putData = (url, data, config) => apiCall("put", url, data, config);
export const deleteData = (url, config) => apiCall("delete", url, {}, config);
