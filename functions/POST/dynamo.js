var AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    updateApplication: function(email, action, user) {

        var params = {
            TableName: 'UnitedDesigners-Applications',
            Key: {email},
            UpdateExpression: 'set status = :s, details = :d',
            ExpressionAttributeNames: {':s': 'true', ':d': {result: action, 'by': user}}
        };

        return new Promise((resolve, reject) => {
            docClient.update(params, function(err) {
                if (err)
                    reject(err);
            });
        });
    }
};
