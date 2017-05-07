var request = require('request');
var url = 'https://slack.com/api/users.admin.invite';

module.exports = {
    invite: function(email) {
        request.post(url).form({token: process.env.SLACK_TOKEN, email})
    }
};
