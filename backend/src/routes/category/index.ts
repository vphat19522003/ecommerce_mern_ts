import { Router } from 'express';

import {
  createCategoryController,
  deleteCategoryController,
  getMainCategoryController,
  getSubCategoryController,
  getTreeCategoryController
} from '@app/controllers/category.controller';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';

const categoryRouter = Router();

categoryRouter.post('/create-category', upload.single('file'), reqHandler(createCategoryController));
categoryRouter.get('/get-main-category', reqHandler(getMainCategoryController));
categoryRouter.get('/get-sub-category', reqHandler(getSubCategoryController));
categoryRouter.post('/delete-category', reqHandler(deleteCategoryController));
categoryRouter.post('/get-tree-category', reqHandler(getTreeCategoryController));

export default categoryRouter;
