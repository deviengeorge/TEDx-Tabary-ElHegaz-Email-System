const ejs = require('ejs');
const csv = require('csvtojson');
const mjml2html = require('mjml');

const renderTemplate = async (template, data) => {
	let html = await ejs.renderFile(template, data);
	return mjml2html(html).html;
};

const parseCSV = async (file) => {
	const data = await csv().fromFile(file);
	return data;
};

module.exports = { parseCSV, renderTemplate };
