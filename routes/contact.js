var express         = require('express');
var router          = express.Router();
var nodemailer      = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    var siteUrl = req.protocol + '://' + req.get('host')
    res.render('contact-form', {
        siteUrl: siteUrl,
        pageTitle: 'Contact'
    });
});


router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'nodemailer9@gmail.com',
			pass: 'Yeah its me'
		},
	    tls: {
	        rejectUnauthorized: false
	    }
	});

	var mailOptions = {
		from: req.body.name+'<'+req.body.email+'>',
		to: 'eslamnasser332@gmail.com',
		subject: 'Express Contact Form',
		text: 'You have a new message!',
		html: `
			<div style='
                width: 50%;
                background-color: rgba(238, 238, 238, 0.3);
                margin: auto;
                position: relative;
                padding-bottom: 20px;
                box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
				'>
				<h1 style='
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: 0;
                    background: #3498db;
                    color: #FFF;
                    padding: 10px;
                    font-size: 15px;
                '> You have a new message!</h1>
				<ul>
					<li style='margin: 2px auto;'><b>Sender Name:</b> &nbsp;`+req.body.name+`</li>
					<li style='margin: 2px auto;'><b>Sender Email:</b> &nbsp;`+req.body.email+`</li>
					<li style='margin: 2px auto;'><b>Sender Message is below:</li>
				</ul>
                <p style='
                    background: #FFF;
                    padding: 5px 10px;
                    border: 1px solid #EEE;
                    width: 85%;
                    margin: auto;
                '>
                    `+req.body.message+`
                </p>

			</div>
		`
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log('___Error: => '+ error);
			res.redirect('/contact');
		}else{
			console.log('Message Sent! ' + info.response);
			res.redirect('/');
		}
	})
})

module.exports = router;