const slack = require('./slack');
const dynamo = require('./dynamo');

exports.handler = function(evt, cxt, cb) {
    if (evt) {
        let org_attachments = evt.original_message.attachments;
        org_attachments[0].actions = [];
        if (evt.actions[0].value === 'accept') {
            slack.invite(evt.callback_id);
            dynamo.updateApplication(evt.callback_id, evt.actions[0].value, evt.user.name);
            org_attachments[1] = {'fallback': `${evt.user.name} has accepted the application from ${evt.callback_id}`, text: `${evt.user.name} has accepted the application from ${evt.callback_id}`};
            cb(null, {'response_type': 'in_channel','replace_original': true, attachments: org_attachments});
        } else {
            dynamo.updateApplication(evt.callback_id, evt.actions[0].value, evt.user.name);
            org_attachments[1] = {'fallback': `${evt.user.name} has denied the application from ${evt.callback_id}`, text: `${evt.user.name} has denied the application from ${evt.callback_id}`};
            cb(null, {'response_type': 'in_channel','replace_original': true, attachments: org_attachments});
        }
    } else {
        cb(new Error());
    }
};
