import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import CartModel, { ICart } from '@app/models/cart.model';
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
  }

  static async updateCartQuantity(req: IRequestCustom): Promise<ICart> {
    const { _id: userId } = req.user as UserInfo;
    const data = req.body;

    const quantity = Number(data.quantity);
    const productId = data.productId;

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    if (quantity == 0) {
      throw new CustomError('Quantity must be greater or less than zero', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(productId);

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const cart = await CartModel.findOne({ userId });

    if (!cart) throw new CustomError('Cart not found', STATUS_CODE.BAD_REQUEST);

    const existingItem = cart.cartItems.find((item) => String(item.productId) === String(product._id));

    if (!existingItem) throw new CustomError('Not found product in cart', STATUS_CODE.BAD_REQUEST);

    if (Number(product.availableQuantity) < quantity)
      throw new CustomError('Available quantity is not enough', STATUS_CODE.BAD_REQUEST);

    const tempQuantity = Number(existingItem.quantity) + quantity;

    if (tempQuantity <= 0) throw new CustomError('Can not decrease quantity', STATUS_CODE.BAD_REQUEST);

    if (tempQuantity > Number(product.availableQuantity))
      throw new CustomError('Cart item quantity is pass available quantity', STATUS_CODE.BAD_REQUEST);

    existingItem.quantity = tempQuantity;

    const updatedCart = await cart.save();

    return updatedCart;
  }

  static async removeProductCart(req: IRequestCustom): Promise<void> {
    const { _id: userId } = req.user as UserInfo;
    const { productId } = req.body;

    if (!Types.ObjectId.isValid(productId)) {
      throw new CustomError('Product ID is not valid', STATUS_CODE.BAD_REQUEST);
    }

    const product = await ProductModel.findById(productId);

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const cart = await CartModel.findOne({ userId });

    if (!cart) throw new CustomError('Cart not found', STATUS_CODE.BAD_REQUEST);

    const existingItem = cart.cartItems.find((item) => String(item.productId) === String(product._id));

    if (!existingItem) throw new CustomError('Not found product in cart', STATUS_CODE.BAD_REQUEST);

    cart.cartItems = cart.cartItems.filter((item) => String(item.productId) !== String(product._id));

    await cart.save();
  }

  static async removeAllProductCart(req: IRequestCustom): Promise<void> {
    const { _id: userId } = req.user as UserInfo;

    const cart = await CartModel.findOne({ userId });

    if (!cart) throw new CustomError('Cart not found', STATUS_CODE.BAD_REQUEST);

    await CartModel.deleteOne({ _id: cart._id });
  }

  static async getMyCart(req: IRequestCustom): Promise<{ myCart: ICart; totalCartItem: number }> {
    const { _id: userId } = req.user as UserInfo;

    const myCart = await CartModel.findOne({ userId }).populate('cartItems.productId');

    if (!myCart) throw new CustomError('Cart not found', STATUS_CODE.BAD_REQUEST);

    const totalCartItem = myCart.cartItems.reduce((acc, cur) => acc + cur.quantity, 0);

    return { myCart, totalCartItem };
  }
}

export default CartService;
