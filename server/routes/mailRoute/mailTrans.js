const nodemailer = require('nodemailer');
const creds = require('./creds');
const router = require('express').Router();
const Contact = require('../../models/Contact');
const axios = require('axios');

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

//aws need to use to different email.

  router.post('/api/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message

    var mail = {
      from: 'vegreenfusion02@gmail.com',
      to: 'vegreenfusion02@gmail.com',
      subject: `Vegreen Message: ${name}`,
      text: `Name: ${name} \nE-Mail: ${email} \nMessage: ${message}`
    }
    axios.post("/api/newcontact", req.body)
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  });

module.exports = router;
