const Joi = require('joi');

const customerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
    phone: Joi.string().required(),
    user_id: Joi.string().required()
});

 const validateCustomerData = async (data) => {
  const { error } = customerSchema.validate(data);
  if (error) {
    return { status: false, message: error.details[0].message };
  }
  return { status: true, message: "valid"};
}
module.exports = { validateCustomerData};