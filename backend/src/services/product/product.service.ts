import { Request } from 'express';
import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { CategoryInfo } from '@app/repository/category.repository';
import { uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

import CategoryService from '../category.service';
import ProductFactory from './product.factory';
import { IProduct } from './type';

class ProductService {
  static async createProduct(req: Request) {
    const data = req.body as IProduct;
    const file = req.file;

    const folder = `product/${data.productName}`;

    if (!file) throw new CustomError('No file provided', STATUS_CODE.BAD_REQUEST);

    if (!isValidImage(file)) throw new CustomError("File doesn't have valid type", STATUS_CODE.BAD_REQUEST);

    const uploadResult = await uploadToCloudinary(file, folder).catch(() => {
      throw new CustomError('Failed to upload img', STATUS_CODE.INTERNAL_SERVER_ERROR);
    });

    const product = {
      ...data,
      productThumbImg: [
        {
          url: uploadResult.url,
          public_id: uploadResult.public_id
        }
      ],
      productDescImg: [
        {
          url: uploadResult.url,
          public_id: uploadResult.public_id
        }
      ]
    };

    if (!Types.ObjectId.isValid(data.category))
      throw new CustomError('Category is not valid type', STATUS_CODE.BAD_REQUEST);

    const categoryType = (await CategoryService.findTopParentCategory(
      data.category as unknown as string
    )) as CategoryInfo;

    if (!categoryType) throw new CustomError('Category not found', STATUS_CODE.BAD_REQUEST);

    if (!Types.ObjectId.isValid(data.createdBy))
      throw new CustomError('CreatedBy ID is not valid type', STATUS_CODE.BAD_REQUEST);

    const productEntity = await ProductFactory.createProduct(product, categoryType.name);

    return productEntity;
  }
}

export default ProductService;
