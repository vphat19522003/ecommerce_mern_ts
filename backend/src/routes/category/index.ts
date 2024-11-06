import { Router } from 'express';

import {
  createCategoryController,
  deleteCategoryController,
  editCategoryController,
  getMainCategoryController,
  getSubCategoryController,
  getTreeCategoryController
} from '@app/controllers/category.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import verifyAccountHandler from '@app/middleware/verifyAccount.middleware';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';

const categoryRouter = Router();

categoryRouter.post(
  '/create-category',
  verifyAccessToken,
  verifyAccountHandler,
  upload.single('file'),
  reqHandler(createCategoryController)
);
categoryRouter.get(
  '/get-main-category',
  verifyAccessToken,
  verifyAccountHandler,
  reqHandler(getMainCategoryController)
);
categoryRouter.get('/get-sub-category', verifyAccessToken, verifyAccountHandler, reqHandler(getSubCategoryController));
categoryRouter.post('/delete-category', verifyAccessToken, verifyAccountHandler, reqHandler(deleteCategoryController));
categoryRouter.get(
  '/get-tree-category',
  verifyAccessToken,
  verifyAccountHandler,
  reqHandler(getTreeCategoryController)
);

categoryRouter.post(
  '/edit-category',
  // verifyAccessToken,
  // verifyAccountHandler,
  upload.single('file'),
  reqHandler(editCategoryController)
);

export default categoryRouter;
