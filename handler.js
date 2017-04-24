var validator = require('validator');

var notify = require('./notify');


exports.handler = function(evt, cxt, cb) {
    if (!validator.isEmpty(evt.name) && validator.isEmail(evt.email)) {
        notify.notifySlack(evt).then(() => cb(null, 'Success'));
    }
    cb(new Error('Invalid Request'));
};
