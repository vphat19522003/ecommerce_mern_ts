import { Router } from 'express';

import { addCommentController } from '@app/controllers/comment.controller';
import verifyAccessToken from '@app/middleware/accessToken.middleware';
import validateRequest from '@app/middleware/validateRequest.middleware';
import verifyAccountHandler from '@app/middleware/verifyAccount.middleware';
import { upload } from '@app/utils/multerConfig';
import reqHandler from '@app/utils/reqHandler';
import commentValidators from '@app/validation/comment.validate';

const commentRouter = Router();

commentRouter.post(
  '/add-comment',
  verifyAccessToken,
  verifyAccountHandler,
  upload.fields([{ name: 'commentImg', maxCount: 3 }]),
  validateRequest(commentValidators.createComment),
  reqHandler(addCommentController)
);

export default commentRouter;
