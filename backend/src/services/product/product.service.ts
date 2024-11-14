import { Request } from 'express';
import { omit } from 'lodash';
import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import CategoryModel from '@app/models/category.model';
import ProductModel, { BookProductModel } from '@app/models/product.model';
import ProductRepository from '@app/repository/product.repository';
import { UserInfo } from '@app/repository/user.repository';
import { deleteFromCloudinary, uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

import ProductFactory from './product.factory';
import { CustomIProduct, IProduct } from './type';

class ProductService {
  static async createProduct(req: IRequestCustom): Promise<IProduct> {
    const data = req.body as IProduct;
    const categoryType = req.body.categoryType;
    const user = req.user as UserInfo;
    const uploadedImages = [];

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const thumbImg = files['thumbImg'] ? files['thumbImg'][0] : null;
    const descImgs = files['descImg'] || [];

    const folder = `product/${data.productName + '-' + data.category}`;

    if (!thumbImg) {
      throw new CustomError('No thumbnail image provided', STATUS_CODE.BAD_REQUEST);
    }

    if (descImgs.length < 4) {
      throw new CustomError('Must at least 4 description images provided', STATUS_CODE.BAD_REQUEST);
    }

    try {
      if (!isValidImage(thumbImg))
        throw new CustomError("Thumbnail image doesn't have valid type", STATUS_CODE.BAD_REQUEST);

      const thumbUploadResult = await uploadToCloudinary(thumbImg, folder);
      uploadedImages.push(thumbUploadResult.public_id);

      const descUploadResults = await Promise.all(
        descImgs.map(async (img) => {
          if (!isValidImage(img))
            throw new CustomError("Description image doesn't have valid type", STATUS_CODE.BAD_REQUEST);
          const uploadResult = await uploadToCloudinary(img, folder);
          uploadedImages.push(uploadResult.public_id);
          return uploadResult;
        })
      );

      const product = {
        ...data,
        createdBy: new Types.ObjectId(user._id),
        productThumbImg: {
          url: thumbUploadResult.url,
          public_id: thumbUploadResult.public_id
        },
        productDescImg: descUploadResults.map((img) => ({
          url: img.url,
          public_id: img.public_id
        }))
      };

      const productEntity = await ProductFactory.createProduct(product, categoryType);

      return productEntity;
    } catch (error) {
      console.log('ERRROR', error);
      if (uploadedImages.length > 0) {
        await Promise.all(uploadedImages.map((public_id) => deleteFromCloudinary(public_id)));
      }

      throw new CustomError('Failed to upload images', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }

  static async getBookCategoryId(): Promise<string> {
    const bookCategory = await CategoryModel.findOne({ name: 'Book' }).lean();
    return String(bookCategory?._id);
  }

  static async getAllLatestProduct(req: Request): Promise<IProduct[]> {
    const quantity = Number(req.query.quantity) || 0;

    const bookCategoryId = await this.getBookCategoryId();

    if (!bookCategoryId) {
      throw new CustomError('Not found book category', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    const latestProduct = await ProductRepository.GetLatestBookWithQuantity({
      bookCategoryId,
      quantity
    });
    return latestProduct as IProduct[];
  }

  static async getProductDetail(req: Request): Promise<CustomIProduct> {
    const productId = req.query.productId as string;
    let detailInfo: any[] = [];

    if (!productId) throw new CustomError('No product ID provided', STATUS_CODE.BAD_REQUEST);

    const product = await ProductModel.findById(new Types.ObjectId(productId)).populate('category', 'name');

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    if (product?.toObject<CustomIProduct>().category.name === 'Book') {
      detailInfo = await BookProductModel.find({ productId: product.id });
    }

    const customProductDetail = omit(detailInfo[0].toObject(), 'productId', '__v', '_id');

    const detailProduct = {
      ...product.toObject<CustomIProduct>(),
      ...customProductDetail
    };

    return omit(detailProduct, '__v', 'updatedAt') as CustomIProduct;
  }
}

export default ProductService;
