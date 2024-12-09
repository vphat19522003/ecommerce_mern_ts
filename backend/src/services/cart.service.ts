import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import CartModel from '@app/models/cart.model';
import ProductModel from '@app/models/product.model';
import { UserInfo } from '@app/repository/user.repository';

class CartService {
  static async addToCart(req: IRequestCustom): Promise<void> {
    const { _id: userId } = req.user as UserInfo;
    const { productId, quantity } = req.body;

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    if (quantity == 0) throw new CustomError('Product quantity can not be 0', STATUS_CODE.BAD_REQUEST);

    const product = await ProductModel.findById(productId);

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    if (product.availableQuantity < quantity)
      throw new CustomError('Available quantity is not enough', STATUS_CODE.BAD_REQUEST);

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, cartItems: [{ productId, quantity }] });
    } else {
      const existingItem = cart.cartItems.find((item) => String(item.productId) === String(product._id));

      if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
      } else {
        cart.cartItems.push({ productId: new Types.ObjectId(productId), quantity: quantity });
      }
    }

    await cart.save();

    await ProductModel.findByIdAndUpdate(product._id, {
      availableQuantity: product.availableQuantity - quantity
    });
  }
}

export default CartService;
