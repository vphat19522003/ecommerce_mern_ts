import { Router } from 'express';

import { createProductController } from '@app/controllers/product.controller';
import validateRequest from '@app/middleware/validateRequest.middleware';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';
import productValidators from '@app/validation/product.validate';

const productRouter = Router();

productRouter.post(
  '/create-product',
  upload.single('file'),
  productValidators.createProduct,
  validateRequest,
  reqHandler(createProductController)
);

export default productRouter;
