var tiny = require('tiny-json-http');
var url = 'https://slack.com/api/users.admin.invite';

module.exports = {
    invite: function(email) {
        return new Promise((resolve, reject) => {
            tiny.post({url, data: { token: process.env.SLACK_TOKEN, email}}, function __got(err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
};
