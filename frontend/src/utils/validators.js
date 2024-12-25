// src/utils/validators.js

// Validate email format
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength
export function validatePassword(password) {
    // Minimum 8 characters, at least one uppercase, one lowercase, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

// Check if a field is empty
export function isEmpty(value) {
    return value.trim().length === 0;
}

// Validate username (alphanumeric and underscores, 3-16 characters)
export function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
}

// General form validation
export function validateForm(fields) {
    const errors = {};
    Object.entries(fields).forEach(([key, value]) => {
        if (isEmpty(value)) {
            errors[key] = 'This field is required.';
        }
    });
    return errors;
}
