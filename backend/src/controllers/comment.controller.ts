import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import CommentService from '@app/services/comment.service';

export const addCommentController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.addComment(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Comment added successfully',
    result
  });
};
