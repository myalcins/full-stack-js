const joi = require('joi');


const todoSchema = joi.object({
    name: joi.string().required().max(30),
    description: joi.string().required().max(150)
});

module.exports = {
    todoSchema,
}