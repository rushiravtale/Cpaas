const Joi = require("joi");

const createUserValidation = Joi.object({
  name: Joi.string().required(),
  userName: Joi.string().trim().required(),
  email: Joi.string().required(),
  phoneNo: Joi.string().required(),
  roleIds: Joi.array().required(),
  password: Joi.string().required(),
  tradeId: Joi.array(),
});

const updateUserValidation = Joi.object({
  name: Joi.string().required(),
  userName: Joi.string().trim().required(),
  email: Joi.string().required(),
  phoneNo: Joi.string().required(),
  roleIds: Joi.array().required(),
    password: Joi.string().optional().allow('', null),
  tradeId: Joi.array(),
  userId: Joi.string().required(),
});

module.exports = { createUserValidation, updateUserValidation };
