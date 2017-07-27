import {
	USER_LOGIN_START,
	userLogin
} from './actions';

describe('SIGNIN actions', () => {
    describe('userLogin', () => {
        it(`returns a ${USER_LOGIN_START} action with a payload object`), () => {
            const payload = {
                username: name,
                password: 123
            };

            const expect = {
                type: USER_LOGIN_START
            };
            expect(userLogin(payload.username, payload.password)).toEqual(expect);
        };
    });
    describe('userLogin', () => {
        it(`returns a ${USER_LOGIN_START} action with a payload object`), () => {

        };
    });
});
