const mongoose = require('mongoose');

function Email(path, options) {
  mongoose.SchemaTypes.String.call(this, path, options, 'Email');
  function validateEmail(val) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(val);
  }
  this.validate(validateEmail, 'Invalid email address', 'invalid-email');
}

Email.prototype.__proto__ = mongoose.SchemaTypes.String.prototype;

Email.prototype.cast = function (val) {
  if (val.constructor !== String) {
    throw new mongoose.SchemaType.CastError('Email', `${val} is not a string`);
  }
  return val;
};

mongoose.SchemaTypes.Email = module.exports = Email;
