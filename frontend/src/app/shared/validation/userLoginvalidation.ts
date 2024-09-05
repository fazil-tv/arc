export interface UserLoginValues {
    email: string;
    password: string;
}

export interface ValidationErrors {
    email?: string;
    password?: string;
}

export const validateUserLogin = (values: UserLoginValues): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email format';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
};
