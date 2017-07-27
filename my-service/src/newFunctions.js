'use strict';
import AWS from 'aws-sdk';
import { AmazonCognitoIdentity } from 'aws-sdk'
export function success(body) {
    return buildResponse(200, body);
}

export function failure(body) {
    return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(body)
    };
}

module.exports.someFunction = (event, context, callback) => {
    console.log(event, 'The Event object');
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.someOtherFunction = (event, context, callback) => {
    console.log(event, 'The Event object');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.authNeededFunc = (event, context, callback) => {
    console.log(event)
    if(!event.body.idToken){
        const response = {
          statusCode: 400,
          body: JSON.stringify({
            message: 'no token!',
            input: event,
          }),
        };

        return callback(null, response);
    }
    //

    const idToken = new AmazonCognitoIdentity.CognitoIdToken({
        IdToken: event.body.tokens.idToken,
    });
    const accessToken = new AmazonCognitoIdentity.CognitoAccessToken({
        AccessToken: event.body.tokens.accessToken,
    });
    const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
        RefreshToken: event.body.tokens.refreshToken,
    });

    var tokenData = {   IdToken : idToken,
                        RefreshToken: refreshToken,
                        AccessToken: accessToken};

    var session = new AmazonCognitoIdentity.CognitoUserSession(tokenData);

    var poolData = {
        UserPoolId: 'us-west-2_gj5EhwKNU',
        ClientId: '19cra7jhurb8fq5e70vdihrjjj',
        IdentityPoolId: 'us-west-2_gj5EhwKNU'
    };

    var userPool = new CognitoUserPool(poolData);

    var userData = {
        Username: req.body.username,
        Pool: userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.signInUserSession = session;
    const message = `valid? ${session.isValid()}`
    console.log('valid? ' + session.isValid());
    console.log(event, 'The Event object');

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: message,
      input: event,
    }),
  };

  callback(null, response);

  // RAN OUT OF TIME!
};
