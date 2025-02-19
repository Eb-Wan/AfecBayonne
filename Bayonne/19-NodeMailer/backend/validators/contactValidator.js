const Joi = require("joi");

const contactValidation = (data) => {
  const schema = Joi.object({
    contact: Joi.string().max(255).required()
  });
  return schema.validate(data);
};

module.exports = { contactValidation };