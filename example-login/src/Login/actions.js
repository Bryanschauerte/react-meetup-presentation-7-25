export const USER_LOGIN_START = 'LOGIN/USER_LOGIN_START';
export const USER_LOGOUT = 'LOGIN/USER_LOGOUT';
export const USER_LOGIN_SUCCESS = 'LOGIN/USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'LOGIN/USER_LOGIN_FAIL';
export const UPDATE_EMAIL = 'LOGIN/UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'LOGIN/UPDATE_PASSWORD';
export const CREATE_USER = 'LOGIN/CREATE_USER';
export const UPDATE_VALIDATION_CODE = 'LOGIN/UPDATE_VALIDATION_CODE';
export const SUBMIT_VALIDATION_CODE = 'LOGIN/SUBMIT_VALIDATION_CODE';
export const UPDATE_CONFIRM_PASSWORD = 'LOGIN/UPDATE_CONFIRM_PASSWORD';
export const SUBMIT_VALIDATION_CODE_FAILURE = 'LOGIN/SUBMIT_VALIDATION_CODE_FAILURE';
export const SUBMIT_VALIDATION_CODE_SUCCESS = 'LOGIN/SUBMIT_VALIDATION_CODE_SUCCESS';

export const userLogin = (email, password) => {
    return {
        payload: {
            email:email,
            password:password
        },
        type: USER_LOGIN_START
    };
};

export const createUser = (email, password, confimPassword) => {
    return {
        type: CREATE_USER
    };
};

export const updateUserValidationCode = (validationCode) => {
    return {
        payload: validationCode,
        type: UPDATE_VALIDATION_CODE
    };
};

export const submitValidationCode = () => {
    return {
        type: SUBMIT_VALIDATION_CODE
    };
};

export const updateEmail = (email) => {
    return {
        payload: {
            email
        },
        type: UPDATE_EMAIL
    };
};

export const updatePassword = (password) => {

    return {
        payload: {
            password
        },
        type: UPDATE_PASSWORD
    };
};
export const updateConfirmPassword = (confirmPassword) => {

    return {
        payload: {
            confirmPassword
        },
        type: UPDATE_CONFIRM_PASSWORD
    };
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    };
};

export const userLoginSuccess = (user) => {
    console.log(user, 'SUCC');

    return {
        payload:{
            user
        },
        type: USER_LOGIN_SUCCESS
    };
};
export const userLoginFail = (error) => {
    return {
        type: USER_LOGIN_FAIL,
        payload: error
    };
};
