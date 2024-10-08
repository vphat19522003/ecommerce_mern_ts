import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import ProductService from '@app/services/product/product.service';

export const createProductController = async (req: Request, res: Response): Promise<Response> => {
  console.log({ files: req.files });
  const result = await ProductService.createProduct(req);

  return res.json({
    message: 'Create product successfully',
    status: STATUS_CODE.OK,
    result
  });
};
