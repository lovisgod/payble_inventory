const Joi = require('joi');

 const  TillSalesSchema = Joi.object({
  user_id: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      item_id: Joi.number().optional(),
      name: Joi.string().optional(),
      quantity: Joi.number().integer().min(1).optional(),
      price: Joi.string().optional(),
      discount: Joi.string().optional().default('0'),
      discount_type: Joi.string().valid('percentage', 'fixed').optional().default('fixed'),
    })
  ).optional(),
  total_amount: Joi.string().required(),
  change_amount: Joi.string().optional().default('0'),
  payment_method: Joi.string().valid('cash', 'card', 'transfer').required(),
  notes: Joi.string().optional().allow(''),
  ref: Joi.string().optional().allow(''),
  status: Joi.string().valid('approved', 'pending', 'failed').default('pending'),
});

 const validateTillSales = (data) => {
  const { error } = TillSalesSchema.validate(data);
  if (error) {
    return { status: false, message: error.details[0].message };
  }
  return { status: true, message: "valid"};
}

module.exports = {
  validateTillSales
}