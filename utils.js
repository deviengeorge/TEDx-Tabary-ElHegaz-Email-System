const ejs = require('ejs');
const csv = require('csvtojson');
const mjml2html = require('mjml');
const { sendEmail } = require('./nodemailer');

const sleep = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const sendMultipleEmails = async ({ csvPath, templatePath }, transporter) => {
	const data = await parseCSV(csvPath);
	for (let personData of data) {
		const html = await renderTemplate(templatePath, {
			...personData,
		});

		await sendEmail(
			{
				title: 'TEDx Tabary ElHegaz',
				fromEmail: 'support@tedxtabaryelhegaz.com',
				subject: 'Congratulations',
				text: 'You Accepted In Phase 1 At TEDxYouth@Tabary ElHegaz HS',
				html: html,
				toEmail: personData.Email,
			},
			transporter
		);

		await sleep(5000);
	}
};

const renderTemplate = async (template, data) => {
	let html = await ejs.renderFile(template, data);
	return mjml2html(html).html;
};

const parseCSV = async (file) => {
	const data = await csv().fromFile(file);
	return data;
};

module.exports = { parseCSV, renderTemplate, sendMultipleEmails };
