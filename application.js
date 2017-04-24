var AWS = require('aws-sdk');
var notify = require('./notify');

AWS.config.update({region: 'us-west-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    saveApplication: function(formData) {
        var params = {
            TableName: 'UnitedDesigners-Applications',
            Item: formData
        };

        return new Promise((resolve, reject) => {
            docClient.put(params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(formData);
                }
            });
        });
    }
};
