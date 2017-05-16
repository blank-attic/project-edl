module.exports = require('express-session')({
  secret: 'secret',
  cookie: {
    domain: 'localhost',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: 'auto'
  },
  resave: true,
  saveUninitialized: true,
  rolling: true,
  sameSite: true
});
