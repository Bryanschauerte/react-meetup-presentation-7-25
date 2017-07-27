# React Meetup Presentation on 7-25

## Setting Up API/Lambdas on AWS Using Serverless

Repo with examples of Serverless.

This project's frontend was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Backend, Serverless docs can be found at [Serverless.com](https:www.serverless.com).

I seperated the presentation into sections and different branches.  

## Table of Contents

- [Getting Started](#getting-started)
- [Make A Lambda](#make-a-lambda)
- [Add Webpack and Dev Tools](#add-webpack-and-dev-tools)
- [Adding Cognito to Your App](#adding-cognito-to-you-app)

## Getting Started
(branch partOne)

- Head over to Amazon and create a free account at the
[AWS Homepage](https://aws.amazon.com/)

- Sign in to the console and create a new IAM role
 - Under 'users' hit 'add'
 - Give programmatic access
 - Under attach Existing policies add 'AdministratorAccess'
 - Hit the create user button
 - Take note of the Access key ID and Secret access key
 - Install the [awscli](https://aws.amazon.com/cli/)
 - Use the command `aws configure` to add ID and Key earlier noted

- Install the [Serverless](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) framework for AWS

## Make A Lambda

* `serverless create --template aws-nodejs --path my-service` creates a template for a Node Lamda.
 * handler.js is the function that runs when the resource is triggered
 * serverless.yml is the configuration file


- Serverless.yml
 - Defaults for the function are between 'provider' and 'functions'. All defined functions will have these defaults unless specified.
 - Functions can be called with their name 'hello' which are linked to the handler.
 - Can add resources for other AWS or authorization


- handler.js Parameter
 - Context param is an object containing information about the runtime environment
 - Event is the object used to pass info to the function. This includes event.path.query for query string key-value pairs, and event.path.query for path queries
 - Callback(optionals) returns information to the user -> i.e. callback(response_error, response_success)


* `cd my-service`
* `serverless deploy -v`
 * Deploys all your functions to AWS/ Updates all changes to your functions
* `serverless deploy function -f hello`
 * Deploys a single function 'hello' -> faster
* `serverless invoke -f hello -l`
  * fires your lambda with logs
* `serverless invoke local -f hello -l`
  * fires your lambda locally with logs
* `serverless remove`
  * Removes all your function from AWS

## Add Webpack and Dev Tools
(branch partTwo)

Branch partTwo holds the npm package you will need as well as the changes to the folder-structure and yml file.

We added a plugin to the yml file for serverless-webpack and have webpack package the npm modules required

This allows us a few niffy commands such as....

* `serverless webpack serve`
  * Creates a local mock of lambda and waits on the declared paths to be invoked.

  * You can use Postman on http://localhost:8000. Remember to add the header "Content-Type":"application/x-www-form-urlencoded"

  * Example 1, a GET request to http://localhost:8000/somePath/aValue allows event.path.query to be accessible in the lambda function with the value = 'aValue'

  * Example 2, a GET request to http://localhost:8000/someOtherPath?a=1 allows event.query.a to be accessible in the lambda function with the value = 1

* `serverless invoke local -f hello -l`
  * Fires your lambda locally with logs

* `serverless webpack invoke --function someFunction --path ./src/fetching.test.json`
  * Uses webpack to bundle and invoke someFunction using a json file as the event param.

* `serverless deploy`
  * Will now deploy the bundled functions

  amazon-cognito-identity-js

  Pool Id us-west-2_6isvU9SN0
  Pool ARN arn:aws:cognito-idp:us-west-2:671953655197:userpool/us-west-2_6isvU9SN0
  67lrt2180c01uus46q4rqa5rrp

## Adding Cognito to Your App
(branch partThree)

Client side will need the `amazon-cognito-identity-js` npm package. [Docs here](https://github.com/aws/amazon-cognito-identity-js).

This allows you to use the AWS service Cognito to 'sign-up users, authenticate users, view, delete, and update user attributes within the Amazon Cognito Identity service'. And use that to validate your 'Login' page.

In our case, we have a bunch of helpers using the package found in the /utilities/cognito/utils folder.

To USE Cognito you will need a user pool.

### Steps to the Pool

 - Sign in to your AWS [account console ](https://aws.amazon.com/)

 - Search for 'Cognito' and select 'Manage Your User Pools'

 - Create new user pool (top right)

 - Add name and click 'review defaults'

 - At the bottom, click add app clients
  - stick in a name
  - after creating, you will need to come back there

 - Hit create pool, and once done grab the 'Pool Id' and 'Pool ARN'

 - Click on the app clients and grab the 'App client id'
  - (in our app, I stuck it in an folder called 'hidden'<br/>

  `{
      cognito: {
          APP_CLIENT_ID : '1yatta',
          USER_POOL_ID : 'us-west-2_yatta',
          arn: 'arn:aws:cognito-idp:us-west-2:67195yatta'
      }
  };`
