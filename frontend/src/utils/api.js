/**
 * API Utility Module for Spacewink Metaverse
 * Provides a centralized service for interacting with backend APIs.
 * Includes token management, dynamic headers, and robust error handling.
 */

export const API_BASE_URL = 'https://api.spacewink.com'; // Base URL for API endpoints

/**
 * Helper function to get authentication token from localStorage.
 * @returns {string|null} JWT token if available, otherwise null.
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Helper function to generate headers for API requests.
 * @param {boolean} isAuthRequired - Whether to include the Authorization header.
 * @returns {object} Headers object for API requests.
 */
function getHeaders(isAuthRequired = true) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (isAuthRequired) {
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
}

/**
 * Generalized function to handle API requests.
 * @param {string} endpoint - The API endpoint to call (relative to `API_BASE_URL`).
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE).
 * @param {object|null} body - Data to send in the request body (for POST/PUT).
 * @param {boolean} isAuthRequired - Whether the request requires authentication.
 * @returns {Promise<object>} Resolves to the response data or throws an error.
 */
async function apiRequest(endpoint, method = 'GET', body = null, isAuthRequired = true) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: getHeaders(isAuthRequired),
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `API Error: ${errorData.message || response.statusText} (Status: ${response.status})`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`API Request Failed: ${error.message}`);
        throw error; // Re-throw to handle in calling functions
    }
}

/**
 * Fetch data from a GET endpoint.
 * @param {string} endpoint - The API endpoint to fetch from.
 * @param {boolean} isAuthRequired - Whether the request requires authentication.
 * @returns {Promise<object>} Resolves to the response data.
 */
export async function fetchData(endpoint, isAuthRequired = true) {
    return apiRequest(endpoint, 'GET', null, isAuthRequired);
}

/**
 * Send data to a POST endpoint.
 * @param {string} endpoint - The API endpoint to send data to.
 * @param {object} data - Data to include in the POST request body.
 * @param {boolean} isAuthRequired - Whether the request requires authentication.
 * @returns {Promise<object>} Resolves to the response data.
 */
export async function postData(endpoint, data, isAuthRequired = true) {
    return apiRequest(endpoint, 'POST', data, isAuthRequired);
}

/**
 * Update data using a PUT endpoint.
 * @param {string} endpoint - The API endpoint to update data.
 * @param {object} data - Data to include in the PUT request body.
 * @param {boolean} isAuthRequired - Whether the request requires authentication.
 * @returns {Promise<object>} Resolves to the response data.
 */
export async function putData(endpoint, data, isAuthRequired = true) {
    return apiRequest(endpoint, 'PUT', data, isAuthRequired);
}

/**
 * Delete data using a DELETE endpoint.
 * @param {string} endpoint - The API endpoint to delete data.
 * @param {boolean} isAuthRequired - Whether the request requires authentication.
 * @returns {Promise<object>} Resolves to the response data.
 */
export async function deleteData(endpoint, isAuthRequired = true) {
    return apiRequest(endpoint, 'DELETE', null, isAuthRequired);
}

/**
 * Utility function to upload a file to the server.
 * @param {string} endpoint - The API endpoint for file upload.
 * @param {File} file - The file to upload.
 * @param {boolean} isAuthRequired - Whether the request requires authentication.
 * @returns {Promise<object>} Resolves to the response data.
 */
export async function uploadFile(endpoint, file, isAuthRequired = true) {
    const url = `${API_BASE_URL}${endpoint}`;
    const formData = new FormData();
    formData.append('file', file);

    const options = {
        method: 'POST',
        headers: isAuthRequired ? { Authorization: `Bearer ${getAuthToken()}` } : {},
        body: formData,
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `File Upload Error: ${errorData.message || response.statusText} (Status: ${response.status})`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`File Upload Failed: ${error.message}`);
        throw error;
    }
}

