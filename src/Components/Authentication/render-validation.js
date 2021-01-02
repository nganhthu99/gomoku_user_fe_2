export const validateUsernameUtil = (username) => {
    return (username.length >= 6)
}

export const validateEmailUtil = (email) => {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
}

export const validatePasswordUtil = (password) => {
    return (password.length >= 8)
}

export const validateConfirmPasswordUtil = (confirmPassword, password) => {
    return (confirmPassword === password)
}

export const renderUsernameValidation = (username) => {
    if (username && !validateUsernameUtil(username)) {
        return 'Username should have at least 6 characters'
    }
}

export const renderEmailValidation = (email) => {
    if (email && !validateEmailUtil(email)) {
        return 'Invalid email address'
    }
}

export const renderPasswordValidation = (password) => {
    if (password && !validatePasswordUtil(password)) {
        return 'Password should have at least 8 characters'
    }
}

export const renderConfirmPasswordValidation = (confirmPassword, password) => {
    if (confirmPassword && !validateConfirmPasswordUtil(confirmPassword, password)) {
        return `Confirm password isn't matched with password`
    }
}
