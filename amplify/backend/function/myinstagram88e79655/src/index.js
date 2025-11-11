const AWS = require('aws-sdk');
const https = require('https');
const url = require('url');

// Environment variables set by Amplify
const appsyncUrl = process.env.API_MYINSTAGRAM_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION; // Assuming REGION is set by Amplify

const endpoint = new url.URL(appsyncUrl).hostname.toString();

// GraphQL mutation to create a user
const createUserMutation = `
  mutation CreateUser(
    $id: ID!
    $username: String!
    $email: String!
    $phone_number: String
    $gender: String
    $accountType: String
  ) {
    createUser(input: {
      id: $id
      username: $username
      email: $email
      phone_number: $phone_number
      gender: $gender
      accountType: $accountType
    }) {
      id
      username
      email
    }
  }
`;

exports.handler = async (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Ensure this is a Post Confirmation trigger
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    const { sub, email, preferred_username, phone_number, gender } = event.request.userAttributes;

    const variables = {
      id: sub,
      username: preferred_username,
      email: email,
      phone_number: phone_number || null,
      gender: gender || null,
      accountType: "public" // Default to public
    };

    const req = new AWS.HttpRequest(appsyncUrl, region);
    req.method = 'POST';
    req.path = '/graphql';
    req.headers.host = endpoint;
    req.headers['Content-Type'] = 'application/json';
    req.body = JSON.stringify({
      query: createUserMutation,
      variables: variables,
    });

    const signer = new AWS.Signers.V4(req, 'appsync', true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    try {
      const data = await new Promise((resolve, reject) => {
        const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
          result.on('data', (data) => {
            resolve(JSON.parse(data.toString()));
          });
        });

        httpRequest.write(req.body);
        httpRequest.end();
      });

      console.log('GraphQL response:', JSON.stringify(data, null, 2));

      if (data.errors) {
        console.error('Error creating user in DynamoDB:', data.errors);
        callback(new Error(`Error creating user in DynamoDB: ${JSON.stringify(data.errors)}`));
      } else {
        console.log('User successfully created in DynamoDB:', data.data.createUser);
        callback(null, event);
      }
    } catch (error) {
      console.error('HTTP request error:', error);
      callback(new Error(`HTTP request error: ${error.message}`));
    }
  } else {
    // If not a Post Confirmation trigger, just pass the event through
    callback(null, event);
  }
};