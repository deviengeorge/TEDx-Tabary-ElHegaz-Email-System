const { makeTransporter } = require('./nodemailer');
const { sendMultipleEmails } = require('./utils');

// ENV Configuration
require('dotenv').config();

const transporter = makeTransporter({
	user: process.env.Gmail,
	password: process.env.GmailPassword,
});

sendMultipleEmails(
	{
		csvPath: './Tables/PR_Accepted.csv',
		templatePath: './TEDxTabaryEmails/Offline-Interview.mjml',
	},
	transporter
);
