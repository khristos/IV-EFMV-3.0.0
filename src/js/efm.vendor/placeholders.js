/*!
 * Replaces placeholders with real content
 * Requires get() - https://vanillajstoolkit.com/helpers/get/
 * See 'efm-util.js' - EFM.Util.get()
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param {String} template The template string
 * @param {String} local    A local placeholder to use, if any
 */
var placeholders = function (template, data) {

	'use strict';

	// Check if the template is a string or a function
	template = typeof (template) === 'function' ? template() : template;
	if (['string', 'number'].indexOf(typeof template) === -1) throw 'PlaceholdersJS: please provide a valid template';

	// If no data, return template as-is
	if (!data) return template;

	// Replace our curly braces with data
	template = template.replace(/\{\{([^}]+)\}\}/g, function (match) {

		// Remove the wrapping curly braces
		match = match.slice(2, -2);

		// Get the value [See 'efm-util.js' - EFM.Util.get()]
		var val = EFM.Util.get(data, match);

		// Replace
		if (!val) return '{{' + match + '}}';
		return val;

	});

	return template;

};