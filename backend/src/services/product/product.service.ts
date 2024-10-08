import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import { UserInfo } from '@app/repository/user.repository';
import { uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

import ProductFactory from './product.factory';
import { IProduct } from './type';

class ProductService {
  static async createProduct(req: IRequestCustom): Promise<IProduct> {
    const data = req.body as IProduct;
    const categoryType = req.body.categoryType;
    const file = req.file;
    const user = req.user as UserInfo;

    const folder = `product/${data.productName}`;

    if (!file) throw new CustomError('No file provided', STATUS_CODE.BAD_REQUEST);

    if (!isValidImage(file)) throw new CustomError("File doesn't have valid type", STATUS_CODE.BAD_REQUEST);

    const uploadResult = await uploadToCloudinary(file, folder).catch(() => {
      throw new CustomError('Failed to upload img', STATUS_CODE.INTERNAL_SERVER_ERROR);
    });

    const product = {
      ...data,
      createdBy: new Types.ObjectId(user._id),
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

    const productEntity = await ProductFactory.createProduct(product, categoryType);

    return productEntity;
  }
}

export default ProductService;
