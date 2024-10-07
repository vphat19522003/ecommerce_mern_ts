import STATUS_CODE from '@app/constants/responseStatus';
import { CustomError } from '@app/core/response.error';
import { BookProductModel } from '@app/models/product.model';

import { IBook, IBookStrategy } from '../type';
import Product from './product';

class Book extends Product implements IBookStrategy {
  productId: string;
  author: string;
  page_number: number;
  publisher: string;

  constructor({
    productName,
    productPrice,
    productThumbImg,
    description,
    productDescImg,
    category,
    productVoteRate,
    stockQuantity,
    soldQuantity,
    availableQuantity,
    totalComment,
    tag,
    createdBy,
    isDeleted,
    author,
    page_number,
    productId,
    publisher
  }: IBook) {
    super({
      productName,
      productPrice,
      productThumbImg,
      description,
      productDescImg,
      category,
      productVoteRate,
      stockQuantity,
      soldQuantity,
      availableQuantity,
      totalComment,
      tag,
      createdBy,
      isDeleted
    });
    this.author = author;
    this.page_number = page_number;
    this.productId = productId;
    this.publisher = publisher;
  }

  async createProduct(): Promise<IBook> {
    const createProduct = await super.createProduct();

    const createBook = await BookProductModel.create({ ...this, productId: createProduct._id });

    if (!createBook) throw new CustomError('Can not create book', STATUS_CODE.INTERNAL_SERVER_ERROR);

    return {
      ...createProduct,
      ...createBook.toObject()
    } as unknown as IBook;
  }
}

export default Book;
