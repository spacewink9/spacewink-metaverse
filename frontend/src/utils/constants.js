// src/utils/constants.js

// Application-wide constants
export const APP_NAME = 'Spacewink Metaverse';
export const APP_VERSION = '1.0.0';
export const SUPPORT_EMAIL = 'support@spacewink.com';

// API configuration
export const API_BASE_URL = 'https://api.spacewink.com';
export const AUTH_TOKEN_KEY = 'authToken';

// Default settings
export const DEFAULT_THEME = 'light';
export const PAGINATION_LIMIT = 10;

// Error messages
export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    NETWORK_ERROR: 'Unable to connect to the server. Please try again later.',
};

// Success messages
export const SUCCESS_MESSAGES = {
    ACCOUNT_CREATED: 'Your account has been created successfully!',
    PASSWORD_UPDATED: 'Your password has been updated.',
};

// Routes
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',
};

// Environment-based configurations
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_DEVELOPMENT = ENVIRONMENT === 'development';
