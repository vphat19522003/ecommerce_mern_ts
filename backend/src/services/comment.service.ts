import { UploadApiResponse } from 'cloudinary';
import { Types } from 'mongoose';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { IRequestCustom } from '@app/middleware/accessToken.middleware';
import ProductModel from '@app/models/product.model';
import CommentRepository, { CommentInfo } from '@app/repository/comment.repository';
import { UserInfo } from '@app/repository/user.repository';
import { deleteFromCloudinary, uploadToCloudinary } from '@app/utils/cloudinaryConfig';
import { isValidImage } from '@app/utils/validateFileType.util';

class CommentService {
  static async addComment(req: IRequestCustom): Promise<CommentInfo> {
    const { _id: userId } = req.user as UserInfo;
    const { productId, content, comment_vote } = req.body;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const uploadedImages: string[] = [];
    let commentImgUploadResults: UploadApiResponse[] = [];

    const product = await ProductModel.findById(new Types.ObjectId(productId));

    if (!product) throw new CustomError('Product not found', STATUS_CODE.BAD_REQUEST);

    const folder = `comment/${product._id + '-' + product.productName}/${userId}`;

    const commentImgs = files && files['commentImg'] ? files['commentImg'] : [];

    try {
      if (commentImgs.length >= 1 && commentImgs.length <= 3) {
        commentImgUploadResults =
          (await Promise.all(
            commentImgs.map(async (img) => {
              if (!isValidImage(img))
                throw new CustomError("Description image doesn't have valid type", STATUS_CODE.BAD_REQUEST);
              const uploadResult = await uploadToCloudinary(img, folder);
              uploadedImages.push(uploadResult.public_id);
              return uploadResult;
            })
          )) || [];
      }

      const commentData = {
        userId,
        productId,
        content,
        comment_vote,
        comment_images: commentImgUploadResults?.map((item) => ({
          url: item.url,
          public_id: item.public_id
        }))
      } as CommentInfo;

      const newComment = await CommentRepository.createComment(commentData);

      return newComment;
    } catch (err) {
      if (uploadedImages.length > 0) {
        await Promise.all(uploadedImages.map((public_id) => deleteFromCloudinary(public_id)));
      }

      throw new CustomError('Failed to upload images', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
  }
}

export default CommentService;
