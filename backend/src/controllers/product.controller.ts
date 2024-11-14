import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import ProductService from '@app/services/product/product.service';

export const createProductController = async (req: Request, res: Response): Promise<Response> => {
  const result = await ProductService.createProduct(req);

  return res.json({
    message: 'Create product successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const getAllLatestProductController = async (req: Request, res: Response): Promise<Response> => {
  const result = await ProductService.getAllLatestProduct(req);

  return res.json({
    message: 'Get all products successfully',
    status: STATUS_CODE.OK,
    result
  });
};

export const getProductDetailController = async (req: Request, res: Response): Promise<Response> => {
  const result = await ProductService.getProductDetail(req);

  return res.json({
    message: 'Get product detail successfully',
    status: STATUS_CODE.OK,
    result
  });
};
