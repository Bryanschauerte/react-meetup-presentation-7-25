# React Meetup Presentation on 7-25

## Setting Up API/Lambdas on AWS Using Serverless

Repo with examples of Serverless.

This project's frontend was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Backend, Serverless docs can be found at [Serverless.com](https:www.serverless.com).

I seperated the presentation into sections and different branches.  

## Table of Contents

- [Getting Started](#getting-started)
- [Make A Lambda](#make-a-lambda)


## Getting Started

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
