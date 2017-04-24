var slack = require('slack');

module.exports = {
    notifySlack: function(formData) {
        return new Promise((resolve, reject) => {
            slack.chat.postMessage({
                token: process.env.SLACK_TOKEN,
                channel: 'applications',
                text: '',
                attachments: constructMessage(formData)
            }, (err, data) => {
                if (err)
                    reject(err);
                if (data) {
                    if (data.warning)
                        slack.chat.postMessage({token: process.env.SLACK_TOKEN, channel: 'bot-debug', text: `An error has occurred\n ${data.warning}`});
                    resolve(data);
                }
            });
        });
    },
    error: function(err) {
        slack.chat.postMessage({token: process.env.SLACK_TOKEN, channel: 'bot-debug', text: `An error has occurred\n ${err.message}`});
    }
};

function constructMessage(formData) {
    return [
        {
            fallback: 'New Application Recieved!',
            title: 'Application to United Designers',
            fields: [
                {
                    title: 'Name',
                    value: formData.name,
                    short: true
                }, {
                    title: 'Email',
                    value: formData.email,
                    short: true
                }, {
                    title: 'Field',
                    value: formData.field,
                    short: true
                }, {
                    title: 'Location',
                    value: formData.location,
                    short: true
                }, {
                    title: 'Portfolio',
                    value: formData.portfolio,
                    short: true
                }, {
                    title: 'Comments',
                    value: formData.comments,
                    short: false
                }
            ]
        }
    ];
}
