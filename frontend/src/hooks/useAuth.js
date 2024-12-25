import { useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode'; // Install with `npm install jwt-decode`
import { fetchData } from '../utils/api'; // Custom API service for making API calls

/**
 * Custom hook for managing user authentication.
 * Handles token validation, user roles, and token refresh.
 */
function useAuth() {
    const [user, setUser] = useState(null); // Stores user information
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
    const [loading, setLoading] = useState(true); // Loading state during validation
    const [error, setError] = useState(null); // Error state

    const validateToken = useCallback(async (token) => {
        try {
            // Decode the token to extract user info
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();
            if (isExpired) {
                // Refresh token if expired
                await refreshToken();
                return false;
            }
            setUser(decoded); // Set user details
            setIsAuthenticated(true); // Update auth state
            return true;
        } catch (err) {
            console.error('Token validation failed:', err);
            setError('Invalid or expired token');
            setIsAuthenticated(false);
            setUser(null);
            return false;
        }
    }, []);

    const refreshToken = useCallback(async () => {
        try {
            const response = await fetchData('/auth/refresh', {
                method: 'POST',
                credentials: 'include', // Ensures cookies are sent with the request
            });
            if (response.token) {
                localStorage.setItem('authToken', response.token); // Update token
                await validateToken(response.token); // Re-validate the new token
            }
        } catch (err) {
            console.error('Token refresh failed:', err);
            setError('Unable to refresh token');
            logout(); // Force logout on failure
        }
    }, [validateToken]);

    const login = async (credentials) => {
        try {
            const response = await fetchData('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (response.token) {
                localStorage.setItem('authToken', response.token); // Store token
                await validateToken(response.token); // Validate token after login
            } else {
                setError('Invalid login response');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login error');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Remove token from storage
        setIsAuthenticated(false); // Reset auth state
        setUser(null); // Clear user data
        fetchData('/auth/logout', { method: 'POST' }).catch((err) =>
            console.error('Logout API failed:', err)
        );
    };

    const hasRole = (role) => {
        return user?.roles?.includes(role); // Check if user has a specific role
    };

    // Effect to validate token on initial load
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                await validateToken(token);
            }
            setLoading(false); // Set loading to false after validation
        };
        initAuth();
    }, [validateToken]);

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        hasRole,
    };
}

export default useAuth;
