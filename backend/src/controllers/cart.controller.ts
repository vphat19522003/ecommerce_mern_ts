import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import CartService from '@app/services/cart.service';

export const addToCartController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CartService.addToCart(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Add to cart successfully',
    result
  });
};
