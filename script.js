const inquirer = require('inquirer');
const { makeTransporter } = require('./nodemailer');
const { sendMultipleEmails } = require('./utils');

// ENV Configuration
require('dotenv').config();

const runCli = async () => {
	let { csvFile, templateFile } = await inquirer.prompt([
		{
			name: 'csvFile',
			message: 'Name Of CSV File Contains the Data in Tables folder?',
			default: 'test.csv',
		},
		{
			name: 'templateFile',
			message: 'Name Of Template File?',
			default: 'Offline-Interview.mjml',
		},
	]);

	const transporter = makeTransporter({
		user: process.env.Gmail,
		password: process.env.GmailPassword,
	});

	sendMultipleEmails(
		{
			csvPath: `./Tables/${csvFile}`,
			templatePath: `./TEDxTabaryEmails/${templateFile}`,
		},
		transporter
	);
};

runCli();
