import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { config } from '../../hidden/cognito';

export function signUp(username, password) {
    const tempName = username.slice(0, username.indexOf('@'));
    const userPool = new CognitoUserPool({
        ClientId: config.cognito.APP_CLIENT_ID,
        UserPoolId: config.cognito.USER_POOL_ID
    });

    const attributeEmail = new CognitoUserAttribute({ Name : 'email', Value : username });
    const attributeName = new CognitoUserAttribute({
        Name : 'name',
        Value : tempName
    });
    const attributePreferredUsername = new CognitoUserAttribute({
        Name : 'preferred_username',
        Value : tempName
    });

    return new Promise((resolve, reject) => (
        userPool.signUp(username, password, [attributeEmail, attributeName, attributePreferredUsername], null, (err, result) => {
            if (err) {
                reject(err);

                return;
            }
            resolve(result.user);
        })
      ));
}


export function signIn(username, password) {
    const userPool = new CognitoUserPool({
        ClientId: config.cognito.APP_CLIENT_ID,
        UserPoolId: config.cognito.USER_POOL_ID
    });
    const authenticationData = {
        Password: password,
        Username: username
    };

    const user = new CognitoUser({
        Pool: userPool,
        Username: username
    });
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
        user.authenticateUser(authenticationDetails, {
            onFailure: (err) => reject(err),
            onSuccess: (result) => resolve(result)
        })
    ));
}

export function confirmUserCode(user, confirmationCode) {
    const userPool = new CognitoUserPool({
        ClientId: config.cognito.APP_CLIENT_ID,
        UserPoolId: config.cognito.USER_POOL_ID
    });

    return new Promise((resolve, reject) => (
        user.confirmRegistration(confirmationCode, true, function(err, result) {
            if (err) {
                console.log('err confirm', err);
                reject(err);

                return;
            }
            console.log(result, 'result');
            resolve(result);
        })
  ));
}

// export function getCurrentUser(){
//     var data = {
//         ClientId: config.cognito.APP_CLIENT_ID,
//         UserPoolId: config.cognito.USER_POOL_ID
//     };
//     var userPool = new CognitoUserPool(data);
//
//     return userPool.getCurrentUser();
//
// }
