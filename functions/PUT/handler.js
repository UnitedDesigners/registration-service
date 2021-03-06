var validator = require('validator');

var notify = require('./notify');
var application = require('./application');


exports.handler = function(evt, cxt, cb) {
    if (validateForm(evt)) {
        application.saveApplication(evt)
          .then(notify.notifySlack)
          .then(() => {cb(null, {'message': 'Success'});})
          .catch((err) => {
              if(err.message === 'The conditional request failed') {
                  cb(new Error('Duplicate Request'));
              } else {
                  notify.error(err);
                  cb(new Error(err.message));
              }
          });
    } else {
        cb(new Error('Invalid Request'));
    }
};

function validateForm(form) {
    return form.name
      && form.email
      && form.location
      && form.field
      && form.comments
      && !validator.isEmpty(form.name)
      && validator.isEmail(form.email)
      && !validator.isEmpty(form.location)
      && !validator.isEmpty(form.field)
      && !validator.isEmpty(form.comments);
}
