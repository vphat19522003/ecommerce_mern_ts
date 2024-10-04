import { Router } from 'express';

import { createProductController } from '@app/controllers/product.controller';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';

const productRouter = Router();

productRouter.post('/create-product', upload.single('file'), reqHandler(createProductController));

export default productRouter;
