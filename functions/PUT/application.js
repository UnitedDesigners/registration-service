var AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    saveApplication: function(formData) {
        formData.status = false;
        formData.details = {action: '', by: ''};

        var params = {
            TableName: 'UnitedDesigners-Applications',
            Item: formData,
            ConditionExpression: 'attribute_not_exists(#e)',
            ExpressionAttributeNames: {'#e': 'email'}
        };

        return new Promise((resolve, reject) => {
            docClient.put(params, function(err) {
                if (err)
                    reject(err);
                resolve(formData);
            });
        });
    }
};
