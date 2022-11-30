import joi from "joi";

export const productsSchema = joi.object({
  name: joi.string().min(3).required(),
  color: joi.string().min(3).required(),
  size: joi.string().min(1).required(),
  description: joi.string().min(3).required(),
  state: joi.string().min(3).required(),
  value: joi.number().integer().min(0).required(),
  urls: joi.array().min(1).required(),
});
