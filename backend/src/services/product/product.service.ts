import { Request } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { CategoryInfo } from '@app/repository/category.repository';

import CategoryService from '../category.service';
import ProductFactory from './product.factory';

class ProductService {
  static async createProduct(req: Request) {
    const data = req.body;
    const file = req.file;

    const categoryType = (await CategoryService.findTopParentCategory(data.category)) as CategoryInfo;

    if (!categoryType) throw new CustomError('Category not found', STATUS_CODE.BAD_REQUEST);

    const productEntity = await ProductFactory.createProduct(data, categoryType.name);
  }
}

export default ProductService;
