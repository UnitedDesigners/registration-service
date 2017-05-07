var AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    updateApplication: function(email, action, user) {

        var params = {
            TableName: 'UnitedDesigners-Applications',
            Key: {email: email},
            UpdateExpression: 'set #sA = :status, #dR = :action, #dB = :by',
            ExpressionAttributeNames: {'#sA': 'status', '#dR': 'details.action', '#dB': 'details.by'},
            ExpressionAttributeValues: {':status': 'true', ':action': action, ':by': user}
        };

        return new Promise((resolve, reject) => {
            docClient.update(params, function(err) {
                if (err){
                    console.log(err);
                    reject(err);
                }
            });
        });
    }
};
