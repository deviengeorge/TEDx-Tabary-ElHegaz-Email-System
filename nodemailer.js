const nodemailer = require('nodemailer');

const makeTransporter = ({ user, password }) => {
	let transporter = nodemailer.createTransport({
		host: 'smtp.zoho.com',
		port: 465,
		secure: true, // use SSL
		auth: {
			user: user,
			pass: password,
		},
	});
	return transporter;
};

const sendEmail = async (
	{ title, toEmail, fromEmail, subject, text, html },
	transporter
) => {
	try {
		await transporter.sendMail({
			from: `"${title}" <${fromEmail}>`,
			to: toEmail,
			subject: subject,
			text: text,
			html: html,
		});
		console.log(`Email sent To ${toEmail}`);
	} catch (error) {
		console.log(err);
		console.error(`Retry sending email to Email: ${toEmail}`);
		await sendEmail(
			{ title, toEmail, fromEmail, subject, text, html },
			transporter
		);
	}
};

module.exports = { makeTransporter, sendEmail };
