Mongoose type mail [![NPM version][npm-image]][npm-url]
============================

A field type mail, with validation and error type for mongoose

## Install

```
npm install --save mongoose-type-mail
```

## Usage

```
const Schema = require('mongoose').Schema;
const Email = require('mongoose-type-mail');

let MySchema = new Schema({
  username: { type: String },
  email: { type: Email },
});
```

Standard other mongoose stuff works fine too:

```
let MySchema = new Schema({
  email: {
    type: Email,
    required: [true, 'email is required'],
    unique: [true, 'this email is already use'],
  },
});
```

## Error

On validation run (mongoose insert), if an item has a bad mail format, you'll get the full explicit error with ```invalid-email``` type.

```
{
  message: 'Invalid email address',
  name: 'ValidatorError',
  properties:
   { type: 'invalid-email',
     message: 'Invalid email address',
     path: 'email',
     value: 'not-an-email'
  },
  kind: 'invalid-email',
  path: 'email',
  value: 'not-an-email'
}
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/mongoose-type-mail.svg?style=flat
[npm-url]: https://npmjs.org/package/mongoose-type-mail
