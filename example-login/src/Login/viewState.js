import {
    CREATE_USER,
    SUBMIT_VALIDATION_CODE,
    SUBMIT_VALIDATION_CODE_SUCCESS,
    SUBMIT_VALIDATION_CODE_FAILURE,
    USER_LOGIN_START,
    USER_LOGOUT,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
} from './actions';
import { createSelector } from 'reselect';
import _get from 'lodash/get';
import deepEquals from 'deep-equals';
import { getViewStateByName } from '../StateConfig/viewStates';

export default function viewState(state = { view:'SIGNIN_VIEW' }, action = {}){
    let newState;
    switch (action.type) {

        case USER_LOGIN_START:
            newState = {
                loggedIn: true,
                ...state
            };

            return deepEquals(newState, state) ? state : newState;

        case CREATE_USER:
            newState = {
                ...state,
                loggedIn: true
            };

            return deepEquals(newState, state) ? state : newState;
        case SUBMIT_VALIDATION_CODE:
            newState = {
                validationCodeSubmitted: true,
                validationCodeValid: null,
                ...state
            };

            return deepEquals(newState, state) ? state : newState;

        case SUBMIT_VALIDATION_CODE_FAILURE:
            newState = {
                validationCodeSubmitted: true,
                validationCodeValid: false,
                ...state
            };

            return deepEquals(newState, state) ? state : newState;

        case SUBMIT_VALIDATION_CODE_SUCCESS:
            newState = {
                validationCodeSubmitted: true,
                validationCodeValid: true,
                ...state
            };

            return deepEquals(newState, state) ? state : newState;

        case USER_LOGOUT:
            newState = {
                ...state,
                email: '',
                loggedIn: false,
                password: ''
            };

            return deepEquals(newState, state) ? state : newState;
        case USER_LOGIN_SUCCESS:
            newState = {
                ...state,
                loggedIn: true,
                user: action.payload.user,
                errors: null
            };

            return deepEquals(newState, state) ? state : newState;

        case USER_LOGIN_FAIL:
            newState = {
                ...state,
                loggedIn: false,
                errors: action.payload
            };

            return deepEquals(newState, state) ? state : newState;
        default:
            return state;
    }
}
export const getLoginState = createSelector(
    state => state,
    state => getViewStateByName(state, 'loginState')
);

export const getEmail = createSelector(
    getLoginState,
    viewState => _get(viewState, 'email')
);

export const getUser = createSelector(
    getLoginState,
    viewState => _get(viewState, 'user')
);

export const getConfirmPassword = createSelector(
    getLoginState,
    viewState => _get(viewState, 'confirmPassword')
);


const comparePasswordAndConfirm = (viewState) => {
    const password =  _get(viewState, 'password');
    const confirmPassword = _get(viewState, 'confirmPassword');
    if (password && confirmPassword){
        if (password === confirmPassword){
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

const checkValidationCode = (viewstate) => {
    const validationCode = _get(viewstate, 'validationCode');
    if (validationCode.length) {
        return validationCode.length > 4 && typeof(validationCode) === 'number'
            ? true : false;
    }

    return false;
};

export const canSubmit = createSelector(
    getLoginState,
    viewState => comparePasswordAndConfirm(viewState)
);

export const canSubmitValidationCode = createSelector(
    getLoginState,
    viewState => checkValidationCode(viewState)
);

export const getLoggedIn = createSelector(
    getLoginState,
    viewState => _get(viewState, 'loggedIn')

);
export const getErrors = createSelector(
    getLoginState,
    viewState => _get(viewState, 'errors')

);

export const getValidationCode = createSelector(
    getLoginState,
    viewState => _get(viewState, 'validationCode')

);
