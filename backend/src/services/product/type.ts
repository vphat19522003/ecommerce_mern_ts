import mongoose from 'mongoose';

import { ProductImgType } from '@app/models/product.model';

export type ProductType = {
  _id?: string;
  productName: string;
  productPrice: number;
  productThumbImg: Array<ProductImgType>;
  description: string;
  productDescImg: Array<ProductImgType>;
  category: mongoose.Types.ObjectId;
  productVoteRate: number;
  stockQuantity: number;
  soldQuantity: number;
  availableQuantity: number;
  totalComment: number;
  tag: Array<string>;
  createdBy: mongoose.Types.ObjectId;
  isDeleted: boolean;
};

export type BookProductType = ProductType & {
  productId: string;
  author: string;
  page_number: number;
  publisher: string;
};
