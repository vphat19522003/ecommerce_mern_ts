const { body } = require('express-validator');

const productValidators = {
  createProduct: [
    body('productName')
      .isString()
      .withMessage('Product name must be a string')
      .isLength({ min: 3 })
      .withMessage('Product name must be at least 3 characters'),
    body('productPrice').isFloat({ min: 10000 }).withMessage('Product price must be a positive number'),
    body('description')
      .isString()
      .withMessage('Description must be a string')
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 characters'),
    body('category').notEmpty().withMessage('Category is required'),
    body('createdBy').notEmpty().withMessage('CreatedBy field is required')
  ],

  updateProduct: [
    body('productName').optional().isString().withMessage('Product name must be a string'),
    body('productPrice').optional().isFloat({ min: 0 }).withMessage('Product price must be a positive number'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string')
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 characters')
  ]
};

export default productValidators;
