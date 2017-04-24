var validator = require('validator');

var notify = require('./notify');
var application = require('./application');


exports.handler = function(evt, cxt, cb) {
    if (!validator.isEmpty(evt.name) && validator.isEmail(evt.email)) {
        application.saveApplication(evt)
          .then(notify.notifySlack)
          .then(() => {cb(null, 'Success');})
          .catch((err) => {
              notify.error(err);
              cb(new Error(err.message));
          });
    } else {
        cb(new Error('Invalid Request'));
    }
};
