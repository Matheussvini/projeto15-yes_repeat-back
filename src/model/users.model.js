import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  address: {
    cep: joi.string().pattern(new RegExp(/^[0-9]{5}-[0-9]{3}$/)).required(),
    street: joi.string().min(3).required(),
    number: joi.number().min(1).max(9999).required(),
    complement: joi.string(),
    district: joi.string().min(3).required(),
    city: joi.string().min(3).required(),
    uf: joi.string().min(2).max(2).required()
  },
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
