const joi = require('@hapi/joi');

module.exports = { add_userValidator };

async function add_userValidator(userparams) {
	const joiBodySchema = await joi.object().keys({
		firstname: joi.string().alphanum().required(),
		lastname: joi.string().alphanum().required(),
		email: joi
			.string()
			.required()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		password: joi
			.string()
			.min(8)
			.required()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		confirm_password: joi.ref('password'),
		phone: joi
			.string()
			.trim()
			.regex(/^[0-9]{7,10}$/)
			.required(),
		role: joi
			.string()
			.required()
			.valid('Admin', 'Client', 'Procurement Manager', 'Inspection Manager'),
	});

	return joiBodySchema.validate(userparams);
}
