const { makeTransporter, sendEmail } = require('./nodemailer');
const { parseCSV, renderTemplate } = require('./utils');

// ENV Configuration
require('dotenv').config();

parseCSV('IT_Accepted.csv').then((data) => {
	data.forEach(({ Name, Email }) => {
		renderTemplate('./TEDxTabaryEmails/Online-Interview.mjml', {
			Name: Name,
		}).then((html) => {
			sendEmail(
				{
					title: 'TEDx Tabary ElHegaz',
					fromEmail: 'support@tedxtabaryelhegaz.com',
					subject: 'Congratulations',
					text: 'You Accepted In Phase 1 At TEDxYouth@Tabary ElHegaz HS',
					html: html,
					toEmail: Email,
				},
				transporter
			);
		});
	});
});

const transporter = makeTransporter({
	user: process.env.Email,
	password: process.env.Password,
});
