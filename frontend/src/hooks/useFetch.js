import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to fetch data from an API with advanced features like error handling,
 * caching, and dynamic request options.
 *
 * @param {string} initialUrl - The initial URL for the API request.
 * @param {Object} initialOptions - Optional: Fetch options (method, headers, body, etc.).
 * @returns {Object} - { data, loading, error, refetch }
 */
const useFetch = (initialUrl, initialOptions = {}) => {
    const [url, setUrl] = useState(initialUrl); // API URL
    const [options, setOptions] = useState(initialOptions); // Request options
    const [data, setData] = useState(null); // Response data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [cache, setCache] = useState(new Map()); // Cache for storing API responses

    /**
     * Fetches data from the given URL using the specified options.
     * Implements caching to avoid redundant API calls.
     */
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        const cacheKey = `${url}:${JSON.stringify(options)}`;
        // Check if the response is already cached
        if (cache.has(cacheKey)) {
            setData(cache.get(cacheKey));
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(url, options);

            // Handle HTTP errors
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setData(responseData);

            // Store the response in the cache
            setCache((prevCache) => new Map(prevCache).set(cacheKey, responseData));
        } catch (fetchError) {
            setError(fetchError.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [url, options, cache]);

    /**
     * Refetches data manually with a new URL or options.
     * @param {string} newUrl - Optional: New API URL for the request.
     * @param {Object} newOptions - Optional: New request options.
     */
    const refetch = (newUrl = url, newOptions = options) => {
        setUrl(newUrl);
        setOptions(newOptions);
    };

    // Automatically fetch data when the hook is first mounted or when URL/options change
    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, options, fetchData]);

    return { data, loading, error, refetch };
};

export default useFetch;
