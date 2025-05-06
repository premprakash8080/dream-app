// src/api/errorHandler.js
export const handleApiError = (error) => {
    if (error.response) {
      // Server responded with error
      return error.response.data.message;
    } else if (error.request) {
      // Request made but no response
      return 'Network error. Please check your connection.';
    } else {
      // Other errors
      return 'An unexpected error occurred.';
    }
  };