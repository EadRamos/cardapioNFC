const Joi = require('joi');

const UserValidate = {
    user(date) {
        const rule = Joi.object({
            login: Joi.string().min(4).required().messages({
                'string.emply': 'O campo login é obrigatorio.',
                'any.required': 'O campo login é obrigatorio.'
            }),
            type: Joi.string().valid(['admin','waiter','chef']).required().message({
                'any.only': 'Tipo inválido no campo tipo de usuário.',
                'any.required': 'O campo tipo é obrigátorio',
            }),
            password: Joi.string().min(4).message({
                'string.min': 'A senha deve ter no minímo 4 caracteres.',
                'any.required': 'O campo senha é obrigátorio.'
            }),
        });

        const { error } = rule.validate(data);

        if ( error ) throw new Error( error.details.map( (err) => { message: err.message, field: err.path[0] }));

        return true;
    }
};

module.exports = UserValidate;