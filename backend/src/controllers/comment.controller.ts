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

export const getCommentsController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.getComments(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Get comments successfully',
    result
  });
};

export const getImageCommentsController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.getImageComments(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Get image comments successfully',
    result
  });
};
