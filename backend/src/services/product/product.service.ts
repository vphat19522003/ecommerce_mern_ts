import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import { UserInfo } from '@app/repository/user.repository';
import { deleteFromCloudinary, uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

import ProductFactory from './product.factory';
import { IProduct } from './type';

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

    const folder = `product/${data.productName}`;

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
      if (uploadedImages.length > 0) {
        await Promise.all(uploadedImages.map((public_id) => deleteFromCloudinary(public_id)));
      }
      throw new CustomError('Failed to upload images', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default ProductService;
