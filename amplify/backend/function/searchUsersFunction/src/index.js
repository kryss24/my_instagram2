const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

// Environment variables set by Amplify
const tableName = process.env.API_MYINSTAGRAM_USERTABLE_NAME; // This will be the name of the User table

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const { query } = event.arguments; // Assuming the query comes in event.arguments.query

    if (!query) {
        return [];
    }

    const params = {
        TableName: tableName,
        FilterExpression: 'contains(username, :query) OR contains(preferred_username, :query)',
        ExpressionAttributeValues: {
            ':query': query,
        },
    };

    try {
        const data = await docClient.scan(params).promise();
        return data.Items;
    } catch (error) {
        console.error('Error searching users:', error);
        throw new Error('Error searching users: ' + error.message);
    }
};